import { setInitialValues } from "./initialize-values.js"

const howToPlayDiv = document.querySelector(".how-to-play")
const restartbtn = document.querySelector(".restart-game") // restart button
const realEstateBtn = document.querySelector('.house-purchase')
const feedbackBtn = document.querySelector('.feedback')
const bankDiv = document.querySelector(".bank")

howToPlayDiv.addEventListener('click', ()=>{
    localStorage.setItem('helpNeeded', false)
    window.location.href = "how-to-play.html"
})

restartbtn.addEventListener("click", ()=>{
    setInitialValues()
    localStorage.removeItem("professionSelected")
    window.location.href = "select-profession.html"
})

realEstateBtn.addEventListener('click', ()=>{
    window.location.href = "house-purchase.html"
})

feedbackBtn.addEventListener('click', () => {
    localStorage.setItem('wroteToDev', true)
    window.location.href = "https://testimonial.to/rich-race"
})

bankDiv.addEventListener("click", () => {
    window.location.href = "loans.html"
})