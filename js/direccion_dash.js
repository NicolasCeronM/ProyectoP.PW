const curepoTable = document.getElementById("cuerpo-tabla");
const tabla = document.getElementById("cuerpo-tabla");
const btnRegistrar = document.getElementById("regNuevaDirec");

const campos = {
  nombre: false,
  direccion: false,
  numero: false,
  codPostal: false,
};

//VALIDACIONES
$(function () {
  //Validar cod postal
  $("#nuevoCpo").mask("0000000");
  $("#nuevoCpo").keyup(function () {
    if (document.getElementById("nuevoCpo").value.length === 7) {
      $("#nuevoCpo").removeClass("is-invalid");
      $("#nuevoCpo").addClass("is-valid");
      campos.codPostal = true;
    } else {
      $("#nuevoCpo").addClass("is-invalid");
      campos.codPostal = false;
    }
  });

  //Validar numero direccion
  $("#nuevoNum").mask("0000");
  $("#nuevoNum").keyup(function () {
    if (document.getElementById("nuevoNum").value.length === 4) {
      $("#nuevoNum").removeClass("is-invalid");
      $("#nuevoNum").addClass("is-valid");
      campos.numero = true;
    } else {
      $("#nuevoNum").addClass("is-invalid");
      campos.numero = false;
    }
  });

  //Validar vacios
  $("#nuevoNombre").keyup(function () {
    if (document.getElementById("nuevoNombre").value.length > 2) {
      $("#nuevoNombre").removeClass("is-invalid");
      $("#nuevoNombre").addClass("is-valid");
      campos.nombre = true;
    } else {
      $("#nuevoNombre").addClass("is-invalid");
      campos.nombre = false;
    }
  });

  //Validar vacios
  $("#nuevaDirec").keyup(function () {
    if (document.getElementById("nuevaDirec").value.length > 2) {
      $("#nuevaDirec").removeClass("is-invalid");
      $("#nuevaDirec").addClass("is-valid");
      campos.direccion = true;
    } else {
      $("#nuevaDirec").addClass("is-invalid");
      campos.direccion = false;
    }
  });
});

function Reset() {
  $("#staticBackdrop").modal("hide");
  $("#form-new-direc").trigger("reset");

  $("#nuevoNombre").removeClass("is-valid");
  $("#nuevaDirec").removeClass("is-valid");
  $("#nuevoNum").removeClass("is-valid");
  $("#nuevoCpo").removeClass("is-valid");

  campos.codPostal = false;
  campos.direccion = false;
  campos.nombre = false;
  campos.numero = false;
}

//Funcion Para agregar nueva direccion
var contador = 1;
function nuevaDireccion() {
  class Direccion {
    constructor(id, nombre, direc, numero, region, comuna, cod_postal) {
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

  if (campos.codPostal && campos.direccion && campos.nombre && campos.numero) {
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
      padding: "30px",
    });

    contador = contador + 1;
    userDirec.push(nuevaDireccion2);
    agregarLocalStorage(userLogiado);
    Reset();
    actualizarTabla();

  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "porfavor ingrese datos validos",
      showConfirmButton: false,
      timer: 2000,
    });
  }
}

//Funcion para actualizar la tabla
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

//Funcion para elimiar tabla
function eliminar(i) {
  var userLogiado = JSON.parse(localStorage.getItem("userLogiado"));
  var direccion = userLogiado.direc;

  Swal.fire({
    title: "Estas seguro?",
    text: `Quieres eliminar esta direccion`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Si, Eliminar!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        "Eliminado!",
        "Tu direccion se a eliminado correctamente.",
        "success"
      );
      direccion.splice(i, 1);
      actualizarTabla();

      console.log(direccion);

      agregarLocalStorage(userLogiado);
      actualizarTabla();
    }
  });
}

//Funcion para agregar a local storage
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

  delete localStorage.userLogiado;
  localStorage.setItem("userLogiado", JSON.stringify(newUserLogiado));
}

/*
--------------------------------------------------------
                Escuchar eventos
---------------------------------------------------------
*/
btnRegistrar.addEventListener("click", nuevaDireccion);
addEventListener("DOMContentLoaded", actualizarTabla);
