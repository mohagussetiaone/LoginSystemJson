// Membuat Fnction
function register(event){
    // mencegah form reload page
    event.preventDefault ()

    // Tangkap data dari form
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let password2 = document.getElementById('password2').value

    // perbandingan password dengan password2
    if (password !== password2 ){
        alert('password harus sama')
    } else {
        fetch('http://localhost:3000/register', {
            mode : 'cors',
            method : 'POST',
            headers : {
                "Content-Type" : "application/json"
            },
            // convert jscript object to json
            body: JSON.stringify({
                email : email,
                password : password
            })


        })
        .then(rest => rest.json())
        .then(data => {
            if(data.accessToken){
                // Arahkan ke page login
                window.location.href = '/'
                alert('registrasi berhasil')

            } else {
                alert(data)
            }

        })
        .catch(err => console.log(err))
    }
}


function login(event) {
    event.preventDefault()

    let email = document.getElementById('email').value
    let password = document.getElementById('password').value

    fetch('http://localhost:3000/login', {
        method : 'POST',
        mode : 'cors',
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify ({
            email : email,
            password : password
        })
    })
    .then (res => res.json())
    .then(data => {
        if (data.accessToken){
            // Tambah acces Token ke session Storage
            sessionStorage.setItem('isLogin', 'true')

            // Lempar user ke home page

            window.location.href = 'home.html'
            alert ('Login Berhasil')
        } else {
            alert(data)
        }
    })
    .catch(err => console.log(err))
}

function loginChecker(){
    if (sessionStorage.getItem('isLogin')){
        window.location.href= 'home.html'
    }
}

// Chek apakah user sudah logout
function logoutChecker(){
    if (sessionStorage.getItem('isLogin')){
        window.location.href= 'index.html'
    }
}