// Auth Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Auth page loaded, initializing...');
    // Initialize auth functionality
    initAuth();
});

function initAuth() {
    console.log('Initializing auth...');
    // Tab switching
    initTabs();
    
    // User type selection
    initUserTypeSelection();
    
    // Form handling
    initForms();
    
    // Form validation
    initValidation();
}

// Tab switching functionality
function initTabs() {
    console.log('Initializing tabs...');
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');
    
    console.log('Found tabs:', tabs.length);
    console.log('Found forms:', forms.length);
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            console.log('Tab clicked:', targetTab);
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show corresponding form
            forms.forEach(form => {
                form.classList.remove('active');
                if (form.id === `${targetTab}-form`) {
                    form.classList.add('active');
                }
            });
        });
    });
}

// User type selection functionality
function initUserTypeSelection() {
    console.log('Initializing user type selection...');
    const userTypeRadios = document.querySelectorAll('input[name="userType"]');
    const corporateForm = document.getElementById('corporateForm');
    const catererForm = document.getElementById('catererForm');
    
    console.log('Found user type radios:', userTypeRadios.length);
    console.log('Corporate form found:', !!corporateForm);
    console.log('Caterer form found:', !!catererForm);
    
    userTypeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            console.log('User type changed to:', radio.value);
            if (radio.value === 'corporate') {
                corporateForm.classList.add('active');
                catererForm.classList.remove('active');
            } else {
                catererForm.classList.add('active');
                corporateForm.classList.remove('active');
            }
        });
    });
}

// Form handling
function initForms() {
    console.log('Initializing forms...');
    // Login form
    const loginForm = document.getElementById('loginForm');
    console.log('Login form found:', !!loginForm);
    if (loginForm) {
        console.log('Adding submit listener to login form');
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Corporate registration form
    const corporateForm = document.getElementById('corporateForm');
    console.log('Corporate form found:', !!corporateForm);
    if (corporateForm) {
        console.log('Adding submit listener to corporate form');
        corporateForm.addEventListener('submit', handleCorporateRegistration);
    }
    
    // Caterer registration form
    const catererForm = document.getElementById('catererForm');
    console.log('Caterer form found:', !!catererForm);
    if (catererForm) {
        console.log('Adding submit listener to caterer form');
        catererForm.addEventListener('submit', handleCatererRegistration);
    }
}

// Form validation
function initValidation() {
    console.log('Initializing validation...');
    // Real-time validation for required fields
    const requiredInputs = document.querySelectorAll('input[required], select[required], textarea[required]');
    console.log('Found required inputs:', requiredInputs.length);
    
    requiredInputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
        
        input.addEventListener('input', () => {
            clearFieldError(input);
        });
    });
}

// Field validation
function validateField(field) {
    const value = field.value.trim();
    const isRequired = field.hasAttribute('required');
    
    if (isRequired && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    // URL validation
    if (field.type === 'url' && value) {
        try {
            new URL(value);
        } catch {
            showFieldError(field, 'Please enter a valid URL');
            return false;
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
    }
    
    clearFieldError(field);
    return true;
}

// Show field error
function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = '#ef4444';
}

// Clear field error
function clearFieldError(field) {
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
    field.style.borderColor = '';
}

// Handle login form submission
function handleLogin(e) {
    console.log('Login form submitted!');
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    console.log('Login attempt:', { email, password: password ? '***' : 'empty' });
    
    // Basic validation
    if (!email || !password) {
        showFormError('Please fill in all required fields');
        return;
    }
    
    // Simulate login process
    showLoadingState(e.target);
    
    // For demo purposes, simulate API call
    setTimeout(() => {
        // Check if user exists in localStorage
        const users = JSON.parse(localStorage.getItem('pickhealth_users') || '[]');
        console.log('Existing users:', users.length);
        
        const user = users.find(u => u.email === email && u.password === password);
        console.log('User found:', !!user);
        
        if (user) {
            // Store user session
            localStorage.setItem('pickhealth_current_user', JSON.stringify(user));
            console.log('User logged in, redirecting...');
            
            // Redirect to dashboard
            window.location.href = `dashboard.html?type=${user.userType}`;
        } else {
            showFormError('Invalid email or password');
            hideLoadingState(e.target);
        }
    }, 1000);
}

// Handle corporate registration
function handleCorporateRegistration(e) {
    console.log('Corporate registration submitted!');
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const userData = {
        userType: 'corporate',
        companyName: formData.get('companyName'),
        industry: formData.get('industry'),
        teamSize: formData.get('teamSize'),
        budget: formData.get('budget'),
        location: formData.get('location'),
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        password: formData.get('password'),
        phone: formData.get('phone'),
        createdAt: new Date().toISOString()
    };
    
    console.log('Corporate user data:', userData);
    
    // Validate all fields
    if (!validateForm(e.target)) {
        return;
    }
    
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('pickhealth_users') || '[]');
    if (users.find(u => u.email === userData.email)) {
        showFormError('An account with this email already exists');
        return;
    }
    
    // Store user data
    users.push(userData);
    localStorage.setItem('pickhealth_users', JSON.stringify(users));
    console.log('Corporate user created, redirecting...');
    
    // Auto-login and redirect
    localStorage.setItem('pickhealth_current_user', JSON.stringify(userData));
    window.location.href = `dashboard.html?type=corporate`;
}

