const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const clientesRoutes = require("./routes/clientes");
const productosRoutes = require("./routes/productos");
const comprobantesRoutes = require("./routes/comprobantes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Registrar rutas
app.use("/clientes", clientesRoutes);
app.use("/productos", productosRoutes);
app.use("/comprobantes", comprobantesRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
