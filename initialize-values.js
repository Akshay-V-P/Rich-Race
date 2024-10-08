export const houseNameDB = {
    'names' : ['smallhouse1','smallhouse2','smallhouse3','mediumhouse1','mediumhouse2','mediumhouse3','largehouse1','largehouse2','largehouse3'],
    'price' : [682000, 1380000, 4600000, 7295000, 12300000, 36500000, 287500000, 845500000, 1234300000]
}

export const expenseNrentEarnings = {
    'expense' : [5000,10000,15000,20000,35000,56000,110000,237000,1300000],
    'rentearnings': [25000,40000,65000,98000,156000,267000,488900,1500000,4450000]
}

// setting up every initial values to localStorage
export function setInitialValues(){
    
    // set default price
    localStorage.setItem("nexgenStartingPrice", 2534)
    localStorage.setItem("ecogenixStartingPrice" , 1058)
    localStorage.setItem("greenpowerStartingPrice" , 450)
    localStorage.setItem("ariaapperalStartingPrice" , 230)

    // set current price
    localStorage.setItem("nexgenCurrentPrice", 2534)
    localStorage.setItem("ecogenixCurrentPrice" , 1058)
    localStorage.setItem("greenpowerCurrentPrice" , 450)
    localStorage.setItem("ariaapparelCurrentPrice" , 230)

    // set price change
    localStorage.setItem("nexgenPriceChange", 0)
    localStorage.setItem("ecogenixPriceChange",0)
    localStorage.setItem("greenpowerPriceChange",0)
    localStorage.setItem("ariaapparelPriceChange",0)
    
    // month count
    localStorage.setItem("MonthCount", 0)
    localStorage.setItem('year', 0)

    // holdings
    localStorage.setItem("nexgenHoldings", 0)
    localStorage.setItem("ecogenixHoldings", 0)
    localStorage.setItem("greenpowerHoldings", 0)
    localStorage.setItem("ariaapparelHoldings", 0)

    //balance
    localStorage.setItem("balance", 0)

    //price change index
    localStorage.setItem("nexGenpriceChangeIndex", 0)
    localStorage.setItem("ecoGenixpriceChangeIndex", 0)
    localStorage.setItem("greenPowerpriceChangeIndex", 0)
    localStorage.setItem("ariaApparelpriceChangeIndex", 0)

    //salary collected
    localStorage.setItem("ifSalaryCollected", 'yes')

    //expense paid
    localStorage.setItem("ifExpensePaid", 'yes')

    //house purchase data 
    localStorage.setItem('houseOwns', JSON.stringify([]))

    //shownnews 
    localStorage.setItem('gotadrop', false)

    //initiallized
    localStorage.setItem("initiallized", 'yes')

    //house initial price
    
    for (let i=0; i<houseNameDB.names.length;i++){
        localStorage.setItem(houseNameDB.names[i], houseNameDB.price[i])
    }

    // house expense and rent initializer
    for (let i=0 ; i<houseNameDB.names.length; i++){
        localStorage.setItem('expense'+houseNameDB.names[i], expenseNrentEarnings.expense[i])
        localStorage.setItem('rentearnings'+houseNameDB.names[i], expenseNrentEarnings.rentearnings[i])
    }

}

export function setInitialValuesOnce(){
    // help accessed
    localStorage.setItem('helpNeeded', true)
}