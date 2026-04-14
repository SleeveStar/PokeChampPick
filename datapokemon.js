(function () {
    "use strict";

    const POKEMON_LIST = [
    {
        "id": 3,
        "name": "venusaur",
        "apiName": "venusaur",
        "koName": "이상해꽃",
        "types": [
            "grass",
            "poison"
        ],
        "abilities": [
            "심록",
            "엽록소"
        ],
        "baseStats": {
            "hp": 80,
            "atk": 82,
            "def": 83,
            "spa": 100,
            "spd": 100,
            "spe": 80
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "venusaur-mega",
            "megaTypes": [
                "grass",
                "poison"
            ],
            "megaBaseStats": {
                "hp": 80,
                "atk": 100,
                "def": 123,
                "spa": 122,
                "spd": 120,
                "spe": 80
            }
        },
        "speedPreset": null,
        "aliases": [
            "Venusaur",
            "venusaur",
            "이상해꽃"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/3.png"
    },
    {
        "id": 6,
        "name": "charizard",
        "apiName": "charizard",
        "koName": "리자몽",
        "types": [
            "fire",
            "flying"
        ],
        "abilities": [
            "맹화",
            "선파워"
        ],
        "baseStats": {
            "hp": 78,
            "atk": 84,
            "def": 78,
            "spa": 109,
            "spd": 85,
            "spe": 100
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Charizard",
            "charizard",
            "리자몽"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/6.png"
    },
    {
        "id": 9,
        "name": "blastoise",
        "apiName": "blastoise",
        "koName": "거북왕",
        "types": [
            "water"
        ],
        "abilities": [
            "급류",
            "젖은접시"
        ],
        "baseStats": {
            "hp": 79,
            "atk": 83,
            "def": 100,
            "spa": 85,
            "spd": 105,
            "spe": 78
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "blastoise-mega",
            "megaTypes": [
                "water"
            ],
            "megaBaseStats": {
                "hp": 79,
                "atk": 103,
                "def": 120,
                "spa": 135,
                "spd": 115,
                "spe": 78
            }
        },
        "speedPreset": null,
        "aliases": [
            "Blastoise",
            "blastoise",
            "거북왕"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/9.png"
    },
    {
        "id": 15,
        "name": "beedrill",
        "apiName": "beedrill",
        "koName": "독침붕",
        "types": [
            "bug",
            "poison"
        ],
        "abilities": [
            "벌레의알림",
            "스나이퍼"
        ],
        "baseStats": {
            "hp": 65,
            "atk": 90,
            "def": 40,
            "spa": 45,
            "spd": 80,
            "spe": 75
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "beedrill-mega",
            "megaTypes": [
                "bug",
                "poison"
            ],
            "megaBaseStats": {
                "hp": 65,
                "atk": 150,
                "def": 40,
                "spa": 15,
                "spd": 80,
                "spe": 145
            }
        },
        "speedPreset": null,
        "aliases": [
            "Beedrill",
            "beedrill",
            "독침붕"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/15.png"
    },
    {
        "id": 18,
        "name": "pidgeot",
        "apiName": "pidgeot",
        "koName": "피죤투",
        "types": [
            "normal",
            "flying"
        ],
        "abilities": [
            "날카로운눈",
            "갈지자걸음",
            "부풀린가슴"
        ],
        "baseStats": {
            "hp": 83,
            "atk": 80,
            "def": 75,
            "spa": 70,
            "spd": 70,
            "spe": 101
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "pidgeot-mega",
            "megaTypes": [
                "normal",
                "flying"
            ],
            "megaBaseStats": {
                "hp": 83,
                "atk": 80,
                "def": 80,
                "spa": 135,
                "spd": 80,
                "spe": 121
            }
        },
        "speedPreset": null,
        "aliases": [
            "Pidgeot",
            "pidgeot",
            "피죤투"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/18.png"
    },
    {
        "id": 24,
        "name": "arbok",
        "apiName": "arbok",
        "koName": "아보크",
        "types": [
            "poison"
        ],
        "abilities": [
            "위협",
            "탈피",
            "긴장감"
        ],
        "baseStats": {
            "hp": 60,
            "atk": 95,
            "def": 69,
            "spa": 65,
            "spd": 79,
            "spe": 80
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Arbok",
            "arbok",
            "아보크"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/24.png"
    },
    {
        "id": 25,
        "name": "pikachu",
        "apiName": "pikachu",
        "koName": "피카츄",
        "types": [
            "electric"
        ],
        "abilities": [
            "정전기",
            "피뢰침"
        ],
        "baseStats": {
            "hp": 35,
            "atk": 55,
            "def": 40,
            "spa": 50,
            "spd": 50,
            "spe": 90
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Pikachu",
            "pikachu",
            "피카츄"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/25.png"
    },
    {
        "id": 26,
        "name": "raichu",
        "apiName": "raichu",
        "koName": "라이츄",
        "types": [
            "electric"
        ],
        "abilities": [
            "정전기",
            "피뢰침"
        ],
        "baseStats": {
            "hp": 60,
            "atk": 90,
            "def": 55,
            "spa": 90,
            "spd": 80,
            "spe": 110
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Raichu",
            "raichu",
            "라이츄"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/26.png"
    },
    {
        "id": 36,
        "name": "clefable",
        "apiName": "clefable",
        "koName": "픽시",
        "types": [
            "fairy"
        ],
        "abilities": [
            "헤롱헤롱바디",
            "매직가드",
            "천진"
        ],
        "baseStats": {
            "hp": 95,
            "atk": 70,
            "def": 73,
            "spa": 95,
            "spd": 90,
            "spe": 60
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "clefable-mega",
            "megaTypes": [
                "fairy",
                "flying"
            ],
            "megaBaseStats": {
                "hp": 95,
                "atk": 80,
                "def": 93,
                "spa": 135,
                "spd": 110,
                "spe": 70
            }
        },
        "speedPreset": null,
        "aliases": [
            "Clefable",
            "clefable",
            "픽시"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/36.png"
    },
    {
        "id": 38,
        "name": "ninetales",
        "apiName": "ninetales",
        "koName": "나인테일",
        "types": [
            "fire"
        ],
        "abilities": [
            "타오르는불꽃",
            "가뭄"
        ],
        "baseStats": {
            "hp": 73,
            "atk": 76,
            "def": 75,
            "spa": 81,
            "spd": 100,
            "spe": 100
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Ninetales",
            "ninetales",
            "나인테일"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/38.png"
    },
    {
        "id": 59,
        "name": "arcanine",
        "apiName": "arcanine",
        "koName": "윈디",
        "types": [
            "fire"
        ],
        "abilities": [
            "위협",
            "타오르는불꽃",
            "정의의마음"
        ],
        "baseStats": {
            "hp": 90,
            "atk": 110,
            "def": 80,
            "spa": 100,
            "spd": 80,
            "spe": 95
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Arcanine",
            "arcanine",
            "윈디"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/59.png"
    },
    {
        "id": 65,
        "name": "alakazam",
        "apiName": "alakazam",
        "koName": "후딘",
        "types": [
            "psychic"
        ],
        "abilities": [
            "싱크로",
            "정신력",
            "매직가드"
        ],
        "baseStats": {
            "hp": 55,
            "atk": 50,
            "def": 45,
            "spa": 135,
            "spd": 95,
            "spe": 120
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "alakazam-mega",
            "megaTypes": [
                "psychic"
            ],
            "megaBaseStats": {
                "hp": 55,
                "atk": 50,
                "def": 65,
                "spa": 175,
                "spd": 105,
                "spe": 150
            }
        },
        "speedPreset": null,
        "aliases": [
            "Alakazam",
            "alakazam",
            "후딘"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/65.png"
    },
    {
        "id": 68,
        "name": "machamp",
        "apiName": "machamp",
        "koName": "괴력몬",
        "types": [
            "fighting"
        ],
        "abilities": [
            "근성",
            "노가드",
            "불굴의마음"
        ],
        "baseStats": {
            "hp": 90,
            "atk": 130,
            "def": 80,
            "spa": 65,
            "spd": 85,
            "spe": 55
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Machamp",
            "machamp",
            "괴력몬"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/68.png"
    },
    {
        "id": 71,
        "name": "victreebel",
        "apiName": "victreebel",
        "koName": "우츠보트",
        "types": [
            "grass",
            "poison"
        ],
        "abilities": [
            "엽록소",
            "먹보"
        ],
        "baseStats": {
            "hp": 80,
            "atk": 105,
            "def": 65,
            "spa": 100,
            "spd": 70,
            "spe": 70
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "victreebel-mega",
            "megaTypes": [
                "grass",
                "poison"
            ],
            "megaBaseStats": {
                "hp": 80,
                "atk": 125,
                "def": 85,
                "spa": 135,
                "spd": 95,
                "spe": 70
            }
        },
        "speedPreset": null,
        "aliases": [
            "Victreebel",
            "victreebel",
            "우츠보트"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/71.png"
    },
    {
        "id": 80,
        "name": "slowbro",
        "apiName": "slowbro",
        "koName": "야도란",
        "types": [
            "water",
            "psychic"
        ],
        "abilities": [
            "둔감",
            "마이페이스",
            "재생력"
        ],
        "baseStats": {
            "hp": 95,
            "atk": 75,
            "def": 110,
            "spa": 100,
            "spd": 80,
            "spe": 30
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "slowbro-mega",
            "megaTypes": [
                "water",
                "psychic"
            ],
            "megaBaseStats": {
                "hp": 95,
                "atk": 75,
                "def": 180,
                "spa": 130,
                "spd": 80,
                "spe": 30
            }
        },
        "speedPreset": null,
        "aliases": [
            "Slowbro",
            "slowbro",
            "야도란"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/80.png"
    },
    {
        "id": 94,
        "name": "gengar",
        "apiName": "gengar",
        "koName": "팬텀",
        "types": [
            "ghost",
            "poison"
        ],
        "abilities": [
            "저주받은바디"
        ],
        "baseStats": {
            "hp": 60,
            "atk": 65,
            "def": 60,
            "spa": 130,
            "spd": 75,
            "spe": 110
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "gengar-mega",
            "megaTypes": [
                "ghost",
                "poison"
            ],
            "megaBaseStats": {
                "hp": 60,
                "atk": 65,
                "def": 80,
                "spa": 170,
                "spd": 95,
                "spe": 130
            }
        },
        "speedPreset": null,
        "aliases": [
            "Gengar",
            "gengar",
            "팬텀"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/94.png"
    },
    {
        "id": 115,
        "name": "kangaskhan",
        "apiName": "kangaskhan",
        "koName": "캥카",
        "types": [
            "normal"
        ],
        "abilities": [
            "일찍기상",
            "배짱",
            "정신력"
        ],
        "baseStats": {
            "hp": 105,
            "atk": 95,
            "def": 80,
            "spa": 40,
            "spd": 80,
            "spe": 90
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "kangaskhan-mega",
            "megaTypes": [
                "normal"
            ],
            "megaBaseStats": {
                "hp": 105,
                "atk": 125,
                "def": 100,
                "spa": 60,
                "spd": 100,
                "spe": 100
            }
        },
        "speedPreset": null,
        "aliases": [
            "Kangaskhan",
            "kangaskhan",
            "캥카"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/115.png"
    },
    {
        "id": 121,
        "name": "starmie",
        "apiName": "starmie",
        "koName": "아쿠스타",
        "types": [
            "water",
            "psychic"
        ],
        "abilities": [
            "발광",
            "자연회복",
            "애널라이즈"
        ],
        "baseStats": {
            "hp": 60,
            "atk": 75,
            "def": 85,
            "spa": 100,
            "spd": 85,
            "spe": 115
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "starmie-mega",
            "megaTypes": [
                "water",
                "psychic"
            ],
            "megaBaseStats": {
                "hp": 60,
                "atk": 100,
                "def": 105,
                "spa": 130,
                "spd": 105,
                "spe": 120
            }
        },
        "speedPreset": null,
        "aliases": [
            "Starmie",
            "starmie",
            "아쿠스타"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/121.png"
    },
    {
        "id": 127,
        "name": "pinsir",
        "apiName": "pinsir",
        "koName": "쁘사이저",
        "types": [
            "bug"
        ],
        "abilities": [
            "괴력집게",
            "틀깨기",
            "자기과신"
        ],
        "baseStats": {
            "hp": 65,
            "atk": 125,
            "def": 100,
            "spa": 55,
            "spd": 70,
            "spe": 85
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "pinsir-mega",
            "megaTypes": [
                "bug",
                "flying"
            ],
            "megaBaseStats": {
                "hp": 65,
                "atk": 155,
                "def": 120,
                "spa": 65,
                "spd": 90,
                "spe": 105
            }
        },
        "speedPreset": null,
        "aliases": [
            "Pinsir",
            "pinsir",
            "쁘사이저"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/127.png"
    },
    {
        "id": 128,
        "name": "tauros",
        "apiName": "tauros",
        "koName": "켄타로스",
        "types": [
            "normal"
        ],
        "abilities": [
            "위협",
            "분노의경혈",
            "우격다짐"
        ],
        "baseStats": {
            "hp": 75,
            "atk": 100,
            "def": 95,
            "spa": 40,
            "spd": 70,
            "spe": 110
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Tauros",
            "tauros",
            "켄타로스"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/128.png"
    },
    {
        "id": 130,
        "name": "gyarados",
        "apiName": "gyarados",
        "koName": "갸라도스",
        "types": [
            "water",
            "flying"
        ],
        "abilities": [
            "위협",
            "자기과신"
        ],
        "baseStats": {
            "hp": 95,
            "atk": 125,
            "def": 79,
            "spa": 60,
            "spd": 100,
            "spe": 81
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "gyarados-mega",
            "megaTypes": [
                "water",
                "dark"
            ],
            "megaBaseStats": {
                "hp": 95,
                "atk": 155,
                "def": 109,
                "spa": 70,
                "spd": 130,
                "spe": 81
            }
        },
        "speedPreset": null,
        "aliases": [
            "Gyarados",
            "gyarados",
            "갸라도스"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/130.png"
    },
    {
        "id": 132,
        "name": "ditto",
        "apiName": "ditto",
        "koName": "메타몽",
        "types": [
            "normal"
        ],
        "abilities": [
            "유연",
            "괴짜"
        ],
        "baseStats": {
            "hp": 48,
            "atk": 48,
            "def": 48,
            "spa": 48,
            "spd": 48,
            "spe": 48
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Ditto",
            "ditto",
            "메타몽"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/132.png"
    },
    {
        "id": 134,
        "name": "vaporeon",
        "apiName": "vaporeon",
        "koName": "샤미드",
        "types": [
            "water"
        ],
        "abilities": [
            "저수",
            "촉촉바디"
        ],
        "baseStats": {
            "hp": 130,
            "atk": 65,
            "def": 60,
            "spa": 110,
            "spd": 95,
            "spe": 65
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Vaporeon",
            "vaporeon",
            "샤미드"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/134.png"
    },
    {
        "id": 135,
        "name": "jolteon",
        "apiName": "jolteon",
        "koName": "쥬피썬더",
        "types": [
            "electric"
        ],
        "abilities": [
            "축전",
            "속보"
        ],
        "baseStats": {
            "hp": 65,
            "atk": 65,
            "def": 60,
            "spa": 110,
            "spd": 95,
            "spe": 130
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Jolteon",
            "jolteon",
            "쥬피썬더"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/135.png"
    },
    {
        "id": 136,
        "name": "flareon",
        "apiName": "flareon",
        "koName": "부스터",
        "types": [
            "fire"
        ],
        "abilities": [
            "타오르는불꽃",
            "근성"
        ],
        "baseStats": {
            "hp": 65,
            "atk": 130,
            "def": 60,
            "spa": 95,
            "spd": 110,
            "spe": 65
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Flareon",
            "flareon",
            "부스터"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/136.png"
    },
    {
        "id": 142,
        "name": "aerodactyl",
        "apiName": "aerodactyl",
        "koName": "프테라",
        "types": [
            "rock",
            "flying"
        ],
        "abilities": [
            "돌머리",
            "프레셔",
            "긴장감"
        ],
        "baseStats": {
            "hp": 80,
            "atk": 105,
            "def": 65,
            "spa": 60,
            "spd": 75,
            "spe": 130
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "aerodactyl-mega",
            "megaTypes": [
                "rock",
                "flying"
            ],
            "megaBaseStats": {
                "hp": 80,
                "atk": 135,
                "def": 85,
                "spa": 70,
                "spd": 95,
                "spe": 150
            }
        },
        "speedPreset": null,
        "aliases": [
            "Aerodactyl",
            "aerodactyl",
            "프테라"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/142.png"
    },
    {
        "id": 143,
        "name": "snorlax",
        "apiName": "snorlax",
        "koName": "잠만보",
        "types": [
            "normal"
        ],
        "abilities": [
            "면역",
            "두꺼운지방",
            "먹보"
        ],
        "baseStats": {
            "hp": 160,
            "atk": 110,
            "def": 65,
            "spa": 65,
            "spd": 110,
            "spe": 30
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Snorlax",
            "snorlax",
            "잠만보"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/143.png"
    },
    {
        "id": 149,
        "name": "dragonite",
        "apiName": "dragonite",
        "koName": "망나뇽",
        "types": [
            "dragon",
            "flying"
        ],
        "abilities": [
            "정신력",
            "멀티스케일"
        ],
        "baseStats": {
            "hp": 91,
            "atk": 134,
            "def": 95,
            "spa": 100,
            "spd": 100,
            "spe": 80
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "dragonite-mega",
            "megaTypes": [
                "dragon",
                "flying"
            ],
            "megaBaseStats": {
                "hp": 91,
                "atk": 124,
                "def": 115,
                "spa": 145,
                "spd": 125,
                "spe": 100
            }
        },
        "speedPreset": null,
        "aliases": [
            "Dragonite",
            "dragonite",
            "망나뇽"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/149.png"
    },
    {
        "id": 154,
        "name": "meganium",
        "apiName": "meganium",
        "koName": "메가니움",
        "types": [
            "grass"
        ],
        "abilities": [
            "심록",
            "리프가드"
        ],
        "baseStats": {
            "hp": 80,
            "atk": 82,
            "def": 100,
            "spa": 83,
            "spd": 100,
            "spe": 80
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Meganium",
            "meganium",
            "메가니움"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/154.png"
    },
    {
        "id": 157,
        "name": "typhlosion",
        "apiName": "typhlosion",
        "koName": "블레이범",
        "types": [
            "fire"
        ],
        "abilities": [
            "맹화",
            "타오르는불꽃"
        ],
        "baseStats": {
            "hp": 78,
            "atk": 84,
            "def": 78,
            "spa": 109,
            "spd": 85,
            "spe": 100
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Typhlosion",
            "typhlosion",
            "블레이범"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/157.png"
    },
    {
        "id": 160,
        "name": "feraligatr",
        "apiName": "feraligatr",
        "koName": "장크로다일",
        "types": [
            "water"
        ],
        "abilities": [
            "급류",
            "우격다짐"
        ],
        "baseStats": {
            "hp": 85,
            "atk": 105,
            "def": 100,
            "spa": 79,
            "spd": 83,
            "spe": 78
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "feraligatr-mega",
            "megaTypes": [
                "water",
                "dragon"
            ],
            "megaBaseStats": {
                "hp": 85,
                "atk": 160,
                "def": 125,
                "spa": 89,
                "spd": 93,
                "spe": 78
            }
        },
        "speedPreset": null,
        "aliases": [
            "Feraligatr",
            "feraligatr",
            "장크로다일"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/160.png"
    },
    {
        "id": 168,
        "name": "ariados",
        "apiName": "ariados",
        "koName": "아리아도스",
        "types": [
            "bug",
            "poison"
        ],
        "abilities": [
            "벌레의알림",
            "불면",
            "스나이퍼"
        ],
        "baseStats": {
            "hp": 70,
            "atk": 90,
            "def": 70,
            "spa": 60,
            "spd": 70,
            "spe": 40
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Ariados",
            "ariados",
            "아리아도스"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/168.png"
    },
    {
        "id": 181,
        "name": "ampharos",
        "apiName": "ampharos",
        "koName": "전룡",
        "types": [
            "electric"
        ],
        "abilities": [
            "정전기",
            "플러스"
        ],
        "baseStats": {
            "hp": 90,
            "atk": 75,
            "def": 85,
            "spa": 115,
            "spd": 90,
            "spe": 55
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "ampharos-mega",
            "megaTypes": [
                "electric",
                "dragon"
            ],
            "megaBaseStats": {
                "hp": 90,
                "atk": 95,
                "def": 105,
                "spa": 165,
                "spd": 110,
                "spe": 45
            }
        },
        "speedPreset": null,
        "aliases": [
            "Ampharos",
            "ampharos",
            "전룡"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/181.png"
    },
    {
        "id": 184,
        "name": "azumarill",
        "apiName": "azumarill",
        "koName": "마릴리",
        "types": [
            "water",
            "fairy"
        ],
        "abilities": [
            "두꺼운지방",
            "천하장사",
            "초식"
        ],
        "baseStats": {
            "hp": 100,
            "atk": 50,
            "def": 80,
            "spa": 60,
            "spd": 80,
            "spe": 50
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Azumarill",
            "azumarill",
            "마릴리"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/184.png"
    },
    {
        "id": 186,
        "name": "politoed",
        "apiName": "politoed",
        "koName": "왕구리",
        "types": [
            "water"
        ],
        "abilities": [
            "저수",
            "습기",
            "잔비"
        ],
        "baseStats": {
            "hp": 90,
            "atk": 75,
            "def": 75,
            "spa": 90,
            "spd": 100,
            "spe": 70
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Politoed",
            "politoed",
            "왕구리"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/186.png"
    },
    {
        "id": 196,
        "name": "espeon",
        "apiName": "espeon",
        "koName": "에브이",
        "types": [
            "psychic"
        ],
        "abilities": [
            "싱크로",
            "매직미러"
        ],
        "baseStats": {
            "hp": 65,
            "atk": 65,
            "def": 60,
            "spa": 130,
            "spd": 95,
            "spe": 110
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Espeon",
            "espeon",
            "에브이"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/196.png"
    },
    {
        "id": 197,
        "name": "umbreon",
        "apiName": "umbreon",
        "koName": "블래키",
        "types": [
            "dark"
        ],
        "abilities": [
            "싱크로",
            "정신력"
        ],
        "baseStats": {
            "hp": 95,
            "atk": 65,
            "def": 110,
            "spa": 60,
            "spd": 130,
            "spe": 65
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Umbreon",
            "umbreon",
            "블래키"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/197.png"
    },
    {
        "id": 199,
        "name": "slowking",
        "apiName": "slowking",
        "koName": "야도킹",
        "types": [
            "water",
            "psychic"
        ],
        "abilities": [
            "둔감",
            "마이페이스",
            "재생력"
        ],
        "baseStats": {
            "hp": 95,
            "atk": 75,
            "def": 80,
            "spa": 100,
            "spd": 110,
            "spe": 30
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Slowking",
            "slowking",
            "야도킹"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/199.png"
    },
    {
        "id": 205,
        "name": "forretress",
        "apiName": "forretress",
        "koName": "쏘콘",
        "types": [
            "bug",
            "steel"
        ],
        "abilities": [
            "옹골참",
            "방진"
        ],
        "baseStats": {
            "hp": 75,
            "atk": 90,
            "def": 140,
            "spa": 60,
            "spd": 60,
            "spe": 40
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Forretress",
            "forretress",
            "쏘콘"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/205.png"
    },
    {
        "id": 208,
        "name": "steelix",
        "apiName": "steelix",
        "koName": "강철톤",
        "types": [
            "steel",
            "ground"
        ],
        "abilities": [
            "돌머리",
            "옹골참",
            "우격다짐"
        ],
        "baseStats": {
            "hp": 75,
            "atk": 85,
            "def": 200,
            "spa": 55,
            "spd": 65,
            "spe": 30
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "steelix-mega",
            "megaTypes": [
                "steel",
                "ground"
            ],
            "megaBaseStats": {
                "hp": 75,
                "atk": 125,
                "def": 230,
                "spa": 55,
                "spd": 95,
                "spe": 30
            }
        },
        "speedPreset": null,
        "aliases": [
            "Steelix",
            "steelix",
            "강철톤"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/208.png"
    },
    {
        "id": 212,
        "name": "scizor",
        "apiName": "scizor",
        "koName": "핫삼",
        "types": [
            "bug",
            "steel"
        ],
        "abilities": [
            "벌레의알림",
            "테크니션",
            "라이트메탈"
        ],
        "baseStats": {
            "hp": 70,
            "atk": 130,
            "def": 100,
            "spa": 55,
            "spd": 80,
            "spe": 65
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "scizor-mega",
            "megaTypes": [
                "bug",
                "steel"
            ],
            "megaBaseStats": {
                "hp": 70,
                "atk": 150,
                "def": 140,
                "spa": 65,
                "spd": 100,
                "spe": 75
            }
        },
        "speedPreset": null,
        "aliases": [
            "Scizor",
            "scizor",
            "핫삼"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/212.png"
    },
    {
        "id": 214,
        "name": "heracross",
        "apiName": "heracross",
        "koName": "헤라크로스",
        "types": [
            "bug",
            "fighting"
        ],
        "abilities": [
            "벌레의알림",
            "근성",
            "자기과신"
        ],
        "baseStats": {
            "hp": 80,
            "atk": 125,
            "def": 75,
            "spa": 40,
            "spd": 95,
            "spe": 85
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "heracross-mega",
            "megaTypes": [
                "bug",
                "fighting"
            ],
            "megaBaseStats": {
                "hp": 80,
                "atk": 185,
                "def": 115,
                "spa": 40,
                "spd": 105,
                "spe": 75
            }
        },
        "speedPreset": null,
        "aliases": [
            "Heracross",
            "heracross",
            "헤라크로스"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/214.png"
    },
    {
        "id": 227,
        "name": "skarmory",
        "apiName": "skarmory",
        "koName": "무장조",
        "types": [
            "steel",
            "flying"
        ],
        "abilities": [
            "날카로운눈",
            "옹골참",
            "깨어진갑옷"
        ],
        "baseStats": {
            "hp": 65,
            "atk": 80,
            "def": 140,
            "spa": 40,
            "spd": 70,
            "spe": 70
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "skarmory-mega",
            "megaTypes": [
                "steel",
                "flying"
            ],
            "megaBaseStats": {
                "hp": 65,
                "atk": 140,
                "def": 110,
                "spa": 40,
                "spd": 100,
                "spe": 110
            }
        },
        "speedPreset": null,
        "aliases": [
            "Skarmory",
            "skarmory",
            "무장조"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/227.png"
    },
    {
        "id": 229,
        "name": "houndoom",
        "apiName": "houndoom",
        "koName": "헬가",
        "types": [
            "dark",
            "fire"
        ],
        "abilities": [
            "일찍기상",
            "타오르는불꽃",
            "긴장감"
        ],
        "baseStats": {
            "hp": 75,
            "atk": 90,
            "def": 50,
            "spa": 110,
            "spd": 80,
            "spe": 95
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "houndoom-mega",
            "megaTypes": [
                "dark",
                "fire"
            ],
            "megaBaseStats": {
                "hp": 75,
                "atk": 90,
                "def": 90,
                "spa": 140,
                "spd": 90,
                "spe": 115
            }
        },
        "speedPreset": null,
        "aliases": [
            "Houndoom",
            "houndoom",
            "헬가"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/229.png"
    },
    {
        "id": 248,
        "name": "tyranitar",
        "apiName": "tyranitar",
        "koName": "마기라스",
        "types": [
            "rock",
            "dark"
        ],
        "abilities": [
            "모래날림",
            "긴장감"
        ],
        "baseStats": {
            "hp": 100,
            "atk": 134,
            "def": 110,
            "spa": 95,
            "spd": 100,
            "spe": 61
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "tyranitar-mega",
            "megaTypes": [
                "rock",
                "dark"
            ],
            "megaBaseStats": {
                "hp": 100,
                "atk": 164,
                "def": 150,
                "spa": 95,
                "spd": 120,
                "spe": 71
            }
        },
        "speedPreset": null,
        "aliases": [
            "Tyranitar",
            "tyranitar",
            "마기라스"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/248.png"
    },
    {
        "id": 279,
        "name": "pelipper",
        "apiName": "pelipper",
        "koName": "패리퍼",
        "types": [
            "water",
            "flying"
        ],
        "abilities": [
            "날카로운눈",
            "잔비",
            "젖은접시"
        ],
        "baseStats": {
            "hp": 60,
            "atk": 50,
            "def": 100,
            "spa": 95,
            "spd": 70,
            "spe": 65
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Pelipper",
            "pelipper",
            "패리퍼"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/279.png"
    },
    {
        "id": 282,
        "name": "gardevoir",
        "apiName": "gardevoir",
        "koName": "가디안",
        "types": [
            "psychic",
            "fairy"
        ],
        "abilities": [
            "싱크로",
            "트레이스",
            "텔레파시"
        ],
        "baseStats": {
            "hp": 68,
            "atk": 65,
            "def": 65,
            "spa": 125,
            "spd": 115,
            "spe": 80
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "gardevoir-mega",
            "megaTypes": [
                "psychic",
                "fairy"
            ],
            "megaBaseStats": {
                "hp": 68,
                "atk": 85,
                "def": 65,
                "spa": 165,
                "spd": 135,
                "spe": 100
            }
        },
        "speedPreset": null,
        "aliases": [
            "Gardevoir",
            "gardevoir",
            "가디안"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/282.png"
    },
    {
        "id": 302,
        "name": "sableye",
        "apiName": "sableye",
        "koName": "깜까미",
        "types": [
            "dark",
            "ghost"
        ],
        "abilities": [
            "날카로운눈",
            "시간벌기",
            "짓궂은마음"
        ],
        "baseStats": {
            "hp": 50,
            "atk": 75,
            "def": 75,
            "spa": 65,
            "spd": 65,
            "spe": 50
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "sableye-mega",
            "megaTypes": [
                "dark",
                "ghost"
            ],
            "megaBaseStats": {
                "hp": 50,
                "atk": 85,
                "def": 125,
                "spa": 85,
                "spd": 115,
                "spe": 20
            }
        },
        "speedPreset": null,
        "aliases": [
            "Sableye",
            "sableye",
            "깜까미"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/302.png"
    },
    {
        "id": 306,
        "name": "aggron",
        "apiName": "aggron",
        "koName": "보스로라",
        "types": [
            "steel",
            "rock"
        ],
        "abilities": [
            "옹골참",
            "돌머리",
            "헤비메탈"
        ],
        "baseStats": {
            "hp": 70,
            "atk": 110,
            "def": 180,
            "spa": 60,
            "spd": 60,
            "spe": 50
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "aggron-mega",
            "megaTypes": [
                "steel"
            ],
            "megaBaseStats": {
                "hp": 70,
                "atk": 140,
                "def": 230,
                "spa": 60,
                "spd": 80,
                "spe": 50
            }
        },
        "speedPreset": null,
        "aliases": [
            "Aggron",
            "aggron",
            "보스로라"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/306.png"
    },
    {
        "id": 308,
        "name": "medicham",
        "apiName": "medicham",
        "koName": "요가램",
        "types": [
            "fighting",
            "psychic"
        ],
        "abilities": [
            "순수한힘",
            "텔레파시"
        ],
        "baseStats": {
            "hp": 60,
            "atk": 60,
            "def": 75,
            "spa": 60,
            "spd": 75,
            "spe": 80
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "medicham-mega",
            "megaTypes": [
                "fighting",
                "psychic"
            ],
            "megaBaseStats": {
                "hp": 60,
                "atk": 100,
                "def": 85,
                "spa": 80,
                "spd": 85,
                "spe": 100
            }
        },
        "speedPreset": null,
        "aliases": [
            "Medicham",
            "medicham",
            "요가램"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/308.png"
    },
    {
        "id": 310,
        "name": "manectric",
        "apiName": "manectric",
        "koName": "썬더볼트",
        "types": [
            "electric"
        ],
        "abilities": [
            "정전기",
            "피뢰침",
            "마이너스"
        ],
        "baseStats": {
            "hp": 70,
            "atk": 75,
            "def": 60,
            "spa": 105,
            "spd": 60,
            "spe": 105
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "manectric-mega",
            "megaTypes": [
                "electric"
            ],
            "megaBaseStats": {
                "hp": 70,
                "atk": 75,
                "def": 80,
                "spa": 135,
                "spd": 80,
                "spe": 135
            }
        },
        "speedPreset": null,
        "aliases": [
            "Manectric",
            "manectric",
            "썬더볼트"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/310.png"
    },
    {
        "id": 319,
        "name": "sharpedo",
        "apiName": "sharpedo",
        "koName": "샤크니아",
        "types": [
            "water",
            "dark"
        ],
        "abilities": [
            "까칠한피부",
            "가속"
        ],
        "baseStats": {
            "hp": 70,
            "atk": 120,
            "def": 40,
            "spa": 95,
            "spd": 40,
            "spe": 95
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "sharpedo-mega",
            "megaTypes": [
                "water",
                "dark"
            ],
            "megaBaseStats": {
                "hp": 70,
                "atk": 140,
                "def": 70,
                "spa": 110,
                "spd": 65,
                "spe": 105
            }
        },
        "speedPreset": null,
        "aliases": [
            "Sharpedo",
            "sharpedo",
            "샤크니아"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/319.png"
    },
    {
        "id": 323,
        "name": "camerupt",
        "apiName": "camerupt",
        "koName": "폭타",
        "types": [
            "fire",
            "ground"
        ],
        "abilities": [
            "마그마의무장",
            "하드록",
            "분노의경혈"
        ],
        "baseStats": {
            "hp": 70,
            "atk": 100,
            "def": 70,
            "spa": 105,
            "spd": 75,
            "spe": 40
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "camerupt-mega",
            "megaTypes": [
                "fire",
                "ground"
            ],
            "megaBaseStats": {
                "hp": 70,
                "atk": 120,
                "def": 100,
                "spa": 145,
                "spd": 105,
                "spe": 20
            }
        },
        "speedPreset": null,
        "aliases": [
            "Camerupt",
            "camerupt",
            "폭타"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/323.png"
    },
    {
        "id": 324,
        "name": "torkoal",
        "apiName": "torkoal",
        "koName": "코터스",
        "types": [
            "fire"
        ],
        "abilities": [
            "하얀연기",
            "가뭄",
            "조가비갑옷"
        ],
        "baseStats": {
            "hp": 70,
            "atk": 85,
            "def": 140,
            "spa": 85,
            "spd": 70,
            "spe": 20
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Torkoal",
            "torkoal",
            "코터스"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/324.png"
    },
    {
        "id": 334,
        "name": "altaria",
        "apiName": "altaria",
        "koName": "파비코리",
        "types": [
            "dragon",
            "flying"
        ],
        "abilities": [
            "자연회복",
            "날씨부정"
        ],
        "baseStats": {
            "hp": 75,
            "atk": 70,
            "def": 90,
            "spa": 70,
            "spd": 105,
            "spe": 80
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "altaria-mega",
            "megaTypes": [
                "dragon",
                "fairy"
            ],
            "megaBaseStats": {
                "hp": 75,
                "atk": 110,
                "def": 110,
                "spa": 110,
                "spd": 105,
                "spe": 80
            }
        },
        "speedPreset": null,
        "aliases": [
            "Altaria",
            "altaria",
            "파비코리"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/334.png"
    },
    {
        "id": 350,
        "name": "milotic",
        "apiName": "milotic",
        "koName": "밀로틱",
        "types": [
            "water"
        ],
        "abilities": [
            "이상한비늘",
            "승기",
            "헤롱헤롱바디"
        ],
        "baseStats": {
            "hp": 95,
            "atk": 60,
            "def": 79,
            "spa": 100,
            "spd": 125,
            "spe": 81
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Milotic",
            "milotic",
            "밀로틱"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/350.png"
    },
    {
        "id": 351,
        "name": "castform",
        "apiName": "castform",
        "koName": "캐스퐁의 모습",
        "types": [
            "normal"
        ],
        "abilities": [
            "기분파"
        ],
        "baseStats": {
            "hp": 70,
            "atk": 70,
            "def": 70,
            "spa": 70,
            "spd": 70,
            "spe": 70
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Castform",
            "castform",
            "캐스퐁",
            "캐스퐁의 모습"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/351.png"
    },
    {
        "id": 354,
        "name": "banette",
        "apiName": "banette",
        "koName": "다크펫",
        "types": [
            "ghost"
        ],
        "abilities": [
            "불면",
            "통찰",
            "저주받은바디"
        ],
        "baseStats": {
            "hp": 64,
            "atk": 115,
            "def": 65,
            "spa": 83,
            "spd": 63,
            "spe": 65
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "banette-mega",
            "megaTypes": [
                "ghost"
            ],
            "megaBaseStats": {
                "hp": 64,
                "atk": 165,
                "def": 75,
                "spa": 93,
                "spd": 83,
                "spe": 75
            }
        },
        "speedPreset": null,
        "aliases": [
            "Banette",
            "banette",
            "다크펫"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/354.png"
    },
    {
        "id": 358,
        "name": "chimecho",
        "apiName": "chimecho",
        "koName": "치렁",
        "types": [
            "psychic"
        ],
        "abilities": [
            "부유"
        ],
        "baseStats": {
            "hp": 75,
            "atk": 50,
            "def": 80,
            "spa": 95,
            "spd": 90,
            "spe": 65
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "chimecho-mega",
            "megaTypes": [
                "psychic",
                "steel"
            ],
            "megaBaseStats": {
                "hp": 75,
                "atk": 50,
                "def": 110,
                "spa": 135,
                "spd": 120,
                "spe": 65
            }
        },
        "speedPreset": null,
        "aliases": [
            "Chimecho",
            "chimecho",
            "치렁"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/358.png"
    },
    {
        "id": 359,
        "name": "absol",
        "apiName": "absol",
        "koName": "앱솔",
        "types": [
            "dark"
        ],
        "abilities": [
            "프레셔",
            "대운",
            "정의의마음"
        ],
        "baseStats": {
            "hp": 65,
            "atk": 130,
            "def": 60,
            "spa": 75,
            "spd": 60,
            "spe": 75
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "absol-mega",
            "megaTypes": [
                "dark"
            ],
            "megaBaseStats": {
                "hp": 65,
                "atk": 150,
                "def": 60,
                "spa": 115,
                "spd": 60,
                "spe": 115
            }
        },
        "speedPreset": null,
        "aliases": [
            "Absol",
            "absol",
            "앱솔"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/359.png"
    },
    {
        "id": 362,
        "name": "glalie",
        "apiName": "glalie",
        "koName": "얼음귀신",
        "types": [
            "ice"
        ],
        "abilities": [
            "정신력",
            "아이스바디",
            "변덕쟁이"
        ],
        "baseStats": {
            "hp": 80,
            "atk": 80,
            "def": 80,
            "spa": 80,
            "spd": 80,
            "spe": 80
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "glalie-mega",
            "megaTypes": [
                "ice"
            ],
            "megaBaseStats": {
                "hp": 80,
                "atk": 120,
                "def": 80,
                "spa": 120,
                "spd": 80,
                "spe": 100
            }
        },
        "speedPreset": null,
        "aliases": [
            "Glalie",
            "glalie",
            "얼음귀신"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/362.png"
    },
    {
        "id": 389,
        "name": "torterra",
        "apiName": "torterra",
        "koName": "토대부기",
        "types": [
            "grass",
            "ground"
        ],
        "abilities": [
            "심록",
            "조가비갑옷"
        ],
        "baseStats": {
            "hp": 95,
            "atk": 109,
            "def": 105,
            "spa": 75,
            "spd": 85,
            "spe": 56
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Torterra",
            "torterra",
            "토대부기"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/389.png"
    },
    {
        "id": 392,
        "name": "infernape",
        "apiName": "infernape",
        "koName": "초염몽",
        "types": [
            "fire",
            "fighting"
        ],
        "abilities": [
            "맹화",
            "철주먹"
        ],
        "baseStats": {
            "hp": 76,
            "atk": 104,
            "def": 71,
            "spa": 104,
            "spd": 71,
            "spe": 108
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Infernape",
            "infernape",
            "초염몽"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/392.png"
    },
    {
        "id": 395,
        "name": "empoleon",
        "apiName": "empoleon",
        "koName": "엠페르트",
        "types": [
            "water",
            "steel"
        ],
        "abilities": [
            "급류",
            "승기"
        ],
        "baseStats": {
            "hp": 84,
            "atk": 86,
            "def": 88,
            "spa": 111,
            "spd": 101,
            "spe": 60
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Empoleon",
            "empoleon",
            "엠페르트"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/395.png"
    },
    {
        "id": 405,
        "name": "luxray",
        "apiName": "luxray",
        "koName": "렌트라",
        "types": [
            "electric"
        ],
        "abilities": [
            "투쟁심",
            "위협",
            "근성"
        ],
        "baseStats": {
            "hp": 80,
            "atk": 120,
            "def": 79,
            "spa": 95,
            "spd": 79,
            "spe": 70
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Luxray",
            "luxray",
            "렌트라"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/405.png"
    },
    {
        "id": 407,
        "name": "roserade",
        "apiName": "roserade",
        "koName": "로즈레이드",
        "types": [
            "grass",
            "poison"
        ],
        "abilities": [
            "자연회복",
            "독가시",
            "테크니션"
        ],
        "baseStats": {
            "hp": 60,
            "atk": 70,
            "def": 65,
            "spa": 125,
            "spd": 105,
            "spe": 90
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Roserade",
            "roserade",
            "로즈레이드"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/407.png"
    },
    {
        "id": 409,
        "name": "rampardos",
        "apiName": "rampardos",
        "koName": "램펄드",
        "types": [
            "rock"
        ],
        "abilities": [
            "틀깨기",
            "우격다짐"
        ],
        "baseStats": {
            "hp": 97,
            "atk": 165,
            "def": 60,
            "spa": 65,
            "spd": 50,
            "spe": 58
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Rampardos",
            "rampardos",
            "램펄드"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/409.png"
    },
    {
        "id": 411,
        "name": "bastiodon",
        "apiName": "bastiodon",
        "koName": "바리톱스",
        "types": [
            "rock",
            "steel"
        ],
        "abilities": [
            "옹골참",
            "방음"
        ],
        "baseStats": {
            "hp": 60,
            "atk": 52,
            "def": 168,
            "spa": 47,
            "spd": 138,
            "spe": 30
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Bastiodon",
            "bastiodon",
            "바리톱스"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/411.png"
    },
    {
        "id": 428,
        "name": "lopunny",
        "apiName": "lopunny",
        "koName": "이어롭",
        "types": [
            "normal"
        ],
        "abilities": [
            "헤롱헤롱바디",
            "서투름",
            "유연"
        ],
        "baseStats": {
            "hp": 65,
            "atk": 76,
            "def": 84,
            "spa": 54,
            "spd": 96,
            "spe": 105
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "lopunny-mega",
            "megaTypes": [
                "normal",
                "fighting"
            ],
            "megaBaseStats": {
                "hp": 65,
                "atk": 136,
                "def": 94,
                "spa": 54,
                "spd": 96,
                "spe": 135
            }
        },
        "speedPreset": null,
        "aliases": [
            "Lopunny",
            "lopunny",
            "이어롭"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/428.png"
    },
    {
        "id": 442,
        "name": "spiritomb",
        "apiName": "spiritomb",
        "koName": "화강돌",
        "types": [
            "ghost",
            "dark"
        ],
        "abilities": [
            "프레셔",
            "틈새포착"
        ],
        "baseStats": {
            "hp": 50,
            "atk": 92,
            "def": 108,
            "spa": 92,
            "spd": 108,
            "spe": 35
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Spiritomb",
            "spiritomb",
            "화강돌"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/442.png"
    },
    {
        "id": 445,
        "name": "garchomp",
        "apiName": "garchomp",
        "koName": "한카리아스",
        "types": [
            "dragon",
            "ground"
        ],
        "abilities": [
            "모래숨기",
            "까칠한피부"
        ],
        "baseStats": {
            "hp": 108,
            "atk": 130,
            "def": 95,
            "spa": 80,
            "spd": 85,
            "spe": 102
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "garchomp-mega",
            "megaTypes": [
                "dragon",
                "ground"
            ],
            "megaBaseStats": {
                "hp": 108,
                "atk": 170,
                "def": 115,
                "spa": 120,
                "spd": 95,
                "spe": 92
            }
        },
        "speedPreset": null,
        "aliases": [
            "Garchomp",
            "garchomp",
            "한카리아스"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/445.png"
    },
    {
        "id": 448,
        "name": "lucario",
        "apiName": "lucario",
        "koName": "루카리오",
        "types": [
            "fighting",
            "steel"
        ],
        "abilities": [
            "불굴의마음",
            "정신력",
            "정의의마음"
        ],
        "baseStats": {
            "hp": 70,
            "atk": 110,
            "def": 70,
            "spa": 115,
            "spd": 70,
            "spe": 90
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "lucario-mega",
            "megaTypes": [
                "fighting",
                "steel"
            ],
            "megaBaseStats": {
                "hp": 70,
                "atk": 145,
                "def": 88,
                "spa": 140,
                "spd": 70,
                "spe": 112
            }
        },
        "speedPreset": null,
        "aliases": [
            "Lucario",
            "lucario",
            "루카리오"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/448.png"
    },
    {
        "id": 450,
        "name": "hippowdon",
        "apiName": "hippowdon",
        "koName": "하마돈",
        "types": [
            "ground"
        ],
        "abilities": [
            "모래날림",
            "모래의힘"
        ],
        "baseStats": {
            "hp": 108,
            "atk": 112,
            "def": 118,
            "spa": 68,
            "spd": 72,
            "spe": 47
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Hippowdon",
            "hippowdon",
            "하마돈"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/450.png"
    },
    {
        "id": 454,
        "name": "toxicroak",
        "apiName": "toxicroak",
        "koName": "독개굴",
        "types": [
            "poison",
            "fighting"
        ],
        "abilities": [
            "위험예지",
            "건조피부",
            "독수"
        ],
        "baseStats": {
            "hp": 83,
            "atk": 106,
            "def": 65,
            "spa": 86,
            "spd": 65,
            "spe": 85
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Toxicroak",
            "toxicroak",
            "독개굴"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/454.png"
    },
    {
        "id": 460,
        "name": "abomasnow",
        "apiName": "abomasnow",
        "koName": "눈설왕",
        "types": [
            "grass",
            "ice"
        ],
        "abilities": [
            "눈퍼뜨리기",
            "방음"
        ],
        "baseStats": {
            "hp": 90,
            "atk": 92,
            "def": 75,
            "spa": 92,
            "spd": 85,
            "spe": 60
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "abomasnow-mega",
            "megaTypes": [
                "grass",
                "ice"
            ],
            "megaBaseStats": {
                "hp": 90,
                "atk": 132,
                "def": 105,
                "spa": 132,
                "spd": 105,
                "spe": 30
            }
        },
        "speedPreset": null,
        "aliases": [
            "Abomasnow",
            "abomasnow",
            "눈설왕"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/460.png"
    },
    {
        "id": 461,
        "name": "weavile",
        "apiName": "weavile",
        "koName": "포푸니라",
        "types": [
            "dark",
            "ice"
        ],
        "abilities": [
            "프레셔",
            "나쁜손버릇"
        ],
        "baseStats": {
            "hp": 70,
            "atk": 120,
            "def": 65,
            "spa": 45,
            "spd": 85,
            "spe": 125
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Weavile",
            "weavile",
            "포푸니라"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/461.png"
    },
    {
        "id": 464,
        "name": "rhyperior",
        "apiName": "rhyperior",
        "koName": "거대코뿌리",
        "types": [
            "ground",
            "rock"
        ],
        "abilities": [
            "피뢰침",
            "하드록",
            "이판사판"
        ],
        "baseStats": {
            "hp": 115,
            "atk": 140,
            "def": 130,
            "spa": 55,
            "spd": 55,
            "spe": 40
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Rhyperior",
            "rhyperior",
            "거대코뿌리"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/464.png"
    },
    {
        "id": 470,
        "name": "leafeon",
        "apiName": "leafeon",
        "koName": "리피아",
        "types": [
            "grass"
        ],
        "abilities": [
            "리프가드",
            "엽록소"
        ],
        "baseStats": {
            "hp": 65,
            "atk": 110,
            "def": 130,
            "spa": 60,
            "spd": 65,
            "spe": 95
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Leafeon",
            "leafeon",
            "리피아"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/470.png"
    },
    {
        "id": 471,
        "name": "glaceon",
        "apiName": "glaceon",
        "koName": "글레이시아",
        "types": [
            "ice"
        ],
        "abilities": [
            "눈숨기",
            "아이스바디"
        ],
        "baseStats": {
            "hp": 65,
            "atk": 60,
            "def": 110,
            "spa": 130,
            "spd": 95,
            "spe": 65
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Glaceon",
            "glaceon",
            "글레이시아"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/471.png"
    },
    {
        "id": 472,
        "name": "gliscor",
        "apiName": "gliscor",
        "koName": "글라이온",
        "types": [
            "ground",
            "flying"
        ],
        "abilities": [
            "괴력집게",
            "모래숨기",
            "포이즌힐"
        ],
        "baseStats": {
            "hp": 75,
            "atk": 95,
            "def": 125,
            "spa": 45,
            "spd": 75,
            "spe": 95
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Gliscor",
            "gliscor",
            "글라이온"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/472.png"
    },
    {
        "id": 473,
        "name": "mamoswine",
        "apiName": "mamoswine",
        "koName": "맘모꾸리",
        "types": [
            "ice",
            "ground"
        ],
        "abilities": [
            "둔감",
            "눈숨기",
            "두꺼운지방"
        ],
        "baseStats": {
            "hp": 110,
            "atk": 130,
            "def": 80,
            "spa": 70,
            "spd": 60,
            "spe": 80
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mamoswine",
            "mamoswine",
            "맘모꾸리"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/473.png"
    },
    {
        "id": 475,
        "name": "gallade",
        "apiName": "gallade",
        "koName": "엘레이드",
        "types": [
            "psychic",
            "fighting"
        ],
        "abilities": [
            "불굴의마음",
            "Sharpness",
            "정의의마음"
        ],
        "baseStats": {
            "hp": 68,
            "atk": 125,
            "def": 65,
            "spa": 65,
            "spd": 115,
            "spe": 80
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "gallade-mega",
            "megaTypes": [
                "psychic",
                "fighting"
            ],
            "megaBaseStats": {
                "hp": 68,
                "atk": 165,
                "def": 95,
                "spa": 65,
                "spd": 115,
                "spe": 110
            }
        },
        "speedPreset": null,
        "aliases": [
            "Gallade",
            "gallade",
            "엘레이드"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/475.png"
    },
    {
        "id": 478,
        "name": "froslass",
        "apiName": "froslass",
        "koName": "눈여아",
        "types": [
            "ice",
            "ghost"
        ],
        "abilities": [
            "눈숨기",
            "저주받은바디"
        ],
        "baseStats": {
            "hp": 70,
            "atk": 80,
            "def": 70,
            "spa": 80,
            "spd": 70,
            "spe": 110
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "froslass-mega",
            "megaTypes": [
                "ice",
                "ghost"
            ],
            "megaBaseStats": {
                "hp": 70,
                "atk": 80,
                "def": 70,
                "spa": 140,
                "spd": 100,
                "spe": 120
            }
        },
        "speedPreset": null,
        "aliases": [
            "Froslass",
            "froslass",
            "눈여아"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/478.png"
    },
    {
        "id": 479,
        "name": "rotom",
        "apiName": "rotom",
        "koName": "로토무의 모습",
        "types": [
            "electric",
            "ghost"
        ],
        "abilities": [
            "부유"
        ],
        "baseStats": {
            "hp": 50,
            "atk": 50,
            "def": 77,
            "spa": 95,
            "spd": 77,
            "spe": 91
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Rotom",
            "rotom",
            "로토무",
            "로토무의 모습"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/479.png"
    },
    {
        "id": 10008,
        "name": "rotom-heat",
        "apiName": "rotom-heat",
        "koName": "히트로토무",
        "types": [
            "electric",
            "fire"
        ],
        "abilities": [
            "부유"
        ],
        "baseStats": {
            "hp": 50,
            "atk": 65,
            "def": 107,
            "spa": 105,
            "spd": 107,
            "spe": 86
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Heat Rotom",
            "rotom",
            "rotom-heat",
            "로토무",
            "히트로토무"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10008.png"
    },
    {
        "id": 10009,
        "name": "rotom-wash",
        "apiName": "rotom-wash",
        "koName": "워시로토무",
        "types": [
            "electric",
            "water"
        ],
        "abilities": [
            "부유"
        ],
        "baseStats": {
            "hp": 50,
            "atk": 65,
            "def": 107,
            "spa": 105,
            "spd": 107,
            "spe": 86
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Wash Rotom",
            "rotom",
            "rotom-wash",
            "로토무",
            "워시로토무"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10009.png"
    },
    {
        "id": 10010,
        "name": "rotom-frost",
        "apiName": "rotom-frost",
        "koName": "프로스트로토무",
        "types": [
            "electric",
            "ice"
        ],
        "abilities": [
            "부유"
        ],
        "baseStats": {
            "hp": 50,
            "atk": 65,
            "def": 107,
            "spa": 105,
            "spd": 107,
            "spe": 86
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Frost Rotom",
            "rotom",
            "rotom-frost",
            "로토무",
            "프로스트로토무"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10010.png"
    },
    {
        "id": 10011,
        "name": "rotom-fan",
        "apiName": "rotom-fan",
        "koName": "스핀로토무",
        "types": [
            "electric",
            "flying"
        ],
        "abilities": [
            "부유"
        ],
        "baseStats": {
            "hp": 50,
            "atk": 65,
            "def": 107,
            "spa": 105,
            "spd": 107,
            "spe": 86
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Fan Rotom",
            "rotom",
            "rotom-fan",
            "로토무",
            "스핀로토무"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10011.png"
    },
    {
        "id": 10012,
        "name": "rotom-mow",
        "apiName": "rotom-mow",
        "koName": "커트로토무",
        "types": [
            "electric",
            "grass"
        ],
        "abilities": [
            "부유"
        ],
        "baseStats": {
            "hp": 50,
            "atk": 65,
            "def": 107,
            "spa": 105,
            "spd": 107,
            "spe": 86
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mow Rotom",
            "rotom",
            "rotom-mow",
            "로토무",
            "커트로토무"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10012.png"
    },
    {
        "id": 497,
        "name": "serperior",
        "apiName": "serperior",
        "koName": "샤로다",
        "types": [
            "grass"
        ],
        "abilities": [
            "심록",
            "심술꾸러기"
        ],
        "baseStats": {
            "hp": 75,
            "atk": 75,
            "def": 95,
            "spa": 75,
            "spd": 95,
            "spe": 113
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Serperior",
            "serperior",
            "샤로다"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/497.png"
    },
    {
        "id": 500,
        "name": "emboar",
        "apiName": "emboar",
        "koName": "염무왕",
        "types": [
            "fire",
            "fighting"
        ],
        "abilities": [
            "맹화",
            "이판사판"
        ],
        "baseStats": {
            "hp": 110,
            "atk": 123,
            "def": 65,
            "spa": 100,
            "spd": 65,
            "spe": 65
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "emboar-mega",
            "megaTypes": [
                "fire",
                "fighting"
            ],
            "megaBaseStats": {
                "hp": 110,
                "atk": 148,
                "def": 75,
                "spa": 110,
                "spd": 110,
                "spe": 75
            }
        },
        "speedPreset": null,
        "aliases": [
            "Emboar",
            "emboar",
            "염무왕"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/500.png"
    },
    {
        "id": 503,
        "name": "samurott",
        "apiName": "samurott",
        "koName": "대검귀",
        "types": [
            "water"
        ],
        "abilities": [
            "급류",
            "조가비갑옷"
        ],
        "baseStats": {
            "hp": 95,
            "atk": 100,
            "def": 85,
            "spa": 108,
            "spd": 70,
            "spe": 70
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Samurott",
            "samurott",
            "대검귀"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/503.png"
    },
    {
        "id": 505,
        "name": "watchog",
        "apiName": "watchog",
        "koName": "보르그",
        "types": [
            "normal"
        ],
        "abilities": [
            "발광",
            "날카로운눈",
            "애널라이즈"
        ],
        "baseStats": {
            "hp": 60,
            "atk": 85,
            "def": 69,
            "spa": 60,
            "spd": 69,
            "spe": 77
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Watchog",
            "watchog",
            "보르그"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/505.png"
    },
    {
        "id": 510,
        "name": "liepard",
        "apiName": "liepard",
        "koName": "레파르다스",
        "types": [
            "dark"
        ],
        "abilities": [
            "유연",
            "곡예",
            "짓궂은마음"
        ],
        "baseStats": {
            "hp": 64,
            "atk": 88,
            "def": 50,
            "spa": 88,
            "spd": 50,
            "spe": 106
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Liepard",
            "liepard",
            "레파르다스"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/510.png"
    },
    {
        "id": 512,
        "name": "simisage",
        "apiName": "simisage",
        "koName": "야나키",
        "types": [
            "grass"
        ],
        "abilities": [
            "먹보",
            "심록"
        ],
        "baseStats": {
            "hp": 75,
            "atk": 98,
            "def": 63,
            "spa": 98,
            "spd": 63,
            "spe": 101
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Simisage",
            "simisage",
            "야나키"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/512.png"
    },
    {
        "id": 514,
        "name": "simisear",
        "apiName": "simisear",
        "koName": "바오키",
        "types": [
            "fire"
        ],
        "abilities": [
            "먹보",
            "맹화"
        ],
        "baseStats": {
            "hp": 75,
            "atk": 98,
            "def": 63,
            "spa": 98,
            "spd": 63,
            "spe": 101
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Simisear",
            "simisear",
            "바오키"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/514.png"
    },
    {
        "id": 516,
        "name": "simipour",
        "apiName": "simipour",
        "koName": "앗차키",
        "types": [
            "water"
        ],
        "abilities": [
            "먹보",
            "급류"
        ],
        "baseStats": {
            "hp": 75,
            "atk": 98,
            "def": 63,
            "spa": 98,
            "spd": 63,
            "spe": 101
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Simipour",
            "simipour",
            "앗차키"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/516.png"
    },
    {
        "id": 530,
        "name": "excadrill",
        "apiName": "excadrill",
        "koName": "몰드류",
        "types": [
            "ground",
            "steel"
        ],
        "abilities": [
            "모래헤치기",
            "모래의힘",
            "틀깨기"
        ],
        "baseStats": {
            "hp": 110,
            "atk": 135,
            "def": 60,
            "spa": 50,
            "spd": 65,
            "spe": 88
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "excadrill-mega",
            "megaTypes": [
                "ground",
                "steel"
            ],
            "megaBaseStats": {
                "hp": 110,
                "atk": 165,
                "def": 100,
                "spa": 65,
                "spd": 65,
                "spe": 103
            }
        },
        "speedPreset": null,
        "aliases": [
            "Excadrill",
            "excadrill",
            "몰드류"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/530.png"
    },
    {
        "id": 531,
        "name": "audino",
        "apiName": "audino",
        "koName": "다부니",
        "types": [
            "normal"
        ],
        "abilities": [
            "치유의마음",
            "재생력",
            "서투름"
        ],
        "baseStats": {
            "hp": 103,
            "atk": 60,
            "def": 86,
            "spa": 60,
            "spd": 86,
            "spe": 50
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "audino-mega",
            "megaTypes": [
                "normal",
                "fairy"
            ],
            "megaBaseStats": {
                "hp": 103,
                "atk": 60,
                "def": 126,
                "spa": 80,
                "spd": 126,
                "spe": 50
            }
        },
        "speedPreset": null,
        "aliases": [
            "Audino",
            "audino",
            "다부니"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/531.png"
    },
    {
        "id": 534,
        "name": "conkeldurr",
        "apiName": "conkeldurr",
        "koName": "노보청",
        "types": [
            "fighting"
        ],
        "abilities": [
            "근성",
            "우격다짐",
            "철주먹"
        ],
        "baseStats": {
            "hp": 105,
            "atk": 140,
            "def": 95,
            "spa": 55,
            "spd": 65,
            "spe": 45
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Conkeldurr",
            "conkeldurr",
            "노보청"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/534.png"
    },
    {
        "id": 547,
        "name": "whimsicott",
        "apiName": "whimsicott",
        "koName": "엘풍",
        "types": [
            "grass",
            "fairy"
        ],
        "abilities": [
            "짓궂은마음",
            "틈새포착",
            "엽록소"
        ],
        "baseStats": {
            "hp": 60,
            "atk": 67,
            "def": 85,
            "spa": 77,
            "spd": 75,
            "spe": 116
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Whimsicott",
            "whimsicott",
            "엘풍"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/547.png"
    },
    {
        "id": 553,
        "name": "krookodile",
        "apiName": "krookodile",
        "koName": "악비아르",
        "types": [
            "ground",
            "dark"
        ],
        "abilities": [
            "위협",
            "자기과신",
            "분노의경혈"
        ],
        "baseStats": {
            "hp": 95,
            "atk": 117,
            "def": 80,
            "spa": 65,
            "spd": 70,
            "spe": 92
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Krookodile",
            "krookodile",
            "악비아르"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/553.png"
    },
    {
        "id": 563,
        "name": "cofagrigus",
        "apiName": "cofagrigus",
        "koName": "데스니칸",
        "types": [
            "ghost"
        ],
        "abilities": [
            "미라"
        ],
        "baseStats": {
            "hp": 58,
            "atk": 50,
            "def": 145,
            "spa": 95,
            "spd": 105,
            "spe": 30
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Cofagrigus",
            "cofagrigus",
            "데스니칸"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/563.png"
    },
    {
        "id": 569,
        "name": "garbodor",
        "apiName": "garbodor",
        "koName": "더스트나",
        "types": [
            "poison"
        ],
        "abilities": [
            "악취",
            "깨어진갑옷",
            "유폭"
        ],
        "baseStats": {
            "hp": 80,
            "atk": 95,
            "def": 82,
            "spa": 60,
            "spd": 82,
            "spe": 75
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Garbodor",
            "garbodor",
            "더스트나"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/569.png"
    },
    {
        "id": 571,
        "name": "zoroark",
        "apiName": "zoroark",
        "koName": "조로아크",
        "types": [
            "dark"
        ],
        "abilities": [
            "일루전"
        ],
        "baseStats": {
            "hp": 60,
            "atk": 105,
            "def": 60,
            "spa": 120,
            "spd": 60,
            "spe": 105
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Zoroark",
            "zoroark",
            "조로아크"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/571.png"
    },
    {
        "id": 579,
        "name": "reuniclus",
        "apiName": "reuniclus",
        "koName": "란쿨루스",
        "types": [
            "psychic"
        ],
        "abilities": [
            "방진",
            "매직가드",
            "재생력"
        ],
        "baseStats": {
            "hp": 110,
            "atk": 65,
            "def": 75,
            "spa": 125,
            "spd": 85,
            "spe": 30
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Reuniclus",
            "reuniclus",
            "란쿨루스"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/579.png"
    },
    {
        "id": 584,
        "name": "vanilluxe",
        "apiName": "vanilluxe",
        "koName": "배바닐라",
        "types": [
            "ice"
        ],
        "abilities": [
            "아이스바디",
            "눈퍼뜨리기",
            "깨어진갑옷"
        ],
        "baseStats": {
            "hp": 71,
            "atk": 95,
            "def": 85,
            "spa": 110,
            "spd": 95,
            "spe": 79
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Vanilluxe",
            "vanilluxe",
            "배바닐라"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/584.png"
    },
    {
        "id": 587,
        "name": "emolga",
        "apiName": "emolga",
        "koName": "에몽가",
        "types": [
            "electric",
            "flying"
        ],
        "abilities": [
            "정전기",
            "전기엔진"
        ],
        "baseStats": {
            "hp": 55,
            "atk": 75,
            "def": 60,
            "spa": 75,
            "spd": 60,
            "spe": 103
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Emolga",
            "emolga",
            "에몽가"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/587.png"
    },
    {
        "id": 609,
        "name": "chandelure",
        "apiName": "chandelure",
        "koName": "샹델라",
        "types": [
            "ghost",
            "fire"
        ],
        "abilities": [
            "타오르는불꽃",
            "불꽃몸",
            "틈새포착"
        ],
        "baseStats": {
            "hp": 60,
            "atk": 55,
            "def": 90,
            "spa": 145,
            "spd": 90,
            "spe": 80
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "chandelure-mega",
            "megaTypes": [
                "ghost",
                "fire"
            ],
            "megaBaseStats": {
                "hp": 60,
                "atk": 75,
                "def": 110,
                "spa": 175,
                "spd": 110,
                "spe": 90
            }
        },
        "speedPreset": null,
        "aliases": [
            "Chandelure",
            "chandelure",
            "샹델라"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/609.png"
    },
    {
        "id": 614,
        "name": "beartic",
        "apiName": "beartic",
        "koName": "툰베어",
        "types": [
            "ice"
        ],
        "abilities": [
            "눈숨기",
            "눈치우기",
            "쓱쓱"
        ],
        "baseStats": {
            "hp": 95,
            "atk": 130,
            "def": 80,
            "spa": 70,
            "spd": 80,
            "spe": 50
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Beartic",
            "beartic",
            "툰베어"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/614.png"
    },
    {
        "id": 618,
        "name": "stunfisk",
        "apiName": "stunfisk",
        "koName": "메더",
        "types": [
            "ground",
            "electric"
        ],
        "abilities": [
            "정전기",
            "유연",
            "모래숨기"
        ],
        "baseStats": {
            "hp": 109,
            "atk": 66,
            "def": 84,
            "spa": 81,
            "spd": 99,
            "spe": 32
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Stunfisk",
            "stunfisk",
            "메더"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/618.png"
    },
    {
        "id": 623,
        "name": "golurk",
        "apiName": "golurk",
        "koName": "골루그",
        "types": [
            "ground",
            "ghost"
        ],
        "abilities": [
            "철주먹",
            "서투름",
            "노가드"
        ],
        "baseStats": {
            "hp": 89,
            "atk": 124,
            "def": 80,
            "spa": 55,
            "spd": 80,
            "spe": 55
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "golurk-mega",
            "megaTypes": [
                "ground",
                "ghost"
            ],
            "megaBaseStats": {
                "hp": 89,
                "atk": 159,
                "def": 105,
                "spa": 70,
                "spd": 105,
                "spe": 55
            }
        },
        "speedPreset": null,
        "aliases": [
            "Golurk",
            "golurk",
            "골루그"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/623.png"
    },
    {
        "id": 635,
        "name": "hydreigon",
        "apiName": "hydreigon",
        "koName": "삼삼드래",
        "types": [
            "dark",
            "dragon"
        ],
        "abilities": [
            "부유"
        ],
        "baseStats": {
            "hp": 92,
            "atk": 105,
            "def": 90,
            "spa": 125,
            "spd": 90,
            "spe": 98
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Hydreigon",
            "hydreigon",
            "삼삼드래"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/635.png"
    },
    {
        "id": 637,
        "name": "volcarona",
        "apiName": "volcarona",
        "koName": "불카모스",
        "types": [
            "bug",
            "fire"
        ],
        "abilities": [
            "불꽃몸",
            "벌레의알림"
        ],
        "baseStats": {
            "hp": 85,
            "atk": 60,
            "def": 65,
            "spa": 135,
            "spd": 105,
            "spe": 100
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Volcarona",
            "volcarona",
            "불카모스"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/637.png"
    },
    {
        "id": 652,
        "name": "chesnaught",
        "apiName": "chesnaught",
        "koName": "브리가론",
        "types": [
            "grass",
            "fighting"
        ],
        "abilities": [
            "심록",
            "방탄"
        ],
        "baseStats": {
            "hp": 88,
            "atk": 107,
            "def": 122,
            "spa": 74,
            "spd": 75,
            "spe": 64
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "chesnaught-mega",
            "megaTypes": [
                "grass",
                "fighting"
            ],
            "megaBaseStats": {
                "hp": 88,
                "atk": 137,
                "def": 172,
                "spa": 74,
                "spd": 115,
                "spe": 44
            }
        },
        "speedPreset": null,
        "aliases": [
            "Chesnaught",
            "chesnaught",
            "브리가론"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/652.png"
    },
    {
        "id": 655,
        "name": "delphox",
        "apiName": "delphox",
        "koName": "마폭시",
        "types": [
            "fire",
            "psychic"
        ],
        "abilities": [
            "맹화",
            "매지션"
        ],
        "baseStats": {
            "hp": 75,
            "atk": 69,
            "def": 72,
            "spa": 114,
            "spd": 100,
            "spe": 104
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "delphox-mega",
            "megaTypes": [
                "fire",
                "psychic"
            ],
            "megaBaseStats": {
                "hp": 75,
                "atk": 69,
                "def": 72,
                "spa": 159,
                "spd": 125,
                "spe": 134
            }
        },
        "speedPreset": null,
        "aliases": [
            "Delphox",
            "delphox",
            "마폭시"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/655.png"
    },
    {
        "id": 658,
        "name": "greninja",
        "apiName": "greninja",
        "koName": "개굴닌자",
        "types": [
            "water",
            "dark"
        ],
        "abilities": [
            "급류",
            "변환자재"
        ],
        "baseStats": {
            "hp": 72,
            "atk": 95,
            "def": 67,
            "spa": 103,
            "spd": 71,
            "spe": 122
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "greninja-mega",
            "megaTypes": [
                "water",
                "dark"
            ],
            "megaBaseStats": {
                "hp": 72,
                "atk": 125,
                "def": 77,
                "spa": 133,
                "spd": 81,
                "spe": 142
            }
        },
        "speedPreset": null,
        "aliases": [
            "Greninja",
            "greninja",
            "개굴닌자"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/658.png"
    },
    {
        "id": 660,
        "name": "diggersby",
        "apiName": "diggersby",
        "koName": "파르토",
        "types": [
            "normal",
            "ground"
        ],
        "abilities": [
            "픽업",
            "볼주머니",
            "천하장사"
        ],
        "baseStats": {
            "hp": 85,
            "atk": 56,
            "def": 77,
            "spa": 50,
            "spd": 77,
            "spe": 78
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Diggersby",
            "diggersby",
            "파르토"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/660.png"
    },
    {
        "id": 663,
        "name": "talonflame",
        "apiName": "talonflame",
        "koName": "파이어로",
        "types": [
            "fire",
            "flying"
        ],
        "abilities": [
            "불꽃몸",
            "질풍날개"
        ],
        "baseStats": {
            "hp": 78,
            "atk": 81,
            "def": 71,
            "spa": 74,
            "spd": 69,
            "spe": 126
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Talonflame",
            "talonflame",
            "파이어로"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/663.png"
    },
    {
        "id": 666,
        "name": "vivillon",
        "apiName": "vivillon",
        "koName": "비비용",
        "types": [
            "bug",
            "flying"
        ],
        "abilities": [
            "인분",
            "복안",
            "프렌드가드"
        ],
        "baseStats": {
            "hp": 80,
            "atk": 52,
            "def": 50,
            "spa": 90,
            "spd": 50,
            "spe": 89
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Vivillon",
            "vivillon",
            "비비용"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/666.png"
    },
    {
        "id": 671,
        "name": "florges",
        "apiName": "florges",
        "koName": "플라제스",
        "types": [
            "fairy"
        ],
        "abilities": [
            "플라워베일",
            "공생"
        ],
        "baseStats": {
            "hp": 78,
            "atk": 65,
            "def": 68,
            "spa": 112,
            "spd": 154,
            "spe": 75
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Florges",
            "florges",
            "플라제스"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/671.png"
    },
    {
        "id": 675,
        "name": "pangoro",
        "apiName": "pangoro",
        "koName": "부란다",
        "types": [
            "fighting",
            "dark"
        ],
        "abilities": [
            "철주먹",
            "틀깨기",
            "배짱"
        ],
        "baseStats": {
            "hp": 95,
            "atk": 124,
            "def": 78,
            "spa": 69,
            "spd": 71,
            "spe": 58
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Pangoro",
            "pangoro",
            "부란다"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/675.png"
    },
    {
        "id": 676,
        "name": "furfrou",
        "apiName": "furfrou",
        "koName": "트리미앙",
        "types": [
            "normal"
        ],
        "abilities": [
            "퍼코트"
        ],
        "baseStats": {
            "hp": 75,
            "atk": 80,
            "def": 60,
            "spa": 65,
            "spd": 90,
            "spe": 102
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Furfrou",
            "furfrou",
            "트리미앙"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/676.png"
    },
    {
        "id": 678,
        "name": "meowstic-male",
        "apiName": "meowstic-male",
        "koName": "냐오닉스 수컷의 모습",
        "types": [
            "psychic"
        ],
        "abilities": [
            "날카로운눈",
            "틈새포착",
            "짓궂은마음"
        ],
        "baseStats": {
            "hp": 74,
            "atk": 48,
            "def": 76,
            "spa": 83,
            "spd": 81,
            "spe": 104
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Meowstic (Male)",
            "meowstic",
            "meowstic-male",
            "냐오닉스",
            "냐오닉스 수컷의 모습"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/678.png"
    },
    {
        "id": 10025,
        "name": "meowstic-female",
        "apiName": "meowstic-female",
        "koName": "냐오닉스 암컷의 모습",
        "types": [
            "psychic"
        ],
        "abilities": [
            "날카로운눈",
            "틈새포착",
            "승기"
        ],
        "baseStats": {
            "hp": 74,
            "atk": 48,
            "def": 76,
            "spa": 83,
            "spd": 81,
            "spe": 104
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Meowstic (Female)",
            "meowstic",
            "meowstic-female",
            "냐오닉스",
            "냐오닉스 암컷의 모습"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10025.png"
    },
    {
        "id": 681,
        "name": "aegislash-shield",
        "apiName": "aegislash-shield",
        "koName": "킬가르도 실드폼",
        "types": [
            "steel",
            "ghost"
        ],
        "abilities": [
            "배틀스위치"
        ],
        "baseStats": {
            "hp": 60,
            "atk": 50,
            "def": 140,
            "spa": 50,
            "spd": 140,
            "spe": 60
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Aegislash (Shield Forme)",
            "aegislash",
            "aegislash-shield",
            "킬가르도",
            "킬가르도 실드폼"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/681.png"
    },
    {
        "id": 10026,
        "name": "aegislash-blade",
        "apiName": "aegislash-blade",
        "koName": "킬가르도 블레이드폼",
        "types": [
            "steel",
            "ghost"
        ],
        "abilities": [
            "배틀스위치"
        ],
        "baseStats": {
            "hp": 60,
            "atk": 140,
            "def": 50,
            "spa": 140,
            "spd": 50,
            "spe": 60
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Aegislash (Blade Forme)",
            "aegislash",
            "aegislash-blade",
            "킬가르도",
            "킬가르도 블레이드폼"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10026.png"
    },
    {
        "id": 683,
        "name": "aromatisse",
        "apiName": "aromatisse",
        "koName": "프레프티르",
        "types": [
            "fairy"
        ],
        "abilities": [
            "치유의마음",
            "아로마베일"
        ],
        "baseStats": {
            "hp": 101,
            "atk": 72,
            "def": 72,
            "spa": 99,
            "spd": 89,
            "spe": 29
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Aromatisse",
            "aromatisse",
            "프레프티르"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/683.png"
    },
    {
        "id": 685,
        "name": "slurpuff",
        "apiName": "slurpuff",
        "koName": "나루림",
        "types": [
            "fairy"
        ],
        "abilities": [
            "스위트베일",
            "곡예"
        ],
        "baseStats": {
            "hp": 82,
            "atk": 80,
            "def": 86,
            "spa": 85,
            "spd": 75,
            "spe": 72
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Slurpuff",
            "slurpuff",
            "나루림"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/685.png"
    },
    {
        "id": 693,
        "name": "clawitzer",
        "apiName": "clawitzer",
        "koName": "블로스터",
        "types": [
            "water"
        ],
        "abilities": [
            "메가런처"
        ],
        "baseStats": {
            "hp": 71,
            "atk": 73,
            "def": 88,
            "spa": 120,
            "spd": 89,
            "spe": 59
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Clawitzer",
            "clawitzer",
            "블로스터"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/693.png"
    },
    {
        "id": 695,
        "name": "heliolisk",
        "apiName": "heliolisk",
        "koName": "일레도리자드",
        "types": [
            "electric",
            "normal"
        ],
        "abilities": [
            "건조피부",
            "모래숨기",
            "선파워"
        ],
        "baseStats": {
            "hp": 62,
            "atk": 55,
            "def": 52,
            "spa": 109,
            "spd": 94,
            "spe": 109
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Heliolisk",
            "heliolisk",
            "일레도리자드"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/695.png"
    },
    {
        "id": 697,
        "name": "tyrantrum",
        "apiName": "tyrantrum",
        "koName": "견고라스",
        "types": [
            "rock",
            "dragon"
        ],
        "abilities": [
            "옹골찬턱",
            "돌머리"
        ],
        "baseStats": {
            "hp": 82,
            "atk": 121,
            "def": 119,
            "spa": 69,
            "spd": 59,
            "spe": 71
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Tyrantrum",
            "tyrantrum",
            "견고라스"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/697.png"
    },
    {
        "id": 699,
        "name": "aurorus",
        "apiName": "aurorus",
        "koName": "아마루르가",
        "types": [
            "rock",
            "ice"
        ],
        "abilities": [
            "프리즈스킨",
            "눈퍼뜨리기"
        ],
        "baseStats": {
            "hp": 123,
            "atk": 77,
            "def": 72,
            "spa": 99,
            "spd": 92,
            "spe": 58
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Aurorus",
            "aurorus",
            "아마루르가"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/699.png"
    },
    {
        "id": 700,
        "name": "sylveon",
        "apiName": "sylveon",
        "koName": "님피아",
        "types": [
            "fairy"
        ],
        "abilities": [
            "헤롱헤롱바디",
            "페어리스킨"
        ],
        "baseStats": {
            "hp": 95,
            "atk": 65,
            "def": 65,
            "spa": 110,
            "spd": 130,
            "spe": 60
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Sylveon",
            "sylveon",
            "님피아"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/700.png"
    },
    {
        "id": 701,
        "name": "hawlucha",
        "apiName": "hawlucha",
        "koName": "루차불",
        "types": [
            "fighting",
            "flying"
        ],
        "abilities": [
            "유연",
            "곡예",
            "틀깨기"
        ],
        "baseStats": {
            "hp": 78,
            "atk": 92,
            "def": 75,
            "spa": 74,
            "spd": 63,
            "spe": 118
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "hawlucha-mega",
            "megaTypes": [
                "fighting",
                "flying"
            ],
            "megaBaseStats": {
                "hp": 78,
                "atk": 137,
                "def": 100,
                "spa": 74,
                "spd": 93,
                "spe": 118
            }
        },
        "speedPreset": null,
        "aliases": [
            "Hawlucha",
            "hawlucha",
            "루차불"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/701.png"
    },
    {
        "id": 702,
        "name": "dedenne",
        "apiName": "dedenne",
        "koName": "데덴네",
        "types": [
            "electric",
            "fairy"
        ],
        "abilities": [
            "볼주머니",
            "픽업",
            "플러스"
        ],
        "baseStats": {
            "hp": 67,
            "atk": 58,
            "def": 57,
            "spa": 81,
            "spd": 67,
            "spe": 101
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Dedenne",
            "dedenne",
            "데덴네"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/702.png"
    },
    {
        "id": 706,
        "name": "goodra",
        "apiName": "goodra",
        "koName": "미끄래곤",
        "types": [
            "dragon"
        ],
        "abilities": [
            "초식",
            "촉촉바디",
            "미끈미끈"
        ],
        "baseStats": {
            "hp": 90,
            "atk": 100,
            "def": 70,
            "spa": 110,
            "spd": 150,
            "spe": 80
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Goodra",
            "goodra",
            "미끄래곤"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/706.png"
    },
    {
        "id": 707,
        "name": "klefki",
        "apiName": "klefki",
        "koName": "클레피",
        "types": [
            "steel",
            "fairy"
        ],
        "abilities": [
            "짓궂은마음",
            "매지션"
        ],
        "baseStats": {
            "hp": 57,
            "atk": 80,
            "def": 91,
            "spa": 80,
            "spd": 87,
            "spe": 75
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Klefki",
            "klefki",
            "클레피"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/707.png"
    },
    {
        "id": 709,
        "name": "trevenant",
        "apiName": "trevenant",
        "koName": "대로트",
        "types": [
            "ghost",
            "grass"
        ],
        "abilities": [
            "자연회복",
            "통찰",
            "수확"
        ],
        "baseStats": {
            "hp": 85,
            "atk": 110,
            "def": 76,
            "spa": 65,
            "spd": 82,
            "spe": 56
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Trevenant",
            "trevenant",
            "대로트"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/709.png"
    },
    {
        "id": 711,
        "name": "gourgeist-average",
        "apiName": "gourgeist-average",
        "koName": "펌킨인 보통 사이즈",
        "types": [
            "ghost",
            "grass"
        ],
        "abilities": [
            "픽업",
            "통찰",
            "불면"
        ],
        "baseStats": {
            "hp": 65,
            "atk": 90,
            "def": 122,
            "spa": 58,
            "spd": 75,
            "spe": 84
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Gourgeist (Average)",
            "gourgeist",
            "gourgeist-average",
            "펌킨인",
            "펌킨인 보통 사이즈"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/711.png"
    },
    {
        "id": 10030,
        "name": "gourgeist-small",
        "apiName": "gourgeist-small",
        "koName": "펌킨인 작은 사이즈",
        "types": [
            "ghost",
            "grass"
        ],
        "abilities": [
            "픽업",
            "통찰",
            "불면"
        ],
        "baseStats": {
            "hp": 55,
            "atk": 85,
            "def": 122,
            "spa": 58,
            "spd": 75,
            "spe": 99
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Gourgeist (Small)",
            "gourgeist",
            "gourgeist-small",
            "펌킨인",
            "펌킨인 작은 사이즈"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10030.png"
    },
    {
        "id": 10031,
        "name": "gourgeist-large",
        "apiName": "gourgeist-large",
        "koName": "펌킨인 큰 사이즈",
        "types": [
            "ghost",
            "grass"
        ],
        "abilities": [
            "픽업",
            "통찰",
            "불면"
        ],
        "baseStats": {
            "hp": 75,
            "atk": 95,
            "def": 122,
            "spa": 58,
            "spd": 75,
            "spe": 69
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Gourgeist (Large)",
            "gourgeist",
            "gourgeist-large",
            "펌킨인",
            "펌킨인 큰 사이즈"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10031.png"
    },
    {
        "id": 10032,
        "name": "gourgeist-super",
        "apiName": "gourgeist-super",
        "koName": "펌킨인 특대 사이즈",
        "types": [
            "ghost",
            "grass"
        ],
        "abilities": [
            "픽업",
            "통찰",
            "불면"
        ],
        "baseStats": {
            "hp": 85,
            "atk": 100,
            "def": 122,
            "spa": 58,
            "spd": 75,
            "spe": 54
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Gourgeist (Super)",
            "gourgeist",
            "gourgeist-super",
            "펌킨인",
            "펌킨인 특대 사이즈"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10032.png"
    },
    {
        "id": 713,
        "name": "avalugg",
        "apiName": "avalugg",
        "koName": "크레베이스",
        "types": [
            "ice"
        ],
        "abilities": [
            "마이페이스",
            "아이스바디",
            "옹골참"
        ],
        "baseStats": {
            "hp": 95,
            "atk": 117,
            "def": 184,
            "spa": 44,
            "spd": 46,
            "spe": 28
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Avalugg",
            "avalugg",
            "크레베이스"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/713.png"
    },
    {
        "id": 715,
        "name": "noivern",
        "apiName": "noivern",
        "koName": "음번",
        "types": [
            "flying",
            "dragon"
        ],
        "abilities": [
            "통찰",
            "틈새포착",
            "텔레파시"
        ],
        "baseStats": {
            "hp": 85,
            "atk": 70,
            "def": 80,
            "spa": 97,
            "spd": 80,
            "spe": 123
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Noivern",
            "noivern",
            "음번"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/715.png"
    },
    {
        "id": 10033,
        "name": "venusaur-mega",
        "apiName": "venusaur-mega",
        "koName": "메가이상해꽃",
        "types": [
            "grass",
            "poison"
        ],
        "abilities": [
            "두꺼운지방"
        ],
        "baseStats": {
            "hp": 80,
            "atk": 100,
            "def": 123,
            "spa": 122,
            "spd": 120,
            "spe": 80
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Venusaur",
            "venusaur",
            "venusaur-mega",
            "이상해꽃",
            "메가이상해꽃"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10033.png"
    },
    {
        "id": 10034,
        "name": "charizard-mega-x",
        "apiName": "charizard-mega-x",
        "koName": "메가리자몽X",
        "types": [
            "fire",
            "dragon"
        ],
        "abilities": [
            "단단한발톱"
        ],
        "baseStats": {
            "hp": 78,
            "atk": 130,
            "def": 111,
            "spa": 130,
            "spd": 85,
            "spe": 100
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Charizard X",
            "charizard",
            "charizard-mega-x",
            "리자몽",
            "메가리자몽X"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10034.png"
    },
    {
        "id": 10035,
        "name": "charizard-mega-y",
        "apiName": "charizard-mega-y",
        "koName": "메가리자몽Y",
        "types": [
            "fire",
            "flying"
        ],
        "abilities": [
            "가뭄"
        ],
        "baseStats": {
            "hp": 78,
            "atk": 104,
            "def": 78,
            "spa": 159,
            "spd": 115,
            "spe": 100
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Charizard Y",
            "charizard",
            "charizard-mega-y",
            "리자몽",
            "메가리자몽Y"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10035.png"
    },
    {
        "id": 10036,
        "name": "blastoise-mega",
        "apiName": "blastoise-mega",
        "koName": "메가거북왕",
        "types": [
            "water"
        ],
        "abilities": [
            "메가런처"
        ],
        "baseStats": {
            "hp": 79,
            "atk": 103,
            "def": 120,
            "spa": 135,
            "spd": 115,
            "spe": 78
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Blastoise",
            "blastoise",
            "blastoise-mega",
            "거북왕",
            "메가거북왕"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10036.png"
    },
    {
        "id": 10090,
        "name": "beedrill-mega",
        "apiName": "beedrill-mega",
        "koName": "메가독침붕",
        "types": [
            "bug",
            "poison"
        ],
        "abilities": [
            "적응력"
        ],
        "baseStats": {
            "hp": 65,
            "atk": 150,
            "def": 40,
            "spa": 15,
            "spd": 80,
            "spe": 145
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Beedrill",
            "beedrill",
            "beedrill-mega",
            "독침붕",
            "메가독침붕"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10090.png"
    },
    {
        "id": 10073,
        "name": "pidgeot-mega",
        "apiName": "pidgeot-mega",
        "koName": "메가피죤투",
        "types": [
            "normal",
            "flying"
        ],
        "abilities": [
            "노가드"
        ],
        "baseStats": {
            "hp": 83,
            "atk": 80,
            "def": 80,
            "spa": 135,
            "spd": 80,
            "spe": 121
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Pidgeot",
            "pidgeot",
            "pidgeot-mega",
            "피죤투",
            "메가피죤투"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10073.png"
    },
    {
        "id": 10037,
        "name": "alakazam-mega",
        "apiName": "alakazam-mega",
        "koName": "메가후딘",
        "types": [
            "psychic"
        ],
        "abilities": [
            "트레이스"
        ],
        "baseStats": {
            "hp": 55,
            "atk": 50,
            "def": 65,
            "spa": 175,
            "spd": 105,
            "spe": 150
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Alakazam",
            "alakazam",
            "alakazam-mega",
            "후딘",
            "메가후딘"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10037.png"
    },
    {
        "id": 10071,
        "name": "slowbro-mega",
        "apiName": "slowbro-mega",
        "koName": "메가야도란",
        "types": [
            "water",
            "psychic"
        ],
        "abilities": [
            "조가비갑옷"
        ],
        "baseStats": {
            "hp": 95,
            "atk": 75,
            "def": 180,
            "spa": 130,
            "spd": 80,
            "spe": 30
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Slowbro",
            "slowbro",
            "slowbro-mega",
            "야도란",
            "메가야도란"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10071.png"
    },
    {
        "id": 10038,
        "name": "gengar-mega",
        "apiName": "gengar-mega",
        "koName": "메가팬텀",
        "types": [
            "ghost",
            "poison"
        ],
        "abilities": [
            "그림자밟기"
        ],
        "baseStats": {
            "hp": 60,
            "atk": 65,
            "def": 80,
            "spa": 170,
            "spd": 95,
            "spe": 130
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Gengar",
            "gengar",
            "gengar-mega",
            "팬텀",
            "메가팬텀"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10038.png"
    },
    {
        "id": 10039,
        "name": "kangaskhan-mega",
        "apiName": "kangaskhan-mega",
        "koName": "메가캥카",
        "types": [
            "normal"
        ],
        "abilities": [
            "부자유친"
        ],
        "baseStats": {
            "hp": 105,
            "atk": 125,
            "def": 100,
            "spa": 60,
            "spd": 100,
            "spe": 100
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Kangaskhan",
            "kangaskhan",
            "kangaskhan-mega",
            "캥카",
            "메가캥카"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10039.png"
    },
    {
        "id": 10040,
        "name": "pinsir-mega",
        "apiName": "pinsir-mega",
        "koName": "메가쁘사이저",
        "types": [
            "bug",
            "flying"
        ],
        "abilities": [
            "스카이스킨"
        ],
        "baseStats": {
            "hp": 65,
            "atk": 155,
            "def": 120,
            "spa": 65,
            "spd": 90,
            "spe": 105
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Pinsir",
            "pinsir",
            "pinsir-mega",
            "쁘사이저",
            "메가쁘사이저"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10040.png"
    },
    {
        "id": 10041,
        "name": "gyarados-mega",
        "apiName": "gyarados-mega",
        "koName": "메가갸라도스",
        "types": [
            "water",
            "dark"
        ],
        "abilities": [
            "틀깨기"
        ],
        "baseStats": {
            "hp": 95,
            "atk": 155,
            "def": 109,
            "spa": 70,
            "spd": 130,
            "spe": 81
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Gyarados",
            "gyarados",
            "gyarados-mega",
            "갸라도스",
            "메가갸라도스"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10041.png"
    },
    {
        "id": 10042,
        "name": "aerodactyl-mega",
        "apiName": "aerodactyl-mega",
        "koName": "메가프테라",
        "types": [
            "rock",
            "flying"
        ],
        "abilities": [
            "단단한발톱"
        ],
        "baseStats": {
            "hp": 80,
            "atk": 135,
            "def": 85,
            "spa": 70,
            "spd": 95,
            "spe": 150
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Aerodactyl",
            "aerodactyl",
            "aerodactyl-mega",
            "프테라",
            "메가프테라"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10042.png"
    },
    {
        "id": 10045,
        "name": "ampharos-mega",
        "apiName": "ampharos-mega",
        "koName": "메가전룡",
        "types": [
            "electric",
            "dragon"
        ],
        "abilities": [
            "틀깨기"
        ],
        "baseStats": {
            "hp": 90,
            "atk": 95,
            "def": 105,
            "spa": 165,
            "spd": 110,
            "spe": 45
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Ampharos",
            "ampharos",
            "ampharos-mega",
            "전룡",
            "메가전룡"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10045.png"
    },
    {
        "id": 10072,
        "name": "steelix-mega",
        "apiName": "steelix-mega",
        "koName": "메가강철톤",
        "types": [
            "steel",
            "ground"
        ],
        "abilities": [
            "모래의힘"
        ],
        "baseStats": {
            "hp": 75,
            "atk": 125,
            "def": 230,
            "spa": 55,
            "spd": 95,
            "spe": 30
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Steelix",
            "steelix",
            "steelix-mega",
            "강철톤",
            "메가강철톤"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10072.png"
    },
    {
        "id": 10046,
        "name": "scizor-mega",
        "apiName": "scizor-mega",
        "koName": "메가핫삼",
        "types": [
            "bug",
            "steel"
        ],
        "abilities": [
            "테크니션"
        ],
        "baseStats": {
            "hp": 70,
            "atk": 150,
            "def": 140,
            "spa": 65,
            "spd": 100,
            "spe": 75
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Scizor",
            "scizor",
            "scizor-mega",
            "핫삼",
            "메가핫삼"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10046.png"
    },
    {
        "id": 10047,
        "name": "heracross-mega",
        "apiName": "heracross-mega",
        "koName": "메가헤라크로스",
        "types": [
            "bug",
            "fighting"
        ],
        "abilities": [
            "스킬링크"
        ],
        "baseStats": {
            "hp": 80,
            "atk": 185,
            "def": 115,
            "spa": 40,
            "spd": 105,
            "spe": 75
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Heracross",
            "heracross",
            "heracross-mega",
            "헤라크로스",
            "메가헤라크로스"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10047.png"
    },
    {
        "id": 10048,
        "name": "houndoom-mega",
        "apiName": "houndoom-mega",
        "koName": "메가헬가",
        "types": [
            "dark",
            "fire"
        ],
        "abilities": [
            "선파워"
        ],
        "baseStats": {
            "hp": 75,
            "atk": 90,
            "def": 90,
            "spa": 140,
            "spd": 90,
            "spe": 115
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Houndoom",
            "houndoom",
            "houndoom-mega",
            "헬가",
            "메가헬가"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10048.png"
    },
    {
        "id": 10049,
        "name": "tyranitar-mega",
        "apiName": "tyranitar-mega",
        "koName": "메가마기라스",
        "types": [
            "rock",
            "dark"
        ],
        "abilities": [
            "모래날림"
        ],
        "baseStats": {
            "hp": 100,
            "atk": 164,
            "def": 150,
            "spa": 95,
            "spd": 120,
            "spe": 71
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Tyranitar",
            "tyranitar",
            "tyranitar-mega",
            "마기라스",
            "메가마기라스"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10049.png"
    },
    {
        "id": 10051,
        "name": "gardevoir-mega",
        "apiName": "gardevoir-mega",
        "koName": "메가가디안",
        "types": [
            "psychic",
            "fairy"
        ],
        "abilities": [
            "페어리스킨"
        ],
        "baseStats": {
            "hp": 68,
            "atk": 85,
            "def": 65,
            "spa": 165,
            "spd": 135,
            "spe": 100
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Gardevoir",
            "gardevoir",
            "gardevoir-mega",
            "가디안",
            "메가가디안"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10051.png"
    },
    {
        "id": 10066,
        "name": "sableye-mega",
        "apiName": "sableye-mega",
        "koName": "메가깜까미",
        "types": [
            "dark",
            "ghost"
        ],
        "abilities": [
            "매직미러"
        ],
        "baseStats": {
            "hp": 50,
            "atk": 85,
            "def": 125,
            "spa": 85,
            "spd": 115,
            "spe": 20
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Sableye",
            "sableye",
            "sableye-mega",
            "깜까미",
            "메가깜까미"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10066.png"
    },
    {
        "id": 10053,
        "name": "aggron-mega",
        "apiName": "aggron-mega",
        "koName": "메가보스로라",
        "types": [
            "steel"
        ],
        "abilities": [
            "필터"
        ],
        "baseStats": {
            "hp": 70,
            "atk": 140,
            "def": 230,
            "spa": 60,
            "spd": 80,
            "spe": 50
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Aggron",
            "aggron",
            "aggron-mega",
            "보스로라",
            "메가보스로라"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10053.png"
    },
    {
        "id": 10054,
        "name": "medicham-mega",
        "apiName": "medicham-mega",
        "koName": "메가요가램",
        "types": [
            "fighting",
            "psychic"
        ],
        "abilities": [
            "순수한힘"
        ],
        "baseStats": {
            "hp": 60,
            "atk": 100,
            "def": 85,
            "spa": 80,
            "spd": 85,
            "spe": 100
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Medicham",
            "medicham",
            "medicham-mega",
            "요가램",
            "메가요가램"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10054.png"
    },
    {
        "id": 10055,
        "name": "manectric-mega",
        "apiName": "manectric-mega",
        "koName": "메가썬더볼트",
        "types": [
            "electric"
        ],
        "abilities": [
            "위협"
        ],
        "baseStats": {
            "hp": 70,
            "atk": 75,
            "def": 80,
            "spa": 135,
            "spd": 80,
            "spe": 135
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Manectric",
            "manectric",
            "manectric-mega",
            "썬더볼트",
            "메가썬더볼트"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10055.png"
    },
    {
        "id": 10070,
        "name": "sharpedo-mega",
        "apiName": "sharpedo-mega",
        "koName": "메가샤크니아",
        "types": [
            "water",
            "dark"
        ],
        "abilities": [
            "옹골찬턱"
        ],
        "baseStats": {
            "hp": 70,
            "atk": 140,
            "def": 70,
            "spa": 110,
            "spd": 65,
            "spe": 105
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Sharpedo",
            "sharpedo",
            "sharpedo-mega",
            "샤크니아",
            "메가샤크니아"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10070.png"
    },
    {
        "id": 10087,
        "name": "camerupt-mega",
        "apiName": "camerupt-mega",
        "koName": "메가폭타",
        "types": [
            "fire",
            "ground"
        ],
        "abilities": [
            "우격다짐"
        ],
        "baseStats": {
            "hp": 70,
            "atk": 120,
            "def": 100,
            "spa": 145,
            "spd": 105,
            "spe": 20
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Camerupt",
            "camerupt",
            "camerupt-mega",
            "폭타",
            "메가폭타"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10087.png"
    },
    {
        "id": 10067,
        "name": "altaria-mega",
        "apiName": "altaria-mega",
        "koName": "메가파비코리",
        "types": [
            "dragon",
            "fairy"
        ],
        "abilities": [
            "페어리스킨"
        ],
        "baseStats": {
            "hp": 75,
            "atk": 110,
            "def": 110,
            "spa": 110,
            "spd": 105,
            "spe": 80
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Altaria",
            "altaria",
            "altaria-mega",
            "파비코리",
            "메가파비코리"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10067.png"
    },
    {
        "id": 10056,
        "name": "banette-mega",
        "apiName": "banette-mega",
        "koName": "메가다크펫",
        "types": [
            "ghost"
        ],
        "abilities": [
            "짓궂은마음"
        ],
        "baseStats": {
            "hp": 64,
            "atk": 165,
            "def": 75,
            "spa": 93,
            "spd": 83,
            "spe": 75
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Banette",
            "banette",
            "banette-mega",
            "다크펫",
            "메가다크펫"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10056.png"
    },
    {
        "id": 10057,
        "name": "absol-mega",
        "apiName": "absol-mega",
        "koName": "메가앱솔",
        "types": [
            "dark"
        ],
        "abilities": [
            "매직미러"
        ],
        "baseStats": {
            "hp": 65,
            "atk": 150,
            "def": 60,
            "spa": 115,
            "spd": 60,
            "spe": 115
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Absol",
            "absol",
            "absol-mega",
            "앱솔",
            "메가앱솔"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10057.png"
    },
    {
        "id": 10074,
        "name": "glalie-mega",
        "apiName": "glalie-mega",
        "koName": "메가얼음귀신",
        "types": [
            "ice"
        ],
        "abilities": [
            "프리즈스킨"
        ],
        "baseStats": {
            "hp": 80,
            "atk": 120,
            "def": 80,
            "spa": 120,
            "spd": 80,
            "spe": 100
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Glalie",
            "glalie",
            "glalie-mega",
            "얼음귀신",
            "메가얼음귀신"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10074.png"
    },
    {
        "id": 10088,
        "name": "lopunny-mega",
        "apiName": "lopunny-mega",
        "koName": "메가이어롭",
        "types": [
            "normal",
            "fighting"
        ],
        "abilities": [
            "배짱"
        ],
        "baseStats": {
            "hp": 65,
            "atk": 136,
            "def": 94,
            "spa": 54,
            "spd": 96,
            "spe": 135
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Lopunny",
            "lopunny",
            "lopunny-mega",
            "이어롭",
            "메가이어롭"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10088.png"
    },
    {
        "id": 10058,
        "name": "garchomp-mega",
        "apiName": "garchomp-mega",
        "koName": "메가한카리아스",
        "types": [
            "dragon",
            "ground"
        ],
        "abilities": [
            "모래의힘"
        ],
        "baseStats": {
            "hp": 108,
            "atk": 170,
            "def": 115,
            "spa": 120,
            "spd": 95,
            "spe": 92
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Garchomp",
            "garchomp",
            "garchomp-mega",
            "한카리아스",
            "메가한카리아스"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10058.png"
    },
    {
        "id": 10059,
        "name": "lucario-mega",
        "apiName": "lucario-mega",
        "koName": "메가루카리오",
        "types": [
            "fighting",
            "steel"
        ],
        "abilities": [
            "적응력"
        ],
        "baseStats": {
            "hp": 70,
            "atk": 145,
            "def": 88,
            "spa": 140,
            "spd": 70,
            "spe": 112
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Lucario",
            "lucario",
            "lucario-mega",
            "루카리오",
            "메가루카리오"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10059.png"
    },
    {
        "id": 10060,
        "name": "abomasnow-mega",
        "apiName": "abomasnow-mega",
        "koName": "메가눈설왕",
        "types": [
            "grass",
            "ice"
        ],
        "abilities": [
            "눈퍼뜨리기"
        ],
        "baseStats": {
            "hp": 90,
            "atk": 132,
            "def": 105,
            "spa": 132,
            "spd": 105,
            "spe": 30
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Abomasnow",
            "abomasnow",
            "abomasnow-mega",
            "눈설왕",
            "메가눈설왕"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10060.png"
    },
    {
        "id": 10068,
        "name": "gallade-mega",
        "apiName": "gallade-mega",
        "koName": "메가엘레이드",
        "types": [
            "psychic",
            "fighting"
        ],
        "abilities": [
            "정신력"
        ],
        "baseStats": {
            "hp": 68,
            "atk": 165,
            "def": 95,
            "spa": 65,
            "spd": 115,
            "spe": 110
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Gallade",
            "gallade",
            "gallade-mega",
            "엘레이드",
            "메가엘레이드"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10068.png"
    },
    {
        "id": 10069,
        "name": "audino-mega",
        "apiName": "audino-mega",
        "koName": "메가다부니",
        "types": [
            "normal",
            "fairy"
        ],
        "abilities": [
            "치유의마음"
        ],
        "baseStats": {
            "hp": 103,
            "atk": 60,
            "def": 126,
            "spa": 80,
            "spd": 126,
            "spe": 50
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Audino",
            "audino",
            "audino-mega",
            "다부니",
            "메가다부니"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10069.png"
    },
    {
        "id": 10100,
        "name": "raichu-alola",
        "apiName": "raichu-alola",
        "koName": "라이츄 알로라의 모습",
        "types": [
            "electric",
            "psychic"
        ],
        "abilities": [
            "서핑테일"
        ],
        "baseStats": {
            "hp": 60,
            "atk": 85,
            "def": 50,
            "spa": 95,
            "spd": 85,
            "spe": 110
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Alolan Raichu",
            "raichu",
            "raichu-alola",
            "라이츄",
            "라이츄 알로라의 모습"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10100.png"
    },
    {
        "id": 10104,
        "name": "ninetales-alola",
        "apiName": "ninetales-alola",
        "koName": "나인테일 알로라의 모습",
        "types": [
            "ice",
            "fairy"
        ],
        "abilities": [
            "눈숨기",
            "눈퍼뜨리기"
        ],
        "baseStats": {
            "hp": 73,
            "atk": 67,
            "def": 75,
            "spa": 81,
            "spd": 100,
            "spe": 109
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Alolan Ninetales",
            "ninetales",
            "ninetales-alola",
            "나인테일",
            "나인테일 알로라의 모습"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10104.png"
    },
    {
        "id": 724,
        "name": "decidueye",
        "apiName": "decidueye",
        "koName": "모크나이퍼",
        "types": [
            "grass",
            "ghost"
        ],
        "abilities": [
            "심록",
            "원격"
        ],
        "baseStats": {
            "hp": 78,
            "atk": 107,
            "def": 75,
            "spa": 100,
            "spd": 100,
            "spe": 70
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Decidueye",
            "decidueye",
            "모크나이퍼"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/724.png"
    },
    {
        "id": 727,
        "name": "incineroar",
        "apiName": "incineroar",
        "koName": "어흥염",
        "types": [
            "fire",
            "dark"
        ],
        "abilities": [
            "맹화",
            "위협"
        ],
        "baseStats": {
            "hp": 95,
            "atk": 115,
            "def": 90,
            "spa": 80,
            "spd": 90,
            "spe": 60
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Incineroar",
            "incineroar",
            "어흥염"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/727.png"
    },
    {
        "id": 730,
        "name": "primarina",
        "apiName": "primarina",
        "koName": "누리레느",
        "types": [
            "water",
            "fairy"
        ],
        "abilities": [
            "급류",
            "촉촉보이스"
        ],
        "baseStats": {
            "hp": 80,
            "atk": 74,
            "def": 74,
            "spa": 126,
            "spd": 116,
            "spe": 60
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Primarina",
            "primarina",
            "누리레느"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/730.png"
    },
    {
        "id": 733,
        "name": "toucannon",
        "apiName": "toucannon",
        "koName": "왕큰부리",
        "types": [
            "normal",
            "flying"
        ],
        "abilities": [
            "날카로운눈",
            "스킬링크",
            "우격다짐"
        ],
        "baseStats": {
            "hp": 80,
            "atk": 120,
            "def": 75,
            "spa": 75,
            "spd": 75,
            "spe": 60
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Toucannon",
            "toucannon",
            "왕큰부리"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/733.png"
    },
    {
        "id": 740,
        "name": "crabominable",
        "apiName": "crabominable",
        "koName": "모단단게",
        "types": [
            "fighting",
            "ice"
        ],
        "abilities": [
            "괴력집게",
            "철주먹",
            "분노의경혈"
        ],
        "baseStats": {
            "hp": 97,
            "atk": 132,
            "def": 77,
            "spa": 62,
            "spd": 67,
            "spe": 43
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "crabominable-mega",
            "megaTypes": [
                "fighting",
                "ice"
            ],
            "megaBaseStats": {
                "hp": 97,
                "atk": 157,
                "def": 122,
                "spa": 62,
                "spd": 107,
                "spe": 33
            }
        },
        "speedPreset": null,
        "aliases": [
            "Crabominable",
            "crabominable",
            "모단단게"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/740.png"
    },
    {
        "id": 745,
        "name": "lycanroc-midday",
        "apiName": "lycanroc-midday",
        "koName": "루가루암 한낮의 모습",
        "types": [
            "rock"
        ],
        "abilities": [
            "날카로운눈",
            "모래헤치기",
            "불굴의마음"
        ],
        "baseStats": {
            "hp": 75,
            "atk": 115,
            "def": 65,
            "spa": 55,
            "spd": 65,
            "spe": 112
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Midday Form Lycanroc",
            "lycanroc",
            "lycanroc-midday",
            "루가루암",
            "루가루암 한낮의 모습"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/745.png"
    },
    {
        "id": 10126,
        "name": "lycanroc-midnight",
        "apiName": "lycanroc-midnight",
        "koName": "루가루암 한밤중의 모습",
        "types": [
            "rock"
        ],
        "abilities": [
            "날카로운눈",
            "의기양양",
            "노가드"
        ],
        "baseStats": {
            "hp": 85,
            "atk": 115,
            "def": 75,
            "spa": 55,
            "spd": 75,
            "spe": 82
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Midnight Form Lycanroc",
            "lycanroc",
            "lycanroc-midnight",
            "루가루암",
            "루가루암 한밤중의 모습"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10126.png"
    },
    {
        "id": 10152,
        "name": "lycanroc-dusk",
        "apiName": "lycanroc-dusk",
        "koName": "루가루암 황혼의 모습",
        "types": [
            "rock"
        ],
        "abilities": [
            "단단한발톱"
        ],
        "baseStats": {
            "hp": 75,
            "atk": 117,
            "def": 65,
            "spa": 55,
            "spd": 65,
            "spe": 110
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Dusk Form Lycanroc",
            "lycanroc",
            "lycanroc-dusk",
            "루가루암",
            "루가루암 황혼의 모습"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10152.png"
    },
    {
        "id": 748,
        "name": "toxapex",
        "apiName": "toxapex",
        "koName": "더시마사리",
        "types": [
            "poison",
            "water"
        ],
        "abilities": [
            "무도한행동",
            "유연",
            "재생력"
        ],
        "baseStats": {
            "hp": 50,
            "atk": 63,
            "def": 152,
            "spa": 53,
            "spd": 142,
            "spe": 35
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Toxapex",
            "toxapex",
            "더시마사리"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/748.png"
    },
    {
        "id": 750,
        "name": "mudsdale",
        "apiName": "mudsdale",
        "koName": "만마드",
        "types": [
            "ground"
        ],
        "abilities": [
            "마이페이스",
            "지구력",
            "정신력"
        ],
        "baseStats": {
            "hp": 100,
            "atk": 125,
            "def": 100,
            "spa": 55,
            "spd": 85,
            "spe": 35
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mudsdale",
            "mudsdale",
            "만마드"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/750.png"
    },
    {
        "id": 752,
        "name": "araquanid",
        "apiName": "araquanid",
        "koName": "깨비물거미",
        "types": [
            "water",
            "bug"
        ],
        "abilities": [
            "수포",
            "저수"
        ],
        "baseStats": {
            "hp": 68,
            "atk": 70,
            "def": 92,
            "spa": 50,
            "spd": 132,
            "spe": 42
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Araquanid",
            "araquanid",
            "깨비물거미"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/752.png"
    },
    {
        "id": 758,
        "name": "salazzle",
        "apiName": "salazzle",
        "koName": "염뉴트",
        "types": [
            "poison",
            "fire"
        ],
        "abilities": [
            "부식",
            "둔감"
        ],
        "baseStats": {
            "hp": 68,
            "atk": 64,
            "def": 60,
            "spa": 111,
            "spd": 60,
            "spe": 117
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Salazzle",
            "salazzle",
            "염뉴트"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/758.png"
    },
    {
        "id": 763,
        "name": "tsareena",
        "apiName": "tsareena",
        "koName": "달코퀸",
        "types": [
            "grass"
        ],
        "abilities": [
            "리프가드",
            "여왕의위엄",
            "스위트베일"
        ],
        "baseStats": {
            "hp": 72,
            "atk": 120,
            "def": 98,
            "spa": 50,
            "spd": 98,
            "spe": 72
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Tsareena",
            "tsareena",
            "달코퀸"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/763.png"
    },
    {
        "id": 765,
        "name": "oranguru",
        "apiName": "oranguru",
        "koName": "하랑우탄",
        "types": [
            "normal",
            "psychic"
        ],
        "abilities": [
            "정신력",
            "텔레파시",
            "공생"
        ],
        "baseStats": {
            "hp": 90,
            "atk": 60,
            "def": 80,
            "spa": 90,
            "spd": 110,
            "spe": 60
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Oranguru",
            "oranguru",
            "하랑우탄"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/765.png"
    },
    {
        "id": 766,
        "name": "passimian",
        "apiName": "passimian",
        "koName": "내던숭이",
        "types": [
            "fighting"
        ],
        "abilities": [
            "리시버",
            "오기"
        ],
        "baseStats": {
            "hp": 100,
            "atk": 120,
            "def": 90,
            "spa": 40,
            "spd": 60,
            "spe": 80
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Passimian",
            "passimian",
            "내던숭이"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/766.png"
    },
    {
        "id": 778,
        "name": "mimikyu-disguised",
        "apiName": "mimikyu-disguised",
        "koName": "따라큐",
        "types": [
            "ghost",
            "fairy"
        ],
        "abilities": [
            "탈"
        ],
        "baseStats": {
            "hp": 55,
            "atk": 90,
            "def": 80,
            "spa": 50,
            "spd": 105,
            "spe": 96
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mimikyu",
            "mimikyu",
            "mimikyu-disguised",
            "따라큐",
            "따라큐 둔갑한 모습"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/778.png"
    },
    {
        "id": 780,
        "name": "drampa",
        "apiName": "drampa",
        "koName": "할비롱",
        "types": [
            "normal",
            "dragon"
        ],
        "abilities": [
            "발끈",
            "초식",
            "날씨부정"
        ],
        "baseStats": {
            "hp": 78,
            "atk": 60,
            "def": 85,
            "spa": 135,
            "spd": 91,
            "spe": 36
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "drampa-mega",
            "megaTypes": [
                "normal",
                "dragon"
            ],
            "megaBaseStats": {
                "hp": 78,
                "atk": 85,
                "def": 110,
                "spa": 160,
                "spd": 116,
                "spe": 36
            }
        },
        "speedPreset": null,
        "aliases": [
            "Drampa",
            "drampa",
            "할비롱"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/780.png"
    },
    {
        "id": 784,
        "name": "kommo-o",
        "apiName": "kommo-o",
        "koName": "짜랑고우거",
        "types": [
            "dragon",
            "fighting"
        ],
        "abilities": [
            "방탄",
            "방음",
            "방진"
        ],
        "baseStats": {
            "hp": 75,
            "atk": 110,
            "def": 125,
            "spa": 100,
            "spd": 105,
            "spe": 85
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Kommo-o",
            "kommo-o",
            "짜랑고우거"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/784.png"
    },
    {
        "id": 10230,
        "name": "arcanine-hisui",
        "apiName": "arcanine-hisui",
        "koName": "윈디",
        "types": [
            "fire",
            "rock"
        ],
        "abilities": [
            "위협",
            "타오르는불꽃",
            "돌머리"
        ],
        "baseStats": {
            "hp": 95,
            "atk": 115,
            "def": 80,
            "spa": 95,
            "spd": 80,
            "spe": 90
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Hisuian Arcanine",
            "arcanine",
            "arcanine-hisui",
            "윈디"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10230.png"
    },
    {
        "id": 10165,
        "name": "slowbro-galar",
        "apiName": "slowbro-galar",
        "koName": "야도란 가라르의 모습",
        "types": [
            "poison",
            "psychic"
        ],
        "abilities": [
            "퀵드로",
            "마이페이스",
            "재생력"
        ],
        "baseStats": {
            "hp": 95,
            "atk": 100,
            "def": 95,
            "spa": 100,
            "spd": 70,
            "spe": 30
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Galarian Slowbro",
            "slowbro",
            "slowbro-galar",
            "야도란",
            "야도란 가라르의 모습"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10165.png"
    },
    {
        "id": 10233,
        "name": "typhlosion-hisui",
        "apiName": "typhlosion-hisui",
        "koName": "블레이범",
        "types": [
            "fire",
            "ghost"
        ],
        "abilities": [
            "맹화",
            "통찰"
        ],
        "baseStats": {
            "hp": 73,
            "atk": 84,
            "def": 78,
            "spa": 119,
            "spd": 85,
            "spe": 95
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Hisuian Typhlosion",
            "typhlosion",
            "typhlosion-hisui",
            "블레이범"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10233.png"
    },
    {
        "id": 10172,
        "name": "slowking-galar",
        "apiName": "slowking-galar",
        "koName": "야도킹 가라르의 모습",
        "types": [
            "poison",
            "psychic"
        ],
        "abilities": [
            "기묘한약",
            "마이페이스",
            "재생력"
        ],
        "baseStats": {
            "hp": 95,
            "atk": 65,
            "def": 80,
            "spa": 110,
            "spd": 110,
            "spe": 30
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Galarian Slowking",
            "slowking",
            "slowking-galar",
            "야도킹",
            "야도킹 가라르의 모습"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10172.png"
    },
    {
        "id": 10236,
        "name": "samurott-hisui",
        "apiName": "samurott-hisui",
        "koName": "대검귀",
        "types": [
            "water",
            "dark"
        ],
        "abilities": [
            "급류",
            "Sharpness"
        ],
        "baseStats": {
            "hp": 90,
            "atk": 108,
            "def": 80,
            "spa": 100,
            "spd": 65,
            "spe": 85
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Hisuian Samurott",
            "samurott",
            "samurott-hisui",
            "대검귀"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10236.png"
    },
    {
        "id": 10239,
        "name": "zoroark-hisui",
        "apiName": "zoroark-hisui",
        "koName": "조로아크",
        "types": [
            "normal",
            "ghost"
        ],
        "abilities": [
            "일루전"
        ],
        "baseStats": {
            "hp": 55,
            "atk": 100,
            "def": 60,
            "spa": 125,
            "spd": 60,
            "spe": 110
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Hisuian Zoroark",
            "zoroark",
            "zoroark-hisui",
            "조로아크"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10239.png"
    },
    {
        "id": 10180,
        "name": "stunfisk-galar",
        "apiName": "stunfisk-galar",
        "koName": "메더 가라르의 모습",
        "types": [
            "ground",
            "steel"
        ],
        "abilities": [
            "의태"
        ],
        "baseStats": {
            "hp": 109,
            "atk": 81,
            "def": 99,
            "spa": 66,
            "spd": 84,
            "spe": 32
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Galarian Stunfisk",
            "stunfisk",
            "stunfisk-galar",
            "메더",
            "메더 가라르의 모습"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10180.png"
    },
    {
        "id": 10242,
        "name": "goodra-hisui",
        "apiName": "goodra-hisui",
        "koName": "미끄래곤",
        "types": [
            "steel",
            "dragon"
        ],
        "abilities": [
            "초식",
            "조가비갑옷",
            "미끈미끈"
        ],
        "baseStats": {
            "hp": 80,
            "atk": 100,
            "def": 100,
            "spa": 110,
            "spd": 150,
            "spe": 60
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Hisuian Goodra",
            "goodra",
            "goodra-hisui",
            "미끄래곤"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10242.png"
    },
    {
        "id": 10243,
        "name": "avalugg-hisui",
        "apiName": "avalugg-hisui",
        "koName": "크레베이스",
        "types": [
            "ice",
            "rock"
        ],
        "abilities": [
            "옹골찬턱",
            "아이스바디",
            "옹골참"
        ],
        "baseStats": {
            "hp": 95,
            "atk": 127,
            "def": 184,
            "spa": 34,
            "spd": 36,
            "spe": 38
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Hisuian Avalugg",
            "avalugg",
            "avalugg-hisui",
            "크레베이스"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10243.png"
    },
    {
        "id": 10244,
        "name": "decidueye-hisui",
        "apiName": "decidueye-hisui",
        "koName": "모크나이퍼",
        "types": [
            "grass",
            "fighting"
        ],
        "abilities": [
            "심록",
            "배짱"
        ],
        "baseStats": {
            "hp": 88,
            "atk": 112,
            "def": 80,
            "spa": 95,
            "spd": 95,
            "spe": 60
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Hisuian Decidueye",
            "decidueye",
            "decidueye-hisui",
            "모크나이퍼"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10244.png"
    },
    {
        "id": 823,
        "name": "corviknight",
        "apiName": "corviknight",
        "koName": "아머까오",
        "types": [
            "flying",
            "steel"
        ],
        "abilities": [
            "프레셔",
            "긴장감",
            "미러아머"
        ],
        "baseStats": {
            "hp": 98,
            "atk": 87,
            "def": 105,
            "spa": 53,
            "spd": 85,
            "spe": 67
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Corviknight",
            "corviknight",
            "아머까오"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/823.png"
    },
    {
        "id": 841,
        "name": "flapple",
        "apiName": "flapple",
        "koName": "애프룡",
        "types": [
            "grass",
            "dragon"
        ],
        "abilities": [
            "숙성",
            "먹보",
            "의욕"
        ],
        "baseStats": {
            "hp": 70,
            "atk": 110,
            "def": 80,
            "spa": 95,
            "spd": 60,
            "spe": 70
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Flapple",
            "flapple",
            "애프룡"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/841.png"
    },
    {
        "id": 842,
        "name": "appletun",
        "apiName": "appletun",
        "koName": "단지래플",
        "types": [
            "grass",
            "dragon"
        ],
        "abilities": [
            "숙성",
            "먹보",
            "두꺼운지방"
        ],
        "baseStats": {
            "hp": 110,
            "atk": 85,
            "def": 80,
            "spa": 100,
            "spd": 80,
            "spe": 30
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Appletun",
            "appletun",
            "단지래플"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/842.png"
    },
    {
        "id": 844,
        "name": "sandaconda",
        "apiName": "sandaconda",
        "koName": "사다이사",
        "types": [
            "ground"
        ],
        "abilities": [
            "모래뿜기",
            "탈피",
            "모래숨기"
        ],
        "baseStats": {
            "hp": 72,
            "atk": 107,
            "def": 125,
            "spa": 65,
            "spd": 70,
            "spe": 71
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Sandaconda",
            "sandaconda",
            "사다이사"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/844.png"
    },
    {
        "id": 855,
        "name": "polteageist",
        "apiName": "polteageist",
        "koName": "포트데스",
        "types": [
            "ghost"
        ],
        "abilities": [
            "깨어진갑옷",
            "저주받은바디"
        ],
        "baseStats": {
            "hp": 60,
            "atk": 65,
            "def": 65,
            "spa": 134,
            "spd": 114,
            "spe": 70
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Polteageist",
            "polteageist",
            "포트데스"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/855.png"
    },
    {
        "id": 858,
        "name": "hatterene",
        "apiName": "hatterene",
        "koName": "브리무음",
        "types": [
            "psychic",
            "fairy"
        ],
        "abilities": [
            "치유의마음",
            "위험예지",
            "매직미러"
        ],
        "baseStats": {
            "hp": 57,
            "atk": 90,
            "def": 95,
            "spa": 136,
            "spd": 103,
            "spe": 29
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Hatterene",
            "hatterene",
            "브리무음"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/858.png"
    },
    {
        "id": 866,
        "name": "mr-rime",
        "apiName": "mr-rime",
        "koName": "마임꽁꽁",
        "types": [
            "ice",
            "psychic"
        ],
        "abilities": [
            "갈지자걸음",
            "배리어프리",
            "아이스바디"
        ],
        "baseStats": {
            "hp": 80,
            "atk": 85,
            "def": 75,
            "spa": 110,
            "spd": 100,
            "spe": 70
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mr. Rime",
            "mr-rime",
            "마임꽁꽁"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/866.png"
    },
    {
        "id": 867,
        "name": "runerigus",
        "apiName": "runerigus",
        "koName": "데스판",
        "types": [
            "ground",
            "ghost"
        ],
        "abilities": [
            "떠도는영혼"
        ],
        "baseStats": {
            "hp": 58,
            "atk": 95,
            "def": 145,
            "spa": 50,
            "spd": 105,
            "spe": 30
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Runerigus",
            "runerigus",
            "데스판"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/867.png"
    },
    {
        "id": 869,
        "name": "alcremie",
        "apiName": "alcremie",
        "koName": "마휘핑",
        "types": [
            "fairy"
        ],
        "abilities": [
            "스위트베일",
            "아로마베일"
        ],
        "baseStats": {
            "hp": 65,
            "atk": 60,
            "def": 75,
            "spa": 110,
            "spd": 121,
            "spe": 64
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Alcremie",
            "alcremie",
            "마휘핑"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/869.png"
    },
    {
        "id": 877,
        "name": "morpeko-full-belly",
        "apiName": "morpeko-full-belly",
        "koName": "모르페코 배부른 모양",
        "types": [
            "electric",
            "dark"
        ],
        "abilities": [
            "꼬르륵스위치"
        ],
        "baseStats": {
            "hp": 58,
            "atk": 95,
            "def": 58,
            "spa": 70,
            "spd": 58,
            "spe": 97
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Morpeko (Full Belly Mode)",
            "morpeko",
            "morpeko-full-belly",
            "모르페코",
            "모르페코 배부른 모양"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/877.png"
    },
    {
        "id": 10187,
        "name": "morpeko-hangry",
        "apiName": "morpeko-hangry",
        "koName": "모르페코 배고픈 모양",
        "types": [
            "electric",
            "dark"
        ],
        "abilities": [
            "꼬르륵스위치"
        ],
        "baseStats": {
            "hp": 58,
            "atk": 95,
            "def": 58,
            "spa": 70,
            "spd": 58,
            "spe": 97
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Morpeko (Hangry Mode)",
            "morpeko",
            "morpeko-hangry",
            "모르페코",
            "모르페코 배고픈 모양"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10187.png"
    },
    {
        "id": 887,
        "name": "dragapult",
        "apiName": "dragapult",
        "koName": "드래펄트",
        "types": [
            "dragon",
            "ghost"
        ],
        "abilities": [
            "클리어바디",
            "틈새포착",
            "저주받은바디"
        ],
        "baseStats": {
            "hp": 88,
            "atk": 120,
            "def": 75,
            "spa": 100,
            "spd": 75,
            "spe": 142
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Dragapult",
            "dragapult",
            "드래펄트"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/887.png"
    },
    {
        "id": 899,
        "name": "wyrdeer",
        "apiName": "wyrdeer",
        "koName": "신비록",
        "types": [
            "normal",
            "psychic"
        ],
        "abilities": [
            "위협",
            "통찰",
            "초식"
        ],
        "baseStats": {
            "hp": 103,
            "atk": 105,
            "def": 72,
            "spa": 105,
            "spd": 75,
            "spe": 65
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Wyrdeer",
            "wyrdeer",
            "신비록"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/899.png"
    },
    {
        "id": 900,
        "name": "kleavor",
        "apiName": "kleavor",
        "koName": "사마자르",
        "types": [
            "bug",
            "rock"
        ],
        "abilities": [
            "벌레의알림",
            "우격다짐",
            "Sharpness"
        ],
        "baseStats": {
            "hp": 70,
            "atk": 135,
            "def": 95,
            "spa": 45,
            "spd": 70,
            "spe": 85
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Kleavor",
            "kleavor",
            "사마자르"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/900.png"
    },
    {
        "id": 902,
        "name": "basculegion-male",
        "apiName": "basculegion-male",
        "koName": "대쓰여너",
        "types": [
            "water",
            "ghost"
        ],
        "abilities": [
            "쓱쓱",
            "적응력",
            "틀깨기"
        ],
        "baseStats": {
            "hp": 120,
            "atk": 112,
            "def": 65,
            "spa": 80,
            "spd": 75,
            "spe": 78
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Basculegion (Male)",
            "basculegion",
            "basculegion-male",
            "대쓰여너"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/902.png"
    },
    {
        "id": 10248,
        "name": "basculegion-female",
        "apiName": "basculegion-female",
        "koName": "대쓰여너",
        "types": [
            "water",
            "ghost"
        ],
        "abilities": [
            "쓱쓱",
            "적응력",
            "틀깨기"
        ],
        "baseStats": {
            "hp": 120,
            "atk": 92,
            "def": 65,
            "spa": 100,
            "spd": 75,
            "spe": 78
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Basculegion (Female)",
            "basculegion",
            "basculegion-female",
            "대쓰여너"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10248.png"
    },
    {
        "id": 903,
        "name": "sneasler",
        "apiName": "sneasler",
        "koName": "포푸니크",
        "types": [
            "fighting",
            "poison"
        ],
        "abilities": [
            "프레셔",
            "곡예",
            "독수"
        ],
        "baseStats": {
            "hp": 80,
            "atk": 130,
            "def": 60,
            "spa": 40,
            "spd": 80,
            "spe": 120
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Sneasler",
            "sneasler",
            "포푸니크"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/903.png"
    },
    {
        "id": 10250,
        "name": "tauros-paldea-combat-breed",
        "apiName": "tauros-paldea-combat-breed",
        "koName": "켄타로스",
        "types": [
            "fighting"
        ],
        "abilities": [
            "위협",
            "분노의경혈",
            "Cud Chew"
        ],
        "baseStats": {
            "hp": 75,
            "atk": 110,
            "def": 105,
            "spa": 30,
            "spd": 70,
            "spe": 100
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Paldean Tauros (Combat Breed)",
            "tauros",
            "tauros-paldea-combat-breed",
            "켄타로스"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10250.png"
    },
    {
        "id": 10251,
        "name": "tauros-paldea-blaze-breed",
        "apiName": "tauros-paldea-blaze-breed",
        "koName": "켄타로스",
        "types": [
            "fighting",
            "fire"
        ],
        "abilities": [
            "위협",
            "분노의경혈",
            "Cud Chew"
        ],
        "baseStats": {
            "hp": 75,
            "atk": 110,
            "def": 105,
            "spa": 30,
            "spd": 70,
            "spe": 100
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Paldean Tauros (Blaze Breed)",
            "tauros",
            "tauros-paldea-blaze-breed",
            "켄타로스"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10251.png"
    },
    {
        "id": 10252,
        "name": "tauros-paldea-aqua-breed",
        "apiName": "tauros-paldea-aqua-breed",
        "koName": "켄타로스",
        "types": [
            "fighting",
            "water"
        ],
        "abilities": [
            "위협",
            "분노의경혈",
            "Cud Chew"
        ],
        "baseStats": {
            "hp": 75,
            "atk": 110,
            "def": 105,
            "spa": 30,
            "spd": 70,
            "spe": 100
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Paldean Tauros (Aqua Breed)",
            "tauros",
            "tauros-paldea-aqua-breed",
            "켄타로스"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10252.png"
    },
    {
        "id": 10061,
        "name": "floette-eternal",
        "apiName": "floette-eternal",
        "koName": "플라엣테 영원의 꽃",
        "types": [
            "fairy"
        ],
        "abilities": [
            "플라워베일",
            "공생"
        ],
        "baseStats": {
            "hp": 74,
            "atk": 65,
            "def": 67,
            "spa": 125,
            "spd": 128,
            "spe": 92
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Eternal Flower Floette",
            "floette",
            "floette-eternal",
            "플라엣테",
            "플라엣테 영원의 꽃"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10061.png"
    },
    {
        "id": 908,
        "name": "meowscarada",
        "apiName": "meowscarada",
        "koName": "마스카나",
        "types": [
            "grass",
            "dark"
        ],
        "abilities": [
            "심록",
            "변환자재"
        ],
        "baseStats": {
            "hp": 76,
            "atk": 110,
            "def": 70,
            "spa": 81,
            "spd": 70,
            "spe": 123
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Meowscarada",
            "meowscarada",
            "마스카나"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/908.png"
    },
    {
        "id": 911,
        "name": "skeledirge",
        "apiName": "skeledirge",
        "koName": "라우드본",
        "types": [
            "fire",
            "ghost"
        ],
        "abilities": [
            "맹화",
            "천진"
        ],
        "baseStats": {
            "hp": 104,
            "atk": 75,
            "def": 100,
            "spa": 110,
            "spd": 75,
            "spe": 66
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Skeledirge",
            "skeledirge",
            "라우드본"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/911.png"
    },
    {
        "id": 914,
        "name": "quaquaval",
        "apiName": "quaquaval",
        "koName": "웨이니발",
        "types": [
            "water",
            "fighting"
        ],
        "abilities": [
            "급류",
            "자기과신"
        ],
        "baseStats": {
            "hp": 85,
            "atk": 120,
            "def": 80,
            "spa": 85,
            "spd": 75,
            "spe": 85
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Quaquaval",
            "quaquaval",
            "웨이니발"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/914.png"
    },
    {
        "id": 925,
        "name": "maushold-family-of-four",
        "apiName": "maushold-family-of-four",
        "koName": "파밀리쥐",
        "types": [
            "normal"
        ],
        "abilities": [
            "프렌드가드",
            "볼주머니",
            "테크니션"
        ],
        "baseStats": {
            "hp": 74,
            "atk": 75,
            "def": 70,
            "spa": 65,
            "spd": 75,
            "spe": 111
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Maushold",
            "maushold",
            "maushold-family-of-four",
            "파밀리쥐"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/925.png"
    },
    {
        "id": 934,
        "name": "garganacl",
        "apiName": "garganacl",
        "koName": "콜로솔트",
        "types": [
            "rock"
        ],
        "abilities": [
            "Purifying Salt",
            "옹골참",
            "클리어바디"
        ],
        "baseStats": {
            "hp": 100,
            "atk": 100,
            "def": 130,
            "spa": 45,
            "spd": 90,
            "spe": 35
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Garganacl",
            "garganacl",
            "콜로솔트"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/934.png"
    },
    {
        "id": 936,
        "name": "armarouge",
        "apiName": "armarouge",
        "koName": "카디나르마",
        "types": [
            "fire",
            "psychic"
        ],
        "abilities": [
            "타오르는불꽃",
            "깨어진갑옷"
        ],
        "baseStats": {
            "hp": 85,
            "atk": 60,
            "def": 100,
            "spa": 125,
            "spd": 80,
            "spe": 75
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Armarouge",
            "armarouge",
            "카디나르마"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/936.png"
    },
    {
        "id": 937,
        "name": "ceruledge",
        "apiName": "ceruledge",
        "koName": "파라블레이즈",
        "types": [
            "fire",
            "ghost"
        ],
        "abilities": [
            "타오르는불꽃",
            "깨어진갑옷"
        ],
        "baseStats": {
            "hp": 75,
            "atk": 125,
            "def": 80,
            "spa": 60,
            "spd": 100,
            "spe": 85
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Ceruledge",
            "ceruledge",
            "파라블레이즈"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/937.png"
    },
    {
        "id": 939,
        "name": "bellibolt",
        "apiName": "bellibolt",
        "koName": "찌리배리",
        "types": [
            "electric"
        ],
        "abilities": [
            "Electromorphosis",
            "정전기",
            "습기"
        ],
        "baseStats": {
            "hp": 109,
            "atk": 64,
            "def": 91,
            "spa": 103,
            "spd": 83,
            "spe": 45
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Bellibolt",
            "bellibolt",
            "찌리배리"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/939.png"
    },
    {
        "id": 952,
        "name": "scovillain",
        "apiName": "scovillain",
        "koName": "스코빌런",
        "types": [
            "grass",
            "fire"
        ],
        "abilities": [
            "엽록소",
            "불면",
            "변덕쟁이"
        ],
        "baseStats": {
            "hp": 65,
            "atk": 108,
            "def": 65,
            "spa": 108,
            "spd": 65,
            "spe": 75
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "scovillain-mega",
            "megaTypes": [
                "grass",
                "fire"
            ],
            "megaBaseStats": {
                "hp": 65,
                "atk": 138,
                "def": 85,
                "spa": 138,
                "spd": 85,
                "spe": 75
            }
        },
        "speedPreset": null,
        "aliases": [
            "Scovillain",
            "scovillain",
            "스코빌런"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/952.png"
    },
    {
        "id": 956,
        "name": "espathra",
        "apiName": "espathra",
        "koName": "클레스퍼트라",
        "types": [
            "psychic"
        ],
        "abilities": [
            "Opportunist",
            "통찰",
            "가속"
        ],
        "baseStats": {
            "hp": 95,
            "atk": 60,
            "def": 60,
            "spa": 101,
            "spd": 60,
            "spe": 105
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Espathra",
            "espathra",
            "클레스퍼트라"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/956.png"
    },
    {
        "id": 959,
        "name": "tinkaton",
        "apiName": "tinkaton",
        "koName": "두드리짱",
        "types": [
            "fairy",
            "steel"
        ],
        "abilities": [
            "틀깨기",
            "마이페이스",
            "나쁜손버릇"
        ],
        "baseStats": {
            "hp": 85,
            "atk": 75,
            "def": 77,
            "spa": 70,
            "spd": 105,
            "spe": 94
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Tinkaton",
            "tinkaton",
            "두드리짱"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/959.png"
    },
    {
        "id": 964,
        "name": "palafin-zero",
        "apiName": "palafin-zero",
        "koName": "돌핀맨",
        "types": [
            "water"
        ],
        "abilities": [
            "Zero To Hero"
        ],
        "baseStats": {
            "hp": 100,
            "atk": 70,
            "def": 72,
            "spa": 53,
            "spd": 62,
            "spe": 100
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Palafin (Zero Form)",
            "palafin",
            "palafin-zero",
            "돌핀맨"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/964.png"
    },
    {
        "id": 10256,
        "name": "palafin-hero",
        "apiName": "palafin-hero",
        "koName": "돌핀맨",
        "types": [
            "water"
        ],
        "abilities": [
            "Zero To Hero"
        ],
        "baseStats": {
            "hp": 100,
            "atk": 160,
            "def": 97,
            "spa": 106,
            "spd": 87,
            "spe": 100
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Palafin (Hero Form)",
            "palafin",
            "palafin-hero",
            "돌핀맨"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10256.png"
    },
    {
        "id": 968,
        "name": "orthworm",
        "apiName": "orthworm",
        "koName": "꿈트렁",
        "types": [
            "steel"
        ],
        "abilities": [
            "Earth Eater",
            "모래숨기"
        ],
        "baseStats": {
            "hp": 70,
            "atk": 85,
            "def": 145,
            "spa": 60,
            "spd": 55,
            "spe": 65
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Orthworm",
            "orthworm",
            "꿈트렁"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/968.png"
    },
    {
        "id": 970,
        "name": "glimmora",
        "apiName": "glimmora",
        "koName": "킬라플로르",
        "types": [
            "rock",
            "poison"
        ],
        "abilities": [
            "Toxic Debris",
            "부식"
        ],
        "baseStats": {
            "hp": 83,
            "atk": 55,
            "def": 90,
            "spa": 130,
            "spd": 81,
            "spe": 86
        },
        "roles": [],
        "mega": {
            "isMegaCapable": true,
            "megaName": "glimmora-mega",
            "megaTypes": [
                "rock",
                "poison"
            ],
            "megaBaseStats": {
                "hp": 83,
                "atk": 90,
                "def": 105,
                "spa": 150,
                "spd": 96,
                "spe": 101
            }
        },
        "speedPreset": null,
        "aliases": [
            "Glimmora",
            "glimmora",
            "킬라플로르"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/970.png"
    },
    {
        "id": 981,
        "name": "farigiraf",
        "apiName": "farigiraf",
        "koName": "키키링",
        "types": [
            "normal",
            "psychic"
        ],
        "abilities": [
            "Cud Chew",
            "Armor Tail",
            "초식"
        ],
        "baseStats": {
            "hp": 120,
            "atk": 90,
            "def": 70,
            "spa": 110,
            "spd": 70,
            "spe": 60
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Farigiraf",
            "farigiraf",
            "키키링"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/981.png"
    },
    {
        "id": 983,
        "name": "kingambit",
        "apiName": "kingambit",
        "koName": "대도각참",
        "types": [
            "dark",
            "steel"
        ],
        "abilities": [
            "오기",
            "Supreme Overlord",
            "프레셔"
        ],
        "baseStats": {
            "hp": 100,
            "atk": 135,
            "def": 120,
            "spa": 60,
            "spd": 85,
            "spe": 50
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Kingambit",
            "kingambit",
            "대도각참"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/983.png"
    },
    {
        "id": 1013,
        "name": "sinistcha",
        "apiName": "sinistcha",
        "koName": "그우린차",
        "types": [
            "grass",
            "ghost"
        ],
        "abilities": [
            "대접",
            "내열"
        ],
        "baseStats": {
            "hp": 71,
            "atk": 60,
            "def": 106,
            "spa": 121,
            "spd": 80,
            "spe": 70
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Sinistcha",
            "sinistcha",
            "그우린차"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1013.png"
    },
    {
        "id": 1018,
        "name": "archaludon",
        "apiName": "archaludon",
        "koName": "브리두라스",
        "types": [
            "steel",
            "dragon"
        ],
        "abilities": [
            "지구력",
            "옹골참",
            "굳건한신념"
        ],
        "baseStats": {
            "hp": 90,
            "atk": 105,
            "def": 130,
            "spa": 125,
            "spd": 65,
            "spe": 85
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Archaludon",
            "archaludon",
            "브리두라스"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1018.png"
    },
    {
        "id": 1019,
        "name": "hydrapple",
        "apiName": "hydrapple",
        "koName": "과미드라",
        "types": [
            "grass",
            "dragon"
        ],
        "abilities": [
            "감미로운꿀",
            "재생력",
            "점착"
        ],
        "baseStats": {
            "hp": 106,
            "atk": 80,
            "def": 110,
            "spa": 120,
            "spd": 80,
            "spe": 44
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Hydrapple",
            "hydrapple",
            "과미드라"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1019.png"
    },
    {
        "id": 10278,
        "name": "clefable-mega",
        "apiName": "clefable-mega",
        "koName": "픽시",
        "types": [
            "fairy",
            "flying"
        ],
        "abilities": [
            "매직미러"
        ],
        "baseStats": {
            "hp": 95,
            "atk": 80,
            "def": 93,
            "spa": 135,
            "spd": 110,
            "spe": 70
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Clefable",
            "clefable",
            "clefable-mega",
            "픽시"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10278.png"
    },
    {
        "id": 10279,
        "name": "victreebel-mega",
        "apiName": "victreebel-mega",
        "koName": "우츠보트",
        "types": [
            "grass",
            "poison"
        ],
        "abilities": [
            "내용물분출"
        ],
        "baseStats": {
            "hp": 80,
            "atk": 125,
            "def": 85,
            "spa": 135,
            "spd": 95,
            "spe": 70
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Victreebel",
            "victreebel",
            "victreebel-mega",
            "우츠보트"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10279.png"
    },
    {
        "id": 10280,
        "name": "starmie-mega",
        "apiName": "starmie-mega",
        "koName": "아쿠스타",
        "types": [
            "water",
            "psychic"
        ],
        "abilities": [
            "천하장사"
        ],
        "baseStats": {
            "hp": 60,
            "atk": 100,
            "def": 105,
            "spa": 130,
            "spd": 105,
            "spe": 120
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Starmie",
            "starmie",
            "starmie-mega",
            "아쿠스타"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10280.png"
    },
    {
        "id": 10281,
        "name": "dragonite-mega",
        "apiName": "dragonite-mega",
        "koName": "망나뇽",
        "types": [
            "dragon",
            "flying"
        ],
        "abilities": [
            "멀티스케일"
        ],
        "baseStats": {
            "hp": 91,
            "atk": 124,
            "def": 115,
            "spa": 145,
            "spd": 125,
            "spe": 100
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Dragonite",
            "dragonite",
            "dragonite-mega",
            "망나뇽"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10281.png"
    },
    {
        "id": 154,
        "name": "meganium",
        "apiName": "meganium",
        "koName": "메가니움",
        "types": [
            "grass"
        ],
        "abilities": [
            "심록",
            "리프가드"
        ],
        "baseStats": {
            "hp": 80,
            "atk": 82,
            "def": 100,
            "spa": 83,
            "spd": 100,
            "spe": 80
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Meganium",
            "meganium",
            "메가니움"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/154.png"
    },
    {
        "id": 10283,
        "name": "feraligatr-mega",
        "apiName": "feraligatr-mega",
        "koName": "장크로다일",
        "types": [
            "water",
            "dragon"
        ],
        "abilities": [
            "Dragonize"
        ],
        "baseStats": {
            "hp": 85,
            "atk": 160,
            "def": 125,
            "spa": 89,
            "spd": 93,
            "spe": 78
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Feraligatr",
            "feraligatr",
            "feraligatr-mega",
            "장크로다일"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10283.png"
    },
    {
        "id": 10284,
        "name": "skarmory-mega",
        "apiName": "skarmory-mega",
        "koName": "무장조",
        "types": [
            "steel",
            "flying"
        ],
        "abilities": [
            "굳건한신념"
        ],
        "baseStats": {
            "hp": 65,
            "atk": 140,
            "def": 110,
            "spa": 40,
            "spd": 100,
            "spe": 110
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Skarmory",
            "skarmory",
            "skarmory-mega",
            "무장조"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10284.png"
    },
    {
        "id": 10306,
        "name": "chimecho-mega",
        "apiName": "chimecho-mega",
        "koName": "치렁",
        "types": [
            "psychic",
            "steel"
        ],
        "abilities": [
            "부유"
        ],
        "baseStats": {
            "hp": 75,
            "atk": 50,
            "def": 110,
            "spa": 135,
            "spd": 120,
            "spe": 65
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Chimecho",
            "chimecho",
            "chimecho-mega",
            "치렁"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10306.png"
    },
    {
        "id": 10285,
        "name": "froslass-mega",
        "apiName": "froslass-mega",
        "koName": "눈여아",
        "types": [
            "ice",
            "ghost"
        ],
        "abilities": [
            "눈퍼뜨리기"
        ],
        "baseStats": {
            "hp": 70,
            "atk": 80,
            "def": 70,
            "spa": 140,
            "spd": 100,
            "spe": 120
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Froslass",
            "froslass",
            "froslass-mega",
            "눈여아"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10285.png"
    },
    {
        "id": 10286,
        "name": "emboar-mega",
        "apiName": "emboar-mega",
        "koName": "염무왕",
        "types": [
            "fire",
            "fighting"
        ],
        "abilities": [
            "틀깨기"
        ],
        "baseStats": {
            "hp": 110,
            "atk": 148,
            "def": 75,
            "spa": 110,
            "spd": 110,
            "spe": 75
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Emboar",
            "emboar",
            "emboar-mega",
            "염무왕"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10286.png"
    },
    {
        "id": 10287,
        "name": "excadrill-mega",
        "apiName": "excadrill-mega",
        "koName": "몰드류",
        "types": [
            "ground",
            "steel"
        ],
        "abilities": [
            "Piercing Drill"
        ],
        "baseStats": {
            "hp": 110,
            "atk": 165,
            "def": 100,
            "spa": 65,
            "spd": 65,
            "spe": 103
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Excadrill",
            "excadrill",
            "excadrill-mega",
            "몰드류"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10287.png"
    },
    {
        "id": 10291,
        "name": "chandelure-mega",
        "apiName": "chandelure-mega",
        "koName": "샹델라",
        "types": [
            "ghost",
            "fire"
        ],
        "abilities": [
            "틈새포착"
        ],
        "baseStats": {
            "hp": 60,
            "atk": 75,
            "def": 110,
            "spa": 175,
            "spd": 110,
            "spe": 90
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Chandelure",
            "chandelure",
            "chandelure-mega",
            "샹델라"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10291.png"
    },
    {
        "id": 10313,
        "name": "golurk-mega",
        "apiName": "golurk-mega",
        "koName": "골루그",
        "types": [
            "ground",
            "ghost"
        ],
        "abilities": [
            "보이지않는주먹"
        ],
        "baseStats": {
            "hp": 89,
            "atk": 159,
            "def": 105,
            "spa": 70,
            "spd": 105,
            "spe": 55
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Golurk",
            "golurk",
            "golurk-mega",
            "골루그"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10313.png"
    },
    {
        "id": 10292,
        "name": "chesnaught-mega",
        "apiName": "chesnaught-mega",
        "koName": "브리가론",
        "types": [
            "grass",
            "fighting"
        ],
        "abilities": [
            "방탄"
        ],
        "baseStats": {
            "hp": 88,
            "atk": 137,
            "def": 172,
            "spa": 74,
            "spd": 115,
            "spe": 44
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Chesnaught",
            "chesnaught",
            "chesnaught-mega",
            "브리가론"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10292.png"
    },
    {
        "id": 10293,
        "name": "delphox-mega",
        "apiName": "delphox-mega",
        "koName": "마폭시",
        "types": [
            "fire",
            "psychic"
        ],
        "abilities": [
            "부유"
        ],
        "baseStats": {
            "hp": 75,
            "atk": 69,
            "def": 72,
            "spa": 159,
            "spd": 125,
            "spe": 134
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Delphox",
            "delphox",
            "delphox-mega",
            "마폭시"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10293.png"
    },
    {
        "id": 10294,
        "name": "greninja-mega",
        "apiName": "greninja-mega",
        "koName": "개굴닌자",
        "types": [
            "water",
            "dark"
        ],
        "abilities": [
            "변환자재"
        ],
        "baseStats": {
            "hp": 72,
            "atk": 125,
            "def": 77,
            "spa": 133,
            "spd": 81,
            "spe": 142
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Greninja",
            "greninja",
            "greninja-mega",
            "개굴닌자"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10294.png"
    },
    {
        "id": 10296,
        "name": "floette-mega",
        "apiName": "floette-mega",
        "koName": "플라엣테",
        "types": [
            "fairy"
        ],
        "abilities": [
            "페어리오라"
        ],
        "baseStats": {
            "hp": 74,
            "atk": 85,
            "def": 87,
            "spa": 155,
            "spd": 148,
            "spe": 102
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Floette",
            "floette",
            "floette-mega",
            "플라엣테"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10296.png"
    },
    {
        "id": 10314,
        "name": "meowstic-mega",
        "apiName": "meowstic-mega",
        "koName": "냐오닉스",
        "types": [
            "psychic"
        ],
        "abilities": [
            "트레이스"
        ],
        "baseStats": {
            "hp": 74,
            "atk": 48,
            "def": 76,
            "spa": 143,
            "spd": 101,
            "spe": 124
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Meowstic (Male)",
            "meowstic",
            "meowstic-mega",
            "냐오닉스"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10314.png"
    },
    {
        "id": 10314,
        "name": "meowstic-mega",
        "apiName": "meowstic-mega",
        "koName": "냐오닉스",
        "types": [
            "psychic"
        ],
        "abilities": [
            "트레이스"
        ],
        "baseStats": {
            "hp": 74,
            "atk": 48,
            "def": 76,
            "spa": 143,
            "spd": 101,
            "spe": 124
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Meowstic (Female)",
            "meowstic",
            "meowstic-mega",
            "냐오닉스"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10314.png"
    },
    {
        "id": 10300,
        "name": "hawlucha-mega",
        "apiName": "hawlucha-mega",
        "koName": "루차불",
        "types": [
            "fighting",
            "flying"
        ],
        "abilities": [
            "노가드"
        ],
        "baseStats": {
            "hp": 78,
            "atk": 137,
            "def": 100,
            "spa": 74,
            "spd": 93,
            "spe": 118
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Hawlucha",
            "hawlucha",
            "hawlucha-mega",
            "루차불"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10300.png"
    },
    {
        "id": 10315,
        "name": "crabominable-mega",
        "apiName": "crabominable-mega",
        "koName": "모단단게",
        "types": [
            "fighting",
            "ice"
        ],
        "abilities": [
            "철주먹"
        ],
        "baseStats": {
            "hp": 97,
            "atk": 157,
            "def": 122,
            "spa": 62,
            "spd": 107,
            "spe": 33
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Crabominable",
            "crabominable",
            "crabominable-mega",
            "모단단게"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10315.png"
    },
    {
        "id": 10302,
        "name": "drampa-mega",
        "apiName": "drampa-mega",
        "koName": "할비롱",
        "types": [
            "normal",
            "dragon"
        ],
        "abilities": [
            "발끈"
        ],
        "baseStats": {
            "hp": 78,
            "atk": 85,
            "def": 110,
            "spa": 160,
            "spd": 116,
            "spe": 36
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Drampa",
            "drampa",
            "drampa-mega",
            "할비롱"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10302.png"
    },
    {
        "id": 10320,
        "name": "scovillain-mega",
        "apiName": "scovillain-mega",
        "koName": "스코빌런",
        "types": [
            "grass",
            "fire"
        ],
        "abilities": [
            "Spicy Spray"
        ],
        "baseStats": {
            "hp": 65,
            "atk": 138,
            "def": 85,
            "spa": 138,
            "spd": 85,
            "spe": 75
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Scovillain",
            "scovillain",
            "scovillain-mega",
            "스코빌런"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10320.png"
    },
    {
        "id": 10321,
        "name": "glimmora-mega",
        "apiName": "glimmora-mega",
        "koName": "킬라플로르",
        "types": [
            "rock",
            "poison"
        ],
        "abilities": [
            "적응력"
        ],
        "baseStats": {
            "hp": 83,
            "atk": 90,
            "def": 105,
            "spa": 150,
            "spd": 96,
            "spe": 101
        },
        "roles": [],
        "mega": {
            "isMegaCapable": false,
            "megaName": "",
            "megaTypes": [],
            "megaBaseStats": null
        },
        "speedPreset": null,
        "aliases": [
            "Mega Glimmora",
            "glimmora",
            "glimmora-mega",
            "킬라플로르"
        ],
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10321.png"
    }
];

    function normalize(value) {
        return String(value || "")
            .toLowerCase()
            .replace(/[\s\-_.'’:%♀♂()]/g, "")
            .trim();
    }

    function getOfficialArtworkUrl(pokemon) {
        return pokemon && pokemon.id ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png` : "";
    }

    function getHomeImageUrl(pokemon) {
        return pokemon && pokemon.id ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png` : "";
    }

    function getPokemonImageUrl(pokemon) {
        return getOfficialArtworkUrl(pokemon) || getHomeImageUrl(pokemon) || (pokemon && pokemon.imageUrl ? pokemon.imageUrl : "");
    }

    function pushUnique(list, value) {
        if (!value || list.includes(value)) {
            return;
        }
        list.push(value);
    }

    function normalizeFormRoster() {
        const shield = POKEMON_LIST.find((pokemon) => pokemon.name === "aegislash-shield");
        const blade = POKEMON_LIST.find((pokemon) => pokemon.name === "aegislash-blade");

        if (!shield || !blade) {
            return;
        }

        shield.name = "aegislash";
        shield.apiName = "aegislash-shield";
        shield.koName = "킬가르도";
        shield.displayKoName = "킬가르도";
        shield.formKey = "shield";
        shield.formLabel = "실드폼";
        shield.formFamily = "aegislash";
        shield.forms = [
            { key: "shield", label: "실드폼", name: "aegislash", koName: "킬가르도", imageUrl: shield.imageUrl, baseStats: shield.baseStats },
            { key: "blade", label: "블레이드폼", name: "aegislash-blade", koName: "킬가르도", imageUrl: blade.imageUrl, baseStats: blade.baseStats }
        ];
        pushUnique(shield.aliases, "aegislash-shield");
        pushUnique(shield.aliases, "킬가르도 실드폼");
        pushUnique(shield.aliases, "킬가르도");

        blade.hiddenFromSearch = true;
        blade.displayKoName = "킬가르도";
        blade.formKey = "blade";
        blade.formLabel = "블레이드폼";
        blade.formFamily = "aegislash";
        blade.canonicalName = "aegislash";
        pushUnique(blade.aliases, "킬가르도 블레이드폼");
    }

    function normalizeMegaRoster() {
        const baseByName = new Map();

        POKEMON_LIST.forEach((pokemon) => {
            if (!String(pokemon.name || "").includes("-mega")) {
                baseByName.set(pokemon.name, pokemon);
            }
        });

        const megaMeganium = POKEMON_LIST.find((pokemon) => pokemon.name === "meganium" && (pokemon.aliases || []).includes("Mega Meganium"));
        const baseMeganium = POKEMON_LIST.find((pokemon) => pokemon.name === "meganium" && !(pokemon.aliases || []).includes("Mega Meganium"));

        if (megaMeganium) {
            megaMeganium.id = 10282;
            megaMeganium.name = "meganium-mega";
            megaMeganium.apiName = "meganium-mega";
            megaMeganium.koName = "메가메가니움";
            megaMeganium.types = ["grass", "fairy"];
            megaMeganium.abilities = ["메가솔"];
            megaMeganium.baseStats = { hp: 80, atk: 92, def: 115, spa: 143, spd: 115, spe: 80 };
            megaMeganium.imageUrl = getOfficialArtworkUrl(megaMeganium);
            megaMeganium.aliases = Array.isArray(megaMeganium.aliases) ? megaMeganium.aliases : [];
            pushUnique(megaMeganium.aliases, "meganium-mega");
            pushUnique(megaMeganium.aliases, "메가메가니움");
        }

        if (baseMeganium && megaMeganium) {
            baseMeganium.mega = {
                isMegaCapable: true,
                megaName: "meganium-mega",
                megaTypes: ["grass", "fairy"],
                megaBaseStats: { hp: 80, atk: 92, def: 115, spa: 143, spd: 115, spe: 80 }
            };
        }

        POKEMON_LIST.forEach((pokemon) => {
            const aliases = Array.isArray(pokemon.aliases) ? pokemon.aliases : [];
            const megaAlias = aliases.find((alias) => /^Mega /i.test(alias));

            if (pokemon.name === "meowstic-mega" && megaAlias) {
                const isFemale = megaAlias.includes("(Female)");
                pokemon.name = isFemale ? "meowstic-female-mega" : "meowstic-male-mega";
                pokemon.apiName = pokemon.name;
                pokemon.koName = isFemale ? "메가냐오닉스 암컷의 모습" : "메가냐오닉스 수컷의 모습";
                pushUnique(aliases, pokemon.name);
                pushUnique(aliases, pokemon.koName);
            }

            if (String(pokemon.name || "").includes("-mega")) {
                const baseName = pokemon.name.replace(/-mega$/, "");
                const basePokemon = baseByName.get(baseName);

                if (basePokemon && !String(pokemon.koName || "").startsWith("메가")) {
                    pokemon.koName = `메가${basePokemon.koName}`;
                }

                pushUnique(aliases, pokemon.name);
                pushUnique(aliases, pokemon.koName);
                if (!String(pokemon.imageUrl || "").includes("/official-artwork/")) {
                    pokemon.imageUrl = getOfficialArtworkUrl(pokemon);
                }
            }
        });
    }

    normalizeMegaRoster();
    normalizeFormRoster();

    const pokemonByName = new Map();
    const exactSearchMap = new Map();

    POKEMON_LIST.forEach((pokemon) => {
        pokemon.searchTerms = [pokemon.name, pokemon.koName].concat(pokemon.aliases || []);
        pokemonByName.set(pokemon.name, pokemon);

        pokemon.searchTerms.forEach((term) => {
            const key = normalize(term);
            if (!exactSearchMap.has(key)) {
                exactSearchMap.set(key, pokemon);
            }
        });
    });

    function getPokemonByName(name) {
        return pokemonByName.get(name) || null;
    }

    function getFormSpecies(value, formKey) {
        const pokemon = typeof value === "string" ? getPokemonByName(value) : value;

        if (!pokemon) {
            return null;
        }

        const family = pokemon.formFamily || pokemon.name;
        const desiredKey = normalize(formKey) || pokemon.formKey || "";

        if (!desiredKey) {
            return pokemon;
        }

        if (family === "aegislash" && desiredKey === "blade") {
            return getPokemonByName("aegislash-blade") || pokemon;
        }

        if (family === "aegislash" && desiredKey === "shield") {
            return getPokemonByName("aegislash") || pokemon;
        }

        return pokemon;
    }

    function resolvePokemon(value) {
        if (!value) {
            return null;
        }

        return exactSearchMap.get(normalize(value)) || pokemonByName.get(normalize(value)) || null;
    }

    function searchPokemon(query, limit) {
        const normalizedQuery = normalize(query);

        if (!normalizedQuery) {
            return [];
        }

        return POKEMON_LIST
            .filter((pokemon) => !pokemon.hiddenFromSearch)
            .map((pokemon) => {
                const primaryTerms = [pokemon.name, pokemon.koName].map((term) => normalize(term));
                const aliasTerms = (pokemon.aliases || []).map((term) => normalize(term));
                let primaryRank = 99;
                let aliasRank = 99;

                primaryTerms.forEach((normalizedTerm) => {
                    if (!normalizedTerm) {
                        return;
                    }

                    if (normalizedTerm === normalizedQuery) {
                        primaryRank = Math.min(primaryRank, 0);
                    } else if (normalizedTerm.startsWith(normalizedQuery)) {
                        primaryRank = Math.min(primaryRank, 1);
                    } else if (normalizedTerm.includes(normalizedQuery)) {
                        primaryRank = Math.min(primaryRank, 2);
                    }
                });

                aliasTerms.forEach((normalizedTerm) => {
                    if (!normalizedTerm) {
                        return;
                    }

                    if (normalizedTerm === normalizedQuery) {
                        aliasRank = Math.min(aliasRank, 3);
                    } else if (normalizedTerm.startsWith(normalizedQuery)) {
                        aliasRank = Math.min(aliasRank, 4);
                    } else if (normalizedTerm.includes(normalizedQuery)) {
                        aliasRank = Math.min(aliasRank, 5);
                    }
                });

                return { pokemon, bestRank: Math.min(primaryRank, aliasRank), primaryRank, aliasRank };
            })
            .filter((entry) => entry.bestRank < 99)
            .sort((left, right) => {
                if (left.bestRank !== right.bestRank) {
                    return left.bestRank - right.bestRank;
                }

                if (left.primaryRank !== right.primaryRank) {
                    return left.primaryRank - right.primaryRank;
                }

                if (left.aliasRank !== right.aliasRank) {
                    return left.aliasRank - right.aliasRank;
                }

                return left.pokemon.koName.localeCompare(right.pokemon.koName, "ko");
            })
            .slice(0, limit || 8)
            .map((entry) => entry.pokemon);
    }

    window.PokeData = {
        all: POKEMON_LIST,
        normalize,
        getPokemonImageUrl,
        getHomeImageUrl,
        getOfficialArtworkUrl,
        getPokemonByName,
        getFormSpecies,
        resolvePokemon,
        searchPokemon
    };
})();
