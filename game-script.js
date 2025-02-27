import { incrementHouseValue, selectRandomNews } from "./calculation-scripts.js"
import { expenseNrentEarnings, houseNameDB, loanDetails, setInitialValues, setInitialValuesOnce } from "./initialize-values.js"
import { alertAMsg, toCurrrency } from "./utills.js"
const companyTabRoute = document.getElementById("news-tab")
if (localStorage.getItem("name")==null){
    window.location.href = "index.html"
}
if (localStorage.getItem("initiallized")==null){
    localStorage.setItem("initiallized", 'no')
}
if (localStorage.getItem("initiallized")=='no'){
    setInitialValues()
    setInitialValuesOnce()
}

const feedbackCloseBtn = document.getElementById('feedbackClose')
const feedbackContainer = document.querySelector('.feedbackContainer')

// close feedback popup event
feedbackCloseBtn.addEventListener('click', ()=>{
    feedbackContainer.style.display = 'none'
})



const nameOfPlayer = document.querySelector('#nameofplayer')
nameOfPlayer.innerText = localStorage.getItem("name")
const popupObject = document.querySelector(".help-popup")
const popupTale = document.querySelector(".triangle")



const gamestartdiv = document.querySelector(".startgame")
const gamestartarrow = document.querySelector(".gamestartarrow")

if (localStorage.getItem("MonthCount") == 0){
    gamestartdiv.style.display = "flex"
    gamestartarrow.style.display = "block"
}

// sound effect
const clickBubbleSfx = new Audio("sfx/click-bubble-sound.mp3")

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
const expenseHomeDisplay = document.getElementById("home-expense")
const salaryHomeDisplay = document.getElementById("home-salary")

// balance details 
const balanceDetailDiv = document.querySelector(".balance-details")
const balanceDetailClose = document.querySelector("#close-balance-tab")
const balanceDetailsDisplayBal = document.querySelector(".balance-disp")
const houseExpenseP = document.querySelector('.houseExpense')
const personalExpense = document.querySelector('.personalExpense')

// next button
const nextBtn = document.querySelector(".next-month")

// progress display div
const progressDiv = document.querySelector(".progress-display")

// month display
const monthDisplay = document.querySelector(".month-display")

const helloName = document.getElementById("hello-name")
helloName.innerHTML = localStorage.getItem("name")

const profilePhoto = document.querySelector(".profile-foto img")
profilePhoto.src = localStorage.getItem("profileImgSrc")


