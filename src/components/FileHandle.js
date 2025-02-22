import GUI from "./GUI";
import Model from "./Model";

class FileHandle {

    model
    _scene

    constructor(scene) {
        this._scene = scene
        this.model = new Model(this._scene)
    }

    async selectModelFromInput(event) {

        const files = event.target.files;
        if (files.length === 0) {
            console.log('Nenhum arquivo selecionado.');
            return;
        }

        const file = files[0];
        const reader = new FileReader();

        reader.onload = async (e) => {
            const arrayBuffer = e.target.result;
            this.model.loadModel(arrayBuffer)
        };

        reader.readAsArrayBuffer(file);
    }

    base64ToArrayBuffer(base64) {
        let binaryString = atob(base64);
        let bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }
}

export default FileHandle