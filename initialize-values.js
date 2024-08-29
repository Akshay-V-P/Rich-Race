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
    localStorage.setItem("greenpowerCurrnetPrice" , 450)
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

}