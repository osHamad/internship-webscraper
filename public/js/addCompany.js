document.getElementById('submit-btn').addEventListener('click', submitCompanies);

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
    .then(response => {
        if (response.ok) {
            document.getElementById("name").value = ""
            document.getElementById("location").value = ""
            document.getElementById("jobBoard").value = ""
            document.getElementById("linkClass").value = ""
            document.getElementById("titleClass").value = ""
            document.getElementById("iframeClass").value = ""
            displayNotification("success", `New company successfully added`)
        } else {
            displayNotification("an error occurred while adding the company")
        }
    })
}