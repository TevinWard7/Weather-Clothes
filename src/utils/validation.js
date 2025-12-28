import DOMPurify from 'dompurify';
import validator from 'validator';

/**
 * Sanitize text input to prevent XSS attacks
 * @param {string} input - The text to sanitize
 * @returns {string} - Sanitized text
 */
export const sanitizeText = (input) => {
    if (!input) return '';
    return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
};

/**
 * Validate outfit name
 * @param {string} name - The outfit name to validate
 * @returns {object} - {isValid: boolean, error: string}
 */
export const validateOutfitName = (name) => {
    if (!name || validator.isEmpty(name.trim())) {
        return { isValid: false, error: 'Outfit name is required' };
    }

    if (name.length > 50) {
        return { isValid: false, error: 'Outfit name must be less than 50 characters' };
    }

    // Check for potentially malicious patterns
    if (/<script|javascript:|onerror=/i.test(name)) {
        return { isValid: false, error: 'Invalid characters in outfit name' };
    }

    return { isValid: true, error: '' };
};

/**
 * Validate city name
 * @param {string} city - The city name to validate
 * @returns {object} - {isValid: boolean, error: string}
 */
export const validateCity = (city) => {
    if (!city || validator.isEmpty(city.trim())) {
        return { isValid: false, error: 'City name is required' };
    }

    if (city.length > 100) {
        return { isValid: false, error: 'City name must be less than 100 characters' };
    }

    // Allow only letters, spaces, hyphens, and apostrophes
    if (!/^[a-zA-Z\s\-']+$/.test(city)) {
        return { isValid: false, error: 'City name contains invalid characters' };
    }

    return { isValid: true, error: '' };
};

/**
 * Validate file upload (image)
 * @param {File} file - The file to validate
 * @returns {object} - {isValid: boolean, error: string}
 */
export const validateImageFile = (file) => {
    if (!file) {
        return { isValid: false, error: 'No file selected' };
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
        return { isValid: false, error: 'File size must be less than 5MB' };
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
        return { isValid: false, error: 'Only image files (JPEG, PNG, GIF, WebP) are allowed' };
    }

    return { isValid: true, error: '' };
};
