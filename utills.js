export function alertAMsg(message){
    const container = document.querySelector(".container")
    const notificationSfx = new Audio("sfx/Notification-sfx.mp3")
    notificationSfx.play()
    let alertP = document.createElement("p")
    alertP.classList.add("alert-msg")
    alertP.innerText = message
    container.appendChild(alertP)
    setTimeout(() => {
        container.removeChild(alertP)
    }, 3000);
}

export function toCurrrency(){
    let balanceValue = localStorage.getItem("balance")
    let decorator 
    let length = balanceValue.length
    let formattedValue 
    if ((length > 5) && (length < 8)){
        decorator = ' L'
    }else if (length > 7 ){
        decorator = ' Cr'
    }else{
        decorator = ''
    }

    if (length>6){
        if (length <10){
            let start = length % 2 == 0 ? 1:2
            formattedValue  = balanceValue.slice(0,start)+'.'+balanceValue.slice(start, start+2)
        }else if (length>9){
            let decimalLocation = length - 7
            formattedValue = balanceValue.slice(0,decimalLocation)+'.'+balanceValue.slice(decimalLocation,decimalLocation+2)
        }
    }else{
        formattedValue = balanceValue
    }
    formattedValue = Number(formattedValue).toLocaleString('en-IN',{style:"currency",currency:"INR"})+decorator
    return formattedValue
}