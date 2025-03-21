const MUNDO_WIDTH = 100
const MUNDO_HEIGHT = 20

const mundoElem = document.querySelector("[data-mundo]")

setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)

function setPixelToWorldScale() {
  let worldToPixelScale
  if (window.innerWidth / window.innerHeight < MUNDO_WIDTH / MUNDO_HEIGHT) {
    worldToPixelScale = window.innerWidth / MUNDO_WIDTH
  } else {
    worldToPixelScale = window.innerHeight / MUNDO_HEIGHT
  }

  mundoElem.style.width = `${MUNDO_WIDTH * worldToPixelScale}px`
  mundoElem.style.height = `${MUNDO_HEIGHT * worldToPixelScale}px`
}