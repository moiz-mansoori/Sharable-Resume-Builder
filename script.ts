// References to form elements and display areas
const resumeForm = document.getElementById('resume-form') as HTMLFormElement;
const resumeOutputArea = document.getElementById('resume-display') as HTMLDivElement;
const linkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLink = document.getElementById('shareable-link') as HTMLAnchorElement;
const pdfDownloadButton = document.getElementById('download-pdf') as HTMLButtonElement;

// Event Listener for form submission
resumeForm.addEventListener('submit', (e: Event) => {
    e.preventDefault(); // Prevent form submission from reloading the page

    // Extract input values
    const userId = (document.getElementById('username') as HTMLInputElement).value.trim();
    const fullName = (document.getElementById('name') as HTMLInputElement).value.trim();
    const userEmail = (document.getElementById('email') as HTMLInputElement).value.trim();
    const userPhone = (document.getElementById('phone') as HTMLInputElement).value.trim();
    const userEducation = (document.getElementById('education') as HTMLTextAreaElement).value.trim();
    const userExperience = (document.getElementById('experience') as HTMLTextAreaElement).value.trim();
    const userSkills = (document.getElementById('skills') as HTMLTextAreaElement).value.trim();

    // Construct resume data object
    const profileData = {
        fullName,
        userEmail,
        userPhone,
        userEducation,
        userExperience,
        userSkills
    };

    // Save the profile data in localStorage
    localStorage.setItem(userId, JSON.stringify(profileData));

    // Generate editable resume content dynamically
    const editableResumeHTML = `
        <h2>Dynamic Resume Preview</h2>
        <h3>Personal Details</h3>
        <p><strong>Name:</strong> <span contenteditable="true">${fullName || 'Not Provided'}</span></p>
        <p><strong>Email:</strong> <span contenteditable="true">${userEmail || 'Not Provided'}</span></p>
        <p><strong>Phone:</strong> <span contenteditable="true">${userPhone || 'Not Provided'}</span></p>
        <h3>Education</h3>
        <p contenteditable="true">${userEducation || 'No details provided'}</p>
        <h3>Work Experience</h3>
        <p contenteditable="true">${userExperience || 'No experience added'}</p>
        <h3>Skills</h3>
        <p contenteditable="true">${userSkills || 'No skills listed'}</p>
    `;

    // Display the resume content
    resumeOutputArea.innerHTML = editableResumeHTML;

    // Create a shareable link with the userId
    const shareLink = `${window.location.origin}?profile=${encodeURIComponent(userId)}`;
    
    // Update link display
    linkContainer.style.display = 'block';
    shareableLink.href = shareLink;
    shareableLink.textContent = `View Resume: ${shareLink}`;
});

// PDF Download Functionality
pdfDownloadButton.addEventListener('click', () => {
    window.print(); // Opens the print dialog for saving as PDF
});

// Auto-fill form using URL parameter
window.addEventListener('DOMContentLoaded', () => {
    const queryParams = new URLSearchParams(window.location.search);
    const profileId = queryParams.get('profile');
    
    if (profileId) {
        const storedData = localStorage.getItem(profileId);

        if (storedData) {
            const parsedData = JSON.parse(storedData);
            (document.getElementById('username') as HTMLInputElement).value = profileId;
            (document.getElementById('name') as HTMLInputElement).value = parsedData.fullName;
            (document.getElementById('email') as HTMLInputElement).value = parsedData.userEmail;
            (document.getElementById('phone') as HTMLInputElement).value = parsedData.userPhone;
            (document.getElementById('education') as HTMLTextAreaElement).value = parsedData.userEducation;
            (document.getElementById('experience') as HTMLTextAreaElement).value = parsedData.userExperience;
            (document.getElementById('skills') as HTMLTextAreaElement).value = parsedData.userSkills;
        }
    }
});
