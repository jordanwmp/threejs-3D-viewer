import * as THREE from 'three'
import Model from './Model'
import Animation from './Animation'
import { A, D, DIRECTIONS, S, W } from '../helpers/keys'

class CharacterController {

  _setup
  model
  animation

  // state
  toggleRun = true
  currentAction

  // temporary data
  walkDirection = new THREE.Vector3()
  rotateAngle = new THREE.Vector3(0, 1, 0)
  rotateQuarternion = new THREE.Quaternion()
  cameraTarget = new THREE.Vector3()

  // constants
  fadeDuration = 0.2
  runVelocity = 1
  walkVelocity = 0.5

  constructor(setup) {
    this._setup = setup
    this.model = new Model(setup._scene)
    this.animation = new Animation(setup._scene)
    this.currentAction = 'Idle'
  }

  async characterController() {
    await this.loadModel()
    this.animation.initialize(this.model._gltf)
    this.animation.play('Idle')
    this.updateCameraTarget(0, 0)
  }

  async loadModel() {
    await this.model.loadModel()
    // .then((g) => { console.log('g', g) })
    // .catch((e) => { console.log('e ', e) })
  }

  switchRunToggle() {
    this.toggleRun = !this.toggleRun
  }

  update(delta, keysPressed) {
    const directionPressed = DIRECTIONS.some(key => keysPressed[key] == true)

    var play = '';
    if (directionPressed && this.toggleRun) {
      play = 'Run'
    } else if (directionPressed) {
      play = 'Walk'
    } else {
      play = 'Idle'
    }

    if (this.currentAction != play) {
      const toPlay = this.animation.actions.get(play)
      const current = this.animation.actions.get(this.currentAction)

      current.fadeOut(this.fadeDuration)
      toPlay.reset().fadeIn(this.fadeDuration).play();

      this.currentAction = play
    }

    this.animation.mixer.update(delta)

    if (this.currentAction == 'Run' || this.currentAction == 'Walk') {
      // calculate towards camera direction
      var angleYCameraDirection = Math.atan2(
        (this._setup._camera.position.x - this.model._model.position.x),
        (this._setup._camera.position.z - this.model._model.position.z))
      // diagonal movement angle offset
      var directionOffset = this.directionOffset(keysPressed)

      // rotate model
      this.rotateQuarternion.setFromAxisAngle(this.rotateAngle, angleYCameraDirection + directionOffset)
      this.model._model.quaternion.rotateTowards(this.rotateQuarternion, 0.2)

      // calculate direction
      this._setup._camera.getWorldDirection(this.walkDirection)
      this.walkDirection.y = 0
      this.walkDirection.normalize()
      this.walkDirection.applyAxisAngle(this.rotateAngle, directionOffset)

      // run/walk velocity
      const velocity = this.currentAction == 'Run' ? this.runVelocity : this.walkVelocity

      // move model & camera
      const moveX = this.walkDirection.x * velocity * delta
      const moveZ = this.walkDirection.z * velocity * delta
      this.model._model.position.x += moveX
      this.model._model.position.z += moveZ
      this.updateCameraTarget(moveX, moveZ)
    }
  }

  directionOffset(keysPressed) {
    var directionOffset = 0 // w

    if (keysPressed[W]) {
      if (keysPressed[A]) {
        directionOffset = Math.PI / 4 // w+a
      } else if (keysPressed[D]) {
        directionOffset = - Math.PI / 4 // w+d
      }
    } else if (keysPressed[S]) {
      if (keysPressed[A]) {
        directionOffset = Math.PI / 4 + Math.PI / 2 // s+a
      } else if (keysPressed[D]) {
        directionOffset = -Math.PI / 4 - Math.PI / 2 // s+d
      } else {
        directionOffset = Math.PI // s
      }
    } else if (keysPressed[A]) {
      directionOffset = Math.PI / 2 // a
    } else if (keysPressed[D]) {
      directionOffset = - Math.PI / 2 // d
    }

    return directionOffset
  }

  updateCameraTarget(moveX, moveZ) {
    // move camera
    this._setup._camera.position.x += moveX;
    this._setup._camera.position.z += moveZ;

    // update camera target
    const modelPosition = this.model._model.position;
    this.cameraTarget.x = modelPosition.x;
    this.cameraTarget.y = modelPosition.y;
    this.cameraTarget.z = modelPosition.z;

    this._setup._orbit.target.set(this.cameraTarget.x, this.cameraTarget.y, this.cameraTarget.z);
    this._setup._orbit.update(); // Atualizar o OrbitControls para refletir as mudanças
  }


  updateAnim(delta) {
    this.animation.update(delta)
  }

}

export default CharacterController