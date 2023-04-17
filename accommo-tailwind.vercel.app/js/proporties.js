const name = document.getElementById("name")
const icon = document.getElementById("icon")
const submit = document.getElementById("submit")

const pattern =  /^[a-zA-Z0-9]+$/;


const userEmail = JSON.parse(sessionStorage.getItem('user'));
if (userEmail) {
    document.getElementById('userprofileimg').src = userEmail.image;
    document.getElementById('useremail').innerHTML = userEmail.email
    document.getElementById('profilepic').src = userEmail.image;
    document.getElementById('nameuser').innerHTML = userEmail.name;
    document.getElementById('emuser').innerHTML = userEmail.email;


} else {
    window.location.href = '/sign-in.html'
}



document.getElementById('logoutBtn').addEventListener('click', (e) => {
    alert("User logout")
    sessionStorage.removeItem('user')
    location.reload()

})

const createProperty = async ()=>{
    try {

        if(name.value == '' || pattern.test(name.value) != true){
            alert("Please fill name input")
        }else {
            const newProperty ={
                name : name.value,
                icon : selectIcon.value
            }
            const req = await fetch("https://adminpanelback.onrender.com/api/createproperty" , {
                method : "POST",
                headers :{
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(newProperty)
            
            })
            console.log(req)
            if(req.status != 201) {
                throw new Error('This feature already exist')
            }else {
                const res = await req.json()
                alert('Added succesfully !')
                location.reload()
            }
        }
        
    
       
    }catch(err) {
        alert(err.message)
    }
   
}

submit.addEventListener("click" ,createProperty)