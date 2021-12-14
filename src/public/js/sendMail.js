
$( document ).ready(function() {

    $('#phone').on('input', function () { 
        this.value = this.value.replace(/[^0-9]/g,'');
    });

    $( "button" ).on( "click", function(event) {
        //Previene envio recurrente
        event.preventDefault();
        
        let v_contactId = $('#contactId').val();
        let v_name = $('#name').val(); 
        let v_email = $('#email').val(); 
        let v_phone = $('#phone').val();
        let v_subject = $('#subject').val();
        let v_message = $('#message').val();

        let formData={
            contact: v_contactId,
            name: v_name,
            email: v_email,
            phone: v_phone,
            subject: v_subject,
            message: v_message
        }

        async function sendMail(formData) {

            try{

                Swal.fire({
                    title: 'Enviando datos de contacto...',
                    imageUrl: 'images/Logo/Icono C.png',
                    imageHeight: 100,
                    text: 'Espere un momento por favor, su solicitud se está enviando.',
                    confirmButtonColor: "#AC221D", 
                    confirmButtonText: 'OK',
                    allowOutsideClick: false
                  });
    
                Swal.showLoading();

                const result = await axios.post('/correo', formData);

                //console.log(result);
    
                Swal.close();
    
                const {status} = result;
    
                if(status === 200){
                    
                    Swal.fire({
                        title: 'Solicitud de contacto enviada!',
                        text: 'Hemos recibido tu solicitud, en breve te contactaremos.',
                        icon: 'success',
                        imageUrl: 'images/Logo/Icono C.png',
                        imageHeight: 100,
                        confirmButtonColor: "#AC221D", 
                        confirmButtonText: 'OK',
                        allowOutsideClick: false
                    }).then((resultado)=>{
                        $('#name').val(''); 
                        $('#email').val(''); 
                        $('#phone').val('');
                        $('#subject').val('');
                        $('#message').val('');
                    });
                    
                }else{
                    Swal.fire({
                        title: 'Error '+status+'!!! ',
                        text: 'Existe un problema para realizar el envío del mensaje.',
                        icon: 'error',
                        confirmButtonColor: "#AC221D", 
                        confirmButtonText: 'OK',
                        allowOutsideClick: false
                    });
                }

            }catch(e){
                Swal.fire({
                    title: 'Error!',
                    text: 'Ah ocurrido un error.',
                    icon: 'error',
                    confirmButtonColor: "#AC221D", 
                    confirmButtonText: 'OK',
                    allowOutsideClick: false
                });
            }
        }
            
        sendMail(formData);

    });       

});



