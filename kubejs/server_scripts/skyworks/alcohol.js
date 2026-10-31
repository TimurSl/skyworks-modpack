// Skyworks - alcohol tolerance system (server side only).
//
// Every alcoholic drink adds "intoxication" to the player. Intoxication fades with time. The player's
// capacity is 100 + tolerance, where tolerance is a hidden per-player value that is never shown anywhere
// (no command, no message, no effect text) and survives death and relogs (stored in server persistent data,
// keyed by UUID).
//
//   fill = intoxication / capacity
//   0.30+ tipsy (nausea) .. 0.50+ slow .. 0.70+ weak/slower .. 0.90+ stumbling
//   after a drink: fill >= 1.0  -> player passes out (frozen, blind) but lives
//                  fill >= 1.3  -> "soul spills out": player dies, inventory + XP are kept, sobers up
//   Drinking so that fill lands in the edge zone (0.8 .. 1.3) without dying slowly raises tolerance
//   (diminishing returns, at most one gain per GAIN_COOLDOWN ticks, so sipping carefully is the only way).

const ALCOHOL = {
  baseCapacity: 100,
  maxTolerance: 900,          // capacity 1000 = 10x base -> becomes an alcohol demon
  decayPerSecond: 0.3,        // scaled by sqrt(capacity / baseCapacity)
  edgeFrom: 0.8,
  passOutFrom: 1.0,
  deathFrom: 1.3,
  gain: 1.5,                  // base tolerance gain per qualifying drink (x2 when passing out)
  gainCooldown: 30 * 20,
  passOutTicks: 15 * 20,
  demonRollChance: 0.003,     // per drink of strength 10; x3 when drinking on the edge
  demonImmunityMs: 12 * 3600 * 1000,
  demonOfferTicks: 60 * 20,
  demonBattleTicks: 10 * 60 * 20,   // no loser by then = draw
  demonPrizeDiamonds: 16,
  demonIdleWarn: 5 * 20,      // no sip for this long -> big "ПЕЙ" title
  demonIdleEnd: 15 * 20,      // no sip for this long -> demon: contract destroyed, player: sent to hell
  demonStartGrace: 5 * 20,
  demonNetherRange: 3000,     // random Nether x/z within +-this
  tagDefaults: [['create_winery:alcoholic_beverages', 14], ['c:beers', 8], ['brewinandchewin:fermented_drinks', 10]],
  strength: {
    // Brewin' and Chewin'
    'brewinandchewin:beer': 8, 'brewinandchewin:vodka': 20, 'brewinandchewin:mead': 9,
    'brewinandchewin:rice_wine': 10, 'brewinandchewin:egg_grog': 10, 'brewinandchewin:strongroot_ale': 9,
    'brewinandchewin:saccharine_rum': 16, 'brewinandchewin:pale_jane': 12, 'brewinandchewin:salty_folly': 12,
    'brewinandchewin:steel_toe_stout': 9, 'brewinandchewin:bloody_mary': 10, 'brewinandchewin:red_rum': 16,
    'brewinandchewin:withering_dross': 14, 'brewinandchewin:dread_nog': 12,
    'brewinandchewin:kombucha': 0, 'brewinandchewin:glittering_grenadine': 0,
    // Cocktails Delight - beers and ciders
    'cocktailsdelight:bock': 9, 'cocktailsdelight:cream_ale': 8, 'cocktailsdelight:ipa': 9,
    'cocktailsdelight:milk_stout': 8, 'cocktailsdelight:nut_brown_ale': 8, 'cocktailsdelight:pilsner': 7,
    'cocktailsdelight:porter': 8, 'cocktailsdelight:red_ale': 8, 'cocktailsdelight:reda_ale': 8,
    'cocktailsdelight:stout': 9, 'cocktailsdelight:hard_cider': 9, 'cocktailsdelight:hard_lemonade': 7,
    'cocktailsdelight:mulled_cider': 6,
    // wines
    'cocktailsdelight:red_wine': 13, 'cocktailsdelight:white_wine': 13, 'cocktailsdelight:sweet_red_wine': 13,
    'cocktailsdelight:peach_wine': 12, 'cocktailsdelight:plum_wine': 12, 'cocktailsdelight:mulled_wine': 11,
    // spirits and liqueurs
    'cocktailsdelight:gin': 20, 'cocktailsdelight:rum': 20, 'cocktailsdelight:kraken_rum': 22,
    'cocktailsdelight:tequila': 20, 'cocktailsdelight:whiskey': 22, 'cocktailsdelight:moonshine': 28,
    'cocktailsdelight:kahlua': 13, 'cocktailsdelight:blue_curacao': 13,
    // cocktails
    'cocktailsdelight:aqua_velva': 14, 'cocktailsdelight:bees_knees': 14, 'cocktailsdelight:black_cuban': 16,
    'cocktailsdelight:black_russian': 16, 'cocktailsdelight:boilermaker': 18, 'cocktailsdelight:brass_monkey': 16,
    'cocktailsdelight:china_blue': 14, 'cocktailsdelight:espresso_martini': 14, 'cocktailsdelight:gimlet': 15,
    'cocktailsdelight:gin_and_juice': 11, 'cocktailsdelight:gin_and_tonic': 12, 'cocktailsdelight:half_and_half': 8,
    'cocktailsdelight:hot_toddy': 10, 'cocktailsdelight:johnny_silverhand': 20, 'cocktailsdelight:margarita': 15,
    'cocktailsdelight:medina': 12, 'cocktailsdelight:mermaid_lemonade': 10, 'cocktailsdelight:mexican_hot_chocolate': 6,
    'cocktailsdelight:mint_julep': 15, 'cocktailsdelight:mojito': 13, 'cocktailsdelight:pina_colada': 13,
    'cocktailsdelight:salted_margarita': 16, 'cocktailsdelight:screwdriver': 12, 'cocktailsdelight:singapore_sling': 14,
    'cocktailsdelight:tequila_sunrise': 13, 'cocktailsdelight:vodka_tonic': 12, 'cocktailsdelight:whiskey_sour': 14,
    'cocktailsdelight:white_russian': 15,
    // Kvass Delight (nearly non-alcoholic)
    'kvassaddon:beet_kvass': 2, 'kvassaddon:berry_kvass': 2, 'kvassaddon:bread_kvass': 2,
    'kvassaddon:ginger_kvass': 2, 'kvassaddon:monastery_kvass': 4,
    // Create: Winery
    'create_winery:bordeaux': 13, 'create_winery:cabernet_sauvignon': 14, 'create_winery:merlot': 13,
    'create_winery:pinot_noir': 13, 'create_winery:zinfandel': 14, 'create_winery:rose': 12,
    'create_winery:champaign': 14, 'create_winery:chardonnay': 13, 'create_winery:riesling': 12,
    'create_winery:cider': 9,
    // Create: Alcohol Industry
    'alcohol_industry:beer': 8, 'alcohol_industry:cider': 9, 'alcohol_industry:apple_wine': 12,
    'alcohol_industry:rum': 20, 'alcohol_industry:tequila': 20, 'alcohol_industry:vodka': 20,
    'alcohol_industry:whiskey': 22
  }
}

