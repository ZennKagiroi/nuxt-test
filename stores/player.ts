// import { ref, computed } from 'vue';
import { defineStore } from 'pinia'

function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    let cloned = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            cloned[key] = deepClone(obj[key]);
        }
    }
    return cloned;
}

export const usePlayerStore = defineStore('player', () => {
    const localStorageKey = 'playerStore';

    const defaultLife = ref(20);
    // const initialSubCounters = {
    //     ATTACK: { value: 0, isVisible: false },
    //     VOLTAGE: { value: 0, isVisible: false },
    //     DEFENCE: { value: 0, isVisible: false },
    //     POISON: { value: 0, isVisible: false },
    //     COUNTER: { value: 0, isVisible: false },
    // };
    const initialSubCounters = [
        { name: 'ATTACK', value: 0, isVisible: false },
        { name: 'VOLTAGE', value: 0, isVisible: false },
        { name: 'DEFENCE', value: 0, isVisible: false },
        { name: 'POISON', value: 0, isVisible: false },
        { name: 'COUNTER', value: 0, isVisible: false },
    ];

  

    const subCounters = ref(deepClone(initialSubCounters));

    const loadSettings = () => {
        const savedSettings = localStorage.getItem(localStorageKey);
        if (savedSettings) {
            const { savedDefaultLife, savedSubCounters } = JSON.parse(savedSettings);
            defaultLife.value = savedDefaultLife;
            // 기존 subCounters와 저장된 subCounters를 병합
            for (const [key, newValue] of Object.entries(savedSubCounters)) {
                if (subCounters.value[key]) {
                    Object.assign(subCounters.value[key], newValue);
                } else {
                    subCounters.value[key] = newValue;
                }
            }
        }
    };

    const saveSettings = () => {
        const settings = {
            savedDefaultLife: defaultLife.value,
            savedSubCounters: subCounters.value,
        };
        localStorage.setItem(localStorageKey, JSON.stringify(settings));
    };

    const initialPlayerState = computed(() => {
        return subCounters.value
            .filter(counter => counter.isVisible)
            .reduce((acc, counter) => {
                acc[counter.name] = counter.value;
                return acc;
            }, {});
    });

    // const initialPlayerState = computed(() => {
    //     return Object.fromEntries(
    //         Object.entries(subCounters.value)
    //             .filter(([key, { isVisible }]) => isVisible)
    //             .map(([key, { value }]) => [key, value]),
    //     );
    // });

    const player1 = ref({});
    const player2 = ref({});

    const resetPlayers = () => {
        player1.value = {
            Life: defaultLife.value,
            ...initialPlayerState.value,
        };
        player2.value = {
            Life: defaultLife.value,
            ...initialPlayerState.value,
        };
    };

    const resetAllCounters = () => {
        defaultLife.value = 20;
        subCounters.value = { ...initialSubCounters };
        localStorage.removeItem(localStorageKey); // 로컬 스토리지 초기화
        resetPlayers(); // 플레이어 초기화
    };

    loadSettings(); // 페이지 로드 시 로컬 스토리지에서 값 불러오기
    resetPlayers(); // 초기화 시 호출

    const player1Life = ref(defaultLife.value);
    const player2Life = ref(defaultLife.value);
    const player1subCounters = ref(deepClone(initialSubCounters));
    const player2subCounters = ref(deepClone(initialSubCounters));

    const increment = (player, counterName) => {
        if (player[counterName] !== undefined) {
            player[counterName]++;
        }
    };

    const decrement = (player, counterName) => {
        if (player[counterName] !== undefined) {
            player[counterName]--;
        }
    };

    return {
        defaultLife,
        subCounters,
        player1,
        player2,
        player1Life,
        player2Life,
        player1subCounters,
        player2subCounters,
        increment,
        decrement,
        resetPlayers,
        saveSettings,
        resetAllCounters,
    };
});
