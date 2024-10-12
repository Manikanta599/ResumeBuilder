// const resumeData = {
//     personalInfo: {
//         name: "John Doe",
//         phone: "123-456-7890",
//         email: "john.doe@example.com",
//         address: "123 Main St, Anytown, USA",
//         github: "https://github.com/johndoe",
//         linkedin: "https://linkedin.com/in/johndoe",
//         summary: "Enthusiastic software developer with experience in full-stack development.",
//         photo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA..."
//     },
//     education: [
//         {
//             type: "Bachelor's Degree",
//             details: "Computer Science",
//             gpa: "3.8",
//             duration: "2015 - 2019"
//         },
//         {
//             type: "Master's Degree",
//             details: "Software Engineering",
//             gpa: "4.0",
//             duration: "2019 - 2021"
//         }
//     ],
//     projects: [
//         {
//             title: "Personal Portfolio Website",
//             description: "A responsive portfolio website to showcase my projects and skills.",
//             duration: "Jan 2023 - Present"
//         },
//         {
//             title: "Task Management App",
//             description: "A web application to help users manage their daily tasks effectively.",
//             duration: "Feb 2022 - Dec 2022"
//         }
//     ],
//     skills: {
//         programmingSkills: [
//             "JavaScript",
//             "Python",
//             "Java",
//             "React",
//             "Node.js"
//         ],
//         hardwareSkills: [
//             "Raspberry Pi",
//             "Arduino"
//         ]
//     },
//     experience: [
//         {
//             jobTitle: "Software Developer",
//             companyName: "Tech Solutions Inc.",
//             description: "Developed and maintained web applications using React and Node.js.",
//             startDate: "Jan 2021",
//             endDate: "Present"
//         },
//         {
//             jobTitle: "Intern",
//             companyName: "Web Innovations",
//             description: "Assisted in the development of client websites and applications.",
//             startDate: "Jun 2020",
//             endDate: "Dec 2020"
//         }
//     ]
// };

const storedResumeData = localStorage.getItem('resumeData');

// Check if the data exists and parse it back into an object
let resumeData='';
if (storedResumeData) {
    resumeData = JSON.parse(storedResumeData);
    console.log(resumeData);  // Now you can access the resume data as a JavaScript object
} else {
    console.log("No resume data found in localStorage.");
}


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("name").innerText = resumeData.personalInfo.name;
    document.getElementById("phone").innerText = resumeData.personalInfo.phone;
    document.getElementById("email").innerText = resumeData.personalInfo.email;
    document.getElementById("address").innerText = resumeData.personalInfo.address;
    document.getElementById("github").href = resumeData.personalInfo.github;
    document.getElementById("linkedin").href = resumeData.personalInfo.linkedin;
    document.getElementById("summary").innerText = resumeData.personalInfo.summary;
    document.getElementById("profile-photo").src = resumeData.personalInfo.photo;

    const educationList = document.getElementById("education-list");
    // JavaScript code to set the source of the image
    document.getElementById('profile-photo').src = resumeData.personalInfo.photo;

    resumeData.education.forEach(edu => {
        const li = document.createElement("li");
        li.innerText = `${edu.type} in ${edu.details} (GPA: ${edu.gpa}, Duration: ${edu.duration})`;
        educationList.appendChild(li);
    });

    const experienceList = document.getElementById("experience-list");
    resumeData.experience.forEach(exp => {
        const li = document.createElement("li");
        li.innerText = `${exp.jobTitle} at ${exp.companyName} (${exp.startDate} - ${exp.endDate}): ${exp.description}`;
        experienceList.appendChild(li);
    });

    const projectsList = document.getElementById("projects-list");
    resumeData.projects.forEach(project => {
        const li = document.createElement("li");
        li.innerText = `${project.title} (${project.duration}): ${project.description}`;
        projectsList.appendChild(li);
    });

    const programmingSkillsList = document.getElementById("programming-skills-list");
    resumeData.skills.programmingSkills.forEach(skill => {
        const li = document.createElement("li");
        li.innerText = skill;
        programmingSkillsList.appendChild(li);
    });

    const hardwareSkillsList = document.getElementById("hardware-skills-list");
    resumeData.skills.hardwareSkills.forEach(skill => {
        const li = document.createElement("li");
        li.innerText = skill;
        hardwareSkillsList.appendChild(li);
    });

});



function downloadResume() {
    const element = document.querySelector('.container');
    html2pdf().from(element).save("resume.pdf");
}
