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
    localStorage.setItem("balance", 24000)

    //price change index
    localStorage.setItem("nexGenpriceChangeIndex", 0)
    localStorage.setItem("ecoGenixpriceChangeIndex", 0)
    localStorage.setItem("greenPowerpriceChangeIndex", 0)
    localStorage.setItem("ariaApparelpriceChangeIndex", 0)

    //expense
    localStorage.setItem("expense", 15000)

    //salary collected
    localStorage.setItem("ifSalaryCollected", 'yes')

    //expense paid
    localStorage.setItem("ifExpensePaid", 'yes')

    //salary
    localStorage.setItem("salary", 24000)

    //initiallized
    localStorage.setItem("initiallized", 'yes')

}