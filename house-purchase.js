// import { displayBalance } from "./game-script.js"
import { alertAMsg, toCurrrency } from "./utills.js"

const buyBtnSfx = new Audio('sfx/buy-btn-sfx.mp3')// buy button sound
const sellBtnSfx = new Audio('sfx/sell-btn-sfx.mp3')// sell button sound
const buyBtns = document.querySelectorAll('#buyBtn') // buy buttons
const sellBtns = document.querySelectorAll('#sellBtn')// sell buttons
const blurBg = document.querySelector(".blur-background")
const alertBuy = document.querySelector('.alertbuy')
const noBtn = document.getElementById('no')
const yesBtn = document.getElementById('yes')
const priceDisplays = document.querySelectorAll('#price')
let buttonName
// house name database ---------------------------------------

// -----------------------------------------------------------

// display price
priceDisplays.forEach(priceObj =>{
    
    priceObj.innerHTML = toCurrrency(localStorage.getItem(priceObj.title)) 
})
// buy button event
buyBtns.forEach(btn => {
    btn.addEventListener('click', (event)=>{
        buttonName = event.target.name
        buyBtnSfx.play()
        blurBg.style.display = 'block'
        alertBuy.style.display = 'flex'
    })
})

// sell button event
sellBtns.forEach(btn =>{
    btn.addEventListener('click', (event)=>{
        sellBtnSfx.play()
        console.log(event.target.name);
        
    })
})

// no button event on closing alertbuy
noBtn.addEventListener('click', ()=>{
    sellBtnSfx.play()
    alertBuy.style.display = 'none'
    blurBg.style.display = 'none'
}) 

// yes button event for buying house
yesBtn.addEventListener('click', ()=>{
    buyHouse(buttonName)
    sellBtnSfx.play()
    alertBuy.style.display = 'none'
    blurBg.style.display = 'none'
})



function buyHouse(houseName){
    if (Number(localStorage.getItem('balance')) >= Number(localStorage.getItem(houseName))){
        let buyAfterbal = Number(localStorage.getItem('balance')) - Number(localStorage.getItem(houseName))
        localStorage.setItem('balance', buyAfterbal)
    }else{
        alertAMsg('Insufficent Balance')
    }
}