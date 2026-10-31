// Skyworks - recipe rebalance. DATA table first, ENGINE below. Retune by editing the table, then run /kubejs reload server_scripts.
//
// Each rule selects recipes with a filter and applies one or more actions. Filter keys (all optional, AND-ed):
//   type    recipe type id                      e.g. 'create:crushing'  (string or array)
//   mod     namespace of the recipe id          e.g. 'createsifter'
//   id      exact recipe id or /regex/          e.g. /^createsifter:sifting\/dust_/
//   output  item id that appears in a result    e.g. 'createsifter:dust'  (string or array: any of them)
//   input   item id that appears in an ingredient
// Actions:
//   remove: true                   delete the recipe
//   removeResult: true             delete the matching results (needs `output`); the recipe itself stays
//   chance: 0.005                  SET the chance of the matching results (only results of `output` when given, else all)
//   chanceMul: 0.25                MULTIPLY the chance of the matching results (a missing chance counts as 1.0)
//   countMul: 2                    multiply result count (rounded, min 1)
//   timeMul: 1.5                   multiply processing time (processing_time / processingTime / processingTicks)
// Rules run top to bottom. Set enabled: false to park a rule.
const SKY_REBALANCE = {
  logApplied: true,
  rules: [
    // --- patch v1b: netherite only from the ancient debris in Nether meteors ----------------------------------------
    { name: 'no netherite from sifting', type: 'createsifter:sifting', output: ['minecraft:netherite_scrap', 'minecraft:ancient_debris'], removeResult: true },
    { name: 'no netherite from zelosite', mod: 'chemica', output: 'minecraft:netherite_scrap', removeResult: true },
    { name: 'no ancient debris drilling', id: 'createoreexcavation:drilling/netherite', remove: true },
    { name: 'no ancient debris vein', id: 'createoreexcavation:ore_vein_type/netherite', remove: true },

    // --- patch v1b: sifter chances are absolute, per result (every sifting recipe, add-ons and Skyworks included) ---
    { name: 'sifter: everything 1/800', type: 'createsifter:sifting', chance: 1 / 800 },
    { name: 'sifter: copper 1/1000', type: 'createsifter:sifting', output: ['create:copper_nugget', 'create:crushed_raw_copper'], chance: 1 / 1000 },
    { name: 'sifter: iron 1/1000', type: 'createsifter:sifting', output: ['minecraft:iron_nugget', 'create:crushed_raw_iron'], chance: 1 / 1000 },
    { name: 'sifter: diamond 1/10000', type: 'createsifter:sifting', output: 'minecraft:diamond', chance: 1 / 10000 },
    // Dust blocks from crushing / milling sand: well below 1 % (the sand is still consumed).
    { name: 'dust from crush/mill < 1%', type: ['create:crushing', 'create:milling'], output: 'createsifter:dust', chance: 0.005 },

    // --- examples (parked) ----------------------------------------------------------------------------------------
    { enabled: false, name: 'example: slower pressing', type: 'create:pressing', timeMul: 2 },
    { enabled: false, name: 'example: remove a recipe', id: 'create:crafting/kinetics/steam_engine', remove: true },
    { enabled: false, name: 'example: halve crushed ore bonus', type: 'create:crushing', mod: 'create', chanceMul: 0.5 }
  ]
}

// ===================================================== ENGINE (no numbers below this line) =====================================================

