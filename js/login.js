var form = document.getElementById('form-registro');
var registroPersonas = [];

form.addEventListener('submit',registrar)


function registrar(evn){
    evn.preventDefault();

    function Persona(nombre,apellido,correo,contra) {

        this.nombre=nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.contra = contra;
        
    }

    var nom = document.getElementById('nombre-reg').value;
    var ap = document.getElementById('ap-registro').value;
    var cor = document.getElementById('correo-registro').value;
    var pass = document.getElementById('pass-registro').value;

     nuevapersona = new Persona(nom,ap,cor, pass)

    agregar();
}

function agregar(){

    registroPersonas.push(nuevapersona);
    console.log(registroPersonas);
    window.location = "dash-admin.html";

}