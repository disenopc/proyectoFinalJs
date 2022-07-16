//VARIABLES GLOBALES
let productoA = [];
let productoL;

//RENDERIZAR PRODUCTOS
function productosRenderizados() {
    const card = document.getElementById("cardDinamica");
    for (let array of productoA) {
        const productoL = document.createElement("div");
        productoL.innerHTML += `
        <div class="card mb-3 item" style="width: 18rem;">
          <div class="container card-body">
            <img class="imgArray  card-img-top" src="${array.img}">
            <h3 class="item-title"> ${array.nombre} </h3>
            <p class="card-text"><strong>$${array.precio}</strong></p>
            <button id="btn${array.id}" class="add-cart"><i class='bx bx-shopping-bag' ></i></button>
            </div>
         </div>`
        card.appendChild(productoL);
    };
    //EVENTO DE BOTON
    productoA.forEach(array => {
        document.getElementById(`btn${array.id}`).addEventListener('click', function() {
            agregarAlCarrito(array);
        });
    });

}
//TOMAR PRODUCTOS DEL JSON
async function obtenerJSON() {
    const URLJSON = "/productos.json";
    const resp = await fetch("productos.json");
    const data = await resp.json();
    productoA = data;
    productosRenderizados();
}
obtenerJSON();

//INTERACCION CON EL DOM
let textoBotonUno = document.getElementById("botonUno");
console.log(textoBotonUno.innerHTML);
textoBotonUno.innerHTML = "Inicio";

let textoBotonDos = document.getElementById("botonDos");
console.log(textoBotonDos.innerHTML);
textoBotonDos.innerHTML = "Tienda";

let titulo = document.getElementById("titulo");
titulo.style.font = "bold  50px Source Serif";

let fondoFooter = document.getElementById("newsletter");
fondoFooter.style.background = "black";
fondoFooter.style.color = "white";
console.log(fondoFooter.innerHTML);

//EVENTOS SOBRE EL FORM DE NEWSLETTER
let form = document.getElementById("formulario");
form.addEventListener("click", (e) => botonEnviar(e));
const botonEnviar = (e) => {
    e.preventDefault();
    let email = e.target.parentNode.children[1].value;
    console.log(email);
    createNewSuscriptor({
        email
    });
    console.log(listasuscriptores);

};

class Suscriptor {
    constructor(email, id) {
        this.email = email;
        this.id = id;
    }
};


const createNewSuscriptor = (email) => {
    const id = listasuscriptores.generateId();
    const newSubs = new Suscriptor(email, id);
    listasuscriptores.addSuscriptor(newSubs);


};
class Suscriptores {
    constructor() {
        this.listasuscriptores = [];
    }
    addSuscriptor(suscriptort) {
        this.listasuscriptores.push(suscriptort);
    }
    generateId() {
        return Date.now();
    }
};

const listasuscriptores = new Suscriptores();

//VALIDA FORM TECLA ENTER

let mail = document.querySelector(".email");

function ingresarUnEmailValido(e) {
    if ((e.which == 13 || e.keycode == 13 && mail == "")) {
        Swal.fire({
            type: 'error',
            text: 'Ingrese un email válido y luego presione enviar',
            timer: 6000,
        })
    }
};

//SIMULADOR DE CARRITO 
let carritoDeCompras = JSON.parse(localStorage.getItem('carrito')) || [];

function agregarAlCarrito(productoNuevo) {
    const findCarrito = carritoDeCompras.find(e => e.id === productoNuevo.id)
    if (!findCarrito) {
        carritoDeCompras.push({ id: productoNuevo.id, nombre: productoNuevo.nombre, precio: productoNuevo.precio, cantidad: 1 });
    } else {
        const index = carritoDeCompras.indexOf(findCarrito)
        carritoDeCompras[index].cantidad++
    }
    Swal.fire({
        title: productoNuevo.nombre,
        text: "se agregó al carrito.",
        imageUrl: productoNuevo.img,
        imageWidth: 170,
        imageHeight: 159,
        imageAlt: 'articulo',
        confirmButtonColor: '#E8D637',
    });


    localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));
    tablaDelCarrito();
};

