var form_reg = document.getElementById("form-registro");
var usuarios = [];
const campos ={
  nombre : false,
  apellido : false,
  rut : false,
  fono : false,
  correo : false,
  pass : false
}

//Variavles de los ID de formulario
var nombre_reg = document.getElementById("regNombre");
var apellido_reg = document.getElementById("regApellido");
var rut_reg = document.getElementById("regRut");
var fono_reg = document.getElementById("regFono");
var correo_reg = document.getElementById("regCorreo");
var pass_reg = document.getElementById("regPass");
var passRep_reg = document.getElementById("regPassRep");
var direc_reg = document.getElementById("regDirec");
var numDirec_reg = document.getElementById("regNum");
var postal_reg = document.getElementById("cpostalComuna");
var region_reg = document.getElementById("regRegion");
var comuna_reg = document.getElementById("regComuna");
var terminos_reg = document.getElementById("chkTerminos");

form_reg.addEventListener("submit", Ingresar);

function Ingresar(evn) {
  evn.preventDefault();

  validateCampos();

  if(campos.apellido && campos.correo && campos.fono && campos.nombre && campos.pass && campos.rut){

    console.log('Tamos bien')

  }else{
    console.log('Tamos mal')
  }
  
}

//Fuyncion para validar input
function validateCampos() {
  if (nombre_reg.value.trim().length === 0) {
    nombre_reg.classList.add("is-invalid");
    campos['nombre'] = false;
  } else {
    nombre_reg.classList.remove("is-invalid");
    campos['nombre'] = true;
  }

  if (apellido_reg.value.trim().length == 0) {
    apellido_reg.classList.add("is-invalid");
    campos['apellido'] = false;
  } else {
    apellido_reg.classList.remove("is-invalid");
    campos['apellido'] = true;
  }

  if (rut_reg.value.trim().length == 0) {
    rut_reg.classList.add("is-invalid");
    campos['rut'] = false;
  } else {
    rut_reg.classList.remove("is-invalid");
    campos['rut'] = true;
  }

  if (fono_reg.value.trim().length == 0) {
    fono_reg.classList.add("is-invalid");
    campos['fono'] = false;
  } else {
    fono_reg.classList.remove("is-invalid");
    campos['fono'] = true;
  }

  validateEmail(correo_reg);

  validatePass(pass_reg, passRep_reg);

  console.log(campos)

}


//Funcion para validar cooreo
function validateEmail(input) {
  var expReg =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  if (input.value === "") {
    input.classList.add("is-invalid");
    campos['correo'] = false;
  } else {
    if (!expReg.test(input.value)) {
      input.classList.add("is-invalid");

      var error = document.getElementById("fbCorreo");
      error.innerHTML = "Ingrese un correo valido";
     campos['correo'] = false;
    } else {
      input.classList.remove("is-invalid");
      campos['correo'] = true;
    }
  }
}

//Funncion para validar la misma contraseña
function validatePass(input, input2) {
  if (input.value.trim().length === 0) {
    input.classList.add("is-invalid");
    input2.classList.add("is-invalid");
    campos['pass'] = false;
  } else {
    if (input2.value.trim() !== input.value.trim()) {
      input.classList.add("is-invalid");
      input2.classList.add("is-invalid");

      var error = document.getElementById("fbContra");
      error.innerHTML = "Las contraseñas deben coincidir";
      campos['pass'] = false;
    } else {
      input.classList.remove("is-invalid");
      input2.classList.remove("is-invalid");
      campos['pass'] = true;
    }
  }
}

//Formato a los inputs
$(function () {
  $("#regRut").inputmask("99.999.999-9");
  $("#regFono").inputmask("(+56 9) 9999 9999");

  $("#regNombre").blur(function () {
    if (nombre_reg.value.trim() === "") {
      nombre_reg.classList.add("is-invalid");
    } else {
      nombre_reg.classList.remove("is-invalid");
    }
  });
});

function registrarUsuario(evn) {
  evn.preventDefault();

  function Usuario(nombre, apellido, rut, telefono, correo, contraseña) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.rut = rut;
    this.telefono = telefono;
    this.correo = correo;
    this.contraseña = contraseña;
  }

  var usuario = new Usuario(
    nombre_reg.value,
    apellido_reg.value,
    rut_reg.value,
    fono_reg.value,
    correo_reg.value,
    pass_reg.value
  );
  agregar(usuario);
}

function agregar(nuevoUsuario) {
  usuarios.push(nuevoUsuario);
  console.log(usuarios);
}
