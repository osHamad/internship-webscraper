function displayNotification(status, message) {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.classList.add(status)
        notification.innerText = message
        setTimeout(() => notification.classList.add('show'), 200); // fade in
        setTimeout(() => notification.classList.remove('show'), 3000); // fade out
        setTimeout(() => notification.innerHTML, 3500); // remove from DOM
    }
}

function displayModal(modalName) {
    const modal = document.getElementById(modalName)
    modal.classList.remove('hidden')
}

function hideModal(modalName) {
    const modal = document.getElementById(modalName)
    modal.classList.add('hidden')
}