//AGREGAR LOS PRODUCTOS AL DOM
function tablaDelCarrito(productoNuevo) {
    const tabla = document.getElementById("cuerpoTabla");
    tabla.innerHTML = ""
    carritoDeCompras.forEach((productoNuevo) => {
            cuerpoTabla.innerHTML += `
            <div class="cartBox">
                <p>${productoNuevo.id}</p>
                <div class="detail-box">
                    <div class="cart-prod-title">  ${ productoNuevo.nombre } </div>
                    <div> <button  class="botonMenos" id="btnResta${productoNuevo.id}">-</button> ${productoNuevo.cantidad} <button class="botonMas" id="btnSuma${productoNuevo.id}">+</button></div>
                    <div class="cart-price">Precio: $ ${ productoNuevo.precio } </div>
                                              
                </div>
            <i class='bx bx-trash cart-remove' id ="btnEliminar${productoNuevo.id}"></i>
            </div> 
            <button class="finCompra"><a>Finalizar Compra</a></button>
              
            `;

        }),
        carritoDeCompras.forEach(productoNuevo => {
            document.getElementById(`btnEliminar${ productoNuevo.id }`).addEventListener("click", function() {
                eliminar(productoNuevo);

            });
        });
    //SUMAR CANTIDAD
    carritoDeCompras.forEach(productoNuevo => {
        document.getElementById(`btnResta${productoNuevo.id}`).addEventListener("click", function() {
            restar(productoNuevo);
        });
    });
    //RESTAR CANTIDAD
    carritoDeCompras.forEach(productoNuevo => {
        document.getElementById(`btnSuma${productoNuevo.id}`).addEventListener("click", function() {
            sumar(productoNuevo);
        });
    });


    //BORRAR EL TOTAL DEL CARRITO
    const borrarCarrito = document.createElement("div");
    cuerpoTabla.appendChild(borrarCarrito);
    borrarCarrito.innerHTML = `<button id="btnBorrarCarrito" class="botonBorrarCarro btn btn-dark"> Borrar carrito </button>`
    const btnBorrarCarrito = document.getElementById("btnBorrarCarrito");


    btnBorrarCarrito.addEventListener("click", () => {
        Swal.fire({
            title: 'Estás seguro que deseas eliminar el carrito?',
            text: "No podrás recuperarlo!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#E8D637',
            cancelButtonColor: 'black',
            confirmButtonText: 'Si, eliminar carrito!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    text: 'El carrito ha sido eliminado!',
                    confirmButtonColor: '#E8D637'
                });
                borrar();
            }
        })

    });

    const totalF = document.getElementById("totalPrice");
    totalF.innerHTML = "";
    const sumaCarrito = document.createElement("div");
    const sumarProductos = carritoDeCompras.map(productoNuevo => productoNuevo.precio * productoNuevo.cantidad).reduce((prev, curr) => prev + curr, 0);
    sumaCarrito.innerHTML = "$" + sumarProductos;
    totalF.appendChild(sumaCarrito);


    //RESTA CANTIDADES
    const restar = (productoNuevo) => {
        const findCarrito = carritoDeCompras.find(e => e.id === productoNuevo.id);
        const index = carritoDeCompras.indexOf(findCarrito);
        carritoDeCompras[index].cantidad--;
        tablaDelCarrito();
        if (productoNuevo.cantidad <= 0) {
            (productoNuevo.cantidad = 1);
        }
    };
    // SUMA CANTIDADES
    const sumar = (productoNuevo) => {
        const findCarrito = carritoDeCompras.find(e => e.id === productoNuevo.id);
        const index = carritoDeCompras.indexOf(findCarrito);
        carritoDeCompras[index].cantidad++;
        tablaDelCarrito();
    };
    localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));
};

console.log(carritoDeCompras);
const borrar = () => {
    carritoDeCompras = [];
    tablaDelCarrito();

}
const eliminar = (productoNuevo) => {
    const findCarrito = carritoDeCompras.find(e => e.id === productoNuevo.id);
    const index = carritoDeCompras.indexOf(findCarrito);
    carritoDeCompras.splice(index, 1);
    tablaDelCarrito();
}
tablaDelCarrito();

//BOTONES DE ABRIR Y CERRAR EL CARRO
let closeCart = document.querySelector("#cerrarCarro");
let cartIcono = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");


cartIcono.onclick = () => {
    cart.classList.add("activo");
    cart.classList.remove("oculto");

};

closeCart.onclick = () => {
    cart.classList.remove("activo");
    cart.classList.add("oculto");
};


//EVENTO BOTON FINALIZAR COMPRA
let finDeLaCompra = document.querySelector(".finCompra");
finDeLaCompra.addEventListener("click", () => {
    Swal.fire({
        title: "Gracias por tu compra!",
        text: "Tu pedido nro: " + Date.now() + " se está preparando. Hasta la próxima.",
        confirmButtonColor: '#E8D637'
    });
    borrar(carritoDeCompras);

})