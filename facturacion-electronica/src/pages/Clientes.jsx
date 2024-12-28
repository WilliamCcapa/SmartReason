import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './Clientes.css'; // Archivo CSS opcional para estilos

const Sidebar = ({ items, onSelect }) => {
  return (
    <div className="sidebar">
      <h2>Menú</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index} onClick={() => onSelect(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: '',
    documento_identidad: '',
    tipo_documento: 'DNI',
    direccion: '',
  });

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = () => {
    api.get('/clientes').then((res) => setClientes(res.data));
  };

  const agregarCliente = () => {
    api.post('/clientes', nuevoCliente).then(() => {
      setNuevoCliente({ nombre: '', documento_identidad: '', tipo_documento: 'DNI', direccion: '' });
      fetchClientes();
    });
  };

  const menuItems = ['Clientes', 'Pedidos', 'Productos'];

  return (
    <div className="app-container">
      <Sidebar
        items={menuItems}
        onSelect={(item) => alert(`Navegando a ${item}`)} // Puedes cambiar la lógica de navegación
      />
      <div className="content">
        <h1>Clientes</h1>
        <ul>
          {clientes.map((cliente) => (
            <li key={cliente.id_cliente}>{cliente.nombre}</li>
          ))}
        </ul>

        <h2>Agregar Cliente</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            agregarCliente();
          }}
        >
          <input
            type="text"
            placeholder="Nombre"
            value={nuevoCliente.nombre}
            onChange={(e) => setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Documento"
            value={nuevoCliente.documento_identidad}
            onChange={(e) => setNuevoCliente({ ...nuevoCliente, documento_identidad: e.target.value })}
            required
          />
          <select
            value={nuevoCliente.tipo_documento}
            onChange={(e) => setNuevoCliente({ ...nuevoCliente, tipo_documento: e.target.value })}
          >
            <option value="DNI">DNI</option>
            <option value="RUC">RUC</option>
          </select>
          <input
            type="text"
            placeholder="Dirección"
            value={nuevoCliente.direccion}
            onChange={(e) => setNuevoCliente({ ...nuevoCliente, direccion: e.target.value })}
            required
          />
          <button type="submit">Agregar</button>
        </form>
      </div>
    </div>
  );
};

export default Clientes;
