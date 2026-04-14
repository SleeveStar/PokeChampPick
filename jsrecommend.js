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

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function isMegaSpecies(species) {
        return Boolean(species && String(species.name || "").includes("-mega"));
    }

    function isMegaStoneItem(itemName) {
        return Boolean(String(itemName || "").trim().includes("나이트"));
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

        coreValue += statProfile.offense * 0.035;
        coreValue += statProfile.bulk * 0.016;
        coreValue += statProfile.speed * 0.018;
        coreValue += typeProfile.resistanceCount * 0.24;
        coreValue += typeProfile.immunityCount * 0.35;
        coreValue += roleTags.includes("anchor") ? 1.1 : 0;
        coreValue += roleTags.includes("breaker") ? 0.9 : 0;
        coreValue += roleTags.includes("pivot") ? 0.8 : 0;

        const evidenceChips = [
            `스피드 ${statProfile.speed}`,
            `최고화력 ${statProfile.offense}`,
            `내구합 ${statProfile.bulk}`,
            `반감 ${typeProfile.resistanceCount}`,
            typeProfile.immunityCount > 0 ? `무효 ${typeProfile.immunityCount}` : "",
            typeProfile.quadWeakCount > 0 ? `4배약점 ${typeProfile.quadWeakCount}` : ""
        ].filter(Boolean);

        const reasonCandidates = [];
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

    function buildComboSummaryBundle(combo, opponents, leadAnchor, pivotAnchor, cleanupAnchor) {
        const comboSeed = combo.map((entry) => entry.species.name).join("|");
        const reasonCandidates = [];
        const roleLabels = Array.from(new Set(combo.flatMap((entry) => entry.roles.map((role) => ROLE_LABELS[role] || role)))).slice(0, 3);
        const stableMembers = combo.filter((entry) => entry.safeCount >= 4).map((entry) => entry.species.koName);
        const fastMembers = combo.filter((entry) => entry.fastCount >= 3).map((entry) => entry.species.koName);
        const styleLabel = getComboStyleLabel(combo);
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
            variants: [
                `${styleLabel} 성향이 분명해 세 마리를 함께 냈을 때 운영 흐름이 잘 이어집니다.`,
                `전체적으로 ${styleLabel} 플랜이 뚜렷하게 보여 실전에서 굴리는 방식이 비교적 명확합니다.`,
                `${styleLabel} 쪽으로 중심이 잡혀 있어 각 카드의 쓰임새가 자연스럽게 연결됩니다.`
            ]
        });
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
        const analysis = {
            member,
            species,
            isMegaCandidate: megaCandidate,
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
            totalScore: 0,
            leadScore: 0,
            fastCount: 0,
            safeCount: 0,
            favorableOpponents: [],
            riskyOpponents: [],
            matchupByOpponent: {}
        };

        opponents.forEach((opponent) => {
            const bestMoveChoice = getBestMoveChoice(attackProfile, opponent.types, species.types, statProfile);
            const bestMoveMultiplier = bestMoveChoice.multiplier;
            const bestStabMultiplier = window.TypeModule.getBestStabMultiplier(species.types, opponent.types);
            const worstIncomingMultiplier = window.TypeModule.getWorstIncomingMultiplier(opponent.types, species.types);
            const speedResult = window.SpeedModule.compareSpeed(species, member, opponent);
            const coverageBonus = getCoverageBonus(bestMoveMultiplier, bestStabMultiplier, attackProfile);
            const matchupScore = bestMoveChoice.score + coverageBonus + getDefenseScore(worstIncomingMultiplier) + getSpeedScore(speedResult);

            analysis.totalScore += matchupScore;
            analysis.leadScore += matchupScore;
            analysis.matchupByOpponent[opponent.name] = {
                offenseMultiplier: bestMoveMultiplier,
                stabMultiplier: bestStabMultiplier,
                bestMoveName: bestMoveChoice.move ? bestMoveChoice.move.koName : "",
                bestMoveType: bestMoveChoice.move ? bestMoveChoice.move.type : "",
                bestMoveCategory: bestMoveChoice.category,
                defenseMultiplier: worstIncomingMultiplier,
                speedResult,
                coverageBonus,
                matchupScore
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
                score += 2.2;
            } else if (goodAnswers === 1) {
                score += 1.1;
            } else {
                score -= 1.9;
            }

            if (safeSwitches >= 2) {
                score += 0.8;
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

    function buildComboSummary(combo, opponents) {
        const leadAnchor = combo.slice().sort((left, right) => right.leadFit - left.leadFit)[0];
        const pivotAnchor = combo.slice().sort((left, right) => right.pivotFit - left.pivotFit)[0];
        const cleanupAnchor = combo.slice().sort((left, right) => right.cleanupFit - left.cleanupFit)[0];
        return buildComboSummaryBundle(combo, opponents, leadAnchor, pivotAnchor, cleanupAnchor);
    }

    function evaluateCombo(combo, opponents) {
        const leadAnchor = combo.slice().sort((left, right) => right.leadFit - left.leadFit)[0] || null;
        const pivotAnchor = combo.slice().sort((left, right) => right.pivotFit - left.pivotFit)[0] || null;
        const cleanupAnchor = combo.slice().sort((left, right) => right.cleanupFit - left.cleanupFit)[0] || null;
        const summaryBundle = buildComboSummary(combo, opponents);

        return {
            combo,
            totalScore: combo.reduce((total, entry) => total + entry.totalScore, 0)
                + scoreRoleSpread(combo)
                + scoreCoverage(combo, opponents)
                + scoreSpeedLine(combo)
                + scorePlanBalance(combo)
                + scoreStrategyProfile(combo)
                + scoreMegaUsage(combo),
            leadAnchor,
            pivotAnchor,
            cleanupAnchor,
            strategySummary: summarizeComboStrategies(combo),
            styleLabel: getComboStyleLabel(combo),
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
                    score: dangerCount - reliableAnswers
                };
            })
            .filter((entry) => entry.reliableAnswers <= 1 || entry.dangerCount >= 3)
            .sort((left, right) => right.score - left.score)
            .slice(0, 4)
            .map((entry) => {
                let category = "운영 주의";
                const bestAnswers = getBestAnswersForOpponent(partyAnalyses, entry.opponent, 2);
                const safeAnswers = bestAnswers.filter((answer) => answer.matchup.defenseMultiplier <= 1);
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
                const pressureScore = core.reduce((total, opponent) => {
                    const pressureProfile = getOpponentPressureProfile(partyAnalyses, opponent);
                    return total + (pressureProfile.dangerCount * 1.2) - (pressureProfile.reliableAnswers * 0.85) + (pressureProfile.bestMatchupScore < 1.2 ? 0.9 : 0);
                }, 0);
                const likelihoodScore = coreProfiles.reduce((total, profile) => total + profile.coreValue, 0)
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

    function buildOverallSummary(lead, comboResult, threats) {
        const summary = [];

        if (lead) {
            summary.push(`선봉은 ${lead.species.koName}처럼 초반 압박과 스피드 주도권을 함께 챙길 수 있는 카드부터 고려하는 편이 좋습니다.`);
        }
        if (comboResult) {
            summary.push(`${comboResult.combo.map((entry) => entry.species.koName).join(", ")} 조합은 역할 분담, 상성 커버, 후속 마무리 흐름이 가장 안정적으로 맞물립니다.`);
        }
        if (threats.length > 0) {
            summary.push(`특히 ${threats[0].koName} 대면은 교체 순서와 받아줄 포켓몬을 미리 정해 두는 편이 안전합니다.`);
        }

        return summary.join(" ");
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
            lines.push(pickVariant(`${comboResult.combo.map((entry) => entry.species.name).join("|")}:plan:style`, [
                `전체 조합은 ${comboResult.styleLabel} 성향이라 턴 교환과 전개 순서를 미리 정해 두면 강점이 더 잘 살아납니다.`,
                `${comboResult.styleLabel} 흐름으로 굴릴 때 장점이 커서 턴 순서를 분명하게 잡는 편이 좋습니다.`,
                `이 조합은 ${comboResult.styleLabel} 플랜을 기준으로 잡아야 각 카드 가치가 가장 잘 드러납니다.`
            ]));
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

        const validCombos = combinations(analyses, 3)
            .filter((combo) => countMegaCandidates(combo) <= 1);

        if (validCombos.length === 0) {
            return { error: "한 번의 배틀에서는 메가진화를 한 마리만 사용할 수 있어 메가 후보가 2마리 이상 겹치지 않는 추천 조합을 만들지 못했습니다." };
        }

        const comboCandidates = validCombos
            .map((combo) => evaluateCombo(combo, opponents))
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
            summary: buildOverallSummary(lead, primaryCombo, threats)
        };
    }

    window.RecommendModule = {
        recommend
    };
})();
