const name = document.getElementById("name")
const image = document.getElementById("image")
const icon = document.getElementById("icon")
const submit = document.getElementById("submit")

let getImageUrl;
let getIconUrl

 
image.addEventListener('change', (e) => {
    const reader = new FileReader()
    reader.addEventListener('load', (e) => {
        getImageUrl= reader.result;
        console.log(getImageUrl);
    });
    reader.readAsDataURL(e.target.files[0]);

})

icon.addEventListener('change', (e) => {
    const reader = new FileReader()
    reader.addEventListener('load', (e) => {
        getIconUrl= reader.result;
        console.log(getIconUrl);
    });
    reader.readAsDataURL(e.target.files[0]);

})

const createCatogory =  async() =>{
    const newElement ={
        name : name.value,
        image : getImageUrl,
        icon : getIconUrl
    }

    const req = await fetch("http://localhost:3001/api/createcategory" , {
        method : "POST",
        headers :{
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(newElement)
    
    })

    const res = await req.json()
    console.log(res);
}
submit.addEventListener("click" , createCatogory )