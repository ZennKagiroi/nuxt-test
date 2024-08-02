import { defineStore } from 'pinia';

export const useSelectedCardList = defineStore({
    id: 'selectedCardList',
    state: () => ({
        selectedSeriesValue: '',
        selectedSeriesName: '',
        selectedColor: '',
        useParallel: false,
        useActionPoint: false,
        triggerType: '',
        cardList: [],
        selectedCards: [],
        deckName: '', // 추가: 덱 이름을 저장할 데이터 속성
        viewCardTotalCount: '' //
    }),
    getters: {
        // computed 속성을 정의합니다.
        filteredSelectedCards() {
            return this.cardList.filter(card => card.count > 0);
        },
    },
    actions: {
        updateViewCardTotalCount(value) {
            this.viewCardTotalCount = value
        },
        async updateCardList(selectedValue) {
            try {
                // 선택된 값에 따라 데이터 파일을 동적으로 가져오는 로직을 작성합니다.
                const module = await import(`@/datas/${selectedValue}.js`);
                this.cardList = module.default;
            } catch (error) {
                console.error(error);
            }
        },
        // incrementCount 메서드 정의
        incrementCount(card) {
            if (card.Number.includes('GMR-1-023')) {
                if (card.count < 12) {
                    card.count++;
                }
            } else {
                if (card.count < 4) {
                    card.count++;
                }
            }
        },
    
        // incrementCount(card) {
        //     if (card.count < 4) {
        //         card.count++;
        //     }
        // },
        // decrementCount 메서드 정의
        decrementCount(card) {
            if (card.count > 0) {
                card.count--;
            }
        },
        setSeriesValue(value) {
            this.selectedSeriesValue = value;
        },
        setSeriesName(series) {
            this.selectedSeriesName = series;
        },
        setDeckName(deckName) {
            this.deckName = deckName;
        },
        setCardList(newCardList) {
            if (Array.isArray(newCardList)) {
                // 이미 존재하는 카드를 imgSrc를 키로 사용하여 빠르게 찾을 수 있도록 맵을 생성합니다
                const cardMap = new Map(this.cardList.map(card => [card.imgSrc, card]));

                // 새로운 카드 목록을 반복하면서 기존 카드를 업데이트합니다
                newCardList.forEach(newCard => {
                    const existingCard = cardMap.get(newCard.imgSrc);
                    if (existingCard) {
                        if (newCard.count !== 0) {
                            // count가 0이 아닌 경우에만 해당 카드의 count와 key 값을 업데이트합니다
                            existingCard.count = newCard.count;
                            existingCard.key = newCard.key;
                        }
                    }
                });

                this.cardList = [...this.cardList]; // Vue 3의 반응성을 트리거하기 위해 배열을 복제합니다
            } else {
                console.error('cardList의 데이터 형식이 올바르지 않습니다. 배열을 예상했습니다.');
            }
        },
        setSelectedColor(color) {
            this.selectedColor = color;
        },
        setUseParallel(value) {
            this.useParallel = value;
        },
        setUseActionPoint(value) {
            this.useActionPoint = value;
        },
    },
});
