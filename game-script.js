import { selectRandomNews } from "./calculation-scripts.js"
import { setInitialValues } from "./initialize-values.js"
import { alertAMsg, toCurrrency } from "./utills.js"
const newsTabRoute = document.getElementById("news-tab")
if (localStorage.getItem("initiallized")==null){
    localStorage.setItem("initiallized", 'no')
}
if (localStorage.getItem("initiallized")=='no'){
    setInitialValues()
}

const nameOfPlayer =  document.getElementById('nameofplayer')
nameOfPlayer.innerHTML = localStorage.getItem("name")
const popupObject = document.querySelector(".help-popup")
const popupTale = document.querySelector(".triangle")

// test zone
// ----------------------------------------------------------

// ----------------------------------------------------------

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
const balanceDetailClose = document.querySelector("#close-balance-tab")
const balanceDetailsDisplayBal = document.querySelector(".balance-disp")

// next button
const nextBtn = document.querySelector(".next-month")

// progress display div
const progressDiv = document.querySelector(".progress-display")

// month display
const monthDisplay = document.querySelector(".month-display")

const helloName = document.getElementById("hello-name")
helloName.innerHTML = "Hello, "+localStorage.getItem("name")

const profilePhoto = document.querySelector(".profile-foto img")
profilePhoto.src = localStorage.getItem("profileImgSrc")


// opening and closing menu tab 
//---------------------------------------------------
const openMenuBtn = document.querySelector('.menu-btn')
const menuDisplayDiv = document.querySelector('.menu-tab')
const closeMenuTab = document.querySelector(".close-menu")
openMenuBtn.addEventListener("click", ()=>{
    menuDisplayDiv.style.animation = "slidingUp 0.2s ease-in-out"
    menuDisplayDiv.style.display = "grid"
})
closeMenuTab.addEventListener("click", ()=>{
    menuDisplayDiv.style.animation = "slideDown 0.5s ease-in-out"
    setTimeout(() => {
        menuDisplayDiv.style.display = "none"
    }, 490);
})
//---------------------------------------------------


const balanceTabSalaryDisplay = document.getElementById("balance-salary-display")
const balanceTabExpenseDisplay = document.getElementById("balance-expense-display")

// opening balance details tab
balanceRootDiv.addEventListener("click", ()=>{
    balanceDetailDiv.style.display = "flex"
    balanceDetailsDisplayBal.innerHTML = 'BAL :  '+toCurrrency()
    balanceTabSalaryDisplay.innerHTML = Number(localStorage.getItem("salary")).toLocaleString('en',{style : 'currency', currency : 'INR'})
    balanceTabExpenseDisplay.innerHTML = Number(localStorage.getItem("expense")).toLocaleString('en',{style : 'currency', currency : 'INR'})
})

const salaryCollectBtn = document.querySelector(".collect-slry")
const payExpenseBtn = document.querySelector(".pay-expen")
salaryCollectBtn.addEventListener('click', ()=>{
    if (localStorage.getItem("ifSalaryCollected")=='no'){
        collectSalary()
    }
    localStorage.setItem('ifSalaryCollected', 'yes')
})
payExpenseBtn.addEventListener('click', ()=>{
    if (localStorage.getItem("ifExpensePaid")=='no'){
        payExpense()
    }
    localStorage.setItem("ifExpensePaid", 'yes')
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
    if (localStorage.getItem("ifSalaryCollected")==="no"){// command for me : check later why false is not working
        alertAMsg("You haven't collected salary\nCollect salary from 'your Balance' Tab👇")
        return
    }if (localStorage.getItem('ifExpensePaid')==='no'){
        alertAMsg("You haven't Paid Salary\nPay expense from 'Your balance' Tab👇")
        return
    }else{
        nextMonth('nexGen', 'nexgenCurrentPrice')
        nextMonth('ecoGenix', 'ecogenixCurrentPrice')
        nextMonth('greenPower', 'greenpowerCurrentPrice')
        nextMonth('ariaApparel', 'ariaapparelCurrentPrice')
        updateCurrentPrice()
        updatePriceChange()
        displayBalance()
        addAMonth()
        localStorage.setItem("ifSalaryCollected", 'no')
        localStorage.setItem("ifExpensePaid", 'no')
    }
    if((localStorage.getItem("MonthCount") <= 5) && (localStorage.getItem("MonthCount")%2 == 1) || localStorage.getItem("MonthCount") == 0){
        popupObject.style.display = "flex"
        popupTale.style.display = "block"

        setTimeout(() => {
            popupObject.style.display = "none"
            popupTale.style.display = "none"
        }, 8000);
    }
    

})

// collect salary
function collectSalary(){
    let addSalary = parseFloat(localStorage.getItem("balance"))+parseFloat(localStorage.getItem("salary"))
    localStorage.setItem("balance", addSalary)
    displayBalance()
    balanceDetailsDisplayBal.innerHTML = "Balance : "+toCurrrency()
}

function payExpense(){
    localStorage.setItem('balance', parseInt(localStorage.getItem('balance')-parseInt(localStorage.getItem('expense'))))
    displayBalance()
    balanceDetailsDisplayBal.innerHTML = "Balance : "+toCurrrency()
}

// add a month to count
function addAMonth(){
    localStorage.setItem("MonthCount",parseInt(localStorage.getItem("MonthCount"))+1)
    monthDisplay.innerHTML = "Month : "+localStorage.getItem("MonthCount")
}

function displayBalance(){
    balanceHomeDisplay.innerText = toCurrrency()
    salaryHomeDisplay.innerText = '₹'+Number(localStorage.getItem("salary")).toLocaleString('en')+"/Month"
}

// update price to ui
function updateCurrentPrice(){ 
    nexgenDisplay.innerText = '₹'+Number(localStorage.getItem("nexgenCurrentPrice")).toLocaleString('en')
    ecogenixDisplay.innerText = '₹'+Number(localStorage.getItem("ecogenixCurrentPrice")).toLocaleString('en')
    greenpowerDisplay.innerText = '₹'+Number(localStorage.getItem("greenpowerCurrentPrice")).toLocaleString('en')
    ariaapparelDisplay.innerText = '₹'+Number(localStorage.getItem("ariaapparelCurrentPrice")).toLocaleString('en')
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





