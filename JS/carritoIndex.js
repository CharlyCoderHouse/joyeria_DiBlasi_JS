// Importo el objeto que tiene los productos para el pedido
import {productos} from "./productos.js";

let carritoCompras = [];

export const carritoIndex = (productoId) => {
    const contenedorCarrito = document.getElementById("carrito-contenedor")

    const renderProductoCarrito = () => {

        // buscar el producto dentro de la lista de productos
        let produFiltro = productos.find(produFiltro => produFiltro.id == productoId)

        // busco el producto en el carrito
        let buscoProdCarrito = carritoCompras.find(enCarrito => enCarrito.id == productoId)

        // si ya esta en el carrito, actualizo cantidad y html
        if (buscoProdCarrito != undefined) {

            buscoProdCarrito.cantidad++;

            let cantidadNueva = document.getElementById(`cantidad${produFiltro.id}`);
            cantidadNueva.innerHTML = `<p id="cantidad${produFiltro.id}">Cantidad: ${buscoProdCarrito.cantidad}</p>`;

        } else {

            // no esta en el carrito, lo creo
            carritoCompras.push(produFiltro)

            produFiltro.cantidad = 1

            let div = document.createElement('div')
            div.classList.add('productoEnCarrito')
            div.setAttribute("id", `divprodid${produFiltro.id}`)
            div.innerHTML = `<p>${produFiltro.nombre}</p>
                            <p>Precio: ${produFiltro.precio}</p> 
                            <p id="cantidad${produFiltro.id}">Cantidad: ${produFiltro.cantidad}</p>
                            <button id="eliminar${produFiltro.id}" class="boton-eliminar" ><i class="fa-solid fa-trash-can"></i></button>
                `
            contenedorCarrito.appendChild(div)

            // agrego evento para poder eliminar producto del carrito
            const boton = document.getElementById(`eliminar${produFiltro.id}`)
            boton.addEventListener('click', () => {
                carritoDelete(produFiltro.id)
            })

        }

        // calculo totales
        const precioPedido = carritoCompras.reduce((acumulador, precio) => acumulador + (precio.precio * precio.cantidad), 0)

        // actualizo total en el modal
        let totalPedido = document.getElementById("elTotal");
        totalPedido.innerHTML = `Total: $${precioPedido}`;

        // actualizo contador de cantidad en el header
        const cantidad = carritoCompras.reduce((acumulador, precio) => acumulador + (precio.cantidad), 0);
        let cantidadPedido = document.getElementById("contador-carrito");
        cantidadPedido.innerHTML = `${cantidad}`;

        // actualizo sessiom storage
        localStorage.setItem("carritoProdu", JSON.stringify(carritoCompras));
        
        const ToastIng = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          ToastIng.fire({
            icon: 'success',
            title: 'Ingreso al pedido'
          })

    }

    renderProductoCarrito();

}

export const carritoDelete = (productoId) => {

    // buscar el producto dentro de la lista de productos
    let produFiltro = productos.find(produFiltro => produFiltro.id == productoId);

    // obtengo el id dentro del carrito
    let buscoProdCarrito = carritoCompras.find(enCarrito => enCarrito.id == productoId);

    // lo encontre
    if (buscoProdCarrito != undefined) {

        buscoProdCarrito.cantidad--;

        // si el total es cero debo eliminar el item
        if (buscoProdCarrito.cantidad == 0) {

            let divABorrar = document.getElementById(`divprodid${produFiltro.id}`);
            divABorrar.remove();
            carritoCompras.shift()

        } else {

            // actualizo cantidad y html
            let cantidadNueva = document.getElementById(`cantidad${produFiltro.id}`);
            cantidadNueva.innerHTML = `<p id="cantidad${produFiltro.id}">Cantidad: ${buscoProdCarrito.cantidad}</p>`;

        }

        const precioPedido = carritoCompras.reduce((acumulador, precio) => acumulador + (precio.precio * precio.cantidad), 0)

        // actualizo total en el modal
        let totalPedido = document.getElementById("elTotal");
        totalPedido.innerHTML = `Total: $${precioPedido}`;

        // actualizo contador de cantidad en el header
        const cantidad = carritoCompras.reduce((acumulador, precio) => acumulador + (precio.cantidad), 0);
        let cantidadPedido = document.getElementById("contador-carrito");
        cantidadPedido.innerHTML = `${cantidad}`;

        // actualizo local storage
        localStorage.removeItem("carritoProdu");
        localStorage.setItem("carritoProdu", JSON.stringify(carritoCompras));

        const ToastEli = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          ToastEli.fire({
            icon: 'error',
            title: 'Eliminado del pedido'
          })

    }

}

export const carritoVaciar = ()=> {
    carritoCompras = [];
}