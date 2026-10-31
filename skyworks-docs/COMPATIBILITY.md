# Compatibility — Skyworks: Industrial Arcana

Minecraft 1.21.1 · NeoForge 21.1.264 · Java 21. Researched 2026-10-24/25 against Modrinth, the mods' GitHub
repositories/CI, and **the dependency metadata inside every jar** (`tools/manifest.py inspect`, which also
checks jar-in-jar mods and language providers). Status of every claim below is *verified* unless marked otherwise.

## 1. Mandatory core mods

| Requirement | Result | Version | Notes |
|---|---|---|---|
| Create | ✅ installed | 6.0.10 | Base for all addons; every addon's declared Create range is satisfied. |
| Create Aeronautics | ✅ installed | 1.3.2 (bundled jar: Simulated + Aeronautics + Offroad) | Requires Sable `[2.0.0,3.0.0)`. |
| Sable (+ Veil) | ✅ installed | 2.0.6 (bundles Veil 4.3.2, Sable Companion) | Declares **Sodium < 0.8.12-alpha.2 incompatible**. Veil declares **Embeddium incompatible**. |
| Create Big Cannons | ✅ installed | 5.11.7 (+ Ritchie's Projectile Library 2.1.2) | Native Sable/Aeronautics support since 5.11.3–5.11.4 (recoil on ships, impact forces, shots inherit ship velocity, cannons attach on assembly). |
| Hex Casting | ⚠️ installed, **alpha** | 0.12.0-devel-pre-64 (official CI build #64, MIT) | No 1.21.1 *release* exists on Modrinth/CurseForge (releases stop at 1.20.1). The official `1.21` branch is built on the maintainers' CI; the 1.21.1 addon ecosystem (HexFlow, HexAutomata, HexParse …) targets these "pre" builds, so this is the only build that supports addons. Alternative rejected: *HexCast NEOFORGED* 0.11.1 (community port, no addon support). Risk: breaking changes between pre builds — addons are pinned to `pre64`. |
| Kotlin for Forge | ✅ required | 5.12.0 | Hex Casting is a `kotlinforforge` language-provider mod. Found by the first failed server boot (`Missing language kotlinforforge`); `inspect` now checks language providers statically. |

## 2. Chemistry — Destroy is not available

* **Destroy** (petrolpark): latest release is **1.20.1 only**. A `1.21.1-neo` branch exists on GitHub without
  releases; the mod is *All Rights Reserved*, so building and redistributing it is not allowed. **Not installed.**
* **Create: Chemistry** (arthuulol): small (sulfur, a few acids, ethanol); deemed too thin for the brief.
* **Chosen system:** *Create: TFMG Community Edition* 1.3.2a (petrochemistry: distillation towers, fuels,
  steel, plastics, chemical vats/electrolysis, engines, electricity) **+ Chemica** 0.7.1 *(beta)* (acids, PVC/epoxy,
  carbon fibre, nitroglycerin, dozens of real chemicals, leaching/electrolysis in TFMG vats).
  TFMG CE is declared *incompatible* with the original `create-tfmg` (only CE is installed) and has optional Sable support.
* Chemistry → artillery link already exists in the mods: TFMG gunpowder (nitrate + sulfur + charcoal),
  CBC guncotton/nitropowder. Skyworks only fills Skyblock gaps (see PROGRESSION.md).

## 3. Add-on choices (installed / rejected)

| Candidate | Decision | Reason |
|---|---|---|
| Create Crafts & Additions 1.6.0 | installed | Electricity bridge, rolling mill, chargers (also used for charged amethyst). 1.7.x is beta. |
| Create Enchantment Industry 2.4.2 (+ Dragons Plus) | installed | Automation of enchanting/XP. |
| Slice & Dice 4.3.4, Central Kitchen 2.6.2b, Farmer's Delight | installed | Food automation. |
| Create Deco, Copycats+, Create Connected, Bells & Whistles | installed | Building/logistics QoL. |
| Create: Dreams & Desires 2.3a-BETA | installed | Extra fan processing (sanding, freezing, seething), hydraulic press. |
| Create Sifting 2.3.0 (beta) + Mechanicals Lib | installed | Core Skyblock resource engine (meshes). |
| **Steam 'n' Rails** | not installed | Only an unofficial 1.21.1 port; trains add little in a void archipelago where airships are the transport pillar. |
| **Create: New Age** | not installed | Third electricity system next to C&A and TFMG — redundant. |
| CBC: Equally Opposite | not installed | Obsolete since CBC 5.11.3 (merged upstream). |
| Create Aeronautics Discovery | not installed (optional) | Spawns live physics airships and fly-over events → too heavy for the low-end target. |
| Iris / shaders | not installed | Aeronautics lists visual issues with Iris; no shaders by design. |
| **Embeddium** | **incompatible** | Veil (inside Sable) declares Embeddium incompatible. **Sodium 0.8.13** is used (Sable requires ≥ 0.8.12). |
| Memory Leak Fix | not available | No NeoForge 1.21.1 build. |
| FTB Quests 2101.1.37 (+ Library, Teams) | installed from official maven.ftb.dev | Not on Modrinth; licence *All Rights Reserved* → not bundled in exports. |

## 3b. Client QoL choices (2026-10-25)

| Question | Decision | Evidence |
|---|---|---|
| JEI vs EMI vs REI | **JEI** (only) | 18 of 36 content mods ship only a JEI plugin (Create, TFMG, CBC, Create Sifting, Chemica, C&A, D&D, …); 5 ship EMI, 2 REI. EMI would still need JEI underneath to show those categories (extra memory on low-end PCs); REI's NeoForge 1.21.1 build is a Feb 2025 beta. |
| Paper Doll (tr7zw) vs Paper Doll (Fuzs) | **tr7zw `paperdoll`** | 12 options (enable, X/Y offset, size, look side/up-down angles, elytra/spin locks, auto-hide, hide during toasts/screens/riding) + own config screen with live preview, no library. Fuzs: 9 options, needs Puzzles Lib, config-screen addon has no 1.21.1 build. Ayame PaperDoll: last 1.21.1 build Jan 2025. |
| Bendy-lib | bundled inside Emotecraft 2.4.12 (with playerAnimator) | standalone bendy-lib has no 1.21.1 build |
| Minimap | Xaero's Minimap + World Map | client-only, light; server part not required |
| Emotecraft | COMMON, optional | emote sync between players needs the server copy; clients without it can still join |
| Etched, Immersive Paintings, Create Harmonics | COMMON, required | add blocks/items/entities — client and server must match; Create Aeronautics Compatibility added (fixes Etched + Immersive Paintings on ships) |

QoL batch 2: client-only optional — Dynamic FPS, Smooth Swapping (beta), Toast Control, Better Third Person,
Overflowing Bars, Better Ping Display, Durability Tooltip, Cherished Worlds, Better Advancements (beta).
Server-synced — Polymorph, Explorer's Compass, Nature's Compass, Crafting Tweaks
(optional), Leaves Be Gone (optional; replaces Fast Leaf Decay, which has no 1.21.1 NeoForge build). Not available
for 1.21.1 NeoForge: Highlighter, Better Mount HUD. Removed later at the user's request: Carry On (+ Aeronautics compat). Deliberately not added: gravestones (graves of void deaths would
sit at the bottom of the void), Waystones (replaces airship travel), sound physics and backpacks (low-end cost).
Lithium and ModernFix both overwrite the biome temperature cache (mixin WARN, one wins — same optimisation).

Known overlap: playerAnimator (Emotecraft) and First-person Model both overwrite the `getCloak` model accessor
(mixin WARN, one wins). Both are accessors for the same field; no effect observed at the main menu, not tested in play.
without a model (upstream).

## 3c. Exploration content (2026-10-25)

| Mod | Decision / handling | Evidence |
|---|---|---|
| Sky Whale Ship 1.0.3 | installed | fixed sky heights; whale ship found at y≈218 |
| Ember's Floating Islands 1.5.3 | installed, unfiltered | "surface + offset" islands; over void they appear as low new islands (steampunk island probe: 13 chests, 42 barrels) |
| Lost Sky Islands 1.0.3 | installed, unfiltered | island clusters with ruins (probe: surface y≈59) |
| When Dungeons Arise 2.1.68 | installed, **sky subset only** (Heavenly Rider/Conqueror/Challenger, Mechanical Nest, Bandit & Thornborn Towers, Small Blimp) + 6 small surface structures (void-filtered) | Full WDA made fresh-world creation take 24 s and fill the 4 GB heap (Minecraft assembles jigsaw structures before biome/terrain checks); sky subset: 15.8 s, 2.0 GiB. Heavenly Challenger probe: 9 chests, 22 spawners at y≈207. Declares MC `[1.21,1.21.1)` but loads (verified). 2 WDA advancements fail to load (harmless). |
| Moog's Nether / End Structures, Nullscape | installed | normal Nether/End terrain |
| Naturalist 2.0.7 | installed | wildlife on island biomes |
| Lootr | installed | per-player loot chests (incl. the starter chest) |
| Moog's Voyager Structures | **removed** | 130 surface structures; over void the height filter rejects almost every candidate, and `/locate mvs:castle_ruins` ran > 120 s in one tick → **server watchdog crash** (twice, verified). Little value in a sky world. |
| When Dungeons Arise: Seven Seas | not installed | ocean ships would spawn at the bottom of the void |
| YUNG's Better Dungeons, Dungeons and Taverns | not installed | underground dungeons poke out of small islands; D&T overrides the same vanilla structure files as No Void Structures |
| Friends & Foes | not available | no 1.21.1 NeoForge build |

`/locate` timing for all 40 remaining filtered/sky structures: max 6.9 s, typically 0.1–3 s
(`devlog/test-runs/*-locate-locate1.md`). Prefer Explorer's Compass in survival (it searches incrementally).

**Patch v1b — essential structures only.** The structure mods above stay installed (blocks, items, loot tables), but
every structure set of vanilla and of every mod is disabled by `tools/gen_structure_overrides.py` (same resource path,
empty `structures` list) except stronghold, ancient city, End city, Moog's mega fortress and the Skyworks Nether meteor
(`src/worldgen/params.json` → `structures.keep`). Verified with `/locate` on a fresh world: kept structures found
1798–1939 blocks from the start island; villages, trial chambers, MSS, WDA, vanilla fortress and bastions not found
(`devlog/test-runs/20261025-233807-v1b.md`). The ancient city generates as an open floating ruin near y −50 (probe:
structure start + 5 chests in 7×7 chunks).

## 3d. QoL batch 3 and weapons (2026-10-25)

* Client-only optional: Tweakerge (Tweakeroo port), BoccHUD (MiniHUD port), Forgematica (Litematica port) — all on
  MaFgLib; Bridging Mod (+YACL), Neat, Just Enough Resources, InvTweaks Emu for IPN. **Rock'n Roller (Item Scroller
  port) ships disabled** (`.jar.disabled`) because it overlaps Mouse Tweaks / Inventory Profiles Next — tick it in
  Prism to swap. Server-synced: Jade Addons (optional), FastWorkbench (+Placebo, now COMMON), Trash Slot.
