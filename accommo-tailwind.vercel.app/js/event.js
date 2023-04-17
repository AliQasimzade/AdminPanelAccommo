const name = document.getElementById("name")
const desc = document.getElementById("desc")
const place = document.getElementById("place")
const adress = document.getElementById("adress")
const startTime = document.getElementById("startTime")
const endTime = document.getElementById("endTime")
const price = document.getElementById("price")
const info = document.getElementById("info")
const details = document.getElementById("details")
const submit = document.getElementById("submit")

let getImageUrl = '';


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
placeImage.addEventListener('change', (e) => {
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
const createEvent = async () => {
    console.log(startTime.value, endTime.value)
    try {
        if (name.value == '' ||
            desc.value == '' ||
            place.value == '' ||
            startTime.value == '' ||
            endTime.value == '' ||
            adress.value == '' ||
            price.value == '' ||
            info.value == '' ||
            details.value == '' ||
            getImageUrl == '') {
            alert("Please fill all inputs")
        } else {
            const newEvent = {
                name: name.value,
                description: desc.value,
                locationName: place.value,
                locationAddress: adress.value,
                startDate: startTime.value,
                endDate: endTime.value,
                entryPrice: price.value,
                contactInfo: info.value,
                details: details.value,
                image: getImageUrl
            }
            const req = await fetch("https://adminpanelback.onrender.com/api/createevent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newEvent)

            })
            if (!req.ok) {
                throw new Error("Request is failed")
            } else {
                const res = await req.json()
                alert("Added new Event successfully !")
                location.reload()
            }

        }
    } catch (err) {
        alert(err.message)
    }
}
submit.addEventListener("click", createEvent)













