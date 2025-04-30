import React, { useEffect, useRef } from 'react';
import Dropzone from 'dropzone';

const DropzoneComponent = ({ onImageUpload }) => {
    const dropzoneRef = useRef(null);

    useEffect(() => {
        Dropzone.autoDiscover = false; // Desactivar la detección automática

        const dropzone = new Dropzone(dropzoneRef.current, {
            url: "/upload", // Cambia esta URL al endpoint donde procesas las imágenes
            dictDefaultMessage: "Sube aquí tu imagen",
            acceptedFiles: ".png, .jpg, .jpeg, .gif",
            addRemoveLinks: true,
            dictRemoveFile: "Borrar archivo",
            maxFiles: 1,
            uploadMultiple: false,

            init: function () {
                const existingImage = document.querySelector('[name="imagen"]').value.trim();
                if (existingImage) {
                    const mockFile = {
                        size: 1234,
                        name: existingImage,
                    };

                    this.options.addedfile.call(this, mockFile);
                    this.options.thumbnail.call(this, mockFile, `/uploads/${mockFile.name}`);
                    mockFile.previewElement.classList.add('dz-success', 'dz-complete');
                }
            },
        });

        dropzone.on('success', (file, response) => {
            document.querySelector('[name="imagen"]').value = response.imagen;
            if (onImageUpload) {
                onImageUpload(response.imagen);
            }
        });

        dropzone.on('removedfile', () => {
            document.querySelector('[name="imagen"]').value = '';
            if (onImageUpload) {
                onImageUpload('');
            }
        });

        return () => {
            dropzone.destroy(); // Limpia el Dropzone al desmontar el componente
        };
    }, [onImageUpload]);

    return <div className="dropzone" ref={dropzoneRef}></div>;
};

export default DropzoneComponent;