// Handle caterer registration
function handleCatererRegistration(e) {
    console.log('Caterer registration submitted!');
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const userData = {
        userType: 'caterer',
        businessName: formData.get('businessName'),
        cuisine: formData.get('cuisine'),
        website: formData.get('website'),
        location: formData.get('location'),
        capacity: formData.get('capacity'),
        delivery: formData.get('delivery'),
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        password: formData.get('password'),
        phone: formData.get('phone'),
        description: formData.get('description'),
        createdAt: new Date().toISOString()
    };
    
    console.log('Caterer user data:', userData);
    
    // Validate all fields
    if (!validateForm(e.target)) {
        return;
    }
    
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('pickhealth_users') || '[]');
    if (users.find(u => u.email === userData.email)) {
        showFormError('An account with this email already exists');
        return;
    }
    
    // Store user data
    users.push(userData);
    localStorage.setItem('pickhealth_users', JSON.stringify(users));
    console.log('Caterer user created, redirecting...');
    
    // Auto-login and redirect
    localStorage.setItem('pickhealth_current_user', JSON.stringify(userData));
    window.location.href = `dashboard.html?type=caterer`;
}

// Validate entire form
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Show form error message
function showFormError(message) {
    console.log('Showing form error:', message);
    // Remove existing error
    const existingError = document.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ef4444';
    errorDiv.style.backgroundColor = '#fef2f2';
    errorDiv.style.border = '1px solid #fecaca';
    errorDiv.style.padding = '0.75rem';
    errorDiv.style.borderRadius = '0.5rem';
    errorDiv.style.marginBottom = '1rem';
    errorDiv.style.textAlign = 'center';
    
    const form = document.querySelector('.form.active');
    if (form) {
        form.insertBefore(errorDiv, form.firstChild);
    }
}

// Show loading state
function showLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="loading-spinner"></span> Processing...';
    
    // Add loading spinner styles
    if (!document.querySelector('#loading-styles')) {
        const style = document.createElement('style');
        style.id = 'loading-styles';
        style.textContent = `
            .loading-spinner {
                display: inline-block;
                width: 16px;
                height: 16px;
                border: 2px solid #ffffff;
                border-radius: 50%;
                border-top-color: transparent;
                animation: spin 1s ease-in-out infinite;
                margin-right: 8px;
            }
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Hide loading state
function hideLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = false;
    
    if (form.id === 'loginForm') {
        submitBtn.innerHTML = 'Sign In';
    } else if (form.id === 'corporateForm') {
        submitBtn.innerHTML = 'Create Corporate Account';
    } else if (form.id === 'catererForm') {
        submitBtn.innerHTML = 'Create Caterer Account';
    }
}

// Check if user is already logged in
function checkAuthStatus() {
    const currentUser = localStorage.getItem('pickhealth_current_user');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        window.location.href = `dashboard.html?type=${user.userType}`;
    }
}

// Test function
function testFunction() {
    console.log('Test button clicked!');
    alert('JavaScript is working!');
}

// Initialize auth status check
checkAuthStatus();
