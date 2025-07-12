// Contact Page JavaScript - Terminal Interface
document.addEventListener('DOMContentLoaded', function() {
    // Power indicator animation
    const powerLed = document.querySelector('.power-led');
    if (powerLed) {
        setTimeout(() => powerLed.classList.add('active'), 500);
    }

    // Terminal typing animation
    const terminalBody = document.querySelector('.terminal-body');
    const commands = [
        { type: 'prompt', text: 'engineer@portfolio:~$ ' },
        { type: 'command', text: 'connect --to saad_karim' },
        { type: 'output', text: 'Establishing connection...' },
        { type: 'success', text: 'Connection established successfully!' },
        { type: 'output', text: 'Loading contact information...' },
        { type: 'prompt', text: 'engineer@portfolio:~$ ' },
        { type: 'command', text: 'whoami' },
        { type: 'output', text: 'Saad Karim - Electrical Engineer' },
        { type: 'prompt', text: 'engineer@portfolio:~$ ' },
        { type: 'command', text: 'cat contact_info.txt' }
    ];

    let commandIndex = 0;
    
    function typeCommand() {
        if (commandIndex < commands.length) {
            const cmd = commands[commandIndex];
            const line = document.createElement('div');
            line.className = `terminal-line ${cmd.type}`;
            
            if (cmd.type === 'prompt') {
                line.innerHTML = cmd.text + '<span class="cursor"></span>';
            } else {
                line.textContent = cmd.text;
            }
            
            terminalBody.appendChild(line);
            terminalBody.scrollTop = terminalBody.scrollHeight;
            
            commandIndex++;
            setTimeout(typeCommand, 1000 + Math.random() * 1000);
        } else {
            // Show contact information after commands
            setTimeout(showContactInfo, 1000);
        }
    }

    function showContactInfo() {
        const contactSection = document.querySelector('.contact-info');
        if (contactSection) {
            contactSection.style.opacity = '0';
            contactSection.style.transform = 'translateY(20px)';
            contactSection.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                contactSection.style.opacity = '1';
                contactSection.style.transform = 'translateY(0)';
            }, 100);
        }
    }

    // Start terminal animation
    setTimeout(typeCommand, 1000);

    // Connection status animation
    const statusLed = document.querySelector('.status-led');
    if (statusLed) {
        setInterval(() => {
            statusLed.style.background = statusLed.style.background === 'rgb(255, 189, 46)' ? '#28ca42' : '#ffbd2e';
        }, 3000);
    }

    // Contact link interactions
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add terminal command for link click
            const line = document.createElement('div');
            line.className = 'terminal-line prompt';
            line.innerHTML = `engineer@portfolio:~$ open ${this.href}<span class="cursor"></span>`;
            terminalBody.appendChild(line);
            
            const outputLine = document.createElement('div');
            outputLine.className = 'terminal-line success';
            outputLine.textContent = 'Opening external link...';
            terminalBody.appendChild(outputLine);
            
            terminalBody.scrollTop = terminalBody.scrollHeight;
            
            // Play click sound
            playTone(1000, 100);
        });
    });

    // Contact item hover effects
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(100, 255, 218, 0.1)';
            this.style.borderLeftColor = '#64ffda';
            this.style.transform = 'translateX(5px)';
            
            // Play hover sound
            playTone(800, 50);
        });

        item.addEventListener('mouseleave', function() {
            this.style.background = '';
            this.style.borderLeftColor = '';
            this.style.transform = '';
        });
    });

    // Terminal window controls
    const controlButtons = document.querySelectorAll('.control-button');
    controlButtons.forEach(button => {
        button.addEventListener('click', function() {
            const terminalWindow = document.querySelector('.terminal-window');
            
            if (this.classList.contains('close')) {
                // Close animation
                terminalWindow.style.transform = 'scale(0.8)';
                terminalWindow.style.opacity = '0';
                setTimeout(() => {
                    terminalWindow.style.transform = '';
                    terminalWindow.style.opacity = '';
                }, 300);
            } else if (this.classList.contains('minimize')) {
                // Minimize animation
                terminalWindow.style.height = '50px';
                setTimeout(() => {
                    terminalWindow.style.height = '';
                }, 1000);
            } else if (this.classList.contains('maximize')) {
                // Maximize animation
                terminalWindow.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    terminalWindow.style.transform = '';
                }, 300);
            }
            
            // Play control sound
            playTone(600, 100);
        });
    });

    // System info updates
    const systemInfo = document.querySelector('.system-info');
    if (systemInfo) {
        const updateTime = () => {
            const now = new Date();
            const timeElement = systemInfo.querySelector('.info-item:last-child .info-value');
            if (timeElement) {
                timeElement.textContent = now.toLocaleTimeString();
            }
        };
        
        setInterval(updateTime, 1000);
        updateTime();
    }

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
            
            // Add terminal command
            const line = document.createElement('div');
            line.className = 'terminal-line prompt';
            line.innerHTML = `engineer@portfolio:~$ navigate --to ${this.textContent.toLowerCase()}<span class="cursor"></span>`;
            terminalBody.appendChild(line);
            
            const outputLine = document.createElement('div');
            outputLine.className = 'terminal-line success';
            outputLine.textContent = 'Navigation initiated...';
            terminalBody.appendChild(outputLine);
            
            terminalBody.scrollTop = terminalBody.scrollHeight;
            
            // Play button sound
            playTone(1000, 100);
            
            // Navigate after delay
            setTimeout(() => {
                const buttonText = this.textContent.toLowerCase();
                if (buttonText.includes('home')) {
                    window.location.href = 'index.html';
                } else if (buttonText.includes('about')) {
                    window.location.href = 'about.html';
                } else if (buttonText.includes('experience')) {
                    window.location.href = 'experience.html';
                } else if (buttonText.includes('projects')) {
                    window.location.href = 'projects.html';
                } else if (buttonText.includes('skills')) {
                    window.location.href = 'skills.html';
                }
            }, 500);
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
            } else if (buttonText.includes('skills')) {
                window.location.href = 'skills.html';
            }
        });
    });

    // Terminal cursor blinking
    setInterval(() => {
        const cursors = document.querySelectorAll('.cursor');
        cursors.forEach(cursor => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        });
    }, 500);

    // Random system messages
    const systemMessages = [
        'System health check: OK',
        'Memory usage: 45%',
        'Network status: Connected',
        'CPU temperature: Normal',
        'Disk space: 78% available'
    ];

    setInterval(() => {
        const line = document.createElement('div');
        line.className = 'terminal-line output';
        line.style.color = '#64ffda';
        line.style.fontSize = '11px';
        line.textContent = `[INFO] ${systemMessages[Math.floor(Math.random() * systemMessages.length)]}`;
        
        terminalBody.appendChild(line);
        terminalBody.scrollTop = terminalBody.scrollHeight;
        
        // Remove old messages to prevent overflow
        const lines = terminalBody.querySelectorAll('.terminal-line');
        if (lines.length > 50) {
            lines[0].remove();
        }
    }, 15000);

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
});
