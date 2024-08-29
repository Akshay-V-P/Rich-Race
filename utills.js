export function alertAMsg(message){
    const container = document.querySelector(".container")
    let alertP = document.createElement("p")
    alertP.classList.add("alert-msg")
    alertP.innerText = message
    container.appendChild(alertP)
    setTimeout(() => {
        container.removeChild(alertP)
    }, 3000);
}