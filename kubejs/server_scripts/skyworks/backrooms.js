// Skyworks - The Backrooms.
//
// Falling into the void (any dimension except the Backrooms themselves) no longer always kills: a little below the world
// floor the player "noclips" into skyworks:backrooms - an endless, silent, yellow maze (tools/gen_backrooms.py) - with
// everything they carried, half the time (a failed roll is the ordinary void death). By elevator it always works. Inside
// they are in Adventure mode, and the ways out are:
//   * an elevator (skyworks_dweller), wound up from the surface by someone else;
//   * the rare exits in the maze (skyworks_dweller exit.Exits): a floor exit or a rift in a wall takes you to a random safe
//     place in the overworld (the rift one time in five to the starting island); half of them are decoys;
//   * death, in any form (starvation is lethal there; vanilla stops at half a heart on Easy/Normal).
// Every way out restores health, hunger and saturation. Dying here costs everything: the items and XP drop where you die
// (BACKROOMS.keepItemsOnDeath = true gives them back on the respawn instead). The previous game mode is restored. Leaving any
// other way (commands, modded teleports, logging out) is undone: a trapped player found outside is pulled back in.
// There is no air: a worn Create diving helmet plus a backtank with air is needed, otherwise you suffocate (oxygen section
// below). Every unit of air breathed there also counts towards insanity (skyworks_dweller Insanity: whispers, phantoms).
// Food works: Lootr chests in the maze hold food.
// The elevator: whoever it brings down is trapped like a void-faller (game mode kept, Adventure inside); whoever it brings up
// carries the skyworks_elevator_exit flag and is released, keeping everything. A real exit sets skyworks_backrooms_exit:
// 'out' (already in the overworld: released) or 'island' (put on the starting island here, then released).
// Only creatures of skyworks_dweller live in there (the dweller, the stalker, the mimics, the wretch and the hound).
//
// State lives in server.persistentData.skyworks_backrooms.<uuid> (survives restarts and crashes):
//   trapped  - sent here by the void, not yet escaped     mode    - game mode to restore on escape
//   escaping - died here, waiting for the respawn          restore - inventory/XP to give back after the respawn
// Ops: /backrooms send <player> | release <player> | status <player>; /backrooms reset [confirm|cancel] is in skyworks_dweller (Java).

const BACKROOMS = {
  dim: 'skyworks:backrooms',
  trigger: 24,            // noclip this many blocks below the minimum build height (void damage starts at 64)
  chance: 0.5,            // chance to be pulled in from the void, rolled once per fall; a failed roll is the ordinary void death
  range: 1250,            // arrival chunk range (+-): a random tile centre (chunk corner), never in or next to a huge room
  floorY: 2,
  voidMargin: 0,          // the Backrooms' void rescue fires once the player is this far below the dimension's minimum build height
  starveEvery: 80,        // ticks between lethal starvation hits at 0 food
  keepItemsOnDeath: false,    // false: dying here drops what you carried where you die (true: it comes back on the respawn)
  oxygen: {
    enabled: true,
    drainPerSecond: 1,        // backtank air units per second (Create: a copper backtank holds 900)
    sprintMul: 2,             // x this while sprinting
    breathTicks: 300,         // without air the vanilla bubbles run out in this many ticks ...
    suffocateDamage: 2.0      // ... then this much drowning damage, every second
  },
  insanityKey: 'skyworks_br_insanity',   // player persistent data: tanks' worth of air breathed here (skyworks_dweller Insanity)
  dwellerMod: 'skyworks_dweller:'   // its creatures (dweller, stalker) are the only ones allowed in
}

const BrGameType = Java.loadClass('net.minecraft.world.level.GameType')
const BrItemStack = Java.loadClass('net.minecraft.world.item.ItemStack')
const BrCompoundTag = Java.loadClass('net.minecraft.nbt.CompoundTag')
const BrListTag = Java.loadClass('net.minecraft.nbt.ListTag')
const BrGameRules = Java.loadClass('net.minecraft.world.level.GameRules')
const BrEventPriority = Java.loadClass('net.neoforged.bus.api.EventPriority')
// arrival spots that avoid the huge rooms and anything a vanilla structure filled (skyworks_dweller)
const BrArrival = (() => { try { return Java.loadClass('com.skyworks.dweller.world.BackroomsArrival') } catch (e) { console.error('backrooms.js: skyworks_dweller arrival API missing: ' + e); return null } })()

