// Configuration file for sensitive data
const config = {
    // Contact information (Base64 encoded)
    contactEmail: 'dGltb2hsdTk4QGdtYWlsLmNvbQ==',

    // Social media (can be enabled/disabled)
    socialMedia: {
        instagram: 'https://www.instagram.com/timohlubek',
        behance: 'https://www.behance.net/timohlubek',
        enabled: true
    },

    // Analytics configuration
    analytics: {
        enabled: true,
        anonymizeIp: true,
        respectDNT: true, // Respect Do Not Track
        cookieless: true
    },

    // Content configuration
    content: {
        showFullCredits: false,
        showClientNames: false,
        anonymizeProjects: true
    }
};

// Prevent direct access to config
Object.freeze(config);