ServerEvents.recipes(event => {
  const cfg = SKY_REBALANCE
  if (!cfg || !cfg.rules) return

  const asArray = v => (v === undefined || v === null) ? [] : (Array.isArray(v) ? v : [v])
  const itemId = el => {
    if (!el || !el.isJsonObject()) return ''
    let o = el.getAsJsonObject()
    for (let k of ['id', 'item']) if (o.has(k) && o.get(k).isJsonPrimitive()) return String(o.get(k).getAsString())
    return ''
  }
  const idMatches = (pattern, id) => (pattern instanceof RegExp) ? pattern.test(id) : String(pattern) === id
  const wanted = (outs, id) => outs.length === 0 || outs.indexOf(id) >= 0
  const listHas = (arr, item) => {
    if (!arr) return false
    for (let i = 0; i < arr.size(); i++) {
      let el = arr.get(i)
      if (itemId(el) === item) return true
      if (el.isJsonArray() && listHas(el.getAsJsonArray(), item)) return true
    }
    return false
  }
  const getArr = (json, keys) => {
    for (let k of keys) if (json.has(k) && json.get(k).isJsonArray()) return json.get(k).getAsJsonArray()
    return null
  }

  // Rhino (KubeJS) keeps the FIRST value of a const declared in a loop body or callback that runs more than once:
  // everything below the helpers uses let.
  // event.remove filter for a `remove` rule
  const removeFilter = (rule, types, mods, outs) => {
    let f = {}
    if (types.length === 1) f.type = types[0]
    if (mods.length === 1) f.mod = mods[0]
    if (typeof rule.id === 'string') f.id = rule.id
    if (outs.length === 1) f.output = outs[0]
    if (rule.input) f.input = rule.input
    return f
  }

  let applied = 0
  cfg.rules.forEach(rule => {
    if (rule.enabled === false) return
    let types = asArray(rule.type)
    let mods = asArray(rule.mod)
    let outs = asArray(rule.output)

    if (rule.remove) {
      let filter = removeFilter(rule, types, mods, outs)
      event.remove(filter)
      applied++
      if (cfg.logApplied) console.info('[Skyworks rebalance] ' + rule.name + ': removed ' + JSON.stringify(filter))
      return
    }

    let touched = 0
    let touchedIds = []
    event.forEachRecipe({}, recipe => {
      let json = recipe.json
      if (!json) return
      let rid = String(recipe.getId())
      if (types.length && types.indexOf(String(json.has('type') ? json.get('type').getAsString() : '')) < 0) return
      if (mods.length && mods.indexOf(rid.split(':')[0]) < 0) return
      if (rule.id !== undefined && !idMatches(rule.id, rid)) return
      let results = getArr(json, ['results', 'outputs', 'result'])
      if (outs.length && !outs.some(o => listHas(results, o))) return
      if (rule.input && !listHas(getArr(json, ['ingredients', 'input', 'inputs']), rule.input)) return

      let changed = false
      if (results && rule.removeResult && outs.length) {
        for (let i = results.size() - 1; i >= 0; i--) {
          if (wanted(outs, itemId(results.get(i)))) { results.remove(i); changed = true }
        }
      }
      if (results && (rule.chance !== undefined || rule.chanceMul !== undefined || rule.countMul !== undefined)) {
        for (let i = 0; i < results.size(); i++) {
          let el = results.get(i)
          if (!el.isJsonObject()) continue
          if (!wanted(outs, itemId(el))) continue
          let o = el.getAsJsonObject()
          if (rule.chance !== undefined) { o.addProperty('chance', rule.chance); changed = true }
          if (rule.chanceMul !== undefined) {
            let c = o.has('chance') ? o.get('chance').getAsDouble() : 1.0
            o.addProperty('chance', c * rule.chanceMul); changed = true
          }
          if (rule.countMul !== undefined) {
            let n = o.has('count') ? o.get('count').getAsInt() : 1
            o.addProperty('count', Math.max(1, Math.round(n * rule.countMul))); changed = true
          }
        }
      }
      if (rule.timeMul !== undefined) {
        for (let k of ['processing_time', 'processingTime', 'processingTicks']) {
          if (json.has(k) && json.get(k).isJsonPrimitive()) {
            json.addProperty(k, Math.max(1, Math.round(json.get(k).getAsDouble() * rule.timeMul))); changed = true
          }
        }
      }
      if (changed) { recipe.save(); touched++; if (touchedIds.length < 8) touchedIds.push(rid) }
    })
    applied += touched
    if (cfg.logApplied) console.info('[Skyworks rebalance] ' + rule.name + ': ' + touched + ' recipes changed' +
      (touched > 0 && touched <= 8 ? ' (' + touchedIds.join(', ') + ')' : ''))
  })
})
