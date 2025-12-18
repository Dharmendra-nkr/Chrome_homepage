// AI Revolver Widget Functionality
document.addEventListener('DOMContentLoaded', function() {
    const revolver = document.getElementById('aiRevolver');
    const revolverCylinder = document.getElementById('revolverCylinder');
    
    let currentRotation = -120;
    let isHovered = false;
    let isAnimating = false;
    let wheelTimeout;
    
    // Revolver tool data
    const aiTools = {
        'ChatGPT': 'https://chat.openai.com',
        'Gemini': 'https://gemini.google.com',
        'Groq': 'https://console.groq.com',
        'Claude': 'https://claude.ai',
        'GitHub': 'https://github.com',
        'LinkedIn': 'https://www.linkedin.com'
    };
    
    // Handle hover
    revolver.addEventListener('mouseenter', function() {
        isHovered = true;
        revolverCylinder.style.transition = 'none';
    });
    
    revolver.addEventListener('mouseleave', function() {
        isHovered = false;
    });
    
    // Smooth easing function
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    
    // Animate to target rotation smoothly
    const animateRotation = (targetRotation, duration = 800) => {
        if (isAnimating) return;
        isAnimating = true;
        
        const startRotation = currentRotation;
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = easeOutCubic(progress);
            
            currentRotation = startRotation + (targetRotation - startRotation) * easeProgress;
            revolverCylinder.style.transform = `rotate(${currentRotation}deg)`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                currentRotation = targetRotation;
                revolverCylinder.style.transform = `rotate(${currentRotation}deg)`;
                isAnimating = false;
            }
        };
        
        requestAnimationFrame(animate);
    };
    
    // Snap to nearest position (120 degree increments for 3 visible circles)
    const snapToPosition = () => {
        const snapAngle = 120;
        const normalizedRotation = ((currentRotation % 360) + 360) % 360;
        const nearestPosition = Math.round(normalizedRotation / snapAngle) * snapAngle;
        
        // Calculate shortest path
        let targetRotation = nearestPosition;
        const diff = targetRotation - currentRotation;
        
        if (diff > 180) {
            targetRotation -= 360;
        } else if (diff < -180) {
            targetRotation += 360;
        }
        
        animateRotation(targetRotation, 700);
    };
    
    // Handle wheel scroll for smooth rotation
    revolver.addEventListener('wheel', function(e) {
        if (isHovered) {
            e.preventDefault();
            
            if (!isAnimating) {
                // Disable transition during scroll for immediate response
                revolverCylinder.style.transition = 'none';
            }
            
            const delta = e.deltaY;
            // Very smooth scroll sensitivity
            currentRotation += delta * 0.15;
            revolverCylinder.style.transform = `rotate(${currentRotation}deg)`;
            
            // Clear previous timeout
            clearTimeout(wheelTimeout);
            
            // Snap to position after user stops scrolling
            wheelTimeout = setTimeout(() => {
                snapToPosition();
            }, 400);
        }
    }, { passive: false });
    
    // Handle tool clicks
    const tools = document.querySelectorAll('.revolver-tool');
    tools.forEach((tool) => {
        tool.addEventListener('click', function() {
            if (!isAnimating) {
                const toolName = this.dataset.tool;
                const url = aiTools[toolName];
                if (url) {
                    window.open(url, '_blank');
                }
            }
        });
    });
    
    // Initialize position with smooth animation
    revolverCylinder.style.transition = 'transform 0.05s linear';
    revolverCylinder.style.transform = `rotate(${currentRotation}deg)`;
});
