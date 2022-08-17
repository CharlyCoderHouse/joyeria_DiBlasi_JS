
const enviar = document.getElementById('enviaContacto')
const myInputName = document.getElementById('nombreCont')
const myInputLastName = document.getElementById('ApellidoCont')
const myInputMail = document.getElementById('mailCont')
const myInputMensj = document.getElementById('mensaje')

enviar.addEventListener('click', (e) => {
    
    // previene el evento del boton SUBMIT
    e.preventDefault()

    // ACA hay que verificar los datos si estan completos
    if (myInputName.value==="" || myInputLastName.value==="" || myInputMail.value==="" || myInputMensj.value==="" ) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: `Hay campos incompletos! Por favor completarlos para enviar el mensaje.`,
            showConfirmButton: false,
            timer: 2000
        })
        return false;
    }

    var templateParams = {
        from_name: myInputName.value + " " + myInputLastName.value,
        to_name: myInputMail.value,
        message: myInputMensj.value,
        reply_to: "charlycoderhouse@outlook.com",
    };

    emailjs.send('service_hlsh5m4','template_73n1cek', templateParams)
	.then(function(response) {
	   console.log('SUCCESS!', response.status, response.text);
       Swal.fire(
        'Contacto enviado',
        'Muchas gracias por su mensaje, en breve nos contactaremos con usted.',
        'success'
      );
	}, function(err) {
	   console.log('FAILED...', err);
       Swal.fire({
        position: 'center',
        icon: 'error',
        title: `NO se pude enviar el correo, intente nuevamente.`,
        showConfirmButton: false,
        timer: 2000
    })
	});

    myInputName.value="";
    myInputLastName.value="";
    myInputMail.value="";
    myInputMensj.value="";

    // location.reload();
});