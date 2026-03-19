import axios from 'axios';

// Set up axios defaults
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.withCredentials = true;
window.axios.defaults.withXSRFToken = true;

// Function to get CSRF token from meta tag or cookie
function getCsrfToken(): string | null {
    // First try meta tag
    const metaToken = document.head.querySelector('meta[name="csrf-token"]');
    if (metaToken) {
        return metaToken.getAttribute('content');
    }
    
    // Fallback to XSRF-TOKEN cookie
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'XSRF-TOKEN') {
            return decodeURIComponent(value);
        }
    }
    
    return null;
}

// Set CSRF token on initial load
const token = getCsrfToken();
if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

// Add request interceptor to ensure CSRF token is always fresh
window.axios.interceptors.request.use(
    (config) => {
        const freshToken = getCsrfToken();
        if (freshToken) {
            config.headers['X-CSRF-TOKEN'] = freshToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle 419 CSRF token mismatch errors
window.axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Handle 419 CSRF Token Mismatch
        if (error.response?.status === 419 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Get a fresh CSRF token by making a request to the sanctum/csrf-cookie endpoint
                await window.axios.get('/sanctum/csrf-cookie');
                
                // Update the token
                const freshToken = getCsrfToken();
                if (freshToken) {
                    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = freshToken;
                    originalRequest.headers['X-CSRF-TOKEN'] = freshToken;
                }

                // Retry the original request
                return window.axios(originalRequest);
            } catch (tokenError) {
                console.error('Failed to refresh CSRF token:', tokenError);
                
                // If we're not already on the login page, redirect to login
                if (!window.location.pathname.includes('/login')) {
                    window.location.href = '/login';
                }
                
                return Promise.reject(tokenError);
            }
        }

        // Handle 401 Unauthorized (session expired)
        if (error.response?.status === 401 && !window.location.pathname.includes('/login')) {
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

