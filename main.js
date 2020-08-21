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
  health = 50,
  level = 1;

/**
 * Panelin sıra değerlerini random alabilmek için
 * cardsValueArr dizisine panelin sıra değerlerini
 * atadık.
 */
function createCardValueArr() {
  for (let a = 0; a < 18; a++) {
    cardsValueArr[a] = a;
  }
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
 * updateLevelPanel(), level değeri
 * her değiştiğinde DOM'daki level
 * elementinin değerini günceller.
 */
function updateLevelPanel() {
  $("#level").text(level);
}

/**
 * createRandomList() cardList'in
 * değerlerinin random şekilde hazırlar.
 */
function createRandomList() {
  for (let i = 0; i < 18; i++) {
    // Her kartın bir eşi olduğundan dolayı kontrollü atama yapılır.
    if (i % 2 == 0) cardValue = Math.floor(Math.random() * 17);
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

  // Müziğin sesini ayarlar
  $("#music").prop("volume", 0.4);

  createCardValueArr();
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
  updateLevelPanel();
}
// Paneli oluşturan fonksiyonun çağırılması
addCardsToPanel();

/**
 *  Seçilen kartın değerlerini element'in referans olduğu objeye atar.
 * @param {Object} element - Kart değerlerinin saklanacağı obje.
 * @param {String} element.className - Seçilen kartın class'ını saklar.
 * @param {String} element.value - Seçilen kartın posterIndex'ini saklar.
 * @param {String} className - Seçilen kartın class'ını ifade eder.
 * @param {String} posterIndex - Seçilen kartın isim index'i.
 */
function addSelectedCardData(element, className, posterIndex) {
  element.className = className;
  element.value = posterIndex;
  // Seçilen kartın posterini div'in içinde gösterir.
  $(element.className).css(
    "background-image",
    `url('./assets/images/poster-${posterIndex}.jpg')`
  );
}

/**
 * Seçilen kartların değerlerini saklayan objeleri sıfırlar.
 * @param {Array} selectedArr - Seçilmiş iki kartın objelerini ifade eder.
 * @param {Ojbect} element - Seçilmiş kartın değerlerini saklayan objeyi referans eder.
 * @param {String} element.className - Seçilmiş kartın class'nı ifade eder.
 * @param {String} element.value - Seçilmiş kartın posterIndex'ini ifade eder.
 */
function resetSelectedCardsData(selectedArr) {
  selectedArr.forEach((element) => {
    element.className = null;
    element.value = null;
  });
}

/**
 * Hatalı eşleşen kartları eski haline çevirme ve health değerini azaltma.
 * @param {Array} selectedArr - Seçilmiş iki kartın objelerini ifade eder.
 * @param {Ojbect} element - Seçilmiş kartın değerlerini saklayan objeyi referans eder.
 * @param {String} element.className - Seçilmiş kartın class'nı ifade eder.
 */
function coverUnmatchedCards(selectedArr) {
  // Hatalı eşleme olduğundan dolayı health değeri azaltma.
  health -= 1;

  selectedArr.forEach((element) => {
    $(element.className).css(
      "background-image",
      "url('./assets/images/cardCover.jpg')"
    );
  });
  // health değeri 0 olduğunda sonuç ekranını gösterir.
  if (health == 0) {
    $("#result-panel").css("visibility", "visible");
    $("#result").text(score);
  }
  updateHealthPanel();
  resetSelectedCardsData(selectedArr);
}

/**
 * Kartların panele yeniden dizen fonksiyon
 */
function orderNewLevelCards() {
  $(".card-item").css({
    "background-image": "url('./assets/images/cardCover.jpg')",
    visibility: "visible",
  });
  createCardValueArr();
  createRandomList();
}

/**
 * Doğru eşleşen kartları panel üzerinde gizleme ve score değerini atırma.
 * @param {Array} selectedArr - Seçilmiş iki kartın objelerini ifade eder.
 * @param {Ojbect} element - Seçilmiş kartın değerlerini saklayan objeyi referans eder.
 * @param {String} element.className - Seçilmiş kartın class'nı ifade eder.
 */
function hideMatchedCards(selectedArr) {
  // Doğru eşleşme olduğundan dolayı score değerini artırma.
  score += 1;
  selectedArr.forEach((element) => {
    $(element.className).css("visibility", "hidden");
  });
  updateScorePanel();
  resetSelectedCardsData(selectedArr);
  if (score != 0 && score % 9 == 0) {
    level += 1;
    updateLevelPanel();
    orderNewLevelCards();
  }
}

/**
 * Sonuç ekranında yeni oyun başlatma fonksiyonu
 */
$("#new-game-btn").click(function () {
  score = 0;
  level = 1;
  health = 50;
  updateHealthPanel();
  updateScorePanel();
  updateLevelPanel();

  orderNewLevelCards();
  $("#result-panel").css("visibility", "hidden");
});

/**
 * Paneldeki herhangi bir karta
 * tıklandığında çalışan fonksiyon.
 */
$(".card-item").click(function () {
  // Seçilen kartın özel class'ının alınması
  let cardClass = "." + $(this).attr("class").split(" ")[1];

  // Seçilen kartın data-index-number attribute'nın değerinin alınması
  let selectedIndex = $(this).data("index-number");

  // İlk kartın seçilmesi durumu
  if (selectedCard.value == null) {
    addSelectedCardData(selectedCard, cardClass, cardList[selectedIndex]);
  } else {
    // Aynı karta iki kere tıklandığında eşleşmeyi önleme
    if (selectedCard.className != cardClass) {
      addSelectedCardData(
        selectedSecondCard,
        cardClass,
        cardList[selectedIndex]
      );
    }
    //Seçilen iki kartın değerlerinin eşleşmesi
    if (selectedCard.value == selectedSecondCard.value) {
      setTimeout(() => {
        hideMatchedCards([selectedCard, selectedSecondCard]);
      }, 500);
    } else {
      //Seçilen iki kartın değerlerinin eşleşmemesi
      setTimeout(() => {
        coverUnmatchedCards([selectedCard, selectedSecondCard]);
      }, 500);
    }
  }
});