const BR_SNAPSHOTS = {}   // uuid -> {items: [{slot, stack}], level, points} taken at death, consumed by the drops hook

function brIn(entity) { return String(entity.level.dimension) === BACKROOMS.dim }

function brRecord(server, uuid, create) {
  const pd = server.persistentData
  if (!pd.contains('skyworks_backrooms')) pd.put('skyworks_backrooms', new BrCompoundTag())
  const all = pd.getCompound('skyworks_backrooms')
  if (!all.contains(uuid)) {
    if (!create) return null
    all.put(uuid, new BrCompoundTag())
  }
  return all.getCompound(uuid)
}

// game mode name ('survival', 'adventure', ...): string compares, no Java enum identity games in Rhino
function brMode(player) { return String(player.gameMode.getGameModeForPlayer().getName()) }

function brExempt(player) { return player.isCreative() || player.isSpectator() }

function brSend(player, quiet) {
  const server = player.server
  const uuid = String(player.uuid)
  const rec = brRecord(server, uuid, true)
  if (!rec.getBoolean('trapped')) rec.putString('mode', brMode(player))
  rec.putBoolean('trapped', true)
  rec.remove('escaping')
  if (player.isPassenger()) player.stopRiding()      // airships and contraptions stay in the void
  let spot = null
  try { spot = BrArrival ? BrArrival.spot(server, BACKROOMS.range) : null } catch (e) { console.error('backrooms.js arrival: ' + e) }
  const x = spot ? spot[0] : Math.floor((Math.random() * 2 - 1) * BACKROOMS.range) * 16
  const z = spot ? spot[2] : Math.floor((Math.random() * 2 - 1) * BACKROOMS.range) * 16
  const yaw = Math.floor(Math.random() * 4) * 90
  server.runCommandSilent(`execute in ${BACKROOMS.dim} run tp ${uuid} ${x + 0.5} ${BACKROOMS.floorY} ${z + 0.5} ${yaw} 0`)
  player.resetFallDistance()
  player.setHealth(player.maxHealth)              // whatever it cost to get here, you arrive restored:
  player.foodData.setFoodLevel(20)                // no quick escape by starving or bleeding out at once
  player.foodData.setSaturation(5.0)
  if (brMode(player) === 'survival') player.setGameMode(BrGameType.ADVENTURE)
  if (!quiet && !rec.getBoolean('seen')) {
    rec.putBoolean('seen', true)
    player.tell(Text.of('You noclipped out of reality.').gray().italic())
  }
}

// Health, hunger, saturation and exhaustion all full: every way out of the Backrooms ends with this.
function brRestore(player) {
  player.setHealth(player.maxHealth)
  player.foodData.setFoodLevel(20)
  player.foodData.setSaturation(20.0)               // saturation can never exceed the food level: 20 is full
  player.foodData.setExhaustion(0.0)
}

// Leaving after a death: give the game mode, items and XP back.
function brEscaped(player, rec) {
  brRestore(player)
  rec.remove('escaping')
  rec.putBoolean('trapped', false)
  const mode = String(rec.getString('mode')) || 'survival'
  if (brMode(player) === 'adventure' && mode !== 'adventure') player.setGameMode(BrGameType.byName(mode, BrGameType.SURVIVAL))
  if (!rec.contains('restore')) {
    player.tell(Text.of('You wake up.').gray().italic())
    return
  }
  const res = rec.getCompound('restore')
  rec.remove('restore')
  const ra = player.registryAccess()
  const inv = player.inventory
  const items = res.getList('items', 10)
  for (let i = 0; i < items.size(); i++) {
    const c = items.getCompound(i)
    const st = BrItemStack.parseOptional(ra, c.getCompound('stack'))
    if (st.isEmpty()) continue
    const slot = c.getInt('slot')
    if (slot >= 0 && slot < inv.getContainerSize() && inv.getItem(slot).isEmpty()) inv.setItem(slot, st)
    else if (!inv.add(st)) player.drop(st, false)
  }
  if (res.getInt('level') > 0 || res.getInt('points') > 0) {
    player.setExperienceLevels(res.getInt('level'))
    player.giveExperiencePoints(res.getInt('points'))
  }
  player.tell(Text.of('You wake up. Everything you carried is still with you.').gray().italic())
}

