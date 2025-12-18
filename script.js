// Daily quotes array with motivational quotes
const quotes = [
    {
        text: "With the new day comes new strength and new thoughts.",
        author: "ELEANOR ROOSEVELT"
    },
    {
        text: "The only way to do great work is to love what you do.",
        author: "STEVE JOBS"
    },
    {
        text: "Believe you can and you're halfway there.",
        author: "THEODORE ROOSEVELT"
    },
    {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "WINSTON CHURCHILL"
    },
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "ELEANOR ROOSEVELT"
    },
    {
        text: "It does not matter how slowly you go as long as you do not stop.",
        author: "CONFUCIUS"
    },
    {
        text: "Everything you've ever wanted is on the other side of fear.",
        author: "GEORGE ADDAIR"
    },
    {
        text: "Believe in yourself. You are braver than you think, more talented than you know, and capable of more than you imagine.",
        author: "ROY T. BENNETT"
    },
    {
        text: "I learned that courage was not the absence of fear, but the triumph over it.",
        author: "NELSON MANDELA"
    },
    {
        text: "There is only one way to avoid criticism: do nothing, say nothing, and be nothing.",
        author: "ARISTOTLE"
    },
    {
        text: "Do what you can with all you have, wherever you are.",
        author: "THEODORE ROOSEVELT"
    },
    {
        text: "The only impossible journey is the one you never begin.",
        author: "TONY ROBBINS"
    },
    {
        text: "Your limitation—it's only your imagination.",
        author: "UNKNOWN"
    },
    {
        text: "Great things never come from comfort zones.",
        author: "UNKNOWN"
    },
    {
        text: "Dream it. Wish it. Do it.",
        author: "UNKNOWN"
    },
    {
        text: "Success doesn't just find you. You have to go out and get it.",
        author: "UNKNOWN"
    },
    {
        text: "The harder you work for something, the greater you'll feel when you achieve it.",
        author: "UNKNOWN"
    },
    {
        text: "Don't stop when you're tired. Stop when you're done.",
        author: "UNKNOWN"
    },
    {
        text: "Wake up with determination. Go to bed with satisfaction.",
        author: "UNKNOWN"
    },
    {
        text: "Do something today that your future self will thank you for.",
        author: "SEAN PATRICK FLANERY"
    },
    {
        text: "Little things make big days.",
        author: "UNKNOWN"
    },
    {
        text: "It's going to be hard, but hard does not mean impossible.",
        author: "UNKNOWN"
    },
    {
        text: "Don't wait for opportunity. Create it.",
        author: "UNKNOWN"
    },
    {
        text: "Sometimes we're tested not to show our weaknesses, but to discover our strengths.",
        author: "UNKNOWN"
    },
    {
        text: "The key to success is to focus on goals, not obstacles.",
        author: "UNKNOWN"
    },
    {
        text: "Dream bigger. Do bigger.",
        author: "UNKNOWN"
    },
    {
        text: "Don't be afraid to give up the good to go for the great.",
        author: "JOHN D. ROCKEFELLER"
    },
    {
        text: "If you believe it will work out, you'll see opportunities. If you believe it won't, you will see obstacles.",
        author: "WAYNE DYER"
    },
    {
        text: "The only place where success comes before work is in the dictionary.",
        author: "VIDAL SASSOON"
    },
    {
        text: "Don't let yesterday take up too much of today.",
        author: "WILL ROGERS"
    }
];

// Function to get quote of the day based on date
function getQuoteOfDay() {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    // Use day of year to select a quote consistently for each day
    const quoteIndex = dayOfYear % quotes.length;
    return quotes[quoteIndex];
}

// Function to update clock
function updateClock() {
    const now = new Date();
    
    // Update time with leading zeros
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
    
    // Update day name
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    document.getElementById('dayName').textContent = days[now.getDay()];
    
    // Update date
    const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 
                   'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    const date = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    document.getElementById('date').textContent = `${date} ${month} ${year}`;
}

// Function to set quote of the day
function setQuoteOfDay() {
    const quote = getQuoteOfDay();
    const quoteText = document.getElementById('quoteText');
    
    // Apply gradient effect to specific words if they exist
    let formattedText = quote.text;
    const gradientWords = ['day', 'comes', 'strength', 'thoughts', 'new'];
    gradientWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        formattedText = formattedText.replace(regex, match => {
            // Check if this word should have gradient based on the original quote
            if (quote.text === "With the new day comes new strength and new thoughts." && 
                (match.toLowerCase() === 'day' || match.toLowerCase() === 'comes' || 
                 match.toLowerCase() === 'strength' || match.toLowerCase() === 'thoughts')) {
                return `<span class="gradient-text">${match}</span>`;
            }
            return match;
        });
    });
    
    quoteText.innerHTML = formattedText;
    document.getElementById('quoteAuthor').textContent = quote.author;
}

// Function to handle search
function handleSearch(event) {
    if (event.key === 'Enter') {
        const query = event.target.value.trim();
        if (query) {
            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        }
    }
}

// AI Revolver functionality
let currentRotation = 0;
const cylinderRadius = 190;
const revolverWrapper = document.getElementById('revolverWrapper');
const aiTools = document.querySelectorAll('.ai-tool');

// Position AI tools in a circle
function positionTools() {
    aiTools.forEach((tool, index) => {
        const angle = parseFloat(tool.dataset.angle);
        const radian = ((angle + currentRotation) * Math.PI) / 180;
        const x = Math.cos(radian) * cylinderRadius;
        const y = Math.sin(radian) * cylinderRadius;
        
        tool.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
}

// Handle scroll on revolver
function handleRevolverScroll(event) {
    event.preventDefault();
    const delta = event.deltaY;
    currentRotation += delta * 0.3;
    positionTools();
}

// Handle click on AI tools
aiTools.forEach(tool => {
    tool.addEventListener('click', function() {
        const url = this.dataset.url;
        if (url) {
            window.location.href = url;
        }
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Set initial clock and quote
    updateClock();
    setQuoteOfDay();
    
    // Position AI tools initially
    positionTools();
    
    // Update clock every second
    setInterval(updateClock, 1000);
    
    // Add search functionality
    const searchBox = document.getElementById('searchBox');
    searchBox.addEventListener('keypress', handleSearch);
    
    // Add scroll handler to revolver
    if (revolverWrapper) {
        revolverWrapper.addEventListener('wheel', handleRevolverScroll, { passive: false });
    }
    
    // Focus on search box when clicking anywhere on the page
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.search-box') && 
            !event.target.closest('.ai-tool')) {
            searchBox.focus();
        }
    });
});
