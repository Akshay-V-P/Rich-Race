// check if the user already exist
const inputArea = document.getElementById("input-box")
const requiredP = document.querySelector('.required')


    const maleSelector = document.getElementById("male-selector")
    const femaleSelector = document.getElementById("Female-profile")

    let gender = "none"

    maleSelector.addEventListener("click", (e) => {
        gender = "Male"
        femaleSelector.style.opacity = '0.2'
        maleSelector.style.opacity = '1'

    })
    femaleSelector.addEventListener("click", () => {
        gender = "Female"
        maleSelector.style.opacity = '0.2'
        femaleSelector.style.opacity = '1'


    })


const submitBtn = document.querySelector(".submit-btn")
submitBtn.addEventListener("click", ()=>{
    submitDetails()
    if (!inputArea.value) {
        return
    }
    window.location.href = 'select-profession.html'
})


    // function for store user details in local storage
function submitDetails() {
        if (!inputArea.value) {
            requiredP.style.display = 'block'
            return
        }
        let name = inputArea.value;
        if ((name.toUpperCase()) == 'SNEHA') {
            name = name + '❤️'
        }
        localStorage.setItem("name", name);
        localStorage.setItem("gender", gender);
        if (gender == 'Male'){
            localStorage.setItem("profileImgSrc", "img/Welcome/Male-profile.png")
        }else if (gender == 'Female'){
            localStorage.setItem("profileImgSrc", "img/Welcome/Female-profile.png")
        }
    }
