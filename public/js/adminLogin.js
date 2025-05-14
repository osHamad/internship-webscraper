document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login-btn').addEventListener('click', handleLogin);
    
    // Also allow submitting with Enter key
    document.getElementById('password').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    });
});

function handleLogin() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    
    if (!email || !password) {
        displayNotification('error', 'Fields cannot be empty');
        return;
    }
    
    fetch('/admin/login', {  //I assume this is the correct endpoint for login
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Login failed');
        }
        return response.json();
    })
    .then(data => {
        displayNotification('success', 'Login successful');
        setTimeout(() => {
            window.location.href = '/admin'; //It should redirect to the admin dashboard if there is one
        }, 1000);
    })
    .catch(error => {
        displayNotification('error', 'Invalid email or password');
    });
}