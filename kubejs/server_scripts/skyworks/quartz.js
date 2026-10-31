// Skyworks patch v1 - quartz meteor geodes: the white crystals (startup_scripts/skyworks/quartz.js) drop minecraft:quartz.
// Like amethyst: a cluster mined with a pickaxe drops 4 quartz (fortune applies), otherwise 2; buds drop nothing without
// silk touch. KubeJS auto-generates "drops itself" loot tables for its blocks in a virtual pack that sits above mod data
// packs, so the real tables are written into the 'last' generated-data stage, which overrides it.
ServerEvents.generateData('last', event => {
  const silk = {
    condition: 'minecraft:match_tool',
    predicate: { predicates: { 'minecraft:enchantments': [{ enchantments: 'minecraft:silk_touch', levels: { min: 1 } }] } }
  }
  const self = id => ({ type: 'minecraft:item', name: 'kubejs:' + id, conditions: [silk] })
  const table = entry => ({ type: 'minecraft:block', pools: [{ rolls: 1, bonus_rolls: 0, entries: [entry] }] })
  for (let bud of ['quartz_bud_small', 'quartz_bud_medium', 'quartz_bud_large']) {
    event.json('kubejs:loot_table/blocks/' + bud, table(self(bud)))
  }
  event.json('kubejs:loot_table/blocks/quartz_cluster', table({
    type: 'minecraft:alternatives',
    children: [
      self('quartz_cluster'),
      {
        type: 'minecraft:item', name: 'minecraft:quartz',
        conditions: [{ condition: 'minecraft:match_tool', predicate: { items: '#minecraft:pickaxes' } }],
        functions: [{ function: 'minecraft:set_count', count: 4 },
          { function: 'minecraft:apply_bonus', enchantment: 'minecraft:fortune', formula: 'minecraft:ore_drops' },
          { function: 'minecraft:explosion_decay' }]
      },
      {
        type: 'minecraft:item', name: 'minecraft:quartz',
        functions: [{ function: 'minecraft:set_count', count: 2 }, { function: 'minecraft:explosion_decay' }]
      }
    ]
  }))
})

// A silk-touched cluster can also be crushed into quartz.
ServerEvents.recipes(event => {
  event.custom({
    type: 'create:crushing',
    ingredients: [{ item: 'kubejs:quartz_cluster' }],
    processing_time: 150,
    results: [{ id: 'minecraft:quartz', count: 4 }, { id: 'minecraft:quartz', chance: 0.5 }]
  }).id('skyworks:crushing/quartz_cluster')
})
