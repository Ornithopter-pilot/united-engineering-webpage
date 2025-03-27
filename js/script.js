// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Modern Products Hero Parallax Effect
    const productsHero = document.querySelector('.products-hero-modern');
    const productItems = document.querySelectorAll('.product-item');
    
    if (productsHero && productItems.length > 0) {
        // Parallax effect on mouse movement
        productsHero.addEventListener('mousemove', function(e) {
            const xPos = (e.clientX / window.innerWidth - 0.5) * 20;
            const yPos = (e.clientY / window.innerHeight - 0.5) * 20;
            
            productItems.forEach(item => {
                const speed = parseFloat(getComputedStyle(item).getPropertyValue('--rotation')) / 10 || 0.1;
                const xMove = xPos * speed;
                const yMove = yPos * speed;
                
                item.style.transform = `translateX(${xMove}px) translateY(${yMove}px) translateZ(0) rotateY(var(--rotation)) rotateX(var(--tilt))`;
            });
        });
        
        // Reset positions when mouse leaves
        productsHero.addEventListener('mouseleave', function() {
            productItems.forEach(item => {
                item.style.transform = '';
            });
        });
        
        // Parallax on scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY < window.innerHeight) {
                const scrollPos = window.scrollY;
                productsHero.classList.add('scrolling');
                
                productItems.forEach(item => {
                    const speed = parseFloat(getComputedStyle(item).getPropertyValue('--delay')) || 0.1;
                    const yScroll = scrollPos * speed * 0.5;
                    
                    const currentTransform = item.style.transform;
                    if (currentTransform.includes('translateY')) {
                        // If already has translate from mouse movement, we don't interfere
                        return;
                    }
                    
                    item.style.transform = `translateY(${yScroll}px) translateZ(0) rotateY(var(--rotation)) rotateX(var(--tilt))`;
                });
            } else {
                productsHero.classList.remove('scrolling');
            }
        });
        
        // Smooth scroll from hero to products section
        const exploreBtn = document.querySelector('.products-hero-modern .btn-primary');
        if (exploreBtn) {
            exploreBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    }
    
    // Header scroll effect
    const header = document.querySelector('.header');
    const scrollThreshold = 50;

    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Close mobile menu when a nav link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (mobileMenuBtn) {
                mobileMenuBtn.classList.remove('active');
            }
        });
    });

    // Product tab filter
    const productTabs = document.querySelectorAll('.product-tab');
    const productCards = document.querySelectorAll('.product-card');

    if (productTabs.length > 0 && productCards.length > 0) {
        productTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                productTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                
                // Show/hide products based on category
                productCards.forEach(card => {
                    if (category === 'all') {
                        card.style.display = 'block';
                    } else {
                        const productCategory = card.getAttribute('data-category');
                        if (productCategory === category) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.animate');
    
    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        animateObserver.observe(element);
    });

    // Counters animation
    const counterElements = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps
                
                let current = 0;
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                
                // Unobserve after animation
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 1 });
    
    counterElements.forEach(counter => {
        counterObserver.observe(counter);
    });

    // Form submission handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.textContent = 'Thank you!';
                    form.reset();
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 2000);
                }, 1500);
            }
        });
    });
});
