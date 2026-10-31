# Progression — Skyworks: Industrial Arcana

A sandbox Skyblock in a **procedural sky-island world**. Nothing is hard-gated: the questbook (FTB Quests,
20 chapters) is a **tips book with rewards** — progression mode *flexible* (dependencies never lock
anything) and **every quest is `optional`** (never required for chapter completion). Each quest gives a small
reward: food, building blocks, a few basic materials or XP, never machines that skip a production chain.
Chapters: Getting Started, Tips & Tools, Skyblock Survival, Create Basics, Resource Automation, Logistics &
Automation, Food & Farming, Industrial Production, Fan Processing & Desires, Power & Engines, Enchanting &
Experience, Airship Construction, Vehicles & Flight, Chemistry, Artillery, Hex Casting, Exploration,
Music/Art & Fun, Advanced Engineering, Cybernetics.

## The world

* **Start:** a 13×13 island (grass/dirt over a tapered stone core) placed once per world by
  `kubejs/server_scripts/skyworks/start_island.js` in open void near spawn (≥ 40 blocks of clear air below the
  target height in a 48×48 area + dense footprint check; high-altitude fallback, so it can never fail).
  Spawn is set onto it with `spawnRadius 0`.
* **Starter chest** (loot table `skyworks:chests/start_island`, all guaranteed): quest book, 2 ice (→ infinite
  water), lava bucket, dripstone block + 2 pointed dripstone + cauldron (renewable lava), 2 oak + 1 birch sapling,
  wheat/melon/pumpkin seeds, sugar cane, sweet berries, 8 bone meal, 6 bread, 4 torches, 3 iron ingots.
* **Island core:** 16 andesite, 3 iron ore, 2 copper ore, 4 coal ore, 3 sand, 2 gravel, 1 clay.
* **Other islands (patch v1c):** lone cone-shaped islands of every overworld biome — top radius 10–20 blocks
  (measured 11.2–17.5), 18–33 blocks deep, tops at y 70–190, at most one per 160-block grid cell and only in half of
  them (~9 islands per 784×784 blocks; nearest island centres ≥ 114 blocks apart, median ~160); no big islands, no fragments, no caves. None within 1000 blocks
  of spawn; void seas (ocean climate) are empty or hold rare small islets. Ores (vanilla, Create zinc, TFMG,
  Chemica, CGS) keep vanilla's relative density × 0.3: ~1.2 % of island blocks, ≤ 1.9 % on any island
  (devlog/worldgen/o2.json). Before v1c: islands up to r 31 / 115k blocks, ~300 crumbs, ores ~14 %.
* **Structures (patch v1b): essentials only.** Strongholds (End access), Moog's mega fortress (the Nether fortress:
  blazes, wither skeletons, upgrade templates), Nether meteors (the only ancient debris), ancient cities (the only
  Hex ancient scrolls) and End cities. Every other structure set — vanilla and mods (villages, outposts, trial
  chambers, bastions, MSS, Create Structures Arise, Creat Aeronautics Structures, When Dungeons Arise, sky whales,
  floating/lost islands, Moog's End/Nether extras) — is disabled. None generates within 1000 blocks of the origin
  (start island); two of a kind are 720–976 blocks apart (strongholds: vanilla rings, first ring ≥ 1280 blocks).
* **Nether (patch v1c):** a void with the same cone islands, rarer (192-block grid, ~10 per 784×784 blocks) and at
  the small end (measured radius 10.9–15.3); ores ≤ 2.5 % per island (nether quartz back to vanilla density).
* **Quartz meteors (patch v1c):** floating quartz geodes, ~1 per 300 chunks in the overworld sky and ~1 per 40–50
  chunks in the Nether void. Clusters drop quartz.

## Stages (suggested)

| Stage | Goal | Key steps |
|---|---|---|
| 1 Survival | food, cobblestone, first iron | ice → water; cobble generator; dripstone lava farm; tree farm; bridge to the nearest island (30–60 blocks on the tested seeds); mine iron/copper/zinc/andesite there. |
| 2 Mechanical | rotation and first machines | andesite alloy → shafts/cogs → water wheel → millstone (cobble → gravel) → press (iron sheets) → encased fan (washing gravel → iron nuggets). |
| 3 Industrial | automated resources | drill on cobble gen; crushing wheels (gravel → sand → dust); sifters with string/andesite meshes; mixer (Skyworks renewable dirt); zinc. |
| 4 Flight | leave the start cluster | Nether trip (blaze burner, quartz); hot-air balloon or levitite raft with propellers; explore and haul ore. Early balloons are possible as soon as you have a burner and envelopes. |
| 5 Chemistry | TFMG + Chemica | coke ovens/blast furnace (steel); nitrate (crushed dirt) + sulfur → gunpowder; chemical vats; sulfuric acid; crude oil (Nether pumpjacks or Skyworks bio-crude) → distillation → fuels, plastics. |
| 6 Artillery | Create Big Cannons | cast iron → cannon parts; mounts; powder charges from industrial gunpowder; guncotton/nitropowder from the chemistry line; loaders; ships with cannons. |
| 7 Magic | Hex Casting | amethyst (geodes in deep islands, or Skyworks superheated quartz→amethyst); staff; media from crushed amethyst; chargers make charged amethyst; foci, cyphers, HexFlow loops, HexAutomata reactive foci. Available as early as you find amethyst. |
| 3–8 Cybernetics | Create: Cybernetics implants | Mk. I right after the andesite age (andesite casing, copper/iron sheets, a Precision Mechanism, unheated mixer for Bio-Interface Gel, the Rig at 16 RPM, Mechanical Crafters for the implants); Mk. II with a blaze burner (brass sheets, electron tubes); Mk. III with golden sheets and more Precision Mechanisms; Mk. IV with sturdy sheets, netherite scrap from Nether meteors and heated Neural Gel; Mk. V with ancient-city echo shards and netherite ingots (see the Cybernetics chapter). |
| 8 Advanced | scale | mechanical crafters, vaults/stock tickers, advanced brass mesh (diamonds), industrial airships, defended bases, crossing the deep void seas. |

## Skyworks recipes (gap fillers, all in `skyworks-core`)

| Recipe | Machine | Why |
|---|---|---|
| gravel + 2 bone meal + 250 mB water → dirt | Mixer | No other renewable dirt; dirt feeds farms, sifting and **TFMG nitrate** (crushed dirt). |
| clay ball + lime dye + 100 mB water → slime ball | Mixer | Super glue/sticky pistons without relying on slime chunks. |
| 8 leaves + 250 mB water → 100 mB crude oil (**superheated**) | Press + basin (compacting) | TFMG oil deposits need bedrock → none in the sky. Hydrothermal liquefaction of biomass. |
| 2 quartz → 1 amethyst shard (no heat); **superheated** → 2 shards | Mixer | Hex Casting must not depend on finding a geode or a blaze. |
| amethyst shard → 4 (+0.5) amethyst dust | Crushing wheels | Industrial media supply for Hex Casting. |
| amethyst shard → charged amethyst (60 kFE) | C&A charger | "Industrial Arcana": electricity infuses amethyst. |
| sticks + zinc ingot → zinc mesh | Crafting | Mesh existed without a recipe. |
| gravel → lead, nickel, lithium, bauxite, lignite, tin, silver, sulfur | Sifter + zinc mesh | Renewable TFMG/Chemica metals. |
| sifter dust → antimony, cobalt, fluorite, phosphorus, chromium, vanadium, tungsten, magnesium, rutile, platinum | Sifter + zinc mesh | Renewable Chemica trace elements. |
| (data) TFMG oil deposits in the Nether | Pumpjack | Natural crude-oil source. |

Plus 1.21.1-format fixes of broken upstream recipes (Chemica ore crushing ×11, caustic soda, Create Deco placard) — see COMPATIBILITY.md.

## Resource availability audit

Legend — *Stage*: when it is normally needed. *Softlock risk*: what happens if the player is unlucky.

| Resource | Initial acquisition | Renewable / automated source | Machinery | Stage | Softlock risk |
|---|---|---|---|---|---|
| Wood | start tree, saplings | tree farms; sifting leaves (saplings) | — / mechanical saw, harvesters | 1 | Low: 3 saplings + leaf drops; other islands have trees. |
| Stone / cobblestone | island core | lava + water generator; **Mechanical Extruder** (cobble, basalt, andesite, diorite, granite, deepslate, end stone, Create ore-stones with catalysts) | drill / extruder | 1–2 | None after cobble gen (lava bucket + 2 ice provided). |
| Dirt | island top | **Skyworks mixing** (gravel + bone meal + water) | mixer | 1–3 | Low: grass islands nearby; renewable from stage 3. |
| Sand / gravel | island core; islands | millstone/crushing (cobble → gravel → sand) | millstone, crushing wheels | 2 | None. |
| Clay | island core (1) | washing sand; crushing gravel (5%); milling dripstone | fan, crushing | 2 | None. |
| Iron | 3 ingots + 3 ore on start island; ore on islands | washing gravel (12.5% nugget); sifting gravel (andesite/brass mesh) | fan / sifter | 1–3 | Low: start iron covers tools; islands 30–60 blocks away have ore; washing is fully renewable. |
| Copper | 2 ore on start island; islands | sifting gravel (nuggets, crushed ore) | sifter | 2–3 | None. |
| Zinc | islands (Create zinc ore) | sifting gravel (andesite mesh nuggets; brass mesh crushed); washing crushed zinc | sifter | 2–3 | Low: andesite alloy also accepts iron nuggets. |
| Gold | islands; Nether | sifting gravel/sand; Nether gold, piglins | sifter | 3 | None. |
| Andesite | 16 in start core; islands | Create compacting (flint + gravel + lava); sifting dirt (andesite pebbles) | press/basin, sifter | 1–2 | Low: islands are full of andesite. |
| Coal | 4 ore on start island; islands | charcoal (smelting logs); sifting gravel | furnace / sifter | 1 | None. |
| Redstone | islands | sifting sand / dust; crushing redstone ore | sifter | 3 | None. |
| Lapis lazuli | islands | sifting gravel (brass mesh) | sifter | 4 | None. |
| Diamonds | deep islands (rare) | sifting gravel (advanced brass mesh, 1/10000 per gravel) | sifter | 8 | None (renewable late, very slow). |
| Emeralds | villages on islands | villager trading; crushing emerald ore | — | 4+ | Not essential for progression. |
| Quartz | quartz meteor geodes in the overworld sky (clusters drop 4 quartz); Nether islets and meteors | sifting soul sand / crushed netherrack (1/800) | sifter | 4 | Low: geodes need no Nether trip. |
| Blaze rods | Nether fortress (mega fortress, ≥ 1000 blocks from the Nether origin) | blaze spawners | — | 4 | Long fortress search (airship); blaze burner needs one live blaze (no recipe). |
| Netherite | ancient debris in Nether meteors only (2–5 per meteor) | none (sifting, Chemica zelosite and Ore Excavation routes removed) | — | 8 | Rare by design; upgrade templates from fortress treasure chests. |
| Hex ancient scrolls (great spells) | ancient city chests: 5 % scroll cache | none | — | 7–8 | Rare by design; all other Hex scroll injections are off. |
| Ender pearls | endermen (spawn on islands) | sifting crushed end stone (sturdy mesh) | sifter | 6–8 | Low. |
| Nether resources (wart, soul sand, netherrack) | Nether | sifting soul sand (wart); farms | sifter | 4 | None once in the Nether. |
| End progression | stronghold (portal frames verified) | — | — | 8 | Strongholds may float partly over void — reachable by bridge/airship. |
| Slime balls | slimes on swamp/low islands | **Skyworks mixing** (clay + lime dye + water) | mixer | 3 | None. |
| Gunpowder | creepers | sifting sand; **TFMG mixing** (nitrate + sulfur + charcoal); Create zinc washing byproduct | mixer/sifter | 3–5 | None. |
| Sulfur | crushing redstone ore (Chemica byproduct); Nether sulfur | sifting gravel (zinc mesh); Chemica leaching/electrolysis | crushing, sifter, vat | 5 | None. |
| Nitrate | — | crushing dirt (TFMG) on renewable dirt | crushing wheels | 5 | None. |
| Crude oil | Nether oil deposits (Skyworks) | **Skyworks bio-crude** (superheated compacting of leaves) | pumpjack / press | 5 | None. |
| Steel | — | TFMG coke oven + blast furnace (iron + coke) | TFMG multiblocks | 5 | None. |
| Lead / nickel / lithium / bauxite | TFMG ores in islands | sifting gravel (zinc mesh) | sifter | 5 | None. |
| Chemica minerals | Chemica ores in islands | sifting dust (zinc mesh), leaching | sifter, vat | 5 | None. |
| Amethyst | geodes in deep islands; loot | budding amethyst (Hex brainsweep recipe); **Skyworks** quartz → amethyst (superheated) | mixer | 7 | None. |
| Hex media (dust/charged) | amethyst clusters | **Skyworks** crushing shards; C&A charging | crushing, charger | 7 | None. |
| Villagers (Hex brainsweep) | cured zombie villagers (no villages since patch v1b) | breeding | — | 7 | Medium: needs a zombie villager, weakness and a golden apple. |
| Cannon metals | iron, bronze, steel | as above | CBC casting/boring | 6 | None. |
| Levitite (airships) | end stone powder mixing (Aeronautics) | end stone (End) | mixer | 4–8 | Balloons/propellers need no levitite, so flight is possible before the End. |

**Sifting (patch v1b):** every sifting result is an absolute 1/800 roll (copper and iron 1/1000, diamonds 1/10000);
sifters are a slow bulk source, not a shortcut. Rules live in `kubejs/server_scripts/skyworks/rebalance.js`.

Late game: **Create Ore Excavation** veins are infinite and placed per chunk region regardless of terrain, so they also
sit under open void — find one with the vein finder, build a platform and drill. Overworld: iron, copper, gold, zinc,
coal, redstone, lapis, emerald, diamond (rarer); Nether: quartz, glowstone, nether gold (the netherite vein is removed). Each type
spawns once per 128–512-chunk region, so expect long airship trips.

Drinks: Brewin' and Chewin' keg (wheat, honey, potatoes, rice → beer, mead, vodka, rice wine; bread → kvass), Create
Winery (grapes — plains/forest islands or dirt sifting) and Create: Alcohol Industry; all inputs are farmable.

## Loot (exploration rewards)

Global loot modifiers add four themed tables (rolls gated by random chance; verified in game):
* **mechanical salvage** (45%) → dungeons, mineshafts, village smiths, shipwreck supplies, MSS houses, wreck resources:
  alloy, shafts, cogs, sheets, nuggets, belts, string mesh, super glue.
* **industrial rare** (30%) → outposts, stronghold corridors, mansions, bastions, MSS rare/castle/arena, pillager airships:
  brass, cast iron, steel, precision mechanism, brass mesh, shot, powder charges, fuzes, levitite.
* **arcane** (40%) → stronghold libraries, ancient cities, temples, MSS crystal/amethyst cove: amethyst dust/shards,
  charged amethyst, slates, foci, lapis.
* **airship parts** (50%) → crashed planes/airships: envelopes, propellers, honey glue, rope connectors, levitite.

Since patch v1b only stronghold, mega fortress, ancient city and End city chests exist, so most targets above are inert.
* **ancient scroll cache** (5 % per ancient city chest; measured 18 in 400): one Hex ancient scroll (per-world great
  spell) + charged amethyst, echo shards and amethyst dust. Hex's own scroll injections (14 chests) are switched off.
* Mega fortress treasure chests no longer contain netherite ingots, scrap or ancient debris.

No assembled endgame machines are added to loot. Upstream structure loot is unchanged except a broken Creat Aeronautics
table that was fixed.
