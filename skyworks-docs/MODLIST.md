# Mod list - Skyworks - Industrial Arcana 0.1.0-dev

Minecraft **1.21.1**, NeoForge **21.1.264**, Java 21. 168 manifest entries: 122 COMMON, 42 CLIENT_ONLY, 4 SERVER_ONLY; 35 marked optional.

Generated from `manifest/mods.json` by `tools/gen_modlist.py` - do not edit by hand. Every file is pinned by URL + SHA-512; `bundled` lists jar-in-jar mods shipped inside an entry.

Sides: **COMMON** = client and dedicated server (server-logic mods are COMMON so singleplayer works), **CLIENT_ONLY** = Prism instance only. **optional** = the player may disable it (Prism: right-click → Disable; .mrpack import shows a checkbox); optional mods are never part of the server build unless they are COMMON.

## Core gameplay

| Mod | Version | Side | License | Source | Requires (jar metadata) | Purpose |
|---|---|---|---|---|---|---|
| Create | `6.0.10+mc1.21.1` | COMMON | LicenseRef-Create-Mod-License | [Modrinth](https://modrinth.com/mod/create) | flywheel, ponder | Core mechanical engineering: rotational power, processing, logistics, contraptions Bundled: flywheel, ponder. |
| Create Aeronautics | `1.3.2+mc1.21.1` | COMMON | LicenseRef-Simulated-Project-License | [Modrinth](https://modrinth.com/mod/create-aeronautics) | - | Physics-based airships, propellers, hot-air lift, levitite, offroad vehicles Bundled: aeronautics, offroad, simulated. |
| Create Big Cannons | `5.11.7` | COMMON | LicenseRef-Create-Big-Cannons-License | [Modrinth](https://modrinth.com/mod/create-big-cannons) | create, ritchiesprojectilelib | Artillery: big cannons, autocannons, drop mortars, shells, fuzes, propellant |
| Create: Cybernetics | `0.1.0` | COMMON | MIT | built locally | create, neoforge | Cybernetic implants installed on a kinetic surgical rig, five tiers of Create production chains, programmable cyberdecks (Synapse) that read and drive Create machines |
| Hex Casting | `0.12.0-devel-pre-64 (alpha)` | COMMON | MIT | [direct](https://ci.blamejared.com/job/petrakat/job/Hexcasting/job/1.21/64/artifact/Neoforge/build/libs/hexcasting-neoforge-1.21.1-0.12.0-devel-pre-64.jar) | caelus, inline, kotlinforforge, patchouli, paucal | Programmable pattern-based magic (official 1.21.1 development build) |
| Sable | `2.0.6+mc1.21.1` | COMMON | LicenseRef-PolyForm-Shield-License-1.0.0 | [Modrinth](https://modrinth.com/mod/sable) | - | Physics sub-level library (Rapier engine) required by Create Aeronautics Bundled: sablecompanion, veil. |
| Skyworks Core | `0.1.0-dev` | COMMON | MIT | built locally | - | Pack data: sky-island world preset, loot tables, tags, structure/biome tweaks |
| Skyworks Dweller (draft) | `0.3.0-draft` | COMMON | MIT | built locally | - | Backrooms: the dweller (seen only at the edges of the screen), insanity from the air you breathe (whispers, phantoms, screen filters), the stalker (hunts lone players, only fire kills it), mimics in players' skins and the chat mimic, the wretch and hound with stealth, the winch elevator, exits, cardboard boxes and space-time glue, huge rooms and buried vanilla structures, /backrooms reset |
| Skyworks Gate | `1.0.0` | COMMON | MIT | built locally | - | Kicks players whose modpack revision differs from the server's, with a message that says what to update |

## Aeronautics / Sable add-ons

| Mod | Version | Side | License | Source | Requires (jar metadata) | Purpose |
|---|---|---|---|---|---|---|
| Climbable Ropes for Create Aeronautics | `2.2.0` | COMMON | MIT | [Modrinth](https://modrinth.com/mod/create-aeronautics-climbable-rope) | create, sable, simulated | Climb vertical ropes hanging from airships |
| Create Aeronautics: Compatibility | `1.1.3` | COMMON | MIT | [Modrinth](https://modrinth.com/mod/create-aeronautics-compatability) | - | Fixes Etched and Immersive Paintings (and others) on Sable/Aeronautics ships |
| Create Jetpack | `5.2.1` | COMMON | LicenseRef-Custom | [Modrinth](https://modrinth.com/mod/create-jetpack) | create, flightlib, kotlinforforge | Backtank jetpack - island hopping Bundled: flightlib. |
| Create Propulsion: Simulated | `1.1.5` | COMMON | MIT | [Modrinth](https://modrinth.com/mod/create-propulsion-simulated) | create, sable, sablecompanion | Thrusters, wings and sensors for Sable/Aeronautics craft |
| Create: Aeroworks | `1.5.0+mc1.21.1` | COMMON | LicenseRef-Create-Aeroworks-License | [Modrinth](https://modrinth.com/mod/create-aeroworks) | create, sable | Aeronautics parts: gyroscope, sensors, etc. |
| Grappling Hook Mod: Skybound | `v1.1+1.21.1-neoforge` | COMMON | GPL-3.0-only | [Modrinth](https://modrinth.com/mod/grapplemod-skybound) | yet_another_config_lib_v3 | Grappling hook that latches onto contraptions and airships Bundled: grapplemodcompat_create, grapplemodcompat_sable. |
| Jade Sable Compat | `1.3.0` | CLIENT_ONLY | MIT | [Modrinth](https://modrinth.com/mod/jade-sable-compat) | sable | Jade tooltips for blocks on Sable sub-levels (airships) |
| Sable & Immersive Engineering Compat | `1.0 (beta)` | COMMON | MIT | [Modrinth](https://modrinth.com/mod/sable-immersive-engineering-compat) | - | Immersive Engineering support on Sable/Aeronautics sub-levels (airships) |
| Sable Power Loader Compat | `1.0.1` | COMMON | LicenseRef-All-Rights-Reserved | [Modrinth](https://modrinth.com/mod/sable-power-loader-compat) | create_power_loader, sable | Makes Create: Power Loaders work on Sable/Aeronautics sub-levels (airships) |
| Sable: Physics Compat | `1.3.0` | COMMON | LicenseRef-All-Rights-Reserved | [Modrinth](https://modrinth.com/mod/sablecompat) | sable | Physics properties (mass, friction, buoyancy) for modded blocks on Sable sub-levels |

## Artillery

| Mod | Version | Side | License | Source | Requires (jar metadata) | Purpose |
|---|---|---|---|---|---|---|
| Create: Radars | `5.0-1.21.1` | COMMON | LicenseRef-Arsenalists-of-Create-Source-Available-License | [Modrinth](https://modrinth.com/mod/create-radars) | create, createbigcannons | Radars, target tracking and auto-aim for CBC cannons Bundled: sablecompanion. |

## Hex Casting add-ons

| Mod | Version | Side | License | Source | Requires (jar metadata) | Purpose |
|---|---|---|---|---|---|---|
| HexAutomata | `1.21.1-0.3.5.2.pre64 (alpha)` | COMMON | MIT | [Modrinth](https://modrinth.com/mod/hexautomata) | hexcasting | Hex Casting addon: reactive foci that trigger hexes on game events (magical automation) Bundled: yclib. |
| HexFlow | `1.21.1-0.7.0.pre64 (alpha)` | COMMON | MIT | [Modrinth](https://modrinth.com/mod/hexflow) | hexcasting | Hex Casting addon: loops/iteration/flow-control patterns for spell programming Bundled: yclib. |
| HexParse | `1.21.1-1.12.0.pre64 (alpha)` | COMMON | MIT | [Modrinth](https://modrinth.com/mod/hexparse) | hexcasting | Hex Casting addon: write hexes as text code and compile to pattern lists Bundled: yclib. |
| HexQuantum | `0.1.0` | COMMON | All-Rights-Reserved | built locally | hexcasting | Hex Casting addon (own work): illusions, echoes, phantoms, pocket space and quantum media |
| MieHex | `1.0.5+1.21.1 (beta)` | COMMON | MIT | [Modrinth](https://modrinth.com/mod/miehex) | architectury, hexcasting | Hex addon: extra patterns and iotas |

## Chemistry

| Mod | Version | Side | License | Source | Requires (jar metadata) | Purpose |
|---|---|---|---|---|---|---|
| Chemica | `0.7.1 (beta)` | COMMON | LicenseRef-Custom | [Modrinth](https://modrinth.com/mod/chemica) | tfmg | Real-world chemistry addon for TFMG: acids, PVC/epoxy, carbon fibre, chemical production Bundled: ponder, rutile. |
| Create: TFMG Community Edition | `1.3.2a` | COMMON | LicenseRef-MIT-NON-AI | [Modrinth](https://modrinth.com/mod/tfmg-community-edition) | create | Oil/petrochemistry, distillation, fuels, steel, plastics, electrolysis, chemical vats (TFMG CE fork) Bundled: sablecompanion. |

## Create add-ons

| Mod | Version | Side | License | Source | Requires (jar metadata) | Purpose |
|---|---|---|---|---|---|---|
| Create Crafts & Additions | `neoforge-1.21.1-1.6.0` | COMMON | MIT | [Modrinth](https://modrinth.com/mod/createaddition) | create | Electricity bridge (FE): alternators, motors, rolling mill, wires, charging Bundled: sablecompanion. |
| Create Deco | `2.1.3` | COMMON | MIT | [Modrinth](https://modrinth.com/mod/create-deco) | create | Industrial building blocks: catwalks, bricks, sheet-metal, doors, lamps |
| Create Encased | `1.21.1-1.10.0` | COMMON | MIT | [Modrinth](https://modrinth.com/mod/create-encased) | create | Encase shafts/cogs/pipes in any casing |
| Create Factory Logistics | `1.6.1 (beta)` | COMMON | LicenseRef-All-Rights-Reserved | [Modrinth](https://modrinth.com/mod/create_factory_logistics) | create, create_factory_abstractions | Fluid jars for Create's package logistics Bundled: create_factory_abstractions. |
| Create Mechanical Extruder | `1.21.1-2.2.2-6.0.10` | COMMON | LGPL-3.0-only | [Modrinth](https://modrinth.com/mod/create-mechanical-extruder) | create, mechanicals | Skyblock: rotation-powered block generator (cobble, basalt, ores via catalysts) |
| Create Nuclear | `2.0.0` | COMMON | LGPL-3.0-only | [Modrinth](https://modrinth.com/mod/createnuclear) | create | Nuclear power: reactors, enrichment, radiation and fuel cycle for Create |
| Create Ore Excavation | `1.21.1-1.6.8` | COMMON | MIT | [Modrinth](https://modrinth.com/mod/create-ore-excavation) | create | Skyblock: renewable ore veins mined with kinetic drills |
| Create Sifting | `1.21.1-2.3.0 (beta)` | COMMON | LGPL-3.0-only | [Modrinth](https://modrinth.com/mod/create-sifting) | create, mechanicals | Mechanical sifter: renewable ores/dusts from gravel, sand, dust (Skyblock resource core) |
| Create Slice & Dice | `4.3.4` | COMMON | LicenseRef-Custom | [Modrinth](https://modrinth.com/mod/slice-and-dice) | atmosphere, create, kotlinforforge | Automates Farmer's Delight cutting/cooking with Create machinery Bundled: atmosphere, ponder, sablecompanion. |
| Create: Bells & Whistles | `v0.4.7-1.21.1` | COMMON | GPL-3.0-or-later | [Modrinth](https://modrinth.com/mod/bellsandwhistles) | create | Decorative metal/train-style building blocks |
| Create: Bits 'n' Bobs | `2.3.5` | COMMON | MIT | [Modrinth](https://modrinth.com/mod/create-bits-n-bobs) | azimuth, create, struts | Decorative and mechanical additions Bundled: sablecompanion. |
| Create: Central Kitchen | `2.6.2b` | COMMON | LGPL-3.0-or-later | [Modrinth](https://modrinth.com/mod/create-central-kitchen) | create, create_dragons_plus | Create automation of Farmer's Delight cooking pots, feasts, blaze stoves |
| Create: Components and Additions | `2.3` | COMMON | LGPL-3.0-or-later | [Modrinth](https://modrinth.com/mod/create-ca) | create | Brass gearbox and small kinetic parts |
| Create: Connected | `1.3.3-mc1.21.1` | COMMON | AGPL-3.0-or-later | [Modrinth](https://modrinth.com/mod/create-connected) | create | QoL kinetic/logistics blocks: inverted clutch, parallel gearbox, item silo, fan catalysts Bundled: sablecompanion. |
| Create: Copycats+ | `3.0.9+mc.1.21.1-neoforge` | COMMON | LicenseRef-All-Rights-Reserved | [Modrinth](https://modrinth.com/mod/copycats) | create | Copycat blocks for compact/weight-light airship and machine building |
| Create: Dreams & Desires | `2.3a-BETA` | COMMON | LicenseRef-MIT-Code-AND-ARR-Art | [Modrinth](https://modrinth.com/mod/create-dreams-and-desires) | create | Extra fan processing types (sanding, freezing, seething...), hydraulic press and industrial machinery |
| Create: Enchantment Industry | `2.4.2` | COMMON | LGPL-3.0-or-later | [Modrinth](https://modrinth.com/mod/create-enchantment-industry) | create, create_dragons_plus | Automated enchanting/disenchanting, liquid experience, printers Bundled: conditional_mixin. |
| Create: Framed | `1.8.2+1.21.1` | COMMON | MIT | [Modrinth](https://modrinth.com/mod/create-framed) | create | Framed glass variants |
| Create: Harmonics | `1.1.7` | COMMON | MIT | [Modrinth](https://modrinth.com/mod/create-harmonics) | create, kotlinforforge | Create-driven audio playback/instruments |
| Create: Interiors | `0.6.1` | COMMON | GPL-3.0-or-later | [Modrinth](https://modrinth.com/mod/interiors) | create | Create-style furniture (seats, beds, chairs) |
| Create: Mobile Packages | `1.21.1-0.7.8` | COMMON | MIT | [Modrinth](https://modrinth.com/mod/create-mobile-packages) | create | Package delivery drones/ mobile couriers Bundled: create_factory_abstractions. |
| Create: Power Loader | `2.0.5-mc1.21.1` | COMMON | MIT | [Modrinth](https://modrinth.com/mod/create-power-loader) | create | Chunk loaders (power loaders) as Create blocks Bundled: sablecompanion. |
| Create: Sound of Steam | `0.9.2.1-1.21.1 (beta)` | COMMON | MIT | [Modrinth](https://modrinth.com/mod/create-sound-of-steam) | create | Steam pipe organs |

## Food

| Mod | Version | Side | License | Source | Requires (jar metadata) | Purpose |
|---|---|---|---|---|---|---|
| Brewin' And Chewin' | `4.5.0+1.21.1-neoforge` | COMMON | LicenseRef-All-Rights-Reserved | [Modrinth](https://modrinth.com/mod/brewin-and-chewin) | farmersdelight, greenhouseconfig | Farmer's Delight fermentation: keg, beer, mead, vodka, rice wine, cheeses Bundled: greenhouseconfig, greenhouseconfig_night_config, greenhouseconfig_toml. |
| Cocktails Delight | `1.1.10` | COMMON | LicenseRef-All-Rights-Reserved | [Modrinth](https://modrinth.com/mod/cocktails-delight) | brewinandchewin, farmersdelight | Brewin' and Chewin' addon: 40+ cocktails |
| Create: Alcohol Industry | `2.2.3` | COMMON | LicenseRef-Alcohol-Industry-Licence | [Modrinth](https://modrinth.com/mod/create-alcohol-industry) | create | Create-automated alcohol production (distilling, bottling) |
| Create: Winery | `2.0.3` | COMMON | LicenseRef-All-Rights-Reserved | [Modrinth](https://modrinth.com/mod/create-winery) | - | Create-based winery: grapes, crushing, fermenting, bottling |
| Farmer's Delight | `1.21.1-1.3.4` | COMMON | MIT | [Modrinth](https://modrinth.com/mod/farmers-delight) | - | Cooking/farming base for food progression |
| Kvass delight | `1.0.0` | COMMON | MIT | [Modrinth](https://modrinth.com/mod/kvass-delight) | brewinandchewin, farmersdelight | Brewin' and Chewin' addon: kvass |

## World generation & structures

| Mod | Version | Side | License | Source | Requires (jar metadata) | Purpose |
|---|---|---|---|---|---|---|
| Creat Aeronautics Structures | `1.0.0` | COMMON | MIT | [Modrinth](https://modrinth.com/mod/creat-aeronautics-structures) | aeronautics, create, sable | Aeronautics-themed ruins: engineering houses, wrecked airships/balloons, engineer trader |
| Create: Structures Arise | `176.49.49` | COMMON | MIT | [Modrinth](https://modrinth.com/mod/create-structures-arise) | create | 28 Create-themed structures: abandoned factories, mills, industrial ruins with loot |
| Ember's Floating Islands | `1.5.3-1.21.1-neoforge` | COMMON | LicenseRef-All-Rights-Reserved | [Modrinth](https://modrinth.com/mod/embers-floating-islands) | - | Mystical floating structures with loot in the sky |
| Lithostitched | `1.8.1-neoforge-21.1` | COMMON | MIT | [Modrinth](https://modrinth.com/mod/lithostitched) | apollib | Worldgen utility library (structure spawn conditions) used by No Void Structures Bundled: apollib. |
| Lost Sky Islands | `1.0.3` | COMMON | LicenseRef-All-Rights-Reserved | [Modrinth](https://modrinth.com/mod/lost-sky-islands) | - | Clusters of sky islands with ruins of a lost civilisation |
| MES - Moog's End Structures | `2.1.1` | COMMON | LGPL-3.0-only | [Modrinth](https://modrinth.com/mod/mes-moogs-end-structures) | moogs_structures | Structures for the End |
| MNS - Moog's Nether Structures | `3.1.1` | COMMON | LGPL-3.0-only | [Modrinth](https://modrinth.com/mod/mns-moogs-nether-structures) | moogs_structures | More Nether structures (Nether trips for quartz/blaze/oil) |
| MSS - Moog's Soaring Structures | `2.2.0` | COMMON | GPL-3.0-only | [Modrinth](https://modrinth.com/mod/mss-moogs-soaring-structures) | moogs_structures | Floating structures with loot, mobs and dungeons (exploration/dangerous islands) |
| No Void Structures | `2.0.1+mod` | COMMON | MIT | [Modrinth](https://modrinth.com/mod/no-void-structures) | - | Prevents vanilla structures generating over void (pairs with sky-island terrain) |
| Nullscape | `1.2.14` | COMMON | LicenseRef-Stardust-Labs-License | [Modrinth](https://modrinth.com/mod/nullscape) | - | End terrain overhaul (alien floating End islands) |
| Sky Whale Ship | `1.0.3` | COMMON | LicenseRef-All-Rights-Reserved | [Modrinth](https://modrinth.com/mod/sky-whale-ship) | - | Sky whales carrying ruins/loot drifting between islands |
| When Dungeons Arise | `2.1.68` | COMMON | LicenseRef-All-Rights-Reserved | [Modrinth](https://modrinth.com/mod/when-dungeons-arise) | - | Large roguelike dungeons incl. floating Heavenly sky fortresses (ground ones void-filtered) |

## Quests

| Mod | Version | Side | License | Source | Requires (jar metadata) | Purpose |
|---|---|---|---|---|---|---|
| FTB Library | `2101.1.37` | COMMON | All-Rights-Reserved (FTB) | [direct](https://maven.ftb.dev/releases/dev/ftb/mods/ftb-library-neoforge/2101.1.37/ftb-library-neoforge-2101.1.37.jar) | architectury | Questbook system (ftb-library) |
| FTB Quests | `2101.1.37` | COMMON | All-Rights-Reserved (FTB) | [direct](https://maven.ftb.dev/releases/dev/ftb/mods/ftb-quests-neoforge/2101.1.37/ftb-quests-neoforge-2101.1.37.jar) | architectury, ftblibrary, ftbteams | Questbook system (ftb-quests) |
| FTB Teams | `2101.1.11` | COMMON | All-Rights-Reserved (FTB) | [direct](https://maven.ftb.dev/releases/dev/ftb/mods/ftb-teams-neoforge/2101.1.11/ftb-teams-neoforge-2101.1.11.jar) | architectury, ftblibrary | Questbook system (ftb-teams) |

## Social / creative (server-synced)

| Mod | Version | Side | License | Source | Requires (jar metadata) | Purpose |
|---|---|---|---|---|---|---|
| ChatImage | `1.4.7+1.21.0+neoforge (beta)` | COMMON | MIT | [Modrinth](https://modrinth.com/mod/chatimage) | - | Shows images in chat (URLs and shared files); server side lets players send local images Bundled: actionlib. |
| Emotecraft | `2.4.12+1.21.1-forge` | COMMON · optional | GPL-3.0-or-later | [Modrinth](https://modrinth.com/mod/emotecraft) | playeranimator | Emotes (bundles bendy-lib + playerAnimator). Server copy relays emotes between players Bundled: bendylib, playeranimator. |
| Etched | `5.1.0` | COMMON | GPL-3.0-only | [Modrinth](https://modrinth.com/mod/etched) | - | Make custom music discs/records everyone hears |
| Immersive Paintings | `0.8.0+1.21.1` | COMMON | GPL-3.0-only | [Modrinth](https://modrinth.com/mod/immersive-paintings) | fzzy_config | Upload/pixelate custom paintings; synced from the server |
| KsuChat (TG Bridge) | `1.0.2` | SERVER_ONLY | MIT | [Modrinth](https://modrinth.com/mod/ksuchat) | - | Telegram <-> Minecraft chat bridge (server only; clients may skip it) |

## Client quality of life (optional)

| Mod | Version | Side | License | Source | Requires (jar metadata) | Purpose |
|---|---|---|---|---|---|---|
| Better Advancements | `0.4.3.21 (beta)` | CLIENT_ONLY · optional | LicenseRef-Dont-Be-a-Jerk | [Modrinth](https://modrinth.com/mod/better-advancements) | - | Larger, readable advancement screen |
| Better Ping Display [Forge/NeoForge] | `1.21.1-1.1` | CLIENT_ONLY · optional | MIT | [Modrinth](https://modrinth.com/mod/better-ping-display) | - | Numeric ping in the player list |
| Better Third Person | `1.9.0` | CLIENT_ONLY · optional | LicenseRef-All-Rights-Reserved | [Modrinth](https://modrinth.com/mod/better-third-person) | - | Free-look third-person camera (orbit around your ship) |
| BetterF3 | `11.0.3` | CLIENT_ONLY · optional | MIT | [Modrinth](https://modrinth.com/mod/betterf3) | cloth_config | Configurable, readable F3 debug screen |
| Bridging Mod | `2.6.2+1.21.1.neoforge` | CLIENT_ONLY · optional | MIT | [Modrinth](https://modrinth.com/mod/bridging-mod) | yet_another_config_lib_v3 | Bedrock-style bridging / reach-around placement over the void |
| Chat Heads | `0.15.7` | CLIENT_ONLY · optional | MPL-2.0 | [Modrinth](https://modrinth.com/mod/chat-heads) | - | Player heads next to chat messages |
| Cherished Worlds | `10.1.1+1.21.1` | CLIENT_ONLY · optional | LGPL-3.0-or-later | [Modrinth](https://modrinth.com/mod/cherished-worlds) | - | Favourite and pin worlds/servers |
| Controlling | `19.0.5` | CLIENT_ONLY · optional | MIT | [Modrinth](https://modrinth.com/mod/controlling) | searchables | Search/filter for the key-binding menu |
| DOOM93 Mode | `1.0.0` | CLIENT_ONLY · optional | MIT | built locally | - | Client-side toggle (F9, own work): DOOM status bar, sprite weapons, view bob, Freedoom sounds/OPL2 music and a palettized pixel screen |
| Durability Tooltip | `1.2.0-neoforge-mc1.21` | CLIENT_ONLY · optional | LicenseRef-All-Rights-Reserved | [Modrinth](https://modrinth.com/mod/durability-tooltip) | supermartijn642configlib | Durability numbers in tooltips |
| Dynamic FPS | `3.11.4` | CLIENT_ONLY · optional | MIT | [Modrinth](https://modrinth.com/mod/dynamic-fps) | - | Lowers FPS/rendering when the window is unfocused or minimised (saves power on weak PCs) |
| Enchantment Descriptions | `21.1.11` | CLIENT_ONLY · optional | LGPL-2.1-only | [Modrinth](https://modrinth.com/mod/enchantment-descriptions) | bookshelf, prickle | Explains enchantments in tooltips |
| First-person Model | `2.7.3` | CLIENT_ONLY · optional | MIT | [Modrinth](https://modrinth.com/mod/first-person-model) | - | Shows your body/held items in first person Bundled: transition, trender. |
| Forgematica | `0.4.3+mc1.21.1` | CLIENT_ONLY · optional | LGPL-3.0-only | [Modrinth](https://modrinth.com/mod/forgematica) | mafglib | Litematica port: schematic overlays for planning builds/airships |
| Inventory Profiles Next | `neoforge-1.21.1-2.2.5` | CLIENT_ONLY · optional | AGPL-3.0-or-later | [Modrinth](https://modrinth.com/mod/inventory-profiles-next) | kotlinforforge, libipn | Inventory sorting, auto-refill, locked slots |
| InventoryHUD+ | `3.4.28` | CLIENT_ONLY · optional | LicenseRef-All-Rights-Reserved | [Modrinth](https://modrinth.com/mod/inventoryhudplus) | - | HUD overlay: main inventory, potion effects and equipment |
| InvTweaks Emu for IPN | `neoforge-1.21.1-1.3.0` | CLIENT_ONLY · optional | LicenseRef-All-Rights-Reserved | [Modrinth](https://modrinth.com/mod/invtweaks-emu-for-ipn) | inventoryprofilesnext, kotlinforforge, libipn | Classic Inventory Tweaks keybinds for Inventory Profiles Next |
| Just Enough Resources (JER) | `1.6.0.57` | CLIENT_ONLY · optional | LicenseRef-Dont-Be-a-Jerk | [Modrinth](https://modrinth.com/mod/just-enough-resources-jer) | jei | JEI pages for mob drops, loot tables, ore distribution |
| Just Zoom | `3.0.1-1.21.1-neoforge` | CLIENT_ONLY · optional | LicenseRef-DSMSLv3.1 | [Modrinth](https://modrinth.com/mod/just-zoom) | konkrete | Zoom key (scouting distant islands) |
| No Chat Reports | `NeoForge-1.21.1-v2.9.1` | COMMON · optional | WTFPL | [Modrinth](https://modrinth.com/mod/no-chat-reports) | - | Strips chat signing / reporting; server side also makes enforce-secure-profile harmless |
| No Chat Restrictions | `NeoForge-MC1.21.11-v1.0.3` | CLIENT_ONLY | WTFPL | [Modrinth](https://modrinth.com/mod/no-chat-restrictions) | - | Lifts client-side chat restrictions (e.g. blocked chat for restricted/offline accounts) |
| Not Enough Animations | `1.12.6` | CLIENT_ONLY · optional | LicenseRef-tr7zw-Protective-License | [Modrinth](https://modrinth.com/mod/not-enough-animations) | - | Improved player animations (required by First-person Model) Bundled: transition, trender. |
| Paper Doll | `1.5.3` | CLIENT_ONLY · optional | LicenseRef-tr7zw-Protective-License | [Modrinth](https://modrinth.com/mod/paperdoll) | - | Configurable on-screen player preview (tr7zw; chosen over Fuzs' Paper Doll: 12 options + live config screen, no extra library) Bundled: transition, trender. |
| Reese's Sodium Options | `mc1.21.1-2.2.4+neoforge` | CLIENT_ONLY · optional | MIT | [Modrinth](https://modrinth.com/mod/reeses-sodium-options) | sodium | Tabbed, searchable Sodium video settings screen |
| Rock'n Roller | `0.4.0+mc1.21.1` | CLIENT_ONLY · optional · off by default | LGPL-3.0-only | [Modrinth](https://modrinth.com/mod/rocknroller) | mafglib | Item Scroller port (shipped disabled: overlaps Mouse Tweaks / Inventory Profiles Next) |
| Searchables | `1.0.2` | CLIENT_ONLY · optional | MIT | [Modrinth](https://modrinth.com/mod/searchables) | - | Library required by Controlling |
| Shulker Box Tooltip | `5.1.9+1.21.1-neoforge` | CLIENT_ONLY · optional | MIT | [Modrinth](https://modrinth.com/mod/shulkerboxtooltip) | - | Preview shulker box / container contents in tooltips |
| Smooth Swapping | `0.9.3.2-1.21.1 (beta)` | CLIENT_ONLY · optional | LGPL-3.0-only | [Modrinth](https://modrinth.com/mod/smooth-swapping) | - | Animated item movement in inventories |
| Sodium Extra | `mc1.21.1-0.9.4+neoforge` | CLIENT_ONLY · optional | LGPL-3.0-only | [Modrinth](https://modrinth.com/mod/sodium-extra) | sodium | Extra Sodium video toggles (particles, animations, fog, sky) - useful for low-end tuning |
| Toast Control | `1.21.1-9.0.1` | CLIENT_ONLY · optional | MIT | [Modrinth](https://modrinth.com/mod/toast-control) | placebo | Control/hide advancement and recipe toasts |
| Tweakerge | `0.4.3+mc1.21.1` | CLIENT_ONLY · optional | LGPL-3.0-only | [Modrinth](https://modrinth.com/mod/tweakerge) | mafglib | Tweakeroo port: flexible/fast placement, hand restock, many toggleable tweaks (all off by default) |

## Scripting & data

| Mod | Version | Side | License | Source | Requires (jar metadata) | Purpose |
|---|---|---|---|---|---|---|
| KubeJS | `2101.7.2-build.377` | COMMON | LGPL-3.0-only | [Modrinth](https://modrinth.com/mod/kubejs) | rhino | Scripting: recipes, start-island placement, progression tweaks Bundled: betteradvancedtooltips. |
| LootJS: KubeJS Addon | `1.21.1-3.7.0+neoforge` | COMMON | LGPL-3.0-only | [Modrinth](https://modrinth.com/mod/lootjs) | - | Loot table modification via KubeJS |

## Utility / UI

| Mod | Version | Side | License | Source | Requires (jar metadata) | Purpose |
|---|---|---|---|---|---|---|
| AppleSkin | `3.0.9+mc1.21` | COMMON | Unlicense | [Modrinth](https://modrinth.com/mod/appleskin) | - | Food/saturation HUD |
| Crafting Tweaks | `21.1.11+neoforge-1.21.1` | COMMON · optional | LicenseRef-All-Rights-Reserved | [Modrinth](https://modrinth.com/mod/crafting-tweaks) | balm | Rotate/balance/clear the crafting grid |
| Explorer's Compass | `1.21.1-3.4.0-neoforge` | COMMON | CC-BY-NC-SA-4.0 | [Modrinth](https://modrinth.com/mod/explorers-compass) | - | Compass that locates structures (towers, ruins, wrecks) across the void |
| Immersive Engineering | `12.4.2-194` | COMMON | LicenseRef-Custom | [Modrinth](https://modrinth.com/mod/immersiveengineering) | - | Industrial machines, multiblocks, wiring and energy (Immersive Engineering) |
| Jade Addons (Neo/Forge) | `6.1.2+neoforge` | COMMON · optional | LicenseRef-All-Rights-Reserved | [Modrinth](https://modrinth.com/mod/jade-addons-forge) | jade | More Jade info for many mods |
| Jade 🔍 | `15.10.6+neoforge` | COMMON | CC-BY-NC-SA-4.0 | [Modrinth](https://modrinth.com/mod/jade) | - | Block/entity info overlay (server side adds machine data) |
| Just Enough Items (JEI) | `19.64.0.455` | COMMON | MIT | [Modrinth](https://modrinth.com/mod/jei) | mezz_config | Recipe viewer (Create, Sifting, TFMG, CBC integrations) Bundled: mezz_config. |
| Leaves Be Gone | `v21.1.1-1.21.1-NeoForge` | COMMON · optional | MPL-2.0 | [Modrinth](https://modrinth.com/mod/leaves-be-gone) | puzzleslib | Fast leaf decay after chopping (quicker tree farming on small islands) |
| Mouse Tweaks | `1.21-2.26.1-neoforge` | CLIENT_ONLY · optional | BSD-3-Clause | [Modrinth](https://modrinth.com/mod/mouse-tweaks) | - | Inventory drag/scroll QoL |
| Nature's Compass | `1.21.1-3.4.0-neoforge` | COMMON | CC-BY-NC-SA-4.0 | [Modrinth](https://modrinth.com/mod/natures-compass) | - | Compass that locates biomes (find desert/snow/jungle islands) |
| Polymorph | `1.1.0+1.21.1` | COMMON | LGPL-3.0-or-later | [Modrinth](https://modrinth.com/mod/polymorph) | - | Choose between conflicting crafting recipes (many mods = many clashes) |
| Recipe Integration | `0.4.0 (beta)` | COMMON | LicenseRef-Custom-License | [Modrinth](https://modrinth.com/mod/recipe-integration) | - | Recipe integration between mods (recipe compatibility layer) |
| TrashSlot | `21.1.11+neoforge-1.21.1` | COMMON | LicenseRef-All-Rights-Reserved | [Modrinth](https://modrinth.com/mod/trashslot) | balm | Trash slot in the player inventory |

## Performance

| Mod | Version | Side | License | Source | Requires (jar metadata) | Purpose |
|---|---|---|---|---|---|---|
| Clumps | `19.0.0.1` | COMMON | MIT | [Modrinth](https://modrinth.com/mod/clumps) | - | Merges XP orbs (fewer entities) |
| Entity Culling | `1.11.3` | CLIENT_ONLY | LicenseRef-tr7zw-Protective-License | [Modrinth](https://modrinth.com/mod/entityculling) | - | Skips rendering of occluded entities/block entities Bundled: transition, trender. |
| FastWorkbench | `1.21.1-9.1.3` | COMMON | MIT | [Modrinth](https://modrinth.com/mod/fastworkbench) | placebo | Caches crafting-table recipe lookups (faster with many mods) |
| FerriteCore | `7.0.3-neoforge` | COMMON | MIT | [Modrinth](https://modrinth.com/mod/ferrite-core) | - | Reduces memory used by block states/models |
| ImmediatelyFast | `1.6.15+1.21.1-neoforge` | CLIENT_ONLY | LGPL-3.0-or-later | [Modrinth](https://modrinth.com/mod/immediatelyfast) | - | Batches immediate-mode rendering (HUD, text, entities) |
| Lithium | `mc1.21.1-0.15.4-neoforge` | COMMON | LGPL-3.0-only | [Modrinth](https://modrinth.com/mod/lithium) | - | Server tick optimisations (AI, collisions, chunk ticking) |
| ModernFix | `5.27.27+mc1.21.1` | COMMON | LGPL-3.0-only | [Modrinth](https://modrinth.com/mod/modernfix) | - | Faster startup, lower memory (dynamic resources, dedup), many bug fixes |
| Sodium | `mc1.21.1-0.8.13-neoforge` | CLIENT_ONLY | LicenseRef-Polyform-Shield-1.0.0 | [Modrinth](https://modrinth.com/mod/sodium) | - | Rendering engine rewrite (big FPS gain on weak GPUs). Required >=0.8.12 by Sable; Embeddium is incompatible with Veil Bundled: fabric_api_base, fabric_block_view_api_v2, fabric_renderer_api_v1, fabric_rendering_data_attachment_v1, sodium. |
| spark | `1.10.124-neoforge-1.21.1` | COMMON | GPL-3.0-only | [Modrinth](https://modrinth.com/mod/spark) | - | Profiler (TPS/MSPT, CPU, memory) for benchmarking |

## Libraries

| Mod | Version | Side | License | Source | Requires (jar metadata) | Purpose |
|---|---|---|---|---|---|---|
| [NTGL] NukaTeam's Gun Lib | `3.2.0` | COMMON | LGPL-2.1-or-later | [Modrinth](https://modrinth.com/mod/ntgl) | geckolib | NukaTeam Gun Lib (gun engine for Create: Gunsmithing) |
| Architectury API | `13.0.11+neoforge` | COMMON | LGPL-3.0-only | [Modrinth](https://modrinth.com/mod/architectury-api) | - | Cross-platform API (required by PAUCAL, FTB mods) |
| Azimuth API | `1.4.10` | COMMON | MIT | [Modrinth](https://modrinth.com/mod/azimuth-api) | - | Library for Bits 'n' Bobs |
| Balm | `21.0.66+neoforge-1.21.1` | COMMON | LicenseRef-All-Rights-Reserved | [Modrinth](https://modrinth.com/mod/balm) | - | Library required by Crafting Tweaks Bundled: kuma_api. |
| Better Advanced Tooltips | `2101.1.0-build.5` | COMMON | MIT | [Modrinth](https://modrinth.com/mod/better-advanced-tooltips) | - | Required by KubeJS 2101.7.2 |
| Bookshelf | `21.1.81` | CLIENT_ONLY | LGPL-2.1-only | [Modrinth](https://modrinth.com/mod/bookshelf-lib) | - | Library for client QoL mods |
| Caelus API | `7.0.1+1.21.1` | COMMON | LGPL-3.0-or-later | [Modrinth](https://modrinth.com/mod/caelus) | - | Dependency of Hex Casting |
| Cloth Config API | `15.0.140+neoforge` | COMMON | LGPL-3.0-only | [Modrinth](https://modrinth.com/mod/cloth-config) | - | Dependency of Hex Casting |
| Create: Dragons Plus | `1.11.9` | COMMON | LGPL-3.0-or-later | [Modrinth](https://modrinth.com/mod/create-dragons-plus) | create | Shared library/fluids required by Enchantment Industry and Central Kitchen Bundled: conditional_mixin. |
| Curios API | `9.5.1+1.21.1` | COMMON | LGPL-3.0-or-later | [Modrinth](https://modrinth.com/mod/curios) | - | Dependency of Hex Casting |
| Fzzy Config | `0.7.7+1.21+neoforge` | COMMON | LicenseRef-TDL-M | [Modrinth](https://modrinth.com/mod/fzzy-config) | kotlinforforge | Config library required by Immersive Paintings |
| Geckolib | `4.9.3` | COMMON | MIT | [Modrinth](https://modrinth.com/mod/geckolib) | - | Animation library (NTGL gun models) |
| Inline | `1.21.1-1.2.2-neoforge` | COMMON | LGPL-3.0-or-later | [Modrinth](https://modrinth.com/mod/inline) | cloth_config | Dependency of Hex Casting |
| Konkrete | `1.9.9-1.21-neoforge` | CLIENT_ONLY | Apache-2.0 | [Modrinth](https://modrinth.com/mod/konkrete) | - | Library for client QoL mods |
| Kotlin for Forge | `5.12.0` | COMMON | LGPL-2.1-only | [Modrinth](https://modrinth.com/mod/kotlin-for-forge) | - | Kotlin language provider (required by Hex Casting, Slice & Dice) Bundled: kotlinforforge. |
| libIPN | `neoforge-1.21.1-6.6.3` | CLIENT_ONLY | AGPL-3.0-or-later | [Modrinth](https://modrinth.com/mod/libipn) | kotlinforforge | Library for client QoL mods |
| MaFgLib | `0.4.3+mc1.21.1` | CLIENT_ONLY | LGPL-3.0-only | [Modrinth](https://modrinth.com/mod/mafglib) | - | Library for client QoL mods Bundled: fabric_api_base, fabric_networking_api_v1. |
| Mechanicals Lib | `1.21.1-1.1.6` | COMMON | LGPL-3.0-only | [Modrinth](https://modrinth.com/mod/mechanicals-lib) | - | Library required by Create Sifting Bundled: flywheel, ponder. |
| Moog's Structure Lib (moogs_structures) | `3.4.2-neoforge-1.21.1` | COMMON | LGPL-3.0-only | [Modrinth](https://modrinth.com/mod/moogs-structure-lib) | - | Library required by Moog's Soaring Structures |
| Patchouli | `1.21.1-93-neoforge` | COMMON | CC-BY-NC-SA-3.0 | [Modrinth](https://modrinth.com/mod/patchouli) | - | Dependency of Hex Casting |
| PAUCAL | `0.7.1-pre-27 (alpha)` | COMMON | MIT | [direct](https://ci.blamejared.com/job/petrakat/job/PAUCAL/job/1.21/27/artifact/Neoforge/build/libs/paucal-0.7.1-pre-27+1.21.1-neoforge.jar) | architectury | Library required by Hex Casting |
| Placebo | `1.21.1-9.9.4` | COMMON | MIT | [Modrinth](https://modrinth.com/mod/placebo) | - | Library (Toast Control client-side, FastWorkbench both sides) |
| Prickle | `21.1.11` | CLIENT_ONLY | LGPL-2.1-only | [Modrinth](https://modrinth.com/mod/prickle) | - | Library for client QoL mods |
| Puzzles Lib | `21.1.65` | COMMON | MPL-2.0 | [Modrinth](https://modrinth.com/mod/puzzles-lib) | - | Library (Overflowing Bars client-side, Leaves Be Gone server-side) |
| Rhino | `2101.2.7-build.85+Rhino-1.21` | COMMON | MPL-2.0 | [Modrinth](https://modrinth.com/mod/rhino) | - | JavaScript engine for KubeJS |
| Ritchie's Projectile Library | `2.1.2` | COMMON | MIT | [Modrinth](https://modrinth.com/mod/rpl) | - | Ritchie's Projectile Library (required by Create Big Cannons) |
| Strut Your Stuff (Struts) | `1.3.1` | COMMON | MIT | [Modrinth](https://modrinth.com/mod/strut-your-stuff) | - | Library for Bits 'n' Bobs Bundled: sablecompanion. |
| SuperMartijn642's Config Lib | `1.1.8-neoforge-mc1.21` | CLIENT_ONLY | LicenseRef-All-Rights-Reserved | [Modrinth](https://modrinth.com/mod/supermartijn642s-config-lib) | - | Library for client QoL mods |
| YetAnotherConfigLib (YACL) | `3.8.2+1.21.1-neoforge` | COMMON | LGPL-3.0-or-later | [Modrinth](https://modrinth.com/mod/yacl) | - | Library for client QoL mods |

