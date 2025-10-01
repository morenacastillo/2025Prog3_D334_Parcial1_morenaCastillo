// Lista de productos
const listaFrutas = [
  {"id": 1, "nombre": "Banana", "precio": 1000, "imagen": "../img/banana.jpg", cantidad: 0},
  {"id": 2, "nombre": "Arandano", "precio": 5000,"imagen" : "../img/arandano.jpg", cantidad: 0},
  {"id": 3, "nombre": "Frambuesa", "precio": 4000, "imagen": "../img/frambuesa.png", cantidad: 0},
  {"id": 4, "nombre": "Frutilla", "precio": 3000, "imagen": "../img/frutilla.jpg", cantidad: 0},
  {"id": 5, "nombre": "Kiwi", "precio": 2000, "imagen": "../img/kiwi.jpg", cantidad: 0},
  {"id": 6, "nombre": "Mandarina", "precio": 800, "imagen": "../img/mandarina.jpg", cantidad: 0},
  {"id": 7, "nombre": "Manzana", "precio": 1500, "imagen": "../img/manzana.jpg", cantidad: 0},
  {"id": 8, "nombre": "Naranja", "precio": 9000, "imagen": "../img/naranja.jpg", cantidad: 0},
  {"id": 9, "nombre": "Pera", "precio": 2500, "imagen": "../img/pera.jpg", cantidad: 0},
  {"id": 10, "nombre": "Anana", "precio": 3000, "imagen": "../img/anana.jpg", cantidad: 0},
  {"id": 11, "nombre": "Pomelo amarillo", "precio": 2000, "imagen": "../img/pomelo-amarillo.jpg", cantidad: 0},
  {"id": 12, "nombre": "Pomelo rojo", "precio": 2000, "imagen": "../img/pomelo-rojo.jpg", cantidad: 0},
  {"id": 13, "nombre": "Sandia", "precio": 1000, "imagen": "../img/sandia.jpg", cantidad: 0}
]

let carrito = []
let htmlCarrito = ""

//==================== VARIABLES DEL DOM ====================
const barraBusqueda = document.getElementById("barra-busqueda")

const contenedorProductos = document.getElementById("contenedor-productos");

const contenedorCarrito = document.getElementById("contenedor-carrito");

const ordenAlfabetico = document.getElementById("orden-alfabetico");
const ordenPrecio = document.getElementById("orden-precio");
// ============================================================




// ==================== ORDENAMIENTO ====================
// Escuchadores de eventos que capturan el cliqueo de un boton para accionar determinado ordenamiento
ordenAlfabetico.addEventListener("click", ordenarAlfabeticamente)
ordenPrecio.addEventListener("click", ordenarPrecio)

// Funcion que se encarga de ordenar de manera alfabetica creciente (A - Z) todos los elementos de la lista de productos
function ordenarAlfabeticamente(){
    let productosOrdenados = [...listaFrutas];
    productosOrdenados.sort((a, b) => 
        (a.nombre.toLowerCase() > b.nombre.toLowerCase()) - 
        (a.nombre.toLowerCase() < b.nombre.toLowerCase()));
    mostrarLista(productosOrdenados);
}

// Funcion que se encarga de ordenar por precio creciente (MENOR - MAYOR) todos los elementos de la lista de productos
function ordenarPrecio(){
    let productosOrdenados = [...listaFrutas];
    productosOrdenados.sort( (a, b) => a.precio - b.precio );
    mostrarLista(productosOrdenados);
}
// ============================================================




// ==================== BARRA BUSQUEDA ====================
// Escuchador de eventos que captura el INPUT del usuario para aplicar filtro de busqueda en la lista de productos
barraBusqueda.addEventListener("input", buscarProductos)

// funcion que se encarga de filtrar los productos que contengan el texto ingresado en la barra de busqueda
function buscarProductos(){
    let textoBusqueda = barraBusqueda.value.toLowerCase();
    let productoFiltrado = listaFrutas.filter(fruta => fruta.nombre.toLowerCase().includes(textoBusqueda));
    mostrarLista(productoFiltrado);
}
// ============================================================




