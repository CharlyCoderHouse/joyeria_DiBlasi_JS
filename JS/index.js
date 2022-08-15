// INDEX comienzo del código JavaScript

let usuarioStorage = localStorage.getItem("usuario")

const login = (usuarioStorage) => {
    let pUser = document.getElementById('textUser');
    pUser.innerHTML = `<p>Bienvenid@ ${usuarioStorage}<p>`

    let botonUser = document.getElementById('incioBoton');
    
    botonUser.innerHTML = `<button type="button" class="btn btn-warning" data-bs-toggle="modal" id="cierreUser">
    Cerrar Sesión <i class="fa-solid fa-arrow-right-from-bracket"></i></button>`

    let botonCarrito = document.getElementById('abrirCarrito');
    botonCarrito.innerHTML = `<button type="button" id="open" class="btn btn-warning" data-bs-toggle="modal"
            data-bs-target="#modal-Carrito">Carrito <i class="fa-solid fa-cart-shopping"></i> <span
              id="contador-carrito">0</span> </button>` 
};

const logout = () => {
    let botonUser = document.getElementById('incioBoton');
    botonUser.innerHTML = `<button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
    Inicie Sesión <i class="fa-solid fa-person-arrow-down-to-line"></i></button>`

    let botonCarrito = document.getElementById('abrirCarrito');
    botonCarrito.innerHTML = `<button type="button" id="openVacio" class="btn btn-secondary">Carrito <i class="fa-solid fa-cart-shopping"></i> <span
              id="contador-carrito">0</span> </button>` 
};

usuarioStorage ? login(usuarioStorage) : logout();