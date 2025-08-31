// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    initDashboard();
});

function initDashboard() {
    // Check authentication
    if (!checkAuth()) {
        return;
    }
    
    // Initialize user menu
    initUserMenu();
    
    // Load user data
    loadUserData();
    
    // Initialize dashboard type
    initDashboardType();
    
    // Load caterers for corporate users
    if (currentUser.userType === 'corporate') {
        loadCaterers();
        initSearchFilters();
    }
}

// Global variables
let currentUser = null;

// Check authentication
function checkAuth() {
    const userData = localStorage.getItem('pickhealth_current_user');
    if (!userData) {
        window.location.href = 'auth.html';
        return false;
    }
    
    try {
        currentUser = JSON.parse(userData);
        return true;
    } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('pickhealth_current_user');
        window.location.href = 'auth.html';
        return false;
    }
}

// Initialize user menu
function initUserMenu() {
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userDropdown = document.getElementById('userDropdown');
    const logoutBtn = document.getElementById('logoutBtn');
    
    // Toggle dropdown
    userMenuBtn.addEventListener('click', () => {
        userDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!userMenuBtn.contains(e.target) && !userDropdown.contains(e.target)) {
            userDropdown.classList.remove('active');
        }
    });
    
    // Logout functionality
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
    });
}

// Load user data
function loadUserData() {
    if (!currentUser) return;
    
    // Update user name in menu
    const userName = document.getElementById('userName');
    if (userName) {
        userName.textContent = currentUser.firstName || currentUser.businessName || 'User';
    }
    
    // Load data based on user type
    if (currentUser.userType === 'corporate') {
        loadCorporateData();
    } else if (currentUser.userType === 'caterer') {
        loadCatererData();
    }
}

// Load corporate user data
function loadCorporateData() {
    // Company name
    const companyNameEl = document.getElementById('corpCompanyName');
    if (companyNameEl) {
        companyNameEl.textContent = currentUser.companyName || 'Company';
    }
    
    // Team size
    const teamSizeEl = document.getElementById('corpTeamSize');
    if (teamSizeEl) {
        teamSizeEl.textContent = currentUser.teamSize || '0';
    }
    
    // Budget
    const budgetEl = document.getElementById('corpBudget');
    if (budgetEl) {
        budgetEl.textContent = currentUser.budget ? `$${currentUser.budget}` : '$0';
    }
    
    // Location
    const locationEl = document.getElementById('corpLocation');
    if (locationEl) {
        locationEl.textContent = currentUser.location || 'Location';
    }
}

// Load caterer user data
function loadCatererData() {
    // Business name
    const businessNameEl = document.getElementById('catBusinessName');
    if (businessNameEl) {
        businessNameEl.textContent = currentUser.businessName || 'Business';
    }
    
    // Capacity
    const capacityEl = document.getElementById('catCapacity');
    if (capacityEl) {
        capacityEl.textContent = currentUser.capacity || '0';
    }
    
    // Delivery range
    const deliveryEl = document.getElementById('catDelivery');
    if (deliveryEl) {
        deliveryEl.textContent = currentUser.delivery ? `${currentUser.delivery} mi` : '0 mi';
    }
    
    // Location
    const locationEl = document.getElementById('catLocation');
    if (locationEl) {
        locationEl.textContent = currentUser.location || 'Location';
    }
    
    // Profile information
    loadProfileInfo();
}

// Load profile information
function loadProfileInfo() {
    const profileBusinessName = document.getElementById('profileBusinessName');
    const profileCuisine = document.getElementById('profileCuisine');
    const profileWebsite = document.getElementById('profileWebsite');
    const profileDescription = document.getElementById('profileDescription');
    
    if (profileBusinessName) {
        profileBusinessName.textContent = currentUser.businessName || '-';
    }
    
    if (profileCuisine) {
        profileCuisine.textContent = currentUser.cuisine ? currentUser.cuisine.charAt(0).toUpperCase() + currentUser.cuisine.slice(1) : '-';
    }
    
    if (profileWebsite) {
        profileWebsite.textContent = currentUser.website || '-';
        profileWebsite.href = currentUser.website || '#';
    }
    
    if (profileDescription) {
        profileDescription.textContent = currentUser.description || '-';
    }
}

// Initialize dashboard type
function initDashboardType() {
    const corporateDashboard = document.getElementById('corporateDashboard');
    const catererDashboard = document.getElementById('catererDashboard');
    
    if (currentUser.userType === 'corporate') {
        corporateDashboard.classList.add('active');
        catererDashboard.classList.remove('active');
    } else if (currentUser.userType === 'caterer') {
        catererDashboard.classList.add('active');
        corporateDashboard.classList.remove('active');
    }
}

// Load caterers for corporate users
function loadCaterers() {
    const caterersGrid = document.getElementById('caterersGrid');
    if (!caterersGrid) return;
    
    // Get all caterer users
    const users = JSON.parse(localStorage.getItem('pickhealth_users') || '[]');
    const caterers = users.filter(user => user.userType === 'caterer');
    
    if (caterers.length === 0) {
        caterersGrid.innerHTML = `
            <div class="no-caterers" style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--gray-500);">
                <div style="font-size: 3rem; margin-bottom: 1rem;">👨‍🍳</div>
                <h3 style="color: var(--gray-600); margin-bottom: 0.5rem;">No meal providers yet</h3>
                <p>Check back soon for healthy meal providers in your area!</p>
            </div>
        `;
        return;
    }
    
    // Display caterers
    caterersGrid.innerHTML = caterers.map(caterer => createCatererCard(caterer)).join('');
}

