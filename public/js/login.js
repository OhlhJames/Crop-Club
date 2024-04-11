const loginForm = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    const email = document.querySelector('#email-login').value.trim();

    if(username&&email&&password){
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({username, email, password}),
            headers: {'Content-Type': 'application/json'},
        });

        if (response.ok) {
            alert('Welcome to Crob-Club');
            document.location.replace('/');
        } else {
            alert('Failed to log in');
        }
        
    }
};

const signupForm = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if(username&&email&&password){
        const response = await fetch('api/users/', {
            method: 'POST',
            body: JSON.stringify({username, email, password}),
            headers: {'Content-Type': 'application/json'},
        });

        if(response.ok){
            document.location.replace('/');
        }else {
            alert('Failed to sign up.');
        }
    }
};



document.querySelector('#login-form').addEventListener('submit', loginForm ); //you have to call the form class name because it is a form
document.querySelector('#signup-form').addEventListener('submit', signupForm);


const logout = async () => {
    console.log('Logout function called');
    const response = await fetch('/api/users/logout', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if(response.ok){
        alert('Bye, see you next time');
        document.location.replace('/login'); 
    }else {
        alert('Failed to log out');
    }
    
};

document.querySelector('#logout').addEventListener('click', logout)

document.addEventListener('DOMContentLoaded', () => {
    const loginFormEl = document.querySelector('#login-form');
    if (loginFormEl) {
        loginFormEl.addEventListener('submit', loginForm);
    }

    const signupFormEl = document.querySelector('#signup-form');
    if (signupFormEl) {
        signupFormEl.addEventListener('submit', signupForm);
    }

    const logoutButton = document.querySelector('#logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
});
