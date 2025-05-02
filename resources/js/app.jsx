import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Dropzone from 'dropzone';
// import App from './app'; // Gene ralmente no se importa Dropzone desde el componente principal de la aplicación

// Si tienes otros componentes, mantenlos en archivos separados e impórtalos aquí.
// Por ejemplo:
// import MyComponent from './MyComponent';

const MyDropzone = () => {
  useEffect(() => {
    // Asegúrate de que Dropzone no esté ya adjunto.
    if (Dropzone.instances.length === 0) {
      const dropzoneInstance = new Dropzone(".dropzone", {
        dictDefaultMessage: "Sube aquí tu imagen",
        acceptedFiles: ".png,.jpg,.jpeg,.gif",
        addRemoveLinks: true,
        dictRemoveFile: "Borrar archivo",
        maxFiles: 1,
        uploadMultiple: false,
        init: function () {
          this.on("success", function (file, response) {
            // Usa una ref o estado para actualizar el input del formulario, no manipulación directa del DOM
            const inputElement = document.querySelector('[name="imagen"]');
            if (inputElement) {
              inputElement.value = response.filename || response.imagen; // Maneja diferentes formatos de respuesta
            }
          });

          this.on("removedfile", function () {
             const inputElement = document.querySelector('[name="imagen"]');
              if (inputElement) {
                  inputElement.value = '';
              }
          });

          // Simula una imagen existente si hay un valor en el input oculto
          const imagenInputValue = document.querySelector('[name="imagen"]').value.trim();
          if (imagenInputValue) {
            const mockFile = {
              name: imagenInputValue,
              size: 12345, // Podrías necesitar un tamaño real si lo usas en otra parte
              type: 'image/jpeg', // Establece el tipo MIME correcto
            };

            this.displayExistingImage(mockFile, `/uploads/${imagenInputValue}`);
          }
        },
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '', //Obtén el token CSRF.
        },
      });
      // Agrega manualmente la función displayExistingImage.
      dropzoneInstance.displayExistingImage = function (mockFile, imageUrl) {
          this.emit("addedfile", mockFile);
          this.emit("thumbnail", mockFile, imageUrl);
          this.emit("complete", mockFile);
          mockFile.previewElement.classList.add("dz-success", "dz-complete");
      };
    }
  }, []);

  return (
    <div className="dropzone">
      <div className="dz-message">
        <p>Arrastra aquí la imagen o haz clic para seleccionar</p>
      </div>
    </div>
  );
};

const App = () => {
    return (
      <div>
        <MyDropzone />
        <form>
          <input type="hidden" name="imagen" />
          {/* Otros campos del formulario aquí */}
          <button type="submit">Enviar</button>
        </form>
      </div>
    )
}
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
