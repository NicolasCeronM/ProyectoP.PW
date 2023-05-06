var userList = JSON.parse(localStorage.getItem("localUserList"));
var largoLista = userList.length;

const mail = document.getElementById("login-correo");
const pass = document.getElementById("login-contra");
const bIniciar = document.getElementById("login-enviar");

let estaLogeado = false;
let usarioLogiado = "";

bIniciar.addEventListener("click", login);

var ver = document.getElementById('ver-contraseña');
var verIcon = document.getElementById('ver-icon');
function Mostrar(e){
  e.preventDefault();

  if(pass.type === 'password'){

    pass.type = 'text'
    verIcon.classList.remove('fa-regular','fa-eye');
    verIcon.classList.add('fa-regular', 'fa-eye-slash');
    
    

  }else{
    pass.type = 'password';
    verIcon.classList.remove('fa-regular', 'fa-eye-slash');
    verIcon.classList.add('fa-regular','fa-eye');
  }
}
ver.addEventListener('click',Mostrar);

function login() {
  for (let i = 0; i < userList.length; i++) {
    console.log(userList[i].correo);
    console.log(userList[i].contraseña);

    if (
      userList[i].correo === mail.value &&
      userList[i].contraseña === pass.value.trim()
    ) {
      agregarLocalStorage(userList[i]);
      estaLogeado = true;
      break;
    }
  }

  if (estaLogeado) {
    window.location = "dash-cli.html";
  } else {
    Swal.fire({
      title: "Error",
      text: "Correo o contraseña erroneo",
      icon: "error",
      confirmButtonText: "Intentar denuevo",
      footer:
        '<p>Si no tienes cuenta <a href="registrar.html">registrate</a></p>',
      timer: 4000,
    });
  }
}

function agregarLocalStorage(usuario) {
  localStorage.setItem("userLogiado", JSON.stringify(usuario));
  localStorage.setItem('showAlert', JSON.stringify(false));
}
