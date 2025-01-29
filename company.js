const startCompanyDiv = document.querySelector(".startcompany")
localStorage.setItem("haveacompany", true)
if (localStorage.getItem("haveacompany") == "false") {
    startCompanyDiv.style.display = "flex"
}