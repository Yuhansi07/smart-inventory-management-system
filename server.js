const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let items = [
  {
    id: 1,
    name: "Laptop",
    category: "Electronics",
    quantity: 15,
    supplier: "ABC Suppliers",
    price: 250000
  },
  {
    id: 2,
    name: "Mouse",
    category: "Accessories",
    quantity: 50,
    supplier: "Tech World",
    price: 2500
  }
];

app.get("/", (req, res) => {
  res.send("Smart Inventory Management System Backend Running");
});

app.get("/api/items", (req, res) => {
  res.json(items);
});

app.get("/api/items/:id", (req, res) => {
  const item = items.find(i => i.id === Number(req.params.id));

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.json(item);
});

app.post("/api/items", (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name,
    category: req.body.category,
    quantity: req.body.quantity,
    supplier: req.body.supplier,
    price: req.body.price
  };

  items.push(newItem);

  res.status(201).json({
    message: "Item added successfully",
    item: newItem
  });
});

app.put("/api/items/:id", (req, res) => {
  const item = items.find(i => i.id === Number(req.params.id));

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  item.name = req.body.name;
  item.category = req.body.category;
  item.quantity = req.body.quantity;
  item.supplier = req.body.supplier;
  item.price = req.body.price;

  res.json({
    message: "Item updated successfully",
    item
  });
});

app.delete("/api/items/:id", (req, res) => {
  items = items.filter(i => i.id !== Number(req.params.id));

  res.json({
    message: "Item deleted successfully"
  });
});

app.get("/api/low-stock", (req, res) => {
  const lowStockItems = items.filter(item => item.quantity < 20);
  res.json(lowStockItems);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
