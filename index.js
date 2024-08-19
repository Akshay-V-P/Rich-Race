// check if the user already exist
if (localStorage.getItem("name")) {
    console.log("User already exist")
}else{ // else add create a new user

    const inputArea = document.getElementById("input-box")
    const maleSelector = document.getElementById("male-selector")
    const femaleSelector = document.getElementById("Female-profile")

    let gender = "none"

    maleSelector.addEventListener("click", (e) => {
        gender = "Male"
    })
    femaleSelector.addEventListener("click", () => {
        gender = "Female"
    })

    // function for store user details in local storage
    function submitDetails() {
        let name = inputArea.value;
        localStorage.setItem("name", name);
        localStorage.setItem("gender", gender);
    }
}