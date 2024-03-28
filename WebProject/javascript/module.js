let users;
let customersData;
let sellersData;
let productsData;

fetch("/javascript/db.json")
  .then((response) => response.json())
  .then((data) => {
    processData(data);
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
//! Get A user from the users
export function getUser(username) {
  return users.find((user) => user.username === username);
}
//! Get A product from the products
export function getProduct(productname) {
  return productsData.find((product) => product.name === productname);
}
//! Add a new product to the products
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
}
//! Remove existing product
export function removeProduct(productname) {
  const product = productsData.find((product) => product.name === productname);
  const index = productsData.indexOf(product);
  productsData.splice(index, 1);
}
//! Reduce the quantity of a product
export function reduceQuntatiy(productname, quntatiy) {
  const product = productsData.find((product) => product.name === productname);
  const index = productsData.indexOf(product);
  productsData[index].quantity = product.quantity - quntatiy;
}
//! Increase the quantity of a product
export function increaseQuntatiy(productname, quntatiy) {
  const product = productsData.find((product) => product.name === productname);
  const index = productsData.indexOf(product);
  productsData[index].quantity = product.quantity + quntatiy;
}
//! Remove a user from the users
export function removeUser(user) {
  const index = users.indexOf(user);
  users.splice(index, 1);
}
//! Add a user to the users list
export function addUser(user) {
  users.push(user);
}
//! Login validation
export function login(username, password) {
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    return user;
  } else {
    return null;
  }
}
//! Get sellers users from the database
export function getSeller() {
  return sellersData;
}
