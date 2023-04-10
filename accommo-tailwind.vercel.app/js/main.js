const title = document.getElementById("title");
const category = document.getElementById('category');
const slogan = document.getElementById('slogan');
const locations = document.getElementById('locations');
const city = document.getElementById('city');
const address = document.getElementById('address');
const zipcode = document.getElementById('zipcode');
const descriptions = document.getElementById('descriptions');
const phone = document.getElementById('phone');
const email = document.getElementById('email')
const website = document.getElementById('website')
const facebook = document.getElementById('facebook')
const linkedin = document.getElementById('linkedin')
const youtube = document.getElementById('youtube');
const twitter = document.getElementById('twitter')
const whatsapp = document.getElementById('whatsapp')
const dribble = document.getElementById('dribbble');
const previousprice = document.getElementById('previousprice');
const price = document.getElementById('price');
let allTags;
const uploadlink = document.getElementById('uploadlink');
const uploadImg = document.getElementById('upload-img');
const profileimage = document.getElementById('profileimage')
const coverimage = document.getElementById('coverimage');

let allFeatures;
const startSunday = document.getElementById('sunday');
const endSunday = document.getElementById('sundays');
const typeValue = document.getElementById('type')
const startFriday = document.getElementById('friday');
const endFriday = document.getElementById('fridays');
const startSaturday = document.getElementById('saturday');
const endSaturday = document.getElementById('saturdays');
const startTuesday = document.getElementById('tuesday');
const endTuesday = document.getElementById('tuesdays');
const startThursday = document.getElementById('thursday');
const endThursday = document.getElementById('thursdays');
const startMonday = document.getElementById('monday');
const endMonday = document.getElementById('mondays');
const startWednesday = document.getElementById('wednesday');
const endWednesday = document.getElementById('wednesdays');
const submitBtn = document.getElementById('submitBtn');
const alltags = document.getElementById('alltags')
const properties = document.getElementById('properties');

let map;
let marker;
let long;
let lat;
navigator.geolocation.getCurrentPosition(position => {
    let {latitude, longitude} = position.coords
     long = longitude
     lat = latitude
     console.log(lat, long);
     map = L.map('map').setView([latitude, longitude], 17);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
 marker = L.marker([latitude,longitude]).addTo(map);
 var url = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + latitude + '&lon=' + longitude;
    fetch(url)
        .then(response => response.json())
        .then(data => {
           
            city.innerHTML = data.address.state
            address.innerHTML = data.display_name
            locations.innerHTML = data.display_name.split(',')[0];
            marker.bindPopup(`${data.display_name}`).openPopup()
        });
map.on('click', function(e) {
    if(marker) {
        map.removeLayer(marker)
        console.log(e.latlng);
        marker = L.marker(e.latlng).addTo(map)
       
        const latitude = e.latlng.lat
        const longtitude = e.latlng.lng
        long = e.latlng.lng
        lat = e.latlng.lat
        console.log(lat, long)
        var url = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + latitude + '&lon=' + longitude;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            city.innerHTML = data.address.state
            address.innerHTML = data.display_name
            locations.innerHTML = data.display_name.split(',')[0];
            marker.bindPopup(`${data.display_name}`).openPopup()
        });
    }
})
})


const getAllCatAndTags = async () => {
    try {
        const urls = ['https://adminpanelback.onrender.com/api/categories', 'https://adminpanelback.onrender.com/api/tags', 'https://adminpanelback.onrender.com/api/properties'];
        const requests = urls.map(url => fetch(url));
        const responses = await Promise.all(requests);

        const data = await Promise.all(responses.map(response => response.json()));

      data[0].forEach(cat => category.innerHTML += 
        `
        <option value="${cat.name}">${cat.name}</option>
        `)

        data[1].forEach(tag => alltags.innerHTML += 
            `
            <div class="mb-5 flex items-center">
            <input
              type="checkbox"
              id="${tag.name}"
              class="check_tag checkbox-checked peer appearance-none h-4 w-4 border-[2px] border-gray-500 dark:border-gray-400 rounded-[5px] bg-white dark:bg-foreground bg-cover bg-center checked:border-0 focus:outline-none mr-3 cursor-pointer"
            />
            <label
            for="${tag.name}"
              class="text-sm flex text-gray-700 dark:text-gray-400 peer-checked:text-blue-500 dark:peer-checked:text-blue-500"
            >
            <img src="${tag.image}" width="15px" height="15px" style="margin-right: 5px; object-fit: cover;"/>
          <span>${tag.name}</span>
            </label>
          </div>
            `)

        data[2].forEach(feature => properties.innerHTML += 
            `
            <div class="mb-5 flex items-center">
            <input
            id="${feature.name}"
            type="checkbox"
              class="check_feature checkbox-checked peer appearance-none h-4 w-4 border-[2px] border-gray-500 dark:border-gray-400 rounded-[5px] bg-white dark:bg-foreground bg-cover bg-center checked:border-0 focus:outline-none mr-3 cursor-pointer"
            />
            <label
            for="${feature.name}"
              class="text-sm flex text-gray-700 dark:text-gray-400 peer-checked:text-blue-500 dark:peer-checked:text-blue-500"
            >
            <img src="${feature.icon}" width="15px" height="15px" style="margin-right: 5px;"/>
            <span> ${feature.name}</span>
            </label>
          </div>
            `)
    allTags = document.querySelectorAll('.check_tag')
    allFeatures = document.querySelectorAll('.check_feature')
    } catch (error) {
        console.log(error.message);
    }

}
getAllCatAndTags()

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


let imageUrls = [];
let profileImageUrl;
let coverImageUrl;
uploadImg.addEventListener('change', (e) => {
    const files = event.target.files;
    const uploadTasks = Array.from(files).map((file) => {
        let storageRef = storage.ref();
        let imagesRef = storageRef.child('images/' + file.name);
        return imagesRef.put(file)
        .then((snapshot) => {
            return snapshot.ref.getDownloadURL();
          });
    });

    Promise.all(uploadTasks)
        .then((downloadUrls) => {

            imageUrls = [...downloadUrls]
            console.log(imageUrls);
            // Handle successful upload and download
        })
        .catch((error) => {
            console.error('Upload failed', error);
            // Handle upload error
        });
})

profileimage.addEventListener('change', (e) => {
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
                profileImageUrl = downloadURL
            });
        }
    );
})


coverimage.addEventListener('change', (e) => {
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
                coverImageUrl = downloadURL
            });
        }
    );
})


submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const tags = [...allTags].map(tag => {
        if (tag.checked) {
            return tag.nextElementSibling.children[1].innerHTML
        }
    }).filter(Boolean)

    const features = [...allFeatures].map(tag => {
        if (tag.checked) {
            return tag.nextElementSibling.children[1].innerHTML
        }
    }).filter(Boolean)

    const newListing = {
        listingTitle: title.value,
        address: address.innerHTML,
        website: website.value,
        type:typeValue.value,
        twitter: twitter.value,
        linkedin: linkedin.value,
        facebook: facebook.value,
        dribble: dribbble.value,
        previousprice: Number(previousprice.value),
        price: Number(price.value),
        whatsapp: whatsapp.value,
        phone:phone.value,
        cityorstate: city.innerHTML,
        email: email.value,
        gallery: imageUrls,
        uploadlink: uploadlink.value,
        zipcode: Number(zipcode.value),
        description: descriptions.value,
        category: category.value,
        profileImage: profileImageUrl,
        splashscreen:coverImageUrl,
        slogan:slogan.value,
        roadorstate: locations.innerHTML,
        locationCoords: {
         latitude: lat,
         longtitude: long
        },
        timeschedule: [
            {
                closingtime: startFriday.value,
                openingTime: endFriday.value
            },
            {
                closingtime: startMonday.value,
                openingTime: endMonday.value
            },
            {
                closingtime: startSaturday.value,
                openingTime: endSaturday.value
            },
            {
                closingtime: startThursday.value,
                openingTime: endThursday.value
            },
            {
                closingtime: startTuesday.value,
                openingTime: endTuesday.value
            },
            {
                closingtime: startWednesday.value,
                openingTime: endWednesday.value
            },
            {
                closingtime: startSunday.value,
                openingTime: endSunday.value
            }
        ],
        tags,
        features,
    }

    fetch('http://localhost:3001/api/addnewlisting', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newListing)
    })
        .then(res => res.json())
        .then(res => console.log(res))

})