* **Bug found & fixed:** Forgematica's Modrinth upload marks its `-sources.jar` as the primary file; the client
  crashed at mixin load (`IMixinAbstractBlock was not found`). `manifest.py pin` now skips source/javadoc/dev jars and
  `inspect` flags any jar that contains `.java` but no `.class` files.
* **Guns: Create: Gunsmithing** 1.4.9 (+ NTGL 3.2.0, GeckoLib 4.9.3) — steampunk guns built with Create machinery.
  Recipes use shared tags (`c:ingots/steel`, `c:plates/steel`, `c:nuggets/lead`, `c:gunpowders`), so TFMG steel/lead
  and industrial gunpowder work; niter is renewable (rotten flesh mixing). Not added (redundant / heavier):
  Scorched Guns (own mobs, ground structures, turrets, exosuits), Iron's Arms 'n Artifice, TaCZ / Point Blank (modern
  military, off-theme). NTGL's own placeholder items (ammo box, workbench, magazines) have no models (client WARN).
* Tweakerge logs one ERROR on first start (config file not yet created).

## 3e. Hex Casting and Create add-ons batch (2026-10-25)

Hex Casting here is the official **0.12.0-devel-pre-64** build; 1.21.1 add-ons must target that API. Surveyed every
1.21.1 NeoForge Hex add-on on Modrinth:

