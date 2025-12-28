# Security Documentation

## Security Improvements Implemented

This document outlines the security improvements made to the Weather-Clothes application.

### 1. Environment Variables for API Keys ✅

**Problem:** API keys were hardcoded in source files, exposing them to anyone with access to the codebase.

**Solution:**
- Moved all API keys to environment variables
- Created `.env` file for local development (not committed to git)
- Created `.env.example` as a template for developers

**Environment Variables Required:**
```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_DATABASE_URL=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_FIREBASE_MEASUREMENT_ID=
REACT_APP_OPENWEATHER_API_KEY=
```

**Deployment Instructions:**
- For local development: Copy `.env.example` to `.env` and fill in your values
- For GitHub Actions CI/CD: Add secrets in repository Settings → Secrets and variables → Actions
- For Netlify: Add environment variables in Site Settings → Environment Variables
- For other platforms: Configure environment variables according to platform documentation

**GitHub Actions Setup:**
Add the following secrets to your GitHub repository for CI/CD workflows:
1. Go to repository Settings → Secrets and variables → Actions
2. Click "New repository secret" for each environment variable:
   - `REACT_APP_FIREBASE_API_KEY`
   - `REACT_APP_FIREBASE_AUTH_DOMAIN`
   - `REACT_APP_FIREBASE_DATABASE_URL`
   - `REACT_APP_FIREBASE_PROJECT_ID`
   - `REACT_APP_FIREBASE_STORAGE_BUCKET`
   - `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`
   - `REACT_APP_FIREBASE_APP_ID`
   - `REACT_APP_FIREBASE_MEASUREMENT_ID`
   - `REACT_APP_OPENWEATHER_API_KEY`

### 2. Input Validation and Sanitization ✅

**Problem:** No validation or sanitization of user inputs, making the app vulnerable to XSS and injection attacks.

**Solution:**
- Installed `dompurify` for sanitizing text inputs
- Installed `validator` for validating user inputs
- Created `src/utils/validation.js` with validation functions
- Updated all user input handlers to validate and sanitize data

**Protected Inputs:**
- Outfit names (max 50 characters, no script tags)
- City names (max 100 characters, letters/spaces/hyphens only)
- Image uploads (5MB max, image files only)

### 3. Firebase Security Rules ✅

**Problem:** Security relied entirely on client-side UID checks, which can be bypassed.

**Solution:**
- Implemented Firestore security rules in `firestore.rules`
- Implemented Storage security rules in `storage.rules`
- Updated `firebase.json` to reference these rules

**Security Features:**
- Authentication required for all operations
- Users can only access their own data (UID validation)
- Server-side validation of data structure and types
- Image uploads restricted to authenticated users
- File size and type validation for uploads

**To Deploy Security Rules:**
```bash
firebase deploy --only firestore:rules
firebase deploy --only storage:rules
```

### 4. Updated Dependencies ✅

**Problem:** Outdated dependencies with known security vulnerabilities.

**Updates Made:**
- `axios`: 0.21.0 → 1.7.9 (fixed critical vulnerability CVE-2021-3749)
- `react`: 16.13.1 → 18.3.1 (latest stable, includes security patches)
- `react-dom`: 16.13.1 → 18.3.1
- Updated testing libraries to be compatible with React 18

**Remaining Vulnerabilities:**
- Some dev dependencies (react-scripts, webpack-dev-server) have moderate vulnerabilities
- These are development-only and don't affect production builds
- Firebase SDK upgrade to v10+ would require breaking changes (future consideration)

## Security Best Practices

### For Developers

1. **Never commit `.env` files**
   - The `.env` file is in `.gitignore` and should never be committed
   - Use `.env.example` as a template

2. **Always validate user inputs**
   - Use the validation functions in `src/utils/validation.js`
   - Sanitize all text inputs before storing in database

3. **Test security rules locally**
   ```bash
   firebase emulators:start --only firestore
   ```

4. **Keep dependencies updated**
   ```bash
   npm audit
   npm audit fix
   npm outdated
   ```

5. **Installing dependencies**
   - The project includes a `.npmrc` file configured with `legacy-peer-deps=true`
   - This allows React 18 to work with Material-UI v4
   - Simply run `npm install` (the flag is applied automatically)

### For Deployment

1. **Set environment variables on your hosting platform**
   - Never hardcode API keys in code
   - Use platform-specific environment variable configuration

2. **Deploy Firebase security rules**
   ```bash
   firebase deploy --only firestore:rules,storage:rules
   ```

3. **Enable Firebase App Check** (recommended)
   - Protects your backend resources from abuse
   - See: https://firebase.google.com/docs/app-check

4. **Monitor for security issues**
   - Enable Firebase Security Monitoring
   - Set up alerts for unusual activity

## Security Checklist

- [x] API keys moved to environment variables
- [x] Input validation implemented
- [x] Input sanitization implemented
- [x] Firestore security rules implemented
- [x] Storage security rules implemented
- [x] Critical dependencies updated
- [x] .env added to .gitignore
- [x] .npmrc configured for legacy peer deps
- [x] GitHub Actions workflows updated with environment variables
- [ ] GitHub Secrets configured for CI/CD
- [ ] Firebase security rules deployed to production
- [ ] Environment variables configured on hosting platform
- [ ] Firebase App Check enabled (optional, recommended)

## Reporting Security Issues

If you discover a security vulnerability, please email the maintainers directly instead of using the public issue tracker.
