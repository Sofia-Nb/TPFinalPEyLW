

//********************************************************************************   NOMBRE DE USUARIO   ********************************************************************************

function validarNombre(){
    var nombre = document.getElementById('nombre').value;
    var dat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!nombre){
        marcarCampoInvalido('nombre', 'Este campo es obligatorio.'); // Se notifica si la expresión en obligatoria.
        return false;
    }else if(dat.test(nombre)){
        marcarCampoInvalido('nombre', 'No se permite este formato.'); // Se notifica si la expresión en obligatoria.
        return false;
    }else if(nombre.length > 6){
        marcarCampoInvalido('nombre', 'El nombre debe ser menor a 6 carácteres.');
        return false;
    }else{ // Se limpia la notificación si la expresión en válida.
            var campo = document.getElementById('nombre');
            var errorElement = document.getElementById('nombre-error');
            errorElement.textContent = '';
            campo.style.borderColor = '';
        return true;
    }
}


//********************************************************************************   FECHA   ********************************************************************************

    function validarFecha() {
        var diaValue = document.getElementById('dia').value.trim();
        var mesValue = document.getElementById('mes').value.trim();
        var anioValue = document.getElementById('anio').value.trim();
        var valor = true;


        if (diaValue.includes('.') || mesValue.includes('.') || anioValue.includes('.')) { // Nos aseguramos de que los datos no contengan puntos.
            valor = false;
        }else if(isNaN(diaValue) || isNaN(mesValue) || isNaN(anioValue)){ // Nos aseguramos de que los datos no sean String.
            valor = false;
        }else{

            // Números enteros.
            var dia = parseInt(diaValue);
            var mes = parseInt(mesValue);
            var anio = parseInt(anioValue);

        if ((!Number.isInteger(dia)) && (!Number.isInteger(mes)) && (!Number.isInteger(anio))){ // Números enteros.
            valor = false;
        }
            if (dia < 1 || dia > 31 || mes < 1 || mes > 12 || anio < 1900 || anio > 2023){ // Datos positivos y algunas condiciones para no sobrepasar dias, meses y años.
                valor = false;
            } else {
                if ((mes === 4 || mes === 6 || mes === 9 || mes === 11) && dia > 30){ // Meses de 30 dias.
                    valor = false;
                }
                if (mes === 2){ // Si es febrero
                    if (dia > 29 || (dia === 29 && !esAnioBisiesto(anio))) {
                        valor = false;
                    }
                }
            }
        }

        if (valor){ // Se limpia la notificación si la expresión en válida.
            var errorElement = document.getElementById('fecha_nacimiento-error');
            errorElement.textContent = '';
            desmarcarFechaInvalida('dia')
            desmarcarFechaInvalida('mes')
            desmarcarFechaInvalida('anio');
        }else{ // Se notifica si la expresión en inválida/obligatoria.
            var errorElement = document.getElementById('fecha_nacimiento-error');
            errorElement.textContent = "La fecha de nacimiento ingresada no es válida o no existe.";
            marcarFechaInvalida('dia')
            marcarFechaInvalida('mes') 
            marcarFechaInvalida('anio')
        }
    
        return valor;
    
}


function esAnioBisiesto(anio){ // Año bisiesto.
    return (anio % 4 === 0 && anio % 100 !== 0) || (anio % 400 === 0);
}

function marcarFechaInvalida(idCampo){ // Funcion para notificar.
    var campo = document.getElementById(idCampo);
    campo.style.borderColor = 'red';
}

function desmarcarFechaInvalida(idCampo){ // Funcion para limpiar.
    var campo = document.getElementById(idCampo);
    campo.style.borderColor = '';
}


//********************************************************************************   TELEFONO   ********************************************************************************

function validarTelefono(){
    var telefonoVar = document.getElementById('telefono').value;
    if (!esNumero(telefonoVar)) {
        marcarCampoInvalido('telefono', 'Teléfono inválido.');
        return false;
    }else{
        var campo = document.getElementById("telefono");
        var errorElement = document.getElementById('telefono-error');
        errorElement.textContent = '';
        campo.style.borderColor = '';
        return true;
    }
}

function esNumero(str) {
return /^\d+$/.test(str);
}


//********************************************************************************   EMAIL   ********************************************************************************

function marcarCampoInvalido(idCampo, mensaje){ // Funcion para notificar si un dato es inválido.
    var campo = document.getElementById(idCampo);
    campo.style.borderColor = 'red';

    var errorElement = document.getElementById(idCampo + '-error'); // "email-error", "obras_sociales-error", "fecha_nacimiento-error", etc (Html).
    errorElement.textContent = mensaje;
}