// %s = player name
const ALCOHOL_DEATH_MESSAGES = [
  'Игрок %s перебрал и выпустил душу на волю.',
  'Игрок %s перепил. Душа не выдержала и ушла за добавкой.',
  'Игрок %s выпил лишнего — закуска не спасла.',
  'Игрок %s хотел ещё одну, последнюю. Она и правда оказалась последней.',
  'Душа игрока %s вышла покурить и не вернулась.',
  'Игрок %s упал лицом в салат... и больше не встал (но вещи целы).',
  'Печень игрока %s подала заявление об уходе.',
  'Игрок %s был слишком хорош для этого трезвого мира.',
  'Игрок %s пил как не в себя — и вышел из себя окончательно.',
  'Игрок %s считал, что он не пьян. Статистика считала иначе.',
  'Игрок %s сказал «я в норме» — и это были его последние слова.',
  'Игрок %s пошёл на рекорд и на нём же остановился.',
  'Игрок %s допил всё, что было, и даже то, чего не было.',
  'Игрок %s перепутал тост «за здоровье» с вызовом на дуэль самому себе.',
  'Бармен предупреждал игрока %s. Бармена никто не слушал.',
  'Игрок %s выпил за всех. Все ему благодарны.',
  'Игрок %s обещал остановиться после этой. Этих было слишком много.',
  'Игрок %s искал дно бокала, а нашёл дно бытия.',
  'Игрок %s упал и пошёл на второй круг — только без ног.',
  'Игрок %s залпом осушил кружку и заодно собственную душу.',
  'Утром игрок %s не вспомнит ничего. И не встретит это утро.',
  'Игрок %s закусывал только словами. Не помогло.',
  'Игрок %s и градус — любовь до гроба. Буквально.',
  'Хмель победил игрока %s в честном бою.',
  'Игрок %s выпил слишком много, и душа решила проветриться без него.',
  'Игрок %s попытался перепить самого себя. Победила дружба... то есть алкоголь.'
]
const ALCOHOL_PASSOUT_MESSAGES = [
  'Мир накренился, и вы сползли на землю...',
  'Ноги отказались идти, а земля вдруг оказалась очень уютной...',
  'Всё закружилось, потемнело... и пол показался отличной кроватью.',
  'Вы прилегли «буквально на секундочку»...',
  'Ещё глоток — и вы бы познакомились с предками. Лучше полежать.'
]
function alcoholPick(list) {
  return list[Math.floor(Math.random() * list.length)]
}

