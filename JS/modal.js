// Codigo Para ver el carrito del pedido

import { verificoStorage } from "./app.js";
import { carritoVaciar } from "./carritoIndex.js";

let usuarioStorage = localStorage.getItem("usuario")
  // IDENTIFICO EN QUE PAGINA ESTOY
  const myURLsplitted = location.href.split("/")
  const myPage=myURLsplitted.pop();
  
const cierreSesion = ()=> {
    // borra el storage
    localStorage.clear();
    // Elimino el user
    let userBorrar = document.getElementById("textUser");
    userBorrar.remove();
    // Hago el Logout
    let botonUser = document.getElementById('incioBoton')
    botonUser.innerHTML = `<button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
    Inicie Sesión <i class="fa-solid fa-person-arrow-down-to-line"></i></button>` 

    let botonCarrito = document.getElementById('abrirCarrito');
    botonCarrito.innerHTML = `<button type="button" id="openVacio" class="btn btn-secondary">Carrito <i class="fa-solid fa-cart-shopping"></i> <span
              id="contador-carrito">0</span> </button>` 

    // borra el array de pedidos
    carritoVaciar();

    // acomoda contadores del carrito header
    verificoStorage();

    // limpia modal del pedido
     const contenedorCarrito = document.getElementById("carrito-contenedor") 
    
    if(contenedorCarrito){
        contenedorCarrito.innerHTML = "";
    } 
    
    let totalPedido = document.getElementById("elTotal");
    let precioPedido=0;
    totalPedido.innerHTML = `Total: $${precioPedido}`;

    let cerrarPedido = document.getElementById("cierrePedido");
    cerrarPedido.addEventListener('click', () => {
        location.reload();
    })
}

if(usuarioStorage) {

    const cierroUser = document.getElementById('cierreUser');
    // CLICK PARA CERRAR sesion
    cierroUser.addEventListener('click', () => {
        cierreSesion();
    })

}else{

    const guardoUser = document.getElementById('ingreso');

    // CLICK PARA guardar USER
    guardoUser.addEventListener('click', () => {
        let form = document.getElementById("formLogin")
        let usuario = form.users.value;
        localStorage.setItem("usuario", usuario);
    })

    const modalCarrito = document.getElementById('openVacio')

    modalCarrito.addEventListener('click', () => {
        if (!usuarioStorage) { 
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

}


const finalizarCarrito = document.getElementById('finalizar')
// ENVIO pedido y vacio localstorage
finalizarCarrito.addEventListener('click', () => {

    let contenedor = document.getElementById("modalFinal");

    let contenedorTitu = document.getElementById("tituloModal");

    let pedido = JSON.parse(localStorage.getItem("carritoProdu"));
    
    if(pedido){

        if (pedido.length > 0) { 
            contenedorTitu.innerHTML =`<h3 class="modal-title" id="exampleModalLabel">Pedido Enviado</h3>`;
            contenedor.innerHTML = `<h3>Muchas gracias ${usuarioStorage}</h3><br><h3>Se envio el pedido</h3>`;
            pedido.forEach(element => {

                if(element.cantidad>0){
                    let item = document.createElement("div");
                    item.innerHTML = `cantidad: ${element.cantidad}
                                    ${element.nombre}
                                    - precio unit: $${element.precio}`;
                    contenedor.append(item);
                }
            });

            const precioPedido = pedido.reduce((acumulador, precio) => acumulador + (precio.precio * precio.cantidad), 0)
            let item = document.createElement("div");
            item.innerHTML = `<br><h3> TOTAL: $${precioPedido}</h3>`
            contenedor.append(item);

            cierreSesion();
        } else{
            contenedorTitu.innerHTML =`<h3 class="modal-title" id="exampleModalLabel">Intente nuevamente</h3>`;
            contenedor.innerHTML = "<h2>No selecciono ninguna opción para realizar el pedido!</h2><br>";    
        }
    } else {
        contenedorTitu.innerHTML =`<h3 class="modal-title" id="exampleModalLabel">Intente nuevamente</h3>`;
        contenedor.innerHTML = "<h2>No selecciono ninguna opción para realizar el pedido!</h2><br>";
    }

})  