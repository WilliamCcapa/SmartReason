const express = require('express');
const pool = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM Cliente');
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { nombre, documento_identidad, tipo_documento, direccion } = req.body;
  const [result] = await pool.query(
    'INSERT INTO Cliente (nombre, documento_identidad, tipo_documento, direccion) VALUES (?, ?, ?, ?)',
    [nombre, documento_identidad, tipo_documento, direccion]
  );
  res.json({ id_cliente: result.insertId });
});

module.exports = router;