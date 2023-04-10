const content = document.getElementById("content")
const status = document.getElementById("status")
const icon = document.getElementById("icon")
const submit = document.getElementById("submit")

const getAllUsers = async () => {
    try {
     const request = await fetch('https://adminpanelback.onrender.com/api/allusers')
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

icon.addEventListener('change', (e) => {
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

const createStatus = async ()=>{
    const newStatus ={
        content : content.value,
        image : getIconUrl,
        sharedBy : status.value,
        userProfilePicture : "picture"


    }
    const req = await fetch("https://adminpanelback.onrender.com/api/createstatus" , {
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