// Create caterer card
function createCatererCard(caterer) {
    return `
        <div class="caterer-card">
            <div class="caterer-header">
                <h3 class="caterer-name">${caterer.businessName}</h3>
                <p class="caterer-cuisine">${caterer.cuisine ? caterer.cuisine.charAt(0).toUpperCase() + caterer.cuisine.slice(1) : 'Cuisine'}</p>
            </div>
            <div class="caterer-body">
                <p class="caterer-description">${caterer.description || 'No description available.'}</p>
                
                <div class="caterer-details">
                    <div class="detail-item">
                        <span class="detail-icon">📍</span>
                        <span>${caterer.location || 'Location'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-icon">🍽️</span>
                        <span>${caterer.capacity || 'Capacity'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-icon">🚚</span>
                        <span>${caterer.delivery || '0'} mi</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-icon">🌐</span>
                        <span>${caterer.website ? 'Has Website' : 'No Website'}</span>
                    </div>
                </div>
                
                <div class="caterer-actions">
                    ${caterer.website ? `<a href="${caterer.website}" target="_blank" class="btn-outline">Visit Website</a>` : ''}
                    <button class="btn-outline" onclick="contactCaterer('${caterer.email}')">Contact</button>
                </div>
            </div>
        </div>
    `;
}

// Initialize search and filters
function initSearchFilters() {
    const searchInput = document.getElementById('catererSearch');
    const cuisineFilter = document.getElementById('cuisineFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterCaterers);
    }
    
    if (cuisineFilter) {
        cuisineFilter.addEventListener('change', filterCaterers);
    }
}

// Filter caterers
function filterCaterers() {
    const searchTerm = document.getElementById('catererSearch')?.value.toLowerCase() || '';
    const cuisineFilter = document.getElementById('cuisineFilter')?.value || '';
    
    const users = JSON.parse(localStorage.getItem('pickhealth_users') || '[]');
    let caterers = users.filter(user => user.userType === 'caterer');
    
    // Apply filters
    if (searchTerm) {
        caterers = caterers.filter(caterer => 
            caterer.businessName.toLowerCase().includes(searchTerm) ||
            caterer.location.toLowerCase().includes(searchTerm) ||
            (caterer.description && caterer.description.toLowerCase().includes(searchTerm))
        );
    }
    
    if (cuisineFilter) {
        caterers = caterers.filter(caterer => caterer.cuisine === cuisineFilter);
    }
    
    // Update display
    const caterersGrid = document.getElementById('caterersGrid');
    if (caterersGrid) {
        if (caterers.length === 0) {
            caterersGrid.innerHTML = `
                <div class="no-caterers" style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--gray-500);">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
                    <h3 style="color: var(--gray-600); margin-bottom: 0.5rem;">No results found</h3>
                    <p>Try adjusting your search terms or filters.</p>
                </div>
            `;
        } else {
            caterersGrid.innerHTML = caterers.map(caterer => createCatererCard(caterer)).join('');
        }
    }
}

// Contact caterer
function contactCaterer(email) {
    // For demo purposes, show a simple contact form
    const contactInfo = `
        Contact Information:
        Email: ${email}
        
        You can reach out to this meal provider directly via email to discuss your corporate meal needs.
        
        Tip: Mention that you found them through PickHealth for better service!
    `;
    
    alert(contactInfo);
}

// Logout functionality
function logout() {
    localStorage.removeItem('pickhealth_current_user');
    window.location.href = 'index.html';
}

// Add some sample caterers for demo purposes
function addSampleCaterers() {
    const users = JSON.parse(localStorage.getItem('pickhealth_users') || '[]');
    
    // Only add if no caterers exist
    if (!users.find(u => u.userType === 'caterer')) {
        const sampleCaterers = [
            {
                userType: 'caterer',
                businessName: 'Fresh & Healthy Meals',
                cuisine: 'healthy',
                website: 'https://freshhealthy.com',
                location: 'Atlanta, GA',
                capacity: '101-200',
                delivery: '10-20',
                firstName: 'Sarah',
                lastName: 'Johnson',
                email: 'sarah@freshhealthy.com',
                password: 'demo123',
                phone: '404-555-0123',
                description: 'Specializing in organic, locally-sourced ingredients. Perfect for corporate wellness programs with customizable meal plans.',
                createdAt: new Date().toISOString()
            },
            {
                userType: 'caterer',
                businessName: 'Mediterranean Delights',
                cuisine: 'mediterranean',
                website: 'https://meddelights.com',
                location: 'Atlanta, GA',
                capacity: '51-100',
                delivery: '5-10',
                firstName: 'Ahmed',
                lastName: 'Hassan',
                email: 'ahmed@meddelights.com',
                password: 'demo123',
                phone: '404-555-0456',
                description: 'Authentic Mediterranean cuisine with a focus on healthy, flavorful dishes. Great for team lunches and corporate events.',
                createdAt: new Date().toISOString()
            },
            {
                userType: 'caterer',
                businessName: 'Asian Fusion Kitchen',
                cuisine: 'asian',
                website: 'https://asianfusion.com',
                location: 'Atlanta, GA',
                capacity: '201-500',
                delivery: '20+',
                firstName: 'Lisa',
                lastName: 'Chen',
                email: 'lisa@asianfusion.com',
                password: 'demo123',
                phone: '404-555-0789',
                description: 'Modern Asian cuisine with healthy options. Large capacity for corporate orders with flexible delivery options.',
                createdAt: new Date().toISOString()
            }
        ];
        
        users.push(...sampleCaterers);
        localStorage.setItem('pickhealth_users', JSON.stringify(users));
    }
}

// Initialize sample data on first load
addSampleCaterers();
