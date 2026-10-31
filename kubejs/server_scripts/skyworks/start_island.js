// Skyworks - start island placement (runs once per world, on first server load).
//
// The sky-island generator aims vanilla's spawn finder at "void sea" climate
// (see src/worldgen/params.json -> spawn_target). Here we search outwards from that
// spawn for a column area with no terrain near the target height, place the
// skyworks:start_island template there and move world spawn onto it.
// Never softlocks: if no clear area is found, the island is placed high above spawn.

const SKYWORKS_ISLAND = {
  template: 'skyworks:start_island',
  size: 13,
  spawnOffset: [6, 7, 9],   // must match tools/gen_start_island.py START_SPAWN
  targetY: 96,              // template base Y (grass at +6)
  clearance: 40,            // nothing may rise above targetY - clearance in the footprint area
  sample: 24,               // sample points at +-24 blocks around a candidate (48x48 area)
  step: 64,
  maxRadius: 512,
  fallbackY: 230
}

ServerEvents.loaded(event => {
  const server = event.server
  const pd = server.persistentData
  if (pd.getBoolean('skyworks_start_island')) return

  const C = SKYWORKS_ISLAND
  const level = server.overworld()
  const Types = Java.loadClass('net.minecraft.world.level.levelgen.Heightmap$Types')
  const spawn = level.getSharedSpawnPos()
  const limit = C.targetY - C.clearance
  let checks = 0

  // NOTE: Level#getHeight returns the minimum build height for chunks that are not loaded,
  // so every sampled chunk is loaded (generated) explicitly first.
  const heightAt = (x, z) => {
    checks++
    level.getChunk(x >> 4, z >> 4)
    return level.getHeight(Types.WORLD_SURFACE, x, z)
  }
  const clearAt = (cx, cz) => {
    const offs = [[0, 0], [-C.sample, -C.sample], [C.sample, -C.sample], [-C.sample, C.sample], [C.sample, C.sample],
                  [0, -C.sample], [0, C.sample], [-C.sample, 0], [C.sample, 0]]
    for (let o of offs) {
      if (heightAt(cx + o[0], cz + o[1]) > limit) return false
    }
    // dense check of the island footprint plus an 8-block margin
    for (let dx = -14; dx <= 14; dx += 4) {
      for (let dz = -14; dz <= 14; dz += 4) {
        if (heightAt(cx + dx, cz + dz) > limit) return false
      }
    }
    return true
  }

  let found = null
  for (let r = 0; r <= C.maxRadius && !found; r += C.step) {
    let ring = []
    if (r === 0) ring.push([0, 0])
    else {
      for (let d = -r; d <= r; d += C.step) { ring.push([d, -r]); ring.push([d, r]) }
      for (let d = -r + C.step; d <= r - C.step; d += C.step) { ring.push([-r, d]); ring.push([r, d]) }
    }
    ring.sort((a, b) => (a[0] * a[0] + a[1] * a[1]) - (b[0] * b[0] + b[1] * b[1]))
    for (let p of ring) {
      if (clearAt(spawn.x + p[0], spawn.z + p[1])) { found = [spawn.x + p[0], spawn.z + p[1]]; break }
    }
  }

  let x, y, z
  if (found) { x = found[0]; z = found[1]; y = C.targetY }
  else { x = spawn.x; z = spawn.z; y = C.fallbackY; console.warn('[Skyworks] no clear void area found; using high-altitude fallback') }
  const ox = x - Math.floor(C.size / 2), oz = z - Math.floor(C.size / 2)
  const sx = ox + C.spawnOffset[0], sy = y + C.spawnOffset[1], sz = oz + C.spawnOffset[2]
  const fl = `${ox - 1} ${oz - 1} ${ox + C.size} ${oz + C.size}`
  // 'place template' needs the footprint chunks loaded: force-load them for the placement only.
  server.runCommandSilent(`execute in minecraft:overworld run forceload add ${fl}`)
  server.runCommandSilent(`execute in minecraft:overworld run setworldspawn ${sx} ${sy} ${sz}`)
  server.runCommandSilent('gamerule spawnRadius 0')
  pd.putInt('skyworks_start_x', sx); pd.putInt('skyworks_start_y', sy); pd.putInt('skyworks_start_z', sz)

  const attempt = (n) => {
    server.runCommandSilent(`execute in minecraft:overworld run place template ${C.template} ${ox} ${y} ${oz}`)
    const placed = String(level.getBlock(ox + 6, y + 6, oz + 6).id)
    if (placed !== 'minecraft:air') {
      pd.putBoolean('skyworks_start_island', true)
      server.runCommandSilent(`execute in minecraft:overworld run forceload remove ${fl}`)
      console.info(`[Skyworks] start island placed at ${ox},${y},${oz} (spawn ${sx},${sy},${sz}) attempt ${n}; vanilla spawn ${spawn.x},${spawn.z}; ${checks} height checks; centre ${placed}`)
    } else if (n < 10) {
      server.scheduleInTicks(20, () => attempt(n + 1))
    } else {
      console.error(`[Skyworks] FAILED to place start island at ${ox},${y},${oz}; will retry on next server start`)
    }
  }
  attempt(1)
})
