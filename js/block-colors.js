/**
 * Minecraft 方块 ID → 颜色映射表
 * 将方块名称映射为十六进制颜色值
 */

const BLOCK_COLORS = {
    // ========== 石材类 ==========
    'minecraft:stone': '#828282',
    'minecraft:cobblestone': '#7a7a7a',
    'minecraft:deepslate': '#4a4a4a',
    'minecraft:granite': '#926959',
    'minecraft:diorite': '#c2b9a3',
    'minecraft:andesite': '#7e7e7e',
    'minecraft:tuff': '#6b6b6b',
    'minecraft:calcite': '#d4cdc4',
    'minecraft:basalt': '#4e4a4a',
    'minecraft:blackstone': '#3a3a3a',
    'minecraft:smooth_basalt': '#444444',
    'minecraft:cobblestone_slab': '#7a7a7a',
    'minecraft:stone_slab': '#828282',
    'minecraft:smooth_stone': '#8a8a8a',
    'minecraft:stone_stairs': '#828282',
    'minecraft:cobblestone_stairs': '#7a7a7a',
    'minecraft:stonebrick': '#7a7a7a',
    'minecraft:stone_bricks': '#7a7a7a',
    'minecraft:cracked_stone_bricks': '#6e6e6e',
    'minecraft:mossy_stone_bricks': '#6a7a5a',
    'minecraft:chiseled_stone_bricks': '#7a7a7a',

    // ========== 木头类 ==========
    'minecraft:oak_log': '#7B6B4A',
    'minecraft:spruce_log': '#5C4020',
    'minecraft:birch_log': '#D4C9A8',
    'minecraft:jungle_log': '#7B5B3A',
    'minecraft:acacia_log': '#9B6B3A',
    'minecraft:dark_oak_log': '#3E2E1E',
    'minecraft:mangrove_log': '#4A2E1E',
    'minecraft:cherry_log': '#9B5B5A',
    'minecraft:oak_planks': '#BC9862',
    'minecraft:spruce_planks': '#7E5830',
    'minecraft:birch_planks': '#C9A96E',
    'minecraft:jungle_planks': '#B88A4E',
    'minecraft:acacia_planks': '#C48E3E',
    'minecraft:dark_oak_planks': '#563A1A',
    'minecraft:mangrove_planks': '#6A4A2A',
    'minecraft:cherry_planks': '#C49898',
    'minecraft:oak_slab': '#BC9862',
    'minecraft:oak_stairs': '#BC9862',
    'minecraft:oak_fence': '#BC9862',
    'minecraft:oak_door': '#BC9862',
    'minecraft:oak_trapdoor': '#BC9862',
    'minecraft:stripped_oak_log': '#B89860',
    'minecraft:stripped_spruce_log': '#7E5830',
    'minecraft:stripped_birch_log': '#DDD0B8',
    'minecraft:stripped_jungle_log': '#C49E5E',
    'minecraft:stripped_acacia_log': '#D4A850',
    'minecraft:stripped_dark_oak_log': '#6A4A2A',

    // ========== 矿物类 ==========
    'minecraft:coal_ore': '#6a6a6a',
    'minecraft:iron_ore': '#8a7a6a',
    'minecraft:gold_ore': '#8a8a5a',
    'minecraft:diamond_ore': '#6a8a8a',
    'minecraft:emerald_ore': '#6a8a6a',
    'minecraft:lapis_ore': '#5a5a8a',
    'minecraft:redstone_ore': '#8a5a5a',
    'minecraft:copper_ore': '#8a6a4a',
    'minecraft:deepslate_coal_ore': '#4a4a4a',
    'minecraft:deepslate_iron_ore': '#5a4a4a',
    'minecraft:deepslate_gold_ore': '#5a5a3a',
    'minecraft:deepslate_diamond_ore': '#3a5a5a',
    'minecraft:deepslate_emerald_ore': '#3a5a3a',
    'minecraft:deepslate_lapis_ore': '#3a3a5a',
    'minecraft:deepslate_redstone_ore': '#5a3a3a',
    'minecraft:deepslate_copper_ore': '#5a4a3a',
    'minecraft:raw_iron_block': '#8a7a6a',
    'minecraft:raw_gold_block': '#8a8a5a',
    'minecraft:raw_copper_block': '#8a6a4a',

    // ========== 砖石建筑类 ==========
    'minecraft:bricks': '#9B4E3E',
    'minecraft:prismarine': '#4D9B8E',
    'minecraft:dark_prismarine': '#3D5E5A',
    'minecraft:prismarine_bricks': '#5E7E7A',
    'minecraft:quartz_block': '#EDE6DB',
    'minecraft:chiseled_quartz_block': '#EDE6DB',
    'minecraft:quartz_pillar': '#EDE6DB',
    'minecraft:quartz_slab': '#EDE6DB',
    'minecraft:quartz_stairs': '#EDE6DB',
    'minecraft:purpur_block': '#A060A0',
    'minecraft:purpur_pillar': '#A060A0',
    'minecraft:end_stone': '#EDE8D0',
    'minecraft:end_stone_bricks': '#E0D8B8',
    'minecraft:sandstone': '#D9CC9A',
    'minecraft:red_sandstone': '#B07640',
    'minecraft:terracotta': '#9E6040',

    // ========== 玻璃类 ==========
    'minecraft:glass': '#C0E0FF',
    'minecraft:white_stained_glass': '#E8E8E8',
    'minecraft:orange_stained_glass': '#C06020',
    'minecraft:magenta_stained_glass': '#A030A0',
    'minecraft:light_blue_stained_glass': '#80C0E0',
    'minecraft:yellow_stained_glass': '#D0C020',
    'minecraft:lime_stained_glass': '#40C020',
    'minecraft:pink_stained_glass': '#E070A0',
    'minecraft:gray_stained_glass': '#505050',
    'minecraft:light_gray_stained_glass': '#A0A0A0',
    'minecraft:cyan_stained_glass': '#20A0A0',
    'minecraft:purple_stained_glass': '#7020A0',
    'minecraft:blue_stained_glass': '#2020A0',
    'minecraft:brown_stained_glass': '#604020',
    'minecraft:green_stained_glass': '#206020',
    'minecraft:red_stained_glass': '#A02020',
    'minecraft:black_stained_glass': '#1A1A1A',
    'minecraft:glass_pane': '#C0E0FF',

    // ========== 羊毛类 ==========
    'minecraft:white_wool': '#E8E8E8',
    'minecraft:orange_wool': '#D87E40',
    'minecraft:magenta_wool': '#A040A0',
    'minecraft:light_blue_wool': '#90B0D0',
    'minecraft:yellow_wool': '#D0C040',
    'minecraft:lime_wool': '#60C040',
    'minecraft:pink_wool': '#E080A0',
    'minecraft:gray_wool': '#505050',
    'minecraft:light_gray_wool': '#A0A0A0',
    'minecraft:cyan_wool': '#208080',
    'minecraft:purple_wool': '#7030A0',
    'minecraft:blue_wool': '#3030C0',
    'minecraft:brown_wool': '#604030',
    'minecraft:green_wool': '#306030',
    'minecraft:red_wool': '#B02020',
    'minecraft:black_wool': '#1A1A1A',

    // ========== 混凝土类 ==========
    'minecraft:white_concrete': '#DFDFDF',
    'minecraft:orange_concrete': '#C07030',
    'minecraft:magenta_concrete': '#903090',
    'minecraft:light_blue_concrete': '#7090B0',
    'minecraft:yellow_concrete': '#C0B030',
    'minecraft:lime_concrete': '#50A030',
    'minecraft:pink_concrete': '#D07090',
    'minecraft:gray_concrete': '#404040',
    'minecraft:light_gray_concrete': '#909090',
    'minecraft:cyan_concrete': '#107070',
    'minecraft:purple_concrete': '#602090',
    'minecraft:blue_concrete': '#2020A0',
    'minecraft:brown_concrete': '#503020',
    'minecraft:green_concrete': '#205020',
    'minecraft:red_concrete': '#A01010',
    'minecraft:black_concrete': '#101010',
    'minecraft:white_concrete_powder': '#C8C8C8',
    'minecraft:orange_concrete_powder': '#B06020',
    'minecraft:magenta_concrete_powder': '#802080',
    'minecraft:light_blue_concrete_powder': '#6080A0',
    'minecraft:yellow_concrete_powder': '#B0A020',
    'minecraft:lime_concrete_powder': '#409020',
    'minecraft:pink_concrete_powder': '#C06080',
    'minecraft:gray_concrete_powder': '#303030',
    'minecraft:light_gray_concrete_powder': '#808080',
    'minecraft:cyan_concrete_powder': '#006060',
    'minecraft:purple_concrete_powder': '#501080',
    'minecraft:blue_concrete_powder': '#101090',
    'minecraft:brown_concrete_powder': '#402010',
    'minecraft:green_concrete_powder': '#104010',
    'minecraft:red_concrete_powder': '#900010',
    'minecraft:black_concrete_powder': '#080808',

    // ========== 陶土类 ==========
    'minecraft:white_glazed_terracotta': '#B0B0B0',
    'minecraft:orange_glazed_terracotta': '#A06020',
    'minecraft:magenta_glazed_terracotta': '#802080',
    'minecraft:yellow_glazed_terracotta': '#A09020',
    'minecraft:red_glazed_terracotta': '#902020',
    'minecraft:cyan_glazed_terracotta': '#107070',
    'minecraft:blue_glazed_terracotta': '#2020A0',
    'minecraft:brown_glazed_terracotta': '#503020',
    'minecraft:green_glazed_terracotta': '#206020',
    'minecraft:black_glazed_terracotta': '#202020',
    'minecraft:light_blue_glazed_terracotta': '#6090A0',
    'minecraft:lime_glazed_terracotta': '#409020',
    'minecraft:pink_glazed_terracotta': '#C06080',
    'minecraft:gray_glazed_terracotta': '#505050',
    'minecraft:light_gray_glazed_terracotta': '#909090',
    'minecraft:purple_glazed_terracotta': '#7020A0',

    // ========== 自然类 ==========
    'minecraft:grass_block': '#5D8C32',
    'minecraft:dirt': '#6B4C30',
    'minecraft:podzol': '#6B5030',
    'minecraft:sand': '#D9CC9A',
    'minecraft:red_sand': '#B07640',
    'minecraft:gravel': '#7A7A7A',
    'minecraft:clay': '#9CA0A0',
    'minecraft:snow_block': '#F0F0F0',
    'minecraft:ice': '#A0D0F0',
    'minecraft:packed_ice': '#80C0E0',
    'minecraft:blue_ice': '#4080C0',
    'minecraft:obsidian': '#1A1025',
    'minecraft:bedrock': '#3A3A3A',
    'minecraft:water': '#2060C0',
    'minecraft:lava': '#D04000',
    'minecraft:kelp': '#206020',
    'minecraft:seagrass': '#308030',
    'minecraft:coarse_dirt': '#5A4028',
    'minecraft:rooted_dirt': '#5A3828',
    'minecraft:moss_block': '#408030',
    'minecraft:mud': '#4A3020',
    'minecraft:mud_bricks': '#5A4030',

    // ========== 金属类 ==========
    'minecraft:iron_block': '#D8D8D8',
    'minecraft:gold_block': '#F0C030',
    'minecraft:diamond_block': '#40D0D0',
    'minecraft:emerald_block': '#30B060',
    'minecraft:lapis_block': '#2020A0',
    'minecraft:redstone_block': '#C02020',
    'minecraft:netherite_block': '#403030',
    'minecraft:copper_block': '#B06030',
    'minecraft:exposed_copper': '#6A8A6A',
    'minecraft:weathered_copper': '#4A6A5A',
    'minecraft:oxidized_copper': '#3A6A6A',
    'minecraft:waxed_copper': '#B06030',

    // ========== 下界类 ==========
    'minecraft:netherrack': '#6B3020',
    'minecraft:soul_sand': '#5C4030',
    'minecraft:glowstone': '#B0A040',
    'minecraft:nether_bricks': '#2A1A2A',
    'minecraft:crimson_nylium': '#8B2030',
    'minecraft:warped_nylium': '#106060',
    'minecraft:crying_obsidian': '#2A1035',
    'minecraft:ancient_debris': '#3A3030',
    'minecraft:nether_gold_ore': '#7B4A20',
    'minecraft:soul_soil': '#4A3828',
    'minecraft:basalt_delta': '#4A2A2A',
    'minecraft:warped_planks': '#1A6A5A',
    'minecraft:crimson_planks': '#6A2A2A',

    // ========== 末地类 ==========
    'minecraft:end_stone_bricks': '#E0D8B8',
    'minecraft:purpur_stairs': '#A060A0',
    'minecraft:purpur_slab': '#A060A0',
    'minecraft:shulker_box': '#B0B0C0',
    'minecraft:white_shulker_box': '#B0B0C0',
    'minecraft:orange_shulker_box': '#D87E40',
    'minecraft:magenta_shulker_box': '#A040A0',
    'minecraft:light_blue_shulker_box': '#90B0D0',
    'minecraft:yellow_shulker_box': '#D0C040',
    'minecraft:lime_shulker_box': '#60C040',
    'minecraft:pink_shulker_box': '#E080A0',
    'minecraft:gray_shulker_box': '#505050',
    'minecraft:light_gray_shulker_box': '#A0A0A0',
    'minecraft:cyan_shulker_box': '#208080',
    'minecraft:purple_shulker_box': '#7030A0',
    'minecraft:blue_shulker_box': '#3030C0',
    'minecraft:brown_shulker_box': '#604030',
    'minecraft:green_shulker_box': '#306030',
    'minecraft:red_shulker_box': '#B02020',
    'minecraft:black_shulker_box': '#1A1A1A',

    // ========== 建筑装饰 ==========
    'minecraft:bookshelf': '#6B4C30',
    'minecraft:crafting_table': '#8A6030',
    'minecraft:furnace': '#7A7A7A',
    'minecraft:chest': '#8A6030',
    'minecraft:ender_chest': '#0A1030',
    'minecraft:tnt': '#C02020',
    'minecraft:note_block': '#5A3A20',
    'minecraft:pumpkin': '#D08020',
    'minecraft:melon': '#40A020',
    'minecraft:hay_block': '#C0A040',
    'minecraft:bone_block': '#E0D8CC',
    'minecraft:ender_pearl_block': '#107030',
    'minecraft:ladder': '#8A6A3A',
    'minecraft:torch': '#D0A030',
    'minecraft:wall_torch': '#D0A030',
    'minecraft:lantern': '#C0A030',
    'minecraft:soul_lantern': '#30A0A0',
    'minecraft:jack_o_lantern': '#D09020',
    'minecraft:sign': '#8A6A3A',
    'minecraft:oak_sign': '#8A6A3A',
    'minecraft:spruce_sign': '#5C4020',

    // ========== 地板/路径 ==========
    'minecraft:dirt_path': '#8A7A5A',
    'minecraft:farmland': '#5A4020',
    'minecraft:stone_button': '#7a7a7a',
    'minecraft:oak_button': '#BC9862',
    'minecraft:oak_pressure_plate': '#BC9862',
    'minecraft:stone_pressure_plate': '#828282',

    // ========== 墙壁类 ==========
    'minecraft:cobblestone_wall': '#7a7a7a',
    'minecraft:stone_brick_wall': '#7a7a7a',
    'minecraft:andesite_wall': '#7e7e7e',
    'minecraft:granite_wall': '#926959',
    'minecraft:diorite_wall': '#c2b9a3',
    'minecraft:brick_wall': '#9B4E3E',
    'minecraft:sandstone_wall': '#D9CC9A',
    'minecraft:red_sandstone_wall': '#B07640',
    'minecraft:mossy_cobblestone_wall': '#6a7a5a',
    'minecraft:prismarine_wall': '#4D9B8E',

    // ========== 围栏类 ==========
    'minecraft:spruce_fence': '#7E5830',
    'minecraft:birch_fence': '#C9A96E',
    'minecraft:jungle_fence': '#B88A4E',
    'minecraft:acacia_fence': '#C48E3E',
    'minecraft:dark_oak_fence': '#563A1A',
    'minecraft:nether_brick_fence': '#2A1A2A',

    // ========== 铁类 ==========
    'minecraft:iron_bars': '#D0D0D0',
    'minecraft:iron_door': '#D8D8D8',
    'minecraft:iron_trapdoor': '#D8D8D8',
    'minecraft:chain': '#888888',
    'minecraft:heavy_weighted_pressure_plate': '#888888',
    'minecraft:light_weighted_pressure_plate': '#D0D0D0',

    // ========== 其他方块 ==========
    'minecraft:lever': '#606060',
    'minecraft:redstone_lamp': '#C0A030',
    'minecraft:redstone_wire': '#C02020',
    'minecraft:repeater': '#505050',
    'minecraft:comparator': '#505050',
    'minecraft:observer': '#606060',
    'minecraft:piston': '#707070',
    'minecraft:sticky_piston': '#707070',
    'minecraft:dispenser': '#7a7a7a',
    'minecraft:dropper': '#7a7a7a',
    'minecraft:hopper': '#505050',
    'minecraft:cauldron': '#404040',
    'minecraft:brewing_stand': '#606060',
    'minecraft:enchanting_table': '#303060',
    'minecraft:anvil': '#3a3a3a',
    'minecraft:chipped_anvil': '#3a3a3a',
    'minecraft:damaged_anvil': '#3a3a3a',
    'minecraft:grindstone': '#606060',
    'minecraft:smoker': '#5a5a5a',
    'minecraft:blast_furnace': '#4a4a4a',
    'minecraft:loom': '#706040',
    'minecraft:fletching_table': '#8A7040',
    'minecraft:smithing_table': '#404040',
    'minecraft:composter': '#6A5A3A',
    'minecraft:barrel': '#8A6A3A',
    'minecraft:bell': '#C0A030',
    'minecraft:lodestone': '#3A3A3A',
    'minecraft:respawn_anchor': '#3A2040',
    'minecraft:target': '#E0E0E0',
    'minecraft:sponge': '#C0B050',
    'minecraft:wet_sponge': '#809050',
    'minecraft:cake': '#E0D0B0',
    'minecraft:conduit': '#3070A0',
    'minecraft:sea_lantern': '#C0E0A0',
    'minecraft:beacon': '#50B0C0',
    'minecraft:nether_star': '#E0E0E0',

    // ========== 下界砖 ==========
    'minecraft:nether_brick_slab': '#2A1A2A',
    'minecraft:nether_brick_stairs': '#2A1A2A',

    // ========== 铁轨类 ==========
    'minecraft:rail': '#606060',
    'minecraft:powered_rail': '#807030',
    'minecraft:detector_rail': '#404050',
    'minecraft:activator_rail': '#803020',

    // ========== 红石火把 ==========
    'minecraft:redstone_torch': '#C04040',

    // ========== 告示牌 ==========
    'minecraft:spruce_sign': '#5C4020',
    'minecraft:birch_sign': '#C9A96E',
    'minecraft:jungle_sign': '#B88A4E',
    'minecraft:acacia_sign': '#C48E3E',
    'minecraft:dark_oak_sign': '#563A1A',
    'minecraft:crimson_sign': '#6A2A2A',
    'minecraft:warped_sign': '#1A6A5A',

    // ========== 门类 ==========
    'minecraft:spruce_door': '#5C4020',
    'minecraft:birch_door': '#C9A96E',
    'minecraft:jungle_door': '#B88A4E',
    'minecraft:acacia_door': '#C48E3E',
    'minecraft:dark_oak_door': '#563A1A',
    'minecraft:iron_door': '#D8D8D8',
    'minecraft:crimson_door': '#6A2A2A',
    'minecraft:warped_door': '#1A6A5A',

    // ========== 活板门类 ==========
    'minecraft:spruce_trapdoor': '#5C4020',
    'minecraft:birch_trapdoor': '#C9A96E',
    'minecraft:jungle_trapdoor': '#B88A4E',
    'minecraft:acacia_trapdoor': '#C48E3E',
    'minecraft:dark_oak_trapdoor': '#563A1A',
    'minecraft:iron_trapdoor': '#D8D8D8',

    // ========== 楼梯类 ==========
    'minecraft:spruce_stairs': '#7E5830',
    'minecraft:birch_stairs': '#C9A96E',
    'minecraft:jungle_stairs': '#B88A4E',
    'minecraft:acacia_stairs': '#C48E3E',
    'minecraft:dark_oak_stairs': '#563A1A',
    'minecraft:brick_stairs': '#9B4E3E',

    // ========== 半砖类 ==========
    'minecraft:spruce_slab': '#7E5830',
    'minecraft:birch_slab': '#C9A96E',
    'minecraft:jungle_slab': '#B88A4E',
    'minecraft:acacia_slab': '#C48E3E',
    'minecraft:dark_oak_slab': '#563A1A',
    'minecraft:brick_slab': '#9B4E3E',
    'minecraft:sandstone_slab': '#D9CC9A',
    'minecraft:red_sandstone_slab': '#B07640',
    'minecraft:prismarine_slab': '#4D9B8E',
    'minecraft:prismarine_brick_slab': '#5E7E7A',
    'minecraft:dark_prismarine_slab': '#3D5E5A',
    'minecraft:nether_brick_slab': '#2A1A2A',

    // ========== 活塞 ==========
    'minecraft:piston_head': '#707070',
    'minecraft:moving_piston': '#707070',

    // ========== 床 ==========
    'minecraft:white_bed': '#E8E8E8',
    'minecraft:orange_bed': '#D87E40',
    'minecraft:magenta_bed': '#A040A0',
    'minecraft:light_blue_bed': '#90B0D0',
    'minecraft:yellow_bed': '#D0C040',
    'minecraft:lime_bed': '#60C040',
    'minecraft:pink_bed': '#E080A0',
    'minecraft:gray_bed': '#505050',
    'minecraft:light_gray_bed': '#A0A0A0',
    'minecraft:cyan_bed': '#208080',
    'minecraft:purple_bed': '#7030A0',
    'minecraft:blue_bed': '#3030C0',
    'minecraft:brown_bed': '#604030',
    'minecraft:green_bed': '#306030',
    'minecraft:red_bed': '#B02020',
    'minecraft:black_bed': '#1A1A1A',

    // ========== 羊毛地毯 ==========
    'minecraft:white_carpet': '#E8E8E8',
    'minecraft:orange_carpet': '#D87E40',
    'minecraft:magenta_carpet': '#A040A0',
    'minecraft:light_blue_carpet': '#90B0D0',
    'minecraft:yellow_carpet': '#D0C040',
    'minecraft:lime_carpet': '#60C040',
    'minecraft:pink_carpet': '#E080A0',
    'minecraft:gray_carpet': '#505050',
    'minecraft:light_gray_carpet': '#A0A0A0',
    'minecraft:cyan_carpet': '#208080',
    'minecraft:purple_carpet': '#7030A0',
    'minecraft:blue_carpet': '#3030C0',
    'minecraft:brown_carpet': '#604030',
    'minecraft:green_carpet': '#306030',
    'minecraft:red_carpet': '#B02020',
    'minecraft:black_carpet': '#1A1A1A',

    // ========== 花朵/植物 ==========
    'minecraft:rose_bush': '#C02020',
    'minecraft:sunflower': '#E0C020',
    'minecraft:lilac': '#A040A0',
    'minecraft:dandelion': '#E0D020',
    'minecraft:poppy': '#C02020',
    'minecraft:blue_orchid': '#2020C0',
    'minecraft:allium': '#B060B0',
    'minecraft:azure_bluet': '#D0D0E0',
    'minecraft:red_tulip': '#C02020',
    'minecraft:orange_tulip': '#D08020',
    'minecraft:white_tulip': '#E8E8E8',
    'minecraft:pink_tulip': '#E080A0',
    'minecraft:oxeye_daisy': '#F0F0D0',
    'minecraft:cornflower': '#2020C0',
    'minecraft:lily_of_the_valley': '#F0F0F0',
    'minecraft:wither_rose': '#202020',

    // ========== 叶子类 ==========
    'minecraft:oak_leaves': '#3A8A20',
    'minecraft:spruce_leaves': '#2A5A20',
    'minecraft:birch_leaves': '#4A9A30',
    'minecraft:jungle_leaves': '#2A7A10',
    'minecraft:acacia_leaves': '#3A8A20',
    'minecraft:dark_oak_leaves': '#2A5A10',
    'minecraft:mangrove_leaves': '#3A7A20',
    'minecraft:cherry_leaves': '#D080A0',

    // ========== 蘑菇类 ==========
    'minecraft:red_mushroom_block': '#A02020',
    'minecraft:brown_mushroom_block': '#8A6A3A',
    'minecraft:mushroom_stem': '#D0D0B0',

    // ========== 铁砧 ==========
    'minecraft:chipped_anvil': '#3a3a3a',
    'minecraft:damaged_anvil': '#3a3a3a',

    // ========== 珊瑚 ==========
    'minecraft:tube_coral_block': '#C04040',
    'minecraft:brain_coral_block': '#D070A0',
    'minecraft:bubble_coral_block': '#A0A0C0',
    'minecraft:fire_coral_block': '#D06020',
    'minecraft:horn_coral_block': '#D0A020',

    // ========== 深板岩类 ==========
    'minecraft:deepslate_bricks': '#4A4A4A',
    'minecraft:cracked_deepslate_bricks': '#3E3E3E',
    'minecraft:deepslate_tiles': '#505050',
    'minecraft:cracked_deepslate_tiles': '#444444',
    'minecraft:chiseled_deepslate': '#4A4A4A',
    'minecraft:polished_deepslate': '#555555',
    'minecraft:deepslate_slab': '#555555',
    'minecraft:deepslate_stairs': '#555555',
    'minecraft:deepslate_wall': '#555555',

    // ========== 缠怨藤 ==========
    'minecraft:weeping_vines': '#206020',
    'minecraft:twisting_vines': '#20A080',

    // ========== 其他装饰 ==========
    'minecraft:glow_lichen': '#20A040',
    'minecraft:sculk_sensor': '#103050',
    'minecraft:sculk_shrieker': '#103050',
    'minecraft:sculk_catalyst': '#103050',
    'minecraft:sculk_vein': '#104040',
    'minecraft:reinforced_deepslate': '#2A2A2A',
    'minecraft:frosted_ice': '#90C0E0',
    'minecraft:magma_block': '#802010',
    'minecraft:nether_wart_block': '#802040',
    'minecraft:warped_wart_block': '#206040',
};

