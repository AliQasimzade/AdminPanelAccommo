const name = document.getElementById("name")
const submit = document.getElementById("submit")



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

const createTag = async () => {
    try {
        if (name.value == '') {
            alert("Please enter a name")
        } else {
            const newTag = {
                name: name.value,
            }
            const req = await fetch("https://adminpanelback.onrender.com/api/createtag", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTag)

            })

            if (req.status != 201) {
                throw new Error("Request is failed !")
            } else {
                const res = await req.json()
                alert("Create new tag successfully !")
                location.reload()
            }


        }
    } catch (err) {
        alert(err.message)
    }
}

submit.addEventListener("click", createTag)