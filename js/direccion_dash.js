class Direccion {
  constructor(direc, numero, region, comuna, cod_postal) {
    this.direc = direc;
    this.numero = numero;
    this.region = region;
    this.comuna = comuna;
    this.cod_postal = cod_postal;
  }
}

var userLogiado = JSON.parse(localStorage.getItem("userLogiado"));
var users = JSON.parse(localStorage.getItem("localUserList"));

const userDirec = userLogiado.direc;
const ref = document.getElementById("refrescar");

//Ingresar direcciones
const curepoTable = document.getElementById("cuerpo-tabla");
htmlTable = "";

const tabla = document.getElementById("cuerpo-tabla");

//Funcion para cargra objeto a la tabla
function cargarTabla() {
  userDirec.forEach((datos) => {
    const fila = document.createElement("tr");
    const direcTd = document.createElement("td");
    direcTd.textContent = datos.direc;
    fila.appendChild(direcTd);

    const numeroTd = document.createElement("td");
    numeroTd.textContent = datos.numero;
    fila.appendChild(numeroTd);

    const regionTd = document.createElement("td");
    regionTd.textContent = datos.region;
    fila.appendChild(regionTd);

    const comunaTd = document.createElement("td");
    comunaTd.textContent = datos.comuna;
    fila.appendChild(comunaTd);

    const codPostalTd = document.createElement("td");
    codPostalTd.textContent = datos.cod_postal;
    fila.appendChild(codPostalTd);

    //Boton editas
    const btnEditar = document.createElement("button");

    const accionesTd = document.createElement("td");
    const iconEditar = document.createElement("i");
    iconEditar.classList.add("fa-regular", "fa-pen-to-square");
    btnEditar.appendChild(iconEditar);
    btnEditar.classList.add("btn", "btn-warning", "me-3");
    accionesTd.appendChild(btnEditar);

    //Boton borrar
    const btnBorrar = document.createElement("button");
    btnBorrar.addEventListener('click',()=>{
      Swal.fire({
        title: 'Estas seguro?',
        text: "Esta direccion se eliminara!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, borrar!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminada!',
            'Tu direccion se a eliminado.',
            'success'
          )

          fila.remove();
        }
      })
    })

    const iconBorrar = document.createElement("i");
    iconBorrar.classList.add("fa-solid", "fa-trash-can");
    btnBorrar.appendChild(iconBorrar);
    btnBorrar.classList.add("btn", "btn-danger");
    accionesTd.appendChild(btnBorrar);

    fila.appendChild(accionesTd);

    tabla.appendChild(fila);
  });
}
curepoTable.innerHTML = htmlTable;

const btnRegistrar = document.getElementById("regNuevaDirec");

//Funcion Obtener datos de registrar
function nuevaDireccion() {
  const direc = document.getElementById("nuevaDirec");
  const num = document.getElementById("nuevoNum");
  const region = document.getElementById("regRegion");
  const comuna = document.getElementById("regComuna");
  const cpostal = document.getElementById("nuevoCpo");

  var nuevaDireccion2 = new Direccion(
    direc.value,
    num.value,
    region.value,
    comuna.value,
    cpostal.value
  );
  userLogiado.direc.push(nuevaDireccion2);
  actualizarTabla();
}

//Funcion registrar nueva direccion
function actualizarTabla() {
    // Obtenemos la tabla
    const tabla = document.getElementById('tabla-direc');

    // Borramos todas las filas de la tabla
    tabla.querySelectorAll('tbody tr').forEach(tr => tr.remove());

    // Agregamos las filas con los nuevos datos
    userDirec.forEach(dato => {
        
      // Creamos una nueva fila y llenamos las celdas con los datos del objeto
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${dato.direc}</td>
        <td>${dato.numero}</td>
        <td>${dato.region}</td>
        <td>${dato.comuna}</td>
        <td>${dato.cod_postal}</td>
        <td>
          <button class="btn btn-warning"><i class="fas fa-edit"></i></button>
          <button class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
        </td>
      `;
      // Agregamos la fila a la tabla
      tabla.querySelector('tbody').appendChild(fila);
    });

    //console.log(userLogiado);
    agregarLocalStorage(users);
  }

  function agregarLocalStorage(user){

    for (let i in user){
        if(user[i].rut === userLogiado.rut){

            //console.log(userLogiado)
            user.splice(i)
            user.push(userLogiado);
            break;
        }
    }
    localStorage.setItem("localUserList", JSON.stringify(user));
  }


/*
--------------------------------------------------------
                Escuchar eventos
---------------------------------------------------------
*/
btnRegistrar.addEventListener("click", nuevaDireccion);
addEventListener("DOMContentLoaded", cargarTabla);
