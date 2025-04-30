document.addEventListener('DOMContentLoaded', updateCompanyTable());

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
            for (let btn of document.getElementsByClassName('delete-company')) {
                btn.addEventListener('click', deleteCompany);
            }
            for (let btn of document.getElementsByClassName('update-company')) {
                btn.addEventListener('click', updateCompany);
            }
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

function updateCompany() {
    console.log('updated company')
}

function deleteCompany() {
    console.log('deleted company')
}