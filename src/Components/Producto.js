import React from 'react';
import { Link, useHistory } from 'react-router-dom';

// redux
import { useDispatch } from 'react-redux';
import { borrarProductoAction, obtenerProductoEditar } from './../actions/productoActions';
import Swal from 'sweetalert2';

const Producto = ({producto}) => {
  const { nombre, precio, id} = producto;

  const dispatch = useDispatch();
  const history = useHistory();

  // confirmar si desea eliminarlo
  const confirmarEliminarProducto = id => {
    // preguntar al usuario 
    Swal.fire({
      title: 'Estás seguro?::',
      text: 'No podrás recuperar este producto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:' #3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar producto ',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        // pasarlo al action
        dispatch(borrarProductoAction(id));
      }
    })
  }

  // función que redirige de forma programada
  const redireccionarEdicion = producto => {
    dispatch(obtenerProductoEditar(producto));
    history.push(`/productos/editar/${id}`);
  }

  return(
    <tr>
      <td>{nombre}</td>
      <td><span className="font-weight-bold">$ {precio}</span></td>
      <td className="acciones">
      <button 
         className="btn btn-primary mr-2"
         onClick={() => redireccionarEdicion(producto)}
         type="button"
        >
          Editar
        </button>
        <button 
          className="btn btn-danger"
          onClick={() => confirmarEliminarProducto(id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}

export default Producto;