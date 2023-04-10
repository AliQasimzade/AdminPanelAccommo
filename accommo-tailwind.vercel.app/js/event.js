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

const createEvent = async ()=>{ 
    const newEvent = {
        name: name.value,
        description : desc.value,
        locationName : place.value,
        locationAddress : adress.value,
        startDate : startTime.value,
        endDate : endTime.value,
        entryPrice : price.value,
        contactInfo : info.value,
        details : details.value
    }
    const req = await fetch("https://adminpanelback.onrender.com/api/createevent" , {
        method : "POST",
        headers :{
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(newEvent)

    })
    const res = await req.json()
    console.log(res);
}
submit.addEventListener("click" , createEvent)













