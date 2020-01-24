import React from 'react';
import { Link } from 'react-router-dom'; 

const Header = () => {
  return (
    <div className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between">
      <div className="container">
     <Link to={"/"} ><h1 className="text-light">CRUD - React, Redux, Router</h1></Link>   
      </div>

      <Link  
         to={"/productos/nuevo"}
         className="btn btn-danger nuevo-post d-block d-md-inline-block"
      >Agregar Producto &#43;</Link>
    </div>
  );
}

export default Header;