var userLogiado = JSON.parse(localStorage.getItem("userLogiado"));
const userDirec = userLogiado.direc;
//Ingresar direcciones
const curepoTable = document.getElementById("cuerpo-tabla");
htmlTable = "";

//Funcion para cargra objeto a la tabla
function cargarTabla() {
  const tabla = document.getElementById("cuerpo-tabla");

  userDirec.forEach((datos) => {
    const fila = document.createElement("tr");

    const direcTd = document.createElement("td");
    direcTd.textContent = datos.direc;
    fila.appendChild(direcTd);

    const numeroTd = document.createElement("td");
    numeroTd.textContent = datos.numero;
    fila.appendChild(numeroTd);

    const regionTd = document.createElement("td");
    regionTd.textContent = datos.region;
    fila.appendChild(regionTd);

    const comunaTd = document.createElement("td");
    comunaTd.textContent = datos.comuna;
    fila.appendChild(comunaTd);

    const codPostalTd = document.createElement("td");
    codPostalTd.textContent = datos.cod_postal;
    fila.appendChild(codPostalTd);

    //Boton editas

    const accionesTd = document.createElement("td");
    const btnEditar = document.createElement("button");
    const iconEditar = document.createElement('i');
    iconEditar.classList.add("fa-regular", "fa-pen-to-square");
    btnEditar.appendChild(iconEditar);
    btnEditar.classList.add("btn","btn-warning","me-3");
    accionesTd.appendChild(btnEditar);

    //Boton borrar
    const btnBorrar = document.createElement("button");
    const iconBorrar = document.createElement('i');
    iconBorrar.classList.add("fa-solid", "fa-trash-can");
    iconBorrar.style.color = 'black';
    btnBorrar.appendChild(iconBorrar);
    btnBorrar.classList.add("btn", "btn-danger");
    accionesTd.appendChild(btnBorrar);

    fila.appendChild(accionesTd);

    tabla.appendChild(fila);
  });
}

curepoTable.innerHTML = htmlTable;

addEventListener("DOMContentLoaded", cargarTabla);
