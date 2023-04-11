var form = document.getElementById('form');

form.addEventListener('submit',login)


function login(){  

    let correo = document.getElementById('login-correo').value
    let contraseña = document.getElementById('login-contra').value

    if(correo === 'admin'){
        alert('Bienvenido', correo);
        window.location(index.html)
    }else{
        alert('NOSE QUIEN ERI');
    }

    console.log(correo, contraseña);
}
