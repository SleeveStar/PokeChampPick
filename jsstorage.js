(function () {
    "use strict";

    const STORAGE_KEY = "champions-party-v1";
    const PARTY_COUNT = 3;

    function createDefaultParty(index) {
        return {
            partyName: `${index + 1}파티`,
            members: []
        };
    }

    function createDefaultPayload() {
        return {
            activePartyIndex: 0,
            parties: Array.from({ length: PARTY_COUNT }, (_, index) => createDefaultParty(index))
        };
    }

    function normalizePayload(value) {
        const payload = createDefaultPayload();
        if (!value || typeof value !== "object") {
            return payload;
        }

        if (Array.isArray(value.parties)) {
            payload.activePartyIndex = Math.max(0, Math.min(PARTY_COUNT - 1, Number(value.activePartyIndex) || 0));
            value.parties.slice(0, PARTY_COUNT).forEach((party, index) => {
                payload.parties[index] = {
                    partyName: party && party.partyName ? party.partyName : `${index + 1}파티`,
                    members: party && Array.isArray(party.members) ? party.members : []
                };
            });
            return payload;
        }

        if (Array.isArray(value.members) || value.partyName) {
            payload.parties[0] = {
                partyName: value.partyName || "1파티",
                members: Array.isArray(value.members) ? value.members : []
            };
            return payload;
        }

        return payload;
    }

    function saveParty(payload) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizePayload(payload)));
            return { ok: true };
        } catch (error) {
            return { ok: false, error: error.message };
        }
    }

    function loadParty() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);

            if (!raw) {
                return { ok: true, value: createDefaultPayload() };
            }

            return { ok: true, value: normalizePayload(JSON.parse(raw)) };
        } catch (error) {
            return { ok: false, value: createDefaultPayload(), error: error.message };
        }
    }

    function clearParty() {
        try {
            localStorage.removeItem(STORAGE_KEY);
            return { ok: true };
        } catch (error) {
            return { ok: false, error: error.message };
        }
    }

    window.StorageModule = {
        STORAGE_KEY,
        PARTY_COUNT,
        createDefaultPayload,
        normalizePayload,
        saveParty,
        loadParty,
        clearParty
    };
})();
