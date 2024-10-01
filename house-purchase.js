const buyBtnSfx = new Audio('sfx/buy-btn-sfx.mp3')// buy button sound
const sellBtnSfx = new Audio('sfx/sell-btn-sfx.mp3')// sell button sound
const buyBtns = document.querySelectorAll('#buyBtn') // buy buttons
const sellBtns = document.querySelectorAll('#sellBtn')// sell buttons
const blurBg = document.querySelector(".blur-background")
const alertBuy = document.querySelector('.alertbuy')
const noBtn = document.getElementById('no')

// house name database ---------------------------------------
const houseNameDB = {
    'names' : ['smallhouse1','smallhouse2','smallhouse3','mediumhouse1','mediumhouse2','mediumhouse3','largehouse1','largehouse2','largehouse3']
}
// -----------------------------------------------------------

// buy button event
buyBtns.forEach(btn => {
    btn.addEventListener('click', (event)=>{
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


function buyHouse(houseName){
    if (localStorage.getItem('balance') >= localStorage.getItem(houseName)){
        pass;
    }
}