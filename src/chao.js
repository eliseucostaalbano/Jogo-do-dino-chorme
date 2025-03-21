import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomValue.js"

const VELO = .05
const chaoElems  = document.querySelectorAll("[data-chao]")

export function setUpChao() {
    setCustomProperty(chaoElems[0], "--left", 0)
     setCustomProperty(chaoElems[1], "--left", 300)
}

export function updateChao(delta, veloEscala) {
    chaoElems.forEach(chao => {
    incrementCustomProperty(chao, "--left", delta * veloEscala * VELO * -1)

    if (getCustomProperty(chao,"--left")<= -300) {
        incrementCustomProperty(chao,"--left", 600)
    }
    })
}