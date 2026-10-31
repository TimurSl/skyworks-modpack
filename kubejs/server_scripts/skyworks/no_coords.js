// Skyworks - no coordinates / biome in F3. Players find islands and biomes the Minecraft way
// (compasses, spyglass, exploring). reducedDebugInfo hides XYZ, facing-chunk, biome and light data
// and disables F3+G chunk borders for every client. Re-applied on load and on every join so an
// admin's `/gamerule` change or a new dimension cannot leave it off.

const NoCoordsRules = Java.loadClass('net.minecraft.world.level.GameRules')

const forceReducedDebug = server => {
  server.getGameRules().getRule(NoCoordsRules.RULE_REDUCEDDEBUGINFO).set(true, server)
}

ServerEvents.loaded(event => forceReducedDebug(event.server))
PlayerEvents.loggedIn(event => forceReducedDebug(event.server))