// --- the starting island --------------------------------------------------------------------------------------------
// A rift's "island" exit (and, should anyone ever get below the Backrooms' floor, falling out) puts the player on the
// starting island, every time: the destination
// is the island recorded by start_island.js (skyworks_start_x/y/z), else the overworld's world spawn (which that script
// also moves onto the island). Health, hunger AND saturation come back full, the fall is cancelled, and the trap is
// released like any other way out (game mode back, nothing lost: items were never dropped). Only ever runs inside the
// Backrooms; the per-tick check retries every tick until the player really is out, so it cannot fail.
function brStartIsland(server) {
  const pd = server.persistentData
  if (pd.contains('skyworks_start_x')) {
    return { x: pd.getInt('skyworks_start_x') + 0.5, y: pd.getInt('skyworks_start_y'), z: pd.getInt('skyworks_start_z') + 0.5 }
  }
  const sp = server.overworld().getSharedSpawnPos()
  return { x: sp.x + 0.5, y: sp.y, z: sp.z + 0.5 }
}

function brVoidRescue(player, how) {
  const server = player.server
  const uuid = String(player.uuid)
  const dest = brStartIsland(server)
  server.runCommandSilent(`execute in minecraft:overworld run tp ${uuid} ${dest.x} ${dest.y} ${dest.z}`)
  if (brIn(player)) return                          // the teleport has not happened (yet): the tick check tries again
  player.resetFallDistance()
  player.setDeltaMovement(0, 0, 0)
  player.hurtMarked = true
  brRestore(player)
  const rec = brRecord(server, uuid, false)
  if (rec) {
    rec.remove('escaping')
    rec.putBoolean('trapped', false)
    const mode = String(rec.getString('mode')) || 'survival'
    if (brMode(player) === 'adventure' && mode !== 'adventure') player.setGameMode(BrGameType.byName(mode, BrGameType.SURVIVAL))
  }
  player.persistentData.remove(BR_OUT_FLAG)
  player.tell(Text.of(how === 'rift' ? 'You step through the light, and the island is under your feet.' : 'You fall out of the Backrooms, and land on solid ground.').gray().italic())
}

// --- the elevator -----------------------------------------------------------------------------------------------------
// In: someone found inside who is not trapped yet (the elevator brought them) is trapped the same way the void does it,
// game mode remembered, Adventure inside. Out: the elevator sets skyworks_elevator_exit on everyone it brings up; they are
// released (game mode back, nothing taken or given), and the flag is cleared.
const BR_EXIT_FLAG = 'skyworks_elevator_exit'
const BR_OUT_FLAG = 'skyworks_backrooms_exit'      // set by skyworks_dweller's exits: 'out' (released) or 'island' (go there)

function brTrap(player, rec) {
  rec.putString('mode', brMode(player))
  rec.putBoolean('trapped', true)
  rec.remove('escaping')
  if (brMode(player) === 'survival') player.setGameMode(BrGameType.ADVENTURE)
}

function brElevatorExit(player, rec, how) {
  player.persistentData.remove(BR_EXIT_FLAG)
  player.persistentData.remove(BR_OUT_FLAG)
  if (!rec) return
  rec.remove('escaping')
  rec.putBoolean('trapped', false)
  const mode = String(rec.getString('mode')) || 'survival'
  if (brMode(player) === 'adventure' && mode !== 'adventure') player.setGameMode(BrGameType.byName(mode, BrGameType.SURVIVAL))
  if (how === 'exit') brRestore(player)            // a found way out ends like every escape: health, hunger, saturation full
  player.tell(Text.of(how === 'exit' ? 'The floor gives way to grass, and the hum is gone.' : 'The doors open on daylight.').gray().italic())
}

// --- oxygen ---------------------------------------------------------------------------------------------------------
// There is no breathable air in the Backrooms. A worn Create diving helmet and a backtank with air (worn, or anywhere
// Create's own backtank suppliers look, e.g. Curios) breathe for you: once a second the tank loses drainPerSecond air
// (x sprintMul while sprinting); Create's own low-air and empty warnings fire as usual. Without the helmet or with
// empty tanks the vanilla bubbles run out and then you take drowning damage until you die. Creative and spectator are
// exempt. The vanilla bubble row doubles as the "no air" gauge; the action bar shows the tank while breathing.
const BrBacktankUtil = (() => { try { return Java.loadClass('com.simibubi.create.content.equipment.armor.BacktankUtil') } catch (e) { console.error('backrooms.js oxygen: Create backtank API missing: ' + e); return null } })()
const BrDivingHelmet = (() => { try { return Java.loadClass('com.simibubi.create.content.equipment.armor.DivingHelmetItem') } catch (e) { return null } })()

