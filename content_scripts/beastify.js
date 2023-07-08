// Obtener el tab activo
console.clear()
console.log('imagetable active tabs')



// Definir una variable global para almacenar el estado del toggle
var isActivated = false;

// Escuchar los mensajes enviados desde el script de default_popup
browser.runtime.onMessage.addListener(function(message) {
  if (message.isActivated !== undefined) {
    // Actualizar el estado del toggle con el nuevo valor
    isActivated = message.isActivated;

    // Imprimir el estado del toggle en la consola
    console.log('El estado del toggle es:', isActivated);

    // Realizar acciones basadas en el estado del toggle
    if (isActivated) {
      console.log('La funcionalidad está activada');
    } else {
      console.log('La funcionalidad está desactivada');
    }
  }
});




// Agregar un listener para el evento onActivated
browser.tabs.onActivated.addListener(function(activeInfo) {
  // Obtener información del tab activo
  var tabId = activeInfo.tabId;
  
  // Obtener la URL del tab activo
  browser.tabs.get(tabId)
    .then(function(tab) {
      var tabURL = tab.url;
      console.log(tabURL);

      if (esArchivoDeImagen(tabURL) && isActivated) {
        console.log('La URL es un archivo de imagen:', tabURL);

        var urlObj = new URL(tabURL);
        var fileName = urlObj.pathname.split('/').pop();

        fetch(tabURL)
          .then(function(response) {
            if (response.ok) {
              return response.blob();
            }
            throw new Error('Error en la respuesta de la solicitud de descarga');
          })
          .then(function(blob) {
            // Crear un enlace de descarga
            var link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = fileName;
            
            // Simular el clic en el enlace para iniciar la descarga
            link.click();
          })
          .catch(function(error) {
            console.error('Error al descargar el archivo:', error);
          });

      }else{
        console.log('NO es imagen');
      }

    })
    .catch(function(error) {
      console.error(error);
    });
});


function esArchivoDeImagen(url) {
  // Obtener la extensión del archivo
  var extension = url.split('.').pop().toLowerCase();
  
  // Verificar si la extensión coincide con las extensiones de imagen conocidas
  var extensionesImagen = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'gifv'];
  return extensionesImagen.includes(extension);
}