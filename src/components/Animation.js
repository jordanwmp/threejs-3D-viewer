import * as THREE from 'three'
import { AnimationMixer } from 'three';

class Animation {

    animations
    mixer
    actions

    constructor(scene) {
        this._scene = scene;
        this.actions = new Map();
    }

    initialize(gltf, timeScale = 1) {
        if (gltf.animations && gltf.animations.length > 0) {
            this.animations = gltf.animations
            this.mixer = new AnimationMixer(gltf.scene);

            gltf.animations.filter(a => a.name != 'TPose').forEach((a) => {
                const action = this.mixer.clipAction(a);
                action.timeScale = timeScale
                this.actions.set(a.name, action)
            })
        } else {
            console.log('NO ANIMATIONS')
        }

        console.log('ACTIONS ', this.actions)
    }

    play(animation) {
        const clip = THREE.AnimationClip.findByName(this.animations, animation)
        if (clip) {
            const action = this.mixer.clipAction(clip)
            action.play()
        } else {
            console.log('Clip not found ', animation)
        }
    }

    update(delta) {
        if (this.mixer) {
            this.mixer.update(delta)
        }
    }
}

export default Animation;