const BR_BREATH = {}   // uuid -> remaining breath ticks while there is no air

// true when the player is breathing from a tank; drains it once a second
function brBreathe(player) {
  if (!BrBacktankUtil || !BrDivingHelmet) return false
  if (!BrDivingHelmet.isWornBy(player)) return false
  const tanks = BrBacktankUtil.getAllWithAir(player)
  if (tanks.isEmpty()) return false
  if (player.tickCount % 20 === 0) {
    const tank = tanks.get(0)
    const cost = Math.max(1, Math.round(BACKROOMS.oxygen.drainPerSecond * (player.isSprinting() ? BACKROOMS.oxygen.sprintMul : 1)))
    BrBacktankUtil.consumeAir(player, tank, cost)
    const max = BrBacktankUtil.maxAir(tank)
    // insanity counts tanks' worth of air breathed here, across tank swaps (a fresh tank doesn't lower it)
    const pd = player.persistentData
    pd.putDouble(BACKROOMS.insanityKey, pd.getDouble(BACKROOMS.insanityKey) + cost / Math.max(1, max))
    const left = BrBacktankUtil.getAir(tank)
    const secs = Math.floor(left / Math.max(1, BACKROOMS.oxygen.drainPerSecond))
    player.setStatusMessage(Text.of('Air ' + Math.round(100 * left / Math.max(1, max)) + '%  (' + Math.floor(secs / 60) + ':' + ('0' + (secs % 60)).slice(-2) + ')').color(left * 4 < max ? 'red' : 'aqua'))
  }
  return true
}

// Water Breathing (and anything named like it) does nothing for lungs in a place with no air to breathe: it is stripped
// from everyone inside, every tick, so it can neither refill the bubbles nor be a way round the suffocation.
function brStripWaterBreathing(player) {
  const effects = player.getActiveEffects().toArray()
  for (let i = 0; i < effects.length; i++) {
    const holder = effects[i].getEffect()
    let id = ''
    try { id = String(holder.getRegisteredName()).toLowerCase() } catch (e) { id = String(holder).toLowerCase() }
    if (id.indexOf('water_breathing') >= 0 || id.indexOf('underwater_breathing') >= 0 || id.indexOf('waterbreathing') >= 0) player.removeEffect(holder)
  }
}

function brOxygen(player, inside) {
  const uuid = String(player.uuid)
  const cfg = BACKROOMS.oxygen
  if (inside && !brExempt(player) && player.isAlive()) brStripWaterBreathing(player)
  if (!inside || !cfg.enabled || brExempt(player) || !player.isAlive()) {
    if (BR_BREATH[uuid] !== undefined) {
      delete BR_BREATH[uuid]
      if (player.airSupply < player.maxAirSupply) player.setAirSupply(player.maxAirSupply)
    }
    return
  }
  if (brBreathe(player)) {
    if (BR_BREATH[uuid] !== undefined && BR_BREATH[uuid] < cfg.breathTicks) BR_BREATH[uuid] = Math.min(cfg.breathTicks, BR_BREATH[uuid] + 4)
    else BR_BREATH[uuid] = cfg.breathTicks
    player.setAirSupply(Math.min(player.maxAirSupply, BR_BREATH[uuid]))
    return
  }
  let breath = (BR_BREATH[uuid] === undefined ? cfg.breathTicks : BR_BREATH[uuid]) - 1
  if (breath <= -20) {
    breath = 0
    const before = player.health
    player.hurt(player.damageSources().drown(), cfg.suffocateDamage)
    // drowning can be soaked up by other mods or effects: the lack of air in here is not
    if (player.isAlive() && player.health >= before) player.hurt(player.damageSources().genericKill(), cfg.suffocateDamage)
  }
  BR_BREATH[uuid] = breath
  player.setAirSupply(breath)          // vanilla refills the bubbles every tick out of water; set them again after it did
  if (player.tickCount % 20 === 0) player.setStatusMessage(Text.of('No air!').red().bold())
}

// --- void -> Backrooms (checked every tick: a falling player covers ~4 blocks per tick) ------------------------------
// The chance of being pulled in is BACKROOMS.chance (50 %), rolled once per fall: a failed roll leaves the player to the
// ordinary void death, and nothing is rolled again until they are back above the trigger.
const BR_FALL = {}   // uuid -> true once this fall has been rolled

