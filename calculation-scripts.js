import { houseNameDB } from "./initialize-values.js";
import { companies } from "./news-db.js";
import { Variations } from "./price-var-db.js";


// select a randow news from news db
export function selectRandomNews(companyName, storageName) {
    console.log(storageName, companyName)
    let currentNews = ''
    let tempPrice = localStorage.getItem(storageName) // takes last price of stock from localstorage

    let randomIndex = parseInt(Math.floor(Math.random() * 20));
    if (randomIndex == 6 && localStorage.getItem('gotadrop') == 'true'){
        return selectRandomNews(companyName, storageName)
    }else if (randomIndex == 6){
        localStorage.setItem(companyName+'shown', true)
    }
    currentNews = companies[companyName][randomIndex]; 
    let priceChangeArr = Variations[localStorage.getItem(companyName+"priceChangeIndex")]
    let priceChange
    priceChange = eval(tempPrice+priceChangeArr[0]+priceChangeArr[1])
    priceChange = Math.trunc(priceChange)
    if (priceChange < 10){
        priceChange = 10
        tempPrice = 10
    }
    localStorage.setItem(companyName+"priceChangeIndex", randomIndex) // need to initialize in initialize-value.js
    return [currentNews, priceChange, priceChangeArr[1], priceChangeArr[0], tempPrice] // [current news, Current Price, Price changed this month, operator eg:+ or -, last price]
}

export function incrementHouseValue(){ // currently this is increamenting every month, will change to every year
    houseNameDB.names.forEach(houseName =>{
        let currentValue = Number(localStorage.getItem(houseName))
        let incrementedValue = Math.floor((currentValue / 100)+currentValue)
        localStorage.setItem(houseName, incrementedValue)
    })
}



