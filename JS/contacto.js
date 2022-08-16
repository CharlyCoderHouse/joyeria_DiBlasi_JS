
const enviar = document.getElementById('enviaContacto');
enviar.addEventListener('click', (e) => {
    
    // previene el evento del boton SUBMIT
    e.preventDefault()
    
/*     const myInputName = document.getElementById('nombreCont')
    const myInputLastName = document.getElementById('apellidoCont')
    const myInputMail = document.getElementById('emailCont')
    // ACA hay que verificar los datos si estan completos
    if (myInputName.value === "" || myInputLastName.value === "" || myInputMail.value === "" ) {
        return false;
    } */

    emailjs.sendForm('service_hlsh5m4','template_73n1cek', '#myForm')
	.then(function(response) {
	   console.log('SUCCESS!', response.status, response.text);
       Swal.fire(
        'Contacto enviado',
        'Muchas gracias por su mensaje, en breve nos contactaremos con usted.',
        'success'
      );
	}, function(err) {
	   console.log('FAILED...', err);
	});
});