PlayerEvents.tick(event => {
  const player = event.player
  if (player.level.isClientSide()) return
  const inside = brIn(player)
  const uuid = String(player.uuid)
  const falling = !inside && player.y < player.level.minBuildHeight - BACKROOMS.trigger && player.isAlive() && !brExempt(player)
  if (!falling) delete BR_FALL[uuid]
  else if (!BR_FALL[uuid]) {
    BR_FALL[uuid] = true
    if (Math.random() < BACKROOMS.chance) {
      try { brSend(player, false) } catch (e) { console.error('backrooms.js send: ' + e) }
      return
    }
  }
  if (inside && !player.isSpectator() && player.isAlive() && player.y < player.level.minBuildHeight - BACKROOMS.voidMargin) {
    try { brVoidRescue(player, 'void') } catch (e) { console.error('backrooms.js void rescue: ' + e) }
    return
  }
  if (inside && player.isAlive() && String(player.persistentData.getString(BR_OUT_FLAG)) === 'island') {
    try { brVoidRescue(player, 'rift') } catch (e) { console.error('backrooms.js island exit: ' + e) }
    return
  }
  try { brOxygen(player, inside) } catch (e) { if (player.tickCount % 200 === 0) console.error('backrooms.js oxygen: ' + e) }

  if (player.tickCount % 20 !== 0) return

  let rec = brRecord(player.server, String(player.uuid), false)
  if (player.isAlive() && player.persistentData.getBoolean(BR_EXIT_FLAG) && !inside) {
    try { brElevatorExit(player, rec, 'elevator') } catch (e) { console.error('backrooms.js elevator exit: ' + e) }
    return
  }
  if (player.isAlive() && String(player.persistentData.getString(BR_OUT_FLAG)) === 'out' && !inside) {
    try { brElevatorExit(player, rec, 'exit') } catch (e) { console.error('backrooms.js exit: ' + e) }
    return
  }
  if (inside && player.isAlive() && !brExempt(player) && (!rec || (!rec.getBoolean('trapped') && !rec.getBoolean('escaping')))) {
    try { brTrap(player, rec || brRecord(player.server, uuid, true)) } catch (e) { console.error('backrooms.js trap: ' + e) }
    rec = brRecord(player.server, uuid, false)
  }
  if (rec && player.isAlive()) {
    try {
      if (rec.getBoolean('escaping')) {
        if (inside) {                               // the death was cancelled (another mod saved them)
          rec.remove('escaping')
          const snap = BR_SNAPSHOTS[String(player.uuid)]
          if (snap) {                               // XP was zeroed at death: give it back
            delete BR_SNAPSHOTS[String(player.uuid)]
            player.setExperienceLevels(snap.level)
            player.giveExperiencePoints(snap.points)
          }
        } else brEscaped(player, rec)
      } else if (rec.getBoolean('trapped')) {
        if (brExempt(player)) rec.putBoolean('trapped', false)                  // an op took over
        else if (!inside) brSend(player, true)                                  // no way out but one
        else if (brMode(player) === 'survival') player.setGameMode(BrGameType.ADVENTURE)
      }
    } catch (e) { console.error('backrooms.js state: ' + e) }
  }

  if (inside && player.tickCount % BACKROOMS.starveEvery === 0 && player.foodData.foodLevel === 0 && !brExempt(player)) {
    player.hurt(player.damageSources().starve(), 1.0)
  }
})

// --- dying in the Backrooms -----------------------------------------------------------------------------------------
EntityEvents.death(event => {
  const player = event.entity
  if (!player.isPlayer() || !brIn(player)) return
  const uuid = String(player.uuid)
  brRecord(event.server, uuid, true).putBoolean('escaping', true)
  // dying in here costs everything, even where keepInventory is on: the items fall where the player died
  if (!BACKROOMS.keepItemsOnDeath && player.level.gameRules.getBoolean(BrGameRules.RULE_KEEPINVENTORY)) player.inventory.dropAll()
  if (!BACKROOMS.keepItemsOnDeath || player.level.gameRules.getBoolean(BrGameRules.RULE_KEEPINVENTORY)) return
  // inventory layout snapshot; the drops hook below keeps only what really drops (curse of vanishing stays lost)
  const inv = player.inventory
  const snap = { items: [], level: player.experienceLevel, points: Math.round(player.experienceProgress * player.getXpNeededForNextLevel()) }
  for (let i = 0; i < inv.getContainerSize(); i++) {
    const st = inv.getItem(i)
    if (!st.isEmpty()) snap.items.push({ slot: i, stack: st.copy() })
  }
  BR_SNAPSHOTS[uuid] = snap
  player.setExperienceLevels(0)   // no XP orbs: the XP comes back on respawn
  player.setExperiencePoints(0)
})

