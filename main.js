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
 * cardList array'ine yeni kart değeri ekler.
 *  @param {String} cardValue - Kartın posterIndex'ni ifade eder.
 */
function assignCardValue(cardValue) {
  // cardsValueArr içindeki sıralardan random bir sıra alınır.
  let orderNum = Math.floor(Math.random() * cardsValueArr.length);

  //orderNum sırasının barındırğı panel sırası orderNum'a atılır.
  orderNum = cardsValueArr[orderNum];
  // cardList'te panel sırasına kartın değeri atılır.
  cardList[orderNum] = cardValue;

  /* panel sırası değeri cardValueArr dizisinden çıkarılır,
  böylelikle birr sıraya iki değer atanması önlenir.
  */
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
    // Her kartın bir eşi olduğundan dolayı kontrollü atama yapılır.
    if (i % 2 == 0) cardValue = Math.floor(Math.random() * 10);
    assignCardValue(cardValue);
  }
}

/**
 * Kartları panele grid düzenine göre dizer.
 */
function addCardsToPanel() {
  let rows = 3,
    columns = 6;
  // Kart panelinin satırlarını css'e atar.
  cardPanel.style.setProperty("--grid-rows", rows);
  // Kart panelinin sütunlarını css'e atar.
  cardPanel.style.setProperty("--grid-cols", columns);

  //Kartları oluşturup cardPanel elementinin içine yazar.
  for (c = 0; c < rows * columns; c++) {
    let card = document.createElement("div");
    cardPanel.appendChild(card).className = `card-item card-${c}`;

    //Kartların eşleşme durumunu kontrol etmek
    //için data-index-number attribute'u oluşturduk.
    card.dataset.indexNumber = c;
  }
  createRandomList();
  updateHealthPanel();
  updateScorePanel();
}

addCardsToPanel();

/**
 *  Seçilen kartın değerlerini element'in referans olduğu objeye atar.
 * @param {Object} element - Kart değerlerinin saklanacağı obje.
 * @param {String} element.className - Seçilen kartın class'ını saklar.
 * @param {String} element.value - Seçilen kartın posterIndex'ini saklar.
 * @param {String} className - Seçilen kartın tüm class'larını gösterir.
 * @param {String} posterIndex - Seçilen kartın isim index'i.
 */
function addSelectedCardData(element, className, posterIndex) {
  element.className = "." + className.split(" ")[1];
  element.value = posterIndex;
  // Seçilen kartın posterini div'in içinde gösterir.
  $(element.className).css(
    "background-image",
    `url('./assets/images/poster-${posterIndex}.jpg')`
  );
}