const AlcoholGameRules = Java.loadClass('net.minecraft.world.level.GameRules')

function alcoholStrength(stack) {
  const id = String(stack.id)
  const s = ALCOHOL.strength[id]
  if (s !== undefined) return s
  for (let t of ALCOHOL.tagDefaults) {
    if (stack.hasTag(t[0])) return t[1]
  }
  return 0
}

// per-player record {bac, res, lastGain}; 'res' is the hidden tolerance
function alcoholRecord(server, uuid) {
  const pd = server.persistentData
  if (!pd.contains('skyworks_alcohol')) pd.put('skyworks_alcohol', NBT.compoundTag())
  const all = pd.get('skyworks_alcohol')
  if (!all.contains(uuid)) all.put(uuid, NBT.compoundTag())
  return all.get(uuid)
}

function alcoholEffect(player, id, amp, ticks) {
  player.potionEffects.add(id, ticks, amp, true, false)
}

// Vanilla reads keepInventory twice: in die() (skip dropping) and again at respawn (copy the old inventory
// to the new body). So the rule must stay true until the player has respawned; it is restored from the tick
// handler below. The original value is kept in persistent data so a script reload or restart cannot leave it on.
const ALCOHOL_KEEP_PENDING = {}   // uuid -> server tick when the soul spilled

function alcoholSoulSpill(player, rec) {
  const server = player.server
  const keep = server.getGameRules().getRule(AlcoholGameRules.RULE_KEEPINVENTORY)
  const pd = server.persistentData
  if (!pd.contains('skyworks_alcohol_keep_prev')) pd.putBoolean('skyworks_alcohol_keep_prev', keep.get())
  keep.set(true, server)
  ALCOHOL_KEEP_PENDING[String(player.uuid)] = server.getTickCount()
  player.kill()
  rec.putDouble('bac', 0)
  server.tell(Text.of(alcoholPick(ALCOHOL_DEATH_MESSAGES).replace('%s', player.username)).darkRed())
}

function alcoholReleaseKeep(server) {
  const pd = server.persistentData
  if (!pd.contains('skyworks_alcohol_keep_prev')) return
  server.getGameRules().getRule(AlcoholGameRules.RULE_KEEPINVENTORY).set(pd.getBoolean('skyworks_alcohol_keep_prev'), server)
  pd.remove('skyworks_alcohol_keep_prev')
}

// once a second: release keepInventory when every spilled player has respawned (or left / timed out)
ServerEvents.tick(event => {
  const server = event.server
  if (server.getTickCount() % 20 !== 0) return
  for (let uuid in ALCOHOL_KEEP_PENDING) {
    let p = server.getPlayer(uuid)
    if (!p || p.isAlive() || server.getTickCount() - ALCOHOL_KEEP_PENDING[uuid] > 20 * 600) {
      delete ALCOHOL_KEEP_PENDING[uuid]
    }
  }
  if (Object.keys(ALCOHOL_KEEP_PENDING).length === 0) alcoholReleaseKeep(server)
  alcoholDemonTick(server)
})