// LOWEST priority so drops added by other mods (Curios slots) are caught too. NativeEvents listeners survive
// /reload; stale copies see their own (empty) snapshot table and do nothing.
NativeEvents.onEvent(BrEventPriority.LOWEST, 'net.neoforged.neoforge.event.entity.living.LivingDropsEvent', event => {
  const player = event.entity
  if (!player || !player.isPlayer() || player.level.isClientSide()) return
  const uuid = String(player.uuid)
  const snap = BR_SNAPSHOTS[uuid]
  if (!snap) return
  delete BR_SNAPSHOTS[uuid]
  // `let`, not `const`, inside this block: Rhino throws "redeclaration of var" for block-level consts in a function
  // that has a closure (entry), which sent every Backrooms death down the catch below and dropped the items.
  try {
    let ra = player.registryAccess()
    let drops = event.drops.toArray()
    let used = []
    let items = new BrListTag()
    let entry = (slot, stack) => {
      let c = new BrCompoundTag()
      c.putInt('slot', slot)
      c.put('stack', stack.save(ra))
      items.add(c)
    }
    for (let s of snap.items) {
      for (let j = 0; j < drops.length; j++) {
        if (!used[j] && BrItemStack.matches(s.stack, drops[j].item)) { used[j] = true; entry(s.slot, drops[j].item); break }
      }
    }
    for (let j = 0; j < drops.length; j++) {
      if (!used[j]) entry(-1, drops[j].item)
    }
    let res = new BrCompoundTag()
    res.put('items', items)
    res.putInt('level', snap.level)
    res.putInt('points', snap.points)
    brRecord(player.server, uuid, true).put('restore', res)
    event.drops.clear()
  } catch (e) {
    console.error('backrooms.js drops (items drop normally): ' + e)
  }
})

// --- nothing else lives here ----------------------------------------------------------------------------------------
function brForeign(e) { return e.isLiving() && !e.isPlayer() && brIn(e) && !String(e.getEncodeId()).startsWith(BACKROOMS.dwellerMod) }

// spawn checks also run for /summon (finalizeSpawn): without the exception /summon skyworks_dweller:... was cancelled
EntityEvents.checkSpawn(event => {
  if (brForeign(event.entity)) event.cancel()
})

EntityEvents.spawned(event => {
  if (brForeign(event.entity)) event.cancel()
})

// --- ops ------------------------------------------------------------------------------------------------------------
ServerEvents.commandRegistry(event => {
  const { commands: Commands, arguments: Arguments } = event
  const target = ctx => Arguments.PLAYER.getResult(ctx, 'target')
  const send = ctx => {
    const p = target(ctx)
    brSend(p, false)
    ctx.source.sendSystemMessage(Text.of(p.username + ' was sent to the Backrooms.'))
    return 1
  }
  const release = ctx => {
    const p = target(ctx)
    const rec = brRecord(ctx.source.server, String(p.uuid), true)
    rec.putBoolean('escaping', true)          // same path as a death, minus the dying
    if (brIn(p)) {
      const sp = ctx.source.server.overworld().getSharedSpawnPos()
      ctx.source.server.runCommandSilent(`execute in minecraft:overworld run tp ${p.uuid} ${sp.x + 0.5} ${sp.y} ${sp.z + 0.5}`)
    }
    brEscaped(p, rec)
    ctx.source.sendSystemMessage(Text.of(p.username + ' was released from the Backrooms.'))
    return 1
  }
  const status = ctx => {
    const p = target(ctx)
    const rec = brRecord(ctx.source.server, String(p.uuid), false)
    ctx.source.sendSystemMessage(Text.of(p.username + ': ' + (brIn(p) ? 'in the Backrooms' : 'outside') + ', record ' + (rec ? rec : '{}')))
    return 1
  }
  event.register(
    Commands.literal('backrooms').requires(src => src.hasPermission(2))
      .then(Commands.literal('send').then(Commands.argument('target', Arguments.PLAYER.create(event)).executes(send)))
      .then(Commands.literal('release').then(Commands.argument('target', Arguments.PLAYER.create(event)).executes(release)))
      .then(Commands.literal('status').then(Commands.argument('target', Arguments.PLAYER.create(event)).executes(status)))
  )
})
