
function formatDate(date) {
    const dayLength = 60 * 60 * 24 * 1000
    const currentTime = new Date().getTime();
    const postTime = new Date(date).getTime();
    const postAge = (currentTime - postTime) / dayLength
    if (postAge < 1) {
        return 'Today';
    } else if (postAge >= 30) {
        return "30+ days ago";
    } else {
        return Math.ceil(postAge).toString() + ' days ago';
    }
}

function updateJobTable() {
    const tableBody = document.querySelector('#job-table tbody');
    tableBody.innerHTML = '';
    fetch('/listing/get-all', {
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
            data.forEach(job => {
                const row = document.createElement('tr');
                row.innerHTML = `
                  <td>${job.title}</td>
                  <td>${job.company}</td>
                  <td>Temporarily Unavailable</td>
                  <td>${formatDate(job.addedAt)}</td>
                  <td><a href="${job.link}" target="_blank">Apply</a></td>
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
        row.innerHTML = 'An error occured while fetching the jobs';
        tableBody.appendChild(row);
    })
}

updateJobTable()