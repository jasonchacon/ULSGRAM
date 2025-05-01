import React, { useState } from "react";
import DropzoneComponent from "./components/DropzoneComponent";

function App() {
    const [imagen, setImagen] = useState("");

    const handleImageUpload = (imageName) => {
        setImagen(imageName);
    };

    return (
        <div>
            <h1>Subir Imagen</h1>
            <DropzoneComponent onImageUpload={handleImageUpload} />
            <input type="hidden" name="imagen" value={imagen} />
        </div>
    );
}

export default App;
