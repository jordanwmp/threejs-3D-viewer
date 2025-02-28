
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

class Model {

    _gltf
    _model
    _scene

    constructor(scene) {
        this._model = null
        this._scene = scene
    }

    async loadModel() {
        return new Promise((res, rej) => {
            const loader = new GLTFLoader();
            loader.load('models/Soldier.glb', (gltf) => {
                this._gltf = gltf
                this._model = gltf.scene;
                const scale = 0.5
                this._model.scale.set(scale, scale, scale)
                this._scene.add(this._model);

                res(gltf)

            });
        })
    }

}

export default Model