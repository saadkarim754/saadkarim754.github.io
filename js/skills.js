// Skills Page JavaScript - Breadboard Interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Power indicator animation
    const powerLed = document.querySelector('.power-led');
    if (powerLed) {
        setTimeout(() => powerLed.classList.add('active'), 500);
    }

    // Voltage indicator animation
    const voltageLed = document.querySelector('.voltage-led');
    if (voltageLed) {
        setInterval(() => {
            voltageLed.style.opacity = voltageLed.style.opacity === '0.3' ? '1' : '0.3';
        }, 1000);
    }

    // Skill component animations and interactions
    const skillComponents = document.querySelectorAll('.skill-component');
    const skillData = {
        'JavaScript': 95,
        'Python': 90,
        'C++': 85,
        'Java': 80,
        'Arduino': 95,
        'PCB Design': 85,
        'Circuit Analysis': 90,
        'Embedded Systems': 88,
        'React': 85,
        'Node.js': 80,
        'MongoDB': 75,
        'Git': 90,
        'VS Code': 95,
        'MATLAB': 80,
        'KiCad': 85,
        'Oscilloscope': 90
    };

    // Initialize skill meters
    skillComponents.forEach((component, index) => {
        const label = component.querySelector('.skill-label').textContent;
        const meter = component.querySelector('.meter-fill');
        const pins = component.querySelectorAll('.pin');
        
        // Set meter level based on skill data
        const skillLevel = skillData[label] || 70;
        
        // Animate meter fill on load
        setTimeout(() => {
            if (meter) {
                meter.style.width = skillLevel + '%';
            }
        }, 1000 + (index * 200));

        // Component hover interactions
        component.addEventListener('mouseenter', function() {
            // Activate pins
            pins.forEach((pin, pinIndex) => {
                setTimeout(() => pin.classList.add('active'), pinIndex * 100);
            });
            
            // Play connection sound
            playTone(800, 100);
            
            // Add glow effect
            this.style.boxShadow = '0 0 20px rgba(100, 255, 218, 0.6)';
        });

        component.addEventListener('mouseleave', function() {
            // Deactivate pins
            pins.forEach(pin => pin.classList.remove('active'));
            
            // Remove glow effect
            this.style.boxShadow = '';
        });

        // Component click interaction
        component.addEventListener('click', function() {
            // Pulse animation
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Play click sound
            playTone(1200, 150);
            
            // Flash all pins
            pins.forEach(pin => {
                pin.style.background = '#64ffda';
                pin.style.boxShadow = '0 0 10px #64ffda';
                setTimeout(() => {
                    pin.style.background = '';
                    pin.style.boxShadow = '';
                }, 300);
            });
        });
    });

    // Arduino navigation buttons
    const navButtons = document.querySelectorAll('.nav-arduino-btn');
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const led = this.querySelector('.button-led');
            
            // LED flash effect
            led.style.background = '#64ffda';
            led.style.boxShadow = '0 0 15px #64ffda';
            
            setTimeout(() => {
                led.style.background = '';
                led.style.boxShadow = '';
            }, 300);
            
            // Play button sound
            playTone(1000, 100);
            
            // Navigate based on button text
            const buttonText = this.textContent.toLowerCase();
            if (buttonText.includes('home')) {
                window.location.href = 'index.html';
            } else if (buttonText.includes('about')) {
                window.location.href = 'about.html';
            } else if (buttonText.includes('experience')) {
                window.location.href = 'experience.html';
            } else if (buttonText.includes('projects')) {
                window.location.href = 'projects.html';
            } else if (buttonText.includes('contact')) {
                window.location.href = 'contact.html';
            }
        });
    });

    // Regular navigation buttons
    const regularNavButtons = document.querySelectorAll('.nav-button');
    regularNavButtons.forEach(button => {
        button.addEventListener('click', function() {
            playTone(800, 100);
            
            const buttonText = this.textContent.toLowerCase();
            if (buttonText.includes('home')) {
                window.location.href = 'index.html';
            } else if (buttonText.includes('about')) {
                window.location.href = 'about.html';
            } else if (buttonText.includes('experience')) {
                window.location.href = 'experience.html';
            } else if (buttonText.includes('projects')) {
                window.location.href = 'projects.html';
            } else if (buttonText.includes('contact')) {
                window.location.href = 'contact.html';
            }
        });
    });

    // Breadboard power-up sequence
    setTimeout(() => {
        const components = document.querySelectorAll('.skill-component');
        components.forEach((component, index) => {
            setTimeout(() => {
                component.style.borderColor = '#64ffda';
                component.style.boxShadow = '0 0 10px rgba(100, 255, 218, 0.3)';
                
                setTimeout(() => {
                    component.style.borderColor = '';
                    component.style.boxShadow = '';
                }, 500);
            }, index * 100);
        });
    }, 2000);

    // Audio context for sound effects
    let audioContext;
    
    function initAudio() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    function playTone(frequency, duration) {
        try {
            initAudio();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            oscillator.type = 'square';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration / 1000);
        } catch (error) {
            console.log('Audio not available');
        }
    }

    // Initialize audio on first user interaction
    document.addEventListener('click', initAudio, { once: true });

    // Skill component sorting and filtering
    const componentSections = document.querySelectorAll('.component-section');
    componentSections.forEach(section => {
        const components = section.querySelectorAll('.skill-component');
        
        // Sort components by skill level
        const sortedComponents = Array.from(components).sort((a, b) => {
            const aSkill = skillData[a.querySelector('.skill-label').textContent] || 0;
            const bSkill = skillData[b.querySelector('.skill-label').textContent] || 0;
            return bSkill - aSkill;
        });
        
        const row = section.querySelector('.component-row');
        sortedComponents.forEach(component => row.appendChild(component));
    });

    // Periodic component health check
    setInterval(() => {
        const randomComponent = skillComponents[Math.floor(Math.random() * skillComponents.length)];
        const pins = randomComponent.querySelectorAll('.pin');
        
        pins.forEach(pin => {
            pin.style.background = '#ffbd2e';
            pin.style.boxShadow = '0 0 5px #ffbd2e';
            
            setTimeout(() => {
                pin.style.background = '';
                pin.style.boxShadow = '';
            }, 200);
        });
    }, 10000);
});
