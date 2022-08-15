// Codigo para armar las Cards para el pedido

import {carritoIndex} from './carritoIndex.js'; 
let usuarioStorage = localStorage.getItem("usuario")

export const mostrarProductos = (productos) => {
  
    productos.forEach(productos => {
        let idNombre = "idCajasProd"+productos.seccion;
        const contenedorProducto = document.getElementById(idNombre);
        const div = document.createElement('div')
        div.innerHTML += `<div class="col">
                            <div class="card h-100 shadow-sm">
                                <img class="card-img-top" src="${productos.img}" alt="${productos.alt}">
                                <div class="label-top shadow-sm">${productos.tituTipo}</div>
                                <div class="card-body">
                                    <div class="clearfix mb-3">
                                        <span class="float-start badge rounded-pill bg-primary">${productos.tituOfe}</span>
                                        <span class="float-end badge rounded-pill bg-success">$ ${productos.precio}.-</span>
                                    </div>
                                    <h5 class="card-title">${productos.nombre}</h5>

                                    <div class="text-center my-4">
                                        <!-- Botón Modal Carrito -->
                                        <button type="button" class="btn btn-warning" data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop${productos.id}">
                                            Agregar al Carrito
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Modal -->
                        <div class="modal fade" id="staticBackdrop${productos.id}" data-bs-backdrop="static" data-bs-keyboard="false"
                            tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="staticBackdropLabel">${productos.titulo}</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <p>${productos.desc}</p>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary"
                                            data-bs-dismiss="modal">Cancelar</button>
                                        <button type="button" class="btn btn-warning" id="botonCar${productos.id}"
                                            data-bs-dismiss="modal">Confirmar</button>
                                    </div>
                                </div>
                            </div>
                        </div>`

        contenedorProducto.appendChild(div)

        const boton = document.getElementById(`botonCar${productos.id}`)
        boton.addEventListener('click', () => {
            if(usuarioStorage) { 
                carritoIndex(productos.id);
            }else{
                Swal.fire({
                    title: 'Debe ingresar su usuario para continuar!',
                    showClass: {
                      popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                      popup: 'animate__animated animate__fadeOutUp'
                    }
                })
            }
         })

    })

}

export const mostrarSeccion = (secProd) => {
    const contenedorCajaProd = document.getElementById('producto-contenedor');

    secProd.forEach(secProd => {
        const section = document.createElement('section')
        section.innerHTML += `<section class="${secProd.nombre}">
                                <div class="secTop">
                                    <h1 class="titulos" id="${secProd.titulo}">${secProd.titulo}</h1>
                                   <a href=#><i class="fa-solid fa-house fuentesNav"></i></a>
                                </div>
                                <nav class="texto">
                                    ${secProd.desc}
                                </nav>
                                <div class="cajaProductos">
                                    <div class="container-fluid bg-trasparent my-4 p-3" style="position: relative;">
                                        <div class="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3" id="idCajasProd${secProd.id}">
                                        </div>
                                    </div>
                                </div>
                        </section>`
        contenedorCajaProd.appendChild(section)
    })

}

export function verificoStorage() {

    let listaProductos = JSON.parse(localStorage.getItem("carritoProdu")) || [];

    // pongo el contador en cero, por si no hay items en el carrito
    let cantidadPedido = document.getElementById("contador-carrito");
    let cantidad=0;
    cantidadPedido.innerHTML = `${cantidad}`;

    listaProductos.forEach(ele => {
        let i=0;
        for(i=0;i<ele.cantidad;i++){
         carritoIndex(ele.id);
        }
    })

}
