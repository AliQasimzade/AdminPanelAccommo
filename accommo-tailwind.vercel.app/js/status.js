const content = document.getElementById("content")
const status = document.getElementById("status")
const icon = document.getElementById("icon")
const submit = document.getElementById("submit")

const getAllUsers = async () => {
    try {
     const request = await fetch('http://localhost:3001/api/allusers')
     if(!request.ok) {
         throw new Error("Request is failed !")
     }else {
         const response = await request.json()
         console.log(response);
         response.forEach(res => status.innerHTML += 
             `
                 <option value="${res.name}">${res.name}</option>
              `)
     }
    }catch(err) {
   alert(err.message)
    }
 }
 
 getAllUsers()

let getIconUrl

icon.addEventListener('change', (e) => {
    const reader = new FileReader()
    reader.addEventListener('load', (e) => {
        getIconUrl= reader.result;
    });
    reader.readAsDataURL(e.target.files[0]);

})

const createStatus = async ()=>{
    const newStatus ={
        content : content.value,
        image : getIconUrl,
        sharedBy : status.value,
        userProfilePicture : "picture"


    }
    const req = await fetch("http://localhost:3001/api/createstatus" , {
        method : "POST",
        headers :{
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(newStatus)
    
    })

    const res = await req.json()
    console.log(res);
}

submit.addEventListener("click" ,createStatus)




