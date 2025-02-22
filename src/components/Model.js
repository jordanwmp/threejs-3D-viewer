import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import adjustPos from '../helpers/adjustePos';
import Animation from './Animation';
// import Setup from "./Setup";

class Model {

    _scene
    _model
    animation

    constructor(scene) {
        this._scene = scene
        this._model = null;
        this.animation = new Animation(this._scene)
    }

    loadModel(arrayBuffer) {
        const loader = new GLTFLoader();

        loader.parse(arrayBuffer, '', (gltf) => {
            this.clearModel();
            this._model = gltf.scene;
            this._model.position.x = adjustPos.x
            this.adjustScale(this._model)
            this.checkMaterial(this._model)
            this._scene.add(this._model);

            this.animation.initialize(gltf)
            this.animation.playAll()

        }, (error) => {
            console.error('An error happened', error);
        });
    }

    checkMaterial(model) {
        model.traverse((child) => {
            if (child.isMesh && child.material) {
                child.material.needsUpdate = true;
            }
        });
    }

    adjustScale(model) {
        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        box.getSize(size);

        const maxDimension = Math.max(size.x, size.y, size.z);
        const scale = 3 / maxDimension; // Ajuste o valor conforme necessário

        model.scale.set(scale, scale, scale);
    }

    clearModel() {
        if (this._model) {
            this._scene.remove(this._model);
            this._model = null;
        }
    }
}

export default Model