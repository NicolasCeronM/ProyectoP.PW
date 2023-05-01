class Direccion {
  static contador = 1;
  constructor(nombre, direc, numero, region, comuna, cod_postal) {
    this.id = ++Direccion.contador;
    (this.nombre = nombre), (this.direc = direc), (this.numero = numero);
    this.region = region;
    this.comuna = comuna;
    this.cod_postal = cod_postal;
  }
}

const ref = document.getElementById("refrescar");

//Ingresar direcciones
const curepoTable = document.getElementById("cuerpo-tabla");
htmlTable = "";

const tabla = document.getElementById("cuerpo-tabla");

//Funcion para cargra objeto a la tabla
function cargarTabla() {
  var userLogiado = JSON.parse(localStorage.getItem("userLogiado"));
  const userDirec = userLogiado.direc;

  userDirec.forEach((datos) => {
    const fila = document.createElement("tr");

    const idTd = document.createElement("td");
    idTd.textContent = datos.id;
    fila.appendChild(idTd);

    const nombreTd = document.createElement("td");
    nombreTd.textContent = datos.nombre;
    fila.appendChild(nombreTd);

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
    const btnEditar = document.createElement("button");

    const accionesTd = document.createElement("td");
    const iconEditar = document.createElement("i");
    iconEditar.classList.add("fa-regular", "fa-pen-to-square");
    btnEditar.appendChild(iconEditar);
    btnEditar.classList.add("btn", "btn-warning", "me-3");
    accionesTd.appendChild(btnEditar);

    //Boton borrar
    const btnBorrar = document.createElement("button");
    btnBorrar.addEventListener("click", () => {
      Swal.fire({
        title: "Estas seguro?",
        text: "Esta direccion se eliminara!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Si, borrar!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Eliminada!", "Tu direccion se a eliminado.", "success");

          var userLogiado = JSON.parse(localStorage.getItem("userLogiado"));
          const userDirec = userLogiado.direc;

          // for(i in userDirec){

          // }

          fila.remove();
        }
      });
    });

    const iconBorrar = document.createElement("i");
    iconBorrar.classList.add("fa-solid", "fa-trash-can");
    btnBorrar.appendChild(iconBorrar);
    btnBorrar.classList.add("btn", "btn-danger");
    accionesTd.appendChild(btnBorrar);

    fila.appendChild(accionesTd);

    tabla.appendChild(fila);
  });
}
curepoTable.innerHTML = htmlTable;

const btnRegistrar = document.getElementById("regNuevaDirec");
var userLogiado = JSON.parse(localStorage.getItem("userLogiado"));

//Funcion Obtener datos de registrar
function nuevaDireccion() {
  const userDirec = userLogiado.direc;

  const nombre = document.getElementById("nuevoNombre").value;
  const direc = document.getElementById("nuevaDirec").value;
  const num = document.getElementById("nuevoNum").value;
  const region = document.getElementById("regRegion").value;
  const comuna = document.getElementById("regComuna").value;
  const cpostal = document.getElementById("nuevoCpo").value;

  if (nombre.length === 0 || direc.length === 0 || num.length === 0 || region.length === 0 || comuna.length === 0 || cpostal.length === 0) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "porfavor llene todos los campos",
      showConfirmButton: false,
      timer: 2000,
    });
  } else {
    var nuevaDireccion2 = new Direccion(
      nombre,
      direc,
      num,
      region,
      comuna,
      cpostal
    );

    userDirec.push(nuevaDireccion2);
    agregarLocalStorage(userLogiado);
    actualizarTabla();
    location.reload();
  }
}

//Mascara de inputs
$(function () {
  $("#nuevoCpo").mask("0000000");
});

//Funcion registrar nueva direccion
function actualizarTabla() {
  var userLogiado = JSON.parse(localStorage.getItem("userLogiado"));
  const userDirec = userLogiado.direc;
  // Obtenemos la tabla
  const tabla = document.getElementById("tabla-direc");

  // Borramos todas las filas de la tabla
  tabla.querySelectorAll("tbody tr").forEach((tr) => tr.remove());

  // Agregamos las filas con los nuevos datos
  userDirec.forEach((dato) => {
    // Creamos una nueva fila y llenamos las celdas con los datos del objeto
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td>${dato.id}</td>
        <td>${dato.nombre}</td>
        <td>${dato.direc}</td>
        <td>${dato.numero}</td>
        <td>${dato.region}</td>
        <td>${dato.comuna}</td>
        <td>${dato.cod_postal}</td>
        <td>
          <button class="btn btn-warning"><i class="fas fa-edit"></i></button>
          <button class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
        </td>
      `;
    // Agregamos la fila a la tabla
    tabla.querySelector("tbody").appendChild(fila);
  });
}

function agregarLocalStorage(newUserLogiado) {
  var users = JSON.parse(localStorage.getItem("localUserList"));

  for (let i in users) {
    if (users[i].rut === newUserLogiado.rut) {
      users.splice(i);
      users.push(newUserLogiado);
      break;
    }
  }

  delete localStorage.localUserList;
  localStorage.setItem("localUserList", JSON.stringify(users));

  localStorage.removeItem(userLogiado);
  localStorage.setItem("userLogiado", JSON.stringify(newUserLogiado));
}

/*
--------------------------------------------------------
                Escuchar eventos
---------------------------------------------------------
*/
btnRegistrar.addEventListener("click", nuevaDireccion);
addEventListener("DOMContentLoaded", cargarTabla);
