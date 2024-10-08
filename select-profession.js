const professionDivs = document.querySelectorAll('#professiondiv')
const enterGame = document.getElementById('entergame')
let selectedProfession = {
    'salary': 0,
    'expense': 0
}

// doctor div selection
professionDivs[0].addEventListener('click', ()=>{
    professionDivs[0].style.background = "linear-gradient(23deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)"
    professionDivs[1].style.background = "transparent"
    professionDivs[2].style.background = "transparent"
    selectedProfession.salary = 200000
    selectedProfession.expense = 80000
})

// accountant div selection
professionDivs[1].addEventListener('click', ()=>{
    professionDivs[1].style.background = "linear-gradient(23deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)"
    professionDivs[0].style.background = "transparent"
    professionDivs[2].style.background = "transparent"
    selectedProfession.salary = 50000
    selectedProfession.expense = 30000
})

// webdeveloper div selection
professionDivs[2].addEventListener('click', ()=>{
    professionDivs[2].style.background = "linear-gradient(23deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)"
    professionDivs[0].style.background = "transparent"
    professionDivs[1].style.background = "transparent"
    selectedProfession.salary = 12000
    selectedProfession.expense = 10500
})

// enter game button event
enterGame.addEventListener('click', ()=>{
    localStorage.setItem('salary', selectedProfession.salary)
    localStorage.setItem('expense', selectedProfession.expense)
    localStorage.setItem('personalExpense', selectedProfession.expense)
    localStorage.setItem('professionSelected', true)
    window.location.href = 'game.html'
})