/**
 * 获取方块颜色
 * @param {string} blockId - Minecraft 方块 ID，如 "minecraft:stone"
 * @returns {string} 十六进制颜色值
 */
function getBlockColor(blockId) {
    if (BLOCK_COLORS[blockId]) {
        return BLOCK_COLORS[blockId];
    }
    return '#888888';
}

/**
 * 中文方块名称翻译表
 */
const BLOCK_NAMES_CN = {
    // 石材类
    'minecraft:stone': '石头', 'minecraft:cobblestone': '圆石', 'minecraft:deepslate': '深板岩',
    'minecraft:granite': '花岗岩', 'minecraft:diorite': '闪长岩', 'minecraft:andesite': '安山岩',
    'minecraft:tuff': '凝灰岩', 'minecraft:calcite': '方解石', 'minecraft:basalt': '玄武岩',
    'minecraft:blackstone': '黑石', 'minecraft:smooth_basalt': '平滑玄武岩',
    'minecraft:smooth_stone': '平滑石头', 'minecraft:stone_bricks': '石砖',
    'minecraft:cracked_stone_bricks': '裂纹石砖', 'minecraft:mossy_stone_bricks': '苔石砖',
    'minecraft:chiseled_stone_bricks': '錾制石砖', 'minecraft:stonebrick': '石砖',

    // 木头类
    'minecraft:oak_log': '橡木原木', 'minecraft:spruce_log': '云杉原木', 'minecraft:birch_log': '白桦原木',
    'minecraft:jungle_log': '丛林原木', 'minecraft:acacia_log': '金合欢原木', 'minecraft:dark_oak_log': '深色橡木原木',
    'minecraft:mangrove_log': '红树林原木', 'minecraft:cherry_log': '樱花原木',
    'minecraft:oak_planks': '橡木木板', 'minecraft:spruce_planks': '云杉木板', 'minecraft:birch_planks': '白桦木板',
    'minecraft:jungle_planks': '丛林木板', 'minecraft:acacia_planks': '金合欢木板', 'minecraft:dark_oak_planks': '深色橡木木板',
    'minecraft:mangrove_planks': '红树林木板', 'minecraft:cherry_planks': '樱花木板',
    'minecraft:stripped_oak_log': '去皮橡木原木', 'minecraft:stripped_spruce_log': '去皮云杉原木',
    'minecraft:stripped_birch_log': '去皮白桦原木', 'minecraft:stripped_jungle_log': '去皮丛林原木',
    'minecraft:stripped_acacia_log': '去皮金合欢原木', 'minecraft:stripped_dark_oak_log': '去皮深色橡木原木',

    // 矿物类
    'minecraft:coal_ore': '煤矿石', 'minecraft:iron_ore': '铁矿石', 'minecraft:gold_ore': '金矿石',
    'minecraft:diamond_ore': '钻石矿石', 'minecraft:emerald_ore': '绿宝石矿石', 'minecraft:lapis_ore': '青金石矿石',
    'minecraft:redstone_ore': '红石矿石', 'minecraft:copper_ore': '铜矿石',
    'minecraft:deepslate_coal_ore': '深层煤矿石', 'minecraft:deepslate_iron_ore': '深层铁矿石',
    'minecraft:deepslate_gold_ore': '深层金矿石', 'minecraft:deepslate_diamond_ore': '深层钻石矿石',
    'minecraft:deepslate_emerald_ore': '深层绿宝石矿石', 'minecraft:deepslate_lapis_ore': '深层青金石矿石',
    'minecraft:deepslate_redstone_ore': '深层红石矿石', 'minecraft:deepslate_copper_ore': '深层铜矿石',

    // 砖石建筑类
    'minecraft:bricks': '砖块', 'minecraft:prismarine': '海晶石',
    'minecraft:dark_prismarine': '暗海晶石', 'minecraft:prismarine_bricks': '海晶石砖',
    'minecraft:quartz_block': '石英块', 'minecraft:chiseled_quartz_block': '錾制石英块',
    'minecraft:quartz_pillar': '石英柱', 'minecraft:purpur_block': '紫珀块',
    'minecraft:purpur_pillar': '紫珀柱', 'minecraft:end_stone': '末地石',
    'minecraft:end_stone_bricks': '末地石砖', 'minecraft:sandstone': '砂岩',
    'minecraft:red_sandstone': '红砂岩', 'minecraft:terracotta': '陶瓦',

    // 玻璃类
    'minecraft:glass': '玻璃', 'minecraft:glass_pane': '玻璃板',
    'minecraft:white_stained_glass': '白色染色玻璃', 'minecraft:orange_stained_glass': '橙色染色玻璃',
    'minecraft:magenta_stained_glass': '品红色染色玻璃', 'minecraft:light_blue_stained_glass': '淡蓝色染色玻璃',
    'minecraft:yellow_stained_glass': '黄色染色玻璃', 'minecraft:lime_stained_glass': '黄绿色染色玻璃',
    'minecraft:pink_stained_glass': '粉色染色玻璃', 'minecraft:gray_stained_glass': '灰色染色玻璃',
    'minecraft:light_gray_stained_glass': '淡灰色染色玻璃', 'minecraft:cyan_stained_glass': '青色染色玻璃',
    'minecraft:purple_stained_glass': '紫色染色玻璃', 'minecraft:blue_stained_glass': '蓝色染色玻璃',
    'minecraft:brown_stained_glass': '棕色染色玻璃', 'minecraft:green_stained_glass': '绿色染色玻璃',
    'minecraft:red_stained_glass': '红色染色玻璃', 'minecraft:black_stained_glass': '黑色染色玻璃',

    // 羊毛类
    'minecraft:white_wool': '白色羊毛', 'minecraft:orange_wool': '橙色羊毛',
    'minecraft:magenta_wool': '品红色羊毛', 'minecraft:light_blue_wool': '淡蓝色羊毛',
    'minecraft:yellow_wool': '黄色羊毛', 'minecraft:lime_wool': '黄绿色羊毛',
    'minecraft:pink_wool': '粉色羊毛', 'minecraft:gray_wool': '灰色羊毛',
    'minecraft:light_gray_wool': '淡灰色羊毛', 'minecraft:cyan_wool': '青色羊毛',
    'minecraft:purple_wool': '紫色羊毛', 'minecraft:blue_wool': '蓝色羊毛',
    'minecraft:brown_wool': '棕色羊毛', 'minecraft:green_wool': '绿色羊毛',
    'minecraft:red_wool': '红色羊毛', 'minecraft:black_wool': '黑色羊毛',

    // 混凝土类
    'minecraft:white_concrete': '白色混凝土', 'minecraft:orange_concrete': '橙色混凝土',
    'minecraft:magenta_concrete': '品红色混凝土', 'minecraft:light_blue_concrete': '淡蓝色混凝土',
    'minecraft:yellow_concrete': '黄色混凝土', 'minecraft:lime_concrete': '黄绿色混凝土',
    'minecraft:pink_concrete': '粉色混凝土', 'minecraft:gray_concrete': '灰色混凝土',
    'minecraft:light_gray_concrete': '淡灰色混凝土', 'minecraft:cyan_concrete': '青色混凝土',
    'minecraft:purple_concrete': '紫色混凝土', 'minecraft:blue_concrete': '蓝色混凝土',
    'minecraft:brown_concrete': '棕色混凝土', 'minecraft:green_concrete': '绿色混凝土',
    'minecraft:red_concrete': '红色混凝土', 'minecraft:black_concrete': '黑色混凝土',
    'minecraft:white_concrete_powder': '白色混凝土粉末', 'minecraft:orange_concrete_powder': '橙色混凝土粉末',
    'minecraft:magenta_concrete_powder': '品红色混凝土粉末', 'minecraft:light_blue_concrete_powder': '淡蓝色混凝土粉末',
    'minecraft:yellow_concrete_powder': '黄色混凝土粉末', 'minecraft:lime_concrete_powder': '黄绿色混凝土粉末',
    'minecraft:pink_concrete_powder': '粉色混凝土粉末', 'minecraft:gray_concrete_powder': '灰色混凝土粉末',
    'minecraft:light_gray_concrete_powder': '淡灰色混凝土粉末', 'minecraft:cyan_concrete_powder': '青色混凝土粉末',
    'minecraft:purple_concrete_powder': '紫色混凝土粉末', 'minecraft:blue_concrete_powder': '蓝色混凝土粉末',
    'minecraft:brown_concrete_powder': '棕色混凝土粉末', 'minecraft:green_concrete_powder': '绿色混凝土粉末',
    'minecraft:red_concrete_powder': '红色混凝土粉末', 'minecraft:black_concrete_powder': '黑色混凝土粉末',

    // 陶土类
    'minecraft:white_glazed_terracotta': '白色带釉陶瓦', 'minecraft:orange_glazed_terracotta': '橙色带釉陶瓦',
    'minecraft:magenta_glazed_terracotta': '品红色带釉陶瓦', 'minecraft:yellow_glazed_terracotta': '黄色带釉陶瓦',
    'minecraft:red_glazed_terracotta': '红色带釉陶瓦', 'minecraft:cyan_glazed_terracotta': '青色带釉陶瓦',
    'minecraft:blue_glazed_terracotta': '蓝色带釉陶瓦', 'minecraft:brown_glazed_terracotta': '棕色带釉陶瓦',
    'minecraft:green_glazed_terracotta': '绿色带釉陶瓦', 'minecraft:black_glazed_terracotta': '黑色带釉陶瓦',
    'minecraft:light_blue_glazed_terracotta': '淡蓝色带釉陶瓦', 'minecraft:lime_glazed_terracotta': '黄绿色带釉陶瓦',
    'minecraft:pink_glazed_terracotta': '粉色带釉陶瓦', 'minecraft:gray_glazed_terracotta': '灰色带釉陶瓦',
    'minecraft:light_gray_glazed_terracotta': '淡灰色带釉陶瓦', 'minecraft:purple_glazed_terracotta': '紫色带釉陶瓦',

    // 自然类
    'minecraft:grass_block': '草方块', 'minecraft:dirt': '泥土', 'minecraft:podzol': '灰化土',
    'minecraft:sand': '沙子', 'minecraft:red_sand': '红沙', 'minecraft:gravel': '砂砾',
    'minecraft:clay': '粘土', 'minecraft:snow_block': '雪块', 'minecraft:ice': '冰',
    'minecraft:packed_ice': '浮冰', 'minecraft:blue_ice': '蓝冰', 'minecraft:obsidian': '黑曜石',
    'minecraft:bedrock': '基岩', 'minecraft:water': '水', 'minecraft:lava': '熔岩',
    'minecraft:kelp': '海带', 'minecraft:seagrass': '海草', 'minecraft:coarse_dirt': '砂土',
    'minecraft:rooted_dirt': '缠根泥土', 'minecraft:moss_block': '苔藓块', 'minecraft:mud': '泥巴',
    'minecraft:mud_bricks': '泥砖',

    // 金属类
    'minecraft:iron_block': '铁块', 'minecraft:gold_block': '金块',
    'minecraft:diamond_block': '钻石块', 'minecraft:emerald_block': '绿宝石块',
    'minecraft:lapis_block': '青金石块', 'minecraft:redstone_block': '红石块',
    'minecraft:netherite_block': '下界合金块', 'minecraft:copper_block': '铜块',
    'minecraft:exposed_copper': '斑驳的铜块', 'minecraft:weathered_copper': '锈蚀的铜块',
    'minecraft:oxidized_copper': '氧化的铜块', 'minecraft:waxed_copper': '涂蜡的铜块',
    'minecraft:raw_iron_block': '粗铁块', 'minecraft:raw_gold_block': '粗金块',
    'minecraft:raw_copper_block': '粗铜块',

    // 下界类
    'minecraft:netherrack': '下界岩', 'minecraft:soul_sand': '灵魂沙',
    'minecraft:glowstone': '荧石', 'minecraft:nether_bricks': '下界砖',
    'minecraft:crimson_nylium': '绯红菌岩', 'minecraft:warped_nylium': '诡异菌岩',
    'minecraft:crying_obsidian': '哭泣的黑曜石', 'minecraft:ancient_debris': '远古残骸',
    'minecraft:soul_soil': '灵魂土', 'minecraft:nether_gold_ore': '下界金矿石',
    'minecraft:warped_planks': '诡异木板', 'minecraft:crimson_planks': '绯红木板',

    // 末地类
    'minecraft:shulker_box': '潜影盒', 'minecraft:white_shulker_box': '白色潜影盒',
    'minecraft:orange_shulker_box': '橙色潜影盒', 'minecraft:magenta_shulker_box': '品红色潜影盒',
    'minecraft:light_blue_shulker_box': '淡蓝色潜影盒', 'minecraft:yellow_shulker_box': '黄色潜影盒',
    'minecraft:lime_shulker_box': '黄绿色潜影盒', 'minecraft:pink_shulker_box': '粉色潜影盒',
    'minecraft:gray_shulker_box': '灰色潜影盒', 'minecraft:light_gray_shulker_box': '淡灰色潜影盒',
    'minecraft:cyan_shulker_box': '青色潜影盒', 'minecraft:purple_shulker_box': '紫色潜影盒',
    'minecraft:blue_shulker_box': '蓝色潜影盒', 'minecraft:brown_shulker_box': '棕色潜影盒',
    'minecraft:green_shulker_box': '绿色潜影盒', 'minecraft:red_shulker_box': '红色潜影盒',
    'minecraft:black_shulker_box': '黑色潜影盒',

    // 建筑装饰
    'minecraft:bookshelf': '书架', 'minecraft:crafting_table': '工作台', 'minecraft:furnace': '熔炉',
    'minecraft:chest': '箱子', 'minecraft:ender_chest': '末影箱', 'minecraft:tnt': 'TNT',
    'minecraft:note_block': '音符盒', 'minecraft:pumpkin': '南瓜', 'minecraft:melon': '西瓜',
    'minecraft:hay_block': '干草块', 'minecraft:bone_block': '骨块', 'minecraft:ender_pearl_block': '末影珍珠块',
    'minecraft:ladder': '梯子', 'minecraft:torch': '火把', 'minecraft:wall_torch': '墙壁火把',
    'minecraft:lantern': '灯笼', 'minecraft:soul_lantern': '灵魂灯笼', 'minecraft:jack_o_lantern': '南瓜灯',
    'minecraft:oak_sign': '橡木告示牌', 'minecraft:spruce_sign': '云杉告示牌',
    'minecraft:birch_sign': '白桦告示牌', 'minecraft:jungle_sign': '丛林告示牌',
    'minecraft:acacia_sign': '金合欢告示牌', 'minecraft:dark_oak_sign': '深色橡木告示牌',
    'minecraft:oak_door': '橡木门', 'minecraft:spruce_door': '云杉门',
    'minecraft:birch_door': '白桦门', 'minecraft:jungle_door': '丛林门',
    'minecraft:acacia_door': '金合欢门', 'minecraft:dark_oak_door': '深色橡木门',
    'minecraft:iron_door': '铁门', 'minecraft:iron_trapdoor': '铁活板门',
    'minecraft:oak_trapdoor': '橡木活板门', 'minecraft:spruce_trapdoor': '云杉活板门',
    'minecraft:birch_trapdoor': '白桦活板门', 'minecraft:jungle_trapdoor': '丛林活板门',
    'minecraft:acacia_trapdoor': '金合欢活板门', 'minecraft:dark_oak_trapdoor': '深色橡木活板门',
    'minecraft:oak_stairs': '橡木楼梯', 'minecraft:spruce_stairs': '云杉楼梯',
    'minecraft:birch_stairs': '白桦楼梯', 'minecraft:jungle_stairs': '丛林楼梯',
    'minecraft:acacia_stairs': '金合欢楼梯', 'minecraft:dark_oak_stairs': '深色橡木楼梯',
    'minecraft:brick_stairs': '砖楼梯', 'minecraft:oak_slab': '橡木台阶',
    'minecraft:spruce_slab': '云杉台阶', 'minecraft:birch_slab': '白桦台阶',
    'minecraft:jungle_slab': '丛林台阶', 'minecraft:acacia_slab': '金合欢台阶',
    'minecraft:dark_oak_slab': '深色橡木台阶', 'minecraft:brick_slab': '砖台阶',
    'minecraft:sandstone_slab': '砂岩台阶', 'minecraft:red_sandstone_slab': '红砂岩台阶',
    'minecraft:stone_slab': '石台阶', 'minecraft:cobblestone_slab': '圆石台阶',
    'minecraft:oak_fence': '橡木栅栏', 'minecraft:spruce_fence': '云杉栅栏',
    'minecraft:birch_fence': '白桦栅栏', 'minecraft:jungle_fence': '丛林栅栏',
    'minecraft:acacia_fence': '金合欢栅栏', 'minecraft:dark_oak_fence': '深色橡木栅栏',
    'minecraft:nether_brick_fence': '下界砖栅栏',
    'minecraft:cobblestone_wall': '圆石墙', 'minecraft:stone_brick_wall': '石砖墙',
    'minecraft:andesite_wall': '安山岩墙', 'minecraft:granite_wall': '花岗岩墙',
    'minecraft:diorite_wall': '闪长岩墙', 'minecraft:brick_wall': '砖墙',
    'minecraft:sandstone_wall': '砂岩墙', 'minecraft:red_sandstone_wall': '红砂岩墙',
    'minecraft:mossy_cobblestone_wall': '苔石墙', 'minecraft:prismarine_wall': '海晶石墙',
    'minecraft:iron_bars': '铁栏杆', 'minecraft:chain': '锁链',
    'minecraft:dirt_path': '土径', 'minecraft:farmland': '耕地',
    'minecraft:stone_button': '石按钮', 'minecraft:oak_button': '橡木按钮',
    'minecraft:oak_pressure_plate': '橡木压力板', 'minecraft:stone_pressure_plate': '石压力板',
    'minecraft:redstone_lamp': '红石灯', 'minecraft:redstone_wire': '红石粉',
    'minecraft:repeater': '中继器', 'minecraft:comparator': '比较器',
    'minecraft:observer': '侦测器', 'minecraft:piston': '活塞', 'minecraft:sticky_piston': '粘性活塞',
    'minecraft:dispenser': '发射器', 'minecraft:dropper': '投掷器',
    'minecraft:hopper': '漏斗', 'minecraft:cauldron': '炼药锅',
    'minecraft:brewing_stand': '酿造台', 'minecraft:enchanting_table': '附魔台',
    'minecraft:anvil': '铁砧', 'minecraft:grindstone': '砂轮',
    'minecraft:smoker': '烟熏炉', 'minecraft:blast_furnace': '高炉',
    'minecraft:loom': '织布机', 'minecraft:fletching_table': '制箭台',
    'minecraft:smithing_table': '锻造台', 'minecraft:composter': '堆肥桶',
    'minecraft:barrel': '木桶', 'minecraft:bell': '钟', 'minecraft:lodestone': '磁石',
    'minecraft:respawn_anchor': '重生锚', 'minecraft:target': '标靶',
    'minecraft:sponge': '海绵', 'minecraft:wet_sponge': '湿海绵',
    'minecraft:cake': '蛋糕', 'minecraft:conduit': '潮涌核心',
    'minecraft:sea_lantern': '海晶灯', 'minecraft:beacon': '信标',
    'minecraft:nether_star': '下界之星',

    // 铁轨类
    'minecraft:rail': '铁轨', 'minecraft:powered_rail': '充能铁轨',
    'minecraft:detector_rail': '探测铁轨', 'minecraft:activator_rail': '激活铁轨',
    'minecraft:redstone_torch': '红石火把',

    // 花朵
    'minecraft:rose_bush': '玫瑰丛', 'minecraft:sunflower': '向日葵',
    'minecraft:lilac': '丁香', 'minecraft:dandelion': '蒲公英',
    'minecraft:poppy': '虞美人', 'minecraft:blue_orchid': '兰花',
    'minecraft:allium': '绒球葱', 'minecraft:azure_bluet': '蓝花美耳草',
    'minecraft:red_tulip': '红色郁金香', 'minecraft:orange_tulip': '橙色郁金香',
    'minecraft:white_tulip': '白色郁金香', 'minecraft:pink_tulip': '粉色郁金香',
    'minecraft:oxeye_daisy': '滨菊', 'minecraft:cornflower': '矢车菊',
    'minecraft:lily_of_the_valley': '铃兰', 'minecraft:wither_rose': '凋零玫瑰',

    // 叶子类
    'minecraft:oak_leaves': '橡树树叶', 'minecraft:spruce_leaves': '云杉树叶',
    'minecraft:birch_leaves': '白桦树叶', 'minecraft:jungle_leaves': '丛林树叶',
    'minecraft:acacia_leaves': '金合欢树叶', 'minecraft:dark_oak_leaves': '深色橡木树叶',
    'minecraft:mangrove_leaves': '红树林树叶', 'minecraft:cherry_leaves': '樱花树叶',

    // 蘑菇
    'minecraft:red_mushroom_block': '红色蘑菇块', 'minecraft:brown_mushroom_block': '棕色蘑菇块',
    'minecraft:mushroom_stem': '蘑菇柄',

    // 珊瑚
    'minecraft:tube_coral_block': '管珊瑚块', 'minecraft:brain_coral_block': '脑纹珊瑚块',
    'minecraft:bubble_coral_block': '气泡珊瑚块', 'minecraft:fire_coral_block': '火珊瑚块',
    'minecraft:horn_coral_block': '鹿角珊瑚块',

    // 深板岩类
    'minecraft:deepslate_bricks': '深板岩砖', 'minecraft:cracked_deepslate_bricks': '裂纹深板岩砖',
    'minecraft:deepslate_tiles': '深板岩瓦', 'minecraft:cracked_deepslate_tiles': '裂纹深板岩瓦',
    'minecraft:chiseled_deepslate': '錾制深板岩', 'minecraft:polished_deepslate': '磨制深板岩',
    'minecraft:deepslate_slab': '深板岩台阶', 'minecraft:deepslate_stairs': '深板岩楼梯',
    'minecraft:deepslate_wall': '深板岩墙',

    // 床类
    'minecraft:white_bed': '白色床', 'minecraft:orange_bed': '橙色床',
    'minecraft:magenta_bed': '品红色床', 'minecraft:light_blue_bed': '淡蓝色床',
    'minecraft:yellow_bed': '黄色床', 'minecraft:lime_bed': '黄绿色床',
    'minecraft:pink_bed': '粉色床', 'minecraft:gray_bed': '灰色床',
    'minecraft:light_gray_bed': '淡灰色床', 'minecraft:cyan_bed': '青色床',
    'minecraft:purple_bed': '紫色床', 'minecraft:blue_bed': '蓝色床',
    'minecraft:brown_bed': '棕色床', 'minecraft:green_bed': '绿色床',
    'minecraft:red_bed': '红色床', 'minecraft:black_bed': '黑色床',

    // 地毯类
    'minecraft:white_carpet': '白色地毯', 'minecraft:orange_carpet': '橙色地毯',
    'minecraft:magenta_carpet': '品红色地毯', 'minecraft:light_blue_carpet': '淡蓝色地毯',
    'minecraft:yellow_carpet': '黄色地毯', 'minecraft:lime_carpet': '黄绿色地毯',
    'minecraft:pink_carpet': '粉色地毯', 'minecraft:gray_carpet': '灰色地毯',
    'minecraft:light_gray_carpet': '淡灰色地毯', 'minecraft:cyan_carpet': '青色地毯',
    'minecraft:purple_carpet': '紫色地毯', 'minecraft:blue_carpet': '蓝色地毯',
    'minecraft:brown_carpet': '棕色地毯', 'minecraft:green_carpet': '绿色地毯',
    'minecraft:red_carpet': '红色地毯', 'minecraft:black_carpet': '黑色地毯',

    // 其他
    'minecraft:glow_lichen': '发光地衣', 'minecraft:frosted_ice': '霜冰',
    'minecraft:magma_block': '岩浆块', 'minecraft:nether_wart_block': '下界疣块',
    'minecraft:warped_wart_block': '诡异疣块', 'minecraft:weeping_vines': '垂泪藤',
    'minecraft:twisting_vines': '缠怨藤', 'minecraft:sculk_sensor': '幽匿感测体',
    'minecraft:sculk_shrieker': '幽匿尖啸体', 'minecraft:sculk_catalyst': '幽匿催发体',
    'minecraft:sculk_vein': '幽匿脉络', 'minecraft:reinforced_deepslate': '强化深板岩',
    'minecraft:nether_brick_slab': '下界砖台阶', 'minecraft:nether_brick_stairs': '下界砖楼梯',
    'minecraft:nether_brick_wall': '下界砖墙',
    'minecraft:red_mushroom': '红色蘑菇', 'minecraft:brown_mushroom': '棕色蘑菇',
    'minecraft:cocoa': '可可果', 'minecraft:sugar_cane': '甘蔗',
    'minecraft:bamboo': '竹子', 'minecraft:cactus': '仙人掌',
    'minecraft:dead_bush': '枯萎的灌木', 'minecraft:fern': '蕨',
    'minecraft:large_fern': '大型蕨', 'minecraft:vine': '藤蔓',
    'minecraft:lily_pad': '睡莲', 'minecraft:seagrass': '海草',
    'minecraft:tall_seagrass': '高海草',
    'minecraft:white_banner': '白色旗帜', 'minecraft:orange_banner': '橙色旗帜',
    'minecraft:magenta_banner': '品红色旗帜', 'minecraft:light_blue_banner': '淡蓝色旗帜',
    'minecraft:yellow_banner': '黄色旗帜', 'minecraft:lime_banner': '黄绿色旗帜',
    'minecraft:pink_banner': '粉色旗帜', 'minecraft:gray_banner': '灰色旗帜',
    'minecraft:light_gray_banner': '淡灰色旗帜', 'minecraft:cyan_banner': '青色旗帜',
    'minecraft:purple_banner': '紫色旗帜', 'minecraft:blue_banner': '蓝色旗帜',
    'minecraft:green_banner': '绿色旗帜', 'minecraft:red_banner': '红色旗帜',
    'minecraft:black_banner': '黑色旗帜',
};

