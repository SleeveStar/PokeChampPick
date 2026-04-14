(function () {
    "use strict";
    const PARTY_SIZE = 6;
    const PARTY_PRESET_COUNT = 3;
    const EV_MAX = 32;
    const EV_TOTAL_MAX = 66;
    const DAMAGE_LEVEL = 50;
    const DAMAGE_RANDOM_MIN = 0.85;
    const DAMAGE_RANDOM_MAX = 1;
    const STAT_KEYS = ["hp", "atk", "def", "spa", "spd", "spe"];
    const STAT_LABELS = { hp: "HP", atk: "공격", def: "방어", spa: "특공", spd: "특방", spe: "스핏" };
    const NATURES = [
        ["", "없음"],
        ["hardy", "노력"], ["lonely", "외로움"], ["brave", "용감"], ["adamant", "고집"], ["naughty", "개구쟁이"],
        ["bold", "대담"], ["docile", "온순"], ["relaxed", "무사태평"], ["impish", "장난꾸러기"], ["lax", "촐랑"],
        ["timid", "겁쟁이"], ["hasty", "성급"], ["serious", "성실"], ["jolly", "명랑"], ["naive", "천진난만"],
        ["modest", "조심"], ["mild", "의젓"], ["quiet", "냉정"], ["bashful", "수줍음"], ["rash", "덜렁"],
        ["calm", "차분"], ["gentle", "얌전"], ["sassy", "건방"], ["careful", "신중"], ["quirky", "변덕"]
    ];
    const NATURE_ENTRIES = NATURES.map(([value, ko]) => ({ value, label: ko }));
    const NATURE_VALUE_MAP = new Map();
    const CORE_ITEM_SPRITES = {
        "검은띠": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/black-belt.png",
        "검은안경": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/black-glasses.png",
        "목탄": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/charcoal.png",
        "용의이빨": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dragon-fang.png",
        "요정의깃털": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/fairy-feather.png",
        "딱딱한돌": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/hard-stone.png",
        "자석": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/magnet.png",
        "금속코트": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/metal-coat.png",
        "기적의씨": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/miracle-seed.png",
        "신비의물방울": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/mystic-water.png",
        "녹지않는얼음": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/never-melt-ice.png",
        "독바늘": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poison-barb.png",
        "예리한부리": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/sharp-beak.png",
        "실크스카프": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/silk-scarf.png",
        "은빛가루": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/silver-powder.png",
        "부드러운모래": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/soft-sand.png",
        "저주의부적": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/spell-tag.png",
        "휘어진스푼": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/twisted-spoon.png",
        "반짝가루": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/bright-powder.png",
        "구애스카프": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/choice-scarf.png",
        "기합의머리띠": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/focus-band.png",
        "기합의띠": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/focus-sash.png",
        "왕의징표석": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/kings-rock.png",
        "먹다남은음식": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/leftovers.png",
        "전기구슬": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/light-ball.png",
        "멘탈허브": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/mental-herb.png",
        "선제공격손톱": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/quick-claw.png",
        "초점렌즈": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/zoom-lens.png",
        "조개껍질방울": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/shell-bell.png",
        "하양허브": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/white-herb.png"
    };
    const MEGA_STONE_SPRITES = {
        "눈설왕나이트": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/abomasite.png",
        "보스로라나이트": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/aggronite.png",
        "독침붕나이트": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/beedrillite.png",
        "한카리아스나이트": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/garchompite.png",
        "갸라도스나이트": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/gyaradosite.png",
        "헤라크로스나이트": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/heracronite.png",
        "썬더볼트나이트": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/manectite.png",
        "강철톤나이트": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/steelixite.png",
        "앱솔나이트": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/absolite.png",
        "프테라나이트": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/aerodactylite.png",
        "후디나이트": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/alakazite.png",
        "파비코리나이트": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/altarianite.png",
        "전룡나이트": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ampharosite.png",
        "다부니나이트": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/audinite.png",
        "다크펫나이트": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/banettite.png",
        "거북왕나이트": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/blastoisinite.png",
        "폭타나이트": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/cameruptite.png",
        "리자몽나이트X": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/charizardite-x.png",
        "리자몽나이트Y": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/charizardite-y.png",
        "엘레이드나이트": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/galladite.png",
        "가디안나이트": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/gardevoirite.png",
        "팬텀나이트": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/gengarite.png",
        "얼음귀신나이트": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/glalitite.png",
        "헬가나이트": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/houndoominite.png",
        "캥카나이트": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/kangaskhanite.png",
        "이어롭나이트": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/lopunnite.png",
        "루카리오나이트": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/lucarionite.png",
        "요가램나이트": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/medichamite.png",
        "피죤투나이트": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/pidgeotite.png",
        "쁘사이저나이트": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/pinsirite.png",
        "깜까미나이트": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/sablenite.png",
        "핫삼나이트": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/scizorite.png",
        "샤크니아나이트": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/sharpedonite.png",
        "야도란나이트": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/slowbronite.png",
        "마기라스나이트": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tyranitarite.png",
        "이상해꽃나이트": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/venusaurite.png"
    };
    const MEGA_STONE_ITEMS = [
        "눈설왕나이트", "보스로라나이트", "독침붕나이트", "한카리아스나이트", "갸라도스나이트", "헤라크로스나이트", "썬더볼트나이트", "강철톤나이트", "앱솔나이트", "프테라나이트",
        "후디나이트", "파비코리나이트", "전룡나이트", "다부니나이트", "다크펫나이트", "거북왕나이트", "폭타나이트", "샹델라나이트", "리자몽나이트X", "리자몽나이트Y",
        "치렁나이트", "픽시나이트", "모단단게나이트", "망나뇽나이트", "할비롱나이트", "염무왕나이트", "몰드류나이트", "장크로다일나이트", "눈여아나이트", "엘레이드나이트",
        "가디안나이트", "팬텀나이트", "얼음귀신나이트", "킬라플로르나이트", "골루그나이트", "루차불나이트", "헬가나이트", "캥카나이트", "이어롭나이트", "루카리오나이트",
        "요가램나이트", "메가니움나이트", "냐오닉스나이트", "피죤투나이트", "쁘사이저나이트", "깜까미나이트", "핫삼나이트", "샤크니아나이트", "무장조나이트", "야도란나이트",
        "아쿠스타나이트", "마기라스나이트", "이상해꽃나이트", "우츠보트나이트", "브리가론나이트", "마폭시나이트", "플라엣테나이트", "개굴닌자나이트"
    ];
    const BERRY_ITEMS = [
        "배리열매", "버치열매", "유루열매", "복슝열매", "시몬열매", "복분열매", "리샘열매", "오랭열매", "자뭉열매", "과사열매",
        "바리비열매", "루미열매", "카리열매", "로플열매", "바코열매", "마코열매", "하반열매", "수불열매", "으름열매", "오카열매",
        "꼬시개열매", "야파열매", "린드열매", "로셀열매", "슈캐열매", "리체열매", "초나열매", "플카열매"
    ];
    const BERRY_SPRITES = {
        "배리열매": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/aspear-berry.png",
        "버치열매": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/cheri-berry.png",
        "유루열매": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/chesto-berry.png",
        "복슝열매": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/pecha-berry.png",
        "시몬열매": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/persim-berry.png",
        "복분열매": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rawst-berry.png",
        "리샘열매": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/lum-berry.png",
        "오랭열매": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/oran-berry.png",
        "자뭉열매": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/sitrus-berry.png",
        "과사열매": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/leppa-berry.png",
        "바리비열매": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/babiri-berry.png",
        "루미열매": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/charti-berry.png",
        "카리열매": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/chilan-berry.png",
        "로플열매": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/chople-berry.png",
        "바코열매": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/coba-berry.png",
        "마코열매": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/colbur-berry.png",
        "하반열매": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/haban-berry.png",
        "수불열매": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/kasib-berry.png",
        "으름열매": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/kebia-berry.png",
        "오카열매": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/occa-berry.png",
        "꼬시개열매": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/passho-berry.png",
        "야파열매": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/payapa-berry.png",
        "린드열매": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rindo-berry.png",
        "로셀열매": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/roseli-berry.png",
        "슈캐열매": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/shuca-berry.png",
        "리체열매": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tanga-berry.png",
        "초나열매": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/wacan-berry.png",
        "플카열매": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/yache-berry.png"
    };
    const ITEM_OPTIONS = Object.keys(CORE_ITEM_SPRITES).concat(MEGA_STONE_ITEMS, BERRY_ITEMS);
    const ITEM_IMAGE_FALLBACK = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'%3E%3Crect width='96' height='96' rx='18' fill='%23f7fbff'/%3E%3Cpath d='M25 33h46l-5 38H30z' fill='%23ffffff' stroke='%23d2dce4' stroke-width='4'/%3E%3Cpath d='M34 33c0-8 6-14 14-14s14 6 14 14' fill='none' stroke='%2398aec0' stroke-width='4' stroke-linecap='round'/%3E%3Cpath d='M38 45h20' stroke='%23ef7588' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E";
    const refs = {};
    const state = {
        partyName: "1파티",
        partyMembers: [],
        partySlots: [],
        currentPartyIndex: 0,
        editingPartyIndex: null,
        opponents: [],
        selectedOpponentName: "",
        currentPage: "party",
        mobileMenuOpen: false,
        partyEditorAbilityEntries: []
    };
    const FALLBACK_IMAGE = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'%3E%3Crect width='96' height='96' rx='18' fill='%23f4f8fb'/%3E%3Ccircle cx='48' cy='48' r='28' fill='%23ffffff' stroke='%23d2dce4' stroke-width='6'/%3E%3Cpath d='M20 48h56' stroke='%23d2dce4' stroke-width='6'/%3E%3Cpath d='M48 20a28 28 0 0 1 28 28H20a28 28 0 0 1 28-28Z' fill='%23ef7588'/%3E%3Ccircle cx='48' cy='48' r='10' fill='%23ffffff' stroke='%23d2dce4' stroke-width='5'/%3E%3C/svg%3E";

    function svgToDataUri(svg) {
        return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
    }
    function createGeneratedItemImage(itemName, kind) {
        const palette = kind === "mega"
            ? { top: "#f7d4de", bottom: "#ef7588", accent: "#a73d5a", glyph: "M" }
            : (kind === "berry"
                ? { top: "#ffe8b8", bottom: "#f1b55a", accent: "#b16e1b", glyph: "B" }
                : { top: "#e0efff", bottom: "#7eb7ef", accent: "#2f6f9c", glyph: "I" });
        const label = String(itemName || "").slice(0, 2);
        return svgToDataUri(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
                <defs>
                    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="${palette.top}"/>
                        <stop offset="100%" stop-color="${palette.bottom}"/>
                    </linearGradient>
                </defs>
                <rect width="96" height="96" rx="18" fill="#ffffff"/>
                <rect x="8" y="8" width="80" height="80" rx="16" fill="url(#g)"/>
                <circle cx="48" cy="34" r="14" fill="rgba(255,255,255,0.5)"/>
                <text x="48" y="40" text-anchor="middle" font-size="18" font-family="sans-serif" font-weight="700" fill="${palette.accent}">${palette.glyph}</text>
                <text x="48" y="70" text-anchor="middle" font-size="15" font-family="sans-serif" font-weight="700" fill="#173042">${label}</text>
            </svg>`
        );
    }
    const ITEM_DATA = Object.fromEntries(ITEM_OPTIONS.map((itemName) => {
        const kind = MEGA_STONE_ITEMS.includes(itemName) ? "mega" : (BERRY_ITEMS.includes(itemName) ? "berry" : "item");
        return [itemName, {
            imageUrl: CORE_ITEM_SPRITES[itemName] || MEGA_STONE_SPRITES[itemName] || BERRY_SPRITES[itemName] || createGeneratedItemImage(itemName, kind)
        }];
    }));
    const TYPE_BOOSTER_ITEMS = {
        normal: "실크스카프",
        fire: "목탄",
        water: "신비의물방울",
        electric: "자석",
        grass: "기적의씨",
        ice: "녹지않는얼음",
        fighting: "검은띠",
        poison: "독바늘",
        ground: "부드러운모래",
        flying: "예리한부리",
        psychic: "휘어진스푼",
        bug: "은빛가루",
        rock: "딱딱한돌",
        ghost: "저주의부적",
        dragon: "용의이빨",
        dark: "검은안경",
        steel: "금속코트",
        fairy: "요정의깃털"
    };
    const RESIST_BERRY_TYPES = {
        로셀열매: "fairy",
        하반열매: "dragon",
        오카열매: "fire",
        플카열매: "ice",
        슈캐열매: "ground",
        린드열매: "grass",
        리체열매: "bug",
        야파열매: "psychic",
        꼬시개열매: "water",
        바코열매: "flying",
        마코열매: "dark",
        바리비열매: "steel",
        초나열매: "electric",
        카리열매: "normal",
        로플열매: "fighting",
        루미열매: "rock",
        으름열매: "poison",
        수불열매: "ghost"
    };
    const DAMAGE_PHYSICAL_MOVE_KEYS = new Set([
        "earthquake", "close-combat", "flare-blitz", "u-turn", "bullet-punch", "extreme-speed",
        "sucker-punch", "aqua-jet", "mach-punch", "shadow-sneak", "ice-shard", "quick-attack",
        "first-impression", "fake-out", "accelerock", "jet-punch", "brave-bird", "iron-head",
        "stone-edge", "rock-slide", "knock-off", "play-rough", "liquidation", "waterfall",
        "dragon-claw", "outrage", "wood-hammer", "power-whip", "poison-jab", "gunk-shot",
        "drain-punch", "body-press", "wave-crash", "bitter-blade", "triple-axel", "double-edge",
        "headlong-rush", "stomping-tantrum", "fire-punch", "ice-punch", "thunder-punch",
        "psychic-fangs", "cross-poison", "x-scissor", "megahorn", "rage-fist", "shadow-claw",
        "aqua-tail", "acrobatics", "superpower", "high-horsepower", "earthquake", "flame-charge",
        "trailblaze", "beak-blast", "avalanche", "crabhammer", "wild-charge", "facade", "return"
    ]);
    const DAMAGE_SPECIAL_MOVE_KEYS = new Set([
        "hydro-pump", "surf", "scald", "moonblast", "shadow-ball", "draco-meteor", "dragon-pulse",
        "thunderbolt", "thunder", "volt-switch", "heat-wave", "fire-blast", "flamethrower",
        "overheat", "blizzard", "ice-beam", "freeze-dry", "air-slash", "hurricane", "dazzling-gleam",
        "psychic", "psyshock", "aura-sphere", "sludge-bomb", "earth-power", "power-gem", "energy-ball",
        "leaf-storm", "giga-drain", "dark-pulse", "water-spout", "flash-cannon", "focus-blast",
        "boomburst", "expanding-force", "armor-cannon", "torch-song", "electro-drift", "make-it-rain",
        "vacuum-wave", "apple-acid", "bleakwind-storm", "meteor-beam", "hyper-voice", "fiery-dance"
    ]);
    const DAMAGE_VERY_HIGH_POWER_MOVE_KEYS = new Set([
        "draco-meteor", "close-combat", "flare-blitz", "hydro-pump", "fire-blast", "leaf-storm",
        "overheat", "blizzard", "gunk-shot", "headlong-rush", "wave-crash", "boomburst",
        "make-it-rain", "electro-drift", "armor-cannon", "chloroblast", "v-create", "blast-burn",
        "hydro-cannon", "frenzy-plant"
    ]);
    const DAMAGE_HIGH_POWER_MOVE_KEYS = new Set([
        "earthquake", "moonblast", "shadow-ball", "thunderbolt", "surf", "heat-wave", "ice-beam",
        "hurricane", "brave-bird", "stone-edge", "power-whip", "play-rough", "liquidation",
        "dragon-claw", "outrage", "knock-off", "drain-punch", "body-press", "sludge-bomb",
        "earth-power", "power-gem", "dark-pulse", "aura-sphere", "waterfall", "wild-charge",
        "rage-fist", "hyper-voice", "psychic", "flare-blitz", "fire-punch", "ice-punch"
    ]);
    const DAMAGE_LOW_POWER_MOVE_KEYS = new Set([
        "u-turn", "volt-switch", "flip-turn", "shadow-sneak", "bullet-punch", "aqua-jet",
        "mach-punch", "quick-attack", "fake-out", "accelerock", "jet-punch", "vacuum-wave",
        "ice-shard", "trailblaze", "flame-charge", "water-shuriken"
    ]);
    const TYPE_ICON_PATHS = {
        normal: "types/Normal%20type.svg",
        fire: "types/Fire%20type.svg",
        water: "types/Water%20type.svg",
        electric: "types/Electric%20type.svg",
        grass: "types/Grass%20type.svg",
        ice: "types/Ice%20type.svg",
        fighting: "types/Fighting%20type.svg",
        poison: "types/Poison%20type.svg",
        ground: "types/Ground%20type.svg",
        flying: "types/Flying%20type.svg",
        psychic: "types/Psychic%20type.svg",
        bug: "types/Bug%20type.svg",
        rock: "types/Rock%20type.svg",
        ghost: "types/Ghost%20type.svg",
        dragon: "types/Dragon%20type.svg",
        dark: "types/Dark%20type.svg",
        steel: "types/Steel%20type.svg",
        fairy: "types/Fairy%20type.svg"
    };

    NATURES.forEach(([value, ko]) => {
        NATURE_VALUE_MAP.set(String(value || "").toLowerCase(), value);
        NATURE_VALUE_MAP.set(String(ko || "").toLowerCase(), value);
    });

    function defaultMember() {
        return {
            name: "", koName: "", form: "", item: "", ability: "", moves: ["", "", "", ""], imageUrl: "", roles: [], nature: "",
            evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
            ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }, level: 50
        };
    }
    function createEmptyParty() { return Array.from({ length: PARTY_SIZE }, defaultMember); }
    function createDefaultPartyBundle(index) {
        return {
            partyName: `${index + 1}파티`,
            members: createEmptyParty()
        };
    }
    function clampNumber(value, min, max, fallback) {
        const n = Number(value); return Number.isNaN(n) ? fallback : Math.max(min, Math.min(max, n));
    }
    function sanitizeNature(value) {
        const normalized = String(value || "").toLowerCase();
        if (!normalized || normalized === "neutral") { return ""; }
        return NATURE_VALUE_MAP.has(normalized) ? NATURE_VALUE_MAP.get(normalized) : "";
    }
    function getNatureLabel(value) {
        const normalized = sanitizeNature(value);
        if (!normalized) {
            return "";
        }
        const matched = NATURE_ENTRIES.find((entry) => entry.value === normalized);
        return matched ? matched.label : "";
    }
    function resolveItemData(value) {
        const normalized = String(value || "").trim();
        if (!normalized) { return null; }
        return ITEM_DATA[normalized] || null;
    }
    function resolveItemValue(value) {
        const normalized = String(value || "").trim().toLowerCase();
        if (!normalized) { return ""; }
        return ITEM_OPTIONS.find((entry) => entry.toLowerCase() === normalized) || "";
    }
    function updateItemPreview(value) {
        const resolvedItem = resolveItemValue(value);
        const itemData = resolveItemData(resolvedItem);
        const imageUrl = itemData ? itemData.imageUrl : ITEM_IMAGE_FALLBACK;
        refs.partyEditorItemImage.src = imageUrl;
        refs.partyEditorItemImage.alt = resolvedItem ? `${resolvedItem} 이미지` : "아이템 이미지";
        refs.partyEditorItem.value = value && resolvedItem ? resolvedItem : (value ? value : "");
    }
    function getMoveInputs() {
        return [refs.move1, refs.move2, refs.move3, refs.move4];
    }
    function getAbilityEntries(pokemon) {
        return getAvailableAbilities(pokemon).map((ability) => ({ value: ability, label: ability }));
    }
    function resolveAbilityValue(pokemon, value) {
        const normalized = String(value || "").trim().toLowerCase();
        if (!normalized) { return ""; }
        return getAvailableAbilities(pokemon).find((ability) => ability.toLowerCase() === normalized) || "";
    }
    function syncMoveInput(input, pokemon) {
        const resolved = pokemon ? window.MoveData.resolveMoveForPokemon(pokemon, input.dataset.selectedMove || input.value) : null;
        if (!resolved) {
            input.dataset.selectedMove = "";
            return;
        }
        input.value = resolved.koName;
        input.dataset.selectedMove = resolved.key;
    }
    function refreshEditorMovePreviews() {
        const pokemon = resolvePartyEditorPokemon();
        getMoveInputs().forEach((input) => { syncMoveInput(input, pokemon); });
    }
    function getSelectedFormKey() {
        return refs.partyEditorFormToggle.dataset.selectedForm || "";
    }
    function setSelectedFormKey(formKey) {
        const nextKey = String(formKey || "");
        refs.partyEditorFormToggle.dataset.selectedForm = nextKey;
        refs.partyEditorFormButtons.forEach((button) => {
            button.classList.toggle("is-active", button.dataset.formKey === nextKey);
        });
    }
    function updateFormToggle(pokemon, preferredFormKey) {
        const basePokemon = pokemon && pokemon.formFamily ? window.PokeData.getFormSpecies(pokemon, "shield") : pokemon;
        const hasForms = Boolean(basePokemon && Array.isArray(basePokemon.forms) && basePokemon.forms.length > 1);
        refs.partyEditorFormToggle.hidden = !hasForms;
        refs.partyEditorFormToggle.style.display = hasForms ? "inline-flex" : "none";
        if (!hasForms) {
            setSelectedFormKey("");
            return;
        }
        const formKey = preferredFormKey || pokemon.formKey || "shield";
        setSelectedFormKey(formKey);
    }
    function getBattleSpecies(pokemon, formKey) {
        if (!pokemon) {
            return null;
        }
        return window.PokeData.getFormSpecies(pokemon, formKey) || pokemon;
    }
    function getMemberBattleSpecies(member) {
        if (!member || !member.name) {
            return null;
        }
        const pokemon = window.PokeData.getPokemonByName(member.name) || window.PokeData.resolvePokemon(member.name);
        return getBattleSpecies(pokemon, member.form);
    }
    function sanitizeMember(member) {
        const next = Object.assign(defaultMember(), member || {});
        const resolvedSpecies = next.name ? window.PokeData.resolvePokemon(next.name) : null;
        next.roles = Array.isArray(next.roles) ? next.roles : [];
        next.nature = sanitizeNature(next.nature);
        next.form = resolvedSpecies && resolvedSpecies.formFamily ? (next.form || resolvedSpecies.formKey || "shield") : "";
        next.name = resolvedSpecies ? (resolvedSpecies.canonicalName || resolvedSpecies.name) : (next.name || "");
        next.koName = resolvedSpecies ? (resolvedSpecies.displayKoName || resolvedSpecies.koName) : (next.koName || "");
        next.ability = next.ability || "";
        next.moves = Array.isArray(next.moves) ? next.moves.slice(0, 4) : ["", "", "", ""];
        while (next.moves.length < 4) { next.moves.push(""); }
        next.imageUrl = next.imageUrl || (getBattleSpecies(resolvedSpecies || (next.name ? window.PokeData.getPokemonByName(next.name) : null), next.form) || {}).imageUrl || "";
        next.evs = Object.assign(defaultMember().evs, next.evs || {});
        next.ivs = Object.assign(defaultMember().ivs, next.ivs || {});
        ["hp", "atk", "def", "spa", "spd", "spe"].forEach((stat) => { next.evs[stat] = clampNumber(next.evs[stat], 0, EV_MAX, 0); });
        next.ivs.spe = clampNumber(next.ivs.spe, 0, 31, 31);
        next.level = 50;
        return next;
    }
    function setStatus(message, tone) {
        if (!refs.status) { return; }
        refs.status.className = `status-banner ${tone || "info"}`;
        refs.status.textContent = message;
    }
    function normalizePartyBundle(bundle, index) {
        const next = bundle || {};
        const partyName = next.partyName || `${index + 1}파티`;
        const members = Array.isArray(next.members) ? next.members.slice(0, PARTY_SIZE).map(sanitizeMember) : [];
        while (members.length < PARTY_SIZE) { members.push(defaultMember()); }
        return { partyName, members };
    }
    function syncCurrentPartyIntoSlot() {
        state.partySlots[state.currentPartyIndex] = normalizePartyBundle({
            partyName: state.partyName,
            members: state.partyMembers
        }, state.currentPartyIndex);
    }
    function renderPartySwitcher() {
        refs.partySwitchButtons.forEach((button) => {
            button.classList.toggle("is-active", Number(button.dataset.partyIndex) === state.currentPartyIndex);
        });
    }
    function applyCurrentParty(index) {
        const normalizedIndex = Math.max(0, Math.min(PARTY_PRESET_COUNT - 1, Number(index) || 0));
        const selected = normalizePartyBundle(state.partySlots[normalizedIndex], normalizedIndex);
        state.currentPartyIndex = normalizedIndex;
        state.partyName = selected.partyName;
        state.partyMembers = selected.members;
        refs.partyName.value = state.partyName;
        renderPartySlots();
        refreshSpeedSelects();
        updatePartyEditorVisibility();
        renderPartySwitcher();
    }
    function persistParties() {
        syncCurrentPartyIntoSlot();
        return window.StorageModule.saveParty({
            activePartyIndex: state.currentPartyIndex,
            parties: state.partySlots.map((party, index) => normalizePartyBundle(party, index))
        });
    }
    function switchParty(index) {
        if (state.currentPartyIndex === Number(index)) { return; }
        syncCurrentPartyIntoSlot();
        closePartyEditor();
        applyCurrentParty(index);
        persistParties();
        setStatus(`${state.currentPartyIndex + 1}파티로 전환했습니다.`, "info");
    }
    function isMobileViewport() { return window.matchMedia("(max-width: 860px)").matches; }
    function updatePageVisibility() {
        document.body.classList.toggle("page-party", state.currentPage === "party");
        refs.pagePanels.forEach((panel) => { panel.hidden = panel.dataset.page !== state.currentPage; });
        refs.pageNavLinks.forEach((button) => button.classList.toggle("is-active", button.dataset.pageTarget === state.currentPage));
        refs.pageNav.classList.toggle("is-open", state.mobileMenuOpen);
        refs.menuToggleBtn.setAttribute("aria-expanded", String(state.mobileMenuOpen));
    }
    function scrollToCurrentPagePanel() {
        const panel = refs.pagePanels.find((entry) => entry.dataset.page === state.currentPage && !entry.hidden);
        if (!panel) { return; }
        window.requestAnimationFrame(() => {
            panel.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    }
    function closeMobileMenu() { state.mobileMenuOpen = false; updatePageVisibility(); }
    function setCurrentPage(pageName) {
        state.currentPage = pageName;
        closeMobileMenu();
        if (isMobileViewport()) {
            scrollToCurrentPagePanel();
        }
    }
    function renderTypeBadges(types) {
        return (types || []).map((type) => `<span class="type-badge" data-type="${type}">${window.TypeModule.toTypeLabel(type)}</span>`).join("");
    }
    function renderMiniChips(labels, limit) {
        const filtered = (labels || []).filter(Boolean);
        const visible = typeof limit === "number" ? filtered.slice(0, limit) : filtered;
        return visible.map((label) => `<span class="mini-chip">${label}</span>`).join("");
    }
    function getPrimaryPlanChip(entry) {
        return entry && entry.primaryPlan && entry.primaryPlan.label ? `주역 ${entry.primaryPlan.label}` : "";
    }
    function renderReasonLines(lines, className) {
        return (lines || [])
            .filter(Boolean)
            .map((line) => `<p class="${className || "recommend-detail"}">${line}</p>`)
            .join("");
    }
    function renderRecommendationFacts(entry) {
        if (!entry) { return ""; }
        const riskyCount = ((entry.riskyOpponents || []).length);
        return renderMiniChips([
            `유리 ${((entry.favorableOpponents || []).length)}`,
            riskyCount > 0 ? `주의 ${riskyCount}` : "",
            getPrimaryPlanChip(entry)
        ], 3);
    }
    function renderStrategyChips(entry) {
        if (!entry) { return ""; }
        const labels = (entry.strategySummary || []).map((item) => item.label).concat(entry.strategyLabels || []).filter(Boolean);
        const uniqueLabels = Array.from(new Set(labels)).slice(0, 2);
        return renderMiniChips(uniqueLabels, 2);
    }
    function renderPlanScores(entry) {
        if (!entry) { return ""; }
        return renderMiniChips([getPrimaryPlanChip(entry)], 1);
    }
    function renderComboHeaderChips(entry) {
        if (!entry) { return ""; }
        const labels = [
            typeof entry.totalScore === "number" ? `평점 ${entry.totalScore.toFixed(1)}` : "",
            entry.styleLabel || "",
            entry.leadAnchor ? `선봉 ${entry.leadAnchor.species.koName}` : "",
            entry.pivotAnchor && (!entry.leadAnchor || entry.pivotAnchor.species.name !== entry.leadAnchor.species.name) ? `운영 ${entry.pivotAnchor.species.koName}` : "",
            entry.cleanupAnchor
                && (!entry.leadAnchor || entry.cleanupAnchor.species.name !== entry.leadAnchor.species.name)
                && (!entry.pivotAnchor || entry.cleanupAnchor.species.name !== entry.pivotAnchor.species.name)
                ? `마무리 ${entry.cleanupAnchor.species.koName}`
                : ""
        ];
        return renderMiniChips(labels, 3);
    }
    function renderRecommendationTargets(entry) {
        if (!entry) { return ""; }
        const favorable = (entry.favorableOpponents || []).slice(0, 2).map((opponent) => opponent.koName).join(", ");
        const risky = (entry.riskyOpponents || []).slice(0, 2).map((opponent) => opponent.koName).join(", ");
        const lines = [];

        if (favorable) {
            lines.push(`<p class="recommend-reason">유리 상대: <strong>${favorable}</strong></p>`);
        }
        if (risky) {
            lines.push(`<p class="recommend-reason">주의 상대: <strong>${risky}</strong></p>`);
        }
        return lines.join("");
    }
    function renderBattlePlan(plan) {
        if (!plan) {
            refs.planSummary.className = "plan-summary empty-card";
            refs.planSummary.textContent = "추천 운영 플랜이 여기 표시됩니다.";
            return;
        }

        refs.planSummary.className = "plan-summary";
        refs.planSummary.innerHTML = [
            `<div class="plan-card"><strong>기본 플랜</strong><div class="type-row">${renderMiniChips([`선봉 ${plan.opener}`, `운영 ${plan.pivot}`, `마무리 ${plan.cleanup}`], 3)}</div>${plan.strategySummary && plan.strategySummary.length > 0 ? `<div class="type-row">${renderMiniChips(plan.strategySummary.map((item) => item.label).slice(0, 2), 2)}</div>` : ""}${(plan.lines || []).map((line) => `<p class="recommend-reason">${line}</p>`).join("")}</div>`,
            ...(plan.coreResponses || []).map((entry) => {
                return `<div class="plan-card"><strong>${entry.coreNames} 코어 대응</strong><div class="type-row">${renderMiniChips([entry.styleLabel || "", entry.responseLead ? `선봉 ${entry.responseLead}` : "", entry.responseCleanup ? `마무리 ${entry.responseCleanup}` : ""], 3)}</div>${entry.evidenceChips && entry.evidenceChips.length > 0 ? `<div class="type-row">${renderMiniChips(entry.evidenceChips, 2)}</div>` : ""}${entry.reason ? `<p class="recommend-reason">${entry.reason}</p>` : ""}${renderReasonLines(entry.reasonDetails)}<p class="recommend-reason">추천 3마리: <strong>${(entry.responseCombo || []).join(", ")}</strong></p>${entry.responsePivot ? `<p class="recommend-reason">운영 중심축: <strong>${entry.responsePivot}</strong></p>` : ""}${entry.responseReason ? `<p class="recommend-reason">${entry.responseReason}</p>` : ""}${renderReasonLines(entry.responseReasonDetails)}</div>`;
            }),
            ...(plan.leadResponses || []).map((entry) => {
                const primary = entry.primary ? (entry.primary.moveName ? `${entry.primary.name}(${entry.primary.moveName})` : entry.primary.name) : "";
                const backup = entry.backup ? (entry.backup.moveName ? `${entry.backup.name}(${entry.backup.moveName})` : entry.backup.name) : "";
                return `<div class="plan-card"><strong>${entry.opponentName} 예상 선봉</strong><div class="type-row">${renderMiniChips([entry.opponentLabel || ""], 1)}</div>${entry.evidenceChips && entry.evidenceChips.length > 0 ? `<div class="type-row">${renderMiniChips(entry.evidenceChips, 2)}</div>` : ""}${entry.reason ? `<p class="recommend-reason">${entry.reason}</p>` : ""}${renderReasonLines(entry.reasonDetails)}${primary ? `<p class="recommend-reason">권장 선봉: <strong>${primary}</strong></p>` : ""}${entry.primary && entry.primary.reason ? `<p class="recommend-reason">${entry.primary.reason}</p>` : ""}${renderReasonLines(entry.primary && entry.primary.reasonDetails)}${backup ? `<p class="recommend-reason">백업 운영축: <strong>${backup}</strong></p>` : ""}${entry.backup && entry.backup.reason ? `<p class="recommend-reason">${entry.backup.reason}</p>` : ""}${renderReasonLines(entry.backup && entry.backup.reasonDetails)}</div>`;
            }),
            ...(plan.threatResponses || []).map((entry) => {
                const answers = (entry.answers || []).map((answer) => answer.moveName ? `${answer.name}(${answer.moveName})` : answer.name).join(", ");
                const safeAnswers = (entry.safeAnswers || []).map((answer) => answer.moveName ? `${answer.name}(${answer.moveName})` : answer.name).join(", ");
                return `<div class="plan-card"><strong>${entry.threat.koName} 대응</strong>${entry.threat.evidenceChips && entry.threat.evidenceChips.length > 0 ? `<div class="type-row">${renderMiniChips(entry.threat.evidenceChips, 2)}</div>` : ""}<p class="recommend-reason">${entry.threat.message}</p>${renderReasonLines(entry.threat.detailLines)}${answers ? `<p class="recommend-reason">우선 답: <strong>${answers}</strong></p>` : ""}${safeAnswers ? `<p class="recommend-reason">안정 교체: <strong>${safeAnswers}</strong></p>` : ""}</div>`;
            })
        ].join("");
    }
    function renderItemImage(itemName, className) {
        const itemData = resolveItemData(itemName);
        const imageUrl = itemData ? itemData.imageUrl : ITEM_IMAGE_FALLBACK;
        const alt = itemName ? `${itemName} 이미지` : "아이템 이미지";
        return `<img class="${className}" src="${imageUrl}" alt="${alt}" loading="lazy" onerror="this.onerror=null;this.src='${ITEM_IMAGE_FALLBACK}'">`;
    }
    function renderPokemonImage(species, className) {
        const imageUrl = species ? (window.PokeData.getPokemonImageUrl(species) || species.imageUrl || FALLBACK_IMAGE) : FALLBACK_IMAGE;
        const fallbackUrl = species ? (window.PokeData.getHomeImageUrl(species) || species.imageUrl || FALLBACK_IMAGE) : FALLBACK_IMAGE;
        const alt = species ? species.koName : "포켓몬";
        return `<img class="${className}" src="${imageUrl}" data-fallback-src="${fallbackUrl}" alt="${alt}" loading="lazy" onerror="if(!this.dataset.fallbackApplied&&this.dataset.fallbackSrc&&this.src!==this.dataset.fallbackSrc){this.dataset.fallbackApplied='1';this.src=this.dataset.fallbackSrc;return;}this.onerror=null;this.src='${FALLBACK_IMAGE}'">`;
    }
    function renderMoveLine(moveName, pokemon) {
        if (!moveName) {
            return `<div class="slot-move-line"><span class="slot-move-text">-</span></div>`;
        }
        const move = pokemon ? window.MoveData.resolveMoveForPokemon(pokemon, moveName) : null;
        const type = move && move.type ? String(move.type).toLowerCase() : "";
        const iconPath = TYPE_ICON_PATHS[type] || "";
        const icon = iconPath ? `<img class="slot-move-type-icon" src="${iconPath}" alt="${window.TypeModule.toTypeLabel(type)} 타입" loading="lazy">` : "";
        return `<div class="slot-move-line">${icon}<span class="slot-move-text">${moveName}</span></div>`;
    }
    function getAvailableAbilities(pokemon) {
        return pokemon && Array.isArray(pokemon.abilities) ? pokemon.abilities : [];
    }
    function updatePartyEditorAbilityOptions(pokemon, selectedAbility) {
        state.partyEditorAbilityEntries = getAbilityEntries(pokemon);
        const resolvedAbility = resolveAbilityValue(pokemon, typeof selectedAbility === "string" ? selectedAbility : refs.partyEditorAbility.value);
        refs.partyEditorAbility.dataset.selectedValue = resolvedAbility;
        refs.partyEditorAbility.value = resolvedAbility;
    }
    function renderMemberPreview(species) {
        return `<div class="member-preview-main"><div>${renderPokemonImage(species, "pokemon-image preview-pokemon-image")}</div><div><div class="member-title"><strong>${species.displayKoName || species.koName}</strong></div><div class="type-row">${renderTypeBadges(species.types)}</div></div></div>`;
    }
    function getEditorStatInputs() {
        return {
            hp: refs.statHp,
            atk: refs.statAtk,
            def: refs.statDef,
            spa: refs.statSpa,
            spd: refs.statSpd,
            spe: refs.statSpe
        };
    }
    function getEditorStatValues() {
        const inputs = getEditorStatInputs();
        const values = {};
        STAT_KEYS.forEach((stat) => { values[stat] = clampNumber(inputs[stat].value, 0, EV_MAX, 0); });
        return values;
    }
    function getEditorTotalPoints(nextValues) {
        const values = nextValues || getEditorStatValues();
        return STAT_KEYS.reduce((sum, stat) => sum + values[stat], 0);
    }
    function updateStatTotalPoints(totalPoints) {
        refs.statTotalPoints.textContent = `${totalPoints} / ${EV_TOTAL_MAX}`;
        refs.statTotalPoints.classList.toggle("is-complete", totalPoints >= EV_TOTAL_MAX);
    }
    function applyEditorStatValues(values) {
        const inputs = getEditorStatInputs();
        STAT_KEYS.forEach((stat) => { inputs[stat].value = values[stat]; });
        refreshEditorStatSummary();
    }
    function getStatUpperBound(values, statKey) {
        const current = Number(values[statKey]) || 0;
        const withoutCurrent = getEditorTotalPoints(values) - current;
        return Math.max(0, Math.min(EV_MAX, EV_TOTAL_MAX - withoutCurrent));
    }
    function syncStatEdgeButtons(nextValues) {
        const values = nextValues || getEditorStatValues();
        STAT_KEYS.forEach((stat) => {
            const minButton = refs.statEditor.querySelector(`[data-stat-action="min"][data-stat-target="${stat}"]`);
            const maxButton = refs.statEditor.querySelector(`[data-stat-action="max"][data-stat-target="${stat}"]`);
            if (!minButton || !maxButton) { return; }
            const upperBound = getStatUpperBound(values, stat);
            minButton.classList.toggle("is-last-edge", Number(values[stat]) <= 0);
            maxButton.classList.toggle("is-last-edge", upperBound > 0 && Number(values[stat]) >= upperBound);
        });
    }
    function setStatValueWithCap(statKey, desiredValue) {
        const values = getEditorStatValues();
        const current = values[statKey];
        const raw = clampNumber(desiredValue, 0, EV_MAX, current);
        values[statKey] = Math.max(0, Math.min(raw, getStatUpperBound(values, statKey)));
        applyEditorStatValues(values);
    }
    function renderActualStats(pokemon, evs, nature) {
        if (!pokemon) {
            STAT_KEYS.forEach((stat) => {
                refs[`actual${stat.toUpperCase()}`].textContent = "-";
                refs[`actual${stat.toUpperCase()}`].className = "stat-actual";
                const labelNode = document.querySelector(`[data-stat-label="${stat}"]`);
                if (labelNode) {
                    labelNode.className = "stat-name";
                }
            });
            return;
        }
        const effect = window.SpeedModule.NATURE_EFFECTS[nature] || { up: "", down: "" };
        const stats = window.SpeedModule.calculateLevel50Stats(pokemon.baseStats, {
            nature,
            level: 50,
            evs,
            ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
        });
        STAT_KEYS.forEach((stat) => {
            const node = refs[`actual${stat.toUpperCase()}`];
            const labelNode = document.querySelector(`[data-stat-label="${stat}"]`);
            node.textContent = stats[stat];
            node.className = "stat-actual";
            if (labelNode) {
                labelNode.className = "stat-name";
            }
            if (effect.up === stat) { node.classList.add("up"); }
            if (effect.down === stat) { node.classList.add("down"); }
            if (labelNode && effect.up === stat) { labelNode.classList.add("up"); }
            if (labelNode && effect.down === stat) { labelNode.classList.add("down"); }
        });
    }
    function refreshEditorStatSummary() {
        const evs = getEditorStatValues();
        updateStatTotalPoints(getEditorTotalPoints(evs));
        syncStatEdgeButtons(evs);
        const pokemon = resolvePartyEditorPokemon();
        const battleSpecies = getBattleSpecies(pokemon, getSelectedFormKey());
        updatePartyEditorAbilityOptions(pokemon);
        const nature = sanitizeNature(refs.partyEditorNature.dataset.selectedValue || refs.partyEditorNature.value);
        renderActualStats(battleSpecies, evs, nature);
        setPartyEditorPreview(battleSpecies);
        refreshEditorMovePreviews();
    }
    function updatePartyEditorVisibility() {
        const editing = state.editingPartyIndex !== null;
        refs.partyOverview.hidden = editing;
        refs.partyEditor.hidden = !editing;
    }
    function renderPartySlots() {
        refs.partySlotGrid.innerHTML = state.partyMembers.map((member, index) => {
            const species = getMemberBattleSpecies(member);
            const active = state.editingPartyIndex === index ? "is-active" : "";
            if (!species) {
                return `<button class="party-slot empty ${active}" type="button" data-party-slot-index="${index}"><div class="slot-plus">+</div></button>`;
            }
            const stats = window.SpeedModule.calculateLevel50Stats(species.baseStats, {
                nature: sanitizeNature(member.nature),
                level: 50,
                evs: member.evs || {},
                ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
            });
            const natureEffect = window.SpeedModule.NATURE_EFFECTS[sanitizeNature(member.nature)] || { up: "", down: "" };
            const moves = (member.moves || []).slice(0, 4);
            while (moves.length < 4) { moves.push(""); }
            const statRows = [
                ["hp", "HP", stats.hp],
                ["atk", "공격", stats.atk],
                ["def", "방어", stats.def],
                ["spa", "특공", stats.spa],
                ["spd", "특방", stats.spd],
                ["spe", "스핏", stats.spe]
            ];
            return `<button class="party-slot filled ${active}" type="button" data-party-slot-index="${index}">
                <div class="slot-header">
                    <div class="slot-name-row">
                        <strong class="slot-name">${species.displayKoName || species.koName}</strong>
                        <div class="type-row slot-type-row">${renderTypeBadges(species.types)}</div>
                    </div>
                </div>
                <div class="slot-body">
                    <div class="slot-moves">
                        <div class="slot-move-list">
                            ${moves.map((move) => renderMoveLine(move, species)).join("")}
                        </div>
                        <div class="slot-item-corner">
                            <div class="slot-corner-meta">
                                <div class="slot-corner-text slot-corner-text-nature"><span>성격</span><div class="slot-corner-inline"><strong>${getNatureLabel(member.nature) || "-"}</strong>${renderItemImage(member.item, "item-image slot-item-image")}</div></div>
                                <div class="slot-corner-text"><span>아이템</span><strong>${member.item || "-"}</strong></div>
                            </div>
                        </div>
                    </div>
                    <div class="slot-art">
                        ${renderPokemonImage(species, "pokemon-image slot-pokemon-image")}
                    </div>
                    <div class="slot-stats">
                        ${statRows.map(([key, label, value]) => {
                            const toneClass = natureEffect.up === key ? "up" : (natureEffect.down === key ? "down" : "");
                            return `<div class="slot-stat-line ${toneClass}"><span>${label}</span><strong>${value}</strong></div>`;
                        }).join("")}
                    </div>
                </div>
            </button>`;
        }).join("");
    }
    function initializeNatureInput() {
        refs.partyEditorNature.value = "";
        refs.partyEditorNature.dataset.selectedValue = "";
    }
    function setPartyEditorPreview(pokemon) {
        if (!pokemon) {
            refs.partyEditorPreview.className = "member-preview empty";
            refs.partyEditorPreview.removeAttribute("data-preview-type");
            refs.partyEditorPreview.textContent = "선택된 포켓몬 정보가 여기 표시됩니다.";
            return;
        }
        refs.partyEditorPreview.className = "member-preview";
        refs.partyEditorPreview.dataset.previewType = pokemon.types && pokemon.types[0] ? pokemon.types[0] : "";
        refs.partyEditorPreview.innerHTML = renderMemberPreview(pokemon);
    }
    function fillPartyEditor(member, index) {
        const species = member.name ? (window.PokeData.getPokemonByName(member.name) || window.PokeData.resolvePokemon(member.name)) : null;
        refs.partyEditorTitle.textContent = `#${index + 1}`;
        refs.partyEditorName.value = species ? (species.displayKoName || species.koName) : (member.koName || member.name || "");
        refs.partyEditorName.dataset.selectedName = species ? (species.canonicalName || species.name) : "";
        refs.partyEditorItem.value = member.item || "";
        updateItemPreview(member.item || "");
        refs.partyEditorNature.value = getNatureLabel(member.nature);
        refs.partyEditorNature.dataset.selectedValue = sanitizeNature(member.nature);
        updateFormToggle(species, member.form || (species ? species.formKey : "") || "");
        updatePartyEditorAbilityOptions(species, member.ability || "");
        refs.move1.value = member.moves[0] || "";
        refs.move2.value = member.moves[1] || "";
        refs.move3.value = member.moves[2] || "";
        refs.move4.value = member.moves[3] || "";
        getMoveInputs().forEach((input) => { input.dataset.selectedMove = ""; });
        refs.statHp.value = member.evs.hp || 0;
        refs.statAtk.value = member.evs.atk || 0;
        refs.statDef.value = member.evs.def || 0;
        refs.statSpa.value = member.evs.spa || 0;
        refs.statSpd.value = member.evs.spd || 0;
        refs.statSpe.value = member.evs.spe || 0;
        setPartyEditorPreview(getBattleSpecies(species, getSelectedFormKey()));
        refreshEditorStatSummary();
    }
    function openPartyEditor(index) {
        state.editingPartyIndex = index;
        fillPartyEditor(state.partyMembers[index], index);
        updatePartyEditorVisibility();
    }
    function closePartyEditor() {
        state.editingPartyIndex = null;
        refs.partyEditorName.value = "";
        refs.partyEditorName.dataset.selectedName = "";
        refs.partyEditorItem.value = "";
        updateItemPreview("");
        refs.partyEditorNature.value = "";
        refs.partyEditorNature.dataset.selectedValue = "";
        updateFormToggle(null, "");
        updatePartyEditorAbilityOptions(null, "");
        refs.move1.value = "";
        refs.move2.value = "";
        refs.move3.value = "";
        refs.move4.value = "";
        getMoveInputs().forEach((input) => { input.dataset.selectedMove = ""; });
        [refs.statHp, refs.statAtk, refs.statDef, refs.statSpa, refs.statSpd, refs.statSpe].forEach((input) => { input.value = 0; });
        setPartyEditorPreview(null);
        updateStatTotalPoints(0);
        renderActualStats(null, {}, "");
        updatePartyEditorVisibility();
        renderPartySlots();
    }
    function resolvePartyEditorPokemon() {
        const selected = refs.partyEditorName.dataset.selectedName ? window.PokeData.getPokemonByName(refs.partyEditorName.dataset.selectedName) : null;
        const resolved = selected || window.PokeData.resolvePokemon(refs.partyEditorName.value);
        if (!resolved) { refs.partyEditorName.dataset.selectedName = ""; return null; }
        const canonical = window.PokeData.getPokemonByName(resolved.canonicalName || resolved.name) || resolved;
        refs.partyEditorName.value = canonical.displayKoName || canonical.koName;
        refs.partyEditorName.dataset.selectedName = canonical.name;
        updateFormToggle(canonical, resolved.formKey || getSelectedFormKey() || canonical.formKey || "");
        return canonical;
    }
    function buildEditorMemberDraft() {
        const pokemon = resolvePartyEditorPokemon();
        const formKey = getSelectedFormKey();
        const battleSpecies = getBattleSpecies(pokemon, formKey);
        const base = sanitizeMember(state.editingPartyIndex !== null ? state.partyMembers[state.editingPartyIndex] : defaultMember());
        const evs = getEditorStatValues();
        base.name = pokemon ? pokemon.name : "";
        base.koName = pokemon ? (pokemon.displayKoName || pokemon.koName) : "";
        base.form = pokemon && pokemon.forms ? formKey : "";
        base.imageUrl = battleSpecies ? battleSpecies.imageUrl : "";
        base.item = resolveItemValue(refs.partyEditorItem.value);
        base.ability = resolveAbilityValue(pokemon, refs.partyEditorAbility.dataset.selectedValue || refs.partyEditorAbility.value);
        base.moves = getMoveInputs().map((input) => {
            const move = pokemon ? window.MoveData.resolveMoveForPokemon(pokemon, input.dataset.selectedMove || input.value) : null;
            return move ? move.koName : input.value.trim();
        });
        base.nature = sanitizeNature(refs.partyEditorNature.dataset.selectedValue || refs.partyEditorNature.value);
        base.evs.hp = evs.hp;
        base.evs.atk = evs.atk;
        base.evs.def = evs.def;
        base.evs.spa = evs.spa;
        base.evs.spd = evs.spd;
        base.evs.spe = evs.spe;
        return base;
    }
    function savePartySlot() {
        if (state.editingPartyIndex === null) { return; }
        const member = buildEditorMemberDraft();
        if (!getMemberBattleSpecies(member)) {
            setStatus("포켓몬 이름을 먼저 정확히 입력해 주세요.", "error");
            return;
        }
        state.partyMembers[state.editingPartyIndex] = member;
        syncCurrentPartyIntoSlot();
        const saved = persistParties();
        if (!saved.ok) {
            setStatus(`슬롯 저장 중 오류가 발생했습니다: ${saved.error}`, "error");
            return;
        }
        refreshSpeedSelects();
        closePartyEditor();
        setStatus("슬롯 정보를 저장했고 현재 파티도 바로 저장했습니다.", "success");
    }
    function saveParty() {
        const validCount = state.partyMembers.filter((member) => getMemberBattleSpecies(member)).length;
        if (validCount === 0) { setStatus("저장할 포켓몬이 없습니다. 슬롯을 하나 이상 채워 주세요.", "error"); return; }
        state.partyName = refs.partyName.value.trim() || `${state.currentPartyIndex + 1}파티`;
        refs.partyName.value = state.partyName;
        const saved = persistParties();
        if (!saved.ok) { setStatus(`파티 저장에 실패했습니다: ${saved.error}`, "error"); return; }
        setStatus("현재 파티를 브라우저에 저장했습니다.", "success");
    }
    function loadSavedParty() {
        const loaded = window.StorageModule.loadParty();
        if (!loaded.ok) {
            state.partySlots = Array.from({ length: PARTY_PRESET_COUNT }, (_, index) => createDefaultPartyBundle(index));
            applyCurrentParty(0);
            setStatus("저장된 파티를 읽는 중 오류가 발생했습니다. 새 파티 상태로 시작합니다.", "error");
            return;
        }
        const payload = loaded.value || window.StorageModule.createDefaultPayload();
        state.partySlots = Array.from({ length: PARTY_PRESET_COUNT }, (_, index) => normalizePartyBundle(payload.parties[index], index));
        applyCurrentParty(payload.activePartyIndex || 0);
        persistParties();
        setStatus("저장된 파티를 불러왔습니다. 슬롯을 눌러 수정할 수 있습니다.", "success");
    }
    function resetParty() {
        state.partySlots[state.currentPartyIndex] = createDefaultPartyBundle(state.currentPartyIndex);
        applyCurrentParty(state.currentPartyIndex);
        closePartyEditor();
        refreshSpeedSelects();
        const saved = persistParties();
        if (!saved.ok) { setStatus(`저장 데이터 갱신 중 오류가 발생했습니다: ${saved.error}`, "error"); return; }
        setStatus(`${state.currentPartyIndex + 1}파티를 초기화했습니다.`, "info");
    }
    function getValidPartyMembers() { return state.partyMembers.filter((member) => getMemberBattleSpecies(member)); }
    function attachPokemonAutocomplete(input, options) {
        const wrapper = input.closest(".autocomplete-shell");
        let dropdown = wrapper.querySelector(".autocomplete-list");
        let activeIndex = -1;
        let currentResults = [];
        if (!dropdown) {
            dropdown = document.createElement("div");
            dropdown.className = "autocomplete-list";
            dropdown.hidden = true;
            wrapper.appendChild(dropdown);
        }
        function close() { dropdown.hidden = true; dropdown.innerHTML = ""; activeIndex = -1; currentResults = []; }
        function renderResults(results) {
            currentResults = results;
            if (results.length === 0) { close(); return; }
            dropdown.hidden = false;
            dropdown.innerHTML = results.map((pokemon, index) => `<button class="autocomplete-item ${index === activeIndex ? "active" : ""}" type="button" data-index="${index}"><span class="autocomplete-name">${pokemon.koName}</span><span class="autocomplete-meta">${window.TypeModule.toTypeLabels(pokemon.types).join(" / ")}</span></button>`).join("");
            dropdown.querySelectorAll(".autocomplete-item").forEach((button) => button.addEventListener("mousedown", (event) => {
                event.preventDefault();
                const picked = currentResults[Number(button.dataset.index)];
                if (!picked) { return; }
                options.onSelect(picked);
                close();
            }));
        }
        input.addEventListener("input", () => { input.dataset.selectedName = ""; activeIndex = -1; renderResults(window.PokeData.searchPokemon(input.value, 7)); });
        input.addEventListener("focus", () => { if (input.value.trim()) { renderResults(window.PokeData.searchPokemon(input.value, 7)); } });
        input.addEventListener("keydown", (event) => {
            if (dropdown.hidden) { return; }
            if (event.key === "ArrowDown") { event.preventDefault(); activeIndex = Math.min(activeIndex + 1, currentResults.length - 1); renderResults(currentResults); return; }
            if (event.key === "ArrowUp") { event.preventDefault(); activeIndex = Math.max(activeIndex - 1, 0); renderResults(currentResults); return; }
            if (event.key === "Enter" && activeIndex >= 0 && currentResults[activeIndex]) { event.preventDefault(); options.onSelect(currentResults[activeIndex]); close(); return; }
            if (event.key === "Escape") { close(); }
        });
        input.addEventListener("blur", () => { window.setTimeout(close, 120); });
    }
    function attachOptionAutocomplete(input, options) {
        const wrapper = input.closest(".autocomplete-shell");
        let dropdown = wrapper.querySelector(".autocomplete-list");
        let activeIndex = -1;
        let currentResults = [];
        if (!dropdown) {
            dropdown = document.createElement("div");
            dropdown.className = "autocomplete-list";
            dropdown.hidden = true;
            wrapper.appendChild(dropdown);
        }
        function close() { dropdown.hidden = true; dropdown.innerHTML = ""; activeIndex = -1; currentResults = []; }
        function getEntries() {
            return typeof options.getEntries === "function" ? options.getEntries() : [];
        }
        function filterEntries(query) {
            const normalized = String(query || "").trim().toLowerCase();
            const entries = getEntries();
            const matches = normalized ? entries.filter((entry) => {
                const haystacks = [entry.label, entry.value, entry.meta].filter(Boolean).map((text) => String(text).toLowerCase());
                return haystacks.some((text) => text.includes(normalized));
            }) : entries;
            return typeof options.limit === "number" ? matches.slice(0, options.limit) : matches;
        }
        function renderResults(results) {
            currentResults = results;
            if (results.length === 0) { close(); return; }
            dropdown.hidden = false;
            dropdown.innerHTML = results.map((entry, index) => `<button class="autocomplete-item ${index === activeIndex ? "active" : ""}" type="button" data-index="${index}"><span class="autocomplete-name">${entry.label}</span>${entry.meta ? `<span class="autocomplete-meta">${entry.meta}</span>` : ""}</button>`).join("");
            dropdown.querySelectorAll(".autocomplete-item").forEach((button) => button.addEventListener("mousedown", (event) => {
                event.preventDefault();
                const picked = currentResults[Number(button.dataset.index)];
                if (!picked) { return; }
                if (typeof options.onSelect === "function") { options.onSelect(picked); }
                close();
            }));
        }
        input.addEventListener("input", () => {
            input.dataset.selectedValue = "";
            if (typeof options.onInputChange === "function") { options.onInputChange(); }
            renderResults(filterEntries(input.value));
        });
        input.addEventListener("focus", () => {
            renderResults(options.showAllOnFocus ? filterEntries("") : filterEntries(input.value));
        });
        input.addEventListener("keydown", (event) => {
            if (dropdown.hidden) { return; }
            if (event.key === "ArrowDown") { event.preventDefault(); activeIndex = Math.min(activeIndex + 1, currentResults.length - 1); renderResults(currentResults); return; }
            if (event.key === "ArrowUp") { event.preventDefault(); activeIndex = Math.max(activeIndex - 1, 0); renderResults(currentResults); return; }
            if (event.key === "Enter" && activeIndex >= 0 && currentResults[activeIndex]) {
                event.preventDefault();
                if (typeof options.onSelect === "function") { options.onSelect(currentResults[activeIndex]); }
                close();
                return;
            }
            if (event.key === "Escape") { close(); }
        });
        input.addEventListener("blur", () => {
            window.setTimeout(() => {
                close();
                if (typeof options.onCommit === "function") { options.onCommit(); }
            }, 120);
        });
    }
    function attachTextAutocomplete(input, entries, options) {
        const wrapper = input.closest(".autocomplete-shell");
        let dropdown = wrapper.querySelector(".autocomplete-list");
        let activeIndex = -1;
        let currentResults = [];
        const config = options || {};
        if (!dropdown) {
            dropdown = document.createElement("div");
            dropdown.className = "autocomplete-list";
            dropdown.hidden = true;
            wrapper.appendChild(dropdown);
        }
        function close() { dropdown.hidden = true; dropdown.innerHTML = ""; activeIndex = -1; currentResults = []; }
        function renderResults(results) {
            currentResults = results;
            if (results.length === 0) { close(); return; }
            dropdown.hidden = false;
            dropdown.innerHTML = results.map((entry, index) => `<button class="autocomplete-item ${index === activeIndex ? "active" : ""}" type="button" data-index="${index}"><span class="autocomplete-name">${entry}</span></button>`).join("");
            dropdown.querySelectorAll(".autocomplete-item").forEach((button) => button.addEventListener("mousedown", (event) => {
                event.preventDefault();
                const picked = currentResults[Number(button.dataset.index)];
                if (!picked) { return; }
                input.value = picked;
                if (typeof config.onPick === "function") { config.onPick(picked); }
                close();
            }));
        }
        input.addEventListener("input", () => {
            const query = input.value.trim().toLowerCase();
            if (typeof config.onInputChange === "function") { config.onInputChange(input.value); }
            if (!query) { close(); return; }
            renderResults(entries.filter((entry) => entry.toLowerCase().includes(query)).slice(0, 8));
        });
        input.addEventListener("focus", () => {
            const query = input.value.trim().toLowerCase();
            if (!query) { return; }
            renderResults(entries.filter((entry) => entry.toLowerCase().includes(query)).slice(0, 8));
        });
        input.addEventListener("keydown", (event) => {
            if (dropdown.hidden) { return; }
            if (event.key === "ArrowDown") { event.preventDefault(); activeIndex = Math.min(activeIndex + 1, currentResults.length - 1); renderResults(currentResults); return; }
            if (event.key === "ArrowUp") { event.preventDefault(); activeIndex = Math.max(activeIndex - 1, 0); renderResults(currentResults); return; }
            if (event.key === "Enter" && activeIndex >= 0 && currentResults[activeIndex]) {
                event.preventDefault();
                input.value = currentResults[activeIndex];
                if (typeof config.onPick === "function") { config.onPick(currentResults[activeIndex]); }
                close();
                return;
            }
            if (event.key === "Escape") { close(); }
        });
        input.addEventListener("blur", () => {
            window.setTimeout(() => {
                close();
                if (typeof config.onCommit === "function") { config.onCommit(input.value); }
            }, 120);
        });
    }
    function attachMoveAutocomplete(input) {
        attachOptionAutocomplete(input, {
            getEntries: () => {
                const pokemon = resolvePartyEditorPokemon();
                return pokemon ? window.MoveData.searchMoves(pokemon, input.value, 24).map((move) => ({
                    value: move.key,
                    label: move.koName,
                    meta: window.TypeModule.toTypeLabel(move.type),
                    type: move.type,
                    move
                })) : [];
            },
            onSelect: (entry) => {
                input.value = entry.label;
                input.dataset.selectedMove = entry.value;
            },
            onInputChange: () => {
                input.dataset.selectedMove = "";
            },
            onCommit: () => {
                syncMoveInput(input, resolvePartyEditorPokemon());
            }
        });
    }
    function attachDamageMoveAutocomplete() {
        attachOptionAutocomplete(refs.damageMoveName, {
            getEntries: () => {
                const species = getDamageMoveSpecies();
                return species ? window.MoveData.searchMoves(species, refs.damageMoveName.value, 24).map((move) => ({
                    value: move.key,
                    label: move.koName,
                    meta: window.TypeModule.toTypeLabel(move.type),
                    move
                })) : [];
            },
            onSelect: (entry) => {
                refs.damageMoveName.value = entry.label;
                refs.damageMoveName.dataset.selectedMove = entry.value;
                applyDamageMoveDefaults(entry.move);
            },
            onInputChange: () => {
                refs.damageMoveName.dataset.selectedMove = "";
            },
            onCommit: () => {
                const move = syncDamageMoveInput();
                if (move) {
                    applyDamageMoveDefaults(move);
                }
            }
        });
    }
    function addOpponent() {
        if (state.opponents.length >= PARTY_SIZE) { setStatus("상대 팀은 최대 6마리까지 입력할 수 있습니다.", "error"); return; }
        const pokemon = window.PokeData.resolvePokemon(refs.enemySearch.dataset.selectedName || refs.enemySearch.value);
        if (!pokemon) { setStatus("상대 포켓몬 이름을 검색 결과에서 선택하거나 정확히 입력해 주세요.", "error"); return; }
        if (state.opponents.includes(pokemon.name)) { setStatus("이미 추가된 상대 포켓몬입니다.", "error"); return; }
        state.opponents.push(pokemon.name);
        refs.enemySearch.value = "";
        refs.enemySearch.dataset.selectedName = "";
        state.selectedOpponentName = state.selectedOpponentName || pokemon.name;
        renderOpponentList(); renderTypeCard(); refreshSpeedSelects();
        setStatus(`${pokemon.koName}을(를) 상대 팀에 추가했습니다.`, "success");
    }
    function removeOpponent(name) {
        state.opponents = state.opponents.filter((entry) => entry !== name);
        if (state.selectedOpponentName === name) { state.selectedOpponentName = state.opponents[0] || ""; }
        renderOpponentList(); renderTypeCard(); refreshSpeedSelects();
    }
    function resetOpponents() {
        state.opponents = [];
        state.selectedOpponentName = "";
        refs.enemySearch.value = "";
        refs.enemySearch.dataset.selectedName = "";
        renderOpponentList();
        renderTypeCard();
        refreshSpeedSelects();
    }
    function renderOpponentList() {
        refs.enemyCount.textContent = `현재 ${state.opponents.length} / 6`;
        if (state.opponents.length === 0) { refs.enemyList.innerHTML = ""; return; }
        refs.enemyList.innerHTML = state.opponents.map((name) => {
            const pokemon = window.PokeData.getPokemonByName(name);
            const active = state.selectedOpponentName === name ? "active" : "";
            const primaryType = pokemon.types && pokemon.types[0] ? pokemon.types[0] : "";
            return `<li class="enemy-item"><button class="enemy-select-btn ${active}" type="button" data-pokemon-name="${pokemon.name}" data-enemy-type="${primaryType}"><div class="enemy-card-main"><strong class="enemy-name">${pokemon.koName}</strong><div class="type-row enemy-type-row">${renderTypeBadges(pokemon.types)}</div></div></button><button class="enemy-remove-btn" type="button" data-remove-name="${pokemon.name}">삭제</button></li>`;
        }).join("");
    }
    function renderTypeCard() {
        if (!state.selectedOpponentName) { refs.typeCard.className = "info-card empty-card"; refs.typeCard.textContent = "아직 선택한 상대 포켓몬이 없습니다."; return; }
        const pokemon = window.PokeData.getPokemonByName(state.selectedOpponentName);
        const summary = window.TypeModule.getDefenseSummary(pokemon.types);
        refs.typeCard.className = "info-card";
        refs.typeCard.innerHTML = `<div class="recommend-topline"><div class="recommend-title"><strong>${pokemon.koName}</strong></div><div class="type-row">${renderTypeBadges(pokemon.types)}</div></div><div class="combo-members"><div class="combo-member"><strong>약점</strong><div class="type-row">${summary.weaknesses.length > 0 ? summary.weaknesses.map((entry) => `<span class="type-badge" data-type="${entry.type}">${window.TypeModule.toTypeLabel(entry.type)} x${entry.multiplier}</span>`).join("") : "<span class='member-help'>눈에 띄는 약점이 적습니다.</span>"}</div></div><div class="combo-member"><strong>반감</strong><div class="type-row">${summary.resistances.length > 0 ? summary.resistances.map((entry) => `<span class="type-badge" data-type="${entry.type}">${window.TypeModule.toTypeLabel(entry.type)} x${entry.multiplier}</span>`).join("") : "<span class='member-help'>반감 타입이 많지 않습니다.</span>"}</div></div><div class="combo-member"><strong>무효</strong><div class="type-row">${summary.immunities.length > 0 ? summary.immunities.map((type) => `<span class="type-badge" data-type="${type}">${window.TypeModule.toTypeLabel(type)}</span>`).join("") : "<span class='member-help'>무효 타입이 없습니다.</span>"}</div></div></div>`;
    }
    function buildNeutralStatProfile(species) {
        if (!species || !species.baseStats) {
            return null;
        }
        return window.SpeedModule.calculateLevel50Stats(species.baseStats, {
            nature: "hardy",
            level: DAMAGE_LEVEL,
            evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
            ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
        });
    }
    function buildDamageSourceOptions(validParty, opponents) {
        const options = [`<option value="">직접 입력</option>`];

        if (validParty.length > 0) {
            options.push(`<optgroup label="내 파티">`);
            validParty.forEach((member, index) => {
                const species = getMemberBattleSpecies(member);
                if (!species) { return; }
                options.push(`<option value="party:${index}">${species.displayKoName || species.koName} 저장값</option>`);
            });
            options.push(`</optgroup>`);
        }

        if (opponents.length > 0) {
            options.push(`<optgroup label="상대 기본치">`);
            opponents.forEach((pokemon) => {
                options.push(`<option value="opponent:${pokemon.name}">${pokemon.koName} 중립/무포인트</option>`);
            });
            options.push(`</optgroup>`);
        }

        return options.join("");
    }
    function getMovePowerGuess(move) {
        if (!move) {
            return 80;
        }
        if (typeof move.power === "number") {
            return move.power;
        }
        const moveKey = move.key;
        if (DAMAGE_VERY_HIGH_POWER_MOVE_KEYS.has(moveKey)) {
            return 120;
        }
        if (DAMAGE_HIGH_POWER_MOVE_KEYS.has(moveKey)) {
            return 90;
        }
        if (DAMAGE_LOW_POWER_MOVE_KEYS.has(moveKey)) {
            return 40;
        }
        return 80;
    }
    function getMoveCategoryGuess(move, attackStats) {
        if (!move) {
            return attackStats && attackStats.spa > attackStats.atk ? "special" : "physical";
        }
        if (move.category === "physical" || move.category === "special") {
            return move.category;
        }
        const moveKey = move.key;
        if (DAMAGE_PHYSICAL_MOVE_KEYS.has(moveKey)) {
            return "physical";
        }
        if (DAMAGE_SPECIAL_MOVE_KEYS.has(moveKey)) {
            return "special";
        }
        return attackStats && attackStats.spa > attackStats.atk ? "special" : "physical";
    }
    function getDamageMoveSpecies() {
        const source = resolveDamageSource(refs.damageAttackSource ? refs.damageAttackSource.value : "");
        return source ? source.species : null;
    }
    function syncDamageMoveInput() {
        const species = getDamageMoveSpecies();
        const resolved = species ? window.MoveData.resolveMoveForPokemon(species, refs.damageMoveName.dataset.selectedMove || refs.damageMoveName.value) : null;
        if (!resolved) {
            refs.damageMoveName.dataset.selectedMove = "";
            return null;
        }
        refs.damageMoveName.value = resolved.koName;
        refs.damageMoveName.dataset.selectedMove = resolved.key;
        return resolved;
    }
    function applyDamageMoveDefaults(move) {
        const source = resolveDamageSource(refs.damageAttackSource ? refs.damageAttackSource.value : "");
        const stats = source && source.stats ? source.stats : null;
        if (!move) {
            refs.damageMoveNote.textContent = "기술명을 선택하면 타입, 분류, 위력을 자동 추정합니다. 자동값이 다르면 직접 수정해 주세요.";
            return;
        }
        if (move.type) {
            refs.damageMoveType.value = move.type;
        }
        if (move.category === "status") {
            refs.damageMoveNote.textContent = `${move.koName}는 변화기라 기본적으로 데미지 계산 대상이 아닙니다. 필요하면 값을 직접 수정해 주세요.`;
            return;
        }
        refs.damageMoveCategory.value = getMoveCategoryGuess(move, stats);
        refs.damageMovePower.value = getMovePowerGuess(move);
        refs.damageMoveNote.textContent = typeof move.power === "number" && move.category
            ? `${move.koName} 메타데이터를 불러왔습니다.`
            : `${move.koName} 기준 자동 추정값을 채웠습니다. 데이터가 없는 값은 직접 수정해 주세요.`;
    }
    function resolveDamageSource(token) {
        const normalized = String(token || "");
        if (!normalized) {
            return null;
        }

        const [kind, rawValue] = normalized.split(":");
        if (kind === "party") {
            const validParty = getValidPartyMembers();
            const member = validParty[Number(rawValue)];
            const species = member ? getMemberBattleSpecies(member) : null;
            if (!member || !species) {
                return null;
            }
            return {
                label: species.displayKoName || species.koName,
                stats: window.SpeedModule.calculateLevel50Stats(species.baseStats, member),
                species,
                member,
                note: `${species.displayKoName || species.koName} 저장된 실수치를 불러왔습니다.`
            };
        }

        if (kind === "opponent") {
            const species = window.PokeData.getPokemonByName(rawValue);
            if (!species) {
                return null;
            }
            return {
                label: species.koName,
                stats: buildNeutralStatProfile(species),
                species,
                member: null,
                note: `${species.koName} 중립 성격 / 능력포인트 0 / 개체값 31 기준 실수치를 불러왔습니다.`
            };
        }

        return null;
    }
    function updateDamageSourceNote(side, text) {
        const node = side === "attack" ? refs.damageAttackSourceNote : refs.damageDefenseSourceNote;
        if (!node) { return; }
        node.textContent = text || "직접 실수치를 입력해 주세요.";
    }
    function applyDamageSource(side) {
        const select = side === "attack" ? refs.damageAttackSource : refs.damageDefenseSource;
        const source = resolveDamageSource(select ? select.value : "");

        if (!source || !source.stats) {
            updateDamageSourceNote(side, "");
            if (side === "attack") {
                refs.damageMoveName.dataset.selectedMove = "";
                refs.damageMoveNote.textContent = "기술명을 선택하면 타입, 분류, 위력을 자동 추정합니다. 자동값이 다르면 직접 수정해 주세요.";
            }
            return;
        }

        if (side === "attack") {
            refs.damageAttackAtk.value = source.stats.atk;
            refs.damageAttackSpa.value = source.stats.spa;
        } else {
            refs.damageDefenseHp.value = source.stats.hp;
            refs.damageDefenseDef.value = source.stats.def;
            refs.damageDefenseSpd.value = source.stats.spd;
        }
        updateDamageSourceNote(side, source.note);
    }
    function resolveSelectedAbility(side) {
        const source = resolveDamageSource(side === "attack" ? refs.damageAttackSource.value : refs.damageDefenseSource.value);
        const control = side === "attack" ? refs.damageAttackAbility : refs.damageDefenseAbility;
        if (!control) {
            return "";
        }
        if (control.value !== "auto") {
            return control.value || "";
        }
        return source && source.member ? (source.member.ability || "") : "";
    }
    function resolveSelectedItem(side) {
        const source = resolveDamageSource(side === "attack" ? refs.damageAttackSource.value : refs.damageDefenseSource.value);
        const control = side === "attack" ? refs.damageAttackItem : refs.damageDefenseItem;
        if (!control) {
            return "";
        }
        if (control.value !== "auto") {
            return control.value || "";
        }
        return source && source.member ? (source.member.item || "") : "";
    }
    function resolveDamageMoveType() {
        return String(refs.damageMoveType.value || "").toLowerCase();
    }
    function resolveEffectiveness(moveType) {
        if (refs.damageEffectiveness.value !== "auto") {
            return Number(refs.damageEffectiveness.value || 1) || 1;
        }
        const defenseSource = resolveDamageSource(refs.damageDefenseSource.value);
        if (!defenseSource || !defenseSource.species || !moveType) {
            return 1;
        }
        return window.TypeModule.getTypeMultiplier(moveType, defenseSource.species.types);
    }
    function resolveStabMultiplier(moveType, attackAbility) {
        const stabMode = refs.damageStabMode.value || "auto";
        const attackSource = resolveDamageSource(refs.damageAttackSource.value);
        const attackTypes = attackSource && attackSource.species ? (attackSource.species.types || []) : [];
        if (stabMode === "none") {
            return 1;
        }
        if (stabMode === "stab") {
            return 1.5;
        }
        if (stabMode === "adaptability") {
            return 2;
        }
        const convertsType = attackAbility === "변환자재" || attackAbility === "리베로";
        const hasStab = convertsType || attackTypes.includes(moveType);
        if (!hasStab) {
            return 1;
        }
        return attackAbility === "적응력" ? 2 : 1.5;
    }
    function getAttackModifierDetails(config) {
        const modifiers = [];
        const ability = config.attackAbility;
        const item = config.attackItem;

        if (config.stabMultiplier > 1) {
            modifiers.push({ label: `자속 x${config.stabMultiplier.toFixed(2)}`, multiplier: config.stabMultiplier });
        }
        if (config.effectiveness !== 1) {
            modifiers.push({ label: `상성 x${config.effectiveness.toFixed(2)}`, multiplier: config.effectiveness });
        }
        if (config.criticalHit) {
            let critMultiplier = 1.5;
            if (ability === "스나이퍼") {
                critMultiplier *= 1.5;
            }
            modifiers.push({ label: `급소 x${critMultiplier.toFixed(2)}`, multiplier: critMultiplier });
        }
        if (config.weather === "sun") {
            if (config.moveType === "fire") { modifiers.push({ label: "쾌청 x1.50", multiplier: 1.5 }); }
            if (config.moveType === "water") { modifiers.push({ label: "쾌청 x0.50", multiplier: 0.5 }); }
        }
        if (config.weather === "rain") {
            if (config.moveType === "water") { modifiers.push({ label: "비 x1.50", multiplier: 1.5 }); }
            if (config.moveType === "fire") { modifiers.push({ label: "비 x0.50", multiplier: 0.5 }); }
        }
        if (config.screen === "reflect" && config.category === "physical") {
            modifiers.push({ label: "리플렉터 x0.50", multiplier: 0.5 });
        }
        if (config.screen === "light-screen" && config.category === "special") {
            modifiers.push({ label: "빛의장막 x0.50", multiplier: 0.5 });
        }
        if (config.attackerBurned && config.category === "physical" && ability !== "근성") {
            modifiers.push({ label: "화상 x0.50", multiplier: 0.5 });
        }
        if (ability === "테크니션" && config.power <= 60) {
            modifiers.push({ label: "테크니션 x1.50", multiplier: 1.5 });
        }
        if ((ability === "천하장사" || ability === "순수한힘") && config.category === "physical") {
            modifiers.push({ label: `${ability} x2.00`, multiplier: 2 });
        }
        if (ability === "맹화" && config.attackerLowHp && config.moveType === "fire") {
            modifiers.push({ label: "맹화 x1.50", multiplier: 1.5 });
        }
        if (ability === "급류" && config.attackerLowHp && config.moveType === "water") {
            modifiers.push({ label: "급류 x1.50", multiplier: 1.5 });
        }
        if (ability === "심록" && config.attackerLowHp && config.moveType === "grass") {
            modifiers.push({ label: "심록 x1.50", multiplier: 1.5 });
        }
        if (ability === "선파워" && config.weather === "sun" && config.category === "special") {
            modifiers.push({ label: "선파워 x1.50", multiplier: 1.5 });
        }
        if (ability === "근성" && config.attackerStatus && config.category === "physical") {
            modifiers.push({ label: "근성 x1.50", multiplier: 1.5 });
        }
        if (item === "구애머리띠" && config.category === "physical") {
            modifiers.push({ label: "구애머리띠 x1.50", multiplier: 1.5 });
        }
        if (item === "구애안경" && config.category === "special") {
            modifiers.push({ label: "구애안경 x1.50", multiplier: 1.5 });
        }
        if (item === "생명의구슬") {
            modifiers.push({ label: "생명의구슬 x1.30", multiplier: 1.3 });
        }
        if (item === "전문가벨트" && config.effectiveness > 1) {
            modifiers.push({ label: "전문가벨트 x1.20", multiplier: 1.2 });
        }
        if (item === "힘의머리띠" && config.category === "physical") {
            modifiers.push({ label: "힘의머리띠 x1.10", multiplier: 1.1 });
        }
        if (item === "박식안경" && config.category === "special") {
            modifiers.push({ label: "박식안경 x1.10", multiplier: 1.1 });
        }
        if (TYPE_BOOSTER_ITEMS[config.moveType] && item === TYPE_BOOSTER_ITEMS[config.moveType]) {
            modifiers.push({ label: `${item} x1.20`, multiplier: 1.2 });
        }
        if (config.otherModifier !== 1) {
            modifiers.push({ label: `기타 x${config.otherModifier.toFixed(2)}`, multiplier: config.otherModifier });
        }

        return modifiers;
    }
    function getDefenseModifierDetails(config) {
        const modifiers = [];
        const ability = config.defenseAbility;
        const item = config.defenseItem;

        if (ability === "두꺼운지방" && (config.moveType === "fire" || config.moveType === "ice")) {
            modifiers.push({ label: "두꺼운지방 x0.50", multiplier: 0.5 });
        }
        if ((ability === "필터" || ability === "하드록" || ability === "프리즘아머") && config.effectiveness > 1) {
            modifiers.push({ label: `${ability} x0.75`, multiplier: 0.75 });
        }
        if (ability === "멀티스케일" && config.defenderFullHp) {
            modifiers.push({ label: "멀티스케일 x0.50", multiplier: 0.5 });
        }
        if (ability === "퍼코트" && config.category === "physical") {
            modifiers.push({ label: "퍼코트 x0.50", multiplier: 0.5 });
        }
        if (item === "돌격조끼" && config.category === "special") {
            modifiers.push({ label: "돌격조끼 x0.67", multiplier: 1 / 1.5 });
        }
        if (item === "진화의휘석") {
            modifiers.push({ label: "진화의휘석 x0.67", multiplier: 1 / 1.5 });
        }
        if (RESIST_BERRY_TYPES[item] && RESIST_BERRY_TYPES[item] === config.moveType && config.effectiveness > 1) {
            modifiers.push({ label: `${item} x0.50`, multiplier: 0.5 });
        }

        return modifiers;
    }
    function calculateCombinedMultiplier(modifiers) {
        return modifiers.reduce((product, entry) => product * entry.multiplier, 1);
    }
    function refreshSpeedSelects() {
        const validParty = getValidPartyMembers();
        const opponents = state.opponents.map((name) => window.PokeData.getPokemonByName(name)).filter(Boolean);
        const damageOptions = buildDamageSourceOptions(validParty, opponents);
        const previousAttackSource = refs.damageAttackSource ? refs.damageAttackSource.value : "";
        const previousDefenseSource = refs.damageDefenseSource ? refs.damageDefenseSource.value : "";
        refs.mySpeedSelect.innerHTML = validParty.length > 0 ? validParty.map((member, index) => `<option value="${index}">${(getMemberBattleSpecies(member) || {}).displayKoName || (getMemberBattleSpecies(member) || {}).koName}</option>`).join("") : `<option value="">내 파티를 먼저 입력하세요</option>`;
        refs.enemySpeedSelect.innerHTML = opponents.length > 0 ? opponents.map((pokemon) => `<option value="${pokemon.name}">${pokemon.koName}</option>`).join("") : `<option value="">상대 포켓몬을 추가하세요</option>`;
        if (refs.damageAttackSource && refs.damageDefenseSource) {
            refs.damageAttackSource.innerHTML = damageOptions;
            refs.damageDefenseSource.innerHTML = damageOptions;
            refs.damageAttackSource.value = Array.from(refs.damageAttackSource.options).some((option) => option.value === previousAttackSource) ? previousAttackSource : "";
            refs.damageDefenseSource.value = Array.from(refs.damageDefenseSource.options).some((option) => option.value === previousDefenseSource) ? previousDefenseSource : "";
            updateDamageSourceNote("attack", resolveDamageSource(refs.damageAttackSource.value)?.note || "");
            updateDamageSourceNote("defense", resolveDamageSource(refs.damageDefenseSource.value)?.note || "");
            if (refs.damageAttackSource.value) {
                applyDamageSource("attack");
                const move = syncDamageMoveInput();
                if (move) {
                    applyDamageMoveDefaults(move);
                }
            }
            if (refs.damageDefenseSource.value) { applyDamageSource("defense"); }
        }
    }
    function calculateDamageRatio(power, attackStat, defenseStat, hpStat, randomFactor) {
        return ((22 * power * attackStat) / ((defenseStat * 50) + 2) / hpStat) * randomFactor;
    }
    function classifyDamageRange(minRatio, maxRatio) {
        if (minRatio >= 1) {
            return "확정 1타";
        }
        if (maxRatio >= 1) {
            return "난수 1타";
        }
        return "확정 2타 이상";
    }
    function calculateDamage() {
        const selectedMoveKey = refs.damageMoveName.dataset.selectedMove || "";
        const selectedMove = selectedMoveKey ? window.MoveData.getMove(selectedMoveKey) : null;
        if (selectedMove && selectedMove.category === "status") {
            setStatus("변화기는 데미지 계산 대상이 아닙니다. 공격기를 선택하거나 수치를 직접 입력해 주세요.", "error");
            return;
        }
        const moveType = resolveDamageMoveType();
        const category = refs.damageMoveCategory.value === "special" ? "special" : "physical";
        const categoryLabel = category === "special" ? "특수" : "물리";
        const power = clampNumber(refs.damageMovePower.value, 1, 999, 0);
        const attackStat = clampNumber(category === "special" ? refs.damageAttackSpa.value : refs.damageAttackAtk.value, 1, 9999, 0);
        const defenseStat = clampNumber(category === "special" ? refs.damageDefenseSpd.value : refs.damageDefenseDef.value, 1, 9999, 0);
        const hpStat = clampNumber(refs.damageDefenseHp.value, 1, 9999, 0);
        const otherModifier = Math.max(0, Number(refs.damageOtherModifier.value || 1) || 1);
        const attackAbility = resolveSelectedAbility("attack");
        const defenseAbility = resolveSelectedAbility("defense");
        const attackItem = resolveSelectedItem("attack");
        const defenseItem = resolveSelectedItem("defense");
        const effectiveness = resolveEffectiveness(moveType);
        const stabMultiplier = resolveStabMultiplier(moveType, attackAbility);

        if (!moveType || !power || !attackStat || !defenseStat || !hpStat) {
            setStatus("기술 타입, 위력, 공격측 실수치, 방어측 HP/방어 실수치를 모두 입력해 주세요.", "error");
            return;
        }

        const config = {
            moveType,
            category,
            power,
            weather: refs.damageWeather.value || "",
            screen: refs.damageScreen.value || "",
            attackerLowHp: refs.damageAttackerLowHp.checked,
            attackerStatus: refs.damageAttackerStatus.checked || refs.damageAttackerBurned.checked,
            attackerBurned: refs.damageAttackerBurned.checked,
            defenderFullHp: refs.damageDefenderFullHp.checked,
            criticalHit: refs.damageCriticalHit.checked,
            attackAbility,
            defenseAbility,
            attackItem,
            defenseItem,
            effectiveness,
            stabMultiplier,
            otherModifier
        };
        const attackModifiers = getAttackModifierDetails(config);
        const defenseModifiers = getDefenseModifierDetails(config);
        const allModifiers = attackModifiers.concat(defenseModifiers);
        const totalModifier = calculateCombinedMultiplier(allModifiers);
        const minRatio = calculateDamageRatio(power, attackStat, defenseStat, hpStat, DAMAGE_RANDOM_MIN) * totalModifier;
        const maxRatio = calculateDamageRatio(power, attackStat, defenseStat, hpStat, DAMAGE_RANDOM_MAX) * totalModifier;
        const minPercent = minRatio * 100;
        const maxPercent = maxRatio * 100;
        const minDamage = hpStat * minRatio;
        const maxDamage = hpStat * maxRatio;
        const verdict = classifyDamageRange(minRatio, maxRatio);
        const typeLabel = window.TypeModule.toTypeLabel(moveType);
        const modifierChips = [
            `${categoryLabel} 계산`,
            `${typeLabel} 타입`,
            `위력 ${power}`,
            `상성 x${effectiveness.toFixed(2)}`,
            `총배율 x${totalModifier.toFixed(2)}`
        ];
        const notes = [];
        if (defenseAbility === "옹골참" && refs.damageDefenderFullHp.checked && maxRatio >= 1) {
            notes.push("방어측 특성이 옹골참이면 풀피 기준 1타를 버틸 수 있습니다.");
        }
        if (!resolveDamageSource(refs.damageDefenseSource.value) && refs.damageEffectiveness.value === "auto") {
            notes.push("방어측 포켓몬을 불러오지 않은 상태라 상성 자동 계산은 1배로 처리했습니다.");
        }
        if (!resolveDamageSource(refs.damageAttackSource.value) && refs.damageStabMode.value === "auto") {
            notes.push("공격측 포켓몬을 불러오지 않은 상태라 자속 자동 계산은 비적용으로 처리했습니다.");
        }

        refs.damageResult.className = "info-card";
        refs.damageResult.innerHTML = `<div class="recommend-topline"><div class="recommend-title"><strong>${verdict}</strong></div><div class="type-row">${renderMiniChips(modifierChips)}</div></div><div class="damage-result-grid"><div class="combo-member"><strong>최저 난수 0.85</strong><p class="recommend-reason">${minDamage.toFixed(1)} 데미지</p><p class="recommend-detail">HP의 ${minPercent.toFixed(2)}%</p></div><div class="combo-member"><strong>최고 난수 1.00</strong><p class="recommend-reason">${maxDamage.toFixed(1)} 데미지</p><p class="recommend-detail">HP의 ${maxPercent.toFixed(2)}%</p></div></div>${allModifiers.length > 0 ? `<p class="recommend-reason">적용 보정: <strong>${allModifiers.map((entry) => entry.label).join(" / ")}</strong></p>` : `<p class="recommend-reason">적용 보정: <strong>없음</strong></p>`}<p class="recommend-reason">기본식: 22 x 위력 x 공격실능 / ((방어실능 x 50) + 2) / HP실능 x 난수</p>${notes.map((note) => `<p class="recommend-detail">${note}</p>`).join("")}`;
        setStatus("데미지 계산을 갱신했습니다.", "success");
    }
    function compareSpeed() {
        const validParty = getValidPartyMembers();
        const myMember = validParty[Number(refs.mySpeedSelect.value)];
        const myPokemon = myMember ? getMemberBattleSpecies(myMember) : null;
        const enemyPokemon = refs.enemySpeedSelect.value ? window.PokeData.getPokemonByName(refs.enemySpeedSelect.value) : null;
        if (!myPokemon || !enemyPokemon) { setStatus("스피드 비교를 위해 내 포켓몬과 상대 포켓몬을 각각 선택해 주세요.", "error"); return; }
        const comparison = window.SpeedModule.compareSpeed(myPokemon, myMember, enemyPokemon);
        const enemyPreset = enemyPokemon.speedPreset ? enemyPokemon.speedPreset.label : "기본 추정";
        refs.speedResult.className = "info-card";
        refs.speedResult.innerHTML = `<div class="recommend-topline"><div class="recommend-title"><strong>${myPokemon.koName}</strong><span class="mini-chip speed-number">${comparison.myStat}</span></div><div class="recommend-title"><strong>${enemyPokemon.koName}</strong><span class="mini-chip speed-number">${comparison.enemyStat}</span></div></div><p class="recommend-reason">선공 가능성: <strong>${comparison.verdict}</strong></p><p class="recommend-reason">내 포켓몬은 저장값 기준, 상대는 <strong>${enemyPreset}</strong> 프리셋 기준으로 계산했습니다.</p>`;
    }
    function renderLeadResult(lead) {
        if (!lead) { refs.leadResult.className = "info-card empty-card"; refs.leadResult.textContent = "추천 선봉이 없습니다."; return; }
        refs.leadResult.className = "info-card lead-card";
        refs.leadResult.innerHTML = `<div class="recommend-head"><div class="recommend-title"><strong>${lead.species.koName}</strong></div><div class="type-row">${renderTypeBadges(lead.species.types)}</div><div class="type-row">${renderRecommendationFacts(lead)}</div>${renderStrategyChips(lead) ? `<div class="type-row">${renderStrategyChips(lead)}</div>` : ""}${lead.attackTypes && lead.attackTypes.length > 0 ? `<div class="type-row">${renderTypeBadges(lead.attackTypes.slice(0, 3))}</div>` : ""}</div><p class="recommend-reason">${lead.reason}</p>${renderReasonLines(lead.reasonDetails)}${renderRecommendationTargets(lead)}`;
    }
    function renderComboContainer(container, combos, emptyMessage, labelPrefix) {
        if (!combos || combos.length === 0) { container.className = "stack-card empty-card"; container.textContent = emptyMessage; return; }
        container.className = "stack-card";
        container.innerHTML = combos.map((entry, index) => `<article class="combo-card"><div class="recommend-head"><div class="recommend-title"><strong>${labelPrefix} ${index + 1}</strong></div><span class="mini-chip">${entry.combo.map((member) => member.species.koName).join(" / ")}</span></div><div class="type-row">${renderComboHeaderChips(entry)}</div>${entry.summaryChips && entry.summaryChips.length > 0 ? `<div class="type-row">${renderMiniChips(entry.summaryChips, 2)}</div>` : ""}</div><div class="combo-members">${entry.combo.map((member) => `<div class="combo-member"><strong>${member.species.koName}</strong><div class="type-row">${renderRecommendationFacts(member)}</div>${renderStrategyChips(member) ? `<div class="type-row">${renderStrategyChips(member)}</div>` : ""}${member.attackTypes && member.attackTypes.length > 0 ? `<div class="type-row">${renderTypeBadges(member.attackTypes.slice(0, 3))}</div>` : ""}<p class="recommend-reason">${member.reason}</p>${renderReasonLines(member.reasonDetails)}${renderRecommendationTargets(member)}</div>`).join("")}</div><p class="combo-summary">${entry.summary}</p>${renderReasonLines(entry.summaryDetails, "combo-summary combo-detail")}</article>`).join("");
    }
    function renderThreats(threats) {
        if (!threats || threats.length === 0) { refs.threatResult.className = "stack-card empty-card"; refs.threatResult.textContent = "현재 입력 기준으로는 치명적인 주의 포켓몬이 두드러지지 않습니다."; return; }
        refs.threatResult.className = "stack-card";
        refs.threatResult.innerHTML = threats.map((threat) => `<article class="threat-card"><div class="recommend-head"><div class="recommend-title"><strong>${threat.koName}</strong></div><div class="type-row">${renderMiniChips([threat.category || "주의"], 1)}</div>${threat.evidenceChips && threat.evidenceChips.length > 0 ? `<div class="type-row">${renderMiniChips(threat.evidenceChips, 2)}</div>` : ""}</div><p class="threat-text">${threat.message}</p>${renderReasonLines(threat.detailLines, "threat-text recommend-detail")}</article>`).join("");
    }
    function runRecommendation(options) {
        const config = options || {};
        if (getValidPartyMembers().length < PARTY_SIZE) { setStatus("추천을 실행하려면 내 파티 6마리를 모두 설정해 주세요.", "error"); return; }
        if (state.opponents.length < PARTY_SIZE) { setStatus("상대 포켓몬 6마리를 모두 입력한 뒤 추천 보기를 눌러 주세요.", "error"); return; }
        const recommendation = window.RecommendModule.recommend(state.partyMembers, state.opponents);
        if (recommendation.error) { setStatus(recommendation.error, "error"); return; }
        renderLeadResult(recommendation.lead);
        renderComboContainer(refs.comboResult, recommendation.primaryCombo ? [recommendation.primaryCombo] : [], "추천 조합이 없습니다.", "추천 조합");
        renderComboContainer(refs.altComboResult, recommendation.alternativeCombos || [], "추가 대안 조합이 없습니다.", "대안 조합");
        renderThreats(recommendation.threats || []);
        renderBattlePlan(recommendation.battlePlan || null);
        refs.overallSummary.textContent = recommendation.summary || "총평을 생성하지 못했습니다.";
        if (config.switchPage) {
            setCurrentPage("result");
        }
        setStatus("추천 결과를 갱신했습니다. 상대 클릭으로 타입 보조와 스피드 비교도 함께 확인해 보세요.", "success");
    }
    function bindEvents() {
        refs.savePartyBtn.addEventListener("click", saveParty);
        refs.resetPartyBtn.addEventListener("click", resetParty);
        refs.addEnemyBtn.addEventListener("click", addOpponent);
        refs.resetEnemyBtn.addEventListener("click", resetOpponents);
        refs.enemyAnalyzeBtn.addEventListener("click", () => runRecommendation({ switchPage: true }));
        refs.compareSpeedBtn.addEventListener("click", compareSpeed);
        refs.damageCalcBtn.addEventListener("click", calculateDamage);
        refs.damageAttackSource.addEventListener("change", () => {
            applyDamageSource("attack");
            const move = syncDamageMoveInput();
            if (move) {
                applyDamageMoveDefaults(move);
            }
        });
        refs.damageDefenseSource.addEventListener("change", () => applyDamageSource("defense"));
        refs.damageMoveName.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                calculateDamage();
            }
        });
        refs.partyEditorSaveBtn.addEventListener("click", savePartySlot);
        refs.partyEditorBackBtn.addEventListener("click", closePartyEditor);
        refs.partyEditorFormToggle.addEventListener("click", (event) => {
            const button = event.target.closest("[data-form-key]");
            if (!button) { return; }
            setSelectedFormKey(button.dataset.formKey);
            refreshEditorStatSummary();
        });
        refs.menuToggleBtn.addEventListener("click", () => { state.mobileMenuOpen = !state.mobileMenuOpen; updatePageVisibility(); });
        refs.pageNav.addEventListener("click", (event) => {
            const button = event.target.closest("[data-page-target]");
            if (button) { setCurrentPage(button.dataset.pageTarget); }
        });
        refs.partySwitcher.addEventListener("click", (event) => {
            const button = event.target.closest("[data-party-index]");
            if (button) { switchParty(Number(button.dataset.partyIndex)); }
        });
        refs.partyName.addEventListener("change", () => {
            state.partyName = refs.partyName.value.trim() || `${state.currentPartyIndex + 1}파티`;
            refs.partyName.value = state.partyName;
            syncCurrentPartyIntoSlot();
            persistParties();
            renderPartySwitcher();
        });
        refs.partySlotGrid.addEventListener("click", (event) => {
            const button = event.target.closest("[data-party-slot-index]");
            if (button) { openPartyEditor(Number(button.dataset.partySlotIndex)); }
        });
        refs.enemyList.addEventListener("click", (event) => {
            const removeButton = event.target.closest("[data-remove-name]");
            const selectButton = event.target.closest("[data-pokemon-name]");
            if (removeButton) { removeOpponent(removeButton.dataset.removeName); return; }
            if (selectButton) { state.selectedOpponentName = selectButton.dataset.pokemonName; renderOpponentList(); renderTypeCard(); }
        });
        attachPokemonAutocomplete(refs.partyEditorName, { onSelect: (pokemon) => {
            const canonical = window.PokeData.getPokemonByName(pokemon.canonicalName || pokemon.name) || pokemon;
            refs.partyEditorName.value = canonical.displayKoName || canonical.koName;
            refs.partyEditorName.dataset.selectedName = canonical.name;
            updateFormToggle(canonical, pokemon.formKey || canonical.formKey || "");
            setPartyEditorPreview(getBattleSpecies(canonical, getSelectedFormKey()));
            refreshEditorStatSummary();
        } });
        attachTextAutocomplete(refs.partyEditorItem, ITEM_OPTIONS, {
            onPick: (value) => {
                const resolvedItem = resolveItemValue(value);
                refs.partyEditorItem.value = resolvedItem;
                updateItemPreview(resolvedItem);
            },
            onInputChange: (value) => updateItemPreview(value),
            onCommit: (value) => {
                const resolvedItem = resolveItemValue(value);
                refs.partyEditorItem.value = resolvedItem;
                updateItemPreview(resolvedItem);
            }
        });
        attachOptionAutocomplete(refs.partyEditorAbility, {
            getEntries: () => state.partyEditorAbilityEntries,
            showAllOnFocus: true,
            onSelect: (entry) => {
                refs.partyEditorAbility.value = entry.label;
                refs.partyEditorAbility.dataset.selectedValue = entry.value;
            },
            onCommit: () => {
                const pokemon = resolvePartyEditorPokemon();
                const ability = resolveAbilityValue(pokemon, refs.partyEditorAbility.dataset.selectedValue || refs.partyEditorAbility.value);
                refs.partyEditorAbility.value = ability;
                refs.partyEditorAbility.dataset.selectedValue = ability;
            }
        });
        attachOptionAutocomplete(refs.partyEditorNature, {
            getEntries: () => NATURE_ENTRIES,
            showAllOnFocus: true,
            onSelect: (entry) => {
                refs.partyEditorNature.value = entry.label;
                refs.partyEditorNature.dataset.selectedValue = entry.value;
                refreshEditorStatSummary();
            },
            onCommit: () => {
                const nature = sanitizeNature(refs.partyEditorNature.dataset.selectedValue || refs.partyEditorNature.value);
                refs.partyEditorNature.value = getNatureLabel(nature);
                refs.partyEditorNature.dataset.selectedValue = nature;
                refreshEditorStatSummary();
            }
        });
        getMoveInputs().forEach((input) => attachMoveAutocomplete(input));
        refs.partyEditorName.addEventListener("change", () => refreshEditorStatSummary());
        refs.partyEditorItem.addEventListener("change", () => {
            const resolvedItem = resolveItemValue(refs.partyEditorItem.value);
            refs.partyEditorItem.value = resolvedItem;
            updateItemPreview(resolvedItem);
        });
        refs.partyEditorNature.addEventListener("input", refreshEditorStatSummary);
        refs.statEditor.addEventListener("click", (event) => {
            const button = event.target.closest("[data-stat-action]");
            if (!button) { return; }
            const statKey = button.dataset.statTarget;
            const action = button.dataset.statAction;
            const current = getEditorStatValues()[statKey];
            if (action === "min") { setStatValueWithCap(statKey, 0); return; }
            if (action === "decrease") { setStatValueWithCap(statKey, current - 1); return; }
            if (action === "increase") { setStatValueWithCap(statKey, current + 1); return; }
            if (action === "max") { setStatValueWithCap(statKey, EV_MAX); }
        });
        const statInputs = getEditorStatInputs();
        STAT_KEYS.forEach((stat) => {
            statInputs[stat].addEventListener("input", () => setStatValueWithCap(stat, statInputs[stat].value));
        });
        attachPokemonAutocomplete(refs.enemySearch, { onSelect: (pokemon) => {
            refs.enemySearch.value = pokemon.koName;
            refs.enemySearch.dataset.selectedName = pokemon.name;
        } });
        refs.enemySearch.addEventListener("keydown", (event) => { if (event.key === "Enter") { event.preventDefault(); addOpponent(); } });
        window.addEventListener("resize", updatePageVisibility);
        document.addEventListener("click", (event) => {
            if (!state.mobileMenuOpen) { return; }
            if (!event.target.closest("#page-nav") && !event.target.closest("#menu-toggle-btn")) { closeMobileMenu(); }
        });
    }
    function initRefs() {
        refs.status = document.getElementById("assist-status");
        refs.menuToggleBtn = document.getElementById("menu-toggle-btn");
        refs.pageNav = document.getElementById("page-nav");
        refs.pageNavLinks = Array.from(document.querySelectorAll("[data-page-target]"));
        refs.pagePanels = Array.from(document.querySelectorAll(".page-panel"));
        refs.partySwitcher = document.getElementById("party-switcher");
        refs.partySwitchButtons = Array.from(document.querySelectorAll("[data-party-index]"));
        refs.partyName = document.getElementById("party-name");
        refs.partyOverview = document.getElementById("party-overview");
        refs.partySlotGrid = document.getElementById("party-slot-grid");
        refs.partyEditor = document.getElementById("party-editor");
        refs.partyEditorTitle = document.getElementById("party-editor-title");
        refs.partyEditorName = document.getElementById("party-editor-name");
        refs.partyEditorPreview = document.getElementById("party-editor-preview");
        refs.partyEditorFormToggle = document.getElementById("party-editor-form-toggle");
        refs.partyEditorFormButtons = Array.from(document.querySelectorAll("[data-form-key]"));
        refs.partyEditorItem = document.getElementById("party-editor-item");
        refs.partyEditorItemPreview = document.getElementById("party-editor-item-preview");
        refs.partyEditorItemImage = document.getElementById("party-editor-item-image");
        refs.partyEditorAbility = document.getElementById("party-editor-ability");
        refs.partyEditorNature = document.getElementById("party-editor-nature");
        refs.statEditor = document.querySelector(".stat-editor");
        refs.statHp = document.getElementById("stat-hp");
        refs.statAtk = document.getElementById("stat-atk");
        refs.statDef = document.getElementById("stat-def");
        refs.statSpa = document.getElementById("stat-spa");
        refs.statSpd = document.getElementById("stat-spd");
        refs.statSpe = document.getElementById("stat-spe");
        refs.statTotalPoints = document.getElementById("stat-total-points");
        refs.actualHP = document.getElementById("actual-hp");
        refs.actualATK = document.getElementById("actual-atk");
        refs.actualDEF = document.getElementById("actual-def");
        refs.actualSPA = document.getElementById("actual-spa");
        refs.actualSPD = document.getElementById("actual-spd");
        refs.actualSPE = document.getElementById("actual-spe");
        refs.move1 = document.getElementById("move-1");
        refs.move2 = document.getElementById("move-2");
        refs.move3 = document.getElementById("move-3");
        refs.move4 = document.getElementById("move-4");
        refs.partyEditorBackBtn = document.getElementById("party-editor-back-btn");
        refs.partyEditorSaveBtn = document.getElementById("party-editor-save-btn");
        refs.savePartyBtn = document.getElementById("save-party-btn");
        refs.resetPartyBtn = document.getElementById("reset-party-btn");
        refs.enemySearch = document.getElementById("enemy-search");
        refs.addEnemyBtn = document.getElementById("add-enemy-btn");
        refs.resetEnemyBtn = document.getElementById("reset-enemy-btn");
        refs.enemyAnalyzeBtn = document.getElementById("enemy-analyze-btn");
        refs.enemyCount = document.getElementById("enemy-count");
        refs.enemyList = document.getElementById("enemy-list");
        refs.typeCard = document.getElementById("type-card");
        refs.leadResult = document.getElementById("lead-result");
        refs.comboResult = document.getElementById("combo-result");
        refs.altComboResult = document.getElementById("alt-combo-result");
        refs.threatResult = document.getElementById("threat-result");
        refs.overallSummary = document.getElementById("overall-summary");
        refs.planSummary = document.getElementById("plan-summary");
        refs.mySpeedSelect = document.getElementById("my-speed-select");
        refs.enemySpeedSelect = document.getElementById("enemy-speed-select");
        refs.compareSpeedBtn = document.getElementById("compare-speed-btn");
        refs.speedResult = document.getElementById("speed-result");
        refs.damageCalcBtn = document.getElementById("damage-calc-btn");
        refs.damageAttackSource = document.getElementById("damage-attack-source");
        refs.damageDefenseSource = document.getElementById("damage-defense-source");
        refs.damageAttackSourceNote = document.getElementById("damage-attack-source-note");
        refs.damageDefenseSourceNote = document.getElementById("damage-defense-source-note");
        refs.damageAttackAtk = document.getElementById("damage-attack-atk");
        refs.damageAttackSpa = document.getElementById("damage-attack-spa");
        refs.damageDefenseHp = document.getElementById("damage-defense-hp");
        refs.damageDefenseDef = document.getElementById("damage-defense-def");
        refs.damageDefenseSpd = document.getElementById("damage-defense-spd");
        refs.damageMoveName = document.getElementById("damage-move-name");
        refs.damageMoveNote = document.getElementById("damage-move-note");
        refs.damageMoveType = document.getElementById("damage-move-type");
        refs.damageMoveCategory = document.getElementById("damage-move-category");
        refs.damageMovePower = document.getElementById("damage-move-power");
        refs.damageStabMode = document.getElementById("damage-stab-mode");
        refs.damageEffectiveness = document.getElementById("damage-effectiveness");
        refs.damageWeather = document.getElementById("damage-weather");
        refs.damageScreen = document.getElementById("damage-screen");
        refs.damageAttackAbility = document.getElementById("damage-attack-ability");
        refs.damageDefenseAbility = document.getElementById("damage-defense-ability");
        refs.damageAttackItem = document.getElementById("damage-attack-item");
        refs.damageDefenseItem = document.getElementById("damage-defense-item");
        refs.damageOtherModifier = document.getElementById("damage-other-modifier");
        refs.damageAttackerLowHp = document.getElementById("damage-attacker-low-hp");
        refs.damageAttackerStatus = document.getElementById("damage-attacker-status");
        refs.damageAttackerBurned = document.getElementById("damage-attacker-burned");
        refs.damageDefenderFullHp = document.getElementById("damage-defender-full-hp");
        refs.damageCriticalHit = document.getElementById("damage-critical-hit");
        refs.damageResult = document.getElementById("damage-result");
    }
    function init() {
        initRefs();
        initializeNatureInput();
        refs.damageMoveType.innerHTML = window.TYPE_CHART_DATA.allTypes.map((type) => `<option value="${type}">${window.TypeModule.toTypeLabel(type)}</option>`).join("");
        refs.damageMoveType.value = "normal";
        state.partySlots = Array.from({ length: PARTY_PRESET_COUNT }, (_, index) => createDefaultPartyBundle(index));
        applyCurrentParty(0);
        attachDamageMoveAutocomplete();
        bindEvents();
        loadSavedParty();
        renderOpponentList();
        renderTypeCard();
        refreshSpeedSelects();
        updatePartyEditorVisibility();
        updatePageVisibility();
    }
    window.addEventListener("DOMContentLoaded", init);
})();
