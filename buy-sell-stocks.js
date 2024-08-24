const nexgenStockContainer = document.querySelector(".nexgen-stock")

export const nexgenhomediv = document.querySelector(".nexgen")

// close button 
export const nexgenCloseBtn = document.querySelector(".nexgen-close")


// item to update
//price
const nexgenPriceDisplay = document.querySelector(".nexgen-stocktab-price")

export function displayStockTab(target){
    if (target == "nexgen"){
        nexgenStockContainer.style.display = "flex";
        nexgenPriceDisplay.innerHTML = '₹'+localStorage.getItem("nexgenCurrentPrice")
    }
}

export function hideStockTab(target){
    if (target == "nexgen"){
        nexgenStockContainer.style.display = "none"
    }
}