
import {verificoStorage} from "./app.js";
import {mostrarSeccion} from "./app.js";
import {mostrarSeccionPromo} from "./app.js";
import {mostrarProductos} from "./app.js";
import {mostrarProductosPromo} from "./app.js";

// IDENTIFICO EN QUE PAGINA ESTOY
const myURLsplitted = location.href.split("/");
var myPage = myURLsplitted.pop();
const getPathFromUrl = (myURL) => {
    return myURL.replace(/(\?.*)|(#.*)/g, "")
}
myPage=getPathFromUrl(myPage);

  // CLASE PARA DEFINIR Las SECCIONES de PRODUCTOS
  class Secciones {
    constructor(id, nombre, titulo, desc) {
        this.id = id;
        this.nombre = nombre;
        this.titulo = titulo;
        this.desc = desc;
    }
  }
  
  // CLASE PARA DEFINIR LOS PRODUCTOS 
  class Joyeria {
    constructor(id, nombre, precio, seccion, cantidad, img, alt, desc, titulo, tituOfe, tituTipo) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.seccion = seccion;
        this.cantidad = cantidad;
        this.img = img;
        this.alt =alt;
        this.desc = desc;
        this.titulo = titulo;
        this.tituOfe = tituOfe;
        this.tituTipo = tituTipo;
    }
  }
  
  // Inicializo las secciones con fetch
  const secProd = [];
  
  // Inicializo los productos con fetch
  const productos = [];
  
  //Funcion para cargar secciones
  const cargarSec = async () => {
      try {
          const response = await fetch('../datosJson/secciones.json')
          const seccion = await response.json();
        
          seccion.forEach(seccion => {
            secProd.push(
                  new Secciones(seccion.id, 
                    seccion.nombre, 
                    seccion.titulo,
                    seccion.desc
                  ));
          });
  
        // ARMO LAS CARDS PARA MOSTRAR LOS PRODUCTOS
        if(myPage === "productos.html"){
            mostrarSeccion(secProd);
        }
        if (myPage === "promocion.html"){
            mostrarSeccionPromo(secProd);
        }
  
        } catch (error) {
          console.log("error:"+error);
        }
  
    };
  
  // Funcion para cargar productos
  const cargar = async () => {
      try {
          const response = await fetch('../datosJson/productos.json')
          const producto = await response.json();
        
          producto.forEach(producto => {
            productos.push(
                  new Joyeria(producto.id, 
                          producto.nombre, 
                          producto.precio, 
                          producto.seccion, 
                          producto.cantidad, 
                          producto.img,
                          producto.alt, 
                          producto.desc,
                          producto.titulo,
                          producto.tituOfe,
                          producto.tituTipo));
          });
  
        // ARMO LAS CARDS PARA MOSTRAR LOS PRODUCTOS
        if(myPage === "productos.html"){
            mostrarProductos(productos);
        }              
        if (myPage === "promocion.html"){
            mostrarProductosPromo(productos);
        }
        verificoStorage();

        } catch (error) {
          console.log("error:"+error);
        }
  
    };
    
  // OBTENGO LOS PRODUCTOS CON LA FUNCION  
  cargarSec();
  
  // OBTENGO LOS PRODUCTOS CON LA FUNCION  
  cargar();
  
  export { secProd };
  export { productos };