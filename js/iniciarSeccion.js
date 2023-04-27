var userList = JSON.parse(localStorage.getItem("localUserList"));
var largoLista = userList.length;

const mail = document.getElementById("login-correo");
const pass = document.getElementById("login-contra");
const bIniciar = document.getElementById("login-enviar");

bIniciar.addEventListener("click", login);

function login() {
  console.log("hola");

  for (lista of userList) {
    if (mail.value === lista.correo && pass.value === lista.contraseña) {
      window.location = "dash-cli.html";

      return;
    } else {
      alert("malisimooo");

      return;
    }
  }
}
