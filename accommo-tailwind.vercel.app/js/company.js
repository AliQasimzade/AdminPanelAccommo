
const icon = document.getElementById("icon")
const splashScreen = document.getElementById("splashScreen")
const facebook = document.getElementById("facebook")
const instagram = document.getElementById("instagram")
const youtube = document.getElementById("youtube")
const linkedin = document.getElementById("linkedin")
const phone = document.getElementById("phone")
const email = document.getElementById("email")
const adress = document.getElementById("adress")
const privacy = document.getElementById("privacy")
const terms = document.getElementById("terms")
const submit = document.getElementById("submit")
let getImageUrl;
let getIconUrl

splashScreen.addEventListener('change', (e) => {
    const reader = new FileReader()
    reader.addEventListener('load', (e) => {
        getImageUrl= reader.result;
    });
    reader.readAsDataURL(e.target.files[0]);

})

icon.addEventListener('change', (e) => {
    const reader = new FileReader()
    reader.addEventListener('load', (e) => {
        getIconUrl= reader.result;
    });
    reader.readAsDataURL(e.target.files[0]);

})

const createCompany =  async() =>{
    const newElement ={
       email : email.value,
       phone : phone.value,
       icon : getIconUrl,
       termsAndConditions : terms.value,
       privacyPolicy : privacy.value,
       address : adress.value,
       splashScreen : getImageUrl,
       socialLinks :[facebook.value,linkedin.value,instagram.value,youtube.value]

    }

    const req = await fetch("http://localhost:3001/api/createcompany" , {
        method : "POST",
        headers :{
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(newElement)
    
    })

    const res = await req.json()
    console.log(res);
}
submit.addEventListener("click" , createCompany )