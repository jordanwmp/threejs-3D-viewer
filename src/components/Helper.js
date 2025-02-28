import * as THREE from 'three';


class Helper {

    _scene
    constructor(scene) {
        this._scene = scene
    }

    gridHelper(size = 50) {
        const gridHelper = new THREE.GridHelper(size, size * 2);
        this._scene.add(gridHelper);
    }

    axisHelper(size = 4) {
        const axesHelper = new THREE.AxesHelper(size);
        this._scene.add(axesHelper);
    }

}

export default Helper