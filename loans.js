import { loanDetails } from "./initialize-values.js"


const applyBtnSfx = new Audio('sfx/buy-btn-sfx.mp3')// buy button sound
const applyBtns = document.querySelectorAll(".container button")
const alertbuy = document.querySelector(".alertbuy")
const yesBtn = document.querySelector("#yes")


applyBtns[0].addEventListener("click", (e) => {
    applyBtnSfx.play()
    takeloan(e.target.name)
})

applyBtns[1].addEventListener("click", (e) => {
    applyBtnSfx.play()
    takeloan(e.target.name)
})

applyBtns[2].addEventListener("click", (e) => {
    applyBtnSfx.play()
    takeloan(e.target.name)
})

function takeloan(bankName) {
    alertbuy.style.display = "flex"
    yesBtn.addEventListener('click', () => {
        getLoan(bankName)
        alertbuy.style.display = 'none'
    })
    
}


function getLoan(bankName) {
    if (localStorage.getItem('loanActive') === 'no') {
        let yearToPayoff = Number(localStorage.getItem('year'))
        let monthToPayoff = Number(localStorage.getItem('MonthCount'))
        yearToPayoff = yearToPayoff + loanDetails[bankName][2]
        let emiAmount = loanDetails[bankName][1]
        localStorage.setItem("loanCloseDate", JSON.stringify([yearToPayoff, monthToPayoff]))
        localStorage.setItem('balance', Number(localStorage.getItem('balance')) + loanDetails[bankName][0])
        localStorage.setItem('expense', Number(localStorage.getItem('expense')) + emiAmount)
        localStorage.setItem('loanActive', 'yes')
        localStorage.setItem('loanBankName', bankName)
        let remainingAmt = (((loanDetails[bankName][0]/100)*12)*loanDetails[bankName][2])+loanDetails[bankName][0]
        localStorage.setItem('loanRemainingAmt', remainingAmt)
        
    } else {
        console.log("already have loan");
        
    }
}
