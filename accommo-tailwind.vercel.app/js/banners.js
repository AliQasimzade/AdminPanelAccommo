const icon = document.getElementById("icon")
const submit = document.getElementById("submit")

let getIconUrl
icon.addEventListener('change', (e) => {
    const reader = new FileReader()
    reader.addEventListener('load', (e) => {
        getIconUrl= reader.result;
        console.log(getIconUrl);
    });
    reader.readAsDataURL(e.target.files[0]);

})
const createTag = async()=>{
    const newElement ={
        icon : getIconUrl
    }
    const req = await fetch("http://localhost:3001/api/createbanner" , {
        method : "POST",
        headers :{
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(newElement)
    
    })

    const res = await req.json()
    console.log(res);
}
submit.addEventListener("click" , createTag )