function alcoholDrink(player, stack) {
  if (player.isCreative() || player.isSpectator()) return
  const add = alcoholStrength(stack)
  if (add <= 0) return

  const uuid = String(player.uuid)
  const rec = alcoholRecord(player.server, uuid)
  const res = rec.getDouble('res')
  const capacity = ALCOHOL.baseCapacity + res
  const before = rec.getDouble('bac') / capacity
  const bac = rec.getDouble('bac') + add
  rec.putDouble('bac', bac)
  const fill = bac / capacity
  const battle = ALCOHOL_BATTLES[uuid]
  if (battle) battle.last[uuid] = player.server.getTickCount()

  if (fill >= ALCOHOL.deathFrom && !battle) {
    alcoholSoulSpill(player, rec)
    return
  }
  // survived this drink: careful drinking at the edge trains tolerance
  if (fill >= ALCOHOL.edgeFrom && res < ALCOHOL.maxTolerance && before >= ALCOHOL.edgeFrom - 0.25) {
    const now = player.server.getTickCount()
    if (now - rec.getLong('lastGain') >= ALCOHOL.gainCooldown) {
      const k = Math.max(0.05, 1 - res / ALCOHOL.maxTolerance)
      const g = ALCOHOL.gain * (capacity / ALCOHOL.baseCapacity) * k * (fill >= ALCOHOL.passOutFrom ? 2 : 1)
      rec.putDouble('res', Math.min(ALCOHOL.maxTolerance, res + g))
      rec.putLong('lastGain', now)
    }
  }
  // demon: either a lucky roll while drinking or 10x tolerance
  if (!rec.getBoolean('demon')) {
    const chance = ALCOHOL.demonRollChance * (add / 10) * (fill >= ALCOHOL.edgeFrom ? 3 : 1)
    if (rec.getDouble('res') >= ALCOHOL.maxTolerance || Math.random() < chance) alcoholBecomeDemon(player, rec)
  }
  if (fill >= ALCOHOL.passOutFrom) {
    const t = ALCOHOL.passOutTicks
    alcoholEffect(player, 'minecraft:slowness', 6, t)
    alcoholEffect(player, 'minecraft:blindness', 0, t)
    alcoholEffect(player, 'minecraft:nausea', 0, t + 100)
    alcoholEffect(player, 'minecraft:weakness', 2, t)
    alcoholEffect(player, 'minecraft:mining_fatigue', 4, t)
    player.tell(Text.of(alcoholPick(ALCOHOL_PASSOUT_MESSAGES)).gray())
    if (battle) alcoholBattleEnd(player.server, battle, uuid)
  }
}

// NativeEvents listeners are NOT removed on /reload (KubeJS keeps them in a static list), so every reload stacks
// another copy of this handler. Copies of the current code dedupe through a per-player tick marker.
NativeEvents.onEvent('net.neoforged.neoforge.event.entity.living.LivingEntityUseItemEvent$Finish', event => {
  const entity = event.entity
  if (!entity || !entity.isPlayer() || entity.level.isClientSide()) return
  const stamp = entity.server.getTickCount()
  if (entity.persistentData.getInt('skyworks_alc_seen') === stamp) return
  entity.persistentData.putInt('skyworks_alc_seen', stamp)
  try {
    alcoholDrink(entity, event.item)
  } catch (e) {
    // never let a script bug kick the player (an exception here disconnects them)
    console.error('alcohol.js: ' + e)
  }
})

// sobering up + drunk effects, once per second
PlayerEvents.tick(event => {
  const player = event.player
  if (player.tickCount % 20 !== 0 || player.level.isClientSide()) return
  const server = player.server
  const all = server.persistentData.get('skyworks_alcohol')
  if (!all || !all.contains(String(player.uuid))) return
  const rec = all.get(String(player.uuid))
  let bac = rec.getDouble('bac')
  if (bac <= 0) return

  const capacity = ALCOHOL.baseCapacity + rec.getDouble('res')
  bac = Math.max(0, bac - ALCOHOL.decayPerSecond * Math.sqrt(capacity / ALCOHOL.baseCapacity))
  rec.putDouble('bac', bac)

  const f = bac / capacity
  if (f >= 0.3) alcoholEffect(player, 'minecraft:nausea', 0, 300)
  if (f >= 0.5) alcoholEffect(player, 'minecraft:slowness', 0, 60)
  if (f >= 0.7) { alcoholEffect(player, 'minecraft:slowness', 1, 60); alcoholEffect(player, 'minecraft:weakness', 0, 60) }
  if (f >= 0.9) { alcoholEffect(player, 'minecraft:mining_fatigue', 1, 60); alcoholEffect(player, 'minecraft:weakness', 1, 60) }
})

