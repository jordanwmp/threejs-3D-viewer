import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

class Setup {

    _renderer;
    _scene;
    _camera;
    _light;
    _orbit;
    _ambientLight;

    constructor() {
        this.init();
        this.resize();
    }

    async init() {
        this.renderer();
        this.scene();
        this.camera();
        this.lights();
        this.orbit();
    }

    orbit() {
        this._orbit = new OrbitControls(this._camera, this._renderer.domElement);
        this._orbit.enableDamping = true
        this._orbit.minDistance = 5
        this._orbit.maxDistance = 15
        this._orbit.enablePan = false
        this._orbit.maxPolarAngle = (Math.PI / 2) - 0.05
        this._orbit.update();
    }

    camera() {
        this._camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        this._camera.position.y = 0.3;
        this._camera.position.z = 1;
        this._camera.position.x = 0;
    }

    scene() {
        this._scene = new THREE.Scene();
    }

    renderer() {
        this._renderer = new THREE.WebGLRenderer({ antialias: true });
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this._renderer.setClearColor(0xf7f7f7)
        document.body.appendChild(this._renderer.domElement);
    }

    lights() {
        // Adicionar luz direcional
        this._light = new THREE.DirectionalLight(0xffffff, 1);
        this._light.position.set(5, 10, 7.5);
        this._scene.add(this._light);

        // Adicionar luz ambiente
        this._ambientLight = new THREE.AmbientLight(0x404040); // Cor de iluminação ambiente
        this._scene.add(this._ambientLight);
    }

    resize() {
        window.addEventListener('resize', () => {
            this._camera.aspect = window.innerWidth / window.innerHeight;
            this._camera.updateProjectionMatrix();
            this._renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
}

export default Setup;
