let sucursales

function envioJSON() {
    const URLGET = "https://apisqa.andreani.com/v2/sucursales";
    fetch(URLGET)
        .then(resultado => resultado.json())
        .then(data => {
            let sucursales = data;
            console.log(sucursales);
            sucursales.forEach(enviosS => {
                document.querySelector("#sucursales").innerHTML += `
                <tr>
                <option>${enviosS.direccion.provincia},${enviosS.direccion.localidad},${enviosS.direccion.calle},${enviosS.direccion.numero}</option>
                </tr>
                `;
            })

        })

}
envioJSON();