function searchItems() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  fetch("../javascript/db.json")
    .then((response) => response.json())
    .then((data) => {
      const filteredItems = data.products.filter((item) =>
        item.name.toLowerCase().includes(searchInput)
      );
      if (filteredItems.length === 0) {
        displayNotFoundMessage();
      } else {
        displayItems(filteredItems);
      }
    })
    .catch((error) => console.error("Error fetching items:", error));
}

function displayItems(items) {
  const itemsContainer = document.getElementById("itemsContainer");
  itemsContainer.innerHTML = "";
  items.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("item");
    itemElement.innerHTML = `
        <h2>${item.name}</h2>
        <p>Owner: ${item.owner}</p>
        <p>${item.description}</p>
        <img src="${item.img}" alt="${item.name}">
        <p>Price: $${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Section: ${item.section}</p>
      `;
    itemsContainer.appendChild(itemElement);
  });
}

function displayNotFoundMessage() {
  const itemsContainer = document.getElementById("itemsContainer");
  itemsContainer.innerHTML = "<p>Bike not found</p>";
}

// Initially display all items
searchItems();
