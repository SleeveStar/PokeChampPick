(function () {
    "use strict";

    const ROLE_LABELS = {
        lead: "선봉",
        cleaner: "마무리",
        wallbreaker: "벽파괴",
        pivot: "사이클",
        tank: "탱커",
        revenge: "견제",
        support: "보조"
    };
    const STRATEGY_LABELS = {
        hazards: "설치",
        speedControl: "속도제어",
        screens: "벽",
        weather: "날씨",
        recovery: "회복",
        setup: "부스트",
        pivot: "턴조정",
        disruption: "방해",
        trickRoom: "트릭룸"
    };
    const NON_OFFENSIVE_MOVE_KEYS = new Set([
        "protect", "detect", "wide-guard", "quick-guard", "ally-switch", "helping-hand",
        "tailwind", "trick-room", "safeguard", "light-screen", "reflect", "aurora-veil",
        "taunt", "encore", "disable", "substitute", "thunder-wave", "will-o-wisp", "toxic", "spore",
        "recover", "roost", "slack-off", "soft-boiled", "moonlight", "morning-sun", "synthesis",
        "calm-mind", "nasty-plot", "swords-dance", "dragon-dance", "bulk-up", "agility", "rock-polish",
        "curse", "coil", "growth", "shell-smash", "quiver-dance", "iron-defense", "amnesia",
        "trick", "switcheroo", "follow-me", "rage-powder", "fake-tears", "charm", "leer", "howl"
    ]);
    const LEAD_SUPPORT_MOVE_KEYS = new Set([
        "stealth-rock", "spikes", "sticky-web", "toxic-spikes", "taunt", "encore",
        "thunder-wave", "will-o-wisp", "spore", "tailwind", "trick-room", "fake-out",
        "reflect", "light-screen", "aurora-veil", "yawn"
    ]);
    const PIVOT_MOVE_KEYS = new Set([
        "u-turn", "volt-switch", "flip-turn", "parting-shot", "teleport", "baton-pass",
        "wish", "protect", "recover", "roost", "slack-off", "soft-boiled", "moonlight",
        "morning-sun", "synthesis", "haze", "chilly-reception"
    ]);
    const SETUP_MOVE_KEYS = new Set([
        "swords-dance", "dragon-dance", "nasty-plot", "calm-mind", "quiver-dance",
        "shell-smash", "agility", "rock-polish", "bulk-up", "curse", "coil", "growth",
        "trailblaze", "flame-charge"
    ]);
    const PRIORITY_MOVE_KEYS = new Set([
        "extreme-speed", "sucker-punch", "aqua-jet", "bullet-punch", "mach-punch",
        "shadow-sneak", "ice-shard", "vacuum-wave", "quick-attack", "first-impression",
        "fake-out", "accelerock", "jet-punch"
    ]);
    const HAZARD_MOVE_KEYS = new Set(["stealth-rock", "spikes", "sticky-web", "toxic-spikes"]);
    const SPEED_CONTROL_MOVE_KEYS = new Set(["tailwind", "thunder-wave", "icy-wind", "electroweb", "string-shot", "bulldoze", "scary-face", "glare"]);
    const SCREEN_MOVE_KEYS = new Set(["reflect", "light-screen", "aurora-veil"]);
    const WEATHER_MOVE_KEYS = new Set(["sunny-day", "rain-dance", "sandstorm", "snowscape", "hail", "chilly-reception"]);
    const RECOVERY_MOVE_KEYS = new Set(["recover", "roost", "slack-off", "soft-boiled", "moonlight", "morning-sun", "synthesis", "wish"]);
    const DISRUPTION_MOVE_KEYS = new Set(["taunt", "encore", "will-o-wisp", "toxic", "spore", "yawn", "trick", "switcheroo", "disable", "thunder-wave"]);
    const TRICK_ROOM_MOVE_KEYS = new Set(["trick-room"]);
    const PHYSICAL_MOVE_KEYS = new Set([
        "earthquake", "close-combat", "flare-blitz", "u-turn", "bullet-punch", "extreme-speed",
        "sucker-punch", "aqua-jet", "mach-punch", "shadow-sneak", "ice-shard", "quick-attack",
        "first-impression", "fake-out", "accelerock", "jet-punch", "brave-bird", "iron-head",
        "stone-edge", "rock-slide", "knock-off", "play-rough", "liquidation", "waterfall",
        "dragon-claw", "outrage", "wood-hammer", "power-whip", "poison-jab", "gunk-shot",
        "drain-punch", "body-press", "wave-crash", "bitter-blade", "triple-axel", "double-edge",
        "headlong-rush", "earthquake", "stomping-tantrum", "fire-punch", "ice-punch", "thunder-punch",
        "psychic-fangs", "cross-poison", "x-scissor", "megahorn", "rage-fist", "shadow-claw"
    ]);
    const SPECIAL_MOVE_KEYS = new Set([
        "hydro-pump", "surf", "scald", "moonblast", "shadow-ball", "draco-meteor", "dragon-pulse",
        "thunderbolt", "thunder", "volt-switch", "heat-wave", "fire-blast", "flamethrower",
        "overheat", "blizzard", "ice-beam", "freeze-dry", "air-slash", "hurricane", "dazzling-gleam",
        "psychic", "psyshock", "aura-sphere", "sludge-bomb", "earth-power", "power-gem", "energy-ball",
        "leaf-storm", "giga-drain", "dark-pulse", "water-spout", "electro-shot", "flash-cannon",
        "focus-blast", "boomburst", "expanding-force", "armor-cannon", "torch-song", "shadow-bone",
        "electro-drift", "make-it-rain", "chloroblast", "mist-ball", "luster-purge", "bleakwind-storm",
        "wildbolt-storm", "infernal-parade", "eerie-spell", "meteor-beam", "vacuum-wave"
    ]);
    const VERY_HIGH_POWER_MOVE_KEYS = new Set([
        "draco-meteor", "close-combat", "flare-blitz", "hydro-pump", "fire-blast", "leaf-storm",
        "overheat", "blizzard", "gunk-shot", "headlong-rush", "wave-crash", "boomburst",
        "make-it-rain", "electro-drift", "armor-cannon", "chloroblast", "v-create"
    ]);
    const HIGH_POWER_MOVE_KEYS = new Set([
        "earthquake", "moonblast", "shadow-ball", "thunderbolt", "surf", "heat-wave", "ice-beam",
        "hurricane", "brave-bird", "stone-edge", "power-whip", "play-rough", "liquidation",
        "dragon-claw", "outrage", "knock-off", "drain-punch", "body-press", "sludge-bomb",
        "earth-power", "power-gem", "dark-pulse", "aura-sphere", "flare-blitz", "waterfall",
        "bolt-strike", "wild-charge", "flare-blitz", "torch-song", "rage-fist"
    ]);
    const LOW_POWER_MOVE_KEYS = new Set([
        "u-turn", "volt-switch", "flip-turn", "shadow-sneak", "bullet-punch", "aqua-jet",
        "mach-punch", "quick-attack", "fake-out", "accelerock", "jet-punch", "vacuum-wave",
        "ice-shard", "trailblaze", "flame-charge"
    ]);
    const META_SPECIES_PROFILES = {
        garchomp: {
            weight: 1.45,
            leadBias: 1.45,
            coreBias: 1.1,
            label: "최상위 메타",
            hints: ["고속 지면 압박", "선봉 빈도 높음", "스텔스록/스케일샷 축"]
        },
        charizard: {
            weight: 1.35,
            leadBias: 1.05,
            coreBias: 1.2,
            label: "메가 화력축",
            hints: ["메가리자드온Y 비중 높음", "즉시 화력 압박", "태양 전개 경계"]
        },
        primarina: {
            weight: 1.3,
            leadBias: 0.25,
            coreBias: 1.3,
            label: "벌크 특수축",
            hints: ["문포스/아리아 중심", "물/페어리 밸런스 축", "중반 안정성 높음"]
        },
        archaludon: {
            weight: 1.26,
            leadBias: 0.35,
            coreBias: 1.18,
            label: "강철 드래곤축",
            hints: ["벌크+화력 겸비", "코어 잔류율 높음", "상성 압박 폭 넓음"]
        },
        hippowdon: {
            weight: 1.2,
            leadBias: 0.95,
            coreBias: 1.1,
            label: "설치 내구축",
            hints: ["스텔스록 전개", "내구 운영", "장기전 발판"]
        },
        corviknight: {
            weight: 1.18,
            leadBias: 0.2,
            coreBias: 1.18,
            label: "사이클 피벗축",
            hints: ["후출 안정성", "강철/비행 피벗", "교체전 핵심"]
        },
        mimikyu: {
            weight: 1.16,
            leadBias: 0.45,
            coreBias: 0.98,
            label: "비상 마무리축",
            hints: ["탈 특성으로 행동 보장", "후반 정리", "우선도 압박"]
        },
        gengar: {
            weight: 1.22,
            leadBias: 0.9,
            coreBias: 1.05,
            label: "고속 특수축",
            hints: ["메가겐가 경계", "빠른 독/고스트 압박", "상대 교체 제약"]
        },
        kingambit: {
            weight: 1.17,
            leadBias: 0.15,
            coreBias: 1.12,
            label: "후반 우선도축",
            hints: ["막판 청소 능력", "강철/악 압박", "후반전 비중 큼"]
        },
        kangaskhan: {
            weight: 1.15,
            leadBias: 0.6,
            coreBias: 1.05,
            label: "메가 대면축",
            hints: ["메가캥카 경계", "대면 화력", "넓은 범용성"]
        },
        lopunny: {
            weight: 1.14,
            leadBias: 0.75,
            coreBias: 0.98,
            label: "메가 템포축",
            hints: ["메가이어롭 축", "초반 압박", "고속 대면"]
        },
        meowscarada: {
            weight: 1.08,
            leadBias: 0.85,
            coreBias: 0.95,
            label: "템포 선봉축",
            hints: ["빠른 턴 교환", "초반 템포", "선봉 카드 빈도"]
        },
        rotom: {
            weight: 1.07,
            leadBias: 0.2,
            coreBias: 0.92,
            label: "유틸 피벗축",
            hints: ["워시로토무 경계", "볼트체인지 축", "대면 조정"]
        },
        aegislash: {
            weight: 1.09,
            leadBias: 0.15,
            coreBias: 1.03,
            label: "폼 전환축",
            hints: ["킬가르도 경계", "타입 저항 우수", "교체전 강함"]
        },
        hydreigon: {
            weight: 1.08,
            leadBias: 0.25,
            coreBias: 0.97,
            label: "범용 특수축",
            hints: ["삼삼드래 범용성", "타입 보완", "특수 압박"]
        },
        espathra: {
            weight: 1.05,
            leadBias: 0.3,
            coreBias: 0.96,
            label: "전개 에이스축",
            hints: ["클레스퍼트라 전개", "배턴/누적 부스트", "대응 강요"]
        },
        clefable: {
            weight: 1.04,
            leadBias: 0.05,
            coreBias: 0.94,
            label: "벌크 지원축",
            hints: ["픽시 보조", "버티기 우수", "전개 보조"]
        },
        dragonite: {
            weight: 1.08,
            leadBias: 0.55,
            coreBias: 1.02,
            label: "멀티스케일 축",
            hints: ["세팅 후 마무리", "우선도", "안정적인 후반 카드"]
        },
        scizor: {
            weight: 1.06,
            leadBias: 0.1,
            coreBias: 1.02,
            label: "강철 우선도축",
            hints: ["불릿펀치 마무리", "사이클 보조", "메가 가능"]
        },
        aggron: {
            weight: 1.03,
            leadBias: 0.1,
            coreBias: 0.92,
            label: "물리 내구축",
            hints: ["메가보스로 운용", "물리 대면 강함", "바디프레스 축"]
        }
    };
    const COMMUNITY_META_CORE_PROFILES = [
        {
            id: "gw-lopunny-garchomp-primarina",
            members: ["lopunny", "garchomp", "primarina"],
            weight: 2.4,
            sourceLabel: "GameWith 최강 파티",
            sourceDetail: "메가이어롭 축 기본 선출",
            notes: ["대면 압박", "스카프 한카리아스", "물리받이 보완용 누리레느"]
        },
        {
            id: "gw-kangaskhan-volcarona-greninja",
            members: ["kangaskhan", "volcarona", "greninja"],
            weight: 2.1,
            sourceLabel: "GameWith 최강 파티",
            sourceDetail: "메가캥카 축 기본 선출",
            notes: ["메가캥카 대면", "불카모스 후출", "개굴닌자 범용 정리"]
        },
        {
            id: "gw-garchomp-primarina-corviknight",
            members: ["garchomp", "primarina", "corviknight"],
            weight: 2.2,
            sourceLabel: "GameWith 사용률 동반 출전",
            sourceDetail: "한카리아스 기준 빈출 동반 축",
            notes: ["상위 사용률 코어", "타입 보완 우수", "63싱글 범용성"]
        },
        {
            id: "gw-charizard-hippowdon-primarina",
            members: ["charizard", "hippowdon", "primarina"],
            weight: 1.95,
            sourceLabel: "GameWith 사용률 동반 출전",
            sourceDetail: "리자몽 중심 빈출 축",
            notes: ["리자몽 축", "하마돈 지원", "누리레느 보완"]
        },
        {
            id: "gw-garchomp-espathra-clefable",
            members: ["garchomp", "espathra", "clefable"],
            weight: 1.85,
            sourceLabel: "GameWith 최강 파티",
            sourceDetail: "클레스퍼트라-픽시 전개 축",
            notes: ["스텔스록 시동", "배턴 전개", "에이스 보조"]
        },
        {
            id: "g8-charizard-hippowdon-scizor",
            members: ["charizard", "hippowdon", "scizor"],
            weight: 2.25,
            sourceLabel: "Game8 강한 파티 4선",
            sourceDetail: "리자몽Y 구축 핵심 3축",
            notes: ["리자몽Y 중심", "하마돈 전개", "메가핫삼 연계"]
        },
        {
            id: "g8-kangaskhan-gengar-primarina",
            members: ["kangaskhan", "gengar", "primarina"],
            weight: 2.05,
            sourceLabel: "Game8 강한 파티 4선",
            sourceDetail: "메가캥카 구축 핵심 3축",
            notes: ["메가캥카 축", "팬텀 압박", "누리레느 보완"]
        },
        {
            id: "g8-scizor-rotom-wash-garchomp",
            members: ["scizor", "rotom-wash", "garchomp"],
            weight: 2,
            sourceLabel: "Game8 강한 파티 4선",
            sourceDetail: "메가핫삼 구축 핵심 3축",
            notes: ["메가핫삼 축", "워시로토무 피벗", "한카리아스 압박"]
        },
        {
            id: "g8-primarina-aegislash-hydreigon",
            members: ["primarina", "aegislash", "hydreigon"],
            weight: 1.7,
            sourceLabel: "Game8 레이트 2000+ 파티",
            sourceDetail: "상위권 밸런스 샘플 축",
            notes: ["누리레느 밸런스", "킬가르도 피벗", "삼삼드래 보완"]
        },
        {
            id: "kr-garchomp-primarina-rotom-wash",
            members: ["garchomp", "primarina", "rotom-wash"],
            weight: 1.55,
            sourceLabel: "한국 커뮤니티 실전 예시",
            sourceDetail: "국내 유저 승률 체감 축",
            notes: ["한카리아스 밸런스", "누리레느 채용 빈도", "워시로토무 보완"]
        },
        {
            id: "kr-glimmora-kangaskhan-aegislash",
            members: ["glimmora", "kangaskhan", "aegislash"],
            weight: 1.85,
            sourceLabel: "한국 커뮤니티 2000점 샘플",
            sourceDetail: "킬라플로르 선출 시 핵심 3축",
            notes: ["킬라플로르 선봉", "메가캥카 동반", "킬가르도 후속"]
        },
        {
            id: "kr-kangaskhan-aegislash-hippowdon",
            members: ["kangaskhan", "aegislash", "hippowdon"],
            weight: 1.8,
            sourceLabel: "한국 커뮤니티 2000점 샘플",
            sourceDetail: "비행/강철 많은 판 기본 선출",
            notes: ["메가캥카 압박", "킬가르도 특수형", "하마돈 보완"]
        },
        {
            id: "kr-kangaskhan-aegislash-hydreigon",
            members: ["kangaskhan", "aegislash", "hydreigon"],
            weight: 1.72,
            sourceLabel: "한국 커뮤니티 2000점 샘플",
            sourceDetail: "대면 보완용 대체 선출",
            notes: ["메가캥카 축", "킬가르도 대응", "삼삼드래 마무리"]
        }
    ];
    const SPECIES_META_NOTES = {
        garchomp: {
            chip: "고속 압박",
            opponent: [
                "한카리아스는 스카프, 기합의띠, 스케일샷 계열이 모두 자연스러워 선봉부터 마무리까지 읽기가 까다로운 편입니다.",
                "한카리아스는 초반 대면 압박과 후반 정리 각을 동시에 가져가서 상대가 가장 먼저 의식하게 만드는 축입니다.",
                "한카리아스는 타입 상성보다 먼저 속도와 지진 압박을 강요해 선출 단계에서 기준점처럼 작동합니다."
            ],
            threat: [
                "한카리아스는 선봉 빈도도 높고 후반 마무리각도 있어 한 번 놓치면 경기 전반을 흔들기 쉽습니다.",
                "한카리아스는 초반 정보 확인용 카드처럼 보이면서도 그대로 게임을 끝낼 수 있어 대면 판단이 특히 중요합니다.",
                "한카리아스는 땅 일관성과 속도 압박이 커서 무난한 상성만으로는 대응했다고 보기 어려운 상대입니다."
            ],
            response: [
                "한카리아스 상대로는 한 번 받아내는 것보다 속도 라인을 넘기지 않거나 즉시 유효타를 넣는 대응이 더 중요합니다.",
                "한카리아스는 오래 두면 유리한 교환을 반복하기 쉬워서 정면 압박이나 명확한 견제기로 템포를 끊는 편이 낫습니다.",
                "한카리아스는 한 턴만 비워도 스케일샷이나 스텔스록으로 흐름을 가져갈 수 있어 초반 대응 정확도가 중요합니다."
            ]
        },
        hippowdon: {
            chip: "설치 완충",
            opponent: [
                "하마돈은 스텔스록과 하품을 기반으로 물리 압박을 한 번 끊어 내는 데 강해 운영 단계에서 특히 성가롭습니다.",
                "하마돈은 단순 탱커보다 설치와 회복을 같이 써서 상대 템포를 늦추는 쪽이 더 까다로운 포켓몬입니다.",
                "하마돈은 물리 에이스를 억지로 멈춰 세운 뒤 하품과 교체전으로 판을 늘리는 성향이 강합니다."
            ],
            threat: [
                "하마돈은 스텔스록, 하품, 게으름피우기 때문에 대면 하나보다 전체 템포를 계속 끊어 먹는 쪽이 더 까다롭습니다.",
                "하마돈은 한 번 안전하게 들어오면 설치와 수면 압박으로 선출 흐름 자체를 꼬기 쉬운 축입니다.",
                "하마돈은 정면 화력보다 교체를 강요하는 압박이 강해서 운영이 꼬이기 시작하면 체감 난도가 크게 올라갑니다."
            ],
            response: [
                "하마돈 상대로는 장기전으로 받아 주기보다 강한 특수 물·풀 타점으로 바로 흔드는 편이 안정적입니다.",
                "하마돈은 천천히 상대하면 하품과 회복으로 시간을 벌기 쉬워서 짧은 턴 안에 압박하는 대응이 더 좋습니다.",
                "하마돈은 물리 대면으로 풀기 어렵기 쉬워 특수 타점이나 확실한 교체 유도 수단을 준비하는 편이 낫습니다."
            ]
        },
        corviknight: {
            chip: "교체전 장악",
            opponent: [
                "아머까오는 강철/비행 저항과 유턴, 회복기 덕분에 불리하지 않은 대면을 길게 끌고 가는 데 능합니다.",
                "아머까오는 한 번 받아낸 뒤 유턴으로 판을 다시 정리하는 식이라 즉시 화력보다 교체전 감각이 더 중요한 상대입니다.",
                "아머까오는 물리를 받아내고 후속에게 안전하게 연결하는 능력이 좋아 밸런스 코어의 중심축으로 자주 보입니다."
            ],
            threat: [
                "아머까오는 단순히 안 죽는 수준이 아니라 유턴과 회복으로 교체전 주도권을 오래 잡아 꽤 까다롭습니다.",
                "아머까오는 한 번 자리 잡으면 물리 어태커를 무디게 만들고 후속 메타 포켓몬에게 자연스럽게 넘기는 축입니다.",
                "아머까오는 대면 화력은 과하지 않아도 받아낸 뒤 다시 빠지는 흐름이 좋아 체감상 훨씬 성가롭게 느껴집니다."
            ],
            response: [
                "아머까오 상대로는 약한 접촉기로 여러 번 두드리기보다 강한 특수 압박이나 전기·불꽃 견제가 더 확실합니다.",
                "아머까오는 교체전을 길게 가져갈수록 가치가 커져서 턴을 오래 주지 않는 대응이 중요합니다.",
                "아머까오는 받아내는 역할이 뚜렷해 유턴을 허용하지 않고 즉시 압박할 수 있는 카드가 특히 좋습니다."
            ]
        },
        archaludon: {
            chip: "행동 보장",
            opponent: [
                "브리두라스는 튼튼함이나 지구력 축 때문에 한 번은 꼭 행동하는 느낌이 강해 대면전에서 계산을 꼬기 쉽습니다.",
                "브리두라스는 특수 화력과 설치, 벽, 전개 방해까지 폭이 넓어서 세트 추정이 늦으면 대응이 어려워집니다.",
                "브리두라스는 강철/드래곤 상성과 행동 보장이 겹쳐 무난한 교환만으로는 쉽게 밀리지 않는 축입니다."
            ],
            threat: [
                "브리두라스는 행동 보장과 특수 압박을 동시에 가져가서 예상보다 한 턴 더 버티며 전개를 시작하기 쉽습니다.",
                "브리두라스는 메테오빔, 안경, 스텔스록, 벽 전개까지 전부 가능해 세트 확인 전까지는 꽤 까다로운 상대입니다.",
                "브리두라스는 한 번 버틴 뒤 특공 상승이나 전개 보조까지 이어질 수 있어 첫 대응이 느슨하면 흐름을 내주기 쉽습니다."
            ],
            response: [
                "브리두라스 상대로는 한 번 버틴다는 전제를 두고, 그 다음 턴까지 감안한 후속 대응을 같이 준비하는 편이 좋습니다.",
                "브리두라스는 세트 폭이 넓어 단일 카운터보다 격투·땅 압박과 후속 마무리 계획을 함께 두는 편이 안전합니다.",
                "브리두라스는 예상보다 오래 남아 판을 꼬기 쉬워 첫 타점만이 아니라 후속 정리선까지 계산하는 편이 좋습니다."
            ]
        },
        primarina: {
            chip: "특수 완충",
            opponent: [
                "누리레느는 높은 특수 화력에 퀵턴과 아쿠아제트까지 있어 단순 특수 어태커보다 훨씬 유연한 축입니다.",
                "누리레느는 물/페어리 조합이 좋아 무난하게 던지기 쉽고, 맞으면서도 다음 턴 운영을 이어 가기 편합니다.",
                "누리레느는 먹다남은음식이나 열매 계열과도 잘 맞아 특수 완충과 후속 연결을 동시에 맡는 경우가 많습니다."
            ],
            threat: [
                "누리레느는 타입 조합이 훌륭해 억지로 받아낼 수 있는 포켓몬이 제한되고, 퀵턴으로 손해를 줄이기도 쉽습니다.",
                "누리레느는 단순 화력보다도 안정적인 상성, 우선도, 대면 조정까지 함께 가져가 꽤 성가로운 밸런스 카드입니다.",
                "누리레느는 물·페어리 자속의 일관성이 좋아 선출이 무난하고, 한번 들어오면 손해 없이 빠져나가기 쉽습니다."
            ],
            response: [
                "누리레느 상대로는 반감 하나만 믿기보다 전기·독 압박이나 강한 물리 화력으로 짧게 끊는 편이 안정적입니다.",
                "누리레느는 퀵턴과 우선도가 있어 느슨하게 상대하면 손해만 적게 보고 빠지기 쉬워 즉시 압박이 중요합니다.",
                "누리레느는 안정적인 후출 가치가 높아 턴을 오래 주기보다 명확한 약점을 찌르는 대응이 필요합니다."
            ]
        },
        gengar: {
            chip: "고속 특수",
            opponent: [
                "팬텀은 빠른 독/고스트 타점과 길동무, 얼음바람 같은 변수 때문에 약한 상성 우위만으로는 안심하기 어렵습니다.",
                "팬텀은 기합의띠 일반형도 성가롭고 메가축까지 겹치면 대면 압박이 훨씬 날카로워집니다.",
                "팬텀은 속도와 기술 폭이 좋아 상대의 보조 턴이나 느슨한 교체를 곧바로 벌점으로 만드는 축입니다."
            ],
            threat: [
                "팬텀은 빠른 독/고스트 압박과 길동무 같은 마무리 변수 때문에 계산보다 체감 난도가 더 높은 상대입니다.",
                "팬텀은 유리 대면을 길게 보는 포켓몬이 아니라 한두 턴 안에 크게 흔들어 놓는 쪽이라 선출부터 까다롭습니다.",
                "팬텀은 메가축까지 열리면 교체 허용 자체가 부담이 커져 운영 여유를 많이 주기 어렵습니다."
            ],
            response: [
                "팬텀 상대로는 불필요한 보조 턴을 주지 않고, 한 번에 큰 압박을 넣거나 우선도로 마무리하는 대응이 좋습니다.",
                "팬텀은 체력 자체는 두껍지 않아 속도 경쟁이나 기합의띠를 염두에 둔 2단 대응이 안정적입니다.",
                "팬텀은 한 턴 변수 가치가 큰 포켓몬이라 무리한 읽기보다 안전한 정리선이 있는 카드가 좋습니다."
            ]
        },
        kingambit: {
            chip: "후반 스윕",
            opponent: [
                "대도각참은 느려 보여도 기습과 높은 화력 덕분에 후반 한 턴만 열어 줘도 게임을 끝내기 쉬운 축입니다.",
                "대도각참은 악/강철 상성과 우선도 때문에 체력이 깎인 판에서 체감 압박이 급격히 커집니다.",
                "대도각참은 초반보다 후반 가치가 높은 포켓몬이라 남은 수와 체력 상황에 따라 위협도가 크게 올라갑니다."
            ],
            threat: [
                "대도각참은 후반에 기습 심리전이 열리는 순간 대응 난도가 올라가서 남겨 두기 특히 껄끄럽습니다.",
                "대도각참은 격투 4배 약점이 분명해도, 정작 막판에는 그 약점을 찌를 카드가 이미 빠진 경우가 많아 성가롭습니다.",
                "대도각참은 체력이 조금만 남아도 기습으로 판을 끝낼 수 있어 마지막 교환 구도를 어렵게 만듭니다."
            ],
            response: [
                "대도각참 상대로는 초반부터 격투 압박을 남겨 두거나, 기습을 비워낼 비공격 선택지를 준비하는 편이 좋습니다.",
                "대도각참은 후반 심리전이 강해지므로 체력 관리 단계에서부터 미리 답을 남기는 식의 대응이 중요합니다.",
                "대도각참은 느린 대신 기습으로 속도를 보정하니, 정면 화력만이 아니라 기습 빈칸까지 감안한 대응이 안정적입니다."
            ]
        },
        mimikyu: {
            chip: "행동 보장",
            opponent: [
                "따라큐는 탈 덕분에 한 번은 거의 반드시 움직여서 세팅, 트릭룸, 저주, 마무리 중 하나를 강제로 통과시키는 축입니다.",
                "따라큐는 순수 화력보다도 한 턴 보장을 바탕으로 판을 뒤집는 수단이 많아 끝까지 경계해야 합니다.",
                "따라큐는 후반 보험 카드로 넣어도 되고 전개 시동으로도 써서 선출 의도가 유연한 편입니다."
            ],
            threat: [
                "따라큐는 탈 하나 때문에 계산상 유리해 보여도 실제로는 한 턴 더 필요해지는 경우가 많아 꽤 까다롭습니다.",
                "따라큐는 칼춤 마무리, 트릭룸 시동, 저주 압박까지 가능해 마지막까지 역할이 남는 축입니다.",
                "따라큐는 한 번은 움직인다는 확신이 있어 체력이 깎인 판일수록 위협도가 훨씬 커집니다."
            ],
            response: [
                "따라큐 상대로는 탈을 벗긴 뒤 바로 정리할 수 있는 2단 압박이 중요하고, 느슨한 세팅 턴을 주면 안 됩니다.",
                "따라큐는 한 턴 보장을 전제로 굴러가서 우선도나 연속 견제가 있을수록 대응이 편해집니다.",
                "따라큐는 탈을 확인한 뒤 후속 정리선까지 이어지는 카드가 특히 믿을 만합니다."
            ]
        },
        charizard: {
            chip: "메가 화력",
            opponent: [
                "리자몽은 메가Y 비중이 높아 한 턴 화력과 날씨 압박으로 게임 템포를 갑자기 바꾸는 축입니다.",
                "리자몽은 불꽃 화력 자체도 세지만, 태양까지 겹치면 기존 상성 계산이 흔들리기 쉬워 특히 조심해야 합니다.",
                "리자몽은 선출 단계에서부터 바위 약점과 메가 화력 중 무엇을 더 의식해야 할지 판단을 강요합니다."
            ],
            threat: [
                "리자몽은 메가Y를 전제로 보면 한 번의 잘못된 교체로도 판이 크게 기울 수 있어 즉시 화력 경계가 필요합니다.",
                "리자몽은 날씨 구간을 여는 순간 특수 압박이 급격히 올라가서 느린 대응은 거의 허용하지 않습니다.",
                "리자몽은 바위 약점이 분명하지만, 실제 경기에서는 그 전에 한 턴 이득을 크게 가져가려는 성향이 강합니다."
            ],
            response: [
                "리자몽 상대로는 반감만 믿고 받기보다 속도 라인과 날씨까지 감안한 즉시 견제가 더 안전합니다.",
                "리자몽은 한 턴 화력 기대값이 높아 교체전보다는 확실한 견제기나 스텔스록 압박을 미리 준비하는 편이 좋습니다.",
                "리자몽은 메가 여부가 확인되기 전에도 화력 부담이 커서 초반부터 강하게 압박하는 대응이 안정적입니다."
            ]
        },
        aegislash: {
            chip: "폼 변수",
            opponent: [
                "킬가르도는 폼 전환과 뛰어난 저항 덕분에 상대의 선택을 한 번 더 꼬이게 만드는 축입니다.",
                "킬가르도는 정면 화력만이 아니라 실드폼으로 받아내고 블레이드폼으로 반격하는 흐름이 특히 까다롭습니다.",
                "킬가르도는 고스트/강철 상성 덕분에 밸런스 코어 안에서 틈을 메우는 역할로 자주 들어옵니다."
            ],
            threat: [
                "킬가르도는 폼 전환 때문에 평범한 속도·화력 계산이 잘 어긋나 실제 체감 난도가 높습니다.",
                "킬가르도는 무난한 반감 구조와 폼 변수 덕분에 마무리 카드와 받아내기 카드 역할을 동시에 노릴 수 있습니다.",
                "킬가르도는 한 턴 잘못 치면 실드폼에 막히고, 머뭇거리면 블레이드폼 화력에 반격당하기 쉬운 상대입니다."
            ],
            response: [
                "킬가르도 상대로는 한 번에 끝내지 못할 상황을 먼저 전제로 두고, 다음 턴까지 이어지는 대응이 더 안정적입니다.",
                "킬가르도는 폼 심리전이 있어 약한 연타보다 강한 중립타나 확실한 후속 정리선이 중요합니다.",
                "킬가르도는 실드폼에서 시간을 벌기 쉬우니 무리한 읽기보다 안전한 압박을 반복하는 편이 낫습니다."
            ]
        },
        rotom: {
            chip: "피벗 유틸",
            opponent: [
                "워시로토무는 타입과 유틸이 좋아 무난하게 던지기 쉽고, 불리한 판도 볼트체인지로 크게 손해 보지 않습니다.",
                "워시로토무는 공격보다 대면 조정과 화상 압박 쪽이 더 성가로워서 체감상 까다로운 포켓몬입니다.",
                "워시로토무는 한 번 받아낸 뒤 볼트체인지로 메타 에이스에게 넘기는 흐름이 자연스러워 밸런스 축에서 자주 보입니다."
            ],
            threat: [
                "워시로토무는 정면 돌파력이 과한 편은 아니어도, 대면 조정과 상태이상 때문에 운영을 길게 꼬기 좋습니다.",
                "워시로토무는 볼트체인지 하나만으로도 상대 교체 순서를 계속 불편하게 만들 수 있어 꽤 성가롭습니다.",
                "워시로토무는 안전하게 들어와 안전하게 빠지는 흐름이 좋아 경기 템포를 조금씩 자기 쪽으로 당겨 갑니다."
            ],
            response: [
                "워시로토무 상대로는 천천히 받는 대응보다 풀 타점이나 즉시 압박으로 볼트체인지 각을 줄이는 편이 좋습니다.",
                "워시로토무는 상태이상과 피벗이 핵심이라 오래 두면 손해가 커져 짧게 압박하는 대응이 유리합니다.",
                "워시로토무는 맞대면 자체보다 후속 연결 가치가 높아, 교체 허용을 최소화하는 식의 대응이 안정적입니다."
            ]
        },
        glimmora: {
            chip: "초반 전개",
            opponent: [
                "킬라플로르는 선봉에서 독압정, 스텔스록, 고화력 특수 타점을 한 번에 보여 줄 수 있어 전개형 파티의 시동점이 됩니다.",
                "킬라플로르는 초반 한두 턴 가치가 유난히 커서, 그냥 잡더라도 설치가 남는 경우가 많아 까다롭습니다.",
                "킬라플로르는 선봉전에서 손해를 줄이고 후속 메가 에이스에게 판을 넘기는 용도로 자주 쓰입니다."
            ],
            threat: [
                "킬라플로르는 쓰러지기 전까지 설치와 독압박을 남기기 쉬워 선봉전 체감이 특히 불편한 축입니다.",
                "킬라플로르는 초반에 바닥을 오염시키고 빠지는 역할이 뚜렷해서 후속 에이스의 기대값을 올리기 쉽습니다.",
                "킬라플로르는 대면 하나보다 '설치가 남은 뒤의 후속 전개'가 더 성가로운 포켓몬입니다."
            ],
            response: [
                "킬라플로르 상대로는 선봉에서 설치를 최소화하거나, 설치를 감수하더라도 후속 에이스를 막을 카드까지 같이 준비해야 합니다.",
                "킬라플로르는 한 턴만 비워도 바닥이 남기 쉬워 초반부터 강하게 압박하는 대응이 좋습니다.",
                "킬라플로르는 자기 역할만 해도 이득을 보는 포켓몬이라 설치 이후 전개까지 함께 끊을 수 있어야 안정적입니다."
            ]
        }
    };
    const SPECIES_SOURCE_SIGNALS = {
        garchomp: {
            sourceChip: "사용률 기반",
            leadBias: 0.55,
            coreBias: 0.22,
            entry: [
                "최근 사용률 자료에선 한카리아스가 스카프와 기합의띠를 넓게 나눠 가져, 상대 엔트리만 봐도 초반 템포 카드로 먼저 의식하는 편이 자연스럽습니다.",
                "사용률 기준으로 한카리아스는 선봉/마무리 양쪽 채용이 모두 높아, 팀 프리뷰 단계에서 가장 먼저 가정해야 하는 엔트리 축입니다.",
                "한카리아스는 세트 분포가 넓게 퍼져 있어 상대 6마리 안에 보이면 기본 엔트리 후보로 올려 두는 편이 맞습니다."
            ],
            lead: [
                "스카프와 띠 비중이 모두 높아 실제로는 선봉에서 정보 확인과 압박을 같이 맡길 가능성이 큽니다.",
                "최근 63싱글 흐름에선 한카리아스를 초반 기준점으로 두는 경우가 많아 유력 선봉 후보로 보는 편이 자연스럽습니다.",
                "사용률과 세트 분포를 같이 보면 한카리아스는 선봉으로 나와도, 뒤에 남아도 모두 강해서 우선 추정 대상으로 잡기 좋습니다."
            ]
        },
        hippowdon: {
            sourceChip: "공략형 기반",
            leadBias: 0.4,
            coreBias: 0.2,
            entry: [
                "Game8 하마돈 육성론은 HD 스텔스록+하품형과 HB 물리완충형을 함께 제시해, 팀 프리뷰만으로도 선봉 시동과 후출 완충 두 가능성을 모두 열어 두게 만듭니다.",
                "하마돈은 공략 사이트에서도 설치+하품과 물리막이 두 축이 같이 잡혀 있어, 엔트리 추측 단계에서 운영 시동 카드로 먼저 의식하기 쉽습니다.",
                "실전 자료와 공략 흐름을 같이 보면 하마돈은 단순 탱커가 아니라 바닥을 깔고 템포를 끊는 엔트리 후보로 읽는 편이 맞습니다."
            ],
            lead: [
                "스텔스록과 하품형이 널리 소개돼 있어 선봉으로 나와 초반 흐름을 늦추는 그림을 우선 상정하기 쉽습니다.",
                "하마돈은 특수 완충형도 존재하지만, 팀 프리뷰 단계에선 설치 시동 선봉 가능성을 먼저 보는 편이 더 자연스럽습니다.",
                "상대 조합이 리자몽이나 강한 에이스를 함께 들고 있으면 하마돈 선봉으로 판을 여는 시나리오가 꽤 설득력 있습니다."
            ]
        },
        corviknight: {
            sourceChip: "물리막이 기반",
            leadBias: 0.12,
            coreBias: 0.34,
            entry: [
                "Game8 아머까오 육성론이 유턴, 회복기, 바디프레스를 중심으로 잡혀 있어, 실제 엔트리 추측에서도 교체전 완충축으로 보는 편이 자연스럽습니다.",
                "아머까오는 공략 자료에서도 물리막이와 유턴 축이 강조돼 있어 선봉보다 중반 교체전 핵심 카드로 읽히는 경우가 많습니다.",
                "아머까오는 강철/비행 저항과 유턴 운영이 정형화돼 있어 팀 프리뷰에서 뒤에서 나올 확률을 높게 보게 만드는 포켓몬입니다."
            ],
            lead: [
                "아머까오는 선봉보다는 후출 피벗이 더 흔하지만, 물리 중심 상대를 의식한 안정 선봉 카드로도 가끔 열릴 수 있습니다.",
                "선봉 빈도 자체는 아주 높지 않아도, 상대가 물리 대면을 강하게 막고 싶을 때는 아머까오부터 시작하는 그림도 충분히 나옵니다.",
                "아머까오는 초반 정보 확인용보다 중반 완충 가치가 높아, 엔트리 추측에서도 뒤에 남아 있을 가능성을 크게 봐야 합니다."
            ]
        },
        primarina: {
            sourceChip: "사용률 기반",
            leadBias: 0.08,
            coreBias: 0.38,
            entry: [
                "사용률 자료에서 누리레느는 오보ン, 잔반, 물강화 아이템이 넓게 퍼져 있어, 무난한 밸런스 엔트리로 가장 자주 상정되는 카드 중 하나입니다.",
                "누리레느는 최근 메타에서 물/페어리 특수 완충이자 중반 조정 카드로 평가가 좋아, 팀 프리뷰에서 뒤쪽 핵심 축으로 자주 읽힙니다.",
                "아이템과 세트 폭이 너무 날카롭지 않아 오히려 어떤 조합에도 잘 붙는다는 점이 누리레느 엔트리 추측을 더 어렵게 만듭니다."
            ],
            lead: [
                "누리레느는 선봉보다는 뒤에서 받아내는 그림이 많지만, 상대 조합이 빠른 대면전에 치우쳤다면 안정 선봉으로도 충분히 열립니다.",
                "선봉 빈도 자체보다도 '어디에 놔도 무난하다'는 점 때문에 상대 3선출 안에 남을 가능성을 높게 봐야 합니다.",
                "누리레느는 보통 후출 가치가 더 크지만, 선봉 대면이 나빠 보이지 않으면 그대로 전개를 시작하기도 쉬운 카드입니다."
            ]
        },
        archaludon: {
            sourceChip: "체감/문의 기반",
            leadBias: 0.18,
            coreBias: 0.33,
            entry: [
                "브리두라스는 대응법을 묻는 글이 반복될 정도로 세트 폭과 행동 보장 체감이 강해, 상대 엔트리만으로도 우선 경계하게 되는 축입니다.",
                "커뮤니티 체감상 브리두라스는 '한 번은 꼭 움직인다'는 인상이 강해서, 팀 프리뷰에서도 실제 선출 가능성을 높게 보게 만듭니다.",
                "브리두라스는 설치, 특수 압박, 전개 보조 모두 가능해 팀 프리뷰 단계에서 세트 추정이 늦어지기 쉬운 포켓몬입니다."
            ],
            lead: [
                "브리두라스는 선봉 시동도 가능하지만 후출 완충으로도 강해, 유력 선봉이면서 동시에 뒤에 남아 있을 가능성도 큰 편입니다.",
                "상대 조합이 전개형이면 브리두라스가 초반부터 나오기 쉽고, 밸런스형이면 뒤에서 받는 축으로 남기 쉬운 포켓몬입니다.",
                "브리두라스는 선봉 확정형보다는 '어디에 둬도 가치가 있다'는 점에서 엔트리 추측을 더 어렵게 만듭니다."
            ]
        },
        charizard: {
            sourceChip: "메가축 기반",
            leadBias: 0.45,
            coreBias: 0.34,
            entry: [
                "사용률 자료에서 리자몽은 메가리자몽Y 비중이 매우 높아, 팀 프리뷰만 봐도 메가축 엔트리 후보로 먼저 읽히는 편입니다.",
                "Game8 강한 파티 예시에선 하마돈과 함께 리자몽Y 축이 반복돼, 리자몽이 보이면 날씨형 메가 압박을 우선 가정하게 됩니다.",
                "리자몽은 메가 여부가 사실상 선출 방향 자체를 바꾸는 포켓몬이라 프리뷰 단계에서 가장 강하게 반응하게 만드는 카드 중 하나입니다."
            ],
            lead: [
                "리자몽은 메가Y의 즉시 화력 때문에 선봉 출전도 충분히 자연스럽고, 상대가 수동적인 조합이면 초반부터 강하게 나올 가능성이 큽니다.",
                "하마돈 같은 완충축이 함께 보이면 리자몽은 초반보다 중후반 메가 마무리로 남을 수 있지만, 기본적으로는 언제 나와도 압박이 큰 포켓몬입니다.",
                "리자몽은 선봉 여부보다 '반드시 한 번은 나올 것 같은 메가축'이라는 점에서 엔트리 추측 우선순위가 높습니다."
            ]
        },
        kangaskhan: {
            sourceChip: "메가캥카 축",
            leadBias: 0.38,
            coreBias: 0.29,
            entry: [
                "GameWith와 Game8의 강한 파티 예시에서 메가캥카 축이 반복돼, 캥카가 보이면 우선 실전 메가 엔트리 후보로 읽는 편이 자연스럽습니다.",
                "메가캥카는 대면 화력과 범용성이 좋아 공략 샘플에서도 중심축으로 자주 제시돼 실제 선출 가능성을 높게 보게 만듭니다.",
                "한국 커뮤니티 2000점 샘플에서도 메가캥카 코어가 반복돼, 캥카는 지금 메타에서 체감 선출 빈도가 높은 카드로 보는 편이 맞습니다."
            ],
            lead: [
                "메가캥카는 초반 대면 화력 자체가 좋아 선봉으로 열어도 무난하고, 엔트리 추측에서도 앞에 설 가능성을 크게 봐야 합니다.",
                "캥카는 뒤에 남아도 강하지만 상대를 바로 눌러야 하는 판에선 선봉 카드로도 충분히 자연스러워 유력 엔트리 후보입니다.",
                "메가캥카 축은 실제 샘플 파티에서 선봉·중반 둘 다 자주 보여, 팀 프리뷰만으로 위치를 단정하긴 어렵지만 출전 가능성은 높게 봐야 합니다."
            ]
        },
        lopunny: {
            sourceChip: "메가이어롭 축",
            leadBias: 0.42,
            coreBias: 0.18,
            entry: [
                "GameWith 최강 파티 예시에선 메가이어롭-한카리아스-누리레느 축이 반복돼, 이어롭이 보이면 빠른 대면 메가 엔트리를 우선 가정하게 됩니다.",
                "메가이어롭은 초반 압박과 고속 대면이 장점이라, 팀 프리뷰 단계에서부터 '앞에서 강하게 나올 카드'로 읽히기 쉽습니다.",
                "메가이어롭 축은 공격적인 63싱글 샘플에서 자주 보이기 때문에, 이어롭이 있으면 속도전 중심 엔트리를 먼저 상정하는 편이 자연스럽습니다."
            ],
            lead: [
                "메가이어롭은 초반부터 압박을 거는 가치가 높아 선봉 출전 가능성을 꽤 높게 보는 편이 맞습니다.",
                "이어롭은 메가 턴을 빠르게 열수록 가치가 커 대면형 조합에선 선봉 후보로 자주 올라옵니다.",
                "한카리아스 같은 빠른 카드와 같이 보이면 메가이어롭 선봉으로 속도전부터 여는 그림이 더 설득력 있습니다."
            ]
        },
        scizor: {
            sourceChip: "메가핫삼 축",
            leadBias: 0.06,
            coreBias: 0.22,
            entry: [
                "Game8 강한 파티 예시에선 메가핫삼-워시로토무-한카리아스 축이 반복돼, 핫삼은 메가 마무리나 중반 완충축으로 자주 읽힙니다.",
                "핫삼은 공략 샘플상 선봉보다는 중반 교체전과 후반 불릿펀치 정리 쪽 가치가 더 커서 뒤에 남을 가능성을 높게 보게 됩니다.",
                "메가핫삼 축은 느슨한 운영보다 '받아내고 마무리'에 가까워 팀 프리뷰에서도 후출 카드로 자주 추정됩니다."
            ],
            lead: [
                "핫삼은 선봉으로도 나올 수 있지만 보통은 후출 가치가 더 커, 프리뷰에선 뒤쪽 에이스 후보로 두는 편이 더 자연스럽습니다.",
                "상대 조합이 페어리·풀 중심이면 핫삼 선봉도 가능하지만, 전체적으로는 뒤에 남아 마무리를 보는 쪽이 더 흔합니다.",
                "핫삼은 첫 카드보다 후속 정리 카드로 가치가 커 실제 엔트리 추측에서도 후반 쪽 비중을 높게 두게 됩니다."
            ]
        },
        aegislash: {
            sourceChip: "한국 샘플 기반",
            leadBias: 0.08,
            coreBias: 0.28,
            entry: [
                "한국 커뮤니티 2000점 샘플에서 킬가르도는 메가캥카, 하마돈 같은 축과 반복해서 묶여 중반 완충 겸 마무리 축으로 자주 등장합니다.",
                "킬가르도는 폼 전환과 상성 덕분에 실전 샘플에서도 빈틈을 메우는 카드로 자주 채택돼 엔트리 추측 우선순위가 높습니다.",
                "킬가르도는 공략보다도 실전 샘플에서 존재감이 커, 팀 프리뷰에서 보이면 밸런스 조합의 핵심 후속 카드로 읽히기 쉽습니다."
            ],
            lead: [
                "킬가르도는 선봉보다 중반 이후 가치가 더 큰 편이라, 실제 선출 추측에선 뒤에 남을 가능성을 조금 더 높게 보는 편이 낫습니다.",
                "상대 조합이 격투나 페어리 쪽 압박을 많이 주면 킬가르도를 초반 안전장치로 바로 꺼낼 수도 있습니다.",
                "킬가르도는 위치보다도 '반드시 한 번은 필요할 카드'인 경우가 많아, 선출 안에 남을 가능성이 높은 포켓몬입니다."
            ]
        },
        glimmora: {
            sourceChip: "한국 샘플 기반",
            leadBias: 0.62,
            coreBias: 0.16,
            entry: [
                "한국 커뮤니티 2000점 샘플에서 킬라플로르가 선봉 시동 축으로 반복돼, 팀 프리뷰 단계에선 유력한 초반 엔트리로 먼저 가정하는 편이 맞습니다.",
                "킬라플로르는 설치와 독압박을 남기는 역할이 선명해 실전 샘플에서도 대부분 선봉 가치가 크게 잡힙니다.",
                "킬라플로르는 프리뷰만 봐도 '바닥을 깔고 메가 에이스에게 잇는 카드'로 읽히는 경우가 많아 선봉 추정이 특히 쉽습니다."
            ],
            lead: [
                "킬라플로르는 실제 샘플에서도 선봉 시동 역할이 뚜렷해 유력 선봉으로 가장 먼저 올려둘 만한 포켓몬입니다.",
                "킬라플로르는 설치가 핵심이라 뒤에 숨기기보다 초반부터 나와 역할을 수행할 가능성이 큽니다.",
                "킬라플로르는 선봉 가치가 너무 명확해, 상대 6마리만 봐도 첫 카드 후보로 바로 떠오르는 편입니다."
            ]
        },
        rotom: {
            sourceChip: "보완축 기반",
            leadBias: 0.06,
            coreBias: 0.2,
            entry: [
                "워시로토무는 여러 강한 파티 예시에서 메가핫삼, 한카리아스 같은 축을 보완하는 피벗으로 반복돼 실제 선출 확률을 높게 보게 만듭니다.",
                "워시로토무는 실전 샘플에서 특정 에이스를 받쳐 주는 보완축으로 자주 보여, 프리뷰 단계에서도 후출 핵심 카드로 읽히기 쉽습니다.",
                "워시로토무는 볼트체인지와 화상 압박 덕분에 조합 완성도를 높이는 카드라 샘플 파티에서 꾸준히 채용됩니다."
            ],
            lead: [
                "워시로토무는 선봉보다는 중반 대면 조정 가치가 더 커, 실제 선출 추측에서도 뒤쪽 피벗으로 두는 편이 자연스럽습니다.",
                "상대가 불꽃·땅 압박을 강하게 주면 워시로토무를 선봉으로 낼 수 있지만, 일반적으로는 후출 가치가 더 큽니다.",
                "워시로토무는 첫 카드보다 연결 카드에 가까워 팀 프리뷰에서도 후속 운영축으로 읽히는 경우가 많습니다."
            ]
        },
        hydreigon: {
            sourceChip: "상위 샘플 기반",
            leadBias: 0.1,
            coreBias: 0.18,
            entry: [
                "삼삼드래는 상위 밸런스 샘플에서 누리레느, 킬가르도 같은 카드와 함께 보완형 특수 축으로 반복돼 실제 선출 가치를 높게 봅니다.",
                "삼삼드래는 특정 한 역할보다 넓은 상성 보완이 강점이라, 팀 프리뷰 단계에서 뒤에서 마무리나 중반 압박을 맡을 가능성이 큽니다.",
                "삼삼드래는 날카로운 선봉보다는 조합 완성도를 높이는 특수 축으로 자주 채택돼 샘플 파티 적중률이 높은 편입니다."
            ],
            lead: [
                "삼삼드래는 선봉 가능성도 있지만, 실제로는 후속 압박이나 마무리 역할이 더 자연스러워 뒤에 남을 확률을 조금 더 높게 봅니다.",
                "상대가 느린 밸런스 조합이면 삼삼드래를 앞에서 던질 수 있지만, 일반적으로는 중반 카드로 보는 편이 더 맞습니다.",
                "삼삼드래는 첫 카드보다 보완형 특수 압박에 가까워, 엔트리 추측에서도 후속 후보로 읽히는 경우가 많습니다."
            ]
        }
    };

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function isMegaSpecies(species) {
        return Boolean(species && String(species.name || "").includes("-mega"));
    }

    function isMegaStoneItem(itemName) {
        return Boolean(String(itemName || "").trim().includes("나이트"));
    }

    function getItemTacticalProfile(itemName) {
        const item = String(itemName || "").trim();

        if (!item) {
            return null;
        }
        if (isMegaStoneItem(item)) {
            return {
                shortLabel: "메가스톤",
                chip: "메가 준비",
                variants: [
                    `${item} 기준 메가 전개가 열려 있어 선출 방향이 더 분명해집니다.`,
                    `${item}을 전제로 보면 이 포켓몬은 에이스 축으로 기용 의도가 또렷합니다.`,
                    `${item}을 들고 있어 메가 타이밍을 중심으로 운용 가치가 커집니다.`
                ]
            };
        }

        const exactProfiles = {
            "구애스카프": { shortLabel: "스카프", chip: "아이템 스카프", variants: ["구애스카프라 속도 기준점을 넘겨 초반 템포나 마무리 역할이 더 선명합니다.", "구애스카프로 속도를 보정해 예상보다 넓은 상대로 선공 압박을 걸 수 있습니다.", "구애스카프 기준이면 선봉 견제와 후반 정리 둘 다 훨씬 자연스러워집니다."] },
            "기합의띠": { shortLabel: "띠", chip: "아이템 기띠", variants: ["기합의띠 기준 한 번은 행동을 보장받기 쉬워 선봉 가치가 더 높습니다.", "기합의띠를 들고 있어 시동기나 대면 압박을 안정적으로 남길 수 있습니다.", "기합의띠라 첫 대면에서 최소 한 턴 역할 수행을 기대하기 쉽습니다."] },
            "기합의머리띠": { shortLabel: "머리띠", chip: "아이템 머리띠", variants: ["기합의머리띠는 위기 상황에서 한 턴을 더 벌 가능성을 열어 둬 대면 변수 가치를 높입니다.", "기합의머리띠를 통해 예상 밖으로 한 번 더 버티는 흐름을 노리는 선택입니다.", "기합의머리띠라 확정적인 운영보다 변수와 대면 뒤집기를 함께 노리는 구성이 됩니다."] },
            "먹다남은음식": { shortLabel: "잔반", chip: "아이템 잔반", variants: ["먹다남은음식 기준 장기전과 반복 교체에서 가치가 더 커집니다.", "먹다남은음식이라 한 번 받아낸 뒤 다시 나오는 운영 축으로 읽기 쉽습니다.", "먹다남은음식은 즉시 화력보다 중반 유지력을 살리는 선택이라 운영 의도가 분명합니다."] },
            "하양허브": { shortLabel: "허브", chip: "아이템 허브", variants: ["하양허브는 부스트 이후 능력 저하를 지워 전개 성공률을 높이는 선택이라 세팅 의도가 선명합니다.", "하양허브를 들고 있어 한 번의 전개 턴을 강하게 살리려는 방향이 읽힙니다.", "하양허브 기준이면 단기 전개나 능력 상승 플랜과 더 잘 맞습니다."] },
            "멘탈허브": { shortLabel: "멘허", chip: "아이템 멘탈허브", variants: ["멘탈허브를 들고 있어 도발 같은 견제를 넘기고 보조기나 전개기를 통과시키려는 의도가 보입니다.", "멘탈허브 기준이면 안정적으로 한 번 전개를 성공시키는 쪽에 무게가 실려 있습니다.", "멘탈허브라 첫 전개 턴 보장을 더 중시한 구성으로 읽힙니다."] },
            "반짝가루": { shortLabel: "반짝가루", chip: "아이템 회피", variants: ["반짝가루를 통해 대면 변수와 교환 효율을 조금이라도 끌어올리려는 선택으로 읽힙니다.", "반짝가루는 안정적인 화력보다 변수와 시간 벌기 쪽을 의식한 아이템입니다.", "반짝가루 기준이면 확정적인 수치보다 운용 변수를 더 중시한 방향입니다."] },
            "왕의징표석": { shortLabel: "왕징", chip: "아이템 왕징", variants: ["왕의징표석은 추가 행동 제약을 노리는 선택이라 대면 변수 가치가 더 커집니다.", "왕의징표석 기준이면 단순 화력보다 상대 행동을 꼬이게 만드는 쪽을 의식한 구성입니다.", "왕의징표석을 통해 교환보다 변수 창출을 노리는 방향이 읽힙니다."] },
            "전기구슬": { shortLabel: "전기구슬", chip: "아이템 전기구슬", variants: ["전기구슬은 특정 포켓몬의 즉시 화력을 극대화하는 전용 선택이라 역할 의도가 아주 분명합니다.", "전기구슬 기준이면 범용성보다 특정 에이스 화력을 최대한 끌어올리는 방향입니다.", "전기구슬을 들고 있어 해당 포켓몬을 확실한 공격 축으로 쓰려는 의도가 드러납니다."] },
            "조개껍질방울": { shortLabel: "조개껍질", chip: "아이템 흡수", variants: ["조개껍질방울은 공격하면서 조금씩 회복해 교환 효율을 높이려는 선택입니다.", "조개껍질방울 기준이면 단기 폭발력보다 누적 교환 이득을 보는 쪽에 가깝습니다.", "조개껍질방울을 들고 있어 공격과 유지력을 함께 챙기려는 방향이 읽힙니다."] },
            "초점렌즈": { shortLabel: "초점렌즈", chip: "아이템 급소", variants: ["초점렌즈는 급소 변수 기대값을 높여 정면 계산을 흔들려는 선택입니다.", "초점렌즈 기준이면 확정적인 압박보다 급소 변수까지 감안한 운영입니다.", "초점렌즈를 통해 평범한 교환보다 한 번의 변수 창출을 더 의식한 구성입니다."] },
            "선제공격손톱": { shortLabel: "손톱", chip: "아이템 선공변수", variants: ["선제공격손톱은 속도 열세 대면을 변수로 뒤집을 가능성을 남겨 두는 선택입니다.", "선제공격손톱 기준이면 안정성보다 한 번의 선공 변수에 기대를 거는 방향입니다.", "선제공격손톱을 들고 있어 정속 대면보다 변수 창출 가치가 올라갑니다."] }
        };

        if (exactProfiles[item]) {
            return exactProfiles[item];
        }
        if (String(item).endsWith("열매")) {
            return {
                shortLabel: "열매",
                chip: "아이템 열매",
                variants: [
                    `${item}을 통해 한 번의 상성 압박이나 상태이상을 넘기려는 의도가 보여 운영 안정감이 있습니다.`,
                    `${item} 기준 특정 대면을 한 번 더 버티는 방향이라 실전 완충 가치가 올라갑니다.`,
                    `${item}을 들고 있어 예상된 약점을 한 턴 더 견디려는 선택으로 읽힙니다.`
                ]
            };
        }
        if (String(item).includes("목탄") || String(item).includes("자석") || String(item).includes("부드러운모래") || String(item).includes("기적의씨") || String(item).includes("신비의물방울") || String(item).includes("요정의깃털")) {
            return {
                shortLabel: "타입강화",
                chip: "아이템 화력",
                variants: [
                    `${item} 기준 자주 누르는 주력기 화력을 보강해 일관된 압박을 노리는 선택입니다.`,
                    `${item}을 들고 있어 특정 자속기 중심으로 대면 압박을 높이는 방향이 분명합니다.`,
                    `${item}은 넓은 범용성보다 자주 쓰는 주력기 화력을 꾸준히 올리는 선택입니다.`
                ]
            };
        }

        return null;
    }

    function isMegaCandidate(member, species) {
        if (isMegaSpecies(species)) {
            return true;
        }
        return Boolean(member && species && species.mega && species.mega.isMegaCapable && isMegaStoneItem(member.item));
    }

    function countMegaCandidates(entries) {
        return (entries || []).filter((entry) => entry && entry.isMegaCandidate).length;
    }

    function unique(values) {
        return Array.from(new Set((values || []).filter(Boolean)));
    }

    function getMetaSpeciesKey(species) {
        const name = String(species && species.name || "").trim().toLowerCase();

        if (!name) {
            return "";
        }

        return name
            .replace(/-mega(?:-[xy])?$/, "")
            .replace(/-hisui$/, "")
            .replace(/-paldea$/, "")
            .replace(/-galar$/, "")
            .replace(/-alola$/, "");
    }

    function getMetaProfile(species) {
        return META_SPECIES_PROFILES[getMetaSpeciesKey(species)] || null;
    }

    function getSpeciesMetaNotes(species) {
        return SPECIES_META_NOTES[getMetaSpeciesKey(species)] || null;
    }

    function getSpeciesSourceSignals(species) {
        return SPECIES_SOURCE_SIGNALS[getMetaSpeciesKey(species)] || null;
    }

    function getMetaWeight(species) {
        const profile = getMetaProfile(species);
        return profile ? profile.weight : 1;
    }

    function getMetaInfluenceFactor(species) {
        return 0.82 + (getMetaWeight(species) * 0.18);
    }

    function summarizeMetaOpponents(opponents, max) {
        return (opponents || [])
            .map((opponent) => ({
                opponent,
                profile: getMetaProfile(opponent)
            }))
            .filter((entry) => entry.profile)
            .sort((left, right) => right.profile.weight - left.profile.weight)
            .slice(0, max || 2)
            .map((entry) => entry.opponent.koName);
    }

    function resolveMetaSourcePokemon(name) {
        if (!window.PokeData) {
            return null;
        }
        return window.PokeData.resolvePokemon(name) || window.PokeData.getPokemonByName(name) || null;
    }

    function getCanonicalSpeciesKey(value) {
        const species = typeof value === "string" ? resolveMetaSourcePokemon(value) : value;
        if (!species) {
            return getMetaSpeciesKey({ name: value });
        }
        return getMetaSpeciesKey(species);
    }

    function getCanonicalKoName(value) {
        const species = typeof value === "string" ? resolveMetaSourcePokemon(value) : value;
        return species ? species.koName : String(value || "");
    }

    function getResolvedCommunityMetaCores() {
        return COMMUNITY_META_CORE_PROFILES
            .map((profile) => {
                const members = (profile.members || [])
                    .map((name) => resolveMetaSourcePokemon(name))
                    .filter(Boolean);

                if (members.length !== (profile.members || []).length) {
                    return null;
                }

                return Object.assign({}, profile, {
                    canonicalMembers: members.map((species) => getCanonicalSpeciesKey(species)),
                    memberKoNames: members.map((species) => species.koName)
                });
            })
            .filter(Boolean);
    }

    function getMatchingCommunityMetaCores(core) {
        const coreKeys = new Set((core || []).map((species) => getCanonicalSpeciesKey(species)));
        return getResolvedCommunityMetaCores()
            .map((profile) => {
                const matchedCount = profile.canonicalMembers.filter((name) => coreKeys.has(name)).length;
                return Object.assign({}, profile, {
                    matchedCount,
                    matchScore: matchedCount === profile.canonicalMembers.length ? profile.weight : (matchedCount >= 2 ? profile.weight * 0.45 : 0)
                });
            })
            .filter((profile) => profile.matchScore > 0)
            .sort((left, right) => right.matchScore - left.matchScore);
    }

    function summarizeCommunityMetaCores(opponents, max) {
        return getMatchingCommunityMetaCores(opponents)
            .filter((profile) => profile.matchedCount >= 2)
            .slice(0, max || 2)
            .map((profile) => ({
                label: profile.memberKoNames.join(" / "),
                sourceLabel: profile.sourceLabel,
                sourceDetail: profile.sourceDetail
            }));
    }

    function summarizeNotableOpponents(opponents, max) {
        return (opponents || [])
            .filter((opponent) => getSpeciesMetaNotes(opponent))
            .slice(0, max || 2)
            .map((opponent) => opponent.koName);
    }

    function summarizeSourceBackedOpponents(opponents, max) {
        return (opponents || [])
            .filter((opponent) => getSpeciesSourceSignals(opponent))
            .slice(0, max || 2)
            .map((opponent) => opponent.koName);
    }

    function hashText(value) {
        const text = String(value || "");
        let hash = 0;
        for (let index = 0; index < text.length; index += 1) {
            hash = ((hash * 31) + text.charCodeAt(index)) >>> 0;
        }
        return hash;
    }

    function pickVariant(seed, variants) {
        if (!variants || variants.length === 0) {
            return "";
        }
        return variants[hashText(seed) % variants.length];
    }

    function pushReasonCandidate(list, config) {
        if (!config || !config.enabled) {
            return;
        }

        list.push({
            score: Number(config.score) || 0,
            category: config.category || "misc",
            text: pickVariant(config.seed || config.category || "misc", config.variants || []),
            chip: config.chip || ""
        });
    }

    function buildReasonBundle(seed, candidates, primaryLimit, detailLimit, chipLimit) {
        const normalized = (candidates || [])
            .filter((candidate) => candidate && candidate.text)
            .map((candidate, index) => ({
                score: Number(candidate.score) || 0,
                category: candidate.category || `misc-${index}`,
                text: candidate.text,
                chip: candidate.chip || "",
                tie: hashText(`${seed}:${candidate.category || "misc"}:${index}`)
            }))
            .sort((left, right) => {
                if (right.score !== left.score) {
                    return right.score - left.score;
                }
                return left.tie - right.tie;
            });

        const primary = [];
        const seenCategories = new Set();
        normalized.forEach((candidate) => {
            if (primary.length >= (primaryLimit || 2)) {
                return;
            }
            if (seenCategories.has(candidate.category)) {
                return;
            }
            primary.push(candidate);
            seenCategories.add(candidate.category);
        });

        const secondary = normalized
            .filter((candidate) => !primary.includes(candidate))
            .slice(0, detailLimit || 0);

        return {
            summary: primary.map((candidate) => candidate.text).join(" "),
            details: secondary.map((candidate) => candidate.text),
            chips: unique(primary.concat(secondary).map((candidate) => candidate.chip).filter(Boolean)).slice(0, chipLimit || 4)
        };
    }

    function countMatchingKeys(values, keys) {
        return (values || []).filter((value) => keys.has(value)).length;
    }

    function getStatValue(stats, key) {
        return Number(stats && stats[key]) || 0;
    }

    function categorizeMove(move, statProfile) {
        if (!move || !move.key) {
            return statProfile && statProfile.offenseBias ? statProfile.offenseBias : "mixed";
        }
        if (move.category === "physical" || move.category === "special") {
            return move.category;
        }
        if (PHYSICAL_MOVE_KEYS.has(move.key)) {
            return "physical";
        }
        if (SPECIAL_MOVE_KEYS.has(move.key)) {
            return "special";
        }
        return statProfile && statProfile.offenseBias ? statProfile.offenseBias : "mixed";
    }

    function getMovePowerTier(move) {
        if (!move || !move.key) {
            return 0.2;
        }
        if (typeof move.power === "number") {
            if (move.power >= 110) {
                return 1.1;
            }
            if (move.power >= 85) {
                return 0.75;
            }
            if (move.power <= 60) {
                return 0.15;
            }
            return 0.45;
        }
        if (VERY_HIGH_POWER_MOVE_KEYS.has(move.key)) {
            return 1.1;
        }
        if (HIGH_POWER_MOVE_KEYS.has(move.key)) {
            return 0.75;
        }
        if (LOW_POWER_MOVE_KEYS.has(move.key)) {
            return 0.15;
        }
        return 0.45;
    }

    function getMoveStatFit(category, statProfile) {
        if (!statProfile) {
            return 0;
        }
        if (category === "physical") {
            if (statProfile.attack >= statProfile.specialAttack + 20) { return 0.7; }
            if (statProfile.attack >= statProfile.specialAttack) { return 0.35; }
            return -0.2;
        }
        if (category === "special") {
            if (statProfile.specialAttack >= statProfile.attack + 20) { return 0.7; }
            if (statProfile.specialAttack >= statProfile.attack) { return 0.35; }
            return -0.2;
        }
        return 0.2;
    }

    function evaluateMoveAgainstTarget(move, opponentTypes, speciesTypes, statProfile) {
        const multiplier = window.TypeModule.getTypeMultiplier(String(move.type || "").toLowerCase(), opponentTypes);
        const category = categorizeMove(move, statProfile);
        const powerTier = getMovePowerTier(move);
        const statFit = getMoveStatFit(category, statProfile);
        const stabBonus = (speciesTypes || []).includes(String(move.type || "").toLowerCase()) ? 0.45 : 0;
        const priorityBonus = PRIORITY_MOVE_KEYS.has(move.key) ? 0.18 : 0;

        return {
            move,
            category,
            multiplier,
            score: getOffenseScore(multiplier) + powerTier + statFit + stabBonus + priorityBonus
        };
    }

    function getOffenseScore(multiplier) {
        if (multiplier >= 4) {
            return 4.6;
        }
        if (multiplier >= 2) {
            return 3;
        }
        if (multiplier === 1) {
            return 0.7;
        }
        if (multiplier === 0) {
            return -2.5;
        }
        if (multiplier <= 0.25) {
            return -2;
        }
        return -1;
    }

    function getDefenseScore(multiplier) {
        if (multiplier >= 4) {
            return -4.4;
        }
        if (multiplier >= 2) {
            return -2.6;
        }
        if (multiplier === 0) {
            return 2.2;
        }
        if (multiplier <= 0.25) {
            return 1.8;
        }
        if (multiplier < 1) {
            return 1.1;
        }
        return 0;
    }

    function getSpeedScore(speedResult) {
        if (speedResult.myStat > speedResult.enemyStat) {
            return 1.35;
        }
        if (speedResult.myStat === speedResult.enemyStat) {
            return 0.2;
        }
        return -0.9;
    }

    function resolveMemberMoves(member, species) {
        if (!species || !window.MoveData) {
            return [];
        }

        return (member.moves || [])
            .map((value) => window.MoveData.resolveMoveForPokemon(species, value))
            .filter(Boolean);
    }

    function buildAttackProfile(member, species) {
        const moves = resolveMemberMoves(member, species);
        const offensiveMoves = moves.filter((move) => move.type && move.category !== "status" && !NON_OFFENSIVE_MOVE_KEYS.has(move.key));
        const attackTypes = unique(offensiveMoves.map((move) => String(move.type || "").toLowerCase()));
        const speciesTypes = unique((species.types || []).map((type) => String(type || "").toLowerCase()));
        const moveKeys = unique(moves.map((move) => move.key));
        const strategyTags = [];

        if (countMatchingKeys(moveKeys, HAZARD_MOVE_KEYS) > 0) { strategyTags.push("hazards"); }
        if (countMatchingKeys(moveKeys, SPEED_CONTROL_MOVE_KEYS) > 0) { strategyTags.push("speedControl"); }
        if (countMatchingKeys(moveKeys, SCREEN_MOVE_KEYS) > 0) { strategyTags.push("screens"); }
        if (countMatchingKeys(moveKeys, WEATHER_MOVE_KEYS) > 0) { strategyTags.push("weather"); }
        if (countMatchingKeys(moveKeys, RECOVERY_MOVE_KEYS) > 0) { strategyTags.push("recovery"); }
        if (countMatchingKeys(moveKeys, SETUP_MOVE_KEYS) > 0) { strategyTags.push("setup"); }
        if (countMatchingKeys(moveKeys, PIVOT_MOVE_KEYS) > 0) { strategyTags.push("pivot"); }
        if (countMatchingKeys(moveKeys, DISRUPTION_MOVE_KEYS) > 0) { strategyTags.push("disruption"); }
        if (countMatchingKeys(moveKeys, TRICK_ROOM_MOVE_KEYS) > 0) { strategyTags.push("trickRoom"); }

        return {
            moves,
            moveKeys,
            offensiveMoves,
            attackTypes: attackTypes.length > 0 ? attackTypes : speciesTypes,
            stabTypes: unique(attackTypes.filter((type) => speciesTypes.includes(type))),
            coverageTypes: unique(attackTypes.filter((type) => !speciesTypes.includes(type))),
            supportMoveCount: Math.max(0, moves.length - offensiveMoves.length),
            leadSupportCount: moveKeys.filter((key) => LEAD_SUPPORT_MOVE_KEYS.has(key)).length,
            pivotMoveCount: moveKeys.filter((key) => PIVOT_MOVE_KEYS.has(key)).length,
            setupMoveCount: moveKeys.filter((key) => SETUP_MOVE_KEYS.has(key)).length,
            priorityMoveCount: moveKeys.filter((key) => PRIORITY_MOVE_KEYS.has(key)).length,
            highPowerMoveCount: offensiveMoves.filter((move) => {
                if (typeof move.power === "number") {
                    return move.power >= 85;
                }
                return VERY_HIGH_POWER_MOVE_KEYS.has(move.key) || HIGH_POWER_MOVE_KEYS.has(move.key);
            }).length,
            strategyTags
        };
    }

    function buildStatProfile(species) {
        const stats = species && species.baseStats ? species.baseStats : {};
        const attack = getStatValue(stats, "atk");
        const specialAttack = getStatValue(stats, "spa");
        const speed = getStatValue(stats, "spe");
        const bulk = getStatValue(stats, "hp") + getStatValue(stats, "def") + getStatValue(stats, "spd");

        return {
            attack,
            specialAttack,
            speed,
            bulk,
            offense: Math.max(attack, specialAttack),
            offenseBias: attack >= specialAttack + 15 ? "physical" : (specialAttack >= attack + 15 ? "special" : "mixed")
        };
    }

    function getOpponentArchetypeLabel(statProfile) {
        if (!statProfile) {
            return "밸런스";
        }
        if (statProfile.speed >= 105 && statProfile.offense >= 110) {
            return "고속 압박";
        }
        if (statProfile.bulk >= 300 && statProfile.offense >= 95) {
            return "벌크 압박";
        }
        if (statProfile.bulk >= 310) {
            return "내구 운영";
        }
        if (statProfile.speed >= 100) {
            return "템포 선봉";
        }
        if (statProfile.offense >= 120) {
            return "화력 에이스";
        }
        return "밸런스";
    }

    function getOpponentTypeProfile(species) {
        const defenseSummary = window.TypeModule.getDefenseSummary((species && species.types) || []);
        return {
            weaknessCount: defenseSummary.weaknesses.length,
            quadWeakCount: defenseSummary.weaknesses.filter((entry) => entry.multiplier >= 4).length,
            resistanceCount: defenseSummary.resistances.length,
            immunityCount: defenseSummary.immunities.length,
            weaknessTypes: defenseSummary.weaknesses.map((entry) => entry.type),
            resistanceTypes: defenseSummary.resistances.map((entry) => entry.type),
            immunityTypes: defenseSummary.immunities.slice()
        };
    }

    function formatTypeLabels(types, limit) {
        return (types || []).slice(0, limit || 2).map((type) => window.TypeModule.toTypeLabel(type)).join(", ");
    }

    function formatMultiplier(multiplier) {
        const value = Number(multiplier);
        if (Number.isInteger(value)) {
            return String(value);
        }
        return value.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
    }

    function inferOpponentRoleTags(species, statProfile, typeProfile) {
        const tags = [];

        if (statProfile.speed >= 95 && (statProfile.offense >= 100 || statProfile.bulk >= 270)) {
            tags.push("lead");
        }
        if (statProfile.speed >= 105) {
            tags.push("speed");
        }
        if (statProfile.bulk >= 295) {
            tags.push("bulky");
            tags.push("pivot");
        }
        if (statProfile.offense >= 120) {
            tags.push("breaker");
        }
        if (statProfile.speed >= 105 && statProfile.offense >= 115) {
            tags.push("cleaner");
        }
        if (typeProfile.immunityCount >= 1 || (typeProfile.resistanceCount >= 5 && statProfile.bulk >= 260)) {
            tags.push("safeSwitch");
        }
        if (isMegaSpecies(species) || (species && species.mega && species.mega.isMegaCapable)) {
            tags.push("anchor");
        }
        if (statProfile.speed <= 70 && statProfile.bulk >= 300) {
            tags.push("slowAnchor");
        }

        return unique(tags);
    }

    function buildOpponentSpeciesProfile(species) {
        const statProfile = buildStatProfile(species);
        const typeProfile = getOpponentTypeProfile(species);
        const roleTags = inferOpponentRoleTags(species, statProfile, typeProfile);
        const metaProfile = getMetaProfile(species);
        const speciesNotes = getSpeciesMetaNotes(species);
        const sourceSignals = getSpeciesSourceSignals(species);
        let leadScore = 0;
        let coreValue = 0;

        leadScore += statProfile.speed * 0.055;
        leadScore += statProfile.offense * 0.04;
        leadScore += statProfile.bulk * 0.009;
        leadScore += typeProfile.resistanceCount * 0.28;
        leadScore += typeProfile.immunityCount * 0.5;
        leadScore -= typeProfile.quadWeakCount * 1.2;
        leadScore -= Math.max(0, typeProfile.weaknessCount - 3) * 0.18;
        leadScore += roleTags.includes("lead") ? 1.4 : 0;
        leadScore += roleTags.includes("speed") ? 0.8 : 0;
        leadScore += roleTags.includes("safeSwitch") ? 0.55 : 0;
        leadScore += roleTags.includes("anchor") && statProfile.speed >= 100 ? 0.45 : 0;
        leadScore -= roleTags.includes("slowAnchor") ? 0.35 : 0;
        leadScore += metaProfile ? metaProfile.leadBias : 0;
        leadScore += sourceSignals ? (sourceSignals.leadBias || 0) : 0;

        coreValue += statProfile.offense * 0.035;
        coreValue += statProfile.bulk * 0.016;
        coreValue += statProfile.speed * 0.018;
        coreValue += typeProfile.resistanceCount * 0.24;
        coreValue += typeProfile.immunityCount * 0.35;
        coreValue += roleTags.includes("anchor") ? 1.1 : 0;
        coreValue += roleTags.includes("breaker") ? 0.9 : 0;
        coreValue += roleTags.includes("pivot") ? 0.8 : 0;
        coreValue += metaProfile ? metaProfile.coreBias : 0;
        coreValue += sourceSignals ? (sourceSignals.coreBias || 0) : 0;

        const evidenceChips = [
            `스피드 ${statProfile.speed}`,
            `최고화력 ${statProfile.offense}`,
            `내구합 ${statProfile.bulk}`,
            `반감 ${typeProfile.resistanceCount}`,
            metaProfile ? metaProfile.label : "",
            sourceSignals ? sourceSignals.sourceChip : "",
            typeProfile.immunityCount > 0 ? `무효 ${typeProfile.immunityCount}` : "",
            typeProfile.quadWeakCount > 0 ? `4배약점 ${typeProfile.quadWeakCount}` : ""
        ].filter(Boolean);

        const reasonCandidates = [];
        pushReasonCandidate(reasonCandidates, {
            enabled: Boolean(metaProfile),
            score: 8.6,
            category: "meta",
            seed: `${species.name}:meta`,
            chip: metaProfile ? metaProfile.label : "",
            variants: [
                `현재 커뮤니티와 사용률 기준으로 ${metaProfile ? metaProfile.hints.slice(0, 2).join(", ") : "상위 메타"} 축이라 실제 선출 빈도를 높게 봐야 합니다.`,
                `최근 메타 의견을 보면 ${metaProfile ? metaProfile.hints[0] : "이 포켓몬"} 쪽 평가가 높아 유력 카드로 남을 가능성이 큽니다.`,
                `사용률 상위권에서 반복해서 언급되는 축이라 상대가 실제로 꺼낼 가능성을 한 단계 높게 보는 편이 맞습니다.`
            ]
        });
        pushReasonCandidate(reasonCandidates, {
            enabled: Boolean(speciesNotes && speciesNotes.opponent && speciesNotes.opponent.length > 0),
            score: 8.15,
            category: "meta-style",
            seed: `${species.name}:meta:style`,
            chip: speciesNotes ? speciesNotes.chip : "",
            variants: speciesNotes ? speciesNotes.opponent : []
        });
        pushReasonCandidate(reasonCandidates, {
            enabled: Boolean(sourceSignals && sourceSignals.entry && sourceSignals.entry.length > 0),
            score: 8.35,
            category: "source-entry",
            seed: `${species.name}:source:entry`,
            chip: sourceSignals ? sourceSignals.sourceChip : "",
            variants: sourceSignals ? sourceSignals.entry : []
        });
        pushReasonCandidate(reasonCandidates, {
            enabled: Boolean(sourceSignals && sourceSignals.lead && sourceSignals.lead.length > 0),
            score: 7.65,
            category: "source-lead",
            seed: `${species.name}:source:lead`,
            chip: sourceSignals ? `${sourceSignals.sourceChip} 선출` : "",
            variants: sourceSignals ? sourceSignals.lead : []
        });
        pushReasonCandidate(reasonCandidates, {
            enabled: statProfile.speed >= 105,
            score: 9,
            category: "speed",
            seed: `${species.name}:speed:veryfast`,
            chip: `고속 ${statProfile.speed}`,
            variants: [
                `스피드 종족값 ${statProfile.speed}라 초반 주도권을 먼저 잡기 쉬운 편입니다.`,
                `기본 스피드 ${statProfile.speed}가 높아 선봉 대면에서 먼저 압박을 거는 그림이 자연스럽습니다.`,
                `속도 라인이 ${statProfile.speed}까지 올라가 초반 템포 싸움에서 밀릴 가능성이 낮습니다.`
            ]
        });
        pushReasonCandidate(reasonCandidates, {
            enabled: statProfile.speed >= 95 && statProfile.speed < 105,
            score: 7,
            category: "speed",
            seed: `${species.name}:speed:fast`,
            chip: `준속 ${statProfile.speed}`,
            variants: [
                `스피드 종족값 ${statProfile.speed}라 선봉 대면에서 템포를 크게 잃지 않는 축입니다.`,
                `기본 스피드 ${statProfile.speed}면 초반 맞대면에서 무난하게 주도권 경쟁이 가능합니다.`,
                `속도 라인이 준수해 적어도 선봉 카드로 내기에는 부담이 적은 편입니다.`
            ]
        });
        pushReasonCandidate(reasonCandidates, {
            enabled: statProfile.bulk >= 300,
            score: 7,
            category: "bulk",
            seed: `${species.name}:bulk:high`,
            chip: `내구 ${statProfile.bulk}`,
            variants: [
                `내구 합계 ${statProfile.bulk}라 한 번 받아낸 뒤 판을 이어가기 좋은 편입니다.`,
                `버티는 수치가 ${statProfile.bulk}까지 올라가 초반 교환에서 쉽게 무너지지 않는 카드입니다.`,
                `내구 라인이 두꺼워 불리하지 않은 대면에서는 안정적으로 정보를 확인하기 좋습니다.`
            ]
        });
        pushReasonCandidate(reasonCandidates, {
            enabled: statProfile.offense >= 120,
            score: 8,
            category: "offense",
            seed: `${species.name}:offense:high`,
            chip: `고화력 ${statProfile.offense}`,
            variants: [
                `최고 화력 지표가 ${statProfile.offense}라 초반부터 교체 압박을 만들기 쉽습니다.`,
                `공격 성능이 ${statProfile.offense}급이라 맞대면만 잡히면 바로 압박을 걸 수 있습니다.`,
                `순수 화력 수치가 높아 상대가 안전하게 눌러앉기 어려운 포켓몬입니다.`
            ]
        });
        pushReasonCandidate(reasonCandidates, {
            enabled: statProfile.offense >= 105 && statProfile.speed >= 95 && statProfile.offense < 120,
            score: 6,
            category: "offense",
            seed: `${species.name}:offense:balanced-fast`,
            chip: `템포압박`,
            variants: [
                `화력 ${statProfile.offense}와 스피드 ${statProfile.speed} 조합이 좋아 무난한 선봉 압박이 가능합니다.`,
                `속도와 공격 수치가 함께 받쳐 줘 선봉에서 가장 표준적인 압박을 만들기 좋습니다.`,
                `빠르면서도 힘이 약하지 않아 초반 교체를 유도하기 쉬운 유형입니다.`
            ]
        });
        pushReasonCandidate(reasonCandidates, {
            enabled: typeProfile.immunityCount > 0 || typeProfile.resistanceCount >= 5,
            score: 7,
            category: "type-defense",
            seed: `${species.name}:type:defensive`,
            chip: `${typeProfile.immunityCount > 0 ? `무효 ${typeProfile.immunityCount}` : `반감 ${typeProfile.resistanceCount}`}`,
            variants: [
                `타입 구조상 반감 ${typeProfile.resistanceCount}개${typeProfile.immunityCount > 0 ? `, 무효 ${typeProfile.immunityCount}개` : ""}를 가져 선봉 리스크가 낮습니다.`,
                `상성 면에서도 반감 ${typeProfile.resistanceCount}개${typeProfile.immunityCount > 0 ? `와 무효 ${typeProfile.immunityCount}개` : ""}가 있어 초반에 꺼내기 편한 편입니다.`,
                `타입 저항이 충분해 예상 밖 대면에서도 바로 무너지지 않을 가능성이 높습니다.`
            ]
        });
        pushReasonCandidate(reasonCandidates, {
            enabled: typeProfile.quadWeakCount > 0,
            score: 4.5,
            category: "type-risk",
            seed: `${species.name}:type:quadweak`,
            chip: `4배약점 ${typeProfile.quadWeakCount}`,
            variants: [
                `다만 ${formatTypeLabels(typeProfile.weaknessTypes, 2)} 쪽 큰 약점은 분명해 상성 불리 대면은 피하려는 선출이 자연스럽습니다.`,
                `반대로 ${formatTypeLabels(typeProfile.weaknessTypes, 2)} 약점은 크게 드러나 있어 정면 상성전은 조심하는 쪽이 맞습니다.`,
                `큰 약점이 뚜렷한 타입이라 선봉으로 나오더라도 불리한 상성은 빠르게 피할 가능성이 높습니다.`
            ]
        });
        pushReasonCandidate(reasonCandidates, {
            enabled: typeProfile.weaknessCount <= 2 && typeProfile.quadWeakCount === 0,
            score: 5.5,
            category: "type-stable",
            seed: `${species.name}:type:stable`,
            chip: `약점 ${typeProfile.weaknessCount}`,
            variants: [
                `약점이 ${typeProfile.weaknessCount}개뿐이라 초반 확인용 카드로 내기 편합니다.`,
                `노출된 약점 수가 적어 선봉으로 내더라도 극단적인 상성 사고가 잘 나지 않습니다.`,
                `타입 약점이 적은 편이라 상대 입장에서 무난하게 먼저 꺼내기 좋은 카드입니다.`
            ]
        });
        pushReasonCandidate(reasonCandidates, {
            enabled: reasonCandidates.length === 0,
            score: 3,
            category: "default",
            seed: `${species.name}:default`,
            chip: "밸런스",
            variants: [
                `공수 수치가 한쪽에 치우치지 않아 표준적인 선출 카드로 쓰기 무난합니다.`,
                `극단적인 약점 없이 전반 수치가 고르게 잡혀 있어 기본 선택지로 남기기 쉽습니다.`,
                `특정 역할 하나에만 묶이지 않아 상대 입장에서도 범용 카드로 꺼내기 좋습니다.`
            ]
        });
        const reasonBundle = buildReasonBundle(species.name, reasonCandidates, 2, 2, 4);

        return {
            opponent: species,
            statProfile,
            typeProfile,
            roleTags,
            label: getOpponentArchetypeLabel(statProfile),
            reason: reasonBundle.summary,
            reasonDetails: reasonBundle.details,
            evidenceChips: unique(evidenceChips.concat(reasonBundle.chips)).slice(0, 6),
            leadScore,
            coreValue
        };
    }

    function scoreLeadFit(analysis, attackProfile, statProfile) {
        let score = 0;

        score += analysis.favorableOpponents.length * 0.9;
        score += analysis.fastCount * 0.55;
        score += analysis.safeCount * 0.4;
        score += attackProfile.leadSupportCount * 1.35;
        score += rolesIncludeAny(analysis.roles, ["lead", "pivot"]) ? 1.4 : 0;
        score += statProfile.speed >= 100 ? 1.2 : (statProfile.speed >= 85 ? 0.45 : 0);
        score -= analysis.riskyOpponents.length * 0.55;

        return clamp(score, 0, 10);
    }

    function scorePivotFit(analysis, attackProfile, statProfile) {
        let score = 0;

        score += analysis.safeCount * 0.95;
        score += attackProfile.pivotMoveCount * 1.25;
        score += attackProfile.supportMoveCount * 0.55;
        score += rolesIncludeAny(analysis.roles, ["pivot", "tank", "support"]) ? 1.8 : 0;
        score += statProfile.bulk >= 300 ? 1.2 : (statProfile.bulk >= 260 ? 0.6 : 0);
        score += analysis.favorableOpponents.length * 0.3;
        score -= analysis.riskyOpponents.length * 0.4;

        return clamp(score, 0, 10);
    }

    function scoreCleanupFit(analysis, attackProfile, statProfile) {
        let score = 0;

        score += analysis.fastCount * 0.8;
        score += analysis.favorableOpponents.length * 0.65;
        score += attackProfile.setupMoveCount * 1.35;
        score += attackProfile.priorityMoveCount * 0.9;
        score += attackProfile.highPowerMoveCount >= 2 ? 0.8 : (attackProfile.highPowerMoveCount === 1 ? 0.3 : 0);
        score += rolesIncludeAny(analysis.roles, ["cleaner", "revenge", "wallbreaker"]) ? 1.6 : 0;
        score += statProfile.speed >= 105 ? 1.1 : (statProfile.speed >= 90 ? 0.45 : 0);
        score += statProfile.offense >= 120 ? 1.1 : (statProfile.offense >= 100 ? 0.5 : 0);
        score -= analysis.riskyOpponents.length * 0.35;

        return clamp(score, 0, 10);
    }

    function rolesIncludeAny(roles, targets) {
        return (targets || []).some((role) => (roles || []).includes(role));
    }

    function getPrimaryPlan(analysis) {
        const plans = [
            { key: "lead", label: "선봉", score: analysis.leadFit },
            { key: "pivot", label: "운영", score: analysis.pivotFit },
            { key: "cleanup", label: "마무리", score: analysis.cleanupFit }
        ].sort((left, right) => right.score - left.score);

        return plans[0];
    }

    function getPrimaryStyleLabel(strategyTags) {
        const tags = strategyTags || [];
        if (tags.includes("trickRoom")) { return "트릭룸 전개"; }
        if (tags.includes("screens") && tags.includes("setup")) { return "스크린 전개"; }
        if (tags.includes("weather")) { return "날씨 전개"; }
        if (tags.includes("hazards") && tags.includes("pivot")) { return "설치 운영"; }
        if (tags.includes("disruption") && tags.includes("pivot")) { return "템포 운영"; }
        if (tags.includes("setup")) { return "부스트 압박"; }
        if (tags.includes("recovery")) { return "지속 운영"; }
        return "밸런스";
    }

    function countAnalysesWithStrategy(analyses, strategyKey) {
        return (analyses || []).filter((entry) => (entry.strategyTags || []).includes(strategyKey)).length;
    }

    function summarizeMembersByStrategy(entries, strategyKey, limit) {
        return (entries || [])
            .filter((entry) => (entry.strategyTags || []).includes(strategyKey))
            .slice(0, limit || 2)
            .map((entry) => entry.species.koName);
    }

    function buildTeamIntentProfile(analyses) {
        const hazards = countAnalysesWithStrategy(analyses, "hazards");
        const speedControl = countAnalysesWithStrategy(analyses, "speedControl");
        const screens = countAnalysesWithStrategy(analyses, "screens");
        const weather = countAnalysesWithStrategy(analyses, "weather");
        const recovery = countAnalysesWithStrategy(analyses, "recovery");
        const setup = countAnalysesWithStrategy(analyses, "setup");
        const pivot = countAnalysesWithStrategy(analyses, "pivot");
        const disruption = countAnalysesWithStrategy(analyses, "disruption");
        const trickRoom = countAnalysesWithStrategy(analyses, "trickRoom");
        const fastMembers = (analyses || []).filter((entry) => entry.fastCount >= 3 || entry.statProfile.speed >= 100).length;
        const bulkyMembers = (analyses || []).filter((entry) => entry.safeCount >= 4 || entry.statProfile.bulk >= 300).length;
        const cleanupMembers = (analyses || []).filter((entry) => entry.cleanupFit >= 6.5).length;
        const leadMembers = (analyses || []).filter((entry) => entry.leadFit >= 6).length;
        const candidates = [];

        function addIntent(config) {
            if (!config || !config.enabled) {
                return;
            }
            candidates.push(config);
        }

        addIntent({
            key: "hazardCycle",
            label: "설치 순환",
            enabled: hazards > 0 && pivot > 0,
            score: (hazards * 2) + (pivot * 1.5) + (bulkyMembers * 0.55) + (recovery * 0.35),
            summary: pickVariant(`team:intent:hazardCycle:${hazards}:${pivot}`, [
                "입력한 기술배치를 보면 설치기 뒤 턴조정으로 누적 이득을 쌓는 설치 순환 의도가 가장 뚜렷합니다.",
                "기술 구성을 보면 스텔스록류와 교체기를 묶어 장기적으로 압박하는 설치 순환 쪽 색이 강합니다.",
                "파티 전체 기술배치는 한 번 설치를 깔아 두고 교체전으로 체력을 깎는 설치 순환 방향에 가깝습니다."
            ])
        });
        addIntent({
            key: "screenSetup",
            label: "벽 전개",
            enabled: screens > 0 && setup > 0,
            score: (screens * 2) + (setup * 1.7) + (cleanupMembers * 0.8),
            summary: pickVariant(`team:intent:screenSetup:${screens}:${setup}`, [
                "입력한 기술배치를 보면 벽을 세운 뒤 에이스를 통과시키는 벽 전개 의도가 선명합니다.",
                "벽 기술과 부스트 기술이 함께 잡혀 있어 벽 전개로 판을 강하게 밀어붙이려는 구조가 보입니다.",
                "스크린 뒤에서 세팅 에이스를 살리는 벽 전개 쪽으로 기술 의도가 또렷하게 모여 있습니다."
            ])
        });
        addIntent({
            key: "speedSetup",
            label: "속도 전개",
            enabled: speedControl > 0 && (setup > 0 || cleanupMembers >= 2),
            score: (speedControl * 1.9) + (setup * 1.5) + (fastMembers * 0.8) + (cleanupMembers * 0.5),
            summary: pickVariant(`team:intent:speedSetup:${speedControl}:${setup}`, [
                "속도 제어와 마무리 카드 배치를 보면 빠른 턴에 전개를 몰아붙이는 속도 전개 의도가 읽힙니다.",
                "기술 구성이 스피드 조정 뒤 후속 에이스를 밀어 넣는 속도 전개 성격을 강하게 띱니다.",
                "상대보다 먼저 움직이는 구간을 만들고 그 턴에 이득을 굳히는 속도 전개 쪽 설계로 보입니다."
            ])
        });
        addIntent({
            key: "trickRoom",
            label: "트릭룸 전개",
            enabled: trickRoom > 0 && (analyses || []).some((entry) => entry.statProfile.speed <= 70 || entry.cleanupFit >= 7),
            score: (trickRoom * 2.4) + ((analyses || []).filter((entry) => entry.statProfile.speed <= 70).length * 1.1) + (cleanupMembers * 0.4),
            summary: pickVariant(`team:intent:trickRoom:${trickRoom}`, [
                "기술 배치를 보면 느린 축을 살리는 트릭룸 전개 의도가 분명합니다.",
                "트릭룸과 저속 화력 카드 조합이 보여서 트릭룸 전개로 판을 뒤집는 흐름이 핵심으로 보입니다.",
                "파티 전체가 빠른 템포보다 트릭룸 전개 타이밍에 힘이 실리도록 짜여 있습니다."
            ])
        });
        addIntent({
            key: "bulkyBalance",
            label: "밸런스 운영",
            enabled: bulkyMembers >= 2 && (recovery > 0 || pivot > 0 || disruption > 0),
            score: (bulkyMembers * 1.3) + (recovery * 1.2) + (pivot * 1.15) + (disruption * 0.85),
            summary: pickVariant(`team:intent:bulkyBalance:${bulkyMembers}:${pivot}:${recovery}`, [
                "내구와 운영기 배치를 보면 맞교환보다 교체 순서로 이득을 쌓는 밸런스 운영 의도가 강합니다.",
                "회복기와 사이클 요소가 보여서 한 번의 전개보다 중반 운영을 중시한 밸런스 운영 파티에 가깝습니다.",
                "기술 구성을 보면 급하게 밀어붙이기보다 받아내고 다시 압박하는 밸런스 운영 구조가 읽힙니다."
            ])
        });
        addIntent({
            key: "weatherPressure",
            label: "날씨 압박",
            enabled: weather > 0,
            score: (weather * 2) + (setup * 0.9) + (fastMembers * 0.6) + (leadMembers * 0.4),
            summary: pickVariant(`team:intent:weather:${weather}`, [
                "날씨 기술 배치를 보면 특정 턴에 화력과 속도를 끌어올리는 날씨 압박 의도가 보입니다.",
                "파티 기술 구성이 날씨 전개를 중심으로 특정 대면을 강제로 유리하게 만들려는 방향입니다.",
                "날씨를 열고 그 구간에 승부를 보는 날씨 압박 플랜이 파티 전체에 깔려 있습니다."
            ])
        });
        addIntent({
            key: "tempoPressure",
            label: "템포 압박",
            enabled: fastMembers >= 2 && (pivot > 0 || leadMembers >= 2),
            score: (fastMembers * 1.35) + (pivot * 1.1) + (leadMembers * 0.9) + (disruption * 0.55),
            summary: pickVariant(`team:intent:tempo:${fastMembers}:${pivot}`, [
                "빠른 축과 교체기 배치를 보면 초반 템포를 잡아 끝까지 밀어붙이는 템포 압박 성향이 강합니다.",
                "기술 구성이 선봉 주도권을 잡은 뒤 계속 유리 대면을 강요하는 템포 압박 쪽에 가깝습니다.",
                "초반 속도 이득을 바탕으로 교체전까지 주도하려는 템포 압박 의도가 기술에서 바로 드러납니다."
            ])
        });

        if (candidates.length === 0) {
            return {
                key: "roleBalance",
                label: "역할 분산",
                score: 1,
                summary: pickVariant("team:intent:roleBalance", [
                    "기술배치를 보면 특정 전개 하나보다 각 포켓몬 역할을 분산해 두는 쪽에 가깝습니다.",
                    "한 가지 플랜 올인보다는 여러 대면에 무난하게 대응하도록 기술이 배치돼 있습니다.",
                    "파티 의도는 특정 한 축보다 역할 분산과 대응 범위를 확보하는 데 더 가깝습니다."
                ])
            };
        }

        candidates.sort((left, right) => right.score - left.score);
        return candidates[0];
    }

    function scoreIntentFit(combo, teamIntent) {
        if (!combo || combo.length === 0 || !teamIntent) {
            return 0;
        }

        const hazards = countComboStrategy(combo, "hazards");
        const speedControl = countComboStrategy(combo, "speedControl");
        const screens = countComboStrategy(combo, "screens");
        const weather = countComboStrategy(combo, "weather");
        const recovery = countComboStrategy(combo, "recovery");
        const setup = countComboStrategy(combo, "setup");
        const pivot = countComboStrategy(combo, "pivot");
        const disruption = countComboStrategy(combo, "disruption");
        const trickRoom = countComboStrategy(combo, "trickRoom");
        const stableMembers = combo.filter((entry) => entry.safeCount >= 4 || entry.statProfile.bulk >= 300).length;
        const fastMembers = combo.filter((entry) => entry.fastCount >= 3 || entry.statProfile.speed >= 100).length;
        const cleanupMembers = combo.filter((entry) => entry.cleanupFit >= 6.5).length;

        switch (teamIntent.key) {
        case "hazardCycle":
            return (hazards > 0 ? 1.35 : -0.7) + (pivot > 0 ? 1.25 : -0.6) + (stableMembers >= 1 ? 0.7 : -0.2) + (recovery > 0 ? 0.35 : 0);
        case "screenSetup":
            return (screens > 0 ? 1.4 : -0.9) + (setup > 0 ? 1.25 : -0.8) + (cleanupMembers >= 1 ? 0.55 : -0.2);
        case "speedSetup":
            return (speedControl > 0 ? 1.2 : -0.5) + (setup > 0 ? 0.95 : 0) + (fastMembers >= 1 ? 0.55 : 0) + (cleanupMembers >= 1 ? 0.4 : 0);
        case "trickRoom":
            return (trickRoom > 0 ? 1.6 : -1.1) + (combo.some((entry) => entry.statProfile.speed <= 70 || entry.cleanupFit >= 7) ? 0.9 : -0.2);
        case "bulkyBalance":
            return (stableMembers >= 2 ? 1.2 : -0.45) + (pivot > 0 ? 0.95 : -0.3) + (recovery > 0 ? 0.85 : 0) + (disruption > 0 ? 0.35 : 0);
        case "weatherPressure":
            return (weather > 0 ? 1.45 : -0.85) + (fastMembers >= 1 ? 0.45 : 0) + (setup > 0 ? 0.35 : 0);
        case "tempoPressure":
            return (fastMembers >= 2 ? 1.15 : -0.4) + (pivot > 0 ? 0.9 : -0.3) + (combo.some((entry) => entry.leadFit >= 6.5) ? 0.45 : 0);
        default:
            return 0.25;
        }
    }

    function buildIntentAlignmentBundle(combo, teamIntent) {
        if (!combo || combo.length === 0 || !teamIntent) {
            return null;
        }

        const comboSeed = combo.map((entry) => entry.species.name).join("|");
        const hazardNames = summarizeMembersByStrategy(combo, "hazards", 1);
        const pivotNames = summarizeMembersByStrategy(combo, "pivot", 2);
        const screenNames = summarizeMembersByStrategy(combo, "screens", 1);
        const setupNames = summarizeMembersByStrategy(combo, "setup", 2);
        const recoveryNames = summarizeMembersByStrategy(combo, "recovery", 2);
        const weatherNames = summarizeMembersByStrategy(combo, "weather", 1);
        const speedNames = summarizeMembersByStrategy(combo, "speedControl", 2);
        const variantsByIntent = {
            hazardCycle: [
                `${hazardNames[0] || combo[0].species.koName}의 설치와 ${(pivotNames[0] || combo[1].species.koName)}의 턴조정이 이어져 입력한 파티 의도를 가장 덜 끊습니다.`,
                `${hazardNames[0] || combo[0].species.koName} 쪽 설치 압박 뒤 ${(pivotNames[0] || combo[1].species.koName)}로 교체전을 이어 가는 흐름이 현재 파티 설계와 가장 잘 맞습니다.`,
                "설치기와 턴조정기를 함께 살리는 구성이어서 입력한 파티의 핵심 의도를 그대로 실전에 옮기기 좋습니다."
            ],
            screenSetup: [
                `${screenNames[0] || combo[0].species.koName}의 벽 전개와 ${(setupNames[0] || combo[1].species.koName)}의 부스트 구간이 맞물려 파티 설계를 가장 자연스럽게 살립니다.`,
                "벽을 세우는 축과 세팅 에이스가 같이 들어가 입력한 벽 전개 구조를 그대로 굴리기 좋습니다.",
                `스크린 지원 뒤 ${(setupNames[0] || combo[1].species.koName)} 쪽 마무리를 여는 흐름이 파티 의도와 가장 정확히 맞닿아 있습니다.`
            ],
            speedSetup: [
                `${speedNames[0] || combo[0].species.koName}의 속도 제어와 ${(setupNames[0] || combo[1].species.koName)}의 마무리 각이 이어져 파티 의도와 잘 맞습니다.`,
                "속도 우위를 만드는 카드와 후속 에이스가 함께 들어가 입력한 속도 전개 흐름을 가장 살립니다.",
                "빠른 턴을 만드는 축과 후반 압박 카드가 같이 잡혀 있어 기술배치에서 읽힌 의도에 가깝습니다."
            ],
            trickRoom: [
                "트릭룸 턴을 직접 열고 받아먹는 카드가 같이 들어가 현재 파티 의도를 가장 안정적으로 실전에 옮길 수 있습니다.",
                "느린 화력축을 살리는 배치가 유지돼 입력한 기술 구성의 트릭룸 방향이 가장 잘 살아납니다.",
                "트릭룸 전개와 저속 마무리 카드가 같이 선출돼 파티 설계와 실제 추천 조합이 자연스럽게 이어집니다."
            ],
            bulkyBalance: [
                `${recoveryNames[0] || combo[0].species.koName} 쪽 운영 안정성과 ${(pivotNames[0] || combo[1].species.koName)}의 교체전 가치가 살아 있어 파티 본래 의도를 잘 보존합니다.`,
                "받아내는 축과 턴을 넘기는 축이 함께 들어가 입력한 밸런스 운영 구조를 가장 무난하게 재현합니다.",
                "회복기와 사이클 요소를 동시에 살릴 수 있어 파티 기술배치에서 읽힌 운영 의도를 덜 훼손합니다."
            ],
            weatherPressure: [
                `${weatherNames[0] || combo[0].species.koName}의 날씨 구간을 핵심 카드가 함께 활용할 수 있어 파티 의도가 또렷하게 유지됩니다.`,
                "날씨를 여는 카드와 그 구간에 힘을 받는 카드가 같이 선출돼 파티 설계 방향과 잘 맞습니다.",
                "기술배치에서 보인 날씨 압박 흐름을 실제 선출에서도 바로 살릴 수 있는 조합입니다."
            ],
            tempoPressure: [
                "빠른 축과 턴조정기가 함께 들어가 입력한 템포 압박 성향을 가장 자연스럽게 살릴 수 있습니다.",
                "선봉 템포를 잡은 뒤 계속 유리 대면을 이어 가는 흐름이 현재 파티 기술배치와 잘 맞물립니다.",
                "빠른 카드 비중과 교체전 가치가 동시에 살아 있어 파티의 템포 압박 의도와 맞습니다."
            ],
            roleBalance: [
                "특정 전개 하나보다 역할을 고르게 배분한 현재 파티 구조를 이 조합이 가장 안정적으로 보존합니다.",
                "한 방향 올인보다 역할 균형을 유지하는 현재 파티 설계와 이 조합이 가장 잘 맞습니다.",
                "입력한 기술배치가 가진 넓은 대응 범위를 이 조합이 가장 덜 잃습니다."
            ]
        };

        return {
            score: 7.85,
            category: "team-intent",
            seed: `${comboSeed}:intent:${teamIntent.key}`,
            chip: `의도 ${teamIntent.label}`,
            variants: variantsByIntent[teamIntent.key] || variantsByIntent.roleBalance
        };
    }

    function getBestMoveMultiplier(attackTypes, defenseTypes) {
        return (attackTypes || []).reduce((best, attackType) => {
            return Math.max(best, window.TypeModule.getTypeMultiplier(attackType, defenseTypes));
        }, 0);
    }

    function getCoverageBonus(moveMultiplier, stabMultiplier, attackProfile) {
        let score = 0;

        if (attackProfile.coverageTypes.length > 0 && moveMultiplier > stabMultiplier) {
            if (moveMultiplier >= 4) {
                score += 1.2;
            } else if (moveMultiplier >= 2) {
                score += 0.75;
            } else {
                score += 0.2;
            }
        }

        if (attackProfile.attackTypes.length >= 3) {
            score += 0.25;
        }

        return score;
    }

    function getBestMoveChoice(attackProfile, opponentTypes, speciesTypes, statProfile) {
        const evaluatedMoves = (attackProfile.offensiveMoves || []).map((move) => evaluateMoveAgainstTarget(move, opponentTypes, speciesTypes, statProfile));
        const rankedMoves = evaluatedMoves.sort((left, right) => right.score - left.score);
        if (rankedMoves.length > 0) {
            return rankedMoves[0];
        }

        const fallbackTypes = attackProfile.attackTypes || [];
        const fallbackType = fallbackTypes[0] || (speciesTypes || [])[0] || "";
        const multiplier = fallbackType ? window.TypeModule.getTypeMultiplier(fallbackType, opponentTypes) : 1;
        return {
            move: null,
            category: statProfile.offenseBias,
            multiplier,
            score: getOffenseScore(multiplier) + getMoveStatFit(statProfile.offenseBias, statProfile)
        };
    }

    function normalizeMemberRoles(member, species) {
        const merged = []
            .concat(Array.isArray(species.roles) ? species.roles : [])
            .concat(Array.isArray(member.roles) ? member.roles : []);

        return Array.from(new Set(merged.map((role) => String(role || "").trim().toLowerCase()).filter(Boolean)));
    }

    function collectTargetTypes(opponents) {
        const typeCounter = new Map();

        opponents.forEach((opponent) => {
            opponent.types.forEach((type) => {
                typeCounter.set(type, (typeCounter.get(type) || 0) + 1);
            });
        });

        return Array.from(typeCounter.entries())
            .sort((left, right) => right[1] - left[1])
            .slice(0, 2)
            .map(([type]) => window.TypeModule.toTypeLabel(type));
    }

    function summarizeOpponentNames(opponents, max) {
        return opponents.slice(0, max).map((opponent) => opponent.koName).join(", ");
    }

    function createReasonBundleForMember(species, member, analysis) {
        const reasonCandidates = [];
        const favorableNames = summarizeOpponentNames(analysis.favorableOpponents, 3);
        const riskyNames = summarizeOpponentNames(analysis.riskyOpponents, 2);
        const notableFavorableNames = summarizeNotableOpponents(analysis.favorableOpponents, 2);
        const notableRiskyNames = summarizeNotableOpponents(analysis.riskyOpponents, 2);
        const coverageTypes = analysis.coverageTypes.slice(0, 2).map((type) => window.TypeModule.toTypeLabel(type));

        pushReasonCandidate(reasonCandidates, {
            enabled: member.roles.includes("lead") || species.roles.includes("lead"),
            score: 7.5,
            category: "lead",
            seed: `${species.name}:member:lead`,
            chip: "선봉 압박",
            variants: [
                "초반 대면에서 바로 압박을 걸기 좋은 편입니다.",
                "선봉에서 바로 템포를 잡는 역할과 잘 맞습니다.",
                "첫 대면부터 상대 선택지를 좁히는 카드에 가깝습니다."
            ]
        });

        pushReasonCandidate(reasonCandidates, {
            enabled: coverageTypes.length > 0,
            score: 7,
            category: "coverage",
            seed: `${species.name}:member:coverage`,
            chip: `커버 ${coverageTypes.join("/")}`,
            variants: [
                `입력한 기술 기준으로 ${coverageTypes.join("/")} 커버가 있어 자속 외 압박 범위가 넓습니다.`,
                `${coverageTypes.join("/")} 보완 타점이 있어 상성 하나에만 의존하지 않습니다.`,
                `기술 구성이 ${coverageTypes.join("/")} 쪽까지 닿아 대면 폭이 생각보다 넓습니다.`
            ]
        });

        pushReasonCandidate(reasonCandidates, {
            enabled: analysis.fastCount >= 3,
            score: 7.2,
            category: "speed-control",
            seed: `${species.name}:member:fastcount`,
            chip: `속도우위 ${analysis.fastCount}`,
            variants: [
                "상대 다수 상대로 스피드 주도권을 잡기 쉬운 축입니다.",
                "현재 입력 기준으로 속도 우위를 확보하는 대면이 많습니다.",
                "빠른 전개가 필요한 판에서 먼저 움직일 확률이 높은 카드입니다."
            ]
        });

        pushReasonCandidate(reasonCandidates, {
            enabled: analysis.metaAnswerCount >= 1,
            score: 7.45,
            category: "meta-answer",
            seed: `${species.name}:member:metaanswer`,
            chip: `메타대응 ${analysis.metaAnswerCount}`,
            variants: [
                `현재 메타 상위 축 상대로도 역할이 잡혀 있어 범용 선출 가치가 높습니다.`,
                `최근 자주 보이는 상위 메타 카드들까지 의식하면 이 포켓몬 가치가 한 단계 더 올라갑니다.`,
                `실전에서 자주 마주치는 메타 상위 포켓몬들에 대한 답이 있어 추천 우선순위가 높습니다.`
            ]
        });
        pushReasonCandidate(reasonCandidates, {
            enabled: notableFavorableNames.length > 0,
            score: 7.55,
            category: "notable-favorable",
            seed: `${species.name}:member:notablefavorable`,
            chip: `${notableFavorableNames[0]} 견제`,
            variants: [
                `${notableFavorableNames.join(", ")}처럼 실제 체감상 까다로운 축 상대로 역할이 보여 실전 가치가 높습니다.`,
                `${notableFavorableNames.join(", ")} 라인처럼 메타에서 성가로운 포켓몬들에 직접 압박을 넣을 수 있습니다.`,
                `${notableFavorableNames.join(", ")} 같은 주요 메타 포켓몬에게 어느 정도 답이 있어 선출 목적이 선명합니다.`
            ]
        });

        const favorableTypes = collectTargetTypes(analysis.favorableOpponents);
        pushReasonCandidate(reasonCandidates, {
            enabled: favorableTypes.length > 0,
            score: 6.7,
            category: "target-types",
            seed: `${species.name}:member:favorabletypes`,
            chip: `압박 ${favorableTypes.join("/")}`,
            variants: [
                `${favorableTypes.join("/")} 축을 상대로 강하게 압박할 수 있습니다.`,
                `${favorableTypes.join("/")} 타입 라인에 대한 역할이 비교적 분명합니다.`,
                `${favorableTypes.join("/")} 쪽 상대로는 선출 가치가 확실히 올라갑니다.`
            ]
        });

        pushReasonCandidate(reasonCandidates, {
            enabled: analysis.safeCount >= 4,
            score: 7.1,
            category: "safe-switch",
            seed: `${species.name}:member:safecount`,
            chip: `안정 ${analysis.safeCount}`,
            variants: [
                "받아내는 상성도 나쁘지 않아 교체 대응이 비교적 안정적입니다.",
                "후출해서 받아낼 수 있는 대면이 많아 운영 안정감이 있습니다.",
                "상성상 버틸 수 있는 범위가 넓어 교체 카드로도 활용 가치가 높습니다."
            ]
        });

        pushReasonCandidate(reasonCandidates, {
            enabled: analysis.supportMoveCount >= 1 && (member.roles.includes("support") || member.roles.includes("pivot") || member.roles.includes("tank")),
            score: 5.8,
            category: "support",
            seed: `${species.name}:member:support`,
            chip: `운영보조 ${analysis.supportMoveCount}`,
            variants: [
                "보조기 비중도 있어 중반 운영 안정감까지 기대할 수 있습니다.",
                "단순 공격기만 있는 구성이 아니라 운영 보조까지 겸할 수 있습니다.",
                "중반에 턴을 정리하거나 흐름을 끊어 주는 역할도 기대할 수 있습니다."
            ]
        });

        pushReasonCandidate(reasonCandidates, {
            enabled: analysis.highPowerMoveCount >= 2,
            score: 6.4,
            category: "power",
            seed: `${species.name}:member:highpower`,
            chip: `고화력기 ${analysis.highPowerMoveCount}`,
            variants: [
                "고화력 기술 비중이 높아 마무리 압박도 충분합니다.",
                "주력기 화력이 높아 체력이 깎인 상대를 정리하는 그림도 좋습니다.",
                "결정력 있는 기술이 여러 개라 후반 압박 수단으로도 충분합니다."
            ]
        });

        pushReasonCandidate(reasonCandidates, {
            enabled: analysis.strategyTags.length > 0,
            score: 5.9,
            category: "style",
            seed: `${species.name}:member:style`,
            chip: analysis.styleLabel,
            variants: [
                `${analysis.styleLabel} 성향으로 운영 방향이 비교적 분명합니다.`,
                `기술 구성이 ${analysis.styleLabel} 쪽으로 기울어 있어 역할 해석이 쉽습니다.`,
                `${analysis.styleLabel} 플랜에 자연스럽게 묶이는 카드입니다.`
            ]
        });
        pushReasonCandidate(reasonCandidates, {
            enabled: Boolean(analysis.itemProfile && analysis.itemProfile.variants && analysis.itemProfile.variants.length > 0),
            score: 6.55,
            category: "item",
            seed: `${species.name}:member:item:${member.item || ""}`,
            chip: analysis.itemProfile ? analysis.itemProfile.chip : "",
            variants: analysis.itemProfile ? analysis.itemProfile.variants : []
        });

        pushReasonCandidate(reasonCandidates, {
            enabled: analysis.primaryPlan && analysis.primaryPlan.score >= 6.5,
            score: 6.8,
            category: "primary-plan",
            seed: `${species.name}:member:primaryplan`,
            chip: `주역 ${analysis.primaryPlan.label}`,
            variants: [
                `${analysis.primaryPlan.label} 역할 적합도가 높아 선출 방향을 잡기 쉽습니다.`,
                `현재 입력 기준으로는 ${analysis.primaryPlan.label} 축에서 가장 쓰기 편합니다.`,
                `${analysis.primaryPlan.label} 역할로 놓았을 때 장점이 가장 또렷하게 드러납니다.`
            ]
        });

        pushReasonCandidate(reasonCandidates, {
            enabled: analysis.isMegaCandidate,
            score: 5.5,
            category: "mega",
            seed: `${species.name}:member:mega`,
            chip: "메가",
            variants: [
                "메가 선택지라 화력과 상성 압박을 동시에 노리기 좋습니다.",
                "메가 축으로 잡았을 때 상대 교체를 강하게 흔들 수 있습니다.",
                "메가 운용을 전제로 두면 선출 우선순위가 더 올라가는 카드입니다."
            ]
        });

        pushReasonCandidate(reasonCandidates, {
            enabled: analysis.metaRiskCount >= 2,
            score: 4.9,
            category: "meta-risk",
            seed: `${species.name}:member:metarisk`,
            chip: `메타주의 ${analysis.metaRiskCount}`,
            variants: [
                `다만 최근 많이 보이는 메타 상위 축 일부에는 정면 대응이 불편해 보완 선출이 필요합니다.`,
                `현재 메타 기준 상위 카드 몇 종에는 다소 수동적일 수 있어 조합 보완이 중요합니다.`,
                `메타 상위 압박축 몇 개에는 직접 맞대기보다 후속 운영으로 풀어야 하는 편입니다.`
            ]
        });
        pushReasonCandidate(reasonCandidates, {
            enabled: notableRiskyNames.length > 0,
            score: 5.05,
            category: "notable-risk",
            seed: `${species.name}:member:notablerisk`,
            chip: `${notableRiskyNames[0]} 주의`,
            variants: [
                `다만 ${notableRiskyNames.join(", ")} 같은 메타 핵심 카드 상대로는 대면 운영을 조금 더 신중히 잡아야 합니다.`,
                `${notableRiskyNames.join(", ")} 쪽은 실제 체감 난도가 높은 축이라 후속 보완이 함께 필요합니다.`,
                `${notableRiskyNames.join(", ")} 같은 성가로운 포켓몬 상대로는 정면 상성보다 운영 플랜을 먼저 정해 두는 편이 좋습니다.`
            ]
        });

        pushReasonCandidate(reasonCandidates, {
            enabled: analysis.favorableOpponents.length >= 2 && favorableNames,
            score: 7.3,
            category: "favorable-opponents",
            seed: `${species.name}:member:favorableopponents`,
            chip: `유리 ${analysis.favorableOpponents.length}`,
            variants: [
                `${favorableNames} 같은 핵심 상대로 뚜렷한 역할이 있습니다.`,
                `${favorableNames} 라인에 직접 압박을 넣을 수 있어 선출 목적이 분명합니다.`,
                `${favorableNames} 대면에서 유리 구도를 만들 가능성이 높습니다.`
            ]
        });

        pushReasonCandidate(reasonCandidates, {
            enabled: analysis.riskyOpponents.length >= 2 && riskyNames,
            score: 4.8,
            category: "risky-opponents",
            seed: `${species.name}:member:riskyopponents`,
            chip: `주의 ${analysis.riskyOpponents.length}`,
            variants: [
                `다만 ${riskyNames} 대면은 후출 각을 조금 더 신중히 잡아야 합니다.`,
                `반대로 ${riskyNames} 상대로는 정면 대면보다 운영으로 풀어 가는 편이 안전합니다.`,
                `${riskyNames} 쪽 압박은 부담이 있어 선봉보다는 후속 카드로 쓰는 편이 낫습니다.`
            ]
        });

        pushReasonCandidate(reasonCandidates, {
            enabled: reasonCandidates.length === 0,
            score: 3,
            category: "default",
            seed: `${species.name}:member:default`,
            chip: "무난함",
            variants: [
                "특정 한 축보다는 전반적인 무난함으로 선출 가치를 만드는 카드입니다.",
                "한 가지 장점보다 전체적인 평균치로 선출 가치를 확보하는 유형입니다.",
                "극단적인 매치업보다는 넓은 범위에서 무난함을 제공하는 카드입니다."
            ]
        });

        return buildReasonBundle(`${species.name}:member`, reasonCandidates, 2, 2, 4);
    }

    function buildComboSummaryBundle(combo, opponents, leadAnchor, pivotAnchor, cleanupAnchor, teamIntent) {
        const comboSeed = combo.map((entry) => entry.species.name).join("|");
        const reasonCandidates = [];
        const roleLabels = Array.from(new Set(combo.flatMap((entry) => entry.roles.map((role) => ROLE_LABELS[role] || role)))).slice(0, 3);
        const stableMembers = combo.filter((entry) => entry.safeCount >= 4).map((entry) => entry.species.koName);
        const fastMembers = combo.filter((entry) => entry.fastCount >= 3).map((entry) => entry.species.koName);
        const styleLabel = getComboStyleLabel(combo);
        const metaTargets = summarizeMetaOpponents(opponents, 2);
        const notableOpponents = summarizeNotableOpponents(opponents, 2);
        const sourceBackedOpponents = summarizeSourceBackedOpponents(opponents, 2);
        const pressureTargets = collectTargetTypes(
            opponents.filter((opponent) => combo.some((entry) => {
                const matchup = entry.matchupByOpponent[opponent.name];
                return matchup && matchup.offenseMultiplier >= 2;
            }))
        );
        const answerPairs = opponents.map((opponent) => {
            const answers = combo.filter((entry) => {
                const matchup = entry.matchupByOpponent[opponent.name];
                return matchup && (matchup.offenseMultiplier >= 2 || matchup.matchupScore >= 2.2);
            });
            return {
                opponent,
                answers
            };
        }).filter((entry) => entry.answers.length > 0).slice(0, 3);
        const megaMember = combo.find((entry) => entry.isMegaCandidate);
        const megaMemberName = megaMember ? megaMember.species.koName : "";
        const intentBundle = buildIntentAlignmentBundle(combo, teamIntent);

        pushReasonCandidate(reasonCandidates, {
            enabled: roleLabels.length > 0,
            score: 7.6,
            category: "roles",
            seed: `${comboSeed}:combo:roles`,
            chip: roleLabels[0] || "",
            variants: [
                `${roleLabels.join(" / ")} 역할이 겹치지 않게 배치돼 조합 목적이 비교적 선명합니다.`,
                `${roleLabels.join(" / ")} 축이 함께 서 있어 누가 초반, 중반, 후반을 맡는지 해석이 쉽습니다.`,
                `${roleLabels.join(" / ")} 역할 분담이 비교적 또렷해 선출 이유가 분명하게 잡힙니다.`
            ]
        });
        pushReasonCandidate(reasonCandidates, {
            enabled: Boolean(styleLabel),
            score: 7.3,
            category: "style",
            seed: `${comboSeed}:combo:style`,
            chip: styleLabel,
            variants: getComboStyleVariants(styleLabel)
        });
        pushReasonCandidate(reasonCandidates, intentBundle);
        pushReasonCandidate(reasonCandidates, {
            enabled: stableMembers.length > 0,
            score: 6.8,
            category: "stable",
            seed: `${comboSeed}:combo:stable`,
            chip: `안정 ${stableMembers.length}`,
            variants: [
                `${stableMembers.slice(0, 2).join(", ")} 쪽이 받아주는 역할을 맡아 중반 교체 안정성을 만들기 좋습니다.`,
                `${stableMembers.slice(0, 2).join(", ")} 라인이 있어 무리한 맞대면 대신 운영으로 판을 정리하기 쉽습니다.`,
                `${stableMembers.slice(0, 2).join(", ")} 덕분에 불리 대면에서도 바로 무너지지 않고 흐름을 넘길 수 있습니다.`
            ]
        });
        pushReasonCandidate(reasonCandidates, {
            enabled: fastMembers.length > 0,
            score: 6.7,
            category: "fast",
            seed: `${comboSeed}:combo:fast`,
            chip: `속도축 ${fastMembers.length}`,
            variants: [
                `${fastMembers.slice(0, 2).join(", ")} 쪽이 속도 라인을 잡아 줘 템포를 잃지 않기 쉽습니다.`,
                `${fastMembers.slice(0, 2).join(", ")}가 빠른 흐름을 담당해 초반 이득을 후반까지 연결하기 좋습니다.`,
                `${fastMembers.slice(0, 2).join(", ")} 덕분에 속도 싸움에서 밀리지 않는 그림을 만들기 쉽습니다.`
            ]
        });
        pushReasonCandidate(reasonCandidates, {
            enabled: Boolean(leadAnchor && pivotAnchor && cleanupAnchor),
            score: 7.9,
            category: "plan",
            seed: `${comboSeed}:combo:plan`,
            chip: "역할배치",
            variants: [
                `선봉은 ${leadAnchor.species.koName}, 운영은 ${pivotAnchor.species.koName}, 마무리는 ${cleanupAnchor.species.koName} 쪽이 가장 자연스럽습니다.`,
                `${leadAnchor.species.koName}로 초반을 열고 ${pivotAnchor.species.koName}가 중반을 받친 뒤 ${cleanupAnchor.species.koName}로 끝내는 흐름이 가장 깔끔합니다.`,
                `실전 배치로 보면 ${leadAnchor.species.koName} 선봉, ${pivotAnchor.species.koName} 운영, ${cleanupAnchor.species.koName} 마무리 순서가 가장 안정적입니다.`
            ]
        });
        pushReasonCandidate(reasonCandidates, {
            enabled: pressureTargets.length > 0,
            score: 6.9,
            category: "targets",
            seed: `${comboSeed}:combo:pressuretargets`,
            chip: `압박 ${pressureTargets.join("/")}`,
            variants: [
                `${pressureTargets.join("/")} 축 대응이 선명해 상대 조합을 봤을 때 선출 목적을 바로 잡기 쉽습니다.`,
                `${pressureTargets.join("/")} 타입 라인을 겨냥하는 구조라 어느 매치업을 노리는 조합인지 분명합니다.`,
                `${pressureTargets.join("/")} 쪽에 압박 축이 모여 있어 선출 의도가 비교적 명확하게 드러납니다.`
            ]
        });
        pushReasonCandidate(reasonCandidates, {
            enabled: metaTargets.length > 0,
            score: 7.05,
            category: "meta-targets",
            seed: `${comboSeed}:combo:metatargets`,
            chip: `메타 ${metaTargets[0] || ""}`,
            variants: [
                `현재 메타에서 자주 보이는 ${metaTargets.join(", ")} 축까지 의식했을 때도 대응 방향이 비교적 선명합니다.`,
                `${metaTargets.join(", ")}처럼 실제 선출 빈도가 높은 메타 카드들을 봐도 이 조합 쪽이 덜 흔들립니다.`,
                `최근 커뮤니티에서 자주 언급되는 ${metaTargets.join(", ")} 라인에 대한 대응이 무난해 실전성이 높습니다.`
            ]
        });
        pushReasonCandidate(reasonCandidates, {
            enabled: notableOpponents.length > 0,
            score: 7.15,
            category: "notable-opponents",
            seed: `${comboSeed}:combo:notableopponents`,
            chip: `${notableOpponents[0]} 의식`,
            variants: [
                `${notableOpponents.join(", ")}처럼 실제 체감상 거슬리는 포켓몬들까지 포함해 봐도 이 조합 쪽이 운영 방향을 잡기 편합니다.`,
                `${notableOpponents.join(", ")} 같은 성가로운 메타 카드 상대로도 역할 분담이 어느 정도 분명합니다.`,
                `${notableOpponents.join(", ")} 라인을 상대할 때도 누가 받아내고 누가 마무리할지 흐름이 비교적 선명합니다.`
            ]
        });
        pushReasonCandidate(reasonCandidates, {
            enabled: sourceBackedOpponents.length > 0,
            score: 7.25,
            category: "source-opponents",
            seed: `${comboSeed}:combo:sourceopponents`,
            chip: `${sourceBackedOpponents[0]} 엔트리`,
            variants: [
                `${sourceBackedOpponents.join(", ")}처럼 최근 샘플 파티에서 실제 출전 빈도가 높은 카드까지 감안해도 이 조합 쪽이 대응 흐름을 잡기 편합니다.`,
                `${sourceBackedOpponents.join(", ")} 라인은 공략과 실전 후기에서 모두 자주 언급되는 엔트리라, 그 기준으로 봐도 이번 조합이 크게 흔들리지 않습니다.`,
                `${sourceBackedOpponents.join(", ")} 같은 출처 기반 빈출 엔트리까지 넣어 보면 이 조합의 선출 의도가 더 설득력 있게 맞물립니다.`
            ]
        });
        pushReasonCandidate(reasonCandidates, {
            enabled: answerPairs.length > 0,
            score: 6.5,
            category: "answers",
            seed: `${comboSeed}:combo:answers`,
            chip: `대응 ${answerPairs.length}`,
            variants: [
                answerPairs.map((entry) => `${entry.opponent.koName}에는 ${entry.answers.map((answer) => answer.species.koName).join(", ")}`).join(" / ") + " 쪽으로 대응축이 잡힙니다.",
                answerPairs.map((entry) => `${entry.opponent.koName} 대면은 ${entry.answers.map((answer) => answer.species.koName).join(", ")}`).join(" / ") + " 순으로 답을 맞춰 내기 좋습니다.",
                answerPairs.map((entry) => `${entry.opponent.koName} 상대로는 ${entry.answers.map((answer) => answer.species.koName).join(", ")}`).join(" / ") + " 역할이 비교적 확실합니다."
            ]
        });
        pushReasonCandidate(reasonCandidates, {
            enabled: Boolean(megaMember),
            score: 6.1,
            category: "mega",
            seed: `${comboSeed}:combo:mega`,
            chip: "메가축",
            variants: [
                `${megaMemberName}를 메가 축으로 잡고 나머지가 교체와 마무리를 받쳐 주는 그림이 자연스럽습니다.`,
                `${megaMemberName} 메가 전개를 중심에 두면 다른 두 마리 역할도 함께 정리됩니다.`,
                `${megaMemberName}를 핵심 에이스로 두고 주변이 받쳐 주는 구조가 가장 깔끔합니다.`
            ]
        });
        pushReasonCandidate(reasonCandidates, {
            enabled: reasonCandidates.length === 0,
            score: 3,
            category: "default",
            seed: `${comboSeed}:combo:default`,
            chip: "무난함",
            variants: [
                "세 마리 모두 특정 한 축보다 전반적인 평균치로 조합 가치를 만드는 편입니다.",
                "극단적인 상성보다 전반적인 밸런스로 굴리는 조합에 가깝습니다.",
                "한 가지 전개보다 넓은 상황에서 무난함을 확보하는 방식의 조합입니다."
            ]
        });

        return buildReasonBundle(`${comboSeed}:combo`, reasonCandidates, 2, 3, 5);
    }

    function buildLeadResponseReasonBundle(candidate, response, mode) {
        const reasonCandidates = [];
        const matchup = response && response.matchup;
        const speedResult = matchup && matchup.speedResult;
        const moveName = matchup && matchup.bestMoveName ? matchup.bestMoveName : "";
        const moveLabel = moveName ? `${moveName}` : "주력기";
        const speedGap = speedResult ? speedResult.myStat - speedResult.enemyStat : 0;
        const candidateNotes = candidate && candidate.opponent ? getSpeciesMetaNotes(candidate.opponent) : null;

        pushReasonCandidate(reasonCandidates, {
            enabled: Boolean(matchup && matchup.offenseMultiplier >= 2),
            score: 8.1,
            category: "offense",
            seed: `${candidate.opponent.name}:${response.entry.species.name}:${mode}:offense`,
            chip: `유효타 ${formatMultiplier(matchup.offenseMultiplier)}배`,
            variants: [
                `${moveLabel} 기준 상성 ${formatMultiplier(matchup.offenseMultiplier)}배 압박이 가능해 첫 대면에서 주도권을 잡기 쉽습니다.`,
                `${moveLabel} 타점이 분명해 ${candidate.opponent.koName} 상대로 바로 압박을 걸기 좋습니다.`,
                `${moveLabel}로 강한 유효타가 들어가 초반 맞대면에서 가장 직접적인 대응이 됩니다.`
            ]
        });
        pushReasonCandidate(reasonCandidates, {
            enabled: Boolean(candidateNotes && candidateNotes.response && candidateNotes.response.length > 0),
            score: 7.15,
            category: "meta-response",
            seed: `${candidate.opponent.name}:${response.entry.species.name}:${mode}:metaresponse`,
            chip: candidateNotes ? candidateNotes.chip : "",
            variants: candidateNotes ? candidateNotes.response : []
        });
        pushReasonCandidate(reasonCandidates, {
            enabled: Boolean(speedResult && speedGap >= 0),
            score: 7.4,
            category: "speed",
            seed: `${candidate.opponent.name}:${response.entry.species.name}:${mode}:speed:up`,
            chip: `속도 ${speedResult ? `${speedResult.myStat}:${speedResult.enemyStat}` : ""}`,
            variants: [
                `스피드 추정 ${speedResult.myStat} 대 ${speedResult.enemyStat}로 선공 구도를 잡을 가능성이 높습니다.`,
                `속도 라인도 ${speedResult.myStat} 대 ${speedResult.enemyStat}라 초반 선택지를 더 넓게 가져갈 수 있습니다.`,
                `예상 스피드에서 앞설 가능성이 높아 대면 압박이 더 안정적으로 성립합니다.`
            ]
        });
        pushReasonCandidate(reasonCandidates, {
            enabled: Boolean(speedResult && speedGap < 0),
            score: 5.8,
            category: "speed-risk",
            seed: `${candidate.opponent.name}:${response.entry.species.name}:${mode}:speed:down`,
            chip: `속도열세 ${Math.abs(speedGap)}`,
            variants: [
                `스피드는 뒤처질 수 있지만 대면 상성 자체는 나쁘지 않아 대응 카드로는 충분합니다.`,
                `속도 우위는 없더라도 상성상 바로 밀리지는 않아 후속 대응으로 쓸 가치는 남습니다.`,
                `선공 가능성은 낮아도 대면 손해가 과하지 않아 운영 카드로는 안정적입니다.`
            ]
        });
        pushReasonCandidate(reasonCandidates, {
            enabled: Boolean(matchup && matchup.defenseMultiplier <= 1),
            score: mode === "primary" ? 6.9 : 7.2,
            category: "defense",
            seed: `${candidate.opponent.name}:${response.entry.species.name}:${mode}:defense`,
            chip: "안정교체",
            variants: [
                "상대 주력 타입을 정면으로 크게 아프지 않게 받아낼 수 있어 대응 안정성도 괜찮습니다.",
                "맞교환만이 아니라 받아낸 뒤 다시 턴을 넘기는 운영까지 기대할 수 있습니다.",
                "교체 부담이 비교적 적어 한 번 받아낸 뒤 흐름을 다시 잡기 좋습니다."
            ]
        });
        pushReasonCandidate(reasonCandidates, {
            enabled: Boolean(response && response.entry && mode === "primary" && response.entry.leadFit >= 6),
            score: 6.7,
            category: "role-fit",
            seed: `${candidate.opponent.name}:${response.entry.species.name}:${mode}:rolefit`,
            chip: `선봉 ${response.entry.leadFit.toFixed(1)}`,
            variants: [
                `원래 선봉 적합도도 높아 이 대면 하나만이 아니라 전체 선출 흐름과도 잘 맞습니다.`,
                `선봉 성향이 분명한 카드라 상대 예상 선봉에 맞춰 내더라도 이후 운영이 어색하지 않습니다.`,
                `대면 상성뿐 아니라 전체 선출 플랜에서도 첫 카드로 놓기 편한 포켓몬입니다.`
            ]
        });
        pushReasonCandidate(reasonCandidates, {
            enabled: Boolean(response && response.entry && mode === "backup" && response.entry.pivotFit >= 6),
            score: 6.8,
            category: "pivot-fit",
            seed: `${candidate.opponent.name}:${response.entry.species.name}:${mode}:pivotfit`,
            chip: `운영 ${response.entry.pivotFit.toFixed(1)}`,
            variants: [
                `운영 적합도도 높아 한 번 받아낸 뒤 중반 축으로 이어 주기 좋습니다.`,
                `후속 운영 카드 성격이 강해 선봉이 꼬여도 흐름을 정리하는 역할을 맡기 좋습니다.`,
                `단순 백업이 아니라 중반 교체전까지 맡길 수 있는 카드라 가치가 높습니다.`
            ]
        });
        pushReasonCandidate(reasonCandidates, {
            enabled: reasonCandidates.length === 0,
            score: 3,
            category: "default",
            seed: `${candidate.opponent.name}:${response.entry.species.name}:${mode}:default`,
            chip: "무난대응",
            variants: [
                "특정 수치 하나보다 대면 전반의 무난함으로 대응 우선순위가 올라간 카드입니다.",
                "압도적인 강점 하나보다는 여러 면에서 크게 밀리지 않아 대응 후보로 남습니다.",
                "대면 상성, 속도, 후속 운영이 모두 평균 이상이라 기본 대응 카드로 두기 좋습니다."
            ]
        });

        return buildReasonBundle(`${candidate.opponent.name}:${response.entry.species.name}:${mode}`, reasonCandidates, 1, 2, 3);
    }

    function evaluateMember(member, opponents) {
        const species = window.PokeData.getFormSpecies(member.name, member.form) || window.PokeData.getPokemonByName(member.name);

        if (!species) {
            return null;
        }

        const roles = normalizeMemberRoles(member, species);
        const attackProfile = buildAttackProfile(member, species);
        const statProfile = buildStatProfile(species);
        const megaCandidate = isMegaCandidate(member, species);
        const itemProfile = getItemTacticalProfile(member.item);
        const analysis = {
            member,
            species,
            isMegaCandidate: megaCandidate,
            itemLabel: itemProfile ? itemProfile.shortLabel : "",
            roles,
            attackTypes: attackProfile.attackTypes,
            coverageTypes: attackProfile.coverageTypes,
            moveNames: attackProfile.offensiveMoves.map((move) => move.koName),
            supportMoveCount: attackProfile.supportMoveCount,
            leadSupportCount: attackProfile.leadSupportCount,
            pivotMoveCount: attackProfile.pivotMoveCount,
            setupMoveCount: attackProfile.setupMoveCount,
            priorityMoveCount: attackProfile.priorityMoveCount,
            highPowerMoveCount: attackProfile.highPowerMoveCount,
            strategyTags: attackProfile.strategyTags,
            strategyLabels: attackProfile.strategyTags.map((tag) => STRATEGY_LABELS[tag] || tag),
            statProfile,
            itemProfile,
            totalScore: 0,
            leadScore: 0,
            metaAnswerCount: 0,
            metaRiskCount: 0,
            fastCount: 0,
            safeCount: 0,
            favorableOpponents: [],
            riskyOpponents: [],
            matchupByOpponent: {}
        };

        opponents.forEach((opponent) => {
            const metaWeight = getMetaWeight(opponent);
            const metaFactor = getMetaInfluenceFactor(opponent);
            const bestMoveChoice = getBestMoveChoice(attackProfile, opponent.types, species.types, statProfile);
            const bestMoveMultiplier = bestMoveChoice.multiplier;
            const bestStabMultiplier = window.TypeModule.getBestStabMultiplier(species.types, opponent.types);
            const worstIncomingMultiplier = window.TypeModule.getWorstIncomingMultiplier(opponent.types, species.types);
            const speedResult = window.SpeedModule.compareSpeed(species, member, opponent);
            const coverageBonus = getCoverageBonus(bestMoveMultiplier, bestStabMultiplier, attackProfile);
            const matchupScore = bestMoveChoice.score + coverageBonus + getDefenseScore(worstIncomingMultiplier) + getSpeedScore(speedResult);

            analysis.totalScore += matchupScore * metaFactor;
            analysis.leadScore += matchupScore * (0.85 + ((metaWeight - 1) * 0.22));
            analysis.matchupByOpponent[opponent.name] = {
                offenseMultiplier: bestMoveMultiplier,
                stabMultiplier: bestStabMultiplier,
                bestMoveName: bestMoveChoice.move ? bestMoveChoice.move.koName : "",
                bestMoveType: bestMoveChoice.move ? bestMoveChoice.move.type : "",
                bestMoveCategory: bestMoveChoice.category,
                defenseMultiplier: worstIncomingMultiplier,
                speedResult,
                coverageBonus,
                matchupScore,
                metaWeight
            };

            if (bestMoveMultiplier >= 2 || matchupScore >= 2.6) {
                analysis.favorableOpponents.push(opponent);
            }

            if (speedResult.myStat >= speedResult.enemyStat) {
                analysis.fastCount += 1;
            }

            if (worstIncomingMultiplier <= 1) {
                analysis.safeCount += 1;
            }

            if ((worstIncomingMultiplier >= 2 && bestMoveMultiplier < 2) || matchupScore <= -1.8) {
                analysis.riskyOpponents.push(opponent);
            }

            if (metaWeight >= 1.15 && (bestMoveMultiplier >= 2 || matchupScore >= 2.6)) {
                analysis.metaAnswerCount += 1;
            }
            if (metaWeight >= 1.15 && ((worstIncomingMultiplier >= 2 && bestMoveMultiplier < 2) || matchupScore <= -1.8)) {
                analysis.metaRiskCount += 1;
            }
        });

        if (roles.includes("lead")) {
            analysis.leadScore += 4.2;
            analysis.totalScore += 1.2;
        }
        if (roles.includes("pivot")) {
            analysis.leadScore += 1.2;
            analysis.totalScore += 1.4;
        }
        if (roles.includes("tank")) {
            analysis.leadScore += 0.8;
            analysis.totalScore += 1.4;
        }
        if (roles.includes("wallbreaker")) {
            analysis.totalScore += 1.1;
        }
        if (roles.includes("cleaner") || roles.includes("revenge")) {
            analysis.totalScore += analysis.fastCount >= 3 ? 1.3 : 0.5;
        }
        if (roles.includes("support") || roles.includes("pivot") || roles.includes("tank")) {
            analysis.totalScore += attackProfile.supportMoveCount >= 1 ? 0.8 : 0;
            analysis.leadScore += roles.includes("pivot") && attackProfile.supportMoveCount >= 1 ? 0.4 : 0;
        }
        if (attackProfile.coverageTypes.length >= 2) {
            analysis.totalScore += 0.8;
        } else if (attackProfile.coverageTypes.length === 1) {
            analysis.totalScore += 0.35;
        }
        if (attackProfile.highPowerMoveCount >= 2) {
            analysis.totalScore += 0.7;
        }
        if (analysis.isMegaCandidate) {
            const megaBonus = analysis.favorableOpponents.length >= 2 ? 2.1 : 0.9;
            analysis.totalScore += megaBonus;
            analysis.leadScore += megaBonus * 0.35;
        }
        if (analysis.metaAnswerCount >= 2) {
            analysis.totalScore += 0.9;
            analysis.leadScore += 0.35;
        }
        if (analysis.metaRiskCount >= 2) {
            analysis.totalScore -= 0.55;
        }

        analysis.leadFit = scoreLeadFit(analysis, attackProfile, statProfile);
        analysis.pivotFit = scorePivotFit(analysis, attackProfile, statProfile);
        analysis.cleanupFit = scoreCleanupFit(analysis, attackProfile, statProfile);
        analysis.primaryPlan = getPrimaryPlan(analysis);
        analysis.styleLabel = getPrimaryStyleLabel(analysis.strategyTags);
        analysis.totalScore = clamp(analysis.totalScore, -18, 28);
        analysis.leadScore = clamp(analysis.leadScore, -14, 30);
        const reasonBundle = createReasonBundleForMember(species, { roles }, analysis);
        analysis.reason = reasonBundle.summary;
        analysis.reasonDetails = reasonBundle.details;
        analysis.reasonChips = reasonBundle.chips;
        return analysis;
    }

    function combinations(items, size) {
        const result = [];

        function walk(startIndex, picked) {
            if (picked.length === size) {
                result.push(picked.slice());
                return;
            }

            for (let index = startIndex; index < items.length; index += 1) {
                picked.push(items[index]);
                walk(index + 1, picked);
                picked.pop();
            }
        }

        walk(0, []);
        return result;
    }

    function scoreRoleSpread(combo) {
        const roleCounter = new Map();

        combo.forEach((entry) => {
            entry.roles.forEach((role) => {
                roleCounter.set(role, (roleCounter.get(role) || 0) + 1);
            });
        });

        let score = roleCounter.size * 0.9;

        roleCounter.forEach((count) => {
            if (count >= 3) {
                score -= 1.8;
            } else if (count === 2) {
                score -= 0.4;
            }
        });

        return score;
    }

    function scoreCoverage(combo, opponents) {
        let score = 0;

        opponents.forEach((opponent) => {
            const metaFactor = 0.76 + (getMetaWeight(opponent) * 0.24);
            let goodAnswers = 0;
            let safeSwitches = 0;

            combo.forEach((entry) => {
                const matchup = entry.matchupByOpponent[opponent.name];

                if (!matchup) {
                    return;
                }

                if (matchup.offenseMultiplier >= 2 || matchup.matchupScore >= 2.2) {
                    goodAnswers += 1;
                }

                if (matchup.defenseMultiplier <= 1) {
                    safeSwitches += 1;
                }
            });

            if (goodAnswers >= 2) {
                score += 2.2 * metaFactor;
            } else if (goodAnswers === 1) {
                score += 1.1 * metaFactor;
            } else {
                score -= 1.9 * metaFactor;
            }

            if (safeSwitches >= 2) {
                score += 0.8 * metaFactor;
            }
        });

        return score;
    }

    function scoreSpeedLine(combo) {
        const quickMembers = combo.filter((entry) => entry.fastCount >= 3).length;

        if (quickMembers >= 2) {
            return 2.2;
        }
        if (quickMembers === 1) {
            return 1;
        }
        return -0.7;
    }

    function scoreMegaUsage(combo) {
        const megaCandidates = countMegaCandidates(combo);

        if (megaCandidates === 1) {
            return 0.9;
        }
        if (megaCandidates >= 2) {
            return -1.1;
        }
        return 0;
    }

    function compareLeadPriority(left, right) {
        if (right.leadScore !== left.leadScore) {
            return right.leadScore - left.leadScore;
        }
        return right.totalScore - left.totalScore;
    }

    function chooseRecommendedLead(analyses, primaryCombo) {
        if (primaryCombo && primaryCombo.combo && primaryCombo.combo.length > 0) {
            return primaryCombo.combo.slice().sort(compareLeadPriority)[0] || null;
        }
        return analyses.slice().sort(compareLeadPriority)[0] || null;
    }

    function scorePlanBalance(combo) {
        const bestLead = Math.max.apply(null, combo.map((entry) => entry.leadFit));
        const bestPivot = Math.max.apply(null, combo.map((entry) => entry.pivotFit));
        const bestCleanup = Math.max.apply(null, combo.map((entry) => entry.cleanupFit));
        let score = 0;

        score += bestLead >= 6 ? 1.7 : -0.8;
        score += bestPivot >= 6 ? 1.7 : -1.1;
        score += bestCleanup >= 6 ? 1.7 : -0.8;

        const strongPlans = combo.filter((entry) => entry.primaryPlan && entry.primaryPlan.score >= 6.5).length;
        if (strongPlans >= 2) {
            score += 0.9;
        }

        return score;
    }

    function countComboStrategy(combo, strategyKey) {
        return combo.filter((entry) => (entry.strategyTags || []).includes(strategyKey)).length;
    }

    function scoreStrategyProfile(combo) {
        let score = 0;
        const hazards = countComboStrategy(combo, "hazards");
        const speedControl = countComboStrategy(combo, "speedControl");
        const screens = countComboStrategy(combo, "screens");
        const weather = countComboStrategy(combo, "weather");
        const recovery = countComboStrategy(combo, "recovery");
        const setup = countComboStrategy(combo, "setup");
        const pivot = countComboStrategy(combo, "pivot");
        const disruption = countComboStrategy(combo, "disruption");
        const trickRoom = countComboStrategy(combo, "trickRoom");

        if (hazards > 0) { score += 0.9; }
        if (speedControl > 0) { score += 0.8; }
        if (screens > 0) { score += 0.8; }
        if (weather > 0) { score += 0.8; }
        if (recovery > 0) { score += 0.7; }
        if (setup > 0) { score += 0.9; }
        if (pivot > 0) { score += 0.8; }
        if (disruption > 0) { score += 0.7; }
        if (trickRoom > 0) { score += 0.9; }
        if (hazards > 0 && pivot > 0) { score += 0.9; }
        if (screens > 0 && setup > 0) { score += 0.8; }
        if (speedControl > 0 && setup > 0) { score += 0.6; }
        if (trickRoom > 0 && combo.some((entry) => entry.statProfile.speed <= 70 || entry.cleanupFit >= 7)) { score += 0.8; }

        return score;
    }

    function summarizeComboStrategies(combo) {
        const counts = new Map();

        combo.forEach((entry) => {
            (entry.strategyTags || []).forEach((tag) => {
                counts.set(tag, (counts.get(tag) || 0) + 1);
            });
        });

        return Array.from(counts.entries())
            .sort((left, right) => right[1] - left[1])
            .map(([tag]) => ({ key: tag, label: STRATEGY_LABELS[tag] || tag }));
    }

    function getComboStyleLabel(combo) {
        const tags = summarizeComboStrategies(combo).map((entry) => entry.key);
        return getPrimaryStyleLabel(tags);
    }

    function getComboStyleVariants(styleLabel) {
        if (!styleLabel) {
            return [];
        }
        if (styleLabel === "밸런스") {
            return [
                "한쪽에 과하게 치우치지 않아 기본 선출 안정감이 좋습니다.",
                "극단적인 전개보다 넓은 대응 범위와 무난한 운영을 기대할 수 있습니다.",
                "특정 한 축 올인보다 전반적인 대응력과 안정감을 우선한 조합입니다."
            ];
        }
        return [
            `${styleLabel} 성향이 분명해 세 마리를 함께 냈을 때 운영 흐름이 잘 이어집니다.`,
            `전체적으로 ${styleLabel} 플랜이 뚜렷해 실전에서 굴리는 방식이 비교적 명확합니다.`,
            `${styleLabel} 쪽으로 중심이 잡혀 있어 각 카드의 쓰임새가 자연스럽게 연결됩니다.`
        ];
    }

    function getBattlePlanStyleVariants(styleLabel) {
        if (!styleLabel) {
            return [];
        }
        if (styleLabel === "밸런스") {
            return [
                "전체 조합은 한쪽에 치우치기보다 대면 대응과 운영 안정감을 함께 보는 편이 좋습니다.",
                "이 조합은 특정 전개 강요보다 상황에 맞춰 선출 순서를 유연하게 잡는 편이 더 강합니다.",
                "밸런스 조합이라 한 턴 이득보다 교체 순서와 대면 관리가 더 중요합니다."
            ];
        }
        return [
            `전체 조합은 ${styleLabel} 성향이라 턴 교환과 전개 순서를 미리 정해 두면 강점이 더 잘 살아납니다.`,
            `${styleLabel} 흐름으로 굴릴 때 장점이 커서 턴 순서를 분명하게 잡는 편이 좋습니다.`,
            `이 조합은 ${styleLabel} 플랜을 기준으로 잡아야 각 카드 가치가 가장 잘 드러납니다.`
        ];
    }

    function chooseComboAnchors(combo) {
        const members = combo || [];
        if (members.length === 0) {
            return { leadAnchor: null, pivotAnchor: null, cleanupAnchor: null };
        }
        if (members.length < 3) {
            return {
                leadAnchor: members.slice().sort((left, right) => right.leadFit - left.leadFit)[0] || null,
                pivotAnchor: members.slice().sort((left, right) => right.pivotFit - left.pivotFit)[0] || null,
                cleanupAnchor: members.slice().sort((left, right) => right.cleanupFit - left.cleanupFit)[0] || null
            };
        }

        let best = null;
        members.forEach((leadAnchor, leadIndex) => {
            members.forEach((pivotAnchor, pivotIndex) => {
                if (pivotIndex === leadIndex) {
                    return;
                }
                members.forEach((cleanupAnchor, cleanupIndex) => {
                    if (cleanupIndex === leadIndex || cleanupIndex === pivotIndex) {
                        return;
                    }
                    const score = leadAnchor.leadFit + pivotAnchor.pivotFit + cleanupAnchor.cleanupFit;
                    if (!best || score > best.score) {
                        best = {
                            score,
                            leadAnchor,
                            pivotAnchor,
                            cleanupAnchor
                        };
                    }
                });
            });
        });

        return best || {
            leadAnchor: members[0] || null,
            pivotAnchor: members[1] || members[0] || null,
            cleanupAnchor: members[2] || members[0] || null
        };
    }

    function buildComboSummary(combo, opponents, teamIntent) {
        const { leadAnchor, pivotAnchor, cleanupAnchor } = chooseComboAnchors(combo);
        return buildComboSummaryBundle(combo, opponents, leadAnchor, pivotAnchor, cleanupAnchor, teamIntent);
    }

    function evaluateCombo(combo, opponents, teamIntent) {
        const { leadAnchor, pivotAnchor, cleanupAnchor } = chooseComboAnchors(combo);
        const summaryBundle = buildComboSummary(combo, opponents, teamIntent);

        return {
            combo,
            totalScore: combo.reduce((total, entry) => total + entry.totalScore, 0)
                + scoreRoleSpread(combo)
                + scoreCoverage(combo, opponents)
                + scoreSpeedLine(combo)
                + scorePlanBalance(combo)
                + scoreStrategyProfile(combo)
                + scoreIntentFit(combo, teamIntent)
                + scoreMegaUsage(combo),
            leadAnchor,
            pivotAnchor,
            cleanupAnchor,
            strategySummary: summarizeComboStrategies(combo),
            styleLabel: getComboStyleLabel(combo),
            teamIntentLabel: teamIntent ? teamIntent.label : "",
            summary: summaryBundle.summary,
            summaryDetails: summaryBundle.details,
            summaryChips: summaryBundle.chips
        };
    }

    function buildThreats(partyAnalyses, opponents) {
        return opponents
            .map((opponent) => {
                let reliableAnswers = 0;
                let dangerCount = 0;

                partyAnalyses.forEach((entry) => {
                    const matchup = entry.matchupByOpponent[opponent.name];
                    if (!matchup) {
                        return;
                    }
                    if (matchup.offenseMultiplier >= 2 || matchup.matchupScore >= 2.4) {
                        reliableAnswers += 1;
                    }
                    if (matchup.defenseMultiplier >= 2 && matchup.offenseMultiplier < 2) {
                        dangerCount += 1;
                    }
                });

                return {
                    opponent,
                    reliableAnswers,
                    dangerCount,
                    score: (dangerCount - reliableAnswers) * getMetaWeight(opponent)
                };
            })
            .filter((entry) => entry.reliableAnswers <= 1 || entry.dangerCount >= 3)
            .sort((left, right) => right.score - left.score)
            .slice(0, 4)
            .map((entry) => {
                let category = "운영 주의";
                const bestAnswers = getBestAnswersForOpponent(partyAnalyses, entry.opponent, 2);
                const safeAnswers = bestAnswers.filter((answer) => answer.matchup.defenseMultiplier <= 1);
                const speciesNotes = getSpeciesMetaNotes(entry.opponent);
                const sourceSignals = getSpeciesSourceSignals(entry.opponent);
                const reasonCandidates = [];

                if (entry.reliableAnswers === 0) {
                    category = "답 부족";
                } else if (entry.dangerCount >= 4) {
                    category = "교체 부담";
                }

                pushReasonCandidate(reasonCandidates, {
                    enabled: entry.reliableAnswers === 0,
                    score: 8.2,
                    category: "answer-gap",
                    seed: `${entry.opponent.name}:threat:none`,
                    chip: "명확한답 없음",
                    variants: [
                        "명확한 답이 적어 선출 단계에서 가장 강하게 의식해야 하는 축입니다.",
                        "현재 입력 기준으로는 가장 확실한 대응 수단이 부족한 상대입니다.",
                        "정면으로 풀기 까다로워 선출부터 우선적으로 경계해야 하는 카드입니다."
                    ]
                });
                pushReasonCandidate(reasonCandidates, {
                    enabled: entry.dangerCount >= 4,
                    score: 7.5,
                    category: "switch-risk",
                    seed: `${entry.opponent.name}:threat:danger`,
                    chip: `교체부담 ${entry.dangerCount}`,
                    variants: [
                        `내 파티 ${entry.dangerCount}마리 이상이 불리 대면을 만들 수 있어 교체 부담이 큽니다.`,
                        `받아낼 수 있는 카드가 제한돼 후속 교환 구도가 특히 불편한 상대입니다.`,
                        `여러 멤버가 압박을 받아 한 번 흐름을 넘기면 운영 난도가 크게 올라갑니다.`
                    ]
                });
                pushReasonCandidate(reasonCandidates, {
                    enabled: Boolean(speciesNotes && speciesNotes.threat && speciesNotes.threat.length > 0),
                    score: 7.95,
                    category: "meta-flavor",
                    seed: `${entry.opponent.name}:threat:meta`,
                    chip: speciesNotes ? speciesNotes.chip : "",
                    variants: speciesNotes ? speciesNotes.threat : []
                });
                pushReasonCandidate(reasonCandidates, {
                    enabled: Boolean(sourceSignals && sourceSignals.entry && sourceSignals.entry.length > 0),
                    score: 7.35,
                    category: "source-threat",
                    seed: `${entry.opponent.name}:threat:source`,
                    chip: sourceSignals ? sourceSignals.sourceChip : "",
                    variants: sourceSignals ? sourceSignals.entry : []
                });
                pushReasonCandidate(reasonCandidates, {
                    enabled: entry.reliableAnswers > 0 && bestAnswers.length > 0,
                    score: 6.6,
                    category: "best-answers",
                    seed: `${entry.opponent.name}:threat:answers`,
                    chip: `대응 ${entry.reliableAnswers}`,
                    variants: [
                        `${bestAnswers.map((answer) => answer.entry.species.koName).join(", ")} 정도가 비교적 확실한 대응 후보입니다.`,
                        `현재 기준으로는 ${bestAnswers.map((answer) => answer.entry.species.koName).join(", ")} 쪽이 가장 믿을 만한 답으로 남습니다.`,
                        `${bestAnswers.map((answer) => answer.entry.species.koName).join(", ")} 라인을 중심으로 대응 플랜을 미리 정해 두는 편이 좋습니다.`
                    ]
                });
                pushReasonCandidate(reasonCandidates, {
                    enabled: safeAnswers.length > 0,
                    score: 6.1,
                    category: "safe-answers",
                    seed: `${entry.opponent.name}:threat:safeanswers`,
                    chip: `안정교체 ${safeAnswers.length}`,
                    variants: [
                        `${safeAnswers.map((answer) => answer.entry.species.koName).join(", ")} 쪽은 받아낸 뒤 운영을 이어 갈 여지가 있습니다.`,
                        `${safeAnswers.map((answer) => answer.entry.species.koName).join(", ")} 정도는 교체 안정성까지 기대할 수 있습니다.`,
                        `완전한 정면 답은 아니어도 ${safeAnswers.map((answer) => answer.entry.species.koName).join(", ")} 라인은 운영으로 풀 여지가 남습니다.`
                    ]
                });
                pushReasonCandidate(reasonCandidates, {
                    enabled: Boolean(speciesNotes && speciesNotes.response && speciesNotes.response.length > 0 && bestAnswers.length > 0),
                    score: 6.95,
                    category: "meta-answer-style",
                    seed: `${entry.opponent.name}:threat:responsemeta`,
                    chip: `대응방향 ${entry.opponent.koName}`,
                    variants: speciesNotes ? speciesNotes.response : []
                });
                pushReasonCandidate(reasonCandidates, {
                    enabled: reasonCandidates.length === 0,
                    score: 3,
                    category: "default",
                    seed: `${entry.opponent.name}:threat:default`,
                    chip: category,
                    variants: [
                        "강한 압박을 받을 수 있어 선출 단계에서 의식해야 합니다.",
                        "대면 자체보다도 후속 운영이 꼬일 수 있어 주의가 필요합니다.",
                        "정면 상성 하나보다 교체 흐름 전체를 어렵게 만들 수 있는 상대입니다."
                    ]
                });

                const threatBundle = buildReasonBundle(`${entry.opponent.name}:threat`, reasonCandidates, 1, 2, 4);

                return {
                    name: entry.opponent.name,
                    koName: entry.opponent.koName,
                    category,
                    message: threatBundle.summary,
                    detailLines: threatBundle.details,
                    evidenceChips: threatBundle.chips
                };
            });
    }

    function getLikelyOpponentLeads(opponents) {
        return (opponents || [])
            .map((opponent) => buildOpponentSpeciesProfile(opponent))
            .sort((left, right) => right.leadScore - left.leadScore)
            .slice(0, 3);
    }

    function chooseLeadResponse(combo, opponent) {
        return (combo || [])
            .map((entry) => {
                const matchup = entry.matchupByOpponent[opponent.name];
                if (!matchup) {
                    return null;
                }
                const openerScore = matchup.matchupScore
                    + (entry.leadFit * 0.6)
                    + (matchup.speedResult && matchup.speedResult.myStat >= matchup.speedResult.enemyStat ? 0.9 : -0.25)
                    + (matchup.defenseMultiplier <= 1 ? 0.5 : 0)
                    + (matchup.offenseMultiplier >= 2 ? 0.75 : 0);
                return {
                    entry,
                    matchup,
                    openerScore
                };
            })
            .filter(Boolean)
            .sort((left, right) => right.openerScore - left.openerScore);
    }

    function summarizeCoreNames(core) {
        return (core || []).map((opponent) => opponent.koName).join(", ");
    }

    function getOpponentPressureProfile(partyAnalyses, opponent) {
        let reliableAnswers = 0;
        let dangerCount = 0;
        let bestMatchupScore = -99;

        (partyAnalyses || []).forEach((entry) => {
            const matchup = entry.matchupByOpponent[opponent.name];
            if (!matchup) {
                return;
            }
            if (matchup.offenseMultiplier >= 2 || matchup.matchupScore >= 2.4) {
                reliableAnswers += 1;
            }
            if (matchup.defenseMultiplier >= 2 && matchup.offenseMultiplier < 2) {
                dangerCount += 1;
            }
            bestMatchupScore = Math.max(bestMatchupScore, matchup.matchupScore);
        });

        return {
            reliableAnswers,
            dangerCount,
            bestMatchupScore
        };
    }

    function getOpponentCoreStyle(coreProfiles) {
        const fastCount = (coreProfiles || []).filter((entry) => entry.statProfile.speed >= 100).length;
        const bulkyCount = (coreProfiles || []).filter((entry) => entry.statProfile.bulk >= 300).length;
        const strongCount = (coreProfiles || []).filter((entry) => entry.statProfile.offense >= 115).length;
        const anchorCount = (coreProfiles || []).filter((entry) => entry.roleTags.includes("anchor")).length;

        if (fastCount >= 2 && strongCount >= 2) {
            return "하이템포 코어";
        }
        if (anchorCount >= 1 && bulkyCount >= 1) {
            return "에이스 밸런스";
        }
        if (bulkyCount >= 2 && strongCount >= 1) {
            return "벌크 밸런스";
        }
        if (fastCount >= 1 && bulkyCount >= 1 && strongCount >= 1) {
            return "표준 밸런스";
        }
        if (strongCount >= 2) {
            return "이중 압박";
        }
        return "유연 코어";
    }

    function scoreCoreWeaknessOverlap(coreProfiles) {
        return window.TYPE_CHART_DATA.allTypes.reduce((penalty, attackType) => {
            const hitMembers = (coreProfiles || []).filter((entry) => {
                return window.TypeModule.getTypeMultiplier(attackType, entry.opponent.types) > 1;
            }).length;
            if (hitMembers >= 3) {
                return penalty + 1.6;
            }
            if (hitMembers === 2) {
                return penalty + 0.45;
            }
            return penalty;
        }, 0);
    }

    function scoreCoreRoleBalance(coreProfiles) {
        const hasLead = (coreProfiles || []).some((entry) => entry.roleTags.includes("lead"));
        const hasBreaker = (coreProfiles || []).some((entry) => entry.roleTags.includes("breaker"));
        const hasPivot = (coreProfiles || []).some((entry) => entry.roleTags.includes("pivot"));
        const hasCleaner = (coreProfiles || []).some((entry) => entry.roleTags.includes("cleaner"));
        const hasAnchor = (coreProfiles || []).some((entry) => entry.roleTags.includes("anchor"));
        let score = 0;

        score += hasLead ? 1.1 : 0;
        score += hasBreaker ? 1.0 : 0;
        score += hasPivot ? 1.0 : 0;
        score += hasCleaner ? 0.8 : 0;
        score += hasAnchor ? 0.9 : 0;
        return score;
    }

    function scoreCoreTypeDiversity(coreProfiles) {
        const uniqueTypes = unique((coreProfiles || []).flatMap((entry) => entry.opponent.types || []));
        return uniqueTypes.length * 0.28;
    }

    function scoreComboAgainstOpponentCore(comboResult, core) {
        if (!comboResult || !comboResult.combo || !core || core.length === 0) {
            return -999;
        }

        const likelyLead = getLikelyOpponentLeads(core)[0] || null;
        let score = comboResult.totalScore * 0.15;

        core.forEach((opponent) => {
            let goodAnswers = 0;
            let safeSwitches = 0;
            let bestMatchup = -99;

            comboResult.combo.forEach((entry) => {
                const matchup = entry.matchupByOpponent[opponent.name];
                if (!matchup) {
                    return;
                }
                if (matchup.offenseMultiplier >= 2 || matchup.matchupScore >= 2.2) {
                    goodAnswers += 1;
                }
                if (matchup.defenseMultiplier <= 1) {
                    safeSwitches += 1;
                }
                bestMatchup = Math.max(bestMatchup, matchup.matchupScore);
            });

            score += bestMatchup * 1.15;
            score += goodAnswers >= 2 ? 1.6 : (goodAnswers === 1 ? 0.7 : -1.4);
            score += safeSwitches >= 2 ? 0.8 : (safeSwitches === 1 ? 0.25 : -0.4);
        });

        if (likelyLead && comboResult.leadAnchor) {
            const leadMatchup = comboResult.leadAnchor.matchupByOpponent[likelyLead.opponent.name];
            if (leadMatchup) {
                score += leadMatchup.matchupScore * 0.8;
                score += leadMatchup.speedResult && leadMatchup.speedResult.myStat >= leadMatchup.speedResult.enemyStat ? 0.7 : -0.2;
            }
        }

        return score;
    }

    function chooseBestComboForOpponentCore(comboCandidates, core) {
        return (comboCandidates || [])
            .map((candidate) => ({
                candidate,
                score: scoreComboAgainstOpponentCore(candidate, core)
            }))
            .sort((left, right) => right.score - left.score)[0] || null;
    }

    function buildOpponentCoreScenarios(opponents, partyAnalyses, comboCandidates) {
        const opponentProfiles = (opponents || []).map((opponent) => buildOpponentSpeciesProfile(opponent));
        const likelyLeads = opponentProfiles
            .slice()
            .sort((left, right) => right.leadScore - left.leadScore)
            .slice(0, 3);
        const likelyLeadNames = new Set(likelyLeads.map((entry) => entry.opponent.name));

        return combinations(opponentProfiles, 3)
            .map((coreProfiles) => {
                const core = coreProfiles.map((entry) => entry.opponent);
                const matchedCommunityCores = getMatchingCommunityMetaCores(core);
                const topCommunityCore = matchedCommunityCores[0] || null;
                const pressureScore = core.reduce((total, opponent) => {
                    const pressureProfile = getOpponentPressureProfile(partyAnalyses, opponent);
                    return total + (pressureProfile.dangerCount * 1.2) - (pressureProfile.reliableAnswers * 0.85) + (pressureProfile.bestMatchupScore < 1.2 ? 0.9 : 0);
                }, 0);
                const likelihoodScore = coreProfiles.reduce((total, profile) => total + profile.coreValue, 0)
                    + coreProfiles.reduce((total, profile) => total + ((getMetaWeight(profile.opponent) - 1) * 1.35), 0)
                    + matchedCommunityCores.reduce((total, profile) => total + profile.matchScore, 0)
                    + scoreCoreRoleBalance(coreProfiles)
                    + scoreCoreTypeDiversity(coreProfiles)
                    - scoreCoreWeaknessOverlap(coreProfiles);
                const styleLabel = getOpponentCoreStyle(coreProfiles);
                const likelyLeadBonus = core.some((opponent) => likelyLeadNames.has(opponent.name)) ? 1.1 : 0;
                const response = chooseBestComboForOpponentCore(comboCandidates, core);
                const leadCandidate = coreProfiles.slice().sort((left, right) => right.leadScore - left.leadScore)[0] || null;
                const pivotCandidate = coreProfiles.slice().sort((left, right) => right.coreValue - left.coreValue)[0] || null;
                const cleanerCandidate = coreProfiles.slice().sort((left, right) => {
                    const leftScore = (left.roleTags.includes("cleaner") ? 1.5 : 0) + left.statProfile.speed + left.statProfile.offense;
                    const rightScore = (right.roleTags.includes("cleaner") ? 1.5 : 0) + right.statProfile.speed + right.statProfile.offense;
                    return rightScore - leftScore;
                })[0] || null;
                const fastCount = coreProfiles.filter((entry) => entry.statProfile.speed >= 100).length;
                const bulkyCount = coreProfiles.filter((entry) => entry.statProfile.bulk >= 300).length;
                const overlapPenalty = scoreCoreWeaknessOverlap(coreProfiles);
                const coreSeed = core.map((entry) => entry.name).join("|");
                const coreReasonCandidates = [];
                const metaNames = coreProfiles.filter((entry) => getMetaProfile(entry.opponent)).map((entry) => entry.opponent.koName);

                pushReasonCandidate(coreReasonCandidates, {
                    enabled: Boolean(leadCandidate && pivotCandidate && cleanerCandidate),
                    score: 8,
                    category: "structure",
                    seed: `${coreSeed}:core:structure`,
                    chip: "역할분담",
                    variants: [
                        `${leadCandidate.opponent.koName}가 초반 템포를 잡고 ${pivotCandidate.opponent.koName}가 중반 버팀목 역할을 하며 ${cleanerCandidate.opponent.koName}가 후반 압박을 이어가기 좋은 구조입니다.`,
                        `${leadCandidate.opponent.koName} 선봉 전개 뒤 ${pivotCandidate.opponent.koName}가 교체 구도를 정리하고 ${cleanerCandidate.opponent.koName}가 마무리 압박을 이어가기 좋습니다.`,
                        `${leadCandidate.opponent.koName}, ${pivotCandidate.opponent.koName}, ${cleanerCandidate.opponent.koName} 순으로 역할 축이 나뉘어 실제 선출 그림이 분명합니다.`
                    ]
                });
                pushReasonCandidate(coreReasonCandidates, {
                    enabled: metaNames.length > 0,
                    score: 7.55,
                    category: "meta",
                    seed: `${coreSeed}:core:meta`,
                    chip: "메타상위 포함",
                    variants: [
                        `${metaNames.join(", ")}처럼 현재 메타에서 선출 빈도가 높은 카드가 포함돼 실제 채용 가능성을 높게 볼 만합니다.`,
                        `최근 사용률과 커뮤니티 의견을 보면 ${metaNames.join(", ")} 축은 실제 경기에서도 자주 보여 이 코어 가능성이 올라갑니다.`,
                        `${metaNames.join(", ")}가 들어 있어 단순 상성보다 실제 메타 빈도까지 고려하면 더 유력한 코어입니다.`
                    ]
                });
                pushReasonCandidate(coreReasonCandidates, {
                    enabled: Boolean(topCommunityCore),
                    score: 8.35,
                    category: "community-core",
                    seed: `${coreSeed}:core:community:${topCommunityCore ? topCommunityCore.id : ""}`,
                    chip: topCommunityCore ? topCommunityCore.sourceLabel : "",
                    variants: [
                        `${(topCommunityCore ? topCommunityCore.memberKoNames : []).join(", ")} 축은 ${topCommunityCore ? topCommunityCore.sourceLabel : "커뮤니티 메타"}에서 반복해서 언급되는 63싱글 빈출 코어라 실제 선출 가능성을 높게 볼 만합니다.`,
                        `${topCommunityCore ? topCommunityCore.sourceDetail : "커뮤니티 빈출 코어"}와 직접 겹치는 조합이라 단순 이론상 조합보다 실제 채용 가능성이 더 높습니다.`,
                        `${topCommunityCore ? topCommunityCore.sourceLabel : "커뮤니티"} 기준으로도 ${(topCommunityCore ? topCommunityCore.memberKoNames : []).join(", ")} 조합은 자주 보이는 축이라 유력 코어로 분류할 만합니다.`
                    ]
                });
                pushReasonCandidate(coreReasonCandidates, {
                    enabled: fastCount >= 2,
                    score: 7.2,
                    category: "fast",
                    seed: `${coreSeed}:core:fast`,
                    chip: `빠른축 ${fastCount}`,
                    variants: [
                        `빠른 축이 ${fastCount}마리라 상대 입장에서는 선봉 주도권을 노리기 쉬운 코어입니다.`,
                        `속도 우위 카드가 ${fastCount}마리라 템포 중심 선출로 이어질 가능성이 높습니다.`,
                        `빠른 카드 비중이 높아 먼저 흐름을 잡으려 할 때 가장 자연스러운 조합입니다.`
                    ]
                });
                pushReasonCandidate(coreReasonCandidates, {
                    enabled: fastCount < 2 && bulkyCount >= 2,
                    score: 7,
                    category: "bulky",
                    seed: `${coreSeed}:core:bulky`,
                    chip: `내구축 ${bulkyCount}`,
                    variants: [
                        `내구 축이 ${bulkyCount}마리라 교체를 반복하며 안정적으로 굴리기 좋은 조합입니다.`,
                        `버티는 카드가 ${bulkyCount}마리라 맞교환보다 운영으로 풀어 가기 좋은 코어입니다.`,
                        `내구 비중이 높아 한 번의 상성보다 반복 교체로 이득을 보는 식의 선출이 자연스럽습니다.`
                    ]
                });
                pushReasonCandidate(coreReasonCandidates, {
                    enabled: overlapPenalty <= 0.9,
                    score: 6.7,
                    category: "stable",
                    seed: `${coreSeed}:core:stable`,
                    chip: "약점분산",
                    variants: [
                        `세 마리 약점이 한 타입에 심하게 몰리지 않아 선출 안정성이 높습니다.`,
                        `상성 약점이 과하게 겹치지 않아 상대 입장에서도 무난하게 꺼내기 좋은 코어입니다.`,
                        `세 마리 타입 조합이 비교적 고르게 퍼져 있어 특정 견제 한 장에 무너지지 않습니다.`
                    ]
                });
                pushReasonCandidate(coreReasonCandidates, {
                    enabled: overlapPenalty > 0.9,
                    score: 5.6,
                    category: "overlap",
                    seed: `${coreSeed}:core:overlap`,
                    chip: `약점중복 ${overlapPenalty.toFixed(1)}`,
                    variants: [
                        `일부 약점 중복은 있지만 역할 분담이 뚜렷해 실제 선출 후보로 남기기 쉽습니다.`,
                        `약점이 조금 겹쳐도 각자 맡는 역할이 분명해 선출 가치가 유지됩니다.`,
                        `상성 리스크는 남지만 역할 분업이 좋아 실전 후보에서 빠질 가능성이 낮습니다.`
                    ]
                });
                const coreReasonBundle = buildReasonBundle(`${coreSeed}:core`, coreReasonCandidates, 2, 2, 4);
                const evidenceChips = [
                    leadCandidate ? `유력선봉 ${leadCandidate.opponent.koName}` : "",
                    coreProfiles.some((profile) => getMetaProfile(profile.opponent)) ? "메타상위 포함" : "",
                    topCommunityCore ? `${topCommunityCore.sourceLabel}` : "",
                    `빠른축 ${fastCount}`,
                    `내구축 ${bulkyCount}`,
                    `가능성 ${ (likelihoodScore + likelyLeadBonus).toFixed(1) }`
                ].filter(Boolean);
                let responseReason = "";
                let responseReasonDetails = [];
                let responseReasonChips = [];
                if (response && response.candidate && response.candidate.combo) {
                    const responseCandidates = core.slice(0, 3).map((opponent, index) => {
                        const bestAnswer = getBestAnswersForOpponent(response.candidate.combo, opponent, 1)[0];
                        if (!bestAnswer) {
                            return null;
                        }
                        const moveName = bestAnswer.matchup.bestMoveName ? `${bestAnswer.matchup.bestMoveName} 기준` : "대면 기준";
                        return {
                            enabled: true,
                            score: bestAnswer.answerScore + 3.5 - index,
                            category: `response-${index}`,
                            seed: `${response.candidate.combo.map((entry) => entry.species.name).join("|")}:${opponent.name}:response`,
                            chip: `${opponent.koName}-${bestAnswer.entry.species.koName}`,
                            variants: [
                                `${opponent.koName}에는 ${bestAnswer.entry.species.koName}가 ${moveName} 가장 안정적인 답입니다.`,
                                `${opponent.koName} 대면은 ${bestAnswer.entry.species.koName}가 ${moveName} 가장 무난하게 받아낼 수 있습니다.`,
                                `${opponent.koName} 상대로는 ${bestAnswer.entry.species.koName}가 ${moveName} 가장 자연스러운 대응축입니다.`
                            ]
                        };
                    }).filter(Boolean);
                    const responseBundle = buildReasonBundle(`${coreSeed}:response`, responseCandidates, 1, 2, 3);
                    responseReason = responseBundle.summary;
                    responseReasonDetails = responseBundle.details;
                    responseReasonChips = responseBundle.chips;
                }

                return {
                    core,
                    names: summarizeCoreNames(core),
                    styleLabel,
                    likelihoodScore: likelihoodScore + likelyLeadBonus,
                    pressureScore,
                    communityCoreLabel: topCommunityCore ? topCommunityCore.sourceLabel : "",
                    communityCoreNames: topCommunityCore ? topCommunityCore.memberKoNames : [],
                    communityCoreDetail: topCommunityCore ? topCommunityCore.sourceDetail : "",
                    predictedLead: leadCandidate ? leadCandidate.opponent.koName : "",
                    predictedPivot: pivotCandidate ? pivotCandidate.opponent.koName : "",
                    predictedCleanup: cleanerCandidate ? cleanerCandidate.opponent.koName : "",
                    reason: coreReasonBundle.summary,
                    reasonDetails: coreReasonBundle.details,
                    evidenceChips: unique(evidenceChips.concat(coreReasonBundle.chips).concat(responseReasonChips)).slice(0, 6),
                    response: response ? response.candidate : null,
                    responseScore: response ? response.score : -999,
                    responseReason,
                    responseReasonDetails
                };
            })
            .sort((left, right) => {
                if (right.likelihoodScore !== left.likelihoodScore) {
                    return right.likelihoodScore - left.likelihoodScore;
                }
                if (right.pressureScore !== left.pressureScore) {
                    return right.pressureScore - left.pressureScore;
                }
                return right.responseScore - left.responseScore;
            })
            .slice(0, 3);
    }

    function buildOverallSummary(lead, comboResult, threats, opponents, teamIntent) {
        const summary = [];
        const metaTargets = summarizeMetaOpponents(opponents, 2);
        const communityCores = summarizeCommunityMetaCores(opponents, 1);
        const notableOpponents = summarizeNotableOpponents(opponents, 2);
        const sourceBackedOpponents = summarizeSourceBackedOpponents(opponents, 2);

        if (teamIntent && teamIntent.summary) {
            summary.push(teamIntent.summary);
        }

        if (lead) {
            summary.push(`선봉은 ${lead.species.koName}처럼 초반 압박과 스피드 주도권을 함께 챙길 수 있는 카드부터 고려하는 편이 좋습니다.`);
        }
        if (comboResult) {
            summary.push(`${comboResult.combo.map((entry) => entry.species.koName).join(", ")} 조합은 역할 분담, 상성 커버, 후속 마무리 흐름이 가장 안정적으로 맞물립니다.`);
        }
        if (metaTargets.length > 0) {
            summary.push(`현재 메타에서 자주 보이는 ${metaTargets.join(", ")} 축까지 의식하면 이번 추천 조합 쪽이 비교적 안정적입니다.`);
        }
        if (notableOpponents.length > 0) {
            summary.push(`${notableOpponents.join(", ")}처럼 실제 체감상 까다로운 포켓몬까지 고려하면 운영 순서를 미리 정해 두는 편이 좋습니다.`);
        }
        if (sourceBackedOpponents.length > 0) {
            summary.push(`${sourceBackedOpponents.join(", ")} 쪽은 최근 샘플 파티와 사용 후기에서도 실제 선출 빈도가 높게 읽혀, 엔트리 추측에서 우선순위를 높게 두는 편이 맞습니다.`);
        }
        if (communityCores.length > 0) {
            summary.push(`${communityCores[0].label} 같은 ${communityCores[0].sourceLabel} 기준 빈출 코어와도 겹쳐 상대 선출 방향을 어느 정도 좁혀 볼 수 있습니다.`);
        }
        if (threats.length > 0) {
            summary.push(`특히 ${threats[0].koName} 대면은 교체 순서와 받아줄 포켓몬을 미리 정해 두는 편이 안전합니다.`);
        }

        return summary.join(" ");
    }

    function buildEntryForecasts(coreScenarios, likelyOpponentLeads) {
        const leadMap = new Map((likelyOpponentLeads || []).map((entry) => [entry.opponent.name, entry]));

        return (coreScenarios || []).slice(0, 3).map((scenario, index) => {
            const leadProfile = (scenario.core || [])
                .map((opponent) => leadMap.get(opponent.name))
                .filter(Boolean)
                .sort((left, right) => right.leadScore - left.leadScore)[0] || null;
            const leadName = scenario.predictedLead || (leadProfile ? leadProfile.opponent.koName : "");
            const reasonCandidates = [];

            pushReasonCandidate(reasonCandidates, {
                enabled: Boolean(scenario.communityCoreLabel && scenario.communityCoreNames && scenario.communityCoreNames.length > 0),
                score: 8.5,
                category: "community",
                seed: `${scenario.names}:forecast:community`,
                chip: scenario.communityCoreLabel || "",
                variants: [
                    `${scenario.communityCoreNames.join(", ")} 축이 ${scenario.communityCoreLabel}에서 반복해서 보이는 만큼 이 엔트리가 가장 자연스럽습니다.`,
                    `${scenario.communityCoreLabel} 기준 빈출 코어와 직접 겹쳐 실제 선출 후보로 가장 먼저 상정할 만합니다.`,
                    `${scenario.communityCoreLabel} 쪽 샘플과 맞물리는 구성이라 상대가 실제로 이 셋을 꺼낼 가능성을 높게 볼 수 있습니다.`
                ]
            });
            pushReasonCandidate(reasonCandidates, {
                enabled: Boolean(leadName),
                score: 8.1,
                category: "lead",
                seed: `${scenario.names}:forecast:lead`,
                chip: leadName ? `선봉 ${leadName}` : "",
                variants: [
                    `이 셋 중에서는 ${leadName}가 초반을 열 가능성이 가장 높아 보입니다.`,
                    `엔트리까지 가정하면 ${leadName} 선봉으로 시작하는 그림이 가장 자연스럽습니다.`,
                    `실제 출전 시에는 ${leadName}가 첫 카드로 나와 템포를 잡으려 할 가능성이 큽니다.`
                ]
            });
            pushReasonCandidate(reasonCandidates, {
                enabled: Boolean(scenario.predictedPivot && scenario.predictedCleanup && scenario.predictedPivot !== scenario.predictedCleanup),
                score: 7.6,
                category: "flow",
                seed: `${scenario.names}:forecast:flow`,
                chip: scenario.styleLabel || "엔트리 흐름",
                variants: [
                    `${scenario.predictedPivot}가 중반 완충을 맡고 ${scenario.predictedCleanup}가 후반 압박을 이어 가는 흐름이 가장 설득력 있습니다.`,
                    `${scenario.predictedPivot}로 교체전을 정리한 뒤 ${scenario.predictedCleanup} 쪽 마무리를 보는 엔트리로 읽히기 쉽습니다.`,
                    `${scenario.predictedPivot}와 ${scenario.predictedCleanup}가 뒤를 받치는 구조라 선출 흐름까지 비교적 선명합니다.`
                ]
            });
            pushReasonCandidate(reasonCandidates, {
                enabled: Boolean(scenario.reason),
                score: 7.1,
                category: "structure",
                seed: `${scenario.names}:forecast:structure`,
                chip: `가능성 ${scenario.likelihoodScore.toFixed(1)}`,
                variants: [
                    scenario.reason,
                    scenario.reason,
                    scenario.reason
                ]
            });

            const bundle = buildReasonBundle(`${scenario.names}:forecast`, reasonCandidates, 2, 2, 4);

            return {
                title: `유력 엔트리 ${index + 1}`,
                names: scenario.names,
                styleLabel: scenario.styleLabel || "",
                leadName,
                pivotName: scenario.predictedPivot || "",
                cleanupName: scenario.predictedCleanup || "",
                confidence: scenario.likelihoodScore,
                reason: bundle.summary,
                reasonDetails: bundle.details,
                evidenceChips: unique((scenario.evidenceChips || []).concat(bundle.chips)).slice(0, 5)
            };
        });
    }

    function getBestAnswersForOpponent(pool, opponent, limit) {
        return (pool || [])
            .map((entry) => {
                const matchup = entry.matchupByOpponent[opponent.name];
                if (!matchup) {
                    return null;
                }
                const answerScore = matchup.matchupScore
                    + (matchup.offenseMultiplier >= 2 ? 1.2 : 0)
                    + (matchup.defenseMultiplier <= 1 ? 0.8 : 0)
                    + (entry.pivotFit >= 6 ? 0.3 : 0);
                return {
                    entry,
                    matchup,
                    answerScore
                };
            })
            .filter(Boolean)
            .sort((left, right) => right.answerScore - left.answerScore)
            .slice(0, limit || 2);
    }

    function buildBattlePlan(lead, comboResult, threats, opponents, coreScenarios) {
        if (!lead || !comboResult || !comboResult.combo || comboResult.combo.length === 0) {
            return null;
        }

        const combo = comboResult.combo;
        const pivot = comboResult.pivotAnchor || combo[1] || combo[0];
        const cleanup = comboResult.cleanupAnchor || combo[2] || combo[0];
        const openingTargets = summarizeOpponentNames(lead.favorableOpponents, 2);
        const riskyLeadTargets = summarizeOpponentNames(lead.riskyOpponents, 2);
        const likelyOpponentLeads = getLikelyOpponentLeads(opponents);
        const entryForecasts = buildEntryForecasts(coreScenarios, likelyOpponentLeads);
        const coreResponses = (coreScenarios || []).slice(0, 3).map((scenario) => {
            const response = scenario.response;
            return {
                coreNames: scenario.names,
                styleLabel: scenario.styleLabel,
                reason: scenario.reason || "",
                reasonDetails: scenario.reasonDetails || [],
                evidenceChips: scenario.evidenceChips || [],
                responseCombo: response ? response.combo.map((entry) => entry.species.koName) : [],
                responseLead: response && response.leadAnchor ? response.leadAnchor.species.koName : "",
                responsePivot: response && response.pivotAnchor ? response.pivotAnchor.species.koName : "",
                responseCleanup: response && response.cleanupAnchor ? response.cleanupAnchor.species.koName : "",
                responseReason: scenario.responseReason || "",
                responseReasonDetails: scenario.responseReasonDetails || []
            };
        }).filter((entry) => entry.responseCombo.length > 0);
        const threatResponses = (threats || []).slice(0, 3).map((threat) => {
            const opponent = (opponents || []).find((entry) => entry.name === threat.name);
            if (!opponent) {
                return null;
            }

            const answers = getBestAnswersForOpponent(combo, opponent, 2);
            return {
                threat,
                answers: answers.map((answer) => ({
                    name: answer.entry.species.koName,
                    moveName: answer.matchup.bestMoveName || ""
                })),
                safeAnswers: answers.filter((answer) => answer.matchup.defenseMultiplier <= 1).map((answer) => ({
                    name: answer.entry.species.koName,
                    moveName: answer.matchup.bestMoveName || ""
                }))
            };
        }).filter(Boolean);
        const leadResponses = likelyOpponentLeads.map((candidate) => {
            const ranked = chooseLeadResponse(combo, candidate.opponent);
            const primary = ranked[0] || null;
            const backup = ranked[1] || null;

            return {
                opponentName: candidate.opponent.koName,
                opponentLabel: candidate.label,
                reason: candidate.reason || "",
                reasonDetails: candidate.reasonDetails || [],
                evidenceChips: candidate.evidenceChips || [],
                primary: primary ? (() => {
                    const reasonBundle = buildLeadResponseReasonBundle(candidate, primary, "primary");
                    return {
                        name: primary.entry.species.koName,
                        moveName: primary.matchup.bestMoveName || "",
                        reason: reasonBundle.summary,
                        reasonDetails: reasonBundle.details
                    };
                })() : null,
                backup: backup ? (() => {
                    const reasonBundle = buildLeadResponseReasonBundle(candidate, backup, "backup");
                    return {
                        name: backup.entry.species.koName,
                        moveName: backup.matchup.bestMoveName || "",
                        reason: reasonBundle.summary,
                        reasonDetails: reasonBundle.details
                    };
                })() : null
            };
        }).filter((entry) => entry.primary);

        const lines = [];
        lines.push(openingTargets
            ? pickVariant(`${lead.species.name}:plan:opening`, [
                `${lead.species.koName}로 먼저 압박을 시작하고 ${openingTargets} 쪽 대면을 우선 노리는 흐름이 좋습니다.`,
                `${openingTargets} 라인을 염두에 두고 ${lead.species.koName}부터 전개하는 쪽이 가장 자연스럽습니다.`,
                `${lead.species.koName} 선봉으로 시작해 ${openingTargets} 쪽에 우선 압박을 거는 그림이 좋습니다.`
            ])
            : pickVariant(`${lead.species.name}:plan:opening:default`, [
                `${lead.species.koName}로 먼저 정보를 확인하면서 초반 주도권을 잡는 전개가 무난합니다.`,
                `${lead.species.koName}부터 내고 상대 선봉 반응을 본 뒤 운영을 정리하는 쪽이 안전합니다.`,
                `${lead.species.koName} 선봉이 가장 무난하고 이후 운영 분기점도 만들기 쉽습니다.`
            ]));
        if (comboResult.styleLabel) {
            lines.push(pickVariant(`${comboResult.combo.map((entry) => entry.species.name).join("|")}:plan:style`, getBattlePlanStyleVariants(comboResult.styleLabel)));
        }
        lines.push(pickVariant(`${pivot.species.name}:${cleanup.species.name}:plan:midlate`, [
            `${pivot.species.koName}를 중반 축으로 두고 교체를 받아내며 판을 정리한 뒤 ${cleanup.species.koName}로 마무리 각을 보는 흐름이 가장 안정적입니다.`,
            `${pivot.species.koName}가 중반 교환을 정리하고 ${cleanup.species.koName}가 남은 판을 끝내는 구조가 가장 깔끔합니다.`,
            `중반은 ${pivot.species.koName}로 버티고 후반은 ${cleanup.species.koName} 결정력으로 정리하는 흐름이 좋습니다.`
        ]));
        if (riskyLeadTargets) {
            lines.push(pickVariant(`${pivot.species.name}:plan:risky`, [
                `${riskyLeadTargets} 상대로는 선봉 고집보다 ${pivot.species.koName} 쪽으로 운영 템포를 넘기는 편이 안전합니다.`,
                `${riskyLeadTargets} 대면은 정면 승부보다 ${pivot.species.koName}를 활용한 운영 전환이 더 안정적입니다.`,
                `${riskyLeadTargets} 쪽 압박이 보이면 ${pivot.species.koName}를 기준으로 흐름을 다시 잡는 편이 좋습니다.`
            ]));
        }

        return {
            opener: lead.species.koName,
            pivot: pivot.species.koName,
            cleanup: cleanup.species.koName,
            styleLabel: comboResult.styleLabel || "",
            strategySummary: comboResult.strategySummary || [],
            lines,
            entryForecasts,
            coreResponses,
            leadResponses,
            threatResponses
        };
    }

    function recommend(partyMembers, opponentNames) {
        const validPartyMembers = partyMembers.filter((member) => window.PokeData.getFormSpecies(member.name, member.form) || window.PokeData.getPokemonByName(member.name));
        const opponents = opponentNames.map((name) => window.PokeData.getPokemonByName(name)).filter(Boolean);

        if (validPartyMembers.length < 3) {
            return { error: "추천을 위해서는 유효한 내 파티가 최소 3마리 이상 필요합니다." };
        }
        if (opponents.length < 1) {
            return { error: "상대 포켓몬을 먼저 입력해 주세요." };
        }

        const analyses = validPartyMembers
            .map((member) => evaluateMember(member, opponents))
            .filter(Boolean)
            .sort((left, right) => right.totalScore - left.totalScore);
        const teamIntent = buildTeamIntentProfile(analyses);

        const validCombos = combinations(analyses, 3)
            .filter((combo) => countMegaCandidates(combo) <= 1);

        if (validCombos.length === 0) {
            return { error: "한 번의 배틀에서는 메가진화를 한 마리만 사용할 수 있어 메가 후보가 2마리 이상 겹치지 않는 추천 조합을 만들지 못했습니다." };
        }

        const comboCandidates = validCombos
            .map((combo) => evaluateCombo(combo, opponents, teamIntent))
            .sort((left, right) => right.totalScore - left.totalScore);

        const primaryCombo = comboCandidates[0] || null;
        const alternativeCombos = comboCandidates.slice(1, 3);
        const lead = chooseRecommendedLead(analyses, primaryCombo);
        const threats = buildThreats(analyses, opponents);
        const coreScenarios = buildOpponentCoreScenarios(opponents, analyses, comboCandidates);
        const battlePlan = buildBattlePlan(lead, primaryCombo, threats, opponents, coreScenarios);

        return {
            lead,
            primaryCombo,
            alternativeCombos,
            threats,
            coreScenarios,
            battlePlan,
            teamIntent,
            summary: buildOverallSummary(lead, primaryCombo, threats, opponents, teamIntent)
        };
    }

    window.RecommendModule = {
        recommend
    };
})();