// ---------------------------------------------------------------------------------------------
// Alcohol demons. A demon (hidden-tolerance 10x, or a lucky roll while drinking) can challenge any player to
// a drinking battle: /alcoholdemon contract <player>. The first to pass out loses.
//   demon wins   -> the player is thrown into the Nether without obsidian and flint and steel
//   player wins  -> diamonds, and no demon may offer them a contract for 12 hours (real time)
// A player who logs out or dies during the battle loses. No loser within demonBattleTicks = draw.
// Ops: /alcoholdemon grant|revoke <player> (testing).
// ---------------------------------------------------------------------------------------------

const ALCOHOL_OFFERS = {}    // target uuid -> {demon: uuid, expires: server tick}
const ALCOHOL_BATTLES = {}   // uuid -> battle object (same object under both participants)

const ALCOHOL_DEMON_BORN = [
  'Из винных паров восстал новый Алкогольный Демон — %s! Прячьте бутылки!',
  'Игрок %s выпил столько, что ад принял его за своего. Встречайте: Алкогольный Демон!',
  'В трактире запахло серой: %s теперь Алкогольный Демон.'
]
const ALCOHOL_BANISH_MESSAGES = [
  'Демон %d перепил игрока %p и отправил его в Незер, а обсидиан с огнивом остались валяться!',
  'Игрок %p сдался хмелю и вылетел в Незер — демон %d празднует победу.',
  'Контракт исполнен: %p отправляется в Незер, а демон %d наливает себе ещё.'
]
const ALCOHOL_PLAYER_WIN_MESSAGES = [
  'Игрок %p перепил самого демона %d и унёс алмазы!',
  'Демон %d повержен кружкой игрока %p. Алмазы — победителю!',
  'Игрок %p остался на ногах, а демон %d — нет. Контракт расторгнут!'
]

function alcoholBecomeDemon(player, rec) {
  rec.putBoolean('demon', true)
  player.server.tell(Text.of(alcoholPick(ALCOHOL_DEMON_BORN).replace('%s', player.username)).red())
  player.tell(Text.of('Теперь ты можешь бросать вызов другим: /alcoholdemon contract <игрок>').gold())
}

function alcoholSay(server, list, demonName, playerName, color) {
  server.tell(Text.of(alcoholPick(list).replace('%d', demonName).replace('%p', playerName))[color]())
}

function alcoholBanish(server, p) {
  // obsidian and flint and steel stay behind: they drop on the ground where the player lost
  const inv = p.inventory
  for (let i = 0; i < inv.getContainerSize(); i++) {
    let st = inv.getItem(i)
    if (st.isEmpty()) continue
    let id = String(st.id)
    if (id === 'minecraft:obsidian' || id === 'minecraft:flint_and_steel') {
      p.drop(st.copy(), false)
      st.setCount(0)
    }
  }
  // then a completely random spot in the Nether, never on the bedrock roof or in rock
  const x = Math.floor((Math.random() * 2 - 1) * ALCOHOL.demonNetherRange)
  const z = Math.floor((Math.random() * 2 - 1) * ALCOHOL.demonNetherRange)
  server.runCommandSilent('execute in minecraft:the_nether run spreadplayers ' + x + ' ' + z + ' 0 24 false ' + p.username)
  const level = p.level
  let bx = Math.floor(p.x), bz = Math.floor(p.z)
  let y = alcoholSafeFloor(level, bx, bz)
  for (let i = 0; i < 40 && y === null; i++) {
    bx = Math.floor(p.x) + Math.floor((Math.random() * 2 - 1) * 24)
    bz = Math.floor(p.z) + Math.floor((Math.random() * 2 - 1) * 24)
    y = alcoholSafeFloor(level, bx, bz)
  }
  if (y !== null) {
    server.runCommandSilent('execute in minecraft:the_nether run tp ' + p.username + ' ' + (bx + 0.5) + ' ' + y + ' ' + (bz + 0.5))
  }
  alcoholEffect(p, 'minecraft:fire_resistance', 0, 30 * 20)
}