/**
 * 获取方块中文名称
 * @param {string} blockId - Minecraft 方块 ID
 * @returns {string} 中文名称
 */
function getBlockNameCN(blockId) {
    if (BLOCK_NAMES_CN[blockId]) return BLOCK_NAMES_CN[blockId];
    // 通用翻译：将常见英文后缀翻译成中文
    const name = blockId.replace('minecraft:', '');
    return translateBlockName(name);
}

/**
 * 通用 Minecraft 方块名翻译器
 * 逐段识别常见后缀并翻译
 */
function translateBlockName(name) {
    // 完整匹配词库
    const words = {
        // 材质
        'stone': '石头', 'cobblestone': '圆石', 'deepslate': '深板岩',
        'granite': '花岗岩', 'diorite': '闪长岩', 'andesite': '安山岩',
        'basalt': '玄武岩', 'blackstone': '黑石', 'calcite': '方解石',
        'tuff': '凝灰岩', 'bedrock': '基岩', 'obsidian': '黑曜石',
        'sand': '沙子', 'red_sand': '红沙', 'gravel': '砂砾',
        'clay': '粘土', 'dirt': '泥土', 'snow': '雪', 'ice': '冰',
        'packed_ice': '浮冰', 'blue_ice': '蓝冰', 'frosted_ice': '霜冰',
        'netherrack': '下界岩', 'end_stone': '末地石', 'prismarine': '海晶石',
        'quartz': '石英', 'purpur': '紫珀', 'sandstone': '砂岩',
        'terracotta': '陶瓦', 'concrete': '混凝土', 'wool': '羊毛',
        'glass': '玻璃', 'glazed': '釉面', 'stained': '染色',
        'concrete_powder': '混凝土粉末',
        // 木头
        'oak': '橡木', 'spruce': '云杉', 'birch': '白桦', 'jungle': '丛林',
        'acacia': '金合欢', 'dark_oak': '深色橡木', 'mangrove': '红树林',
        'cherry': '樱花', 'crimson': '绯红', 'warped': '诡异',
        'bamboo': '竹子', 'pale_oak': '苍白橡木',
        'log': '原木', 'planks': '木板', 'leaves': '树叶',
        'stripped': '去皮', 'sapling': '树苗',
        // 金属
        'iron': '铁', 'gold': '金', 'diamond': '钻石', 'emerald': '绿宝石',
        'lapis': '青金石', 'redstone': '红石', 'copper': '铜',
        'netherite': '下界合金', 'coal': '煤', 'amethyst': '紫水晶',
        'nether_gold': '下界金', 'nether_quartz': '下界石英',
        // 矿物
        'ore': '矿石', 'deepslate': '深层', 'raw': '粗',
        'block': '块', 'bricks': '砖', 'brick': '砖块',
        'tile': '瓦', 'tiles': '瓦',
        'polished': '磨制', 'chiseled': '錾制', 'cracked': '裂纹',
        'mossy': '苔藓', 'smooth': '平滑',
        // 建筑
        'door': '门', 'trapdoor': '活板门', 'fence': '栅栏',
        'gate': '栅栏门', 'wall': '墙', 'stairs': '楼梯',
        'slab': '台阶', 'button': '按钮', 'pressure_plate': '压力板',
        'rail': '铁轨', 'sign': '告示牌',
        // 自然
        'grass_block': '草方块', 'grass': '草', 'mycelium': '菌丝',
        'podzol': '灰化土', 'moss': '苔藓', 'mud': '泥巴',
        'mushroom': '蘑菇', 'fern': '蕨', 'vine': '藤蔓',
        'seagrass': '海草', 'kelp': '海带', 'coral': '珊瑚',
        'sponge': '海绵', 'sugar_cane': '甘蔗', 'cactus': '仙人掌',
        'pumpkin': '南瓜', 'melon': '西瓜', 'cocoa': '可可',
        'hay': '干草', 'bone': '骨头', 'honey': '蜂蜜',
        'lily': '睡莲', 'rose': '玫瑰', 'dandelion': '蒲公英',
        'poppy': '虞美人', 'orchid': '兰花', 'tulip': '郁金香',
        'sunflower': '向日葵', 'daisy': '雏菊', 'cornflower': '矢车菊',
        // 下界
        'soul': '灵魂', 'glowstone': '荧石', 'magma': '岩浆',
        'nylium': '菌岩', 'debris': '残骸', 'crying': '哭泣',
        'shulker': '潜影', 'wither': '凋零',
        // 末地
        'chorus': '紫颂', 'end_rod': '末地烛', 'purpur': '紫珀',
        // 器具
        'crafting_table': '工作台', 'furnace': '熔炉', 'chest': '箱子',
        'anvil': '铁砧', 'enchanting_table': '附魔台', 'brewing_stand': '酿造台',
        'cauldron': '炼药锅', 'hopper': '漏斗', 'dispenser': '发射器',
        'dropper': '投掷器', 'piston': '活塞', 'observer': '侦测器',
        'comparator': '比较器', 'repeater': '中继器', 'torch': '火把',
        'lantern': '灯笼', 'bell': '钟', 'beacon': '信标',
        'barrel': '木桶', 'composter': '堆肥桶', 'loom': '织布机',
        'fletching_table': '制箭台', 'smithing_table': '锻造台',
        'grindstone': '砂轮', 'smoker': '烟熏炉', 'blast_furnace': '高炉',
        'conduit': '潮涌核心', 'sea_lantern': '海晶灯', 'respawn_anchor': '重生锚',
        'target': '标靶', 'chain': '锁链', 'ladder': '梯子',
        'bookshelf': '书架', 'note_block': '音符盒', 'jukebox': '唱片机',
        'cake': '蛋糕', 'tnt': 'TNT',
        // 颜色
        'white': '白色', 'orange': '橙色', 'magenta': '品红色',
        'light_blue': '淡蓝色', 'yellow': '黄色', 'lime': '黄绿色',
        'pink': '粉色', 'gray': '灰色', 'light_gray': '淡灰色',
        'cyan': '青色', 'purple': '紫色', 'blue': '蓝色',
        'brown': '棕色', 'green': '绿色', 'red': '红色',
        'black': '黑色',
    };

    // 尝试完整匹配
    if (words[name]) return words[name];

    // 按下划线拆分并逐词翻译
    const parts = name.split('_');
    let result = '';
    let i = 0;
    while (i < parts.length) {
        // 优先匹配双词组合
        if (i + 1 < parts.length) {
            const two = parts[i] + '_' + parts[i + 1];
            if (words[two]) {
                result += words[two];
                i += 2;
                continue;
            }
        }
        // 单词匹配
        if (words[parts[i]]) {
            result += words[parts[i]];
        } else {
            result += parts[i];
        }
        i++;
        if (i < parts.length) result += '';
    }

    return result;
}
