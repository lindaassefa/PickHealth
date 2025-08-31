// PickHealth Chatbot JavaScript
class PickHealthChatbot {
    constructor() {
        this.isOpen = false;
        this.isMinimized = false;
        this.conversationHistory = [];
        this.currentContext = 'general';
        
        this.initializeElements();
        this.bindEvents();
        this.showWelcomeMessage();
        this.loadSuggestions();
    }
    
    initializeElements() {
        this.chatButton = document.getElementById('chatButton');
        this.chatWindow = document.getElementById('chatWindow');
        this.chatMessages = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.chatSend = document.getElementById('chatSend');
        this.chatMinimize = document.getElementById('chatMinimize');
        this.chatClose = document.getElementById('chatClose');
        this.quickActions = document.getElementById('quickActions');
        this.chatSuggestions = document.getElementById('chatSuggestions');
    }
    
    bindEvents() {
        // Chat button click
        this.chatButton.addEventListener('click', () => this.toggleChat());
        
        // Send button click
        this.chatSend.addEventListener('click', () => this.sendMessage());
        
        // Enter key in input
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        
        // Minimize button
        this.chatMinimize.addEventListener('click', () => this.toggleMinimize());
        
        // Close button
        this.chatClose.addEventListener('click', () => this.closeChat());
        
        // Quick actions
        this.quickActions.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-action')) {
                this.handleQuickAction(e.target.dataset.action);
            }
        });
        
        // Chat suggestions
        this.chatSuggestions.addEventListener('click', (e) => {
            if (e.target.classList.contains('chat-suggestion')) {
                this.handleSuggestion(e.target.textContent);
            }
        });
    }
    
    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }
    
    openChat() {
        this.isOpen = true;
        this.chatWindow.classList.add('active');
        this.chatInput.focus();
        this.scrollToBottom();
    }
    
    closeChat() {
        this.isOpen = false;
        this.isMinimized = false;
        this.chatWindow.classList.remove('active', 'minimized');
    }
    
    toggleMinimize() {
        this.isMinimized = !this.isMinimized;
        if (this.isMinimized) {
            this.chatWindow.classList.add('minimized');
        } else {
            this.chatWindow.classList.remove('minimized');
        }
    }
    
    showWelcomeMessage() {
        const welcomeMessage = `
            <div class="welcome-message">
                <div class="welcome-icon">🤖</div>
                <h3>Welcome to PickHealth!</h3>
                <p>I'm your AI assistant. I can help you learn about our platform, get started, or answer any questions you have about corporate meal solutions.</p>
            </div>
        `;
        
        this.chatMessages.innerHTML = welcomeMessage;
    }
    
    loadSuggestions() {
        const suggestions = [
            'How does PickHealth work?',
            'What are the costs?',
            'How do I register?',
            'Tell me about meal providers'
        ];
        
        this.chatSuggestions.innerHTML = suggestions.map(suggestion => 
            `<div class="chat-suggestion">${suggestion}</div>`
        ).join('');
    }
    
    sendMessage() {
        const message = this.chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        this.addMessage(message, 'user');
        this.chatInput.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Generate response after delay
        setTimeout(() => {
            this.hideTypingIndicator();
            this.generateResponse(message);
        }, 1000 + Math.random() * 1000);
    }
    
    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        
        const avatar = document.createElement('div');
        avatar.className = `message-avatar ${sender}`;
        avatar.innerHTML = sender === 'user' ? '👤' : '🤖';
        
        const messageContent = document.createElement('div');
        messageContent.className = `message-content ${sender}`;
        messageContent.textContent = content;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
        
        // Store in conversation history
        this.conversationHistory.push({ sender, content, timestamp: Date.now() });
    }
    
    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message';
        typingDiv.id = 'typingIndicator';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar bot';
        avatar.innerHTML = '🤖';
        
        const typingContent = document.createElement('div');
        typingContent.className = 'typing-indicator';
        typingContent.innerHTML = `
            <span>PickHealth Assistant is typing</span>
            <div class="typing-dots">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        
        typingDiv.appendChild(avatar);
        typingDiv.appendChild(typingContent);
        
        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    generateResponse(userMessage) {
        const response = this.getIntelligentResponse(userMessage);
        this.addMessage(response, 'bot');
        
        // Update suggestions based on context
        this.updateSuggestions(userMessage);
    }
    
    getIntelligentResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Registration and getting started
        if (lowerMessage.includes('register') || lowerMessage.includes('sign up') || lowerMessage.includes('get started')) {
            return "Great! To get started with PickHealth, click the 'Register' tab above. You can choose between:\n\n🏢 **Corporate Client** - If you're looking for healthy meal providers for your team\n👨‍🍳 **Meal Provider** - If you're a caterer/restaurant wanting to serve corporate clients\n\nWhich type of account would you like to create?";
        }
        
        // How it works
        if (lowerMessage.includes('how') && lowerMessage.includes('work')) {
            return "PickHealth works in 3 simple steps:\n\n1️⃣ **Company Setup** - Tell us about your team size, budget, and preferences\n2️⃣ **Smart Matching** - Our AI matches you with the perfect meal providers\n3️⃣ **Fresh Delivery** - Healthy meals delivered to your office\n\nWe handle the logistics while you focus on your business!";
        }
        
        // Pricing and costs
        if (lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('fee')) {
            return "PickHealth operates on a commission model:\n\n💰 **No upfront costs** for companies or meal providers\n💼 **Corporate clients** pay their meal providers directly\n🤝 **Meal providers** pay a small commission on successful orders\n\nThis ensures everyone wins - no hidden fees or surprises!";
        }
        
        // Meal providers
        if (lowerMessage.includes('meal provider') || lowerMessage.includes('caterer') || lowerMessage.includes('restaurant')) {
            return "Our meal providers are carefully vetted local businesses that specialize in healthy, corporate-friendly meals:\n\n✅ **Health-focused menus** with nutritional information\n✅ **Corporate experience** handling large orders\n✅ **Reliable delivery** to office locations\n✅ **Flexible options** for dietary restrictions\n\nWould you like to see available providers in your area?";
        }
        
        // Corporate benefits
        if (lowerMessage.includes('benefit') || lowerMessage.includes('advantage') || lowerMessage.includes('why')) {
            return "PickHealth offers several key benefits:\n\n📈 **Boost Productivity** - Healthy employees are 25% more productive\n💚 **Employee Wellness** - Support your team's health goals\n📊 **Detailed Reporting** - Track meal preferences and satisfaction\n👥 **Retention Boost** - Companies with wellness programs see 28% higher retention\n\nIt's an investment in your team's health and your company's success!";
        }
        
        // Partnership
        if (lowerMessage.includes('partner') || lowerMessage.includes('join') || lowerMessage.includes('become')) {
            return "We're always looking for great meal providers to join our network! Benefits include:\n\n🎯 **Steady corporate orders** (200-400 meals/week)\n💰 **Higher revenue** with predictable monthly income\n📦 **Bulk delivery efficiency** vs individual orders\n📈 **Business growth** - we handle sales, you handle cooking\n🤝 **No upfront costs** - revenue share model\n\nInterested in becoming a partner?";
        }
        
        // Support and help
        if (lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('contact')) {
            return "I'm here to help! You can:\n\n💬 **Ask me anything** about PickHealth\n📧 **Email us** at support@pickhealth.com\n📱 **Call us** at (404) 555-0123\n\nFor immediate assistance, try our quick action buttons above. What would you like to know more about?";
        }
        
        // Default response
        return "That's a great question! I'd be happy to help you learn more about PickHealth. You can:\n\n🔍 **Ask specific questions** about our services\n📋 **Use the quick action buttons** above for common topics\n💡 **Learn about our process** and how we help companies and meal providers\n\nWhat would you like to know more about?";
    }
    
    handleQuickAction(action) {
        let response = '';
        
        switch (action) {
            case 'how-it-works':
                response = "Here's how PickHealth works:\n\n1️⃣ **Company Setup** - Tell us about your team size, budget, and dietary preferences\n2️⃣ **AI Matching** - Our smart system matches you with the perfect meal providers\n3️⃣ **Fresh Delivery** - Healthy meals delivered to your office, ready to enjoy\n\nWe handle all the logistics while you focus on your business. It's that simple!";
                break;
                
            case 'pricing':
                response = "PickHealth pricing is simple and transparent:\n\n🏢 **For Companies**:\n• No setup fees or monthly charges\n• Pay meal providers directly at their rates\n• We earn commission from providers, not you\n\n👨‍🍳 **For Meal Providers**:\n• No upfront costs to join\n• Small commission on successful orders\n• Access to corporate clients you couldn't reach otherwise\n\nEveryone wins with our model!";
                break;
                
            case 'registration':
                response = "Ready to get started? Here's how:\n\n1️⃣ **Click the 'Register' tab** above\n2️⃣ **Choose your account type**:\n   • Corporate Client - Looking for meal providers\n   • Meal Provider - Ready to serve corporate clients\n3️⃣ **Fill out your profile** with company details\n4️⃣ **Start connecting** with partners!\n\nRegistration takes just 2-3 minutes. Would you like me to walk you through it?";
                break;
                
            case 'support':
                response = "Need support? We're here to help!\n\n📧 **Email**: support@pickhealth.com\n📱 **Phone**: (404) 555-0123\n⏰ **Hours**: Monday-Friday, 9AM-6PM EST\n\n**Common Support Topics**:\n• Account setup and management\n• Meal provider recommendations\n• Delivery scheduling\n• Billing and payments\n• Technical issues\n\nWhat can I help you with today?";
                break;
        }
        
        if (response) {
            this.addMessage(response, 'bot');
        }
    }
    
    handleSuggestion(suggestion) {
        this.chatInput.value = suggestion;
        this.sendMessage();
    }
    
    updateSuggestions(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        let newSuggestions = [];
        
        if (lowerMessage.includes('register') || lowerMessage.includes('sign up')) {
            newSuggestions = ['What information do I need?', 'How long does it take?', 'Is it free?'];
        } else if (lowerMessage.includes('meal') || lowerMessage.includes('food')) {
            newSuggestions = ['What cuisines are available?', 'How do I choose a provider?', 'What about dietary restrictions?'];
        } else if (lowerMessage.includes('cost') || lowerMessage.includes('price')) {
            newSuggestions = ['Are there hidden fees?', 'How does billing work?', 'What about bulk discounts?'];
        } else {
            newSuggestions = ['Tell me more about PickHealth', 'How do I get started?', 'What makes you different?'];
        }
        
        this.chatSuggestions.innerHTML = newSuggestions.map(suggestion => 
            `<div class="chat-suggestion">${suggestion}</div>`
        ).join('');
    }
    
    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
}

// Initialize chatbot when page loads
document.addEventListener('DOMContentLoaded', () => {
    new PickHealthChatbot();
});
