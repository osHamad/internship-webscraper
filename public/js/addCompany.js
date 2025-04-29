document.getElementById('add-btn').addEventListener('click', addCompanySection);
document.getElementById('submit-btn').addEventListener('click', submitCompanies);

function addCompanySection() {
    const newHr = document.createElement('hr');
    const newEntry = document.createElement('div');
    const entriesDiv = document.getElementById('entries');
    newEntry.innerHTML = `
        <div class="company-entry">
            <div class="company-entry-section">
              <input type="text" id="name" placeholder="Company Name*" required />
              <input type="text" id="location" placeholder="Location*" required />
              <input type="url" id="link" placeholder="Job Board Link*" required />
            </div>
            <div class="company-entry-section">
              <input type="text" id="linkClass" placeholder="Link Class*" required />
              <input type="text" id="titleClass" placeholder="Title Class (optional)" />
              <input type="text" id="iframeClass" placeholder="iFrame Class (optional)" />
            </div>
        </div>
    `;
    entriesDiv.appendChild(newHr);
    entriesDiv.appendChild(newEntry);
}

function submitCompanies() {
    let newCompanies = []
    const companies = document.getElementsByClassName('company-entry');
    for (let company of companies) {
        const name = company.querySelector('#name').value.trim();
        const location = company.querySelector('#location').value.trim();
        const jobBoard = company.querySelector('#jobBoard').value.trim();
        const linkClass = company.querySelector('#linkClass').value.trim();
        let titleClass = company.querySelector('#titleClass').value.trim();
        let iframeClass = company.querySelector('#iframeClass').value.trim();
        
        if (name == '' || location == '' || jobBoard == '' || linkClass == '') {
            return console.log('error occurred: make sure to fill required fields')
        }

        if (titleClass == '') titleClass = null;
        if (iframeClass == '') iframeClass = null;

        companyJson = {
            name: name,
            location: location,
            jobBoard: jobBoard,
            linkClass: linkClass,
            titleClass: titleClass,
            iframeClass: iframeClass
        }

        newCompanies.push(companyJson);
    }
    
    fetch('/company/add-many', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            newCompanies
        )
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}