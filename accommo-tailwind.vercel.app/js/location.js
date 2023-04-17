let getLocationImageUrl = '';
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

locationImage.addEventListener('change', (e) => {
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
                getLocationImageUrl = downloadURL
            });
        }
    );

})

const createLocation = async () => {
    try {
        if (getLocationImageUrl == '' || locationName.value == '') {
            alert('Please fill inputs or input !')
        } else if (/^\s+$/.test(locationName.value)) {
            alert('Please fill name input !')
        } else {
            const newLocation = {
                name: locationName.value,
                image: getLocationImageUrl
            }
            const req = await fetch('https://adminpanelback.onrender.com/api/createlocation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newLocation)
            })
            if (req.status !== 201) {
                throw new Error('Request is failed');
            } else {
                const res = await req.json();
                alert("Create new location was successfully !")
                location.reload();
            }
        }
    } catch (err) {
        alert(err.message);
    }
}

submitLoc.addEventListener('click', createLocation)