import * as THREE from 'three';
import Setup from "./Setup";
import adjustPos from '../helpers/adjustePos';

class Helper extends Setup{
    _scene;
    constructor(scene)
    {
        super()
        this._scene = scene
    }

    gridHelper(size = 4) {
        const gridHelper = new THREE.GridHelper(size, size * 2);
        gridHelper.position.x = adjustPos.x
        this._scene.add(gridHelper);
    }

    axisHelper(size = 4) {
        const axesHelper = new THREE.AxesHelper(size);
        this._scene.add(axesHelper);
    }
}

export default Helper