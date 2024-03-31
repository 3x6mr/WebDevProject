import { getProducts } from "./module.js";

async function displayProducts() {
  const sectionType = localStorage.getItem("section");
  const container = document.querySelector(".container");

  try {
    const products = await getProducts();
    console.log(products);

    products
      .filter((product) => product.section === sectionType)
      .forEach(function (product) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
          <img src="../images/${product.img}" alt="${product.name}">
          <div class="info">
            <div class="name">Name: ${product.name}</div>
            <div class="price">Price: ${product.price}$</div>
          </div>`;
        container.appendChild(card);
      });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

displayProducts();

// const searchInput = document.getElementById("searchInput").value.toLowerCase();
// fetch("../javascript/db.json")
//   .then((response) => response.json())
//   .then((data) => {
//     const filteredItems = data.products.filter((item) =>
//       item.name.toLowerCase().includes(searchInput)
//     );
//     if (filteredItems.length === 0) {
//       displayNotFoundMessage();
//     } else {
//       displayItems(filteredItems);
//     }
//   })
//   .catch((error) => console.error("Error fetching items:", error));
// document.addEventListener("DOMContentLoad", function () {});

// function displayItems(items) {
//   const itemsContainer = document.getElementById("itemsContainer");
//   itemsContainer.innerHTML = "";
//   items.forEach((item) => {
//     const itemElement = document.createElement("div");
//     itemElement.classList.add("item");
//     itemElement.innerHTML = `
//         <h2>${item.name}</h2>
//         <p>Owner: ${item.owner}</p>
//         <p>${item.description}</p>
//         <img src="${item.img}" alt="${item.name}">
//         <p>Price: $${item.price}</p>
//         <p>Quantity: ${item.quantity}</p>
//         <p>Section: ${item.section}</p>
//       `;
//     itemsContainer.appendChild(itemElement);
//   });
// }

// function displayNotFoundMessage() {
//   const itemsContainer = document.getElementById("itemsContainer");
//   itemsContainer.innerHTML = "<p>Bike not found</p>";
// }
