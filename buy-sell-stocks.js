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

const nexgenInceaseBtn = document.querySelector(".nexgen-increase"),
      nexgenDecreaseBtn = document.querySelector(".nexgen-decrease")
nexgenInceaseBtn.addEventListener("click", ()=>{
    selectQuantity('nexgen', '+')
})
nexgenDecreaseBtn.addEventListener("click", ()=>{
    selectQuantity('nexgen', '-')
})

// quantity selecting function 
function selectQuantity(companiyName, direction){
    let valuetoincreament = eval(inputBoxs[companiyName].value+direction+"1")
    if (valuetoincreament <0){
        return
    }
    console.log(valuetoincreament)
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