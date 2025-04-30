import React from 'react';
import ReactDOM from 'react-dom';
import DropzoneComponent from './components/DropzoneComponent';

const App = () => {
    const handleImageUpload = (image) => {
        console.log('Imagen subida:', image);
    };

    return (
        <div>
            <h1>Subir Imagen</h1>
            <DropzoneComponent onImageUpload={handleImageUpload} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('app'));
