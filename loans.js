const applyBtnSfx = new Audio('sfx/buy-btn-sfx.mp3')// buy button sound
const applyBtns = document.querySelectorAll(".container button")


applyBtns[0].addEventListener("click", () => {
    applyBtnSfx.play()
    
})

applyBtns[1].addEventListener("click", () => {
    applyBtnSfx.play()
})

applyBtns[2].addEventListener("click", () => {
    applyBtnSfx.play()
})

