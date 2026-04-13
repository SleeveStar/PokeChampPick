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

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function isMegaSpecies(species) {
        return Boolean(species && String(species.name || "").includes("-mega"));
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

    function createReasonLine(species, member, analysis) {
        const reasonParts = [];
        const favorableNames = summarizeOpponentNames(analysis.favorableOpponents, 3);

        if (member.roles.includes("lead") || species.roles.includes("lead")) {
            reasonParts.push("초반 대면에서 바로 압박을 걸기 좋은 편입니다.");
        }

        if (analysis.fastCount >= 3) {
            reasonParts.push("상대 다수 상대로 스피드 주도권을 잡기 쉬운 축입니다.");
        }

        const favorableTypes = collectTargetTypes(analysis.favorableOpponents);
        if (favorableTypes.length > 0) {
            reasonParts.push(`${favorableTypes.join("/")} 축을 상대로 강하게 압박할 수 있습니다.`);
        }

        if (analysis.safeCount >= 4) {
            reasonParts.push("받아내는 상성도 나쁘지 않아 교체 대응이 비교적 안정적입니다.");
        }

        if (isMegaSpecies(species)) {
            reasonParts.push("메가 선택지라 화력과 상성 압박을 동시에 노리기 좋습니다.");
        }

        if (analysis.favorableOpponents.length >= 2 && favorableNames) {
            reasonParts.push(`${favorableNames} 같은 핵심 상대로 뚜렷한 역할이 있습니다.`);
        }

        if (reasonParts.length === 0) {
            reasonParts.push("특정 한 축보다는 전반적인 무난함으로 선출 가치를 만드는 카드입니다.");
        }

        return reasonParts.slice(0, 3).join(" ");
    }

    function evaluateMember(member, opponents) {
        const species = window.PokeData.getFormSpecies(member.name, member.form) || window.PokeData.getPokemonByName(member.name);

        if (!species) {
            return null;
        }

        const roles = normalizeMemberRoles(member, species);
        const analysis = {
            member,
            species,
            roles,
            totalScore: 0,
            leadScore: 0,
            fastCount: 0,
            safeCount: 0,
            favorableOpponents: [],
            matchupByOpponent: {}
        };

        opponents.forEach((opponent) => {
            const bestStabMultiplier = window.TypeModule.getBestStabMultiplier(species.types, opponent.types);
            const worstIncomingMultiplier = window.TypeModule.getWorstIncomingMultiplier(opponent.types, species.types);
            const speedResult = window.SpeedModule.compareSpeed(species, member, opponent);
            const matchupScore = getOffenseScore(bestStabMultiplier) + getDefenseScore(worstIncomingMultiplier) + getSpeedScore(speedResult);

            analysis.totalScore += matchupScore;
            analysis.leadScore += matchupScore;
            analysis.matchupByOpponent[opponent.name] = {
                offenseMultiplier: bestStabMultiplier,
                defenseMultiplier: worstIncomingMultiplier,
                speedResult,
                matchupScore
            };

            if (bestStabMultiplier >= 2 || matchupScore >= 2.6) {
                analysis.favorableOpponents.push(opponent);
            }

            if (speedResult.myStat >= speedResult.enemyStat) {
                analysis.fastCount += 1;
            }

            if (worstIncomingMultiplier <= 1) {
                analysis.safeCount += 1;
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
        if (isMegaSpecies(species)) {
            const megaBonus = analysis.favorableOpponents.length >= 2 ? 2.1 : 0.9;
            analysis.totalScore += megaBonus;
            analysis.leadScore += megaBonus * 0.35;
        }

        analysis.totalScore = clamp(analysis.totalScore, -18, 28);
        analysis.leadScore = clamp(analysis.leadScore, -14, 30);
        analysis.reason = createReasonLine(species, { roles }, analysis);
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
        const megaCandidates = combo.filter((entry) => isMegaSpecies(entry.species)).length;

        if (megaCandidates === 1) {
            return 0.9;
        }
        if (megaCandidates >= 2) {
            return -1.1;
        }
        return 0;
    }

    function buildComboSummary(combo, opponents) {
        const roleLabels = Array.from(new Set(combo.flatMap((entry) => entry.roles.map((role) => ROLE_LABELS[role] || role)))).slice(0, 3);
        const stableMembers = combo.filter((entry) => entry.safeCount >= 4).map((entry) => entry.species.koName);
        const fastMembers = combo.filter((entry) => entry.fastCount >= 3).map((entry) => entry.species.koName);
        const lines = [];

        if (roleLabels.length > 0) {
            lines.push(`${roleLabels.join(" / ")} 역할이 겹치지 않게 배치된 편입니다.`);
        }
        if (stableMembers.length > 0) {
            lines.push(`${stableMembers.slice(0, 2).join(", ")} 쪽이 안전하게 받아주기 쉽습니다.`);
        }
        if (fastMembers.length > 0) {
            lines.push(`${fastMembers.slice(0, 2).join(", ")} 쪽이 속도 라인을 잡아 주기 좋습니다.`);
        }

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

        if (pressureTargets.length > 0) {
            lines.push(`${pressureTargets.join("/")} 축 대응이 비교적 선명해 선출 단계에서 목적이 분명합니다.`);
        }

        if (answerPairs.length > 0) {
            lines.push(answerPairs.map((entry) => `${entry.opponent.koName}에는 ${entry.answers.map((answer) => answer.species.koName).join(", ")}`).join(" / ") + " 쪽을 맞춰 내기 좋습니다.");
        }

        const megaMember = combo.find((entry) => isMegaSpecies(entry.species));
        if (megaMember) {
            lines.push(`${megaMember.species.koName}를 메가 축으로 잡고 나머지가 교체와 마무리를 받쳐 주는 그림이 자연스럽습니다.`);
        }

        return lines.slice(0, 4).join(" ");
    }

    function evaluateCombo(combo, opponents) {
        return {
            combo,
            totalScore: combo.reduce((total, entry) => total + entry.totalScore, 0)
                + scoreRoleSpread(combo)
                + scoreCoverage(combo, opponents)
                + scoreSpeedLine(combo)
                + scoreMegaUsage(combo),
            summary: buildComboSummary(combo, opponents)
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
                let message = "강한 압박을 받을 수 있어 선출 단계에서 의식해야 합니다.";

                if (entry.reliableAnswers === 0) {
                    message = "명확한 답이 적어 선출 시 가장 조심해야 하는 축입니다.";
                } else if (entry.dangerCount >= 4) {
                    message = "내 파티 다수가 약점을 찔릴 수 있어 교환 부담이 큽니다.";
                }

                return {
                    name: entry.opponent.name,
                    koName: entry.opponent.koName,
                    message
                };
            });
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

        const lead = analyses
            .slice()
            .sort((left, right) => {
                if (right.leadScore !== left.leadScore) {
                    return right.leadScore - left.leadScore;
                }
                return right.totalScore - left.totalScore;
            })[0];

        const comboCandidates = combinations(analyses, 3)
            .map((combo) => evaluateCombo(combo, opponents))
            .sort((left, right) => right.totalScore - left.totalScore);

        const primaryCombo = comboCandidates[0] || null;
        const alternativeCombos = comboCandidates.slice(1, 3);
        const threats = buildThreats(analyses, opponents);

        return {
            lead,
            primaryCombo,
            alternativeCombos,
            threats,
            summary: buildOverallSummary(lead, primaryCombo, threats)
        };
    }

    window.RecommendModule = {
        recommend
    };
})();
