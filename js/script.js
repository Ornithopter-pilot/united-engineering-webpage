// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Subtle animation for tech hints
document.addEventListener('DOMContentLoaded', function() {
    // Add subtle hover effects
    const techElements = document.querySelectorAll('.tech-hint');
    
    techElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.borderLeft = '3px solid #ff5722';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.borderLeft = 'none';
        });
    });

    // Fading animations for section appearances
    const fadeElements = document.querySelectorAll('.feature-card, .product-card');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transition = 'opacity 0.5s ease-in-out';
        fadeObserver.observe(element);
    });

    // Form submission handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulating form submission
            const submitBtn = form.querySelector('button[type="submit"]');
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
        });
    });

    // Subtle background animations (blueprints for industrial feel)
    const heroBg = document.querySelector('.hero');
    if (heroBg) {
        // Create and append a canvas for blueprint animation
        const canvas = document.createElement('canvas');
        canvas.classList.add('blueprint-canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.opacity = '0.05';
        canvas.style.zIndex = '1';
        heroBg.appendChild(canvas);
        
        // Set canvas dimensions
        canvas.width = heroBg.offsetWidth;
        canvas.height = heroBg.offsetHeight;
        
        const ctx = canvas.getContext('2d');
        
        // Draw blueprint grid
        function drawGrid() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 0.5;
            
            // Major grid lines
            const majorSpacing = 50;
            ctx.beginPath();
            for (let x = 0; x < canvas.width; x += majorSpacing) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
            }
            for (let y = 0; y < canvas.height; y += majorSpacing) {
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
            }
            ctx.stroke();
            
            // Minor grid lines
            ctx.lineWidth = 0.2;
            const minorSpacing = 10;
            ctx.beginPath();
            for (let x = 0; x < canvas.width; x += minorSpacing) {
                if (x % majorSpacing !== 0) {
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, canvas.height);
                }
            }
            for (let y = 0; y < canvas.height; y += minorSpacing) {
                if (y % majorSpacing !== 0) {
                    ctx.moveTo(0, y);
                    ctx.lineTo(canvas.width, y);
                }
            }
            ctx.stroke();
            
            // Add some random circles and lines for technical feel
            const numElements = Math.floor(canvas.width / 100);
            
            ctx.strokeStyle = '#ffffff';
            for (let i = 0; i < numElements; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const radius = 5 + Math.random() * 20;
                
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.stroke();
                
                // Add a line from each circle
                const angle = Math.random() * Math.PI * 2;
                const length = 20 + Math.random() * 50;
                const endX = x + Math.cos(angle) * length;
                const endY = y + Math.sin(angle) * length;
                
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(endX, endY);
                ctx.stroke();
            }
        }
        
        // Initial drawing
        drawGrid();
        
        // Redraw on resize
        window.addEventListener('resize', () => {
            canvas.width = heroBg.offsetWidth;
            canvas.height = heroBg.offsetHeight;
            drawGrid();
        });
    }
});