function correoelectronico(){
var email = document.getElementById('email').value;
var result = false;
let localUsuarios = JSON.parse(localStorage.getItem('Usuarios')) || [];


if(result == false){
    let usuarios = JSON.parse(localStorage.getItem('Usuarios')) || [];
    const emailRegistrado = usuarios.find(item => item.email === email);
            if (emailRegistrado) {
            marcarCampoInvalido('email', 'Este email ya está registrado.'); // Se notifica si la expresión en inválida.
            return false;
        }
 }       

if (!esEmailValido(email)){
            marcarCampoInvalido('email', 'Ingrese un correo electrónico válido.'); // Se notifica si la expresión en inválida/obligatoria.
            return false;

}else{ // Se limpia la notificación si la expresión en válida.
            var campo = document.getElementById("email");
            var errorElement = document.getElementById('email-error');
            errorElement.textContent = '';
            campo.style.borderColor = '';
            return true;
        }
}

// Función para validar si es un correo electrónico válido
function esEmailValido(email){
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Esta estructura permite que el email ingresado esté de forma correcta.
    return re.test(email); // Se testea el email para verificar de que este escrito de forma correcta.
}


//********************************************************* CONTRASEÑA  ***********************************************************************


function validarContraseña(){
    var contrasena = document.getElementById('contraseña').value;
    if (!contrasena){
        marcarCampoInvalido('contraseña', 'Este campo es obligatorio.'); // Se notifica si la expresión en obligatoria.
        return false;
    }
    if (contrasena.length < 6) {
        marcarCampoInvalido('contraseña', 'La contraseña debe ser de al menos 6 carácteres. '); // Se notifica si la expresión en obligatoria.
        return false;
    }else {
        var campo = document.getElementById('contraseña');
        var errorElement = document.getElementById('contraseña-error');
        errorElement.textContent = '';
        campo.style.borderColor = '';

        return true;
   }
}

//********************************************************* REPETIR CONTRASEÑA  ****************************************************************** */


function validarRepContraseña(){
    var repContraseña = document.getElementById('Rep-contraseña').value;
    var cont = document.getElementById('contraseña').value;
    if (!repContraseña){
        marcarCampoInvalido('Rep-contraseña', 'Este campo es obligatorio.'); // Se notifica si la expresión en obligatoria.
        return false;
    }
    if(repContraseña !== cont){
        marcarCampoInvalido('Rep-contraseña', 'La contraseña es incorrecta.'); // Se notifica si la expresión en obligatoria.
        return false;
        }else{
            var campo = document.getElementById('Rep-contraseña');
            var errorElement = document.getElementById('Rep-contraseña-error');
            errorElement.textContent = '';
            campo.style.borderColor = '';
            return true;
       }

}



//********************************************************************************   VALIDAR REGISTRO   ********************************************************************************

function validarRegistro(){ // Esta funcion se envia al Html para validar el formulario.
    var esValido = true;


    // Si alguna es falsa, no se valida el formulario.
    if (!validarNombre()) {
        esValido = false;
    }
    if (!correoelectronico()) {
        esValido = false;
    }
    if (!validarTelefono()) {
        esValido = false;
    }
    if (!validarFecha()) {
        esValido = false;
    }
    if (!validarRepContraseña()) {
        esValido = false;
    }

    if (!validarContraseña()){
        esValido = false;
    }

    if (esValido === false){
    return esValido;
    }

    // Si todas son verdaderas, se valida el formulario y se notifica con un alert.
    
    if (esValido){
        guardarRegistro();
        window.location.href = 'http://127.0.0.1:5500/paginaPrincipal.html';
        alert("USUARIO REGISTRADO");
    }
}

function guardarRegistro(){
    let nomUsuario = document.getElementById('nombre').value;
    let email = document.getElementById('email').value;
    let contraseña = document.getElementById('contraseña').value;
    let tel = document.getElementById('telefono').value;
    let diaFe = document.getElementById('dia').value;
    let mesFe = document.getElementById('mes').value;
    let anioFe = document.getElementById('anio').value;
    let fecha = new Date(anioFe, mesFe - 1, diaFe);

    registrar(nomUsuario, email, contraseña, tel, fecha);
}



function registrar(nom, em, con, tele, fech) {
    let usuarios = JSON.parse(localStorage.getItem('Usuarios')) || [];
    usuarios.push({nombreUsuario: nom, email: em, contraseña: con, telefono: tele,fecha: fech,});
    localStorage.setItem('Usuarios', JSON.stringify(usuarios));
}



/******************************************************************************* VALIDAR SESION ******************************************************************************************************* */

function agregarUsuario(correo, contrasenia) {
    let sesion = JSON.parse(localStorage.getItem('sesionExistente')) || [];

    const sesionIniciada = sesion.find(item => item.email == correo);

    if (sesionIniciada) {
        return false;
    }else{
        sesion.push({ email: correo, contraseña: contrasenia});
        localStorage.setItem('sesionExistente', JSON.stringify(sesion));
        return true;
    }
}


