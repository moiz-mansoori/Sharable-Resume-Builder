// References to form elements and display areas
var resumeForm = document.getElementById('resume-form');
var resumeOutputArea = document.getElementById('resume-display');
var linkContainer = document.getElementById('shareable-link-container');
var shareableLink = document.getElementById('shareable-link');
var pdfDownloadButton = document.getElementById('download-pdf');
// Event Listener for form submission
resumeForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission from reloading the page
    // Extract input values
    var userId = document.getElementById('username').value.trim();
    var fullName = document.getElementById('name').value.trim();
    var userEmail = document.getElementById('email').value.trim();
    var userPhone = document.getElementById('phone').value.trim();
    var userEducation = document.getElementById('education').value.trim();
    var userExperience = document.getElementById('experience').value.trim();
    var userSkills = document.getElementById('skills').value.trim();
    // Construct resume data object
    var profileData = {
        fullName: fullName,
        userEmail: userEmail,
        userPhone: userPhone,
        userEducation: userEducation,
        userExperience: userExperience,
        userSkills: userSkills
    };
    // Save the profile data in localStorage
    localStorage.setItem(userId, JSON.stringify(profileData));
    // Generate editable resume content dynamically
    var editableResumeHTML = "\n        <h2>Dynamic Resume Preview</h2>\n        <h3>Personal Details</h3>\n        <p><strong>Name:</strong> <span contenteditable=\"true\">".concat(fullName || 'Not Provided', "</span></p>\n        <p><strong>Email:</strong> <span contenteditable=\"true\">").concat(userEmail || 'Not Provided', "</span></p>\n        <p><strong>Phone:</strong> <span contenteditable=\"true\">").concat(userPhone || 'Not Provided', "</span></p>\n        <h3>Education</h3>\n        <p contenteditable=\"true\">").concat(userEducation || 'No details provided', "</p>\n        <h3>Work Experience</h3>\n        <p contenteditable=\"true\">").concat(userExperience || 'No experience added', "</p>\n        <h3>Skills</h3>\n        <p contenteditable=\"true\">").concat(userSkills || 'No skills listed', "</p>\n    ");
    // Display the resume content
    resumeOutputArea.innerHTML = editableResumeHTML;
    // Create a shareable link with the userId
    var shareLink = "".concat(window.location.origin, "?profile=").concat(encodeURIComponent(userId));
    // Update link display
    linkContainer.style.display = 'block';
    shareableLink.href = shareLink;
    shareableLink.textContent = "View Resume: ".concat(shareLink);
});
// PDF Download Functionality
pdfDownloadButton.addEventListener('click', function () {
    window.print(); // Opens the print dialog for saving as PDF
});
// Auto-fill form using URL parameter
window.addEventListener('DOMContentLoaded', function () {
    var queryParams = new URLSearchParams(window.location.search);
    var profileId = queryParams.get('profile');
    if (profileId) {
        var storedData = localStorage.getItem(profileId);
        if (storedData) {
            var parsedData = JSON.parse(storedData);
            document.getElementById('username').value = profileId;
            document.getElementById('name').value = parsedData.fullName;
            document.getElementById('email').value = parsedData.userEmail;
            document.getElementById('phone').value = parsedData.userPhone;
            document.getElementById('education').value = parsedData.userEducation;
            document.getElementById('experience').value = parsedData.userExperience;
            document.getElementById('skills').value = parsedData.userSkills;
        }
    }
});
