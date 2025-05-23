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
    const usernameOrEmail = document.getElementById('usernameOrEmail').value.trim();
    const password = document.getElementById('password').value.trim();
    
    if (!usernameOrEmail || !password) {
        displayNotification('error', 'Fields cannot be empty');
        return;
    }
    
    fetch('/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usernameOrEmail,
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
            window.location.href = '/admin';
        }, 1000);
    })
    .catch(error => {
        displayNotification('error', 'Invalid email/username or password');
    });
}