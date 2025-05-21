// Contact form handling and email protection
document.addEventListener('DOMContentLoaded', function () {
    // Decode and handle contact links
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const encoded = atob('dGltb2hsdTk4QGdtYWlsLmNvbQ=='); // Base64 encoded email
            window.location.href = `mailto:${encoded}`;
        });
    });
});
