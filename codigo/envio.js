let textoBotonUno = document.getElementById("botonUno");
console.log(textoBotonUno.innerHTML);
textoBotonUno.innerHTML = "Inicio";

let textoBotonDos = document.getElementById("botonDos");
console.log(textoBotonDos.innerHTML);
textoBotonDos.innerHTML = "Tienda";



// const form = document.querySelector('#envio')
// const validate = new window.JustValidate('form');

// validation
//     .addField('#name', [{
//             rule: 'required',
//             value: "Campo Obligatorio",
//         },
//         {
//             rule: 'minLength',
//             value: 3,
//             errorMessage: "Tres caracteres mínimo.",
//         },
//     ])
//     .addField('#apellido', [{
//             rule: 'required',
//             value: "Campo Obligatorio",
//         },
//         {
//             rule: 'minLength',
//             value: 3,
//             errorMessage: "Tres caracteres minimo."
//         },
//     ])
//     .addField('#email', [{
//             rule: 'required',
//             errorMessage: 'Campo obligatorio',
//         },
//         {
//             rule: 'email',
//             errorMessage: 'Escriba un Email valido!',
//         },
//     ]);

// form.addEventListener("submit", (e) => handleSubmit(e));

// function handleSubmit(e) {
//     e.preventDefault();
//     console.log(validation);
//     if (!validation.isValid) return mensajeError("Compruebe los datos ingresados");

//     const formData = new FormData(e.target);
//     const values = Object.fromEntries(FormData.entries());

//     console.log(values);
//     form.reset();
//     mensajeExito("Enviado!");
// }


const form = document.querySelector("#form");

/* libreria de validacion -> https://just-validate.dev/documentation/#section-1:~:text=%3C/body%3E-,Quick%20start,-Last%20updated%3A%202022 */
const validation = new window.JustValidate(form);

validation
    .addField("#name", [{
            rule: "required",
            errorMessage: "Campo obligatorio",
        },
        {
            rule: "minLength",
            value: 3,
            errorMessage: "3 caracteres mínimo",
        },
    ])
    .addField("#email", [{
            rule: "required",
            errorMessage: "Campo obligatorio",
        },
        {
            rule: "email",
            errorMessage: "Inserte email válido",
        },
    ])
    .addField("#mensaje", [{
            rule: "required",
            errorMessage: "Campo obligatorio",
        },
        {
            rule: "minLength",
            value: 10,
            errorMessage: "Escribí un poco más...",
        },
        {
            rule: "maxLength",
            value: 15,
            errorMessage: "Escribí un poco menos...",
        },
    ]);

validation.showSuccessLabels({ "#email": "The email looks good!" });

form.addEventListener("submit", (e) => handleSubmit(e));

let datosForm;

function handleSubmit(e) {
    e.preventDefault();

    if (!validation.isValid) return mensajeError("Compruebe los datos");

    const data = new FormData(form);
    datosForm = Object.fromEntries(data.entries());
    enviarDatos(datosForm);

    form.reset();
    mensajeExito("Enviado!");
}

function enviarDatos(datos) {
    console.table(datos);
    console.log(carrito.productos);
}