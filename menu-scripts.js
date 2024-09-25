import { setInitialValues } from "./initialize-values.js"

const howToPlayDiv = document.querySelector(".how-to-play")
const restartbtn = document.querySelector(".restart-game") // restart button

howToPlayDiv.addEventListener('click', ()=>{
    window.location.href = "how-to-play.html"
})

restartbtn.addEventListener("click", ()=>{
    setInitialValues()
    localStorage.removeItem("professionSelected")
    window.location.href = "select-profession.html"
})