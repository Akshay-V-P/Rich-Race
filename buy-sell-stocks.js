import clickBubbleSfx, { displayBalance } from "./game-script.js"
import { alertAMsg } from "./utills.js"

const nexgenStockContainer = document.querySelector(".nexgen-stock")
const ecogenixStockContainer = document.querySelector(".ecogenix-stock")
const greenpowerStockContainer = document.querySelector(".greenpower-stock")
const ariaapparelStockContainer = document.querySelector(".ariaapparel-stock")

// stock tab open div
const nexgenhomediv = document.querySelector(".nexgen")
const ecogenixhomediv = document.querySelector(".ecogenix")
const greenpowerhomediv = document.querySelector(".greenpower")
const ariaapparelhomediv = document.querySelector(".ariaapparel")

// close button 
const nexgenCloseBtn = document.querySelector(".nexgen-close")
const ecogenixCloseBtn = document.querySelector(".ecogenix-close")
const greenpowerCloseBtn = document.querySelector(".greenpower-close")
const ariaapparelCloseBtn = document.querySelector(".ariaapparel-close")


// item to update
//price
const nexgenPriceDisplay = document.querySelector(".nexgen-stocktab-price")
const ecogenixPriceDisplay = document.querySelector(".ecogenix-stocktab-price")
const greenpowerPriceDisplay = document.querySelector(".greenpower-stocktab-price")
const ariaapparelPriceDisplay = document.querySelector(".ariaapparel-stocktab-price")

//Holdings display
const holdingDisplays = document.querySelectorAll("#holding-disp")
console.log(holdingDisplays)


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
    if (valuetoincreament <0){
        alertAMsg("Quantity is zero")
        return
    }else if (valuetoincreament > 100000){
        alertAMsg("You can't Buy quantity More than 100000")
        return
    }
    inputBoxs[companiyName].value = valuetoincreament
    
}

function showHoldings(companyName,index){
    holdingDisplays[index].innerHTML = "Holdings : "+localStorage.getItem(companyName+"Holdings")
}


const stockTabChangeDisplays = document.querySelectorAll("#change")
// function to open stocks tab respectively
function displayStockTab(target){
    if (target == "nexgen"){
        nexgenStockContainer.style.display = "flex";
        nexgenPriceDisplay.innerHTML = '₹'+localStorage.getItem("nexgenCurrentPrice")
        stockTabChangeDisplays[0].innerHTML = localStorage.getItem("nexGenPriceVariation")
        stockTabChangeDisplays[0].style.color = localStorage.getItem("nexGenVariationColor")
        showHoldings("nexgen",0)
    }else if (target == "ecogenix"){
        ecogenixStockContainer.style.display = "flex"
        ecogenixPriceDisplay.innerHTML = '₹'+localStorage.getItem("ecogenixCurrentPrice")
        stockTabChangeDisplays[1].innerHTML = localStorage.getItem("ecoGenixPriceVariation")
        stockTabChangeDisplays[1].style.color = localStorage.getItem("ecoGenixVariationColor")
        showHoldings("ecogenix",1)
    }else if (target == "greenpower"){
        greenpowerStockContainer.style.display = "flex"
        greenpowerPriceDisplay.innerHTML = '₹'+localStorage.getItem("greenpowerCurrentPrice")
        stockTabChangeDisplays[2].innerHTML = localStorage.getItem("greenPowerPriceVariation")
        stockTabChangeDisplays[2].style.color = localStorage.getItem("greenPowerVariationColor")
        showHoldings("greenpower",2)
    }else if (target == "ariaapparel"){
        ariaapparelStockContainer.style.display = "flex"
        ariaapparelPriceDisplay.innerHTML = '₹'+localStorage.getItem("ariaapparelCurrentPrice")
        stockTabChangeDisplays[3].innerHTML = localStorage.getItem("ariaApparelPriceVariation")
        stockTabChangeDisplays[3].style.color = localStorage.getItem("ariaApparelVariationColor")
        showHoldings("ariaapparel",3)
    }
}

// function to close stock tab
function hideStockTab(target){
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

function maxBuyable(companyName){
    let maxBuyableQty = Math.floor(parseInt(localStorage.getItem('balance')/parseInt(localStorage.getItem(companyName+'CurrentPrice'))))
    if (maxBuyableQty > 100000){
        maxBuyableQty = 100000
    }
    return maxBuyableQty
}

const stockTabPriceDisps = document.querySelectorAll("#price-disp")
console.log(stockTabPriceDisps)

//buy stock
function buyStock(companyName, priceDispIndex){
    if (localStorage.getItem('ifExpensePaid')==='yes'){
        let maxQty = maxBuyable(companyName)
        let qtyToBuy = parseInt(inputBoxs[companyName].value);
        let broughtSomeStock = false
        if (qtyToBuy){
            if (qtyToBuy > maxQty){
                alertAMsg("Insufficiant Balance")
                return
            }
            let stockValue = parseInt(localStorage.getItem(companyName+"CurrentPrice")) * qtyToBuy;
            localStorage.setItem("balance", parseInt(localStorage.getItem("balance"))-stockValue)
            localStorage.setItem(companyName+"Holdings", parseInt(localStorage.getItem(companyName+"Holdings"))+qtyToBuy)
            displayBalance()
            inputBoxs[companyName].value = ""
            showHoldings(companyName, priceDispIndex)
            broughtSomeStock = true
            displayPriceForQty(companyName, priceDispIndex, 0)
            alertAMsg("Brought "+qtyToBuy+" "+companyName+" stocks")
        }else if (broughtSomeStock == false){
            alertAMsg("Select quantity")
        }
        return
    }else{
        alertAMsg("You haven't paid your Monthly Expenses")
    }
}

//sell stock
function sellStock(companyName, priceDispIndex){
    let maxQty = localStorage.getItem(companyName+"Holdings")
    let qtyTosell = parseInt(inputBoxs[companyName].value);
    let soldSomeStock = false
    if (qtyTosell){
        if (qtyTosell > maxQty){
            alertAMsg("You have only "+maxQty+" stocks to sell")
            return
        }
        let stockValue = parseInt(localStorage.getItem(companyName+"CurrentPrice")) * qtyTosell;
        localStorage.setItem("balance", parseInt(localStorage.getItem("balance"))+stockValue)
        localStorage.setItem(companyName+"Holdings", parseInt(localStorage.getItem(companyName+"Holdings"))-qtyTosell)
        displayBalance()
        inputBoxs[companyName].value = ""
        showHoldings(companyName, priceDispIndex)
        soldSomeStock = true
        displayPriceForQty(companyName, priceDispIndex, 0)
        alertAMsg("Sold "+qtyTosell+" "+companyName+" stocks")
    }else if (soldSomeStock == false){
        alertAMsg("Select quantity")
    }
    
    return
}

function displayPriceForQty(companieName, pTagIndex, defaultInputValue){
    console.log("im working")
    let price = parseInt(localStorage.getItem(companieName+"CurrentPrice"))*parseInt(inputBoxs[companieName].value || defaultInputValue)
    stockTabPriceDisps[pTagIndex].innerHTML = "Price : ₹"+price.toLocaleString('en')
    console.log(price)
}

const buyBtns = document.querySelectorAll("#buy")
// buy btn event
buyBtns[0].addEventListener("click", ()=>{
    clickBubbleSfx.play()
    buyStock("nexgen", 0)
})
buyBtns[1].addEventListener("click", ()=>{
    clickBubbleSfx.play()
    buyStock("ecogenix", 1)
})
buyBtns[2].addEventListener("click", ()=>{
    clickBubbleSfx.play()
    buyStock("greenpower", 2)
})
buyBtns[3].addEventListener("click", ()=>{
    clickBubbleSfx.play()
    buyStock("ariaapparel", 3)
})

const sellBtns = document.querySelectorAll("#sell")
// sell btn event
sellBtns[0].addEventListener("click", ()=>{
    sellStock("nexgen", 0)
})
sellBtns[1].addEventListener("click", ()=>{
    sellStock("ecogenix", 1)
})
sellBtns[2].addEventListener("click", ()=>{
    sellStock("greenpower", 2)
})
sellBtns[3].addEventListener("click", ()=>{
    sellStock("ariaapparel", 3)
})

// max buyable 
const maxBuyableBtn = document.querySelectorAll("#max-buyable")
// nexgen max buyable event
maxBuyableBtn[0].addEventListener('click', ()=>{
    inputBoxs['nexgen'].value = maxBuyable('nexgen')
    displayPriceForQty("nexgen", 0)
})

//ecogenix max buyable event
maxBuyableBtn[1].addEventListener('click', ()=>{
    inputBoxs['ecogenix'].value = maxBuyable('ecogenix')
    displayPriceForQty("ecogenix", 1)
})

// greenpower max buyable event
maxBuyableBtn[2].addEventListener('click', ()=>{
    inputBoxs['greenpower'].value = maxBuyable('greenpower')
    displayPriceForQty("greenpower", 2)
})

// ariaapparel max buyable event
maxBuyableBtn[3].addEventListener('click', ()=>{
    inputBoxs['ariaapparel'].value = maxBuyable('ariaapparel')
    displayPriceForQty("ariaapparel", 3)
})


// Max sellable btns
const maxSellableBtn = document.querySelectorAll("#max-sellable")

//nexgen max sellable event
maxSellableBtn[0].addEventListener("click", ()=>{
    inputBoxs['nexgen'].value = localStorage.getItem('nexgenHoldings')
    displayPriceForQty('nexgen', 0)
})
//nexgen max sellable event
maxSellableBtn[1].addEventListener("click", ()=>{
    inputBoxs['ecogenix'].value = localStorage.getItem('ecogenixHoldings')
    displayPriceForQty('ecogenix', 1)
})
//nexgen max sellable event
maxSellableBtn[2].addEventListener("click", ()=>{
    inputBoxs['greenpower'].value = localStorage.getItem('greenpowerHoldings')
    displayPriceForQty('greenpower', 2)
})
//nexgen max sellable event
maxSellableBtn[3].addEventListener("click", ()=>{
    inputBoxs['ariaapparel'].value = localStorage.getItem('ariaapparelHoldings')
    displayPriceForQty('ariaapparel', 3)
})



const increaseBtn = document.querySelectorAll("#increase") // selects all increase btn and store as []
const decreaseBtn = document.querySelectorAll("#decrease")

// nexgen quantity increase event
increaseBtn[0].addEventListener("click", ()=>{
    selectQuantity('nexgen', '+')
    displayPriceForQty("nexgen", 0)
})
// nexgen quantity decrease event
decreaseBtn[0].addEventListener("click", ()=>{
    selectQuantity('nexgen', '-')
    displayPriceForQty("nexgen", 0)
})

// ecogenix quantity increase event
increaseBtn[1].addEventListener("click", ()=>{
    selectQuantity('ecogenix', '+')
    displayPriceForQty("ecogenix", 1)
})
// ecogenix quantity decrease event
decreaseBtn[1].addEventListener("click", ()=>{
    selectQuantity('ecogenix', '-')
    displayPriceForQty("ecogenix", 1)
})

// greenpower quantity increase event
increaseBtn[2].addEventListener("click", ()=>{
    selectQuantity('greenpower', '+')
    displayPriceForQty("greenpower", 2)
})
// greenpower quantity decrease event
decreaseBtn[2].addEventListener("click", ()=>{
    selectQuantity('greenpower', '-')
    displayPriceForQty("greenpower", 2)
})

// ariaapparel quantity increase event
increaseBtn[3].addEventListener("click", ()=>{
    selectQuantity('ariaapparel', '+')
    displayPriceForQty("ariaapparel", 3)
})
// ariaapparel quantity decrease event
decreaseBtn[3].addEventListener("click", ()=>{
    selectQuantity('ariaapparel', '-')
    displayPriceForQty("ariaapparel", 3)
})


// stock tab open 
nexgenhomediv.addEventListener("click", ()=>{
    clickBubbleSfx.play()
    displayStockTab("nexgen")
})
ecogenixhomediv.addEventListener("click", ()=>{
    clickBubbleSfx.play()
    displayStockTab("ecogenix")
})
greenpowerhomediv.addEventListener("click", ()=>{
    clickBubbleSfx.play()
    displayStockTab("greenpower")
})
ariaapparelhomediv.addEventListener("click", ()=>{
    clickBubbleSfx.play()
    displayStockTab("ariaapparel")
})


// close stock tab 
nexgenCloseBtn.addEventListener("click", ()=>{
    hideStockTab("nexgen")
})
ecogenixCloseBtn.addEventListener("click", ()=>{
    hideStockTab("ecogenix")
})
greenpowerCloseBtn.addEventListener("click", ()=>{
    hideStockTab("greenpower")
})
ariaapparelCloseBtn.addEventListener("click", ()=>{
    hideStockTab("ariaapparel")
})
