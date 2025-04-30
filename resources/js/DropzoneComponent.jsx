// resources/js/DropzoneComponent.jsx

import React, { useRef, useEffect } from "react";
import Dropzone from "dropzone";

const DropzoneComponent = () => {
  const dropzoneRef = useRef(null);

  useEffect(() => {
    const dropzone = new Dropzone(dropzoneRef.current, {
      url: "/imagenes", // Ruta de tu backend para manejar la subida de imágenes
      dictDefaultMessage: "Arrastra y suelta una imagen aquí",
      acceptedFiles: ".png, .jpg, .jpeg, .gif",
      addRemoveLinks: true,
      dictRemoveFile: "Eliminar archivo",
      maxFiles: 1,
      uploadMultiple: false,
      success: (file, response) => {
        console.log("Imagen subida con éxito:", response);
      },
      error: (file, response) => {
        console.error("Error al subir la imagen:", response);
      },
    });

    return () => {
      dropzone.destroy();
    };
  }, []);

  return <div ref={dropzoneRef} className="dropzone"></div>;
};

export default DropzoneComponent;
