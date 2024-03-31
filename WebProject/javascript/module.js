let users = [];
let customersData = [];
let sellersData = [];
let productsData = [];

//! Fetching Data
fetch("../javascript/db.json")
  .then((response) => response.json())
  .then((data) => {
    processData(data);
    // Call other functions that depend on the data
    initializeApp();
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

//! Get the data from the database
function processData(data) {
  customersData = data.customers;
  sellersData = data.sellers;
  productsData = data.products;
  users = [...customersData, ...sellersData];
}
function initializeApp() {
  console.log("Data fetched and processed. Initializing app...");
  // Call other functions or perform tasks that require the data
  getProducts();
}

//! Get A user from the users
export function getUser(username) {
  return users.find((user) => user.username === username);
}

//! Get A product from the products
export function getProduct(productname) {
  return productsData.find((product) => product.name === productname);
}

//! Add a new Product to the Products
export function addProduct(product, sellerUser) {
  const seller = getUser(sellerUser);
  const newProduct = {
    name: product.name,
    description: product.description,
    price: product.price,
    owner: seller.username,
    quantity: product.quantity,
    image: product.image,
  };
  productsData.push(newProduct);
  saveDataToDB();
}

//! Remove existing product
export function removeProduct(productname) {
  const productIndex = productsData.findIndex(
    (product) => product.name === productname
  );
  productsData.splice(productIndex, 1);
  saveDataToDB();
}

//! Reduce the quantity of a product
export function reduceQuantity(productname, quantity) {
  const product = productsData.find((product) => product.name === productname);
  if (product) {
    product.quantity -= quantity;
    saveDataToDB();
  }
}

//! Increase the quantity of a product
export function increaseQuantity(productname, quantity) {
  const product = productsData.find((product) => product.name === productname);
  if (product) {
    product.quantity += quantity;
    saveDataToDB();
  }
}

//! Remove a user from the users
export function removeUser(username) {
  const userIndex = users.findIndex((user) => user.username === username);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    saveDataToDB();
  }
}

//! Add a user to the users list
export function addUser(user) {
  users.push(user);
  saveDataToDB();
}

//! Login validation
export function login(username, password) {
  return users.find(
    (user) => user.username === username && user.password === password
  );
}

//! Get the Sellers
export function getSellers() {
  return sellersData;
}

export function getProducts() {
  console.log(productsData);
  return productsData;
}
//! Save Data
function saveDataToDB() {
  const data = {
    customers: customersData,
    sellers: sellersData,
    products: productsData,
  };
  fetch("/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Data saved successfully:", result);
    })
    .catch((error) => {
      console.error("Error saving data:", error);
    });
}
