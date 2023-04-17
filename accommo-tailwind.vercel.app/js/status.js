const content = document.getElementById("content")
const status = document.getElementById("status")
const icon = document.getElementById("icon")
const submit = document.getElementById("submit")
let userImage = '';


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

const getAllUsers = async () => {
    try {
        const request = await fetch('https://adminpanelback.onrender.com/api/allusers')
        if (!request.ok) {
            throw new Error("Request is failed !")
        } else {
            const response = await request.json()
            console.log(response);
            userImage = response[0].image;
            console.log(userImage);
            response.forEach(res => status.innerHTML +=
                `
                 <option value="${res.name}">${res.name}</option>
                 
              `)
        }
    } catch (err) {
        alert(err.message)
    }
}

getAllUsers()

status.addEventListener('change', async (e) => {
    try {
        const req = await fetch(`https://adminpanelback.onrender.com/api/userid/${e.target.value}`)
        if (!req.ok) {
            throw new Error("Request is failed !")
        } else {
            const res = await req.json();
            userImage = res.user.image
            console.log(userImage);
        }
    } catch (err) {
        alert(err.message)
    }
})

let getIconUrl = ''
const firebaseConfig = {
    apiKey: "AIzaSyCrjc7qRA9Z51nm_zJIB7FAXS9dmepEUk8",
    authDomain: "adminpanel-da8aa.firebaseapp.com",
    databaseURL: "https://adminpanel-da8aa-default-rtdb.firebaseio.com",
    projectId: "adminpanel-da8aa",
    storageBucket: "adminpanel-da8aa.appspot.com",
    messagingSenderId: "381842069412",
    appId: "1:381842069412:web:850d704de6d0cd10245331"
};

firebase.initializeApp(firebaseConfig);

let storage = firebase.storage();

userimage.addEventListener('change', (e) => {
    let file = e.target.files[0]
    let storageRef = storage.ref();
    let imagesRef = storageRef.child('images/' + file.name);

    let uploadTask = imagesRef.put(file);

    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        },
        function (error) {

            console.error('Upload failed:', error);
        },
        function () {
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                getIconUrl = downloadURL
            });
        }
    );

})

const createStatus = async () => {
    try {
        if (getIconUrl == '') {
            alert("Please select image")
        } else {
            const newStatus = {
                image: getIconUrl,
                sharedBy: status.value,
                userProfilePicture: userImage


            }
            const req = await fetch("https://adminpanelback.onrender.com/api/createstatus", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newStatus)

            })
            if (!req.ok) {
                throw new Error("Request is failed !")
            } else {
                const res = await req.json()
                alert("Create status successfully")
                location.reload()
            }


        }
    }catch(err) {
        alert(err.message)
    }
   
}

submit.addEventListener("click", createStatus)