function validarSesion(){
    const jsonUsuarios = localStorage.getItem('Usuarios');
    var correo = document.getElementById('correo').value;
    var contrasenia = document.getElementById('contraseñaSesion').value;
    var dat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var esMail = dat.test(correo);
    var encontrado = false;
    var contEncontrada = false;


    if(jsonUsuarios){
    const usuarios = JSON.parse(jsonUsuarios);
    if(esMail){
        for(let i=0; i<usuarios.length; i++){
            const usuario = usuarios[i];
            if (usuario.email === correo){
                var campo = document.getElementById('correo');
                var errorElement = document.getElementById('correo-error');
                errorElement.textContent = '';
                campo.style.borderColor = '';
                encontrado = true;
            }
        }
    }

    if(!contEncontrada){
        for(let i=0; i<usuarios.length; i++){
            const usuario = usuarios[i];
            if (usuario.contraseña === contrasenia){
                var campo = document.getElementById('contraseñaSesion');
                var errorElement = document.getElementById('contraseñaSesion-error');
                errorElement.textContent = '';
                campo.style.borderColor = '';
                contEncontrada = true;
            }

    }
}

}
    if(contEncontrada && encontrado){
        if (!agregarUsuario(correo, contrasenia)){
            marcarCampoInvalido('correo', 'Ingrese otro email.');
            marcarCampoInvalido('contraseñaSesion', 'Ingrese otra contraseña.');
            alert('Este usuario ya inició sesión.');
            return false;
        }else{
        window.location.href = 'http://127.0.0.1:5500/paginaPrincipal.html';
        alert('SESION INICIADA');
        return true;
        }
    }else{
        marcarCampoInvalido('correo', 'Este dato no es valido.');
        marcarCampoInvalido('contraseñaSesion', 'Este dato no es valido.');
        return false;
    }
}

/************************************************************************* CARRITO *********************************************************************************** */


// Lista de productos simulada
const misProductos = [
    { id: 1, producto: 'Notebook X515EA', precio: 729000, imagen: 'img1.webp', descripcion: 'Notebook X515EA 15.6" color slate grey 8GB de Ram - 256GB SSD - Intel Core i3'},
    { id: 2, producto: 'Computadora Completa', precio: 452557, imagen: 'img2.webp', descripcion: 'Computadora Completa Intel Core I5 16 Gb 480 Ssd Monitor 19'},
    { id: 3, producto: 'Smart Tv 50 LG', precio: 699999, imagen: 'img3.webp', descripcion: 'Smart Tv 50 LG 50ur8750psa Uhd 4k Ai Thinq'},
    { id: 4, producto: 'Apple iPhone', precio: 1169990, imagen: 'img4.webp', descripcion: 'Apple iPhone 11 (128 GB) - Blanco'},
    { id: 5, producto: 'PlayStation 4 Slim', precio: 598218, imagen: 'img5.webp', descripcion: 'Sony PlayStation 4 Slim CUH-20 1TB Standard color negro azabache'},
    { id: 6, producto: 'Samsung Galaxy A35', precio: 879999, imagen: 'img6.webp', descripcion: 'Teléfono celular Samsung Galaxy A35 5g, cámara triple de hasta 50 MP, pantalla 6.6, 256 GB, azul oscuro'}
];



const jsonProductos = JSON.stringify(misProductos);
localStorage.setItem('productos', jsonProductos);




function agregarCarrito(id, precio) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productoEnCarrito = cart.find(item => item.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
        productoEnCarrito.total += precio;
    } else {
        cart.push({ id, precio, cantidad: 1, total: precio });
    }
    localStorage.setItem('cart', JSON.stringify(cart));

    mostrarCarrito(cart);
    calcularTotal(cart);
    
}


function eliminarProducto(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cart.findIndex(item => item.id === id);
    if (index !== -1) {
        if (cart[index].cantidad > 1) {
            cart[index].cantidad--;
            cart[index].total -= cart[index].precio;
        } else {
            cart.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        
        mostrarCarrito(cart);
        calcularTotal(cart);
    }
}



function calcularTotal(cart) {
    const totalAmountElement = document.getElementById('total-amount');
    let totalAmount = 0;
    cart.forEach(item => {
        totalAmount += item.total;
    });
    totalAmountElement.textContent = '$' + totalAmount.toLocaleString();
}


function mostrarCarrito(cart) {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';


    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>El carrito está vacío</p>';
    } else {
        cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <table>
            <tr>
            <td><img style="width: 150px; height: 120px; padding-left: 20px; padding-top: 20px; padding-bottom: 20px;" src="${misProductos[item.id-1].imagen}"></td>
            <td style="padding-left: 100px;" >
                        <p>${misProductos[item.id - 1].producto}. <br><u><b>x ${item.cantidad}</b><br> $${item.total.toLocaleString()}</u></p>
                        <button class="buttonCarrito" onclick="eliminarProducto(${item.id})">Eliminar</button>
            </td>
            </tr>
            </table>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
}
}


function comprar() {
    localStorage.removeItem('cart');
    // Actualizar la visualización del carrito
    mostrarCarrito([]);
    // Modificar el total
    const totalAmountElement = document.getElementById('total-amount');
    totalAmountElement.textContent = '$0';
    alert('¡Compra realizada con éxito!');
}
