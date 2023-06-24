const signupForm = document.getElementById('signupForm');
const fullNameElement = document.getElementById('fname');
const emailElement = document.getElementById('email');
const passwordElement = document.getElementById('password');
const confirmPasswordElement = document.getElementById('cpassword');
const messageElement = document.getElementById('message');

signupForm.addEventListener('submit', handleSignup);
document.querySelector('.profile').addEventListener('click', redirectToProfile);
document.querySelector('.signup').addEventListener('click', redirectToSignup);

function handleSignup(event) {
    event.preventDefault();

    const fullName = fullNameElement.value;
    const email = emailElement.value;
    const password = passwordElement.value;
    const confirmPassword = confirmPasswordElement.value;

    if (fullName && email && password && confirmPassword && password === confirmPassword) {
        const accessToken = generateAccessToken();
        const userState = {
            fullName: fullName,
            email: email,
            accessToken: accessToken
        };

        localStorage.setItem('userState', JSON.stringify(userState));

        displayMessage('successful signup!', 'success');
        window.location.href = 'profile.html';
    } else {
        displayMessage('Error : All the fields are mandatory', 'error');
    }
}

function generateAccessToken() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let accessToken = '';
    for (let i = 0; i < 16; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        accessToken += characters.charAt(randomIndex);
    }
    return accessToken;
}

function displayMessage(message, type) {
    messageElement.textContent = message;
    messageElement.classList.add(type);
    setTimeout(() => {
        messageElement.textContent = '';
        messageElement.classList.remove(type);
    }, 5000);
}

function redirectToSignup() {
    if (!localStorage.getItem('userState')) {
        window.location.href = 'index.html';
    }
}

function redirectToProfile() {
    if (localStorage.getItem('userState')) {
        const userState = JSON.parse(localStorage.getItem('userState'));
       // document.getElementById('fname2').innerHTML = `<p>${userState.fullName}</p>`
       document.getElementById('fname2').textContent = 'Full Name: ' + userState.fullName;
 
        document.getElementById('email2').innerHTML =`<P>${userState.email}</p>` 
        document.getElementById('accessToken').textContent = 'Access Token: ' + userState.accessToken;
       window.location.href = 'profile.html';
    } else {
     window.location.href = 'index.html';
     }
}

function handleLogout() {
    localStorage.removeItem('userState');
    window.location.href = 'index.html';
}

document.getElementById('logout').addEventListener('click', handleLogout);

redirectToSignup();
redirectToProfile();