function alcoholIsAir(level, x, y, z) {
  const id = String(level.getBlock(x, y, z).id)
  return id === 'minecraft:air' || id === 'minecraft:cave_air'
}

// Y to stand on: a solid, non-bedrock floor with two air blocks above, searched below the roof.
function alcoholSafeFloor(level, x, z) {
  for (let y = 118; y > 32; y--) {
    let b = level.getBlock(x, y, z)
    if (String(b.id) === 'minecraft:bedrock' || !b.blockState.blocksMotion()) continue
    if (alcoholIsAir(level, x, y + 1, z) && alcoholIsAir(level, x, y + 2, z)) return y + 1
  }
  return null
}

// ---- contract drinks: copies of the demon's alcohol, marked in custom data, removed when the battle ends ----
const AlcoholComponents = Java.loadClass('net.minecraft.core.component.DataComponents')
const AlcoholCustomData = Java.loadClass('net.minecraft.world.item.component.CustomData')

function alcoholIsContractItem(st) {
  if (st.isEmpty()) return false
  const cd = st.get(AlcoholComponents.CUSTOM_DATA)
  return cd != null && cd.contains('skyworks_contract')
}

function alcoholHasAlcohol(p) {
  const inv = p.inventory
  for (let i = 0; i < inv.getContainerSize(); i++) {
    let st = inv.getItem(i)
    if (!st.isEmpty() && alcoholStrength(st) > 0) return true
  }
  return false
}

function alcoholCopyAlcohol(from, to) {
  const inv = from.inventory
  let n = 0
  for (let i = 0; i < inv.getContainerSize(); i++) {
    let st = inv.getItem(i)
    if (st.isEmpty() || alcoholStrength(st) <= 0 || alcoholIsContractItem(st)) continue
    let c = st.copy()
    AlcoholCustomData.update(AlcoholComponents.CUSTOM_DATA, c, tag => tag.putBoolean('skyworks_contract', true))
    if (to.inventory.add(c)) n++
  }
  return n
}

function alcoholClearContractItems(p) {
  const inv = p.inventory
  for (let i = 0; i < inv.getContainerSize(); i++) {
    if (alcoholIsContractItem(inv.getItem(i))) inv.getItem(i).setCount(0)
  }
}

// loserUuid == null -> draw
function alcoholBattleEnd(server, battle, loserUuid, cancelText) {
  delete ALCOHOL_BATTLES[battle.demon]
  delete ALCOHOL_BATTLES[battle.player]
  const demon = server.getPlayer(battle.demon)
  const player = server.getPlayer(battle.player)
  const dn = demon ? demon.username : battle.demonName
  const pn = player ? player.username : battle.playerName
  if (demon) alcoholClearContractItems(demon)
  if (player) alcoholClearContractItems(player)
  if (cancelText) {
    server.tell(Text.of(cancelText.replace('%d', dn).replace('%p', pn)).gray())
    return
  }
  if (!loserUuid) {
    server.tell(Text.of('Битва демона ' + dn + ' и игрока ' + pn + ' закончилась ничьей — оба слишком упёрты.').gray())
    return
  }
  if (loserUuid === battle.player) {
    alcoholSay(server, ALCOHOL_BANISH_MESSAGES, dn, pn, 'darkRed')
    if (player) alcoholBanish(server, player)
  } else {
    alcoholSay(server, ALCOHOL_PLAYER_WIN_MESSAGES, dn, pn, 'green')
    const rec = alcoholRecord(server, battle.player)
    rec.putDouble('immuneUntil', Date.now() + ALCOHOL.demonImmunityMs)
    if (player) server.runCommandSilent('give ' + pn + ' minecraft:diamond ' + ALCOHOL.demonPrizeDiamonds)
  }
}

