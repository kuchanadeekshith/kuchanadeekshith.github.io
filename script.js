// DOM Elements
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const scrollTopBtn = document.getElementById('scrollTop');
const downloadBtn = document.getElementById('downloadBtn');
const typewriterElement = document.getElementById('typewriter');

// Fixed Typewriter effect with correct name
const typewriter = {
    text: 'Kuchana Deekshith',
    index: 0,
    speed: 120,
    
    init() {
        typewriterElement.textContent = '';
        this.type();
    },
    
    type() {
        if (this.index < this.text.length) {
            typewriterElement.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                typewriterElement.classList.add('typing-complete');
            }, 1000);
        }
    }
};

// Initialize typewriter effect
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => typewriter.init(), 1000);
    initializeAnimations();
});

// Navbar scroll effect
window.addEventListener('scroll', throttle(() => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        scrollTopBtn.classList.add('visible');
    } else {
        navbar.classList.remove('scrolled');
        scrollTopBtn.classList.remove('visible');
    }
    
    updateActiveNavLink();
    parallaxEffect();
}, 16));

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll to top functionality
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Enhanced download resume functionality
downloadBtn.addEventListener('click', () => {
    // Add download animation
    downloadBtn.style.transform = 'scale(0.95)';
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing...';
    
    setTimeout(() => {
        generateResumePDF();
        downloadBtn.style.transform = 'scale(1)';
        downloadBtn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
        
        // Reset button after success
        setTimeout(() => {
            downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download Resume';
        }, 2000);
    }, 1500);
});

// Generate and download resume content
function generateResumePDF() {
    const resumeContent = `
KUCHANA DEEKSHITH
Data Scientist / Junior Developer

📞 7337042003 | 📧 kuchanadeekshith@gmail.com
📍 Warangal, Telangana
🔗 GitHub: github.com/kuchanadeekshith | LinkedIn: linkedin.com/in/deekshithkuchana

PROFESSIONAL SUMMARY
Final-year B.Tech Computer Science student specializing in AI/ML with internship experience. 
Skilled in machine learning, data analysis, and software development. Experienced in building 
data-driven projects and deploying cloud solutions.

TECHNICAL SKILLS
Programming Languages: Python, C, SQL
ML Frameworks: Scikit-learn, PyTorch, Pandas, Seaborn
Deployment & Cloud: AWS (EC2), Docker, Heroku, FastAPI
Development Tools: Git, Jupyter Notebook, Visual Studio Code, Power BI

EXPERIENCE
Machine Learning Intern | Zyveo AI | May 2025 – Sep 2025
• Worked on thumbnail generation project leveraging Hugging Face Inference API
• Conducted extensive data collection for testing to improve model performance
• Designed and prototyped the system, performed model inference optimization

KEY PROJECTS
1. URL Phishing Detection System (Python, XGBoost, Docker, AWS)
   • Achieved 96% recall, 97% precision, and 95% accuracy
   • Implemented cascaded ML architecture with 20+ handcrafted features
   • Dockerized and deployed to AWS with CI/CD pipeline

2. QueryTube - RAG BOT (FastAPI, LangChain, GPT, FAISS)
   • Built retrieval-augmented generation service for YouTube transcripts
   • Implemented vector similarity search with FAISS embeddings

3. Loans & Deposits Risk Analysis (MySQL, Python, Power BI)
   • Developed interactive Power BI dashboards for banking compliance
   • Conducted comprehensive financial data analysis

4. Equipment Energy Consumption Forecasting (Time Series ML)
   • Achieved 97% R2 using Random Forest on sensor data
   • Compared classical (ARIMA, VAR) vs tree-based models

5. Thyroid Classification (99% accuracy)
   • Advanced ML model using Grid Search hyperparameter tuning

6. Bone Fracture Detection (Deep Learning, Computer Vision)
   • Advanced computer vision project for automated medical image analysis
   • Implemented state-of-the-art CNN architectures

EDUCATION
Bachelor of Technology (B.Tech) in Computer Science (AI-ML)
Vaagdevi Engineering College | 2021-2025

Intermediate | Narayana Junior College | 2019-2021
Result: 96.2%
    `;
    
    // Create blob and download
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Kuchana_Deekshith_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Stagger animation for child elements
            const children = entry.target.querySelectorAll('.skill-category, .project-card, .education-item');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Initialize animations
function initializeAnimations() {
    // Observe sections for animation
    const sectionsToAnimate = ['.skills-section', '.projects', '.experience', '.education', '.contact'];
    
    sectionsToAnimate.forEach(selector => {
        const section = document.querySelector(selector);
        if (section) {
            section.classList.add('animate-on-scroll');
            observer.observe(section);
        }
    });
    
    // Initialize skill items with staggered animation
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease';
    });
    
    // Initialize project cards with staggered animation
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.8s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Enhanced parallax effect for floating shapes
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.3;
        const yPos = -(scrolled * speed);
        const rotation = scrolled * 0.05 * (index + 1);
        shape.style.transform = `translate3d(0, ${yPos}px, 0) rotate(${rotation}deg)`;
    });
}

// Enhanced hover effects for skill items
document.addEventListener('DOMContentLoaded', () => {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Enhanced hover effects for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Smooth reveal animation for sections
const revealSections = document.querySelectorAll('section:not(#home)');

const revealSection = function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        
        // Animate skill categories and project cards with stagger
        const animatableElements = entry.target.querySelectorAll('.skill-category, .project-card, .education-item, .timeline-item');
        animatableElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 150);
        });
        
        observer.unobserve(entry.target);
    });
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15
});

// Initially hide sections for reveal animation
revealSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease';
    sectionObserver.observe(section);
});

// Performance optimization: throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add loading animation to elements
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger skill items animation after page load
    setTimeout(() => {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }, 2000);
});

// Enhanced ripple effect for buttons
document.querySelectorAll('.btn, .social-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

console.log('🚀 Portfolio website loaded successfully!');
console.log('✅ Name fixed: Kuchana Deekshith');
console.log('✅ Technical skills section added with icons');
console.log('✅ Profile image integrated');
console.log('✅ Sections prioritized: Skills → Projects → Experience → Education');
console.log('✅ Enhanced animations and interactions');