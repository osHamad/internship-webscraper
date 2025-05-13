document.addEventListener('DOMContentLoaded', updateCompanyTable);
document.getElementById('company-table').addEventListener('click', e => manageTableButtonClick(e))
document.getElementById('delete-modal-cancel').addEventListener('click', e => hideModal('delete-modal'))
document.getElementById('delete-modal').addEventListener('click', e => hideModal('delete-modal'))
document.getElementById('delete-card').addEventListener('click', e => e.stopPropagation())
document.getElementById('delete-modal-confirm').addEventListener('click', e => deleteCompanyConfirmed(e))

function shortenString(str, maxLength = 20) {
    return str.length > maxLength ? str.slice(0, maxLength - 3) + '...' : str;
}

function updateCompanyTable() {
    const tableBody = document.querySelector('#company-table tbody');
    tableBody.innerHTML = '';
    fetch('/company/get-all', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error: Could not get jobs')
        }
        return response.json()
    })
    .then(data => {
        if (data.length > 0) {
            data.forEach(company => {
                const row = document.createElement('tr');
                row.setAttribute("data-id", company.id)
                row.setAttribute("name", company.name)
                row.innerHTML = `
                  <td>${company.name}</td>
                  <td>${company.location}</td>
                  <td><a href="${company.jobBoard}" target="_blank">${shortenString(company.jobBoard)}</a></td>
                  <td>${company.linkClass}</td>
                  <td>${company.titleClass}</td>
                  <td>${company.iframeClass}</td>
                  <td>
                  <div class="button-group">
                    <button class="primary-btn update-company">Update</button>
                    <button class="secondary-btn delete-company">Delete</button>
                    </div>
                  </td>
                `;
                tableBody.appendChild(row);
            });
        } else {
            const row = document.createElement('tr');
            row.innerHTML = 'nothing to see here';
            tableBody.appendChild(row);
        }
    })
    .catch(error => {
        console.log(error)
        const row = document.createElement('tr');
        row.innerHTML = 'An error occured while fetching the companies';
        tableBody.appendChild(row);
    })
}

function updateCompany(id) {
    console.log('updated company')
}

function deleteCompany(id, name) {
    displayModal('delete-modal');
    document.getElementById('delete-modal-text').innerText = `Are you sure you want to delete \"${name}\"?`
    document.getElementById('delete-modal-confirm').setAttribute("data-id", id)
}

function deleteCompanyConfirmed(e) {
    hideModal('delete-modal')
    fetch('/company/delete-one', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: e.target.getAttribute("data-id") })
    }).then(response => {
        if (!response.ok) {
            displayNotification("error", "An error occurred while deleting the company") 
        } else {
            displayNotification("success", "Company successfully deleted")
            updateCompanyTable() 
        }
    })
}

function manageTableButtonClick(e) {
    const id = e.target.closest("tr").getAttribute("data-id");
    const name = e.target.closest("tr").getAttribute("name");

    if (e.target.classList.contains("delete-company")) {
        deleteCompany(id, name)
    }

    if (e.target.classList.contains("update-company")) {
        updateCompany(id)
    }
}