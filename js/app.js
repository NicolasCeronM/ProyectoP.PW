const form = document.getElementById("form-registro");
const inputs = document.querySelectorAll("#form-registro input");
const usuarios = [];

const campos = {
  regNombre: false,
  regApellido: false,
  regRut: false,
  regFono: false,
  regCorreo: false,
  regPass: false,

  regDirec: false,
  regNum: false,
  regComuna: false,
  cpostalComuna: false,
};
function resetCampos(){
  campos.regNombre = false;
  campos.cpostalComuna = false;
  campos.regApellido = false;
  campos.regComuna = false;
  campos.regCorreo = false;
  campos.regDirec = false;
  campos.regFono = false;
  campos.regNum = false;
  campos.regPass = false;
  campos.regRut = false;

  
}

//REGISTRO DE USUARIOS
function registrarUsuario(evn) {
  //evn.preventDefault();

  function Usuario(nombre, apellido, rut, telefono, correo, contraseña, direc) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.rut = rut;
    this.telefono = telefono;
    this.correo = correo;
    this.contraseña = contraseña;
    this.direc = direc;
  }

  var Direccion = {
    direc: document.getElementById("regDirec").value,
    numero: document.getElementById("regNum").value,
    comuna: document.getElementById("regComuna").value,
    cod_postal: document.getElementById("cpostalComuna").value,
  };

  var usuario = new Usuario(
    document.getElementById("regNombre").value,
    document.getElementById("regApellido").value,
    document.getElementById("regRut").value,
    document.getElementById("regFono").value,
    document.getElementById("regCorreo").value,
    document.getElementById("regPass").value,
    Direccion
  );
  agregar(usuario);
}

//AGREGAR EL USUARIO AL ARRAY
function agregar(nuevoUsuario) {
  console.log(usuarios.push(nuevoUsuario));
  //window.location = 'login.html'
  console.log(usuarios);
}

const validarFormulario = (evn) => {
  switch (evn.target.name) {
    case "regNombre":
      validarCampo(evn.target, evn.target.name);
      break;

    case "regApellido":
      validarCampo(evn.target, evn.target.name);
      break;

    case "regRut":
      validarCampo(evn.target, evn.target.name);
      break;

    case "regFono":
      validarCampo(evn.target, evn.target.name);
      break;

    case "regCorreo":
      validarCorreo();
      break;

    case "regPass":
      validarCampo(evn.target, evn.target.name);
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
      validarCampo(evn.target, evn.target.name);
      break;

    case "cpostalComuna":
      validarCampo(evn.target, evn.target.name);
      break;
  }
};

//Validar campos vacios
const validarCampo = (input, campo) => {
  if (input.value.trim().length === 0) {
    document.getElementById(campo).classList.add("is-invalid");
    campos[campo] = false;
  } else {
    document.getElementById(campo).classList.remove("is-invalid");
    document.getElementById(campo).classList.add("is-valid");
    campos[campo] = true;
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
//Mostrar error
function mostrarError() {
  document.getElementById("alerta").style.display = "block";
  setTimeout(() => {
    document.getElementById("alerta").style.display = "none";
  }, 3000);
}
//Mostrar correcto
function mostrarCorrecto() {
  
  document.getElementById("alerta").style.display = "none";
  document.getElementById("alerta-correcta").style.display = "block";
  setTimeout(() => {
    document.getElementById("alerta-correcta").style.display = "none";
    
  }, 3000);
  
}

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
  ck.addEventListener('click',validarTerminos);
});

//Registrar
form.addEventListener("submit", (evn) => {
  evn.preventDefault();

  if (
    campos.cpostalComuna &&
    campos.regApellido &&
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

      
      registrarUsuario();
      form.reset();
      resetCampos();
      mostrarCorrecto();
    } else {
      mostrarError();
      ck.classList.remove("is-valid");
      ck.classList.add("is-invalid");
    }
  } else {
    mostrarError();
  }
});
