import { getProducts } from "./module.js";

document.addEventListener("DOMContentLoaded", async () => {
  const sectionType = localStorage.getItem("section");

  try {
    const container = document.querySelector(".container");
    const foundItem = document.querySelector(".found-item");
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
        const buyBtn = document.createElement("button");
        buyBtn.classList.add("buy-btn");
        buyBtn.innerHTML = "BUY";
        card.appendChild(buyBtn);
        container.appendChild(card);

        buyBtn.addEventListener("click", function (e) {
          e.preventDefault();
          localStorage.setItem("product", JSON.stringify(product));
          window.location.href = "checkout.html";
        });
      });
    const searchIcon = document.querySelector(".icon-tabler-search");
    searchIcon.addEventListener("click", () => {
      const searchInput = document.getElementById("searchInput").value.trim();
      const filteredItems = products.filter((product) => {
        return product.name.toLowerCase().includes(searchInput.toLowerCase());
      });
      if (searchInput === "") {
        alert("Please enter something");
      } else {
        console.log(filteredItems);
        foundItem.replaceChildren();
        // console.log(filteredItems);
        if (filteredItems.length === 0) {
          displayNotFoundMessage();
        } else {
          filteredItems.forEach((i) => {
            const item = document.createElement("div");
            item.classList.add("item");
            item.innerHTML = `
              <img src="../images/${i.img}" alt="${i.name}">
              <div class="info">
                <div class="name">Name: ${i.name}</div>
                <div class="price">Price: ${i.price}$</div>
              </div>`;
            const buyBtn = document.createElement("button");
            buyBtn.classList.add("buy-btn");
            buyBtn.innerHTML = "BUY";
            item.appendChild(buyBtn);
            foundItem.appendChild(item);
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
});

function displayNotFoundMessage() {
  alert("Product not found");
}
