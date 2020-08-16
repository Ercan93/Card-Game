const cardPanel = document.getElementById("card-panel");
let selectedCard = {
    className: null,
    value: null,
  },
  selectedSecondCard = {
    className: null,
    value: null,
  };
let cardValue = null,
  cardsValueArr = [...Array(18)],
  cardList = [...Array(18)],
  score = 0,
  health = 50;

/**
 * Panelin sıra değerlerini random alabilmek için
 * cardsValueArr dizisine panelin sıra değerlerini
 * atadık.
 */
for (let a = 0; a < 18; a++) {
  cardsValueArr[a] = a;
}

/**
 * assignCardValue() random değerler ile hazırlanan
 * cardList array'ine yeni kart değeri ekler
 */
function assignCardValue(cardValue) {
  let orderNum = Math.floor(Math.random() * cardsValueArr.length);

  orderNum = cardsValueArr[orderNum];
  cardList[orderNum] = cardValue;

  let index = cardsValueArr.indexOf(orderNum);
  cardsValueArr.splice(index, 1);
}
