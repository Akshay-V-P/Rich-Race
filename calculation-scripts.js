import { companies } from "./news-db.js";
import { Variations } from "./price-var-db.js";


// select a randow news from news db
export function selectRandomNews(companyName, storageName) {
    let currentNews = ''
    let tempPrice = localStorage.getItem(storageName) // takes last price of stock from localstorage
  

    let randomIndex = parseInt(Math.floor(Math.random() * 20));
    currentNews = companies[companyName][randomIndex]; 
    let priceChangeArr = Variations[randomIndex]
    let priceChange
    priceChange = eval(tempPrice+priceChangeArr[0]+priceChangeArr[1])
    priceChange = Math.trunc(priceChange)
    console.log(priceChange)
    if (priceChange < 10){
        priceChange = 10
    }
    
    return [currentNews, priceChange, priceChangeArr[1], priceChangeArr[0], tempPrice] // [current news, Current Price, Price changed this month, operator eg:+ or -, last price]
}

