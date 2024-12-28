const express = require("express");
const pool = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM Comprobante");
  res.json(rows);
});

router.post("/", async (req, res) => {
  const {
    numero_comprobante,
    fecha_emision,
    fecha_vencimiento,
    moneda,
    condicion_pago,
    subtotal,
    descuentos_total,
    igv_total,
    op_gravadas,
    op_exoneradas,
    op_inafectas,
    op_gratuitas,
    total,
    id_cliente,
  } = req.body;
  const [result] = await pool.query(
    `INSERT INTO Comprobante (numero_comprobante, fecha_emision, fecha_vencimiento, moneda, condicion_pago, subtotal, descuentos_total, igv_total, op_gravadas, op_exoneradas, op_inafectas, op_gratuitas, total, id_cliente)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      numero_comprobante,
      fecha_emision,
      fecha_vencimiento,
      moneda,
      condicion_pago,
      subtotal,
      descuentos_total,
      igv_total,
      op_gravadas,
      op_exoneradas,
      op_inafectas,
      op_gratuitas,
      total,
      id_cliente,
    ]
  );
  res.json({ id_comprobante: result.insertId });
});

module.exports = router;
