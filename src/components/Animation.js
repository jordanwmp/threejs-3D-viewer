import { AnimationMixer, Clock } from 'three';
import animationMixer from '../helpers/animationMixer';
import GUI from './GUI';

class Animation {

    GUI;

    constructor(scene) {
        this.scene = scene;
        // this.mixer = null;
        animationMixer.mixer = null
        this.clock = new Clock();
        this.actions = [];
        this.GUI = new GUI()
    }

    initialize(gltf, timeScale = 0.5) {
        this.actions = []
        this.GUI.clearListAnimation()

        if (gltf.animations && gltf.animations.length > 0) {
            animationMixer.mixer = new AnimationMixer(gltf.scene); // Use `gltf.scene` para criar o mixer

            gltf.animations.forEach((clip) => {
                const action = animationMixer.mixer.clipAction(clip);
                action.timeScale = timeScale
                this.actions.push(action);
            });

        }

        animationMixer.action = this.actions
        this.GUI.createAnimationList(animationMixer.action)

    }

    playAll() {
        this.actions.forEach((action) => {
            action.play();
        });
    }

    update() {
        if (animationMixer.mixer) {
            const delta = this.clock.getDelta();
            animationMixer.mixer.update(delta);
        }
    }

    stopAll() {
        this.actions.forEach((action) => {
            action.stop();
        });
    }
}

export default Animation;