| Hex add-on | Result |
|---|---|
| **MieHex 1.0.5** (enchantment & "idea" iotas) | **Added.** 1.0.2fix2 (built for pre-2) crashed: `Registry is already frozen (miehex:mob_media)`; 1.0.5 (beta) loads. |
| Hexagony 0.0.6 | **Rejected** — crashes on pre-64: `NoSuchFieldError: HexPattern.Companion` (built against the old Kotlin API). |
| Hex Spell Wheel 1.2.3 (client) | **Rejected** — packaging bug: `version = "${version}"` in `neoforge.mods.toml`; FML rejects the jar and the client breaks (Sodium "config could not be found"). `manifest.py inspect` now flags unexpanded versions. |
| HexOverpowered | Not added — deliberately overpowered (balance). |
| Hex Ars Linker / Fishcasting | Not added — need Ars Nouveau / Tide 2 (large extra mods, off-theme in the void). |
| HexJSNeo | Not added — KubeJS authoring API only; no player content. |

Create add-ons added (all COMMON):

* Skyblock resources: **Create Mechanical Extruder** (rotation-powered block generator incl. Create ore-stones),
  **Create Ore Excavation** (infinite ore veins in chunks — also void chunks — mined by drilling machines).
* Flight: **Create Jetpack**, **Create Propulsion (Simulated port)** (thrusters, wings), **Create Aeroworks** (cockpit
  controls, servos), **Climbable Ropes** (Aeronautics), **Grappling Hook: Skybound** (latches onto Sable ships; needs
  YACL, now COMMON).
* Artillery: **Create Radars** (radar, monitors, fire control for CBC). One upstream recipe fixed (below).
* Logistics: **Create Factory Logistics** (fluid packages), **Create Mobile Packages** (robo-bee couriers),
  **Create Power Loader** (kinetic chunk loaders, moving range capped — see PERFORMANCE.md).
* Parts/decor: **Create Encased**, **Create CA** (brass gearbox), **Create Framed**, **Interiors**,
  **Bits 'n' Bobs** (+ Azimuth API, Strut Your Stuff), **Create: Sound of Steam** (pipe organs).
* Removed: **KubeJS Create** — Create Ore Excavation registers its own KubeJS wrapper for Create's
  `ProcessingOutput`, and KubeJS then fails to start (`Wrapper for class …ProcessingOutput already exists`). Skyworks
  defines all recipes as datapack JSON, so KubeJS Create was unused.
* Rejected: **Extra Gauges** — its required library *Deployer* declares itself incompatible with Create Factory
  Logistics. Create: New Age / Diesel Generators (overlap with Crafts & Additions / TFMG), Create LazyTick (changes
  tick behaviour of every Create block — not risked with Aeronautics).

## 3f. Alcohol and mixed authentication (2026-10-25)

* **Alcohol:** Brewin' and Chewin' (keg fermentation, on Farmer's Delight), Kvass Delight, Cocktails Delight,
  Create Winery, Create: Alcohol Industry. Rejected: Let's Do Vinery/Brewery and AlcoCraft (Architectury-based,
  overlapping, heavier). Create Winery grape bushes only generate on plains/forest islands, so Skyworks adds a
  dirt + string-mesh sifting drop (patch v1b: 1/800 each for red and white bushes).
* **Cocktails Delight 1.1.10 ships 48 Create spout/drain recipes in Create 5 format** (all fail to parse) —
  converted to 1.21.1 format in `skyworks-core` (`fix_legacy_recipes.py` now converts Create 5 fluid ingredients and
  fluid results). The 2 `pouring/soymilk_*` recipes target Vegan Delight (not installed) — harmless.
* **Mixed auth:** MixAuth + WhitelistGate (SERVER_ONLY, see SERVER.md). TrueUUID was considered: it needs the mod on
  every client and gives offline players no password, so names could be stolen; MixAuth is server-only and protects
  offline names with passwords.

## 3g. The Backrooms and the dweller (2026-10-26)

* **Backrooms: own content instead of a mod.** The NeoForge 1.21.1 Backrooms mods on Modrinth (The Backrooms Update,
  Liminality, Stuck, …) bring their own entry rules, entities, sounds and items. Skyworks needs a specific rule set
  (void fall → Backrooms, Adventure mode, escape only by death, items kept), so it's built from data
  (`skyworks-core` dimension + structures), KubeJS blocks and one KubeJS server script. Details:
  [BACKROOMS.md](BACKROOMS.md).
* **Structures can't write a dimension's bottom layer** (the writable area starts at `min_y + 1`). The Backrooms
  therefore start at y −16 with air below the bedrock floor, so the pit tiles can cut through to the void.
* **Keeping items through a Backrooms death** uses KubeJS `EntityEvents.death` (slot snapshot) plus a LOWEST-priority
  NeoForge `LivingDropsEvent` listener, so Curios drops are caught too. Only stacks that really dropped are given
  back, so Curse of Vanishing still works and nothing is duplicated.
* **Dweller: own Java mod (draft).** Existing dweller mods are Forge/Fabric 1.19–1.20 jump-scare mobs (sounds, chases,
  attacks), the opposite of what is wanted. `skyworks_dweller` is COMMON (client needed for the renderer), MIT, own work
  (bundled in exports).

## 4. Client / server matrix

