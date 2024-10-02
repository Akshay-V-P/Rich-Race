// setting up every initial values to localStorage
export function setInitialValues(){
    
    // set default price
    localStorage.setItem("nexgenStartingPrice", 1030)
    localStorage.setItem("ecogenixStartingPrice" , 640)
    localStorage.setItem("greenpowerStartingPrice" , 450)
    localStorage.setItem("ariaapperalStartingPrice" , 230)

    // set current price
    localStorage.setItem("nexgenCurrentPrice", 1030)
    localStorage.setItem("ecogenixCurrentPrice" , 640)
    localStorage.setItem("greenpowerCurrentPrice" , 450)
    localStorage.setItem("ariaapparelCurrentPrice" , 230)

    // set price change
    localStorage.setItem("nexgenPriceChange", 0)
    localStorage.setItem("ecogenixPriceChange",0)
    localStorage.setItem("greenpowerPriceChange",0)
    localStorage.setItem("ariaapparelPriceChange",0)
    
    // month count
    localStorage.setItem("MonthCount", 0)

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

    //initiallized
    localStorage.setItem("initiallized", 'yes')

    //house initial price
    const houseNameDB = {
        'names' : ['smallhouse1','smallhouse2','smallhouse3','mediumhouse1','mediumhouse2','mediumhouse3','largehouse1','largehouse2','largehouse3'],
        'price' : [682000, 1380000, 4600000, 7295000, 12300000, 36500000, 287500000, 845500000, 1234300000]
    }
    for (let i=0; i<=houseNameDB.names.length;i++){
        localStorage.setItem(houseNameDB.names[i], houseNameDB.price[i])
    }

}