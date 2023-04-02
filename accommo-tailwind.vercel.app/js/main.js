const title = document.getElementById("title");
const category = document.getElementById('category');
const keywords = document.getElementById('keywords');
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
const dribble = document.getElementById('dribbble');
const previousprice = document.getElementById('previousprice');
const price = document.getElementById('price');
const allTags = document.querySelectorAll('.check_tag')
const uploadlink = document.getElementById('uploadlink');
const uploadImg = document.getElementById('upload-img');
const bathroom = document.getElementById('bathroom')
const bedroom = document.getElementById('bedroom')
const garage = document.getElementById('garage')
const living = document.getElementById('living')
const date = document.getElementById('date')
const year = document.getElementById('year');
const allFeatures = document.querySelectorAll('.check_feature')
const startSunday = document.getElementById('sunday');
const endSunday = document.getElementById('sundays');
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
let image;
uploadImg.addEventListener('change', (e) => {
    const reader = new FileReader()
    reader.addEventListener('load', (e) => {
        image = reader.result;
        console.log(image);
    });
    reader.readAsDataURL(e.target.files[0]);

})

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const listingKeywords = keywords.value.split(',');
    const tags = [...allTags].map(tag => {
        if (tag.checked) {
            return tag.nextElementSibling.innerHTML
        }
    }).filter(Boolean)

    const features = [...allFeatures].map(tag => {
        if (tag.checked) {
            return tag.nextElementSibling.innerHTML
        }
    }).filter(Boolean)

    const newListing = {
        listingTitle: title.value,
        address: address.value,
        website: website.value,
        twitter: twitter.value,
        linkedin: linkedin.value,
        facebook: facebook.value,
        dribble: dribbble.value,
        previousprice: Number(previousprice.value),
        price: Number(price.value),
        publishdate: date.value,
        yearinbuilt: year.value,
        bedroom: Number(bedroom.value),
        bathroom: Number(bathroom.value),
        garageorparkingslot: Number(garage.value),
        livingarea: Number(living.value),
        cityorstate: city.value,
        email: email.value,
        uploadlink: uploadlink.value,
        zipcode: Number(zipcode.value),
        descriptions: descriptions.value,
        category: category.value,
        roadorstate: locations.value,
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
        listingKeywords,
        tags,
        features,
        image
    }

    fetch('https://adminpanelback.onrender.com/api/addnewlisting', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newListing)
    })
        .then(res => res.json())
        .then(res => console.log(res))

})

