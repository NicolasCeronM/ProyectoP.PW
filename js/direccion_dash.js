
//Ingresar direcciones
const curepoTable = document.getElementById("cuerpo-tabla");
htmlTable = "";

const tabla = document.getElementById("cuerpo-tabla");

const btnRegistrar = document.getElementById("regNuevaDirec");

//Funcion Obtener datos de registrar
function nuevaDireccion() {
  var contador = 1;
  class Direccion {
    
    constructor(id,nombre, direc, numero, region, comuna, cod_postal) {
      this.id = id;
      (this.nombre = nombre), (this.direc = direc), (this.numero = numero);
      this.region = region;
      this.comuna = comuna;
      this.cod_postal = cod_postal;
    }
  }
  
  var userLogiado = JSON.parse(localStorage.getItem("userLogiado"));
  var userDirec = userLogiado.direc;

  const nombre = document.getElementById("nuevoNombre").value;
  const direc = document.getElementById("nuevaDirec").value;
  const num = document.getElementById("nuevoNum").value;
  const region = document.getElementById("regRegion").value;
  const comuna = document.getElementById("regComuna").value;
  const cpostal = document.getElementById("nuevoCpo").value;

  if (
    nombre.length === 0 ||
    direc.length === 0 ||
    num.length < 4 ||
    region.length === 0 ||
    comuna.length === 0 ||
    cpostal.length === 0
  ) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "porfavor llene todos los campos",
      showConfirmButton: false,
      timer: 2000,
    });
  } else {
    var nuevaDireccion2 = new Direccion(
      contador,
      nombre,
      direc,
      num,
      region,
      comuna,
      cpostal
    );

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Direccion registrada correctamente",
      showConfirmButton: false,
      timer: 1200,
      padding: '30px'
    });

    contador = contador+1;

    userDirec.push(nuevaDireccion2);
    
   
    actualizarTabla();
    agregarLocalStorage(userLogiado);
    location.reload();
    
  }
}

//Mascara de inputs
$(function () {
  $("#nuevoCpo").mask("0000000");
  $("#nuevoNum").mask("0000");
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
  userDirec.forEach((dato, i) => {
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
          <button  class="btn btn-warning"><i class="fas fa-edit"></i></button>
          <button onclick="eliminar(${i})" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
        </td>
      `;
    // Agregamos la fila a la tabla
    tabla.querySelector("tbody").appendChild(fila);
  });
}

function eliminar(i) {
  var userLogiado = JSON.parse(localStorage.getItem("userLogiado"));
  var direccion = userLogiado.direc;

  direccion.splice(i, 1);
  actualizarTabla();

  console.log(direccion);

  agregarLocalStorage(userLogiado);
  actualizarTabla();
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
addEventListener("DOMContentLoaded", actualizarTabla);
