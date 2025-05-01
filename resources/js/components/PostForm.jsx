import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

export default function PostForm({ csrfToken, routeStore, routeImageStore }) {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState('');

    const handleDrop = (acceptedFiles) => {
        const formData = new FormData();
        formData.append('file', acceptedFiles[0]);
        formData.append('_token', csrfToken);

        fetch(routeImageStore, {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => setImagen(data.imagen || ''))
            .catch((error) => console.error('Error uploading image:', error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('descripcion', descripcion);
        formData.append('imagen', imagen);
        formData.append('_token', csrfToken);

        fetch(routeStore, {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Post created:', data);
                // Redirige o muestra un mensaje de éxito
            })
            .catch((error) => console.error('Error creating post:', error));
    };

    return (
        <div className="md:flex md:items-center">
            <div className="md:w-1/2 px-10">
                <Dropzone onDrop={handleDrop}>
                    {({ getRootProps, getInputProps }) => (
                        <div
                            {...getRootProps()}
                            className="dropzone border-dashed border-2 w-full h-96 rounded flex flex-col justify-center items-center"
                        >
                            <input {...getInputProps()} />
                            <p>Arrastra o selecciona una imagen aquí.</p>
                        </div>
                    )}
                </Dropzone>
            </div>

            <div className="md:w-1/2 p-10 bg-white rounded-lg shadow-xl mt-10 md:mt-0">
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="titulo" className="mb-2 block uppercase text-gray-500 font-bold">
                            Titulo
                        </label>
                        <input
                            id="titulo"
                            name="titulo"
                            type="text"
                            placeholder="Titulo de la publicación"
                            className="border p-3 w-full rounded-lg"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="descripcion" className="mb-2 block uppercase text-gray-500 font-bold">
                            Descripción
                        </label>
                        <textarea
                            id="descripcion"
                            name="descripcion"
                            placeholder="Descripción de la publicación"
                            className="border p-3 w-full rounded-lg"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </div>

                    <input type="hidden" name="imagen" value={imagen} />

                    <button
                        type="submit"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 transition-colors cursor-pointer uppercase font-bold w-full p-3 text-white rounded-lg"
                    >
                        Crear Publicación
                    </button>
                </form>
            </div>
        </div>
    );
}