All gameplay mods are **COMMON** (installed on both). Mods whose Modrinth metadata says "client unsupported"
(e.g. Sable Physics Compat, Lithostitched, MSS) still run inside the singleplayer integrated server, so they are
COMMON too. **CLIENT_ONLY (45)**: rendering (Sodium, Sodium Extra, Reese's Sodium Options, ImmediatelyFast, Entity Culling), JEI and the client QoL set; 34 entries are marked *optional* (disable freely). **SERVER_ONLY (2)**: MixAuth, WhitelistGate. The dedicated server runs 114 jars; the client 153.

## 5. Known issues found and how they were handled

| Issue (verified in logs) | Impact | Handling |
|---|---|---|
| **Chemica 0.7.1 overrides 11 Create ore-crushing recipes (iron, gold, copper, redstone, emerald…) in 1.20.1 JSON format** — they fail to parse, deleting Create's crushing of those ores | High (ore processing) | `skyworks-core` ships 1.21.1-format copies with Chemica's intended byproducts (`tools/fix_legacy_recipes.py`), loaded after Chemica. Verified: no parse errors; `/skyworks_selftest` confirms the recipes exist. |
| Chemica references a non-existent `chemica:sulfur_dust` (silently dropped by Create's codec) | Medium | Remapped to `tfmg:sulfur_dust` in the fixed recipes. The self-test now checks every referenced item id at runtime. |
| Chemica `mixing/caustic_soda` uses `neoforge:fluid` ingredient type | Low | Fixed copy. |
| Create Deco `placard` recipe uses `id` in an ingredient | Low | Fixed copy. |
| HexAutomata `focus_bundle_alt` brainsweep recipe ("Not a tag id") | Low | Alternative recipe only; main recipe works. Left as is. |
| CEI / Create Connected loot tables for optional-compat blocks (Apotheosis / Dye Depot) | None | Harmless log errors (blocks not registered without those mods). |
| Sable Physics Compat: trailing comma in `sable:bouncy` tag; entries for absent mods (Aether, Enderite, `copycats:copycat_catwalk`) | None | Harmless; all affected entries target mods that are not installed. |
| JEI declares Minecraft `[1.21, 1.21.1)` | None | FML accepts it on 1.21.1 (verified by booting the server with JEI). Recorded in `tools/manifest.py` as a verified exception. |
| TFMG oil deposits only generate on **bedrock** | High in Skyblock (no crude oil) | Biome modifier adds TFMG oil deposits to the Nether (bedrock floor) + Skyworks "bio-crude" recipe. |
| Create Sifting ships a `zinc_mesh` item without a recipe | — | Recipe added; used as the industrial-minerals mesh. |
| FTB Quests rejects ids with the top bit set (re-ids chapters, orphaning text) | Medium (quest text) | Generator keeps ids < 2^63 (verified: all 184 ids preserved after load). |
| NeoForge version checker NPE (HexAutomata update JSON) | None | `versionCheck = false` in `fml.toml` (also avoids network calls at start). |
| Create Radars `radar_warning_reciever` uses `{"item": "c:plates/copper"}` (a tag written as an item) | Low | Fixed copy (`fix_legacy_recipes.py` now converts `c:` item references to tags). |
| Create Radars `radar_jammer` references an unregistered item `create_radar:jammer` | None | Unfinished upstream feature; left as is. |
| Create Factory Logistics `factory_chemical_gauge` / `barrel_packager` (optional Mekanism-style compat) | None | Harmless parse errors; the blocks are not registered without those mods. |
| Create Ore Excavation × KubeJS Create: duplicate type wrapper → KubeJS fails | High (server would not start) | KubeJS Create removed (unused). |
| Create Deco ships `BLANK_decal_dont_use.png` (uppercase path) | None | Client ignores the texture (log line only). |
| `RuntimeDistCleaner: Attempted to load class …Screen for invalid dist DEDICATED_SERVER` (one line, server) | None observed | Logged by one mod during construction and caught; not attributed. Server runs normally. |

## 6. Sky-island world specifics

* Terrain: adapted from *Revamped Floating Islands* (MIT); vanilla structures are void-filtered by
  *No Void Structures* (needs Lithostitched). Until patch v1b Skyworks also wrapped Create Structures Arise and Creat
  Aeronautics Structures in the same height filter; those structures are now disabled, so the wrappers are gone.
* Essential structures never start within 1000 blocks of the origin: a Lithostitched `set_structure_spawn_condition`
  worldgen modifier (`data/skyworks/lithostitched/worldgen_modifier/origin_exclusion.json`) samples
  `skyworks:structure/origin_distance` at the structure start.
* Aquifers are disabled (they cannot tell island caves from the void and created floating water blobs).
* Strongholds can generate partly floating; End access verified (portal frames present).

## 7. Aeronautics × Create × Big Cannons on ships

| Combination | Status | Evidence |
|---|---|---|
| Assembling a structure into a Sable sub-level (server) | ✅ PASS | `/sable assemble area` → 196-block platform incl. CBC cannon mount + cast-iron chamber, shaft, chest. |
| Levitite lift keeps a ship aloft (server physics) | ✅ PASS | Platform stayed at y≈140 across 3 sessions (would otherwise fall into the void). |
| Ship persistence across save/restart | ✅ PASS | Sub-level found after two restarts. |
| Player controls, steering, propellers in flight | ⏳ NOT TESTED | Needs a client. |
| Create machines working *while flying* | ⏳ NOT TESTED | Needs client/gameplay test. Aeronautics docs warn not every machine works on ships. |
| CBC firing from a moving ship | ⏳ NOT TESTED | CBC 5.11.4 changelog claims recoil/velocity inheritance on Sable; not verified here. |
| Multiplayer synchronisation | ⏳ NOT TESTED | Needs two clients. |

Unloaded chunks stop ships and factories: the pack has no chunk-loader mod (performance choice). Sable keeps
sub-levels with players aboard loaded (`sub_levels_with_players_cannot_unload = true`).