function alcoholDemonTick(server) {
  const now = server.getTickCount()
  for (let t in ALCOHOL_OFFERS) {
    if (now > ALCOHOL_OFFERS[t].expires) delete ALCOHOL_OFFERS[t]
  }
  for (let u in ALCOHOL_BATTLES) {
    let b = ALCOHOL_BATTLES[u]
    if (!b) continue
    if (now - b.start > ALCOHOL.demonBattleTicks) { alcoholBattleEnd(server, b, null); continue }
    if (u !== b.demon) continue   // each battle is stored under both uuids; handle it once
    // nobody may stop drinking: warn after 5 s, after 15 s the contract burns (demon) / the player goes to hell
    let sides = [b.demon, b.player]
    for (let i = 0; i < sides.length; i++) {
      let who = server.getPlayer(sides[i])
      if (!who) continue
      let idle = now - b.last[sides[i]]
      if (idle >= ALCOHOL.demonIdleEnd) {
        if (sides[i] === b.demon) {
          alcoholBattleEnd(server, b, null, 'Демон %d не стал пить — контракт с игроком %p уничтожен.')
        } else {
          alcoholBattleEnd(server, b, b.player)
        }
        break
      }
      if (idle >= ALCOHOL.demonIdleWarn) {
        let left = Math.ceil((ALCOHOL.demonIdleEnd - idle) / 20)
        server.runCommandSilent('title ' + who.username + ' times 0 25 5')
        server.runCommandSilent('title ' + who.username + ' subtitle ' + JSON.stringify({ text: 'Осталось ' + left + ' с', color: 'yellow' }))
        server.runCommandSilent('title ' + who.username + ' title ' + JSON.stringify({ text: 'ПЕЙ!', color: 'red', bold: true }))
      }
    }
  }
}

PlayerEvents.loggedOut(event => {
  const uuid = String(event.player.uuid)
  const b = ALCOHOL_BATTLES[uuid]
  if (b) alcoholBattleEnd(event.server, b, uuid)
  delete ALCOHOL_OFFERS[uuid]
})

EntityEvents.death(event => {
  if (!event.entity.isPlayer()) return
  const uuid = String(event.entity.uuid)
  const b = ALCOHOL_BATTLES[uuid]
  if (b) alcoholBattleEnd(event.server, b, uuid)
})

