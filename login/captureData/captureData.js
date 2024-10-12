let photoBase64 = "";  // Store Base64 image here

// Function to convert the image file to Base64
function encodeImageFileAsURL() {
    const file = document.getElementById("photo").files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
        photoBase64 = reader.result;  // The Base64 string of the image
        console.log('Base64 Image String:', photoBase64);  // For debugging
    };

    if (file) {
        reader.readAsDataURL(file);  // Convert the image file to Base64
    }
}















// Function to add education
function addEducation() {
    const educationType = document.getElementById('education-type').value;
    const educationDetails = document.getElementById('education-details').value;
    const gpa = document.getElementById('gpa').value;
    const educationStart = document.getElementById('education-start').value;
    const educationEnd = document.getElementById('education-end').value;

    if (!educationDetails || !educationStart || !educationEnd) {
        alert('Please fill out all education fields.');
        return;
    }

    const educationList = document.getElementById('education-list');

    // Create the table if it doesn't exist
    let table = document.getElementById('education-table');
    if (!table) {
        table = document.createElement('table');
        table.id = 'education-table';
        table.innerHTML = `
            <tr>
                <th>Type</th>
                <th>Education</th>
                <th>GPA</th>
                <th>Duration</th>
            </tr>
        `;
        educationList.appendChild(table);
    }

    // Add a new row to the table for the current education entry
    const newRow = table.insertRow();
    newRow.innerHTML = `
        <td>${educationType}</td>
        <td>${educationDetails}</td>
        <td>${gpa}</td>
        <td>${educationStart} to ${educationEnd}</td>
    `;

    // Clear the input fields for the next entry
    document.getElementById('education-type').value = '';
    document.getElementById('education-details').value = '';
    document.getElementById('gpa').value = '';
    document.getElementById('education-start').value = '';
    document.getElementById('education-end').value = '';
}

// Function to add project
function addProject() {
    const projectTitle = document.getElementById('project-title').value;
    const projectDescription = document.getElementById('project-description').value;
    const projectDuration = document.getElementById('project-duration').value;

    const projectList = document.getElementById('project-list');

    if (projectTitle && projectDescription && projectDuration) {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        projectItem.innerHTML = `
            <h2>${projectTitle}</h2>
            <p>${projectDescription}</p>
            <p><strong>Duration:</strong> ${projectDuration}</p>
        `;
        projectList.appendChild(projectItem);

        // Clear the input fields
        document.getElementById('project-title').value = '';
        document.getElementById('project-description').value = '';
        document.getElementById('project-duration').value = '';
    } else {
        alert('Please fill in all project details.');
    }
}

// Function to add programming skill
function addProgrammingSkill() {
    const skill = document.getElementById('custom-programming-skill').value;
    if (skill) {
        // const skills=document.getElementById('custom-programming-skill').value = '';
        console.log(skill)
    } else {
        alert('Please enter a programming skill.');
    }
}

// Function to add hardware skill
function addHardwareSkill() {
    const skill = document.getElementById('custom-hardware-skill').value;
    if (skill) {
        
        //document.getElementById('custom-hardware-skill').value = '';
        console.log(skill);
    } else {
        alert('Please enter a hardware skill.');
    }
}

// Function to capture the form data and convert it into JSON
function submitResume() {
    console.log("inside the function...");

    // Capture personal information
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const github = document.getElementById("github").value;
    const linkedin = document.getElementById("linkedin").value;
    const summary = document.getElementById("summary").value;

    // Validate personal information
    // if (!name || !phone || !email || !address || !github || !linkedin || !summary) {
    //     alert('Please fill out all personal information fields.');
    //     return;
    // }

    // Capture custom programming and hardware skills
    const customProgrammingSkill = document.getElementById('custom-programming-skill').value.trim();
    const customHardwareSkill = document.getElementById('custom-hardware-skill')?.value.trim() || ""; // Optional if you don't have a hardware skills input field

    // Capture all education details (from the table rows)
    const educationRows = document.querySelectorAll('#education-table tr');
    const educationArray = Array.from(educationRows).slice(1).map(row => {
        const cells = row.getElementsByTagName('td');
        return {
            type: cells[0].innerText,
            details: cells[1].innerText,
            gpa: cells[2].innerText,
            duration: cells[3].innerText
        };
    });

    // Capture project details (from the divs)
    const projectItems = document.querySelectorAll('.project-item');
    const projectsArray = Array.from(projectItems).map(item => {
        return {
            title: item.querySelector('h2').innerText,
            description: item.querySelector('p:nth-child(2)').innerText,
            duration: item.querySelector('p:nth-child(3)').innerText
        };
    });

    // Capture skills
    let programmingSkills = Array.from(document.querySelectorAll('#programming-skills input:checked')).map(skill => skill.value);

    if (customProgrammingSkill) {
        programmingSkills.push(customProgrammingSkill);
    }
    let hardwareSkills = Array.from(document.querySelectorAll('#hardware-skills input:checked')).map(skill => skill.value);

    // Add custom hardware skill if provided
    if (customHardwareSkill) {
        hardwareSkills.push(customHardwareSkill);
    }

    // Capture employment history
    const jobTitle = document.getElementById('job-title').value.trim();
    const companyName = document.getElementById('company-name').value.trim();
    const employmentDescription = document.getElementById('employment-description').value.trim();
    const employmentStart = document.getElementById('employment-start').value;
    const employmentEnd = document.getElementById('employment-end').value;

    // Create an array for employment history
    const experienceArray = [];
    if (jobTitle && companyName && employmentDescription) {
        experienceArray.push({
            jobTitle,
            companyName,
            description: employmentDescription,
            startDate: employmentStart,
            endDate: employmentEnd
        });
    }

    // Create the JSON object
    const resumeData = {
        personalInfo: {
            name,
            phone,
            email,
            address,
            github,
            linkedin,
            summary,
            photo: photoBase64 // Assuming photoBase64 is defined elsewhere
        },
        education: educationArray,
        projects: projectsArray,
        skills: {
            programmingSkills,
            hardwareSkills
        },
        experience: experienceArray 
    };

    // Log the JSON data to console (for debugging)
    console.log("resume data ", JSON.stringify(resumeData));

    // Store the resume data in localStorage
    localStorage.setItem('resumeData', JSON.stringify(resumeData));

    // Redirect to the template page (if needed)
    window.location.href = "./tempButtons/Main.html";
}


