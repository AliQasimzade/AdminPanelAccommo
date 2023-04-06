const name = document.getElementById("name")
const icon = document.getElementById("icon")
const submit = document.getElementById("submit")

let getIconUrl

icon.addEventListener('change', (e) => {
    const reader = new FileReader()
    reader.addEventListener('load', (e) => {
        getIconUrl= reader.result;
    });
    reader.readAsDataURL(e.target.files[0]);

})

const createProperty = async ()=>{
    const newProperty ={
        name : name.value,
        icon : getIconUrl
    }
    const req = await fetch("http://localhost:3001/api/createproperty" , {
        method : "POST",
        headers :{
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(newProperty)
    
    })

    const res = await req.json()
    console.log(res);
}

submit.addEventListener("click" ,createProperty)