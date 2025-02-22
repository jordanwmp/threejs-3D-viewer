import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Animation from './Animation';

class Setup {

    _renderer;
    _scene;
    _camera;
    _light;
    _orbit;
    _ambientLight;
    animation

    constructor() {
        this.init();
        this.resize();
        this.startAnimation();
        this.animation = new Animation(this._scene)
    }

    async init() {
        this.renderer();
        this.scene();
        this.camera();
        this.lights(); // Adicionar a função para configurar as luzes
        this.orbit();
        this.startAnimation();
    }

    startAnimation() {
        this._renderer.setAnimationLoop(() => this.animate());
    }

    orbit() {
        this._orbit = new OrbitControls(this._camera, this._renderer.domElement);
        this._camera.position.set(0, 3, 4);
        this._orbit.update();
    }

    camera() {
        this._camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
    }

    scene() {
        this._scene = new THREE.Scene();
    }

    renderer() {
        this._renderer = new THREE.WebGLRenderer({ antialias: true });
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        const container = document.querySelector('.container__visualizador');
        // document.body.appendChild(this._renderer.domElement);
        container.appendChild(this._renderer.domElement);
        this._renderer.setClearColor(0xb7ded2);
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

    animate() {
        this.animation.update()
        this._renderer.render(this._scene, this._camera);
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
