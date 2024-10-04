// import { displayBalance } from "./game-script.js"
import { toCurrrency } from "./utills.js"

const buyBtnSfx = new Audio('sfx/buy-btn-sfx.mp3')// buy button sound
const sellBtnSfx = new Audio('sfx/sell-btn-sfx.mp3')// sell button sound
const notificationSfx = new Audio('sfx/Notification-sfx.mp3')// notification sound
const buyBtns = document.querySelectorAll('#buyBtn') // buy buttons
const sellBtns = document.querySelectorAll('#sellBtn')// sell buttons
const blurBg = document.querySelector(".blur-background")
const alertBuy = document.querySelector('.alertbuy')
const noBtn = document.getElementById('no')
const yesBtn = document.getElementById('yes')
const priceDisplays = document.querySelectorAll('#price')
const alertSell = document.querySelector('.alertsell')
const sellYes = document.querySelector('.sellyes')
const sellNo = document.querySelector('.sellno')

// global var
let buttondiv
let currentBuyBtn
let currentRentBtn
let buttonName


// utills constants
const alertpopup = document.querySelector(".alertpopup")



checkHouseOwns()
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
        buttonName = event.target.name
        blurBg.style.display = 'block'
        alertSell.style.display = 'flex'
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

sellNo.addEventListener('click', ()=>{
    sellBtnSfx.play()
    alertSell.style.display = 'none'
    blurBg.style.display = 'none'
})
console.log(sellYes)
sellYes.addEventListener('click', ()=>{
    sellHouse(buttonName)
    sellBtnSfx.play()
    alertSell.style.display = 'none'
    blurBg.style.display = 'none'
})


function sellHouse(houseEvent){
    let houseName = houseEvent
    let houseOwn = JSON.parse(localStorage.getItem('houseOwns'))
    if (houseOwn.includes(houseName)== true){
        let balanceValue = Number(localStorage.getItem('balance')) + Number(localStorage.getItem(houseName))
        localStorage.setItem('balance', balanceValue)
        let indexOfData = houseOwn.indexOf(houseName)
        houseOwn.splice(indexOfData, 1)
        
        localStorage.setItem('houseOwns', JSON.stringify(houseOwn))
        alertThePopup(`<p>You sold ${houseName} for ${localStorage.getItem(houseName)}<br> <span style="color : green">Current Balance : ${localStorage.getItem('balance')}</span></p>`)
        buttondiv = document.querySelector('.'+houseName)
        currentBuyBtn = buttondiv.querySelector('.buy'+houseName)
        currentRentBtn = buttondiv.querySelector('.rent'+houseName)
        currentBuyBtn.style.display = 'block'
        currentRentBtn.style.display = 'none'
    }else{
        alertThePopup(`<p>You dosen't own this property</p>`)
    }
}


function buyHouse(houseName){
    let houseOwnData = JSON.parse(localStorage.getItem('houseOwns'))
    let dataExists 
    try {
        dataExists = houseOwnData.includes(houseName)
    } catch (error) {
        console.log('No data error :'+error)
    }
    if ( dataExists){
        alertThePopup(`<p>You have already purchased this property</p>`)
        return
    }
    
    if (Number(localStorage.getItem('balance')) >= Number(localStorage.getItem(houseName))){
        let buyAfterbal = Number(localStorage.getItem('balance')) - Number(localStorage.getItem(houseName))
        localStorage.setItem('balance', buyAfterbal)
        if (!houseOwnData){
            localStorage.setItem('houseOwns', JSON.stringify([houseName]))
        }else{
            houseOwnData.push(houseName)
            localStorage.setItem('houseOwns', JSON.stringify(houseOwnData))
            checkHouseOwns()
        }
        buttondiv = document.querySelector('.'+houseName)
        currentBuyBtn = buttondiv.querySelector('.buy'+houseName)
        currentRentBtn = buttondiv.querySelector('.rent'+houseName)
        currentBuyBtn.style.display = 'none'
        currentRentBtn.style.display = 'block'

        alertThePopup(`<p>You have purchased ${houseName} for ${toCurrrency(localStorage.getItem(houseName))}<br> <span style="color : green">Current Balance : ${toCurrrency(localStorage.getItem("balance"))}</span></p>`)
    }else{
        alertThePopup(`<p>You can't purchase this property<br><span style="color : red">Insufficiant Balance</span></p>`)
    }
}

function checkHouseOwns(){
    if (localStorage.getItem('houseOwns')== null){
        return
    }
    let houseOwn = JSON.parse(localStorage.getItem('houseOwns'))
    houseOwn.forEach((house)=>{
        buttondiv = document.querySelector('.'+house)
        let isRentBtn = buttondiv.querySelector('.rent'+house)
        if (isRentBtn != null){
            return
        }
        let buyButton = document.querySelector('.buy'+house)
        buyButton.style.display = 'none'
        let rentButton = document.createElement('button')
        rentButton.id = 'rent'
        rentButton.classList.add('rent'+house)
        rentButton.innerText = "Rent"
        rentButton.style.display = 'block'
        buttondiv.appendChild(rentButton)
        rentButton.addEventListener("click", ()=>{
            buyBtnSfx.play()
            console.log(rentButton.className)
        })
    })
}



//--------------  utills functions -----------------
function alertThePopup(displayText){
    notificationSfx.play()
    alertpopup.style.display = 'flex'
    alertpopup.innerHTML = displayText
    const buttonOk = document.createElement('button')
    buttonOk.classList.add("okbutton")
    buttonOk.innerText = 'Ok'
    alertpopup.appendChild(buttonOk)
    const okButton = document.querySelector(".okbutton")
    okButton.addEventListener('click',()=> {
        sellBtnSfx.play()
        alertpopup.style.display = 'none'
    })
}