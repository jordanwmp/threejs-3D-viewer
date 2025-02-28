import * as THREE from 'three'

import './styles/styles.css'
import Setup from "./components/Setup"
import Helper from './components/Helper'
import CharacterController from './components/CharacterController'

const setup = new Setup()
const helper = new Helper(setup._scene)

helper.gridHelper()


const cc = new CharacterController(setup)
await cc.characterController()

// CONTROL KEYS
const keysPressed = {}
document.addEventListener('keydown', (event) => {
  if (event.shiftKey && cc.model._model) {
    // characterControls.switchRunToggle()
  } else {
    keysPressed[event.key.toLowerCase()] = true
  }
}, false);
document.addEventListener('keyup', (event) => {
  keysPressed[event.key.toLowerCase()] = false
}, false);

const clock = new THREE.Clock();

const animate = () => {
  const delta = clock.getDelta()

  try {
    if (cc.model._model) {
      cc.update(delta, keysPressed);
    }
  } catch (error) {
    console.log('Error init 2', error)
  }
  setup._orbit.update()
  setup._renderer.render(setup._scene, setup._camera);
}

const startAnimation = () => {
  setup._renderer.setAnimationLoop(() => animate());
}

startAnimation()