// ==================== LISTA ====================
// Funcion que se encarga de insertar en el HTML, mediante el innerHTML, todos los atributos del producto y brindar la opcion de agregar al carrito, 
function mostrarLista(array){
    let htmlProductos = ""
    array.forEach(fruta => {
        htmlProductos += `
        <div class="card-producto">
            <img src="${fruta.imagen}" alt="${fruta.nombre}">
            <h3>${fruta.nombre}</h3>
            <p>$${fruta.precio}</p>
            <button class="boton-agregar" onclick="agregarACarrito(${fruta.id})">Agregar al carrito</button>
        </div>
        `
        contenedorProductos.innerHTML = htmlProductos;
        });
}
// Funcion que se encarga de agregar el producto seleccionado por su id en el carrito. Si el producto ya existe, incrementa la cantidad. Si no existe lo agrega al carrito
function agregarACarrito(id){
    const productoEnCarrito = carrito.find(fruta => fruta.id === id);
    if(productoEnCarrito){
        productoEnCarrito.cantidad++;
    } else{
        const fruta = listaFrutas.find(fruta => fruta.id === id);
        fruta.cantidad = 1;
        carrito.push(fruta);
    }
    mostrarCarrito();
    actualizarCarrito()
}
// ============================================================




// ==================== CARRITO ====================
//Funcion que se encarga de mostrar el carrito de productos agregados, nombres, cantidades y precios
function mostrarCarrito() {
    htmlCarrito = "<ul>";
    let totalProductos = carrito.reduce((acum, fruta) => acum + fruta.cantidad, 0);

    carrito.forEach((fruta, indice) => {
        htmlCarrito += `
        <li class="bloque-item">
            <p class="nombre-item">${fruta.nombre} - $${fruta.precio}   x ${fruta.cantidad}</p>
            <button class="boton-eliminar" onclick="eliminarDelCarrito(${indice})">Eliminar</button>
        
        `;
    });

    if(carrito.length >= 1){
        htmlCarrito += `
            </ul>
            <div class="carrito-footer">
                <button id="vaciar-carrito" onclick="vaciarCarrito()">Vaciar carrito</button>
                <p class="total-carrito">Total: $${carrito.reduce((acum, fruta) => acum + (fruta.precio * fruta.cantidad), 0)}</p>
            </div> `;}
    else{
        htmlCarrito += `
        </ul>
        <p class="carrito-vacio">El carrito se encuentra vacío...</p>`;
        }

    contenedorCarrito.innerHTML = htmlCarrito;
    document.getElementById("contador-carrito").textContent = `Carrito: ${totalProductos} productos`;

    console.log(carrito);
}
// Funcion que se encarga de eliminar por indice el elemento seleccionado del carrito y actualizar el localStorage
function eliminarDelCarrito(indice){
    const fruta = carrito[indice];
    if(fruta.cantidad > 1){
        fruta.cantidad--;
    } else{
        carrito.splice(indice, 1);
    }
    mostrarCarrito();
    actualizarCarrito();
}
// Funcion que se encarga de vaciar todos los elementos dentro del carrito y actualizar el localStorage
function vaciarCarrito(){
    carrito = []
    mostrarCarrito()
    actualizarCarrito()
}
// Función que se encarga de leer el carrito almacenado en localStorage.
// Si existe un carrito guardado, lo convierte desde formato JSON a objeto y lo muestra en pantalla. Si no existe muestra un carrito vacío.
function leerCarrito (){
    let textoCarritoLeido = localStorage.getItem("carrito");
    if (!textoCarritoLeido)
    {
        mostrarCarrito();
    }
    else
    {
        carrito = JSON.parse(textoCarritoLeido);
        mostrarCarrito();
    }
}
// Función que se encarga de guardar el estado actual del carrito en localStorage como texto JSON
function actualizarCarrito(){
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
// ============================================================



// ==================== DATOS ALUMNO ====================
// Funcion que se encarga de crear el objeto alumno: mostrarlo en consola y en el nav del html
function imprimirDatosAlumno(){
    const alumno = {
        dni: "46207361",
        nombre: "Morena",
        apellido: "Castillo"}
    console.log(`Alumno: ${alumno.nombre} ${alumno.apellido} - DNI: ${alumno.dni}`);

    const datosAlumno = document.getElementById("datos-alumno");
    datosAlumno.innerHTML += `<h3 class="datos-alumno">${alumno.nombre} ${alumno.apellido}</h3>`;
}
//============================================================




//==================== INICIALIZADOR ====================
// Función principal que se ejecuta al cargar la página. Se encarga de mostrar la lista de productos, leer el carrito desde localStorage, y de imprimir los datos del alumno en el encabezado.
function init(){
    mostrarLista(listaFrutas);
    mostrarCarrito();
    leerCarrito();
    imprimirDatosAlumno();
}
init()