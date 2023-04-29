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
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
    window.location = 'dash-cli.html'
  }else{
    Swal.fire({
      title: 'Error',
      text: 'Correo o contraseña erroneo',
      icon: 'error',
      confirmButtonText: 'Intentar denuevo',
      footer: '<p>Si no tienes cuenta <a href="registrar.html">registrate</a></p>',
      timer: 4000
    })
  }
}

function agregarLocalStorage(usuario) {
  localStorage.setItem("userLogiado", JSON.stringify(usuario));
}