// opening and closing menu tab 
//---------------------------------------------------
const openMenuBtn = document.querySelector('.menu-btn')
const menuDisplayDiv = document.querySelector('.menu-tab')
const closeMenuTab = document.querySelector(".close-menu")
openMenuBtn.addEventListener("click", ()=>{
    clickBubbleSfx.play()
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
const networthDisplay = document.querySelector('.networthDisplay')

// opening balance details tab
balanceRootDiv.addEventListener("click", () => {
    clickBubbleSfx.play()
    balanceDetailDiv.style.display = "flex"
    updateBalanceDetails()
})


function updateBalanceDetails() {
    balanceDetailsDisplayBal.innerHTML = 'BAL : <br> '+toCurrrency(localStorage.getItem('balance'))
    balanceTabSalaryDisplay.innerHTML = Number(localStorage.getItem("salary")).toLocaleString('en',{style : 'currency', currency : 'INR'})
    houseExpenseP.innerHTML = 'House Maintenance cost : ' + (displayHouseMaintenanceCost() || '0')
    personalExpense.innerHTML = 'Monthly Expanse : ' + localStorage.getItem('personalExpense')
    if (Number(localStorage.getItem("MonthCount")) == 0) {
        let unExpectedExp = ((Number(localStorage.getItem('salary')) / 100) * 85) * 2
        balanceTabExpenseDisplay.innerHTML = (Number(localStorage.getItem("expense")) + unExpectedExp).toLocaleString('en',{style : 'currency', currency : 'INR'})
    } else {
        balanceTabExpenseDisplay.innerHTML = Number(localStorage.getItem("expense")).toLocaleString('en',{style : 'currency', currency : 'INR'})
    }
    netWorth()
    networthDisplay.innerHTML = toCurrrency(localStorage.getItem('netWorth'))
}

const salaryCollectBtn = document.querySelector(".collect-slry")
const payExpenseBtn = document.querySelector(".pay-expen")
salaryCollectBtn.addEventListener('click', ()=>{
    clickBubbleSfx.play()
    if (localStorage.getItem("ifSalaryCollected")=='no'){
        collectSalary()
    }
    localStorage.setItem('ifSalaryCollected', 'yes')
})
payExpenseBtn.addEventListener('click', ()=>{
    clickBubbleSfx.play()
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
companyTabRoute.addEventListener("click", ()=>{
    clickBubbleSfx.play()
    window.location.href = "company.html"
})

updateCurrentPrice()
updatePriceChange()
displayBalance()
monthDisplay.innerHTML = "Month : "+localStorage.getItem("MonthCount")


nextBtn.addEventListener("click", ()=>{
    clickBubbleSfx.play()
    gamestartdiv.style.display = "none"
    gamestartarrow.style.display = "none"
    if (localStorage.getItem("ifSalaryCollected")==="no"){// command for me : check later why false is not working
        alertAMsg("You haven't collected salary\nCollect salary from 'your Balance' Tab👇")
        return
    }if (localStorage.getItem('ifExpensePaid')==='no'){
        alertAMsg("You haven't Paid Salary\nPay expense from 'Your balance' Tab👇")
        return
    }else{
        progressDiv.innerHTML = ''
        nextMonth('nexGen', 'nexgenCurrentPrice')
        nextMonth('ecoGenix', 'ecogenixCurrentPrice')
        nextMonth('greenPower', 'greenpowerCurrentPrice')
        nextMonth('ariaApparel', 'ariaapparelCurrentPrice')
        updateCurrentPrice()
        updatePriceChange()
        displayBalance()
        addAMonth()
        incrementHouseValue()
        localStorage.setItem("ifSalaryCollected", 'no')
        localStorage.setItem("ifExpensePaid", 'no')
        if ((localStorage.getItem('wroteToDev') == 'false') && (Number(localStorage.getItem('MonthCount')) == 2)){
            feedbackContainer.style.display = 'flex'
        }

    }
    if(localStorage.getItem('helpNeeded') == 'true' && (localStorage.getItem("MonthCount") <= 5) && (localStorage.getItem("MonthCount")%2 == 1)){
        popupObject.style.display = "flex"
        popupTale.style.display = "block"

        setTimeout(() => {
            popupObject.style.display = "none"
            popupTale.style.display = "none"
        }, 8000);
    }
    netWorth()
    updateBalanceDetails()

    //check loan close date 
    let closeDate = JSON.parse(localStorage.getItem('loanCloseDate'))
    if (closeDate[0] === Number(localStorage.getItem('year')) && closeDate[1] === Number(localStorage.getItem('MonthCount'))) {
        localStorage.setItem('expense', Number(localStorage.getItem('expense')) - loanDetails[localStorage.getItem('loanBankName')][1])
        localStorage.setItem('loanActive', 'no')
        localStorage.setItem('loanCloseDate', "Nil")
    }
    

})

// collect salary
function collectSalary(){
    let addSalary = parseFloat(localStorage.getItem("balance"))+parseFloat(localStorage.getItem("salary"))
    localStorage.setItem("balance", addSalary)
    displayBalance()
    balanceDetailsDisplayBal.innerHTML = "BAL :<br>"+toCurrrency(localStorage.getItem('balance'))
}

function payExpense() {
    if (Number(localStorage.getItem('MonthCount')) == 0) {
        let minusValue = Number(localStorage.getItem('expense')) + (((Number(localStorage.getItem('salary')) / 100) * 85) * 2)
        localStorage.setItem('balance', parseInt(localStorage.getItem('balance')- minusValue))    
    } else {
        localStorage.setItem('balance', parseInt(localStorage.getItem('balance')-parseInt(localStorage.getItem('expense'))))
    }
    localStorage.setItem('netWorth', Number(localStorage.getItem('netWorth') - Number(localStorage.getItem('expense'))))
    if (localStorage.getItem('loanActive') === 'yes') {
        localStorage.setItem('loanRemainingAmt', Number(localStorage.getItem('loanRemainingAmt')) - loanDetails[localStorage.getItem('loanBankName')][1])
    }
    displayBalance()
    updateBalanceDetails()
    balanceDetailsDisplayBal.innerHTML = "BAL :<br>"+toCurrrency(localStorage.getItem('balance'))
}

// add a month to count
function addAMonth(){
    let currentMonth = Number(localStorage.getItem('MonthCount'))
    currentMonth += 1
   if (currentMonth == 13){
        localStorage.setItem('year', Number(localStorage.getItem('year'))+1)
        localStorage.setItem('MonthCount', 0)
        localStorage.setItem('nexGenshown', false)
        localStorage.setItem('ecoGenixshown', false)
        localStorage.setItem('greenPowershown', false)
        localStorage.setItem('ariaApparelshown', false)
   }else{
    localStorage.setItem('MonthCount', currentMonth)
   }
   if (Number(localStorage.getItem('year')) > 0) {
        monthDisplay.innerHTML = localStorage.getItem('year')+'Y '+localStorage.getItem('MonthCount')+'m'
   }else{
    monthDisplay.innerHTML = 'Month : '+localStorage.getItem('MonthCount')
   }
}

function displayBalance(){
    balanceHomeDisplay.innerText = toCurrrency(localStorage.getItem('balance'))
    salaryHomeDisplay.innerText = toCurrrency(localStorage.getItem("salary"))
    expenseHomeDisplay.innerText = toCurrrency(localStorage.getItem("expense"))
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

// house maintenance cost calculator
function displayHouseMaintenanceCost(){
    let houseOwn = JSON.parse(localStorage.getItem('houseOwns'))
    if (!houseOwn.length){
        return
    }else{
        let indexOfcurrentElement
        let totalValue = 0
        houseOwn.forEach(element => {
            indexOfcurrentElement = houseNameDB.names.indexOf(element)
            totalValue += expenseNrentEarnings.expense[indexOfcurrentElement]
        });
        return totalValue
    }
}


// calculate total networth
function netWorth() {
    let houseWealthData = JSON.parse(localStorage.getItem('houseOwns')).length === 0 ? 0 : JSON.parse(localStorage.getItem('houseOwns'));
    let totalWealth
    let houseWealth = 0
    let stockHoldings = 0
    if (houseWealthData != 0) {
        houseWealthData.forEach((houseName) => {
            houseWealth += Number(localStorage.getItem(houseName))
        })
    }
    stockHoldings += Number(localStorage.getItem('nexgenHoldings')) * Number(localStorage.getItem('nexgenCurrentPrice'))
    stockHoldings += Number(localStorage.getItem('ecogenixHoldings')) * Number(localStorage.getItem('ecogenixCurrentPrice'))
    stockHoldings += Number(localStorage.getItem('greenpowerHoldings')) * Number(localStorage.getItem('greenpowerCurrentPrice'))
    stockHoldings += Number(localStorage.getItem('ariaapparelHoldings')) * Number(localStorage.getItem('ariaapparelCurrentPrice'))

    totalWealth = houseWealth + stockHoldings
    if (localStorage.getItem('ifSalaryCollected') == 'no') {
        totalWealth += Number(localStorage.getItem('salary'))
    }
    totalWealth += Number(localStorage.getItem('balance'))
    localStorage.setItem('netWorth', totalWealth)
    
}



export {displayBalance}
export default clickBubbleSfx




