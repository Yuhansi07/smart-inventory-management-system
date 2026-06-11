const API_URL = "http://localhost:5000/api/items";

async function loadItems() {
  const response = await fetch(API_URL);
  const items = await response.json();

  const table = document.getElementById("itemTable");
  table.innerHTML = "";

  items.forEach((item) => {
    table.innerHTML += `
      <tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.category}</td>
        <td>${item.quantity}</td>
        <td>${item.supplier}</td>
        <td>Rs. ${item.price}</td>
      </tr>
    `;
  });
}

async function addItem() {
  const item = {
    name: document.getElementById("name").value,
    category: document.getElementById("category").value,
    quantity: Number(document.getElementById("quantity").value),
    supplier: document.getElementById("supplier").value,
    price: Number(document.getElementById("price").value)
  };

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(item)
  });

  loadItems();
}

loadItems();
