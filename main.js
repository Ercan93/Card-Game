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

/**
 * updateScorePanel(), score değeri
 * her değiştiğinde DOM'daki score
 * elementinin değerini günceller.
 */
function updateScorePanel() {
  $("#score").text(score);
}

/**
 * updateHealthPanel(), health değeri
 * her değiştiğinde DOM'daki health
 * elementinin değerini günceller.
 */
function updateHealthPanel() {
  $("#health").text(health);
}

/**
 * createRandomList() cardList'in
 * değerlerinin random şekilde hazırlar.
 */
function createRandomList() {
  for (let i = 0; i < 18; i++) {
    if (i % 2 == 0) cardValue = Math.floor(Math.random() * 10);
    assignCardValue(cardValue);
  }
}
/**
 * addCardsToPanel() kartları panele
 * grid düzenine göre dizer.
 */
function addCardsToPanel() {
  let rows = 3,
    columns = 6;
  cardPanel.style.setProperty("--grid-rows", rows);
  cardPanel.style.setProperty("--grid-cols", columns);

  for (c = 0; c < rows * columns; c++) {
    let card = document.createElement("div");
    cardPanel.appendChild(card).className = `card-item card-${c}`;

    //Kartların eşleşme durumunu kontrol etmek
    //için data-index-number attribute'u oluşturduk
    card.dataset.indexNumber = c;
  }
  createRandomList();
  updateHealthPanel();
  updateScorePanel();
}

addCardsToPanel();