ServerEvents.commandRegistry(event => {
  const { commands: Commands, arguments: Arguments } = event

  const isDemon = (ctx) => {
    const p = ctx.source.player
    return !!p && alcoholRecord(ctx.source.server, String(p.uuid)).getBoolean('demon')
  }

  const contract = ctx => {
    const server = ctx.source.server
    const demon = ctx.source.player
    if (!demon || !isDemon(ctx)) { ctx.source.sendFailure(Text.of('Ты не Алкогольный Демон.')); return 0 }
    const target = Arguments.PLAYER.getResult(ctx, 'target')
    const tu = String(target.uuid), du = String(demon.uuid)
    if (!alcoholHasAlcohol(demon)) { ctx.source.sendFailure(Text.of('Нужен алкоголь в инвентаре — его копии получит соперник.')); return 0 }
    if (tu === du) { ctx.source.sendFailure(Text.of('С самим собой пить нельзя... то есть можно, но контракт не заключить.')); return 0 }
    if (ALCOHOL_BATTLES[du] || ALCOHOL_BATTLES[tu]) { ctx.source.sendFailure(Text.of('Кто-то из вас уже в битве.')); return 0 }
    const left = alcoholRecord(server, tu).getDouble('immuneUntil') - Date.now()
    if (left > 0) {
      const mins = Math.ceil(left / 60000)
      ctx.source.sendFailure(Text.of('Этот игрок недавно победил демона. Ещё ' + Math.floor(mins / 60) + ' ч ' + (mins % 60) + ' мин нельзя предлагать контракт.'))
      return 0
    }
    ALCOHOL_OFFERS[tu] = { demon: du, demonName: demon.username, expires: server.getTickCount() + ALCOHOL.demonOfferTicks }
    const msg = [
      { text: 'Алкогольный Демон ' + demon.username + ' предлагает тебе контракт: битва на выпивке! ', color: 'red' },
      { text: '[Принять]', color: 'green', bold: true, clickEvent: { action: 'run_command', value: '/alcoholdemon accept' } },
      { text: ' ' },
      { text: '[Отказаться]', color: 'gray', bold: true, clickEvent: { action: 'run_command', value: '/alcoholdemon decline' } },
      { text: '\nПроигравший (первым свалился) — слабак. Проиграешь — вылетишь в случайное место Незера, а обсидиан и огниво выпадут здесь. Победишь — алмазы! Выпивка у тебя будет от демона. Нельзя не пить: 15 секунд без глотка — и ты в Аду.', color: 'yellow' }
    ]
    server.runCommandSilent('tellraw ' + target.username + ' ' + JSON.stringify(msg))
    ctx.source.sendSystemMessage(Text.of('Контракт отправлен игроку ' + target.username + ' (60 секунд на ответ).'))
    return 1
  }

  const accept = ctx => {
    const server = ctx.source.server
    const p = ctx.source.player
    if (!p) return 0
    const tu = String(p.uuid)
    const offer = ALCOHOL_OFFERS[tu]
    const demon = offer ? server.getPlayer(offer.demon) : null
    if (!offer || !demon) { ctx.source.sendFailure(Text.of('Нет действующего контракта.')); return 0 }
    delete ALCOHOL_OFFERS[tu]
    if (!alcoholHasAlcohol(demon)) { ctx.source.sendFailure(Text.of('У демона закончился алкоголь — контракт недействителен.')); return 0 }
    const battle = { demon: offer.demon, player: tu, demonName: offer.demonName, playerName: p.username, start: server.getTickCount(), last: {} }
    battle.last[offer.demon] = battle.last[tu] = server.getTickCount() + ALCOHOL.demonStartGrace
    const copied = alcoholCopyAlcohol(demon, p)
    p.tell(Text.of('Демон угощает: ты получил ' + copied + ' поз. выпивки. После битвы она исчезнет. Пей без остановки!').gold())
    ALCOHOL_BATTLES[offer.demon] = battle
    ALCOHOL_BATTLES[tu] = battle
    // a fair start: both sober
    alcoholRecord(server, tu).putDouble('bac', 0)
    alcoholRecord(server, offer.demon).putDouble('bac', 0)
    server.tell(Text.of('БИТВА НА ВЫПИВКЕ! Демон ' + offer.demonName + ' против игрока ' + p.username + '. Кто первым свалится — проиграл!').gold())
    return 1
  }

  const decline = ctx => {
    const p = ctx.source.player
    if (!p) return 0
    const offer = ALCOHOL_OFFERS[String(p.uuid)]
    if (!offer) { ctx.source.sendFailure(Text.of('Нет действующего контракта.')); return 0 }
    delete ALCOHOL_OFFERS[String(p.uuid)]
    const demon = ctx.source.server.getPlayer(offer.demon)
    if (demon) demon.tell(Text.of(p.username + ' струсил и отказался от контракта.').gray())
    p.tell(Text.of('Ты отказался от контракта.').gray())
    return 1
  }

  const setDemon = (value) => ctx => {
    const target = Arguments.PLAYER.getResult(ctx, 'target')
    alcoholRecord(ctx.source.server, String(target.uuid)).putBoolean('demon', value)
    ctx.source.sendSystemMessage(Text.of(target.username + (value ? ' теперь демон.' : ' больше не демон.')))
    return 1
  }

  const cancel = ctx => {
    const target = Arguments.PLAYER.getResult(ctx, 'target')
    const b = ALCOHOL_BATTLES[String(target.uuid)]
    if (!b) { ctx.source.sendFailure(Text.of(target.username + ' не в битве.')); return 0 }
    alcoholBattleEnd(ctx.source.server, b, null, 'Битва демона %d и игрока %p отменена администратором.')
    return 1
  }

  event.register(
    Commands.literal('alcoholdemon')
      .then(Commands.literal('cancel').requires(src => src.hasPermission(2))
        .then(Commands.argument('target', Arguments.PLAYER.create(event)).executes(cancel)))
      .then(Commands.literal('contract').then(Commands.argument('target', Arguments.PLAYER.create(event)).executes(contract)))
      .then(Commands.literal('accept').executes(accept))
      .then(Commands.literal('decline').executes(decline))
      .then(Commands.literal('grant').requires(src => src.hasPermission(2))
        .then(Commands.argument('target', Arguments.PLAYER.create(event)).executes(setDemon(true))))
      .then(Commands.literal('revoke').requires(src => src.hasPermission(2))
        .then(Commands.argument('target', Arguments.PLAYER.create(event)).executes(setDemon(false))))
  )
})

// contract drinks left over from a crash/restart/logout mid-battle
PlayerEvents.loggedIn(event => {
  if (!ALCOHOL_BATTLES[String(event.player.uuid)]) alcoholClearContractItems(event.player)
})
