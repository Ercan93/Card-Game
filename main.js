const cardPanel = document.getElementById("card-panel");

//Kartları, kart paneline grid düzenine göre yerleştiren IIFE fonksiyonu
(function () {
  let rows = 3,
    columns = 5;
  cardPanel.style.setProperty("--grid-rows", rows);
  cardPanel.style.setProperty("--grid-cols", columns);
  for (c = 0; c < rows * columns; c++) {
    let card = document.createElement("div");
    cardPanel.appendChild(card).className = "card-item";
  }
})();
