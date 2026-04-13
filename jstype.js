(function () {
    "use strict";

    const TYPE_LABELS = {
        normal: "노말",
        fire: "불꽃",
        water: "물",
        electric: "전기",
        grass: "풀",
        ice: "얼음",
        fighting: "격투",
        poison: "독",
        ground: "땅",
        flying: "비행",
        psychic: "에스퍼",
        bug: "벌레",
        rock: "바위",
        ghost: "고스트",
        dragon: "드래곤",
        dark: "악",
        steel: "강철",
        fairy: "페어리"
    };

    function getTypeMultiplier(attackType, defenseTypes) {
        return defenseTypes.reduce((total, defenseType) => {
            const multiplier = window.TYPE_CHART_DATA.chart[attackType] && window.TYPE_CHART_DATA.chart[attackType][defenseType];
            return total * (multiplier == null ? 1 : multiplier);
        }, 1);
    }

    function getBestStabMultiplier(attackingTypes, defenseTypes) {
        return attackingTypes.reduce((best, attackType) => Math.max(best, getTypeMultiplier(attackType, defenseTypes)), 0);
    }

    function getWorstIncomingMultiplier(attackingTypes, defenseTypes) {
        return attackingTypes.reduce((worst, attackType) => Math.max(worst, getTypeMultiplier(attackType, defenseTypes)), 0);
    }

    function getDefenseSummary(defenseTypes) {
        const result = {
            weaknesses: [],
            resistances: [],
            immunities: []
        };

        window.TYPE_CHART_DATA.allTypes.forEach((attackType) => {
            const multiplier = getTypeMultiplier(attackType, defenseTypes);

            if (multiplier === 0) {
                result.immunities.push(attackType);
            } else if (multiplier > 1) {
                result.weaknesses.push({ type: attackType, multiplier });
            } else if (multiplier < 1) {
                result.resistances.push({ type: attackType, multiplier });
            }
        });

        result.weaknesses.sort((left, right) => right.multiplier - left.multiplier);
        result.resistances.sort((left, right) => left.multiplier - right.multiplier);
        return result;
    }

    function toTypeLabel(type) {
        return TYPE_LABELS[type] || type;
    }

    function toTypeLabels(types) {
        return (types || []).map(toTypeLabel);
    }

    window.TypeModule = {
        TYPE_LABELS,
        getTypeMultiplier,
        getBestStabMultiplier,
        getWorstIncomingMultiplier,
        getDefenseSummary,
        toTypeLabel,
        toTypeLabels
    };
})();
