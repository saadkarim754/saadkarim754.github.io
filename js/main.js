// ================================================
// ELECTRICAL ENGINEERING PORTFOLIO - MAIN JS
// ================================================

class ElectricalPortfolio {
  constructor() {
    this.isInitialized = false;
    this.audioContext = null;
    this.currentPage = 'home';
    this.lcdAnimated = false;
    this.init();
  }

  init() {
    if (this.isInitialized) return;
    
    this.createBinaryRain();
    this.createCircuitBackground();
    this.initLCDDisplay();
    this.initProfileImage();
    this.initAudioFeedback();
    this.setupNavigationButtons();
    this.setupTopNavigation();
    this.setupStatusLEDs();
    this.setupSensorPanel();
    this.startSystemAnimations();
    
    this.isInitialized = true;
    console.log('🔌 Electrical Portfolio System Initialized');
  }

  // ================================================
  // BINARY RAIN EFFECT
  // ================================================
  createBinaryRain() {
    const container = document.querySelector('.binary-rain');
    if (!container) return;

    const columns = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < columns; i++) {
      const column = document.createElement('div');
      column.className = 'binary-column';
      column.style.left = `${i * 20}px`;
      column.style.animationDelay = `${Math.random() * 10}s`;
      column.style.animationDuration = `${10 + Math.random() * 5}s`;
      
      // Generate random binary string
      let binaryString = '';
      for (let j = 0; j < 20; j++) {
        binaryString += Math.random() > 0.5 ? '1' : '0';
        if (j < 19) binaryString += '<br>';
      }
      column.innerHTML = binaryString;
      
      container.appendChild(column);
    }
  }

  // ================================================
  // CIRCUIT BOARD BACKGROUND
  // ================================================
  createCircuitBackground() {
    const container = document.querySelector('.circuit-background');
    if (!container) return;

    // Create horizontal lines
    for (let i = 0; i < 15; i++) {
      const line = document.createElement('div');
      line.className = 'circuit-line horizontal';
      line.style.top = `${Math.random() * 100}%`;
      line.style.left = `${Math.random() * 90}%`;
      line.style.animationDelay = `${Math.random() * 2}s`;
      container.appendChild(line);
    }

    // Create vertical lines
    for (let i = 0; i < 10; i++) {
      const line = document.createElement('div');
      line.className = 'circuit-line vertical';
      line.style.top = `${Math.random() * 90}%`;
      line.style.left = `${Math.random() * 100}%`;
      line.style.animationDelay = `${Math.random() * 2}s`;
      container.appendChild(line);
    }

    // Create nodes
    for (let i = 0; i < 20; i++) {
      const node = document.createElement('div');
      node.className = 'circuit-node';
      node.style.top = `${Math.random() * 100}%`;
      node.style.left = `${Math.random() * 100}%`;
      node.style.animationDelay = `${Math.random() * 3}s`;
      container.appendChild(node);
    }
  }

  // ================================================
  // LCD DISPLAY ANIMATIONS
  // ================================================
  initLCDDisplay() {
    if (this.lcdAnimated) return; // Prevent multiple animations
    
    const line1 = document.getElementById('lcdLine1');
    const line2 = document.getElementById('lcdLine2');
    
    if (!line1 || !line2) return;

    // Clear initial content
    line1.innerHTML = '';
    line2.innerHTML = '';

    // Typewriter effect for line 1
    const text1 = 'SYSTEM ONLINE...';
    this.typewriterEffect(line1, text1, 100, () => {
      // After line 1, type line 2
      setTimeout(() => {
        const text2 = 'MIAN SAAD KARIM<span class="lcd-cursor"></span>';
        this.typewriterEffect(line2, text2, 80, () => {
          this.lcdAnimated = true; // Mark as animated
        });
      }, 500);
    });
  }

  initProfileImage() {
    const profileImg = document.getElementById('profileImg');
    if (profileImg) {
      // Trigger the CSS animation by ensuring the image is loaded
      profileImg.onload = () => {
        console.log('Profile image loaded with cool effect');
      };
      
      // Add hover effect
      profileImg.addEventListener('mouseenter', () => {
        profileImg.style.filter = 'contrast(1.5) brightness(1.4) saturate(1.2)';
        profileImg.style.transform = 'scale(1.05)';
      });
      
      profileImg.addEventListener('mouseleave', () => {
        profileImg.style.filter = 'contrast(1.2) brightness(1.1) saturate(1)';
        profileImg.style.transform = 'scale(1)';
      });
    }
  }

  typewriterEffect(element, text, speed, callback) {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length && text[i] === '<') {
        // Handle HTML tags
        const tagEnd = text.indexOf('>', i);
        if (tagEnd !== -1) {
          element.innerHTML += text.substring(i, tagEnd + 1);
          i = tagEnd + 1;
        } else {
          element.innerHTML += text[i];
          i++;
        }
      } else if (i < text.length) {
        element.innerHTML += text[i];
        i++;
      } else {
        clearInterval(timer);
        if (callback) callback();
      }
    }, speed);
  }

  // ================================================
  // AUDIO FEEDBACK SYSTEM
  // ================================================
  initAudioFeedback() {
    // Initialize Web Audio API for button sounds
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
      this.audioContext = new (AudioContext || webkitAudioContext)();
    }
  }

  playButtonSound(frequency = 800, duration = 100) {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    oscillator.type = 'square';

    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration / 1000);
  }

  // ================================================
  // NAVIGATION SYSTEM
  // ================================================
  setupNavigationButtons() {
    const buttons = document.querySelectorAll('.arduino-button');
    
    buttons.forEach((button, index) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Play button sound
        this.playButtonSound(800 + (index * 100));
        
        // Visual feedback
        this.animateButtonPress(button);
        
        // Navigate based on button
        const page = button.dataset.page;
        if (page) {
          this.navigateToPage(page);
        }
      });

      // Hover effects
      button.addEventListener('mouseenter', () => {
        this.playButtonSound(600, 50);
      });
    });
  }

  animateButtonPress(button) {
    const led = button.querySelector('.button-led');
    
    // Button press animation
    button.style.transform = 'translateY(2px)';
    button.style.boxShadow = '0 1px 3px rgba(0,0,0,0.5)';
    
    // LED flash
    if (led) {
      led.style.background = '#00ff88';
      led.style.boxShadow = '0 0 15px #00ff88';
    }
    
    setTimeout(() => {
      button.style.transform = '';
      button.style.boxShadow = '';
      if (led) {
        led.style.background = '#ff0000';
        led.style.boxShadow = '0 0 5px #ff0000';
      }
    }, 150);
  }

  navigateToPage(page) {
    console.log(`🔌 Navigating to: ${page}`);
    
    // Update current page
    this.currentPage = page;
    
    // Update status LEDs
    this.updateStatusLEDs(page);
    
    // Page transition effect
    this.pageTransition(() => {
      // Redirect to appropriate page
      const pageMap = {
        'about': 'about.html',
        'experience': 'experience.html',
        'projects': 'projects.html',
        'skills': 'skills.html',
        'contact': 'contact.html'
      };
      
      if (pageMap[page]) {
        window.location.href = pageMap[page];
      }
    });
  }

  pageTransition(callback) {
    // Create transition overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, #0a192f, #112240);
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.5s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Courier New', monospace;
      color: #64ffda;
      font-size: 24px;
    `;
    
    overlay.innerHTML = `
      <div style="text-align: center;">
        <div style="font-size: 18px; margin-bottom: 20px;">LOADING...</div>
        <div style="width: 200px; height: 4px; background: #333; border-radius: 2px; overflow: hidden;">
          <div style="width: 0%; height: 100%; background: #64ffda; border-radius: 2px; animation: loadbar 1s ease-out forwards;"></div>
        </div>
      </div>
    `;
    
    // Add loading animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes loadbar {
        to { width: 100%; }
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(overlay);
    
    // Fade in
    setTimeout(() => {
      overlay.style.opacity = '1';
    }, 10);
    
    // Execute callback after transition
    setTimeout(() => {
      if (callback) callback();
    }, 1200);
  }

  // ================================================
  // STATUS LED SYSTEM
  // ================================================
  setupStatusLEDs() {
    this.statusLEDs = {
      power: document.querySelector('[data-led="power"]'),
      network: document.querySelector('[data-led="network"]'),
      data: document.querySelector('[data-led="data"]'),
      system: document.querySelector('[data-led="system"]')
    };
    
    // Simulate system boot sequence
    this.bootSequence();
  }

  bootSequence() {
    const sequence = [
      { led: 'power', delay: 500 },
      { led: 'system', delay: 1000 },
      { led: 'network', delay: 1500 },
      { led: 'data', delay: 2000 }
    ];
    
    sequence.forEach(({ led, delay }) => {
      setTimeout(() => {
        this.activateLED(led);
      }, delay);
    });
  }

  activateLED(ledName) {
    const led = this.statusLEDs[ledName];
    if (led) {
      led.classList.add('active');
      // Play LED activation sound
      this.playButtonSound(1200, 50);
    }
  }

  updateStatusLEDs(page) {
    // Reset all LEDs
    Object.values(this.statusLEDs).forEach(led => {
      if (led) led.classList.remove('active');
    });
    
    // Activate based on current page
    setTimeout(() => {
      this.activateLED('power');
      this.activateLED('system');
      
      if (page !== 'home') {
        this.activateLED('network');
        this.activateLED('data');
      }
    }, 100);
  }

  // ================================================
  // SENSOR PANEL SYSTEM
  // ================================================
  setupSensorPanel() {
    const sensorLeds = document.querySelectorAll('.sensor-led');
    const sensorValues = document.querySelectorAll('.sensor-value');
    
    // Animate sensors periodically
    setInterval(() => {
      sensorLeds.forEach((led, index) => {
        // Random blink pattern
        if (Math.random() > 0.7) {
          led.style.opacity = '0.3';
          setTimeout(() => {
            led.style.opacity = '1';
          }, 200);
        }
      });
      
      // Update sensor values occasionally
      if (Math.random() > 0.8) {
        this.updateSensorValues(sensorValues);
      }
    }, 2000);
  }

  updateSensorValues(sensorValues) {
    const values = [
      `${(20 + Math.random() * 10).toFixed(1)}°C`,
      `${(4.8 + Math.random() * 0.4).toFixed(1)}V`,
      `${(1.0 + Math.random() * 0.5).toFixed(1)}Gb`,
      `${(2.3 + Math.random() * 0.2).toFixed(1)}GHz`
    ];
    
    sensorValues.forEach((value, index) => {
      if (values[index]) {
        value.textContent = values[index];
      }
    });
  }

  // ================================================
  // TOP NAVIGATION MENU
  // ================================================
  setupTopNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all buttons
        navButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Play navigation sound
        this.playButtonSound(900, 100);
        
        // Navigate
        const page = button.dataset.page;
        if (page) {
          this.navigateToPage(page);
        }
      });
    });

    // Set initial active state
    const currentBtn = document.querySelector('.nav-btn[data-page="index"]');
    if (currentBtn) {
      currentBtn.classList.add('active');
    }
  }

  // ================================================
  // SYSTEM ANIMATIONS
  // ================================================
  startSystemAnimations() {
    // Random LED flickers
    setInterval(() => {
      const leds = document.querySelectorAll('.circuit-node');
      const randomLed = leds[Math.floor(Math.random() * leds.length)];
      if (randomLed) {
        randomLed.style.background = Math.random() > 0.5 ? '#00ff88' : '#64ffda';
        setTimeout(() => {
          randomLed.style.background = '#00ff88';
        }, 200);
      }
    }, 3000);
    
    // Circuit line animations
    setInterval(() => {
      const lines = document.querySelectorAll('.circuit-line');
      const randomLine = lines[Math.floor(Math.random() * lines.length)];
      if (randomLine) {
        randomLine.style.boxShadow = '0 0 20px #64ffda';
        setTimeout(() => {
          randomLine.style.boxShadow = '';
        }, 500);
      }
    }, 2000);
  }
}

// ================================================
// INITIALIZATION
// ================================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('🔌 Initializing Electrical Engineering Portfolio...');
  new ElectricalPortfolio();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    // Re-initialize animations when page becomes visible
    console.log('🔌 Page visible - refreshing animations');
  }
});

// Window resize handler
window.addEventListener('resize', () => {
  // Recreate binary rain on resize
  const container = document.querySelector('.binary-rain');
  if (container) {
    container.innerHTML = '';
    setTimeout(() => {
      const portfolio = new ElectricalPortfolio();
      portfolio.createBinaryRain();
    }, 100);
  }
});
