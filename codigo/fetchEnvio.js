function obtenerJSON() {
    const URLGET = "https://apisqa.andreani.com/v2/sucursales";
    fetch(URLGET)
        .then(resultado => resultado.json())
        .then(data => {
            let sucursales = data;
            console.log(sucursales);
            sucursales.forEach(enviosS => {
                document.querySelector("#sucursales").innerHTML += `
                <tr>
                <option>${enviosS.direccion.calle},${enviosS.direccion.numero},${enviosS.direccion.localidad}</option>
                </tr>
                `;
            })
        })

}
obtenerJSON();

// window.onload = () => {
//     let ubicacion = document.querySelector("ubicacionAndreani");
//     ubicacion.addEventListener('click', )
// }