import { selectRandomNews } from "./calculation-scripts.js"
const newsTabRoute = document.getElementById("news-tab")

// selects price displays
const nexgenDisplay = document.getElementById("nexgen-price")
const ecogenixDisplay = document.getElementById("ecogenix-price")
const greenpowerDisplay = document.getElementById("greenpower-price")
const ariaapparelDisplay = document.getElementById("ariaapparel-price")

// selects Change displays
const nexgenChangeDisplay = document.getElementById("nexgen-change")
const ecogenixChangeDisplay = document.getElementById("ecogenix-change")
const greenpowerChangeDisplay = document.getElementById("greenpower-change")
const ariaapparelChangeDisplay = document.getElementById("ariaapparel-change")

// balance displays
const balanceRootDiv = document.querySelector(".balance-display")
const balanceHomeDisplay = document.getElementById("home-balance")
const salaryHomeDisplay = document.getElementById("home-salary")

// balance details 
const balanceDetailDiv = document.querySelector(".balance-details")
const balanceDetailClose = document.querySelector(".material-symbols-outlined")
const balanceDetailsDisplayBal = document.querySelector(".balance-disp")
const balanceDetailsSalary = document.querySelectorAll(".salary-display")

// next button
const nextBtn = document.querySelector(".next-month")

// progress display div
const progressDiv = document.querySelector(".progress-display")

// month display
const monthDisplay = document.querySelector(".month-display")


// temporary initialisation
if (localStorage.getItem('nexgenCurrentPrice')=== null){
    localStorage.setItem("nexgenCurrentPrice", 1030)
    localStorage.setItem("ecogenixCurrentPrice" , 640)
    localStorage.setItem("greenpowerCurrentPrice" , 450)
    localStorage.setItem("ariaapparelCurrentPrice" , 230)
}


// opening balance details tab
balanceRootDiv.addEventListener("click", (e)=>{
    balanceDetailDiv.style.display = "flex"
    balanceDetailsDisplayBal.innerHTML = "Balance : ₹"+localStorage.getItem("balance")
    balanceDetailsSalary.innerHTML = "Salaryy: ₹"+localStorage.getItem("salary")+"/Month"
})

// close balance details tab
balanceDetailClose.addEventListener("click", ()=>{
    balanceDetailDiv.style.display = "none"
})

// navigate to news tab
newsTabRoute.addEventListener("click", ()=>{
    window.location.href = "news-tab.html"
})

updateCurrentPrice()
updatePriceChange()
displayBalance()
monthDisplay.innerHTML = "Month : "+localStorage.getItem("MonthCount")


nextBtn.addEventListener("click", ()=>{
    nextMonth('nexGen', 'nexgenCurrentPrice')
    nextMonth('ecoGenix', 'ecogenixCurrentPrice')
    nextMonth('greenPower', 'greenpowerCurrentPrice')
    nextMonth('ariaApparel', 'ariaapparelCurrentPrice')
    updateCurrentPrice()
    updatePriceChange()

    if (localStorage.getItem("ifSalaryCollected")==="no"){// command for me : check later why false is not working
        collectSalary()
    }
    displayBalance()
    addAMonth()
    

})

// collect salary
function collectSalary(){
    let addSalary = parseFloat(localStorage.getItem("balance"))+parseFloat(localStorage.getItem("salary"))
    localStorage.setItem("balance", addSalary)
}

// add a month to count
function addAMonth(){
    localStorage.setItem("MonthCount",parseInt(localStorage.getItem("MonthCount"))+1)
    monthDisplay.innerHTML = "Month : "+localStorage.getItem("MonthCount")
}

function displayBalance(){
    balanceHomeDisplay.innerText = '₹'+localStorage.getItem("balance")
    salaryHomeDisplay.innerText = '₹'+localStorage.getItem("salary")+"/Month"
}

// update price to ui
function updateCurrentPrice(){ 
    nexgenDisplay.innerText = '₹'+localStorage.getItem("nexgenCurrentPrice")
    ecogenixDisplay.innerText = '₹'+localStorage.getItem("ecogenixCurrentPrice")
    greenpowerDisplay.innerText = '₹'+localStorage.getItem("greenpowerCurrentPrice")
    ariaapparelDisplay.innerText = '₹'+localStorage.getItem("ariaapparelCurrentPrice")
}

// updates price change 
function updatePriceChange(){
    nexgenChangeDisplay.innerText = localStorage.getItem("nexGenPriceVariation")
    nexgenChangeDisplay.style.color = localStorage.getItem("nexGenVariationColor")

    ecogenixChangeDisplay.innerText = localStorage.getItem("ecoGenixPriceVariation")
    ecogenixChangeDisplay.style.color = localStorage.getItem("ecoGenixVariationColor")

    greenpowerChangeDisplay.innerText = localStorage.getItem("greenPowerPriceVariation")
    greenpowerChangeDisplay.style.color = localStorage.getItem("greenPowerVariationColor")

    ariaapparelChangeDisplay.innerText = localStorage.getItem("ariaApparelPriceVariation")
    ariaapparelChangeDisplay.style.color = localStorage.getItem("ariaApparelVariationColor")
}

function priceVariationDisplay(companieName,changeInPrice, operator, lastPrice){
    let priceVariationPercent = (changeInPrice/lastPrice)*100
    priceVariationPercent = priceVariationPercent.toFixed(1)
    localStorage.setItem(companieName+"PriceVariation", operator+changeInPrice+" "+"("+priceVariationPercent+"%"+")") // set priceVariation in the form of eg -25 (2.5%)
    if (operator == "+"){
        localStorage.setItem(companieName+"VariationColor", "green")
    }else{
        localStorage.setItem(companieName+"VariationColor", "red")
    }
        
    
}

function nextMonth(companieName, storageName){
    let price=selectRandomNews(companieName, storageName) 
    localStorage.setItem(companieName+"CurrentNews", price[0]) // sets current news in localstorage eg name: nexGenCurrentNews
    localStorage.setItem(storageName, price[1]) // sets current price in localstorage

    priceVariationDisplay(companieName,price[2], price[3], price[4])

    let progressDisplayP = document.createElement("div") // create a p element in progress display div and show current news ;may be remove later
    progressDisplayP.classList.add("display-element")
    progressDisplayP.innerText = companieName+": "+price[0]
    progressDiv.appendChild(progressDisplayP)
}


export {displayBalance}





