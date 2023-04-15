var form_reg = document.getElementById('regEnviar');


var nombre_reg = document.getElementById('regNombre');
var apellido_reg = document.getElementById('regApellido');
var rut_reg = document.getElementById('regRut');
var fono_reg = document.getElementById('regFono');
var correo_reg = document.getElementById('regCorreo');
var pass_reg = document.getElementById('regPass');
var passRep_reg = document.getElementById('regPassRep');


form_reg.addEventListener('submit',RegistroValidar);

function RegistroValidar(evn){
    evn.preventDefault();

    if(nombre_reg.value ===''){

        nombre_reg.classList.add('is-invalid')
    }

}

    

