document.addEventListener('DOMContentLoaded', function() {
  var toggleButton = document.getElementById('toggleButton');
  var isAvailable = false;

  toggleButton.addEventListener('click', function() {
    isAvailable = !isAvailable;
    toggleButton.classList.toggle('active');
    
    if (isAvailable) {
      console.log('Variable isAvailable is now true.');
    } else {
      console.log('Variable isAvailable is now false.');
    }

    var isActivated = isAvailable;

    // Enviar un mensaje al script de background con el nuevo estado del toggle
    browser.runtime.sendMessage({ isActivated: isActivated });
  });
});

