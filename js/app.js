const form = document.getElementById("form-registro");
const inputs = document.querySelectorAll("#form-registro input");

const campos = {
  regNombre: false,
  regApellido: false,
  regRut: false,
  regFono: false,
  regCorreo: false,
  regPass: false,

  regDirec: false,
  regNum: false,
  regRegion: false,
  regComuna: false,
  cpostalComuna: false,
};
function resetCampos() {
  campos.regNombre = false;
  campos.cpostalComuna = false;
  campos.regApellido = false;
  campos.regComuna = false;
  campos.regRegion = false;
  campos.regCorreo = false;
  campos.regDirec = false;
  campos.regFono = false;
  campos.regNum = false;
  campos.regPass = false;
  campos.regRut = false;

  document.getElementById("regNombre").classList.remove("is-valid");
  document.getElementById("regApellido").classList.remove("is-valid");
  document.getElementById("regRut").classList.remove("is-valid");
  document.getElementById("regFono").classList.remove("is-valid");
  document.getElementById("regCorreo").classList.remove("is-valid");
  document.getElementById("regPass").classList.remove("is-valid");
  document.getElementById("regPassRep").classList.remove("is-valid");
  document.getElementById("regDirec").classList.remove("is-valid");
  document.getElementById("regNum").classList.remove("is-valid");
  document.getElementById("regRegion").classList.remove("is-valid");
  document.getElementById("regComuna").classList.remove("is-valid");
  document.getElementById("cpostalComuna").classList.remove("is-valid");
  document.getElementById("chkTerminos").classList.remove("is-valid");
}

/*
***********************************************************
                      CREANDO EL OBJETO 
***********************************************************
*/
class Usuario {
  constructor(nombre, apellido, rut, telefono, correo, contraseña, direc =[]) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.rut = rut;
    this.telefono = telefono;
    this.correo = correo;
    this.contraseña = contraseña;
    this.direc =direc;
  }
}

class Direccion {
  constructor(direc, numero, region, comuna, cod_postal) {
    this.direc = direc;
    this.numero = numero;
    this.region = region;
    this.comuna = comuna;
    this.cod_postal = cod_postal;
  }
}
const usuarios = [];

//REGISTRO DE USUARIOS
function registrarUsuario(evn) {
  //evn.preventDefault();

  var nuevaDireccion = new Direccion(
    document.getElementById("regDirec").value,
    document.getElementById("regNum").value,
    document.getElementById("regRegion").value,
    document.getElementById("regComuna").value,
    document.getElementById("cpostalComuna").value
  );

  //Usuario.direc.push(nuevaDireccion)
  direcionList =[];
  direcionList.push(nuevaDireccion);

  var usuario = new Usuario(
    document.getElementById("regNombre").value,
    document.getElementById("regApellido").value,
    document.getElementById("regRut").value,
    document.getElementById("regFono").value,
    document.getElementById("regCorreo").value,
    document.getElementById("regPass").value,
    direcionList
  );
  agregar(usuario);
}

//AGREGAR EL USUARIO AL ARRAY
function agregar(nuevoUsuario) {
  console.log(usuarios.push(nuevoUsuario));
  console.log(usuarios);
  agregarLocalStorage(usuarios);
}

function agregarLocalStorage(lista) {
  localStorage.setItem("localUserList", JSON.stringify(lista));
}

/*
*****************************************************************
            SECCION DE VALIDACION DE CAMPOS
*****************************************************************
*/

const validarFormulario = (evn) => {
  switch (evn.target.name) {
    case "regNombre":
      validarCampo(evn.target, evn.target.name);
      break;

    case "regApellido":
      validarCampo(evn.target, evn.target.name);
      break;

    case "regRut":
      validarRut();
      break;

    case "regFono":
      validarCampo(evn.target, evn.target.name);
      break;

    case "regCorreo":
      validarCorreo();
      break;

    case "regPass":
      validarPass();
      break;

    case "regPassRep":
      validarPass2();
      break;

    case "regDirec":
      validarCampo(evn.target, evn.target.name);
      break;

    case "regNum":
      validarCampo(evn.target, evn.target.name);
      break;

    case "regComuna":
      //validarComuna();
      break;

    case "cpostalComuna":
      validarCampo(evn.target, evn.target.name);
      break;
  }
};

//Validar campos vacios
const validarCampo = (input, campo) => {
  if (input.value.trim().length < 3) {
    document.getElementById(campo).classList.add("is-invalid");
    campos[campo] = false;
  } else {
    document.getElementById(campo).classList.remove("is-invalid");
    document.getElementById(campo).classList.add("is-valid");
    campos[campo] = true;
  }
};

//Validar rut
const validarRut = () => {
  const rut = document.getElementById("regRut");

  if (rut.value.trim().length === 12) {
    rut.classList.remove("is-invalid");
    rut.classList.add("is-valid");
    campos["regRut"] = true;
  } else {
    rut.classList.add("is-invalid");
    campos["regRut"] = false;
  }
};

//Validar contraseña
const validarPass = () => {
  const pass1 = document.getElementById("regPass");

  if (pass1.value.trim().length >= 5 && pass1.value.trim().length <= 12) {
    pass1.classList.remove("is-invalid");
    pass1.classList.add("is-valid");
    campos["regPass"] = true;
  } else {
    pass1.classList.add("is-invalid");
    campos["regPass"] = false;
  }
};

//Validar contraseñas iguales
const validarPass2 = () => {
  const pass1 = document.getElementById("regPass");
  const pass2 = document.getElementById("regPassRep");

  if (pass1.value !== pass2.value) {
    pass2.classList.add("is-invalid");
    campos["regPass"] = false;
  } else {
    pass2.classList.remove("is-invalid");
    pass2.classList.add("is-valid");
    campos["regPass"] = true;
  }
};

//Validar correo
const validarCorreo = () => {
  var expR =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  const correo = document.getElementById("regCorreo");

  if (!expR.test(correo.value)) {
    correo.classList.add("is-invalid");

    var error = document.getElementById("fbCorreo");
    error.innerHTML = "Ingrese un correo valido";
    campos["regCorreo"] = false;
  } else {
    correo.classList.remove("is-invalid");
    correo.classList.add("is-valid");
    campos["regCorreo"] = true;
  }
};

//Validar terminos y condiciones
const ck = document.getElementById("chkTerminos");
const validarTerminos = () => {
  if (ck.checked) {
    ck.classList.add("is-valid");
    ck.classList.remove("is-invalid");
  } else {
    ck.classList.add("is-invalid");
  }
};

//Validar comuna
const comuna = document.getElementById("regComuna");
function validarComuna() {
  console.log(comuna.value);
  if (comuna.value.trim() == "") {
    comuna.classList.add("is-invalid");
    campos["regComuna"] = false;
  } else {
    comuna.classList.remove("is-invalid");
    comuna.classList.add("is-valid");
    campos["regComuna"] = true;
  }
}

//Vlidar region
const region = document.getElementById("regRegion");
function validarRegion() {
  if (region.value === "Seleccione...") {
    region.classList.add("is-invalid");
    campos["regRegion"] = false;
  } else {
    region.classList.remove("is-invalid");
    region.classList.add("is-valid");
    campos["regRegion"] = true;
  }
}

//MASCARS A LOS INPUTS
$(function () {
  $("#regRut").mask("00.000.000-9");
  $("#regFono").mask("(+56 0) 0000 0000");
});

/*
***********************************************************
                      MAIN
***********************************************************
*/

//Mostrar error
function mostrarError() {
  document.getElementById("alerta").style.display = "block";
  setTimeout(() => {
    document.getElementById("alerta").style.display = "none";
  }, 3000);
}

//VALIDANDO LOS INPUT
inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
  ck.addEventListener("click", validarTerminos);
  comuna.addEventListener("change", validarComuna);
  region.addEventListener("change", validarRegion);
});

//Registrar
form.addEventListener("submit", (evn) => {
  evn.preventDefault();

  if (
    campos.cpostalComuna &&
    campos.regApellido &&
    campos.regRegion &&
    campos.regComuna &&
    campos.regCorreo &&
    campos.regDirec &&
    campos.regFono &&
    campos.regNombre &&
    campos.regNum &&
    campos.regPass &&
    campos.regRut
  ) {
    if (ck.checked) {
      ck.classList.remove("is-invalid");
      ck.classList.add("is-valid");

      if (registrarUsuario()) {
        alert("Error al agregar usuario");
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario registrado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        resetCampos();
        form.reset();
      }
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'porfavor llene todos los campos',
        showConfirmButton: false,
        timer: 1200
      })
      ck.classList.remove("is-valid");
      ck.classList.add("is-invalid");
    }
  } else {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'porfavor llene todos los campos',
      showConfirmButton: false,
      timer: 1200
    })
  }
});
