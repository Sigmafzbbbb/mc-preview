/**
 * Minecraft 方块 ID → 纹理文件路径映射
 * 对应 textures/block/ 文件夹内的 PNG 文件
 */
const BLOCK_TEXTURE_MAP = {
    // 石材类
    'minecraft:stone': 'stone.png',
    'minecraft:cobblestone': 'cobblestone.png',
    'minecraft:deepslate': 'deepslate.png',
    'minecraft:granite': 'granite.png',
    'minecraft:diorite': 'diorite.png',
    'minecraft:andesite': 'andesite.png',
    'minecraft:tuff': 'tuff.png',
    'minecraft:calcite': 'calcite.png',
    'minecraft:basalt': 'basalt_side.png',
    'minecraft:blackstone': 'blackstone.png',
    'minecraft:smooth_basalt': 'smooth_basalt_top.png',
    'minecraft:smooth_stone': 'smooth_stone.png',
    'minecraft:stone_bricks': 'stone_bricks.png',
    'minecraft:cracked_stone_bricks': 'cracked_stone_bricks.png',
    'minecraft:mossy_stone_bricks': 'mossy_stone_bricks.png',
    'minecraft:chiseled_stone_bricks': 'chiseled_stone_bricks.png',

    // 木头类（侧面纹理）
    'minecraft:oak_log': 'oak_log.png',
    'minecraft:spruce_log': 'spruce_log.png',
    'minecraft:birch_log': 'birch_log.png',
    'minecraft:jungle_log': 'jungle_log.png',
    'minecraft:acacia_log': 'acacia_log.png',
    'minecraft:dark_oak_log': 'dark_oak_log.png',
    'minecraft:mangrove_log': 'mangrove_log.png',
    'minecraft:cherry_log': 'cherry_log.png',
    'minecraft:stripped_oak_log': 'stripped_oak_log.png',
    'minecraft:stripped_spruce_log': 'stripped_spruce_log.png',
    'minecraft:stripped_birch_log': 'stripped_birch_log.png',
    'minecraft:stripped_jungle_log': 'stripped_jungle_log.png',
    'minecraft:stripped_acacia_log': 'stripped_acacia_log.png',
    'minecraft:stripped_dark_oak_log': 'stripped_dark_oak_log.png',

    // 木板类
    'minecraft:oak_planks': 'oak_planks.png',
    'minecraft:spruce_planks': 'spruce_planks.png',
    'minecraft:birch_planks': 'birch_planks.png',
    'minecraft:jungle_planks': 'jungle_planks.png',
    'minecraft:acacia_planks': 'acacia_planks.png',
    'minecraft:dark_oak_planks': 'dark_oak_planks.png',
    'minecraft:mangrove_planks': 'mangrove_planks.png',
    'minecraft:cherry_planks': 'cherry_planks.png',
    'minecraft:crimson_planks': 'crimson_planks.png',
    'minecraft:warped_planks': 'warped_planks.png',
    'minecraft:bamboo_planks': 'bamboo_planks.png',

    // 矿物类
    'minecraft:coal_ore': 'coal_ore.png',
    'minecraft:iron_ore': 'iron_ore.png',
    'minecraft:gold_ore': 'gold_ore.png',
    'minecraft:diamond_ore': 'diamond_ore.png',
    'minecraft:emerald_ore': 'emerald_ore.png',
    'minecraft:lapis_ore': 'lapis_ore.png',
    'minecraft:redstone_ore': 'redstone_ore.png',
    'minecraft:copper_ore': 'copper_ore.png',
    'minecraft:nether_gold_ore': 'nether_gold_ore.png',
    'minecraft:nether_quartz_ore': 'nether_quartz_ore.png',
    'minecraft:deepslate_coal_ore': 'deepslate_coal_ore.png',
    'minecraft:deepslate_iron_ore': 'deepslate_iron_ore.png',
    'minecraft:deepslate_gold_ore': 'deepslate_gold_ore.png',
    'minecraft:deepslate_diamond_ore': 'deepslate_diamond_ore.png',
    'minecraft:deepslate_emerald_ore': 'deepslate_emerald_ore.png',
    'minecraft:deepslate_lapis_ore': 'deepslate_lapis_ore.png',
    'minecraft:deepslate_redstone_ore': 'deepslate_redstone_ore.png',
    'minecraft:deepslate_copper_ore': 'deepslate_copper_ore.png',

    // 砖石类
    'minecraft:bricks': 'bricks.png',
    'minecraft:prismarine': 'prismarine.png',
    'minecraft:dark_prismarine': 'dark_prismarine.png',
    'minecraft:prismarine_bricks': 'prismarine_bricks.png',
    'minecraft:nether_bricks': 'nether_bricks.png',
    'minecraft:red_nether_bricks': 'red_nether_bricks.png',
    'minecraft:cracked_nether_bricks': 'cracked_nether_bricks.png',
    'minecraft:chiseled_nether_bricks': 'chiseled_nether_bricks.png',
    'minecraft:deepslate_bricks': 'deepslate_bricks.png',
    'minecraft:cracked_deepslate_bricks': 'cracked_deepslate_bricks.png',
    'minecraft:deepslate_tiles': 'deepslate_tiles.png',
    'minecraft:cracked_deepslate_tiles': 'cracked_deepslate_tiles.png',
    'minecraft:chiseled_deepslate': 'chiseled_deepslate.png',
    'minecraft:polished_deepslate': 'polished_deepslate.png',
    'minecraft:quartz_block': 'quartz_block_top.png',
    'minecraft:chiseled_quartz_block': 'chiseled_quartz_block.png',
    'minecraft:quartz_pillar': 'quartz_pillar.png',
    'minecraft:purpur_block': 'purpur_block.png',
    'minecraft:purpur_pillar': 'purpur_pillar.png',
    'minecraft:end_stone': 'end_stone.png',
    'minecraft:end_stone_bricks': 'end_stone_bricks.png',
    'minecraft:sandstone': 'sandstone.png',
    'minecraft:red_sandstone': 'red_sandstone.png',
    'minecraft:terracotta': 'terracotta.png',

    // 玻璃类
    'minecraft:glass': 'glass.png',
    'minecraft:glass_pane': 'glass_pane_top.png',
    'minecraft:white_stained_glass': 'white_stained_glass.png',
    'minecraft:orange_stained_glass': 'orange_stained_glass.png',
    'minecraft:magenta_stained_glass': 'magenta_stained_glass.png',
    'minecraft:light_blue_stained_glass': 'light_blue_stained_glass.png',
    'minecraft:yellow_stained_glass': 'yellow_stained_glass.png',
    'minecraft:lime_stained_glass': 'lime_stained_glass.png',
    'minecraft:pink_stained_glass': 'pink_stained_glass.png',
    'minecraft:gray_stained_glass': 'gray_stained_glass.png',
    'minecraft:light_gray_stained_glass': 'light_gray_stained_glass.png',
    'minecraft:cyan_stained_glass': 'cyan_stained_glass.png',
    'minecraft:purple_stained_glass': 'purple_stained_glass.png',
    'minecraft:blue_stained_glass': 'blue_stained_glass.png',
    'minecraft:brown_stained_glass': 'brown_stained_glass.png',
    'minecraft:green_stained_glass': 'green_stained_glass.png',
    'minecraft:red_stained_glass': 'red_stained_glass.png',
    'minecraft:black_stained_glass': 'black_stained_glass.png',

    // 羊毛类
    'minecraft:white_wool': 'white_wool.png',
    'minecraft:orange_wool': 'orange_wool.png',
    'minecraft:magenta_wool': 'magenta_wool.png',
    'minecraft:light_blue_wool': 'light_blue_wool.png',
    'minecraft:yellow_wool': 'yellow_wool.png',
    'minecraft:lime_wool': 'lime_wool.png',
    'minecraft:pink_wool': 'pink_wool.png',
    'minecraft:gray_wool': 'gray_wool.png',
    'minecraft:light_gray_wool': 'light_gray_wool.png',
    'minecraft:cyan_wool': 'cyan_wool.png',
    'minecraft:purple_wool': 'purple_wool.png',
    'minecraft:blue_wool': 'blue_wool.png',
    'minecraft:brown_wool': 'brown_wool.png',
    'minecraft:green_wool': 'green_wool.png',
    'minecraft:red_wool': 'red_wool.png',
    'minecraft:black_wool': 'black_wool.png',

    // 混凝土类
    'minecraft:white_concrete': 'white_concrete.png',
    'minecraft:orange_concrete': 'orange_concrete.png',
    'minecraft:magenta_concrete': 'magenta_concrete.png',
    'minecraft:light_blue_concrete': 'light_blue_concrete.png',
    'minecraft:yellow_concrete': 'yellow_concrete.png',
    'minecraft:lime_concrete': 'lime_concrete.png',
    'minecraft:pink_concrete': 'pink_concrete.png',
    'minecraft:gray_concrete': 'gray_concrete.png',
    'minecraft:light_gray_concrete': 'light_gray_concrete.png',
    'minecraft:cyan_concrete': 'cyan_concrete.png',
    'minecraft:purple_concrete': 'purple_concrete.png',
    'minecraft:blue_concrete': 'blue_concrete.png',
    'minecraft:brown_concrete': 'brown_concrete.png',
    'minecraft:green_concrete': 'green_concrete.png',
    'minecraft:red_concrete': 'red_concrete.png',
    'minecraft:black_concrete': 'black_concrete.png',

    // 陶土类
    'minecraft:white_glazed_terracotta': 'white_glazed_terracotta.png',
    'minecraft:orange_glazed_terracotta': 'orange_glazed_terracotta.png',
    'minecraft:magenta_glazed_terracotta': 'magenta_glazed_terracotta.png',
    'minecraft:yellow_glazed_terracotta': 'yellow_glazed_terracotta.png',
    'minecraft:red_glazed_terracotta': 'red_glazed_terracotta.png',
    'minecraft:cyan_glazed_terracotta': 'cyan_glazed_terracotta.png',
    'minecraft:blue_glazed_terracotta': 'blue_glazed_terracotta.png',
    'minecraft:brown_glazed_terracotta': 'brown_glazed_terracotta.png',
    'minecraft:green_glazed_terracotta': 'green_glazed_terracotta.png',
    'minecraft:black_glazed_terracotta': 'black_glazed_terracotta.png',
    'minecraft:light_blue_glazed_terracotta': 'light_blue_glazed_terracotta.png',
    'minecraft:lime_glazed_terracotta': 'lime_glazed_terracotta.png',
    'minecraft:pink_glazed_terracotta': 'pink_glazed_terracotta.png',
    'minecraft:gray_glazed_terracotta': 'gray_glazed_terracotta.png',
    'minecraft:light_gray_glazed_terracotta': 'light_gray_glazed_terracotta.png',
    'minecraft:purple_glazed_terracotta': 'purple_glazed_terracotta.png',

    // 自然类
    'minecraft:grass_block': 'grass_block_side.png',
    'minecraft:dirt': 'dirt.png',
    'minecraft:podzol': 'dirt.png',
    'minecraft:sand': 'sand.png',
    'minecraft:red_sand': 'red_sand.png',
    'minecraft:gravel': 'gravel.png',
    'minecraft:clay': 'clay.png',
    'minecraft:snow_block': 'snow.png',
    'minecraft:ice': 'ice.png',
    'minecraft:packed_ice': 'packed_ice.png',
    'minecraft:blue_ice': 'blue_ice.png',
    'minecraft:obsidian': 'obsidian.png',
    'minecraft:bedrock': 'bedrock.png',
    'minecraft:magma_block': 'magma.png',
    'minecraft:moss_block': 'moss_block.png',
    'minecraft:mud': 'mud.png',
    'minecraft:mud_bricks': 'mud_bricks.png',
    'minecraft:coarse_dirt': 'coarse_dirt.png',
    'minecraft:rooted_dirt': 'rooted_dirt.png',

    // 金属类
    'minecraft:iron_block': 'iron_block.png',
    'minecraft:gold_block': 'gold_block.png',
    'minecraft:diamond_block': 'diamond_block.png',
    'minecraft:emerald_block': 'emerald_block.png',
    'minecraft:lapis_block': 'lapis_block.png',
    'minecraft:redstone_block': 'redstone_block.png',
    'minecraft:netherite_block': 'netherite_block.png',
    'minecraft:copper_block': 'copper_block.png',

    // 下界类
    'minecraft:netherrack': 'netherrack.png',
    'minecraft:soul_sand': 'soul_sand.png',
    'minecraft:soul_soil': 'soul_soil.png',
    'minecraft:glowstone': 'glowstone.png',
    'minecraft:crimson_nylium': 'crimson_nylium.png',
    'minecraft:warped_nylium': 'warped_nylium.png',
    'minecraft:crying_obsidian': 'crying_obsidian.png',
    'minecraft:ancient_debris': 'ancient_debris_side.png',
    'minecraft:basalt_delta': 'basalt_side.png',

    // 末地类
    'minecraft:shulker_box': 'shulker_box.png',

    // 建筑装饰（单纹理 fallback，优先使用 BLOCK_FACE_TEXTURES 多面映射）
    'minecraft:bookshelf': 'bookshelf.png',
    'minecraft:crafting_table': 'crafting_table_front.png',
    'minecraft:furnace': 'furnace_front.png',
    'minecraft:chest': 'chest_front.png',
    'minecraft:ender_chest': 'ender_chest_front.png',
    'minecraft:tnt': 'tnt_side.png',
    'minecraft:note_block': 'note_block.png',
    'minecraft:pumpkin': 'pumpkin_side.png',
    'minecraft:melon': 'melon_side.png',
    'minecraft:hay_block': 'hay_block_side.png',
    'minecraft:bone_block': 'bone_block_side.png',
    'minecraft:lantern': 'lantern.png',
    'minecraft:soul_lantern': 'soul_lantern.png',
    'minecraft:jack_o_lantern': 'jack_o_lantern.png',
    'minecraft:brewing_stand': 'brewing_stand.png',
    'minecraft:cauldron': 'cauldron_side.png',
    'minecraft:enchanting_table': 'enchanting_table_side.png',
    'minecraft:anvil': 'anvil.png',
    'minecraft:grindstone': 'grindstone_side.png',
    'minecraft:smoker': 'smoker_front.png',
    'minecraft:blast_furnace': 'blast_furnace_front.png',
    'minecraft:composter': 'composter_side.png',
    'minecraft:barrel': 'barrel_side.png',
    'minecraft:bell': 'bell_side.png',
    'minecraft:beacon': 'beacon.png',
    'minecraft:sea_lantern': 'sea_lantern.png',
    'minecraft:conduit': 'conduit.png',
    'minecraft:chain': 'chain.png',
    'minecraft:lodestone': 'lodestone.png',
    'minecraft:respawn_anchor': 'respawn_anchor_top.png',
    'minecraft:sculk_sensor': 'calibrated_sculk_sensor_top.png',
    'minecraft:sculk_catalyst': 'sculk_catalyst.png',
    'minecraft:sculk_shrieker': 'sculk_shrieker.png',
    'minecraft:reinforced_deepslate': 'reinforced_deepslate.png',
    'minecraft:loom': 'loom_top.png',
    'minecraft:fletching_table': 'fletching_table_front.png',
    'minecraft:smithing_table': 'smithing_table_front.png',

    // 门类（单纹理 fallback）
    'minecraft:oak_door': 'oak_door_top.png',
    'minecraft:spruce_door': 'spruce_door_top.png',
    'minecraft:birch_door': 'birch_door_top.png',
    'minecraft:jungle_door': 'jungle_door_top.png',
    'minecraft:acacia_door': 'acacia_door_top.png',
    'minecraft:dark_oak_door': 'dark_oak_door_top.png',
    'minecraft:mangrove_door': 'mangrove_door_top.png',
    'minecraft:cherry_door': 'cherry_door_top.png',
    'minecraft:crimson_door': 'crimson_door_top.png',
    'minecraft:warped_door': 'warped_door_top.png',
    'minecraft:bamboo_door': 'bamboo_door_top.png',
    'minecraft:iron_door': 'iron_door_top.png',
    'minecraft:copper_door': 'copper_door_top.png',
    'minecraft:exposed_copper_door': 'exposed_copper_door_top.png',
    'minecraft:weathered_copper_door': 'weathered_copper_door_top.png',
    'minecraft:oxidized_copper_door': 'oxidized_copper_door_top.png',

    // 活板门类
    'minecraft:oak_trapdoor': 'oak_trapdoor.png',
    'minecraft:spruce_trapdoor': 'spruce_trapdoor.png',
    'minecraft:birch_trapdoor': 'birch_trapdoor.png',
    'minecraft:jungle_trapdoor': 'jungle_trapdoor.png',
    'minecraft:acacia_trapdoor': 'acacia_trapdoor.png',
    'minecraft:dark_oak_trapdoor': 'dark_oak_trapdoor.png',
    'minecraft:mangrove_trapdoor': 'mangrove_trapdoor.png',
    'minecraft:cherry_trapdoor': 'cherry_trapdoor.png',
    'minecraft:crimson_trapdoor': 'crimson_trapdoor.png',
    'minecraft:warped_trapdoor': 'warped_trapdoor.png',
    'minecraft:bamboo_trapdoor': 'bamboo_trapdoor.png',
    'minecraft:iron_trapdoor': 'iron_trapdoor.png',

    // 红石机械方块
    'minecraft:piston': 'piston_side.png',
    'minecraft:sticky_piston': 'piston_side.png',
    'minecraft:observer': 'observer_front.png',
    'minecraft:dispenser': 'dispenser_front.png',
    'minecraft:dropper': 'dropper_front.png',
    'minecraft:hopper': 'hopper_outside.png',

    // 叶子类
    'minecraft:oak_leaves': 'oak_leaves.png',
    'minecraft:spruce_leaves': 'spruce_leaves.png',
    'minecraft:birch_leaves': 'birch_leaves.png',
    'minecraft:jungle_leaves': 'jungle_leaves.png',
    'minecraft:acacia_leaves': 'acacia_leaves.png',
    'minecraft:dark_oak_leaves': 'dark_oak_leaves.png',
    'minecraft:mangrove_leaves': 'mangrove_leaves.png',
    'minecraft:cherry_leaves': 'cherry_leaves.png',
    'minecraft:azalea_leaves': 'azalea_leaves.png',
    'minecraft:flowering_azalea_leaves': 'flowering_azalea_leaves.png',

    // 蘑菇类
    'minecraft:red_mushroom_block': 'red_mushroom_block.png',
    'minecraft:brown_mushroom_block': 'brown_mushroom_block.png',
    'minecraft:mushroom_stem': 'mushroom_stem.png',

    // 珊瑚类
    'minecraft:tube_coral_block': 'tube_coral_block.png',
    'minecraft:brain_coral_block': 'brain_coral_block.png',
    'minecraft:bubble_coral_block': 'bubble_coral_block.png',
    'minecraft:fire_coral_block': 'fire_coral_block.png',
    'minecraft:horn_coral_block': 'horn_coral_block.png',

    // 其他
    'minecraft:honey_block': 'honey_block_side.png',
    'minecraft:honeycomb_block': 'honeycomb_block.png',
    'minecraft:slime_block': 'slime_block.png',
    'minecraft:target': 'target.png',
    'minecraft:ladder': 'ladder.png',
    'minecraft:sponge': 'sponge.png',
    'minecraft:wet_sponge': 'wet_sponge.png',
    'minecraft:frosted_ice': 'frosted_ice_0.png',
    'minecraft:cactus': 'cactus_side.png',
    'minecraft:sugar_cane': 'sugar_cane.png',
    'minecraft:bamboo_block': 'bamboo_block.png',
    'minecraft:glow_lichen': 'glow_lichen.png',
    'minecraft:hanging_roots': 'hanging_roots.png',
    'minecraft:weeping_vines': 'weeping_vines.png',
    'minecraft:twisting_vines': 'twisting_vines.png',

    // 铁轨
    'minecraft:rail': 'rail.png',
    'minecraft:powered_rail': 'powered_rail.png',
    'minecraft:detector_rail': 'detector_rail.png',
    'minecraft:activator_rail': 'activator_rail.png',

    // 红石
    'minecraft:redstone_lamp': 'redstone_lamp.png',
    'minecraft:redstone_torch': 'redstone_torch.png',
    'minecraft:repeater': 'repeater.png',
    'minecraft:comparator': 'comparator.png',
    'minecraft:observer': 'observer_front.png',
    'minecraft:piston': 'piston_front.png',
    'minecraft:sticky_piston': 'piston_front.png',
    'minecraft:dispenser': 'dispenser_front.png',
    'minecraft:dropper': 'dropper_front.png',
    'minecraft:hopper': 'hopper_outside.png',

    // 花朵
    'minecraft:dandelion': 'dandelion.png',
    'minecraft:poppy': 'poppy.png',
    'minecraft:blue_orchid': 'blue_orchid.png',
    'minecraft:allium': 'allium.png',
    'minecraft:azure_bluet': 'azure_bluet.png',
    'minecraft:red_tulip': 'red_tulip.png',
    'minecraft:orange_tulip': 'orange_tulip.png',
    'minecraft:white_tulip': 'white_tulip.png',
    'minecraft:pink_tulip': 'pink_tulip.png',
    'minecraft:oxeye_daisy': 'oxeye_daisy.png',
    'minecraft:cornflower': 'cornflower.png',
    'minecraft:lily_of_the_valley': 'lily_of_the_valley.png',
    'minecraft:wither_rose': 'wither_rose.png',
    'minecraft:sunflower': 'sunflower_front.png',
    'minecraft:lilac': 'lilac_top.png',
    'minecraft:rose_bush': 'rose_bush_top.png',
    'minecraft:peony': 'peony_top.png',

    // 潜影盒
    'minecraft:white_shulker_box': 'white_shulker_box.png',
    'minecraft:orange_shulker_box': 'orange_shulker_box.png',
    'minecraft:magenta_shulker_box': 'magenta_shulker_box.png',
    'minecraft:light_blue_shulker_box': 'light_blue_shulker_box.png',
    'minecraft:yellow_shulker_box': 'yellow_shulker_box.png',
    'minecraft:lime_shulker_box': 'lime_shulker_box.png',
    'minecraft:pink_shulker_box': 'pink_shulker_box.png',
    'minecraft:gray_shulker_box': 'gray_shulker_box.png',
    'minecraft:light_gray_shulker_box': 'light_gray_shulker_box.png',
    'minecraft:cyan_shulker_box': 'cyan_shulker_box.png',
    'minecraft:purple_shulker_box': 'purple_shulker_box.png',
    'minecraft:blue_shulker_box': 'blue_shulker_box.png',
    'minecraft:brown_shulker_box': 'brown_shulker_box.png',
    'minecraft:green_shulker_box': 'green_shulker_box.png',
    'minecraft:red_shulker_box': 'red_shulker_box.png',
    'minecraft:black_shulker_box': 'black_shulker_box.png',
};

