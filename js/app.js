var form_reg = document.getElementById("form-registro");



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

form_reg.addEventListener("submit", RegistroValidar);

function RegistroValidar(evn) {
  evn.preventDefault();
  //Validar nombre
  validateEmpty(nombre_reg);
  //Validar apellido
  validateEmpty(apellido_reg);
  //Validar rut
  validateEmpty(rut_reg);
  //Validar telefono
  validateEmpty(fono_reg);
  //Validar correo
  validateEmail(correo_reg);
  //Validar contraseña
  validatePass(pass_reg,passRep_reg)
  //Validar direccion
  validateEmpty(direc_reg);
  //Validar numero de direccion
  validateEmpty(numDirec_reg);
  //Validar comuna
  validateEmpty(comuna_reg);
  //Validar codigo postal
  validateEmpty(postal_reg);
}

//Fuyncion para validar input vacio
function validateEmpty(input){

  if(input.value.length == 0){
    
    input.classList.add('is-invalid')
  }else{

    input.classList.remove('is-invalid')

  }
}

//Funcion para validar cooreo
function validateEmail(input){

  var expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  if (input.value === "") {
    input.classList.add("is-invalid");
  } else {
    if (!expReg.test(input.value)) {
      input.classList.add("is-invalid");

      var error = document.getElementById("fbCorreo");
      error.innerHTML = "Ingrese un correo valido";
    } else {
      input.classList.remove("is-invalid");
    }
  }

}

//Funncion para validar la misma contraseña
function validatePass(input,input2){

  if (input.value === "") {
    input.classList.add("is-invalid");
    input2.classList.add("is-invalid");
  } else {
    if (input2.value !== input.value) {
      input.classList.add("is-invalid");
      input2.classList.add("is-invalid");

      var error = document.getElementById("fbContra");
      error.innerHTML = "Las contraseñas deben coincidir";


    } else {
      input.classList.remove("is-invalid");
      input2.classList.remove("is-invalid");
    }
  }
}

//Formato a los inputs
$(function(){

  $('#regRut').inputmask('99.999.999-9');
  $('#regFono').inputmask('(+56 9) 9999 9999');

  $('#regNombre').blur(function(){

    if (nombre_reg.value === "") {
      nombre_reg.classList.add("is-invalid");
    } else {
      nombre_reg.classList.remove("is-invalid");
    }

  })

});

