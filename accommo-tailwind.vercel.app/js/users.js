const usersData = document.getElementById('users_data');
const updateIsAdmin = document.getElementById('updateIsAdmin');
const updateName = document.getElementById('updateName');
const updateSurname = document.getElementById('updateSurname');
const updatePhone = document.getElementById('updatePhone');
const updateEmail = document.getElementById('updateEmail');
const updatePassword = document.getElementById('updatePassword');
const updateUserBtn = document.getElementById('updateUserBtn')

let users = []
const getUsers = async () => {
    try {
        const request = await fetch('http://localhost:3001/api/allusers')

        if (!request.ok) {
            throw new Error('Request is failed !')
        } else {
            const response = await request.json();
            users = [...response]
            users.forEach(user => {
                usersData.innerHTML +=
                    `

                 <tr class="align-middle hover:bg-gray-50 dark:hover:bg-background [&>td]:hover:font-medium [&>td]:hover:text-gray-700 dark:[&>td]:hover:text-gray-100">
                          <td class="border-b border-gray-200 dark:border-gray-900 whitespace-nowrap text-sm font-normal text-gray-500 dark:text-gray-300 px-6 py-3">
                            <div class="flex items-center">
                              <label for="" class="">${user.name}</label>
                            </div>
                          </td>
                          <td class="border-b border-gray-200 text-gray-500 dark:border-gray-900 whitespace-nowrap text-sm font-normal dark:text-gray-300 px-6 py-3"> ${user.surname}</td>
                          <td class="border-b border-gray-200 dark:border-gray-900 whitespace-nowrap text-sm font-regular text-gray-500 dark:text-gray-300 px-6 py-3"> ${user.email} </td>
                          <td class="border-b border-gray-200 dark:border-gray-900 whitespace-nowrap text-sm font-regular text-gray-500 dark:text-gray-300 px-6 py-3"> ${user.phone} </td>
                          <td class="border-b border-gray-200 dark:border-gray-900 whitespace-nowrap text-sm font-regular text-gray-500 dark:text-gray-300 px-6 py-3"> ${user.password} </td>
                          <td class="border-b border-gray-200 dark:border-gray-900 whitespace-nowrap text-sm font-regular text-gray-500 dark:text-gray-300 px-6 py-3"> ${user.isAdmin} </td>
                          <td class="border-b border-gray-200 dark:border-gray-900 whitespace-nowrap text-sm font-medium text-gray-700 dark:text-gray-300 px-6 py-3">
                            <div class="flex items-center">
                              <button type="button" onclick="toggleModal('${user._id}')" class="border mr-2 border-gray-200 hover:bg-blue-500 dark:hover:border-blue-500 hover:text-white text-gray-700 dark:text-gray-300 dark:border-gray-800 rounded-full w-8 h-8 flex justify-center items-center">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M14.1767 2.5903C14.964 1.80323 16.2424 1.80323 17.0296 2.5903L17.4107 2.97163C18.1979 3.75885 18.1979 5.03604 17.4107 5.82326L10.4705 12.7603C10.206 13.0279 9.86907 13.1854 9.50065 13.2987L6.64776 13.9568C6.47772 13.9946 6.30138 13.9442 6.17857 13.8214C6.05577 13.6986 6.00538 13.5223 6.04317 13.3522L6.70129 10.4994C6.78631 10.1309 6.97209 9.794 7.23975 9.50116L14.1767 2.5903ZM16.3148 3.30289C15.9212 2.90928 15.2852 2.90928 14.8915 3.30289L14.0476 4.1449L15.8551 5.95236L16.6959 5.10846C17.0895 4.7158 17.0895 4.07783 16.6959 3.68422L16.3148 3.30289ZM7.68374 10.7261L7.20511 12.7949L9.24559 12.3163C9.45657 12.2753 9.62661 12.1809 9.75886 12.0203L15.1435 6.66401L13.336 4.8575L7.9514 10.2411C7.81914 10.3734 7.72468 10.5434 7.68374 10.7261ZM8.54969 3.89299C8.82679 3.89299 9.05351 4.11845 9.05351 4.39681C9.05351 4.67518 8.82679 4.90064 8.54969 4.90064H4.51911C3.68434 4.90064 3.00764 5.57765 3.00764 6.4121V15.4809C3.00764 16.3153 3.68434 16.9924 4.51911 16.9924H13.5879C14.4224 16.9924 15.0994 16.3153 15.0994 15.4809V11.4503C15.0994 11.1732 15.3261 10.9465 15.6032 10.9465C15.8803 10.9465 16.107 11.1732 16.107 11.4503V15.4809C16.107 16.8727 14.9797 18 13.5879 18H4.51911C3.12793 18 2 16.8727 2 15.4809V6.4121C2 5.02092 3.12793 3.89299 4.51911 3.89299H8.54969Z" fill="currentColor" />
                                </svg> </button>
                              <button type="button" onclick="deleteUser('${user._id}')" class="border mr-2 border-gray-200 hover:bg-blue-500 dark:hover:border-blue-500 hover:text-white text-gray-700 dark:text-gray-300 dark:border-gray-800 rounded-full w-8 h-8 flex justify-center items-center">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M7.5 14.5C7.5 14.775 7.275 15 7 15C6.725 15 6.5 14.775 6.5 14.5V7.5C6.5 7.225 6.725 7 7 7C7.275 7 7.5 7.225 7.5 7.5V14.5ZM10.5 14.5C10.5 14.775 10.275 15 10 15C9.725 15 9.5 14.775 9.5 14.5V7.5C9.5 7.225 9.725 7 10 7C10.275 7 10.5 7.225 10.5 7.5V14.5ZM13.5 14.5C13.5 14.775 13.275 15 13 15C12.725 15 12.5 14.775 12.5 14.5V7.5C12.5 7.225 12.725 7 13 7C13.275 7 13.5 7.225 13.5 7.5V14.5ZM12.6906 2.705L13.5281 4H16.5C16.775 4 17 4.22375 17 4.5C17 4.77625 16.775 5 16.5 5H16V15.5C16 16.8813 14.8813 18 13.5 18H6.5C5.11937 18 4 16.8813 4 15.5V5H3.5C3.22387 5 3 4.77625 3 4.5C3 4.22375 3.22387 4 3.5 4H6.47187L7.28125 2.705C7.55625 2.26644 8.0375 2 8.55312 2H11.4469C11.9625 2 12.4438 2.26644 12.6906 2.705ZM7.65312 4H12.3469L11.8687 3.235C11.7781 3.08875 11.6187 3 11.4469 3H8.55312C8.38125 3 8.22187 3.08875 8.13125 3.235L7.65312 4ZM5 15.5C5 16.3281 5.67156 17 6.5 17H13.5C14.3281 17 15 16.3281 15 15.5V5H5V15.5Z" fill="currentColor" />
                                </svg> </button>
                            </div>
                          </td>
                        </tr>

                 `
            })
        }
    } catch (err) {
        alert(err.message)
    }
}
getUsers()
let findId;
let findUserById;
function toggleModal(id) {
    findId = id
    if (id) {
        findUserById = users.find(user => user._id === id)

        if (findUserById) {
            updateIsAdmin.value = findUserById.isAdmin
            updateName.value = findUserById.name
            updateSurname.value = findUserById.surname
            updatePhone.value = findUserById.phone
            updateEmail.value = findUserById.email
            updatePassword.value = findUserById.password
        }
    }
    document.getElementById('modal').classList.toggle('hidden')
}


