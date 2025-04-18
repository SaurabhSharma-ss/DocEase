document.addEventListener('DOMContentLoaded', function() {
    // Service cards data
    const services = [
        {
            title: "Savings Account Opening",
            description: "Find all required documents to open a new saving account in any major bank.",
            link: "categories/docs/savings_account.html"
        },
        {
            title: "Passport Application",
            description: "Complete document checklist for new passport applications and renewals.",
            link: "categories/docs/passportapplication.html"
        },
        {
            title: "Life Insurance",
            description: "Required documents for life insurance policy applications across providers.",
            link: "categories/docs/termlifeinsurance.html"
        },
        {
            title: "Various Loans",
            description: "Comprehensive document requirements for various loan applications.",
            link: "categories/docs/loan.html"
        },
        {
            title: "Health Insurance",
            description: "Document checklist for health insurance applications and claims.",
            link: "categories/docs/healthinsurance.html"
        },
        {
            title: "Pan Card",
            description: "Everything you need to apply for or update your pan card.",
            link: "categories/docs/pan_card.html"
        }
    ];

    // Populate service cards
    const serviceGrid = document.getElementById('serviceGrid');
    if (serviceGrid) {
        services.forEach(service => {
            const serviceCard = document.createElement('div');
            serviceCard.className = 'service-card';
            serviceCard.innerHTML = `
                <div>
                    <h2>${service.title}</h2>
                    <p>${service.description}</p>
                </div>
                <a href="${service.link}" class="service-link">View Documents</a>
            `;
            serviceGrid.appendChild(serviceCard);
        });
    }

    // Testimonial slider functionality
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    if (prevBtn && nextBtn && testimonials.length > 0) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
            });
        });

        // Auto slide testimonials
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 5000);
    }

    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const notification = document.getElementById('notification');

    if (searchBtn && searchInput && notification) {
        searchBtn.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });

        function handleSearch() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            if (searchTerm === '') return;

            // Find matching service
            const matchedService = services.find(service => 
                service.title.toLowerCase().includes(searchTerm) || 
                service.description.toLowerCase().includes(searchTerm)
            );

            if (matchedService) {
                // Highlight the matched service
                const serviceCards = document.querySelectorAll('.service-card');
                serviceCards.forEach((card) => {
                    if (card.querySelector('h2').textContent === matchedService.title) {
                        // Scroll to the service
                        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        
                        // Add highlight class for animation
                        card.classList.add('highlight-service');
                        setTimeout(() => {
                            card.classList.remove('highlight-service');
                        }, 2000);

                        // Show notification
                        notification.textContent = `Found: ${matchedService.title} documents`;
                        notification.classList.add('show');
                        setTimeout(() => {
                            notification.classList.remove('show');
                        }, 3000);
                    }
                });
            } else {
                // Show not found notification
                notification.textContent = 'No exact matches found. Try a different search.';
                notification.classList.add('show');
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 3000);
            }

            // Clear search input
            searchInput.value = '';
        }
    }

    // Mobile navigation toggle
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');
    
    if (navContainer && navLinks) {
        const mobileNavToggle = document.createElement('button');
        mobileNavToggle.className = 'mobile-nav-toggle';
        mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
        
        navContainer.insertBefore(mobileNavToggle, navLinks);
        
        mobileNavToggle.addEventListener('click', function() {
            navLinks.classList.toggle('show-mobile');
            this.innerHTML = navLinks.classList.contains('show-mobile') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navContainer.contains(e.target) && navLinks.classList.contains('show-mobile')) {
                navLinks.classList.remove('show-mobile');
                mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm && notification) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Show success notification
                notification.textContent = 'Thanks for subscribing!';
                notification.classList.add('show');
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 3000);
                
                emailInput.value = '';
            } else {
                // Show error notification
                notification.textContent = 'Please enter a valid email address.';
                notification.classList.add('show');
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 3000);
            }
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Chat widget functionality
    const chatToggle = document.getElementById('chatToggle');
    const chatWidget = document.getElementById('chatWidget');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const chatBody = document.getElementById('chatBody');
    const chatInput = document.getElementById('chatInput');
    const sendChatBtn = document.getElementById('sendChatBtn');
    
    // Common responses for document requirements
    const responses = {
        'aadhar': 'For Aadhar Card, you need: 1) Proof of Identity, 2) Proof of Address, 3) Proof of Date of Birth, and 4) Recent passport size photograph.',
        'pan': 'For PAN Card, you need: 1) Proof of Identity, 2) Proof of Address, 3) Proof of Date of Birth, and 4) Recent passport size photograph.',
        'passport': 'For Passport application, you need: 1) Proof of Identity, 2) Proof of Address, 3) Birth Certificate, and 4) Recent passport size photographs.',
        'account': 'For opening a Bank Account, typically you need: 1) Identity proof (Aadhar/PAN), 2) Address proof, 3) Passport size photographs, and 4) Initial deposit amount.',
        'loan': 'For a Bank Loan, common requirements include: 1) Identity proof, 2) Address proof, 3) Income proof, 4) Bank statements for last 6 months, and 5) Property documents (for secured loans).',
        'insurance': 'For Insurance policies, you generally need: 1) Identity proof, 2) Age proof, 3) Address proof, 4) Income proof, and 5) Medical reports (for health/life insurance).',
        'driving': 'For a Driving License, you need: 1) Identity proof, 2) Address proof, 3) Age proof, 4) Passport size photographs, and 5) Form 1 for Learner\'s License.',
        'voter': 'For Voter ID, you need: 1) Age proof (18+), 2) Address proof, 3) Identity proof, and 4) Passport size photographs.'
    };
    
    if (chatToggle && chatWidget && closeChatBtn && chatBody && chatInput && sendChatBtn) {
        // Toggle chat widget
        chatToggle.addEventListener('click', function() {
            chatWidget.classList.add('active');
        });
        
        // Close chat widget
        closeChatBtn.addEventListener('click', function() {
            chatWidget.classList.remove('active');
        });
        
        // Send message function
        function sendMessage() {
            const message = chatInput.value.trim();
            if (message === '') return;
            
            // Add user message to chat
            addMessage('user', message);
            chatInput.value = '';
            
            // Add typing indicator
            showTypingIndicator();
            
            // Process the message and respond (with slight delay to simulate thinking)
            setTimeout(() => {
                processMessage(message);
            }, 1500);
        }
        
        // Send message when button is clicked
        sendChatBtn.addEventListener('click', sendMessage);
        
        // Send message when Enter key is pressed
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        // Add message to chat
        function addMessage(sender, text) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${sender}`;
            
            const bubble = document.createElement('div');
            bubble.className = 'chat-bubble';
            bubble.textContent = text;
            
            messageDiv.appendChild(bubble);
            chatBody.appendChild(messageDiv);
            
            // Scroll to bottom
            chatBody.scrollTop = chatBody.scrollHeight;
        }
        
        // Show typing indicator
        function showTypingIndicator() {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'typing-indicator';
            typingDiv.id = 'typingIndicator';
            
            for (let i = 0; i < 3; i++) {
                const dot = document.createElement('span');
                typingDiv.appendChild(dot);
            }
            
            chatBody.appendChild(typingDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        }
        
        // Remove typing indicator
        function removeTypingIndicator() {
            const typingIndicator = document.getElementById('typingIndicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
        }
        
        // Process user message and generate response
        function processMessage(message) {
            removeTypingIndicator();
            
            message = message.toLowerCase();
            let responded = false;
            
            // Check for document-specific keywords
            for (const [key, response] of Object.entries(responses)) {
                if (message.includes(key)) {
                    addMessage('bot', response);
                    responded = true;
                    break;
                }
            }
            
            // Check for service-specific questions
            if (!responded) {
                if (message.includes('bank') || message.includes('banking')) {
                    addMessage('bot', 'For banking services, we have information on account opening, loans, credit cards, and more. What specific banking service are you looking for?');
                } else if (message.includes('insurance')) {
                    addMessage('bot', 'We can help with document requirements for health insurance, life insurance, vehicle insurance, and property insurance. Which one are you interested in?');
                } else if (message.includes('government') || message.includes('scheme')) {
                    addMessage('bot', 'We have information on various government schemes like PM Kisan, Ayushman Bharat, and more. Which government scheme are you looking for?');
                } else if (message.includes('education') || message.includes('school') || message.includes('college')) {
                    addMessage('bot', 'For education-related documents, we can help with admission requirements, scholarship applications, and certificate verification. What specific information do you need?');
                } else if (message.includes('how') && message.includes('work')) {
                    addMessage('bot', 'DocumentEase helps you find all required documents for various services in one place. Simply search for the service you need, view the document list, access tutorials and downloadable forms, and complete your process hassle-free!');
                } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
                    addMessage('bot', 'Hello! I\'m your DocumentEase assistant. I can help you find document requirements for various services like banking, insurance, government schemes, and more. What can I help you with today?');
                } else if (message.includes('thank')) {
                    addMessage('bot', 'You\'re welcome! If you have any more questions about document requirements, feel free to ask anytime.');
                } else {
                    addMessage('bot', "I\'m here to help you find document requirements. Could you specify which service you're looking for? For example, you can ask about Aadhar card, bank account opening, passport, loans, insurance, etc.");
                }
            }
        }
    }
});
