const express = require("express");
const pool = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM Producto");
  res.json(rows);
});

router.post("/", async (req, res) => {
  const { nombre, codigo, precio_base, impuesto_aplicable } = req.body;
  const [result] = await pool.query(
    "INSERT INTO Producto (nombre, codigo, precio_base, impuesto_aplicable) VALUES (?, ?, ?, ?)",
    [nombre, codigo, precio_base, impuesto_aplicable]
  );
  res.json({ id_producto: result.insertId });
});

module.exports = router;
