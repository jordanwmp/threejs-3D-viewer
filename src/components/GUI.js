import animationMixer from "../helpers/animationMixer"

class GUI {

  containerAnimation = document.querySelector('.sidebar__animations')
  animationList = document.querySelector('.animations__list')

  constructor() {
    this.setVisibility(false)
  }

  createAnimationList(_animationsList) {
    // this.clearListAnimation()
    console.log('ANIM 2 ', _animationsList)
    this.setVisibility(false)

    if (_animationsList.length == 0) {
      const li = this.createLI('No animation found', null)
      this.animationList.appendChild(li)
    }
    else {
      _animationsList.forEach((item, index) => {
        const li = this.createLI(item._clip.name, animationMixer.action[index].isRunning())//isRunning()
        this.animationList.appendChild(li)
      })
      this.eventListener()
    }

    this.setVisibility(true)
  }

  createLI(text, isPlaying) {
    const icon = this.seticon(isPlaying)
    const li = document.createElement('li')
    li.classList.add('animations__item')
    li.innerText = text
    li.appendChild(icon)
    return li
  }

  clearListAnimation() {

    console.log('ACTION', animationMixer.action)
    console.log('MIXER', animationMixer.mixer)

    animationMixer.action = null
    animationMixer.mixer = null
    this.animationList.innerHTML = ''
  }

  setVisibility(show) {
    this.containerAnimation.style.display = show ? 'block' : 'none'
  }

  seticon(isPlaying) {

    const icon = document.createElement('i')
    icon.classList.add('bi')

    if (isPlaying == undefined) {
      icon.classList.add(`bi-backspace-reverse`)
    } else if (isPlaying) {
      icon.classList.add(`bi-play`)
    } else {
      icon.classList.add(`bi-stop`)
    }

    return icon
  }

  changeIcon(liElement) {
    const iElement = liElement.querySelector('i');
    iElement.style.pointerEvents = 'none';
    const biPlay = iElement.classList.contains('bi-play')
    const biStop = iElement.classList.contains('bi-stop')

    if (biPlay) {
      iElement.classList.remove('bi-play');
      iElement.classList.add('bi-stop');
    } else if (biStop) {
      iElement.classList.remove('bi-stop');
      iElement.classList.add('bi-play');
    }

  }


  eventListener() {
    const items = this.animationList.querySelectorAll('.animations__item')
    items.forEach((item, index) => {
      item.addEventListener('click', (ev) => {

        if (animationMixer.action && animationMixer.action[index].isRunning()) {
          animationMixer.action[index].stop()
        }
        else {// if (animationMixer.action && !animationMixer.action[index].isRunning()) 
          animationMixer.action[index].play()
        }

        this.changeIcon(item)

      })
    })
  }


}

export default GUI