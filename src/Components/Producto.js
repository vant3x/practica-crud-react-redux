import React from 'react';
import { Link } from 'react-router-dom';
import Swalf from 'sweetalert2';

import { useDispatch } from 'react-redux';
import { borrarProductoAction } from './../actions/productoActions';
import Swal from 'sweetalert2';

const Producto = ({producto}) => {
  const { nombre, precio, id} = producto;

  const dispatch = useDispatch();

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
      confirmButtonText: 'Sí, eliminar producto '
    }).then((result) => {
      if (result.value) {
        // pasarlo al action
        dispatch(borrarProductoAction(id));
      }
    })
  }
  return(
    <tr>
      <td>{nombre}</td>
      <td><span className="font-weight-bold">$ {precio}</span></td>
      <td className="acciones">
        <Link to={`/productos/editar/${id}`} className="btn btn-primary mr-2" >
          Editar
        </Link>
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