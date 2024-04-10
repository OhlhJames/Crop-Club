const loginForm = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if(email&&password){
        const response = await fetch('api/users/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/');
        }else {
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

document.querySelector('#login-form').addEventListener('submit', signupForm ); //you have to call the form class name because it is a form
document.querySelector('#signup-form').addEventListener('submit', loginForm);
