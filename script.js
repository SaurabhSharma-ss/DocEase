
        document.addEventListener('DOMContentLoaded', function() {
            // Service cards data
            const services = [
                {
                    title: "Bank Account Opening",
                    description: "Find all required documents to open a new bank account in any major bank.",
                    link: "/banking.html#account-opening"
                },
                {
                    title: "Passport Application",
                    description: "Complete document checklist for new passport applications and renewals.",
                    link: "#"
                },
                {
                    title: "Life Insurance",
                    description: "Required documents for life insurance policy applications across providers.",
                    link: "#"
                },
                {
                    title: "Education Loans",
                    description: "Comprehensive document requirements for education loan applications.",
                    link: "#"
                },
                {
                    title: "Health Insurance",
                    description: "Document checklist for health insurance applications and claims.",
                    link: "#"
                },
                {
                    title: "Pan Card",
                    description: "Everything you need to apply for or update your pan card.",
                    link: "categories/docs/pan.html"
                }
            ];

            // Populate service cards
            const serviceGrid = document.getElementById('serviceGrid');
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

            // Search functionality
            const searchInput = document.getElementById('search-input');
            const searchBtn = document.getElementById('search-btn');
            const notification = document.getElementById('notification');

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
                    serviceCards.forEach((card, index) => {
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

            // Mobile navigation toggle
            const mobileNavToggle = document.createElement('button');
            mobileNavToggle.className = 'mobile-nav-toggle';
            mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
            
            const navContainer = document.querySelector('.nav-container');
            const navLinks = document.querySelector('.nav-links');
            
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

            // Newsletter form submission
            const newsletterForm = document.querySelector('.newsletter-form');
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

            function isValidEmail(email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            }
        });
    