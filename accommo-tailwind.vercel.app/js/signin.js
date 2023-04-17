const email = document.getElementById('email');
const password = document.getElementById('password');
const submit = document.getElementById('submit');

submit.addEventListener('click', async () => {
    try {
        if(email.value == '' || password.value == '') {
            alert('Please fill inputs or input !')
        }else if(/^\s+$/.test(email.value) ) {
            alert("Please fill email input !")
        }else if(/^\s+$/.test(password.value)){
            alert("Please fill password input !")
        }else {
            const logUser = {
                email: email.value,
                password: password.value
            }
            const req = await fetch('https://adminpanelback.onrender.com/api/loginuser', {
                method:'PUT',
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(logUser)
            })

            if(!req.ok) {
                throw new Error('Request is failed !')
            }else {
                const res = await req.json()
               
                if(res.message == 'This user is not registered') {
                    alert(res.message)
                }else if(res.message == 'Password is not correct'){
                    alert(res.message)
                
                }else if(res.user.isAdmin == false) {
                    alert("This user is not Admin !")
                }else {
                    alert(res.message)
                    window.location.href = '/dashboard-home.html'
                    sessionStorage.setItem('user', JSON.stringify(res.user))
                }
                
            }
        }
    }catch(err) {
        alert(err.message)
    }
})
