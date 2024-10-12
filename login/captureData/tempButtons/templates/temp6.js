
const storedResumeData = localStorage.getItem('resumeData');

// Check if the data exists and parse it back into an object
let resumeData='';
if (storedResumeData) {
    resumeData = JSON.parse(storedResumeData);
    console.log(resumeData);  // Now you can access the resume data as a JavaScript object
} else {
    console.log("No resume data found in localStorage.");
}

// Function to render the resume
function renderResume() {
    const resumeContainer = document.getElementById('container');
    const { personalInfo, education, projects, skills, experience } = resumeData;

    // Personal Information Section
    let personalInfoHTML = `
        <header>
            <img id="profile-photo" src="${personalInfo.photo}" alt="Profile Photo">
            <h1>${personalInfo.name}</h1>
            <p>${personalInfo.phone}</p>
            <p>${personalInfo.email}</p>
            <p>${personalInfo.address}</p>
            <div class="social-links">
                <a href="${personalInfo.github}" target="_blank">GitHub</a> |
                <a href="${personalInfo.linkedin}" target="_blank">LinkedIn</a>
            </div>
            <p>${personalInfo.summary}</p>
        </header>
    `;

    // Education Section
    let educationHTML = `
        <section class="section">
            <h2>Education</h2>
            <table>
                <tr>
                    <th>Degree</th>
                    <th>Field of Study</th>
                    <th>GPA</th>
                    <th>Duration</th>
                </tr>`;
    
    education.forEach(edu => {
        educationHTML += `
            <tr>
                <td>${edu.type}</td>
                <td>${edu.details}</td>
                <td>${edu.gpa}</td>
                <td>${edu.duration}</td>
            </tr>
        `;
    });

    educationHTML += `</table></section>`;

    // Projects Section
    let projectsHTML = `
        <section class="section">
            <h2>Projects</h2>
            <ul class="projects-list">`;
    
    projects.forEach(project => {
        projectsHTML += `
            <li>
                <strong>${project.title}</strong>: ${project.description} (${project.duration})
            </li>
        `;
    });

    projectsHTML += `</ul></section>`;

    // Skills Section
    let skillsHTML = `
        <section class="section">
            <h2>Skills</h2>
            <h3>Programming Skills</h3>
            <ul class="skills-list">`;
    
    skills.programmingSkills.forEach(skill => {
        skillsHTML += `<li>${skill}</li>`;
    });

    skillsHTML += `</ul><h3>Hardware Skills</h3><ul class="skills-list">`;
    
    skills.hardwareSkills.forEach(skill => {
        skillsHTML += `<li>${skill}</li>`;
    });

    skillsHTML += `</ul></section>`;

    // Experience Section
    let experienceHTML = `
        <section class="section">
            <h2>Experience</h2>
            <table>
                <tr>
                    <th>Job Title</th>
                    <th>Company</th>
                    <th>Description</th>
                    <th>Duration</th>
                </tr>`;
    
    experience.forEach(exp => {
        experienceHTML += `
            <tr>
                <td>${exp.jobTitle}</td>
                <td>${exp.companyName}</td>
                <td>${exp.description}</td>
                <td>${exp.startDate} - ${exp.endDate}</td>
            </tr>
        `;
    });

    experienceHTML += `</table></section>`;

    // Combine and Inject HTML
    resumeContainer.innerHTML = personalInfoHTML + educationHTML + projectsHTML + skillsHTML + experienceHTML;
}

function downloadResume() {
    const element = document.getElementById('container');
    html2pdf().from(element).save("resume.pdf");
}

// Render the resume when the page loads
window.onload = renderResume;
