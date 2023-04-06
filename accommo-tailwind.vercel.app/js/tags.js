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

const createTag = async ()=>{
    const newTag ={
        name : name.value,
        icon : getIconUrl
    }
    const req = await fetch("http://localhost:3001/api/createtag" , {
        method : "POST",
        headers :{
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(newTag)
    
    })

    const res = await req.json()
    console.log(res);
}

submit.addEventListener("click" ,createTag)