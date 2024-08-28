import { alertAMsg } from "./utills.js"

const nexgenStockContainer = document.querySelector(".nexgen-stock")
const ecogenixStockContainer = document.querySelector(".ecogenix-stock")
const greenpowerStockContainer = document.querySelector(".greenpower-stock")
const ariaapparelStockContainer = document.querySelector(".ariaapparel-stock")

// click event div


export const nexgenhomediv = document.querySelector(".nexgen")
export const ecogenixhomediv = document.querySelector(".ecogenix")
export const greenpowerhomediv = document.querySelector(".greenpower")
export const ariaapparelhomediv = document.querySelector(".ariaapparel")


// close button 
export const nexgenCloseBtn = document.querySelector(".nexgen-close")
export const ecogenixCloseBtn = document.querySelector(".ecogenix-close")
export const greenpowerCloseBtn = document.querySelector(".greenpower-close")
export const ariaapparelCloseBtn = document.querySelector(".ariaapparel-close")


// item to update
//price
const nexgenPriceDisplay = document.querySelector(".nexgen-stocktab-price")
const ecogenixPriceDisplay = document.querySelector(".ecogenix-stocktab-price")
const greenpowerPriceDisplay = document.querySelector(".greenpower-stocktab-price")
const ariaapparelPriceDisplay = document.querySelector(".ariaapparel-stocktab-price")


// quatity selecting input box
const nexgenQtySelectingBox = document.querySelector(".nexgen-qty-selector"),
ecogenixQtySelectingBox = document.querySelector(".ecogenix-qty-selector"),
greenpowerQtySelectingBox = document.querySelector(".greenpower-qty-selector"),
ariaapparelQtySelectingBox = document.querySelector(".ariaapparel-qty-selector")

const inputBoxs = {'nexgen':nexgenQtySelectingBox, 
            'ecogenix':ecogenixQtySelectingBox, 
            'greenpower':greenpowerQtySelectingBox, 
            'ariaapparel':ariaapparelQtySelectingBox
        }

// quantity selecting function 
function selectQuantity(companiyName, direction){
    let valuetoincreament = eval(inputBoxs[companiyName].value+direction+"1")
    let maxQtyValue = maxBuyable(companiyName)
    if (valuetoincreament <0){
        alertAMsg("Quantity is zero")
        return
    }else if (valuetoincreament > maxQtyValue){
        alertAMsg("You doesn't have enough balance to buy stock more than "+maxQtyValue)
        return
    }
    inputBoxs[companiyName].value = valuetoincreament
    
}


// function to open stocks tab respectively
export function displayStockTab(target){
    if (target == "nexgen"){
        nexgenStockContainer.style.display = "flex";
        nexgenPriceDisplay.innerHTML = '₹'+localStorage.getItem("nexgenCurrentPrice")
    }else if (target == "ecogenix"){
        ecogenixStockContainer.style.display = "flex"
        ecogenixPriceDisplay.innerHTML = '₹'+localStorage.getItem("ecogenixCurrentPrice")
    }else if (target == "greenpower"){
        greenpowerStockContainer.style.display = "flex"
        greenpowerPriceDisplay.innerHTML = '₹'+localStorage.getItem("greenpowerCurrentPrice")
    }else if (target == "ariaapparel"){
        ariaapparelStockContainer.style.display = "flex"
        ariaapparelPriceDisplay.innerHTML = '₹'+localStorage.getItem("ariaapparelCurrentPrice")
    }
}

// function to close stock tab
export function hideStockTab(target){
    if (target == "nexgen"){
        nexgenStockContainer.style.display = "none"
    }else if (target == "ecogenix"){
        ecogenixStockContainer.style.display = "none"
    }else if (target == "greenpower"){
        greenpowerStockContainer.style.display = "none"
    }else if (target == "ariaapparel"){
        ariaapparelStockContainer.style.display = "none"
    }
}

function maxBuyable(companiyName){
    let maxBuyableQty = Math.floor(parseInt(localStorage.getItem('balance')/parseInt(localStorage.getItem(companiyName+'CurrentPrice'))))
    return maxBuyableQty
}

// max buyable 
const maxBuyableBtn = document.querySelectorAll("#max-buyable")
// nexgen max buyable event
maxBuyableBtn[0].addEventListener('click', ()=>{
    inputBoxs['nexgen'].value = maxBuyable('nexgen')
})

//ecogenix max buyable event
maxBuyableBtn[1].addEventListener('click', ()=>{
    inputBoxs['ecogenix'].value = maxBuyable('ecogenix')
})

// greenpower max buyable event
maxBuyableBtn[2].addEventListener('click', ()=>{
    inputBoxs['greenpower'].value = maxBuyable('greenpower')
})

// ariaapparel max buyable event
maxBuyableBtn[3].addEventListener('click', ()=>{
    inputBoxs['ariaapparel'].value = maxBuyable('ariaapparel')
})


const increaseBtn = document.querySelectorAll("#increase") // selects all increase btn and store as []
const decreaseBtn = document.querySelectorAll("#decrease")

// nexgen quantity increase event
increaseBtn[0].addEventListener("click", ()=>{
    selectQuantity('nexgen', '+')
})
// nexgen quantity decrease event
decreaseBtn[0].addEventListener("click", ()=>{
    selectQuantity('nexgen', '-')
})

// ecogenix quantity increase event
increaseBtn[1].addEventListener("click", ()=>{
    selectQuantity('ecogenix', '+')
})
// ecogenix quantity decrease event
decreaseBtn[1].addEventListener("click", ()=>{
    selectQuantity('ecogenix', '-')
})

// greenpower quantity increase event
increaseBtn[2].addEventListener("click", ()=>{
    selectQuantity('greenpower', '+')
})
// greenpower quantity decrease event
decreaseBtn[2].addEventListener("click", ()=>{
    selectQuantity('greenpower', '-')
})

// ariaapparel quantity increase event
increaseBtn[3].addEventListener("click", ()=>{
    selectQuantity('ariaapparel', '+')
})
// ariaapparel quantity decrease event
decreaseBtn[3].addEventListener("click", ()=>{
    selectQuantity('ariaapparel', '-')
})
