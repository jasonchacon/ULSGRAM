import React, { useState } from "react";
import DropzoneComponent from "./DropzoneComponent";

function App() {
    const [imagen, setImagen] = useState("");
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const handleImageUpload = (imageName) => {
        setImagen(imageName);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const csrfToken = "tu-token-csrf-aquí"; // Reemplaza con tu token real
        const routeStore = "ruta/donde/guardas/publicaciones"; // Reemplaza con tu endpoint real

        const formData = new FormData();
        formData.append("titulo", titulo);
        formData.append("descripcion", descripcion);
        formData.append("imagen", imagen);
        formData.append("_token", csrfToken);

        fetch(routeStore, {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                alert("¡Publicación creada con éxito!");
                setTitulo("");
                setDescripcion("");
                setImagen("");
            })
            .catch((error) => {
                console.error("Error al crear la publicación:", error);
            });
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Crear Publicación</h1>
            <DropzoneComponent onImageUpload={handleImageUpload} />
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-4">
                    <label htmlFor="titulo" className="block font-bold text-gray-700">
                        Título
                    </label>
                    <input
                        id="titulo"
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        placeholder="Título de la publicación"
                        className="border p-2 w-full rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="descripcion" className="block font-bold text-gray-700">
                        Descripción
                    </label>
                    <textarea
                        id="descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        placeholder="Descripción de la publicación"
                        className="border p-2 w-full rounded"
                    ></textarea>
                </div>
                <input type="hidden" name="imagen" value={imagen} />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    disabled={!imagen || !titulo || !descripcion}
                >
                    Crear Publicación
                </button>
            </form>
        </div>
    );
}

export default App;
