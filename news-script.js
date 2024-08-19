
const backBtn = document.querySelector(".back-btn")
const nexGenDisplay = document.getElementById("nexgen")
const ecogenixDisplay = document.getElementById("ecogenix")
const greenpowerDisplay = document.getElementById("greenpower")
const ariaapparelDisplay = document.getElementById("ariaapparel")

backBtn.addEventListener("click", ()=>{
    window.location.href = "game.html"
})

nexGenDisplay.innerText = localStorage.getItem("nexGenCurrentNews")

ecogenixDisplay.innerText = localStorage.getItem("ecoGenixCurrentNews")

greenpowerDisplay.innerText = localStorage.getItem("greenPowerCurrentNews")

ariaapparelDisplay.innerText = localStorage.getItem("ariaApparelCurrentNews")



