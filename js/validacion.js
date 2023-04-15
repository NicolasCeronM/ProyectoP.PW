var form_reg = document.getElementById("form-registro");

var expReg =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

var nombre_reg = document.getElementById("regNombre");
var apellido_reg = document.getElementById("regApellido");
var rut_reg = document.getElementById("regRut");
var fono_reg = document.getElementById("regFono");
var correo_reg = document.getElementById("regCorreo");
var pass_reg = document.getElementById("regPass");
var passRep_reg = document.getElementById("regPassRep");
var direc_reg = document.getElementById("regDirec");
var numDirec_reg = document.getElementById("regNum");
var ciudad_reg = document.getElementById("regCiudad");
var region_reg = document.getElementById("regRegion");
var comuna_reg = document.getElementById("regComuna");
var terminos_reg = document.getElementById("chkTerminos");

form_reg.addEventListener("submit", RegistroValidar);

function RegistroValidar(evn) {
  evn.preventDefault();

  //Validar nombre
  if (nombre_reg.value === "") {
    nombre_reg.classList.add("is-invalid");
  } else {
    nombre_reg.classList.remove("is-invalid");
  }

  //Validar apellido
  if (apellido_reg.value === "") {
    apellido_reg.classList.add("is-invalid");
  } else {
    apellido_reg.classList.remove("is-invalid");
  }

  //Validar rut
  if (rut_reg.value === "") {
    rut_reg.classList.add("is-invalid");
  } else {
    rut_reg.classList.remove("is-invalid");
  }

  //Validar telefono
  if (fono_reg.value === "") {
    fono_reg.classList.add("is-invalid");
  } else {
    fono_reg.classList.remove("is-invalid");
  }

  //Validar correo
  if (correo_reg.value === "") {
    correo_reg.classList.add("is-invalid");
  } else {
    if (!expReg.test(correo_reg.value)) {
      correo_reg.classList.add("is-invalid");

      var error = document.getElementById("fbCorreo");
      error.innerHTML = "Ingrese un correo valido";
    } else {
      correo_reg.classList.remove("is-invalid");
    }
  }

  //Validar contraseña
  if (pass_reg.value === "") {
    pass_reg.classList.add("is-invalid");
    passRep_reg.classList.add("is-invalid");
  } else {
    if (passRep_reg.value !== pass_reg.value) {
      pass_reg.classList.add("is-invalid");
      passRep_reg.classList.add("is-invalid");

      var error = document.getElementById("fbContra");
      error.innerHTML = "Las contraseñas deben coincidir";


    } else {
      pass_reg.classList.remove("is-invalid");
      passRep_reg.classList.remove("is-invalid");
    }
  }

  //Validar direccion
  if (direc_reg.value === "") {
    direc_reg.classList.add("is-invalid");
  } else {
    direc_reg.classList.remove("is-invalid");
  }

  //Validar numero de direccion
  if (numDirec_reg.value === "") {
    numDirec_reg.classList.add("is-invalid");
  } else {
    numDirec_reg.classList.remove("is-invalid");
  }

  //Validar ciudad
  if (ciudad_reg.value === "") {
    ciudad_reg.classList.add("is-invalid");
  } else {
    ciudad_reg.classList.remove("is-invalid");
  }

  //Validar ciudad
  if (comuna_reg.value === "") {
    comuna_reg.classList.add("is-invalid");
  } else {
    comuna_reg.classList.remove("is-invalid");
  }
}
