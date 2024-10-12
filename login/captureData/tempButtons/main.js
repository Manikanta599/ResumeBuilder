

function loadTemplate(template) {
    const iframe = document.getElementById('template-display');
    
    // Clear previous onload event
    iframe.onload = null;

    // Set the iframe's src to the selected template
    iframe.src = template;
    currentTemplate = template;

    // Add an event listener to detect when the iframe content has loaded
    iframe.onload = () => {
        // Enable the download button when the template has loaded
        document.getElementById('download-button').disabled = false;
    };

    // Disable the download button until the template is loaded
    document.getElementById('download-button').disabled = true;
}

