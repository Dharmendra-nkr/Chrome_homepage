// AI Revolver Widget Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize both revolvers
    initRevolver('aiRevolver', 'revolverCylinder', false);
    initRevolver('aiRevolverLeft', 'revolverCylinderLeft', true);
    
    // Set up custom shortcut modal handlers
    setupCustomShortcutModal();
});

function initRevolver(revolverId, cylinderId, isCustom = false) {
    const revolver = document.getElementById(revolverId);
    const revolverCylinder = document.getElementById(cylinderId);
    
    if (!revolver || !revolverCylinder) return;
    
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
            
            // Always disable transition during active scrolling for immediate response
            revolverCylinder.style.transition = 'none';
            
            const delta = e.deltaY;
            // Inverted rotation: scroll down = anti-clockwise
            currentRotation -= delta * 0.25;
            revolverCylinder.style.transform = `rotate(${currentRotation}deg)`;
            
            // Keep tool content upright by counter-rotating
            const tools = revolver.querySelectorAll('.revolver-tool');
            tools.forEach((tool) => {
                const toolCircle = tool.querySelector('.tool-circle');
                const toolLabel = tool.querySelector('.tool-label');
                if (toolCircle) toolCircle.style.transform = `rotate(${-currentRotation}deg)`;
                if (toolLabel) toolLabel.style.transform = `translateX(-50%) rotate(${-currentRotation}deg)`;
            });
        }
    }, { passive: false });
    
    // Handle tool clicks
    const toolElements = revolver.querySelectorAll('.revolver-tool');
    toolElements.forEach((tool) => {
        tool.addEventListener('click', function() {
            if (isCustom) {
                // For left revolver - open modal to add/edit custom shortcut
                const slot = this.getAttribute('data-slot');
                openCustomShortcutModal(slot);
            } else {
                // For right revolver - open tool links
                if (!isAnimating) {
                    const toolName = this.dataset.tool;
                    const url = aiTools[toolName];
                    if (url) {
                        window.open(url, '_blank');
                    }
                }
            }
        });
    });
    
    // Initialize position with smooth animation
    revolverCylinder.style.transition = 'transform 0.05s linear';
    revolverCylinder.style.transform = `rotate(${currentRotation}deg)`;
    
    // Initialize tool content to stay upright
    toolElements.forEach((tool) => {
        const toolCircle = tool.querySelector('.tool-circle');
        const toolLabel = tool.querySelector('.tool-label');
        if (toolCircle) toolCircle.style.transform = `rotate(${-currentRotation}deg)`;
        if (toolLabel) toolLabel.style.transform = `translateX(-50%) rotate(${-currentRotation}deg)`;
    });
    
    // Load custom shortcuts if left revolver
    if (isCustom) {
        loadCustomShortcuts();
    }
}

// Custom shortcut modal functions
let currentSlotIndex = null;

function openCustomShortcutModal(slot) {
    console.log('Opening custom shortcut modal for slot:', slot);
    currentSlotIndex = parseInt(slot);
    const customShortcuts = JSON.parse(localStorage.getItem('customShortcuts') || '{}');
    const shortcut = customShortcuts[slot] || {};
    
    document.getElementById('customName').value = shortcut.name || '';
    document.getElementById('customLink').value = shortcut.link || '';
    document.getElementById('imagePreview').style.display = 'none';
    document.getElementById('imageUpload').value = '';
    
    if (shortcut.image) {
        document.getElementById('imagePreview').src = shortcut.image;
        document.getElementById('imagePreview').style.display = 'block';
    }
    
    const modal = document.getElementById('customShortcutModal');
    modal.style.display = 'flex';
    console.log('Modal displayed:', modal.style.display);
}

function setupCustomShortcutModal() {
    const modal = document.getElementById('customShortcutModal');
    const dragDropArea = document.getElementById('dragDropArea');
    const imageUpload = document.getElementById('imageUpload');
    const imagePreview = document.getElementById('imagePreview');
    const cancelBtn = document.getElementById('cancelCustom');
    const saveBtn = document.getElementById('saveCustom');
    
    console.log('Setting up modal - Modal:', modal, 'Cancel:', cancelBtn, 'Save:', saveBtn);
    
    if (!modal || !cancelBtn || !saveBtn) {
        console.error('Modal elements not found!', {modal, cancelBtn, saveBtn});
        return;
    }
    
    // Prevent modal close when clicking inside modal-content
    modal.addEventListener('click', (e) => {
        console.log('Modal clicked, target:', e.target.id);
        if (e.target === modal) {
            modal.style.display = 'none';
            currentSlotIndex = null;
        }
    });
    
    // Drag and drop handlers
    dragDropArea.addEventListener('click', () => {
        console.log('Drag drop area clicked');
        imageUpload.click();
    });
    
    dragDropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        dragDropArea.classList.add('dragover');
    });
    
    dragDropArea.addEventListener('dragleave', () => {
        dragDropArea.classList.remove('dragover');
    });
    
    dragDropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        dragDropArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        console.log('Files dropped:', files.length);
        if (files.length > 0) {
            handleImageUpload(files[0]);
        }
    });
    
    imageUpload.addEventListener('change', (e) => {
        console.log('Image file selected');
        if (e.target.files.length > 0) {
            handleImageUpload(e.target.files[0]);
        }
    });
    
    // Ensure buttons are clickable and properly bound
    cancelBtn.onclick = (e) => {
        console.log('Cancel button clicked');
        e.preventDefault();
        e.stopPropagation();
        modal.style.display = 'none';
        currentSlotIndex = null;
    };
    
    saveBtn.onclick = (e) => {
        console.log('Save button clicked');
        e.preventDefault();
        e.stopPropagation();
        saveCustomShortcut();
    };
    
    console.log('Modal setup complete');
}

function handleImageUpload(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        document.getElementById('imagePreview').src = e.target.result;
        document.getElementById('imagePreview').style.display = 'block';
    };
    reader.readAsDataURL(file);
}

function saveCustomShortcut() {
    console.log('Save custom shortcut called');
    const name = document.getElementById('customName').value.trim();
    const link = document.getElementById('customLink').value.trim();
    const imagePreview = document.getElementById('imagePreview');
    const image = imagePreview.style.display !== 'none' ? imagePreview.src : '';
    
    console.log('Form data:', {name, link, image: image ? 'yes' : 'no'});
    
    if (!name) {
        alert('Please enter a website name');
        return;
    }
    
    if (!link) {
        alert('Please enter a website link');
        return;
    }
    
    // Ensure link has protocol
    let finalLink = link;
    if (!finalLink.startsWith('http://') && !finalLink.startsWith('https://')) {
        finalLink = 'https://' + finalLink;
    }
    
    const customShortcuts = JSON.parse(localStorage.getItem('customShortcuts') || '{}');
    customShortcuts[currentSlotIndex] = {
        name: name,
        link: finalLink,
        image: image
    };
    
    localStorage.setItem('customShortcuts', JSON.stringify(customShortcuts));
    console.log('Shortcut saved:', customShortcuts[currentSlotIndex]);
    
    // Update the UI
    updateCustomShortcutUI(currentSlotIndex, customShortcuts[currentSlotIndex]);
    
    // Close modal
    document.getElementById('customShortcutModal').style.display = 'none';
    currentSlotIndex = null;
    console.log('Modal closed');
}

function loadCustomShortcuts() {
    const customShortcuts = JSON.parse(localStorage.getItem('customShortcuts') || '{}');
    
    for (let i = 0; i < 6; i++) {
        if (customShortcuts[i]) {
            updateCustomShortcutUI(i, customShortcuts[i]);
        }
    }
}

function updateCustomShortcutUI(slot, shortcutData) {
    const revolver = document.getElementById('aiRevolverLeft');
    const tool = revolver.querySelector(`[data-slot="${slot}"]`);
    
    if (!tool) return;
    
    const toolCircle = tool.querySelector('.tool-circle');
    const toolLabel = tool.querySelector('.tool-label');
    
    toolCircle.classList.remove('custom-slot');
    toolCircle.innerHTML = '';
    
    toolLabel.textContent = shortcutData.name;
    
    if (shortcutData.image) {
        const img = document.createElement('img');
        img.src = shortcutData.image;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '50%';
        toolCircle.appendChild(img);
    } else {
        // Use first letter
        const firstLetter = shortcutData.name.charAt(0).toUpperCase();
        toolCircle.style.background = 'linear-gradient(135deg, rgba(100, 150, 255, 0.6) 0%, rgba(50, 100, 200, 0.3) 100%)';
        toolCircle.style.fontSize = '80px';
        toolCircle.style.fontWeight = '800';
        toolCircle.style.color = '#ffffff';
        toolCircle.textContent = firstLetter;
    }
    
    // Update click handler to open the link instead
    tool.onclick = (e) => {
        e.stopPropagation();
        window.open(shortcutData.link, '_blank');
    };
}
