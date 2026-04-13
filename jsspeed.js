(function () {
    "use strict";

    const NATURE_EFFECTS = {
        hardy: { up: "", down: "" },
        lonely: { up: "atk", down: "def" },
        brave: { up: "atk", down: "spe" },
        adamant: { up: "atk", down: "spa" },
        naughty: { up: "atk", down: "spd" },
        bold: { up: "def", down: "atk" },
        docile: { up: "", down: "" },
        relaxed: { up: "def", down: "spe" },
        impish: { up: "def", down: "spa" },
        lax: { up: "def", down: "spd" },
        timid: { up: "spe", down: "atk" },
        hasty: { up: "spe", down: "def" },
        serious: { up: "", down: "" },
        jolly: { up: "spe", down: "spa" },
        naive: { up: "spe", down: "spd" },
        modest: { up: "spa", down: "atk" },
        mild: { up: "spa", down: "def" },
        quiet: { up: "spa", down: "spe" },
        bashful: { up: "", down: "" },
        rash: { up: "spa", down: "spd" },
        calm: { up: "spd", down: "atk" },
        gentle: { up: "spd", down: "def" },
        sassy: { up: "spd", down: "spe" },
        careful: { up: "spd", down: "spa" },
        quirky: { up: "", down: "" }
    };

    const SPEED_NATURE_MODIFIERS = {
        timid: 1.1,
        hasty: 1.1,
        jolly: 1.1,
        naive: 1.1,
        brave: 0.9,
        relaxed: 0.9,
        quiet: 0.9,
        sassy: 0.9
    };

    function getSpeedNatureModifier(nature) {
        return SPEED_NATURE_MODIFIERS[String(nature || "").toLowerCase()] || 1;
    }

    function getNatureModifier(nature, statKey) {
        const effect = NATURE_EFFECTS[String(nature || "").toLowerCase()] || NATURE_EFFECTS.hardy;

        if (effect.up === statKey) {
            return 1.1;
        }

        if (effect.down === statKey) {
            return 0.9;
        }

        return 1;
    }

    function calculateHpStat(baseStat, config) {
        const level = Number(config.level || 50);
        const ivs = Number(config.ivs || 31);
        const points = Number(config.evs || 0);
        const base = Math.floor(((2 * baseStat + ivs) * level) / 100) + level + 10;
        return base + points;
    }

    function calculateOtherStat(baseStat, config, statKey) {
        const level = Number(config.level || 50);
        const ivs = Number(config.ivs || 31);
        const points = Number(config.evs || 0);
        const raw = Math.floor(((2 * baseStat + ivs) * level) / 100) + 5 + points;
        return Math.floor(raw * getNatureModifier(config.nature, statKey));
    }

    function calculateSpeedStat(baseSpeed, config) {
        return calculateOtherStat(baseSpeed, config, "spe");
    }

    function calculateLevel50Stats(baseStats, member) {
        const level = member.level || 50;
        const ivs = member.ivs || {};
        const evs = member.evs || {};
        const nature = member.nature || "hardy";

        return {
            hp: calculateHpStat(baseStats.hp, { level, ivs: ivs.hp || 31, evs: evs.hp || 0 }),
            atk: calculateOtherStat(baseStats.atk, { level, ivs: ivs.atk || 31, evs: evs.atk || 0, nature }, "atk"),
            def: calculateOtherStat(baseStats.def, { level, ivs: ivs.def || 31, evs: evs.def || 0, nature }, "def"),
            spa: calculateOtherStat(baseStats.spa, { level, ivs: ivs.spa || 31, evs: evs.spa || 0, nature }, "spa"),
            spd: calculateOtherStat(baseStats.spd, { level, ivs: ivs.spd || 31, evs: evs.spd || 0, nature }, "spd"),
            spe: calculateOtherStat(baseStats.spe, { level, ivs: ivs.spe || 31, evs: evs.spe || 0, nature }, "spe")
        };
    }

    function buildPartySpeedConfig(member) {
        return {
            nature: member.nature || "hardy",
            evs: member.evs && typeof member.evs.spe === "number" ? member.evs.spe : 0,
            ivs: member.ivs && typeof member.ivs.spe === "number" ? member.ivs.spe : 31,
            level: member.level || 50
        };
    }

    function estimateOpponentConfig(pokemon) {
        if (pokemon && pokemon.speedPreset) {
            return {
                nature: pokemon.speedPreset.nature,
                evs: pokemon.speedPreset.evs,
                ivs: pokemon.speedPreset.ivs,
                level: pokemon.speedPreset.level
            };
        }

        const baseSpeed = pokemon ? pokemon.baseStats.spe : 80;

        if (baseSpeed >= 110) {
            return { nature: "timid", evs: 32, ivs: 31, level: 50 };
        }

        if (baseSpeed >= 90) {
            return { nature: "jolly", evs: 32, ivs: 31, level: 50 };
        }

        if (baseSpeed >= 70) {
            return { nature: "hardy", evs: 32, ivs: 31, level: 50 };
        }

        return { nature: "hardy", evs: 0, ivs: 31, level: 50 };
    }

    function compareSpeed(myPokemon, myMemberConfig, enemyPokemon, enemyConfig) {
        const myStat = calculateSpeedStat(myPokemon.baseStats.spe, buildPartySpeedConfig(myMemberConfig));
        const resolvedEnemyConfig = enemyConfig || estimateOpponentConfig(enemyPokemon);
        const enemyStat = calculateSpeedStat(enemyPokemon.baseStats.spe, resolvedEnemyConfig);
        let verdict = "동속";

        if (myStat > enemyStat) {
            verdict = `${myPokemon.koName} 우세`;
        } else if (enemyStat > myStat) {
            verdict = `${enemyPokemon.koName} 우세`;
        }

        return {
            myStat,
            enemyStat,
            verdict,
            enemyConfig: resolvedEnemyConfig
        };
    }

    window.SpeedModule = {
        NATURE_EFFECTS,
        SPEED_NATURE_MODIFIERS,
        calculateHpStat,
        calculateOtherStat,
        calculateSpeedStat,
        calculateLevel50Stats,
        buildPartySpeedConfig,
        estimateOpponentConfig,
        compareSpeed,
        getSpeedNatureModifier,
        getNatureModifier
    };
})();
