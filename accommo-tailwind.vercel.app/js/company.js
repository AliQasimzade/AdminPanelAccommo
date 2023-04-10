
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
splashScreen.addEventListener('change', (e) => {
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
                getImageUrl = downloadURL
            });
        }
    );

})

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

    const req = await fetch("https://adminpanelback.onrender.com/api/createcompany" , {
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