/**
 * 获取方块对应的纹理文件名
 * @param {string} blockId
 * @returns {string|null} 纹理文件名（不含路径），无匹配返回 null
 */
function getBlockTextureFile(blockId) {
    return BLOCK_TEXTURE_MAP[blockId] || null;
}

/**
 * 多面纹理方块映射
 * 支持两种格式：
 *   简写: { top, bottom, side } — 适用于所有水平面相同的方块（原木、砂岩等）
 *   完整: { up, down, north, south, east, west } — 适用于每个方向纹理不同的方块（熔炉等）
 *   混合: { top, bottom, side, north:'front.png' } — side 为默认侧面，north 可覆盖前面
 *
 * Three.js BoxGeometry 面序(材质索引):
 *   [0]=+x(east) [1]=-x(west) [2]=+y(up) [3]=-y(down) [4]=+z(south) [5]=-z(north)
 */
const BLOCK_FACE_TEXTURES = {
    // ===== 草方块/泥土类 =====
    'minecraft:grass_block': { top: 'grass_block_top.png', bottom: 'dirt.png', side: 'grass_block_side.png' },
    'minecraft:mycelium': { top: 'mycelium_top.png', bottom: 'dirt.png', side: 'mycelium_side.png' },
    'minecraft:podzol': { top: 'podzol_top.png', bottom: 'dirt.png', side: 'podzol_side.png' },
    'minecraft:dirt_path': { top: 'dirt_path_top.png', bottom: 'dirt.png', side: 'dirt_path_side.png' },
    'minecraft:farmland': { top: 'farmland.png', bottom: 'dirt.png', side: 'dirt.png' },

    // ===== 原木 =====
    'minecraft:oak_log': { top: 'oak_log_top.png', bottom: 'oak_log_top.png', side: 'oak_log.png' },
    'minecraft:spruce_log': { top: 'spruce_log_top.png', bottom: 'spruce_log_top.png', side: 'spruce_log.png' },
    'minecraft:birch_log': { top: 'birch_log_top.png', bottom: 'birch_log_top.png', side: 'birch_log.png' },
    'minecraft:jungle_log': { top: 'jungle_log_top.png', bottom: 'jungle_log_top.png', side: 'jungle_log.png' },
    'minecraft:acacia_log': { top: 'acacia_log_top.png', bottom: 'acacia_log_top.png', side: 'acacia_log.png' },
    'minecraft:dark_oak_log': { top: 'dark_oak_log_top.png', bottom: 'dark_oak_log_top.png', side: 'dark_oak_log.png' },
    'minecraft:mangrove_log': { top: 'mangrove_log_top.png', bottom: 'mangrove_log_top.png', side: 'mangrove_log.png' },
    'minecraft:cherry_log': { top: 'cherry_log_top.png', bottom: 'cherry_log_top.png', side: 'cherry_log.png' },
    'minecraft:crimson_stem': { top: 'crimson_stem_top.png', bottom: 'crimson_stem_top.png', side: 'crimson_stem.png' },
    'minecraft:warped_stem': { top: 'warped_stem_top.png', bottom: 'warped_stem_top.png', side: 'warped_stem.png' },

    // ===== 去皮原木 =====
    'minecraft:stripped_oak_log': { top: 'stripped_oak_log_top.png', bottom: 'stripped_oak_log_top.png', side: 'stripped_oak_log.png' },
    'minecraft:stripped_spruce_log': { top: 'stripped_spruce_log_top.png', bottom: 'stripped_spruce_log_top.png', side: 'stripped_spruce_log.png' },
    'minecraft:stripped_birch_log': { top: 'stripped_birch_log_top.png', bottom: 'stripped_birch_log_top.png', side: 'stripped_birch_log.png' },
    'minecraft:stripped_jungle_log': { top: 'stripped_jungle_log_top.png', bottom: 'stripped_jungle_log_top.png', side: 'stripped_jungle_log.png' },
    'minecraft:stripped_acacia_log': { top: 'stripped_acacia_log_top.png', bottom: 'stripped_acacia_log_top.png', side: 'stripped_acacia_log.png' },
    'minecraft:stripped_dark_oak_log': { top: 'stripped_dark_oak_log_top.png', bottom: 'stripped_dark_oak_log_top.png', side: 'stripped_dark_oak_log.png' },
    'minecraft:stripped_mangrove_log': { top: 'stripped_mangrove_log_top.png', bottom: 'stripped_mangrove_log_top.png', side: 'stripped_mangrove_log.png' },
    'minecraft:stripped_cherry_log': { top: 'stripped_cherry_log_top.png', bottom: 'stripped_cherry_log_top.png', side: 'stripped_cherry_log.png' },
    'minecraft:stripped_crimson_stem': { top: 'stripped_crimson_stem_top.png', bottom: 'stripped_crimson_stem_top.png', side: 'stripped_crimson_stem.png' },
    'minecraft:stripped_warped_stem': { top: 'stripped_warped_stem_top.png', bottom: 'stripped_warped_stem_top.png', side: 'stripped_warped_stem.png' },

    // ===== 柱体类 =====
    'minecraft:quartz_pillar': { top: 'quartz_pillar_top.png', bottom: 'quartz_pillar_top.png', side: 'quartz_pillar.png' },
    'minecraft:purpur_pillar': { top: 'purpur_pillar_top.png', bottom: 'purpur_pillar_top.png', side: 'purpur_pillar.png' },
    'minecraft:bone_block': { top: 'bone_block_top.png', bottom: 'bone_block_top.png', side: 'bone_block_side.png' },
    'minecraft:hay_block': { top: 'hay_block_top.png', bottom: 'hay_block_top.png', side: 'hay_block_side.png' },

    // ===== 砂岩 =====
    'minecraft:sandstone': { top: 'sandstone_top.png', bottom: 'sandstone_bottom.png', side: 'sandstone.png' },
    'minecraft:red_sandstone': { top: 'red_sandstone_top.png', bottom: 'red_sandstone_bottom.png', side: 'red_sandstone.png' },
    'minecraft:chiseled_sandstone': { top: 'sandstone_top.png', bottom: 'sandstone_bottom.png', side: 'chiseled_sandstone.png' },
    'minecraft:chiseled_red_sandstone': { top: 'red_sandstone_top.png', bottom: 'red_sandstone_bottom.png', side: 'chiseled_red_sandstone.png' },
    'minecraft:cut_sandstone': { top: 'sandstone_top.png', bottom: 'sandstone_bottom.png', side: 'cut_sandstone.png' },
    'minecraft:cut_red_sandstone': { top: 'red_sandstone_top.png', bottom: 'red_sandstone_bottom.png', side: 'cut_red_sandstone.png' },

    // ===== 铜块 =====
    'minecraft:cut_copper': { top: 'cut_copper.png', bottom: 'cut_copper.png', side: 'cut_copper.png' },
    'minecraft:exposed_cut_copper': { top: 'exposed_cut_copper.png', bottom: 'exposed_cut_copper.png', side: 'exposed_cut_copper.png' },
    'minecraft:weathered_cut_copper': { top: 'weathered_cut_copper.png', bottom: 'weathered_cut_copper.png', side: 'weathered_cut_copper.png' },
    'minecraft:oxidized_cut_copper': { top: 'oxidized_cut_copper.png', bottom: 'oxidized_cut_copper.png', side: 'oxidized_cut_copper.png' },

    // ===== 蘑菇柄 =====
    'minecraft:mushroom_stem': { top: 'mushroom_block_inside.png', bottom: 'mushroom_block_inside.png', side: 'mushroom_stem.png' },
    'minecraft:red_mushroom_block': { top: 'red_mushroom_block.png', bottom: 'mushroom_block_inside.png', side: 'red_mushroom_block.png' },
    'minecraft:brown_mushroom_block': { top: 'brown_mushroom_block.png', bottom: 'mushroom_block_inside.png', side: 'brown_mushroom_block.png' },

    // ===== 熔炉系列（前面/侧面/顶面各不同）=====
    'minecraft:furnace': { top: 'furnace_top.png', bottom: 'furnace_top.png', side: 'furnace_side.png', north: 'furnace_front.png' },
    'minecraft:blast_furnace': { top: 'blast_furnace_top.png', bottom: 'blast_furnace_top.png', side: 'blast_furnace_side.png', north: 'blast_furnace_front.png' },
    'minecraft:smoker': { up: 'smoker_top.png', down: 'smoker_bottom.png', side: 'smoker_side.png', north: 'smoker_front.png' },

    // ===== 工作台（前面/侧面/顶面各不同）=====
    'minecraft:crafting_table': { up: 'crafting_table_top.png', down: 'crafting_table_side.png', side: 'crafting_table_side.png', north: 'crafting_table_front.png' },

    // ===== TNT =====
    'minecraft:tnt': { top: 'tnt_top.png', bottom: 'tnt_bottom.png', side: 'tnt_side.png' },

    // ===== 南瓜 =====
    'minecraft:pumpkin': { top: 'pumpkin_top.png', bottom: 'pumpkin_side.png', side: 'pumpkin_side.png' },
    'minecraft:carved_pumpkin': { top: 'pumpkin_top.png', bottom: 'pumpkin_side.png', side: 'carved_pumpkin.png' },
    'minecraft:jack_o_lantern': { top: 'pumpkin_top.png', bottom: 'pumpkin_side.png', side: 'carved_pumpkin.png' },

    // ===== 西瓜 =====
    'minecraft:melon': { top: 'melon_top.png', bottom: 'melon_side.png', side: 'melon_side.png' },

    // ===== 仙人掌 =====
    'minecraft:cactus': { top: 'cactus_top.png', bottom: 'cactus_bottom.png', side: 'cactus_side.png' },

    // ===== 蜂蜜块 =====
    'minecraft:honey_block': { top: 'honey_block_top.png', bottom: 'honey_block_bottom.png', side: 'honey_block_side.png' },
    'minecraft:honeycomb_block': { top: 'honeycomb_block.png', bottom: 'honeycomb_block.png', side: 'honeycomb_block.png' },

    // ===== 活塞 =====
    'minecraft:piston': { top: 'piston_top.png', bottom: 'piston_bottom.png', side: 'piston_side.png' },
    'minecraft:sticky_piston': { top: 'piston_top_sticky.png', bottom: 'piston_bottom.png', side: 'piston_side.png' },

    // ===== 侦测器（前面/背面/侧面/顶面各不同）=====
    'minecraft:observer': { up: 'observer_top.png', down: 'observer_top.png', north: 'observer_front.png', south: 'observer_back.png', east: 'observer_side.png', west: 'observer_side.png' },

    // ===== 漏斗 =====
    'minecraft:hopper': { top: 'hopper_top.png', bottom: 'hopper_outside.png', side: 'hopper_outside.png' },

    // ===== 木桶 =====
    'minecraft:barrel': { top: 'barrel_top.png', bottom: 'barrel_bottom.png', side: 'barrel_side.png' },

    // ===== 附魔台 =====
    'minecraft:enchanting_table': { top: 'enchanting_table_top.png', bottom: 'enchanting_table_bottom.png', side: 'enchanting_table_side.png' },

    // ===== 炼药锅 =====
    'minecraft:cauldron': { top: 'cauldron_top.png', bottom: 'cauldron_bottom.png', side: 'cauldron_side.png' },

    // ===== 堆肥桶 =====
    'minecraft:composter': { top: 'composter_top.png', bottom: 'composter_bottom.png', side: 'composter_side.png' },

    // ===== 远古残骸 =====
    'minecraft:ancient_debris': { top: 'ancient_debris_top.png', bottom: 'ancient_debris_top.png', side: 'ancient_debris_side.png' },

    // ===== 玄武岩 =====
    'minecraft:basalt': { top: 'basalt_top.png', bottom: 'basalt_top.png', side: 'basalt_side.png' },

    // ===== 石英块（有侧面/顶面差异）=====
    'minecraft:quartz_block': { top: 'quartz_block_top.png', bottom: 'quartz_block_bottom.png', side: 'quartz_block_side.png' },

    // ===== 下界砖类 =====
    'minecraft:nether_bricks': { top: 'nether_bricks.png', bottom: 'nether_bricks.png', side: 'nether_bricks.png' },
    'minecraft:red_nether_bricks': { top: 'red_nether_bricks.png', bottom: 'red_nether_bricks.png', side: 'red_nether_bricks.png' },

    // ===== 门类（顶部/底部不同纹理）=====
    'minecraft:oak_door': { top: 'oak_door_top.png', bottom: 'oak_door_bottom.png', side: 'oak_door_top.png' },
    'minecraft:spruce_door': { top: 'spruce_door_top.png', bottom: 'spruce_door_bottom.png', side: 'spruce_door_top.png' },
    'minecraft:birch_door': { top: 'birch_door_top.png', bottom: 'birch_door_bottom.png', side: 'birch_door_top.png' },
    'minecraft:jungle_door': { top: 'jungle_door_top.png', bottom: 'jungle_door_bottom.png', side: 'jungle_door_top.png' },
    'minecraft:acacia_door': { top: 'acacia_door_top.png', bottom: 'acacia_door_bottom.png', side: 'acacia_door_top.png' },
    'minecraft:dark_oak_door': { top: 'dark_oak_door_top.png', bottom: 'dark_oak_door_bottom.png', side: 'dark_oak_door_top.png' },
    'minecraft:mangrove_door': { top: 'mangrove_door_top.png', bottom: 'mangrove_door_bottom.png', side: 'mangrove_door_top.png' },
    'minecraft:cherry_door': { top: 'cherry_door_top.png', bottom: 'cherry_door_bottom.png', side: 'cherry_door_top.png' },
    'minecraft:crimson_door': { top: 'crimson_door_top.png', bottom: 'crimson_door_bottom.png', side: 'crimson_door_top.png' },
    'minecraft:warped_door': { top: 'warped_door_top.png', bottom: 'warped_door_bottom.png', side: 'warped_door_top.png' },
    'minecraft:bamboo_door': { top: 'bamboo_door_top.png', bottom: 'bamboo_door_bottom.png', side: 'bamboo_door_top.png' },
    'minecraft:iron_door': { top: 'iron_door_top.png', bottom: 'iron_door_bottom.png', side: 'iron_door_top.png' },
    'minecraft:copper_door': { top: 'copper_door_top.png', bottom: 'copper_door_bottom.png', side: 'copper_door_top.png' },
    'minecraft:exposed_copper_door': { top: 'exposed_copper_door_top.png', bottom: 'exposed_copper_door_bottom.png', side: 'exposed_copper_door_top.png' },
    'minecraft:weathered_copper_door': { top: 'weathered_copper_door_top.png', bottom: 'weathered_copper_door_bottom.png', side: 'weathered_copper_door_top.png' },
    'minecraft:oxidized_copper_door': { top: 'oxidized_copper_door_top.png', bottom: 'oxidized_copper_door_bottom.png', side: 'oxidized_copper_door_top.png' },

    // ===== 钟类 =====
    'minecraft:bell': { top: 'bell_top.png', bottom: 'bell_bottom.png', side: 'bell_side.png' },

    // ===== 深板岩类 =====
    'minecraft:deepslate': { top: 'deepslate_top.png', bottom: 'deepslate_top.png', side: 'deepslate.png' },

    // ===== 强化深板岩 =====
    'minecraft:reinforced_deepslate': { top: 'reinforced_deepslate_top.png', bottom: 'reinforced_deepslate_bottom.png', side: 'reinforced_deepslate_side.png' },

    // ===== 海晶灯 =====
    'minecraft:sea_lantern': { top: 'sea_lantern.png', bottom: 'sea_lantern.png', side: 'sea_lantern.png' },

    // ===== 制箭台（前面/侧面/顶面各不同）=====
    'minecraft:fletching_table': { up: 'fletching_table_top.png', down: 'fletching_table_side.png', side: 'fletching_table_side.png', north: 'fletching_table_front.png' },

    // ===== 织布机（前面/侧面/顶面各不同）=====
    'minecraft:loom': { up: 'loom_top.png', down: 'loom_bottom.png', side: 'loom_side.png', north: 'loom_front.png' },

    // ===== 锻造台（前面/侧面/顶面各不同）=====
    'minecraft:smithing_table': { up: 'smithing_table_top.png', down: 'smithing_table_bottom.png', side: 'smithing_table_side.png', north: 'smithing_table_front.png' },

    // ===== 讲台（前面/侧面/顶面各不同）=====
    'minecraft:lectern': { up: 'lectern_top.png', down: 'lectern_base.png', side: 'lectern_sides.png', north: 'lectern_front.png' },

    // ===== 蜂巢（前面/侧面/端面各不同）=====
    'minecraft:beehive': { up: 'beehive_end.png', down: 'beehive_end.png', north: 'beehive_front.png', south: 'beehive_end.png', east: 'beehive_side.png', west: 'beehive_side.png' },

    // ===== 命令方块（前面/背面/侧面各不同）=====
    'minecraft:command_block': { up: 'command_block_conditional.png', down: 'command_block_back.png', north: 'command_block_front.png', south: 'command_block_back.png', east: 'command_block_side.png', west: 'command_block_side.png' },
    'minecraft:repeating_command_block': { up: 'repeating_command_block_conditional.png', down: 'repeating_command_block_back.png', north: 'repeating_command_block_front.png', south: 'repeating_command_block_back.png', east: 'repeating_command_block_side.png', west: 'repeating_command_block_side.png' },
    'minecraft:chain_command_block': { up: 'chain_command_block_conditional.png', down: 'chain_command_block_back.png', north: 'chain_command_block_front.png', south: 'chain_command_block_back.png', east: 'chain_command_block_side.png', west: 'chain_command_block_side.png' },

    // ===== 制图台（三面各不同）=====
    'minecraft:cartography_table': { up: 'cartography_table_top.png', down: 'cartography_table_side3.png', north: 'cartography_table_side1.png', south: 'cartography_table_side3.png', east: 'cartography_table_side2.png', west: 'cartography_table_side2.png' },

    // ===== 铁轨类（只显示上下两个面）=====
    'minecraft:rail': { up: 'rail.png', down: 'rail.png', east: 'rail.png', west: 'rail.png', north: 'rail.png', south: 'rail.png' },
    'minecraft:powered_rail': { up: 'powered_rail.png', down: 'powered_rail.png', east: 'powered_rail.png', west: 'powered_rail.png', north: 'powered_rail.png', south: 'powered_rail.png' },
    'minecraft:detector_rail': { up: 'detector_rail.png', down: 'detector_rail.png', east: 'detector_rail.png', west: 'detector_rail.png', north: 'detector_rail.png', south: 'detector_rail.png' },
    'minecraft:activator_rail': { up: 'activator_rail.png', down: 'activator_rail.png', east: 'activator_rail.png', west: 'activator_rail.png', north: 'activator_rail.png', south: 'activator_rail.png' },
};

/**
 * 将方块纹理映射解析为 Three.js 6 面材质数组
 * BoxGeometry 面序: [0]=+x(east) [1]=-x(west) [2]=+y(up) [3]=-y(down) [4]=+z(south) [5]=-z(north)
 * @param {string} blockId
 * @returns {string[]|null} 6 个纹理文件名数组，或 null（无纹理映射时回退到 BLOCK_TEXTURE_MAP）
 */
function resolveBlockFaceTextures(blockId) {
    const ft = BLOCK_FACE_TEXTURES[blockId];
    if (!ft) return null;

    // 从简写/完整格式中提取各方向纹理，支持多层 fallback
    const side = ft.side || ft.east || ft.west || ft.south || ft.north || ft.front;
    const up   = ft.up || ft.top;
    const down = ft.down || ft.bottom;

    return [
        ft.east  || side,                   // [0] +x (east)
        ft.west  || side,                   // [1] -x (west)
        up,                                  // [2] +y (up)
        down,                                // [3] -y (down)
        ft.south || ft.back || side,        // [4] +z (south)
        ft.north || ft.front || side         // [5] -z (north)
    ];
}

/**
 * 获取方块的多面纹理映射（原始格式，向后兼容）
 * @param {string} blockId
 * @returns {object|null}
 */
function getBlockFaceTextures(blockId) {
    return BLOCK_FACE_TEXTURES[blockId] || null;
}
