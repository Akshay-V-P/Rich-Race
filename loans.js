

const applyBtnSfx = new Audio('sfx/buy-btn-sfx.mp3')// buy button sound
const applyBtns = document.querySelectorAll(".container button")

let closeDate = JSON.parse(localStorage.getItem('loanCloseDate'))

if (closeDate[0] === Number(localStorage.getItem('year')) && closeDate[1] === Number(localStorage.getItem('MonthCount'))) {
    localStorage.setItem('expense', (Number(localStorage.getItem('expense') - 6166)))
    localStorage.setItem('sbiloanActive', 'no')
}


applyBtns[0].addEventListener("click", () => {
    applyBtnSfx.play()
    if (localStorage.getItem('sbiloanActive') === 'no') {
        console.log("here")
        let yearToPayoff = Number(localStorage.getItem('year'))
        let monthToPayoff = Number(localStorage.getItem('MonthCount'))
        yearToPayoff = yearToPayoff + 4
        let emiAmount = 6166
        localStorage.setItem("loanCloseDate", JSON.stringify([yearToPayoff, monthToPayoff]))
        localStorage.setItem('balance', Number(localStorage.getItem('balance')) + 200000)
        localStorage.setItem('expense', Number(localStorage.getItem('expense')) + emiAmount)
        localStorage.setItem('sbiloanActive', 'yes')
    } else {
        console.log("already have loan");
        
    }
})

applyBtns[1].addEventListener("click", () => {
    applyBtnSfx.play()
})

applyBtns[2].addEventListener("click", () => {
    applyBtnSfx.play()
})