const updateUser = async () => {

    if (updateName.value == findUserById.name &&
        updateEmail.value == findUserById.email &&
        updatePassword.value == findUserById.password &&
        updatePhone.value == findUserById.phone &&
        updateSurname.value == findUserById.surname &&
        updateIsAdmin.value == String(findUserById.isAdmin)) {
        alert('Please update any input')
    } else {
        try {
            const updateUser = {
                name: updateName.value,
                surname: updateSurname.value,
                email: updateEmail.value,
                phone: updatePhone.value,
                password: updatePassword.value,
                isAdmin: updateIsAdmin.value == 'true' ? true : false
            }

            const request = await fetch(`http://localhost:3001/api/updateuser/${findId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updateUser)
            })


            if (!request.ok) {
                throw new Error('Request is failed')
            } else {
                const response = await request.json()
                console.log(response);
            }


        } catch (err) {
            alert(err.message)
        }
    }
}

const deleteUser = async (id) => {
    findId = id
    try {
        const request = await fetch(`http://localhost:3001/api/deleteuser/${findId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!request.ok) {
            throw new Error('Request is failed !')
        } else {
            const response = await request.json()
           location.reload()
        }
    } catch (err) {
        alert(err.message)
    }
}

updateUserBtn.addEventListener('click', updateUser)