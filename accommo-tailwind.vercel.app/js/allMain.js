const listingsTable = document.getElementById('listingsTable');
const city = document.getElementById('city');
const street = document.getElementById('street');
const addresss = document.getElementById('addresss');
let listings = [];


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

const getAllListings = async () => {
  try {
    const request = await fetch('https://adminpanelback.onrender.com/api/listings')
    if (!request.ok) {
      throw new Error("Request is failed !")
    } else {
      const response = await request.json()
      listings = [...response]
      listings.forEach(listing => listingsTable.innerHTML +=
        `
                <tr class="align-middle hover:bg-gray-50 dark:hover:bg-background">
                <td class="border-b border-gray-200 dark:border-gray-900 whitespace-nowrap text-sm font-medium text-gray-700 dark:text-gray-300 px-6 py-3">
                  <div class="flex items-center mr-10">
                    <img class="w-10 h-10 object-cover rounded-lg mr-4 border border-white" src="${listing.profileImage}" alt="" /> ${listing.listingTitle}
                  </div>
                </td>
                <td class="border-b border-gray-200 dark:border-gray-900 whitespace-nowrap text-sm font-regular text-gray-500 dark:text-gray-300 px-6 py-3"> ${listing.verify} </td>
                <td class="border-b border-gray-200 dark:border-gray-900 whitespace-nowrap text-sm font-regular text-gray-500 dark:text-gray-300 px-6 py-3"> ${listing.address.slice(0, 28)}... </td>
                <td class="border-b border-gray-200 dark:border-gray-900 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-300 px-6 py-3">
                  <div class="flex items-center">
                   $${listing.previousprice} - ${listing.price}$
                  </div>
                </td>
                <td class="border-b border-gray-200 dark:border-gray-900 whitespace-nowrap text-sm font-medium text-gray-700 dark:text-gray-300 px-6 py-3">
                  <div class="flex items-center">
                    <button onclick="toggleModal('${listing._id}')" type="button" class="border mr-2 border-gray-200 hover:bg-blue-500 dark:hover:border-blue-500 hover:text-white text-gray-700 dark:text-gray-300 dark:border-gray-800 rounded-full w-8 h-8 flex justify-center items-center">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.1767 2.5903C14.964 1.80323 16.2424 1.80323 17.0296 2.5903L17.4107 2.97163C18.1979 3.75885 18.1979 5.03604 17.4107 5.82326L10.4705 12.7603C10.206 13.0279 9.86907 13.1854 9.50065 13.2987L6.64776 13.9568C6.47772 13.9946 6.30138 13.9442 6.17857 13.8214C6.05577 13.6986 6.00538 13.5223 6.04317 13.3522L6.70129 10.4994C6.78631 10.1309 6.97209 9.794 7.23975 9.50116L14.1767 2.5903ZM16.3148 3.30289C15.9212 2.90928 15.2852 2.90928 14.8915 3.30289L14.0476 4.1449L15.8551 5.95236L16.6959 5.10846C17.0895 4.7158 17.0895 4.07783 16.6959 3.68422L16.3148 3.30289ZM7.68374 10.7261L7.20511 12.7949L9.24559 12.3163C9.45657 12.2753 9.62661 12.1809 9.75886 12.0203L15.1435 6.66401L13.336 4.8575L7.9514 10.2411C7.81914 10.3734 7.72468 10.5434 7.68374 10.7261ZM8.54969 3.89299C8.82679 3.89299 9.05351 4.11845 9.05351 4.39681C9.05351 4.67518 8.82679 4.90064 8.54969 4.90064H4.51911C3.68434 4.90064 3.00764 5.57765 3.00764 6.4121V15.4809C3.00764 16.3153 3.68434 16.9924 4.51911 16.9924H13.5879C14.4224 16.9924 15.0994 16.3153 15.0994 15.4809V11.4503C15.0994 11.1732 15.3261 10.9465 15.6032 10.9465C15.8803 10.9465 16.107 11.1732 16.107 11.4503V15.4809C16.107 16.8727 14.9797 18 13.5879 18H4.51911C3.12793 18 2 16.8727 2 15.4809V6.4121C2 5.02092 3.12793 3.89299 4.51911 3.89299H8.54969Z" fill="currentColor" />
                      </svg> </button>
                    <button onclick="deleteListing('${listing._id}')" type="button" class="border mr-2 border-gray-200 hover:bg-blue-500 dark:hover:border-blue-500 hover:text-white text-gray-700 dark:text-gray-300 dark:border-gray-800 rounded-full w-8 h-8 flex justify-center items-center">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 14.5C7.5 14.775 7.275 15 7 15C6.725 15 6.5 14.775 6.5 14.5V7.5C6.5 7.225 6.725 7 7 7C7.275 7 7.5 7.225 7.5 7.5V14.5ZM10.5 14.5C10.5 14.775 10.275 15 10 15C9.725 15 9.5 14.775 9.5 14.5V7.5C9.5 7.225 9.725 7 10 7C10.275 7 10.5 7.225 10.5 7.5V14.5ZM13.5 14.5C13.5 14.775 13.275 15 13 15C12.725 15 12.5 14.775 12.5 14.5V7.5C12.5 7.225 12.725 7 13 7C13.275 7 13.5 7.225 13.5 7.5V14.5ZM12.6906 2.705L13.5281 4H16.5C16.775 4 17 4.22375 17 4.5C17 4.77625 16.775 5 16.5 5H16V15.5C16 16.8813 14.8813 18 13.5 18H6.5C5.11937 18 4 16.8813 4 15.5V5H3.5C3.22387 5 3 4.77625 3 4.5C3 4.22375 3.22387 4 3.5 4H6.47187L7.28125 2.705C7.55625 2.26644 8.0375 2 8.55312 2H11.4469C11.9625 2 12.4438 2.26644 12.6906 2.705ZM7.65312 4H12.3469L11.8687 3.235C11.7781 3.08875 11.6187 3 11.4469 3H8.55312C8.38125 3 8.22187 3.08875 8.13125 3.235L7.65312 4ZM5 15.5C5 16.3281 5.67156 17 6.5 17H13.5C14.3281 17 15 16.3281 15 15.5V5H5V15.5Z" fill="currentColor" />
                      </svg> </button>
                  </div>
                </td>
              </tr>
                `)
    }
  } catch (err) {
    alert(err.message)
  }
}
getAllListings()


let map;
let marker;
let long;
let lat;

   

let getProfileImageUrl = '';
let splashscreenImageUrl = '';

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
        getProfileImageUrl = downloadURL
      });
    }
  );
})



updateSplashScreen.addEventListener('change', (e) => {
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
        splashscreenImageUrl = downloadURL
      });
    }
  );
})

const getAllCat = async () => {
  try {
    const request = await fetch('https://adminpanelback.onrender.com/api/categories')
    if (!request.ok) {
      throw new Error("Request is failed !")
    } else {
      const response = await request.json()
      response.forEach(res => document.getElementById('category').innerHTML +=
        `
                  <option value="${res.name}">${res.name}</option>
                `)
    }
  } catch (err) {
    alert(err.message)
  }
}
getAllCat()



let findId;
let findListingById;

function toggleModal(id) {
  findId = id
  if (id) {
    findListingById = listings.find(listing => listing._id === id)
    console.log(findListingById)
    if (findListingById) {
      updateName.value = findListingById.listingTitle
      updatePhone.value = findListingById.phone
      updateSlogan.value = findListingById.slogan
      updateEmail.value = findListingById.email
      updateDescription.value = findListingById.description
      updateLinkedin.value = findListingById.linkedin
      updateWhatsapp.value = findListingById.whatsapp
      updateFacebook.value = findListingById.facebook
      updateTwitter.value = findListingById.twitter
      updateWebsite.value = findListingById.website
      updateMinPrice.value = findListingById.previousprice
      updateMaxPrice.value = findListingById.price
      updateLink.value = findListingById.uploadlink
      verifySelect.value = findListingById.verify
      category.value = findListingById.category
      saturdayStart.value = findListingById.timeschedule[5].openingTime
      saturdayEnd.value = findListingById.timeschedule[5].closingtime
      sundayStart.value = findListingById.timeschedule[6].openingTime
      sundayEnd.value = findListingById.timeschedule[6].closingtime
      fridayStart.value = findListingById.timeschedule[4].openingTime
      fridayEnd.value = findListingById.timeschedule[4].closingtime
      thursdayStart.value = findListingById.timeschedule[3].openingTime
      thursdayEnd.value = findListingById.timeschedule[3].closingtime
      wednesdayStart.value = findListingById.timeschedule[2].openingTime
      wednesdayEnd.value = findListingById.timeschedule[2].closingtime
      tuesdayStart.value = findListingById.timeschedule[1].openingTime
      tuesdayEnd.value = findListingById.timeschedule[1].closingtime
      mondayStart.value = findListingById.timeschedule[0].openingTime
      mondayEnd.value = findListingById.timeschedule[0].closingtime
      typeListing.value = findListingById.type
      findListingById.tags.forEach(ta => document.getElementById("tags").innerHTML +=
        `
      <div class="mb-5 flex items-center">
       <input type="checkbox" checked="true" id="${ta}" class="check_tag checkbox-checked peer appearance-none h-4 w-4 border-[2px] border-gray-500 dark:border-gray-400 rounded-[5px] bg-white dark:bg-foreground bg-cover bg-center checked:border-0 focus:outline-none mr-3 cursor-pointer">
       <label for="${ta}"  class="text-sm flex text-gray-700 dark:text-gray-400 peer-checked:text-blue-500 dark:peer-checked:text-blue-500">
     <span>${ta}</span>
       </label>
     </div>
      `
      )
      findListingById.features.forEach(feature => document.getElementById("features").innerHTML +=
        `
    <div class="mb-5 flex items-center">
     <input type="checkbox" checked="true" id="${feature}" class="check_tag checkbox-checked peer appearance-none h-4 w-4 border-[2px] border-gray-500 dark:border-gray-400 rounded-[5px] bg-white dark:bg-foreground bg-cover bg-center checked:border-0 focus:outline-none mr-3 cursor-pointer">
     <label for="${feature}"  class="text-sm flex text-gray-700 dark:text-gray-400 peer-checked:text-blue-500 dark:peer-checked:text-blue-500">
   <span>${feature}</span>
     </label>
   </div>
    `
      )
      const blob = new Blob([findListingById.splashscreen], { type: 'image/*' });
      const file = new File([blob], findListingById.splashscreen, { type: 'image/*' });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      let fileInput = document.getElementById('updateSplashScreen');
      fileInput.files = dataTransfer.files;
      splashscreenImageUrl = document.getElementById('updateSplashScreen').value.split(`\C:\\fakepath\\`)[1];
      console.log(splashscreenImageUrl)


      const blob2 = new Blob([findListingById.profileImage], { type: 'image/*' });
      const file2 = new File([blob2], findListingById.profileImage, { type: 'image/*' });
      const dataTransfer2 = new DataTransfer();
      dataTransfer2.items.add(file2);
      let fileInput2 = document.getElementById('profileimage');
      fileInput2.files = dataTransfer2.files;
      getProfileImageUrl = profileimage.value.split(`\C:\\fakepath\\`)[1];
      console.log(getProfileImageUrl)

    }


    long = findListingById.locationCoords.longtitude
    lat = findListingById.locationCoords.latitude
    console.log(lat, long);
    map = L.map('map').setView([lat, long], 17);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    marker = L.marker([lat, long]).addTo(map);
    var url = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + lat + '&lon=' + long;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            city.innerHTML = data.address.state
            addresss.innerHTML = data.display_name
            street.innerHTML = data.display_name.split(',')[0];
            marker.bindPopup(`${data.display_name}`).openPopup()
        });
    map.on('click', function (e) {
        if (marker) {
            map.removeLayer(marker)
            console.log(e.latlng);
            marker = L.marker(e.latlng).addTo(map)

            const latitude = e.latlng.lat
            const longtitude = e.latlng.lng
            long = e.latlng.lng
            lat = e.latlng.lat
            console.log(lat, long)
            var url = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + latitude + '&lon=' + longtitude;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    city.innerHTML = data.address.state
                    addresss.innerHTML = data.display_name
                    street.innerHTML = data.display_name.split(',')[0];
                    marker.bindPopup(`${data.display_name}`).openPopup()
                });
        }
    })
  }else {
    map.remove();
  }

  document.getElementById('modal').classList.toggle('hidden')
}


const updateListing = async () => {

  try {
const tags = document.querySelectorAll('#tags input')
const allFeatures = document.querySelectorAll('#features input')


    const allTags = [...tags].map(tag => {
      if (tag.checked) {
          return tag.nextElementSibling.children[0].innerHTML
      }
  }).filter(Boolean)

  const features = [...allFeatures].map(tag => {
      if (tag.checked) {
          return tag.nextElementSibling.children[0].innerHTML
      }
  }).filter(Boolean)
  console.log(allTags,features)


  if(updateEmail.value == '' ||
  updateTwitter.value == '' ||
  updateLink.value == '' ||
  updateSlogan.value == '' ||
  updatePhone.value == '' ||
  updateDescription.value == '' ||
  updateFacebook.value == '' ||
  updateLinkedin.value == '' ||
  updateWhatsapp.value == '' ||
  updateName.value == '' ||
  updateMaxPrice.value == '' ||
  updateMinPrice.value == '' ||
  splashscreenImageUrl == '' ||
getProfileImageUrl == '' ||
mondayStart.value == '' ||
mondayEnd.value == '' ||
tuesdayStart.value == '' ||
tuesdayEnd.value == '' ||
wednesdayStart.value == '' ||
wednesdayEnd.value == '' ||
thursdayStart.value == '' ||
thursdayEnd.value == '' ||
fridayStart.value == '' ||
fridayEnd.value == '' ||
saturdayStart.value == '' ||
saturdayEnd.value == '' ||
sundayStart.value == '' ||
sundayEnd.value == ''

  ){
    alert("Please fill inputs or input !")
  }else {
    const listing = {
      email: updateEmail.value,
      twitter: updateTwitter.value,
      uplaodlink: updateLink.value,
      slogan: updateSlogan.value,
      phone: updatePhone.value,
      description: updateDescription.value,
      facebook: updateFacebook.value,
      linkedin: updateLinkedin.value,
      whatsapp: updateWhatsapp.value,
      website: updateWebsite.value,
      category: category.value,
      type: typeListing.value,
      listingTitle: updateName.value,
      price: updateMaxPrice.price,
      previousprice: updateMinPrice.value,
      splashscreen: splashscreenImageUrl,
      profileImage: getProfileImageUrl,
      reviews: findListingById.reviews,
      rating_avg: findListingById.rating_avg,
      cityorstate: city.innerHTML,
      roadorstreet: street.innerHTML,
      address: addresss.innerHTML,
   timeschedule: [
    {
      closingtime: mondayStart.value,
      openingTime: mondayEnd.value
    },
    {
      closingtime: tuesdayStart.value,
      openingTime: tuesdayEnd.value
    },
    {
      closingtime: wednesdayStart.value,
      openingTime: wednesdayEnd.value
    },
    {
      closingtime: thursdayStart.value,
      openingTime: thursdayEnd.value
    },
    {
      closingtime: fridayStart.value,
      openingTime: fridayEnd.value
    },
    {
      closingtime: saturdayStart.value,
      openingTime: saturdayEnd.value
    },
    {
      closingtime: sundayStart.value,
      openingTime: sundayEnd.value
    }
   ],
   tags: allTags.length > 0 ? allTags : [],
   features: features.length > 0 ? features : [],
   locationCoords: {
    latitude: lat,
    longtitude: long
   }
  
    }
  
    const request = await fetch(`https://adminpanelback.onrender.com/api/updatelisting/${findId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(listing)
    })
  
  
    if (!request.ok) {
      throw new Error('Request is failed')
    } else {
      const response = await request.json()
      alert("Updated listing successfully !")
      location.reload()
    }
  }
  


  } catch (err) {
    alert(err.message)
  }
}


updateListingBtn.addEventListener('click', updateListing)


// delete listing

async function deleteListing(id) {
  try {
    const request = await fetch(`https://adminpanelback.onrender.com/api/deletelisting/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (!request.ok) {
      throw new Error("Request is failed !")
    } else {
      alert("Deleted linting successfully !")
      location.reload()
    }
  } catch (err) {
    alert(err.message)
  }
}