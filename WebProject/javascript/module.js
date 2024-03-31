let customersData = [];
let sellersData = [];
let productsData = [];
let users = [];

async function fetchData() {
  const response = await fetch("../javascript/db.json");
  const data = await response.json();
  customersData = data.customers;
  sellersData = data.sellers;
  productsData = data.products;
  users = [...customersData, ...sellersData];
}

// Call fetchData once at the beginning to fetch the data
fetchData();

async function getUser(username) {
  await fetchData();
  return users.find((user) => user.username === username);
}

async function getProduct(productname) {
  await fetchData();
  return productsData.find((product) => product.name === productname);
}

async function addProduct(product, sellerUser) {
  await fetchData();
  const seller = await getUser(sellerUser);
  const newProduct = {
    name: product.name,
    description: product.description,
    price: product.price,
    owner: seller.username,
    quantity: product.quantity,
    image: product.image,
  };
  productsData.push(newProduct);
  await saveDataToDB();
}

async function removeProduct(productname) {
  await fetchData();
  const productIndex = productsData.findIndex(
    (product) => product.name === productname
  );
  productsData.splice(productIndex, 1);
  await saveDataToDB();
}

async function reduceQuantity(productname, quantity) {
  await fetchData();
  const product = productsData.find((product) => product.name === productname);
  if (product) {
    product.quantity -= quantity;
    await saveDataToDB();
  }
}

async function increaseQuantity(productname, quantity) {
  await fetchData();
  const product = productsData.find((product) => product.name === productname);
  if (product) {
    product.quantity += quantity;
    await saveDataToDB();
  }
}

async function removeUser(username) {
  await fetchData();
  const userIndex = users.findIndex((user) => user.username === username);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    await saveDataToDB();
  }
}

async function addUser(user) {
  await fetchData();
  users.push(user);
  await saveDataToDB();
}

async function login(username, password) {
  await fetchData();
  return users.find(
    (user) => user.username === username && user.password === password
  );
}

async function getSellers() {
  await fetchData();
  return sellersData;
}

async function getProducts() {
  await fetchData();
  console.log(productsData);
  return productsData;
}

async function saveDataToDB() {
  const data = {
    customers: customersData,
    sellers: sellersData,
    products: productsData,
  };
  try {
    const response = await fetch("/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("Data saved successfully:", result);
  } catch (error) {
    console.error("Error saving data:", error);
  }
}

export {
  getUser,
  getProduct,
  addProduct,
  removeProduct,
  reduceQuantity,
  increaseQuantity,
  removeUser,
  addUser,
  login,
  getSellers,
  getProducts,
  saveDataToDB,
};
