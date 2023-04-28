var userList = JSON.parse(localStorage.getItem("localUserList"));
var largoLista = userList.length;

const mail = document.getElementById("login-correo");
const pass = document.getElementById("login-contra");
const bIniciar = document.getElementById("login-enviar");

let estaLogeado = false;
let usarioLogiado = ''

bIniciar.addEventListener("click", login);

function login() {

  for (let i = 0; i < userList.length; i++) {
    console.log(userList[i].correo);
    console.log(userList[i].contraseña);

    if (userList[i].correo === mail.value && userList[i].contraseña === pass.value.trim()) {
      agregarLocalStorage(userList[i]);
      estaLogeado = true;
      break;
    }
  }

  if(estaLogeado){
    window.location = 'dash-cli.html'
  }else{
    console.log('No esta en base de datos')
  }
}

function agregarLocalStorage(usuario) {
  localStorage.setItem("userLogiado", JSON.stringify(usuario));
}
