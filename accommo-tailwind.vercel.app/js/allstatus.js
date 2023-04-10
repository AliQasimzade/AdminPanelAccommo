const tbody = document.getElementById("tbody")
const image = document.getElementById("updateImage")
const updateStatus = document.getElementById("updateStatus")
let status = [];

const getStatus = async()=>{
    let req = await fetch("https://adminpanelback.onrender.com/api/status")
    let res = await req.json()
    status = [...res]
    console.log(status);

    status.forEach(item =>{
        tbody.innerHTML += 
        `
        <tr class="align-middle hover:bg-gray-50 dark:hover:bg-background">
        <td class="border-b border-gray-200 dark:border-gray-900 whitespace-nowrap text-sm font-regular text-gray-500 dark:text-gray-300 px-6 py-3">${item.sharedBy} </td>
        <td class="border-b border-gray-200 dark:border-gray-900 whitespace-nowrap text-sm font-regular text-gray-500 dark:text-gray-300 px-6 py-3"> 
            <img src= ${item.image} alt = ${item.sharedBy}  class="w-12 h-12">
        </td>
        <td class="border-b border-gray-200 dark:border-gray-900 whitespace-nowrap text-sm font-regular text-gray-500 dark:text-gray-300 px-6 py-3">${item.content} </td>

        
        <td class="border-b border-gray-200 dark:border-gray-900 whitespace-nowrap text-sm font-medium text-gray-700 dark:text-gray-300 px-6 py-3">
          <div class="flex items-center">
            <button type="button" onclick="deleteElement('${item._id}')" class="border mr-2 border-gray-200 hover:bg-blue-500 dark:hover:border-blue-500 hover:text-white text-gray-700 dark:text-gray-300 dark:border-gray-800 rounded-full w-8 h-8 flex justify-center items-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 14.5C7.5 14.775 7.275 15 7 15C6.725 15 6.5 14.775 6.5 14.5V7.5C6.5 7.225 6.725 7 7 7C7.275 7 7.5 7.225 7.5 7.5V14.5ZM10.5 14.5C10.5 14.775 10.275 15 10 15C9.725 15 9.5 14.775 9.5 14.5V7.5C9.5 7.225 9.725 7 10 7C10.275 7 10.5 7.225 10.5 7.5V14.5ZM13.5 14.5C13.5 14.775 13.275 15 13 15C12.725 15 12.5 14.775 12.5 14.5V7.5C12.5 7.225 12.725 7 13 7C13.275 7 13.5 7.225 13.5 7.5V14.5ZM12.6906 2.705L13.5281 4H16.5C16.775 4 17 4.22375 17 4.5C17 4.77625 16.775 5 16.5 5H16V15.5C16 16.8813 14.8813 18 13.5 18H6.5C5.11937 18 4 16.8813 4 15.5V5H3.5C3.22387 5 3 4.77625 3 4.5C3 4.22375 3.22387 4 3.5 4H6.47187L7.28125 2.705C7.55625 2.26644 8.0375 2 8.55312 2H11.4469C11.9625 2 12.4438 2.26644 12.6906 2.705ZM7.65312 4H12.3469L11.8687 3.235C11.7781 3.08875 11.6187 3 11.4469 3H8.55312C8.38125 3 8.22187 3.08875 8.13125 3.235L7.65312 4ZM5 15.5C5 16.3281 5.67156 17 6.5 17H13.5C14.3281 17 15 16.3281 15 15.5V5H5V15.5Z" fill="currentColor" />
              </svg> </button>
          </div>
        </td>
      </tr>
        
        `
    })
}
getStatus()

let findId;
let findStatusById;
let getImageUrl;
image.addEventListener('change', (e) => {
    const reader = new FileReader()
    reader.addEventListener('load', (e) => {
        getImageUrl= reader.result;
    });
    reader.readAsDataURL(e.target.files[0]);
    console.log(e.target.files);
})

  // delete

  async function deleteElement(id){
    console.log(id);
    const request = await fetch(`https://adminpanelback.onrender.com/api/deletestatus/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },

  })
  location.reload()
}