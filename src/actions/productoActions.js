import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_EXITO,
  DESCARGA_PRODUCTOS_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_EXITO,
  PRODUCTO_ELIMINADO_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  COMENZAR_EDICION_PRODUCTO,
  PRODUCTO_EDITADO_EXITO,
  PRODUCTO_EDITADO_ERROR
} from '../types';

import axiosFetch from '../config/axios';
import Swal from 'sweetalert2';

// Crear nuevo producto
export function crearNuevoProductoAction (producto) {
  return async (dispatch) => {
    dispatch( agregarProducto() );

    try {
      // insertar en la API
      await axiosFetch.post('/productos', producto);
      dispatch( agregarProductoExito(producto));
      Swal.fire(
        'Correcto',
        'El producto se agregó correctamente',
        'success'
      )
    } catch (error) {
      console.log(error);
      dispatch(agregarProductoError(true));
      // alerta de error
      Swal.fire({
        icon:'error',
        title:'Hubo un error',
        text: 'Hubo un error :('
      })
    }
  }
}

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true
});

// si el producto se guarda en la base de datos
const agregarProductoExito = producto => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto
})
// si hubo un error

const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})

// función de descarga de los productos de la api
export function obtenerProductosAction() {
  return async (dispatch) => {
    dispatch(descargarProductos());
    try {
      const respuesta = await axiosFetch.get('/productos');
      dispatch(descargaProductosExitosa(respuesta.data));
    } catch (error) {
      console.log(error);
      dispatch(descargaProductosError());
    }
  }
}

const descargarProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true
})

const descargaProductosExitosa = productos => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: productos
})

const descargaProductosError = () => ({
  type: DESCARGA_PRODUCTOS_ERROR,
  payload: true
});

// selecciona y elimina el producto
export function borrarProductoAction(id) {
  return async (dispatch) => {
    dispatch(obtenerProductoEliminar(id));
    try {
      const resultado = await axiosFetch.delete(`/productos/${id}`, )
      console.log(resultado);
      dispatch(eliminarProductoExito());
      // si se elimina
      Swal.fire(
        'Eliminado',
        'El producto se eliminó con exito',
        'success'
      )
    }  catch (error) {
      console.log(error);
      dispatch(eliminarProductoError());
    }
  }
}

const obtenerProductoEliminar = id => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id
});

const eliminarProductoExito = () => ({
  type: PRODUCTO_ELIMINADO_EXITO
});

const eliminarProductoError = () => ({
  type: PRODUCTO_ELIMINADO_ERROR,
  payload: true
});

// colocar producto en edición
export function obtenerProductoEditar(producto) {
  return (dispatch) => {
    dispatch(obtenerProductoEditarAction(producto))
  }
}

const obtenerProductoEditarAction = producto => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto
})

// editar un registro en la api y state
export function editarProductoAction(producto) {
  return async (dispatch) => {
    dispatch(editarProducto(producto))
    try {
      const resultado = await axiosFetch.put(`/productos/${producto.id}`, producto);
      dispatch(editarProductoExito(producto));
    } catch (error) {

    }
  }
}

const editarProducto = () => ({
  type: COMENZAR_EDICION_PRODUCTO
})

const editarProductoExito = producto => ({
  type: PRODUCTO_EDITADO_EXITO,
  payload: producto
})