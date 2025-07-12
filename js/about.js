// ================================================
// ABOUT PAGE - INTERACTIVE COMPONENTS
// ================================================

class AboutPageController {
  constructor() {
    this.isInitialized = false;
    this.init();
  }

  init() {
    if (this.isInitialized) return;
    
    // Initialize components when page loads
    document.addEventListener('DOMContentLoaded', () => {
      this.initAnimatedNumbers();
      this.initStatusLEDs();
      this.initMeterControls();
      this.initTerminalAnimation();
      this.startWaveAnimation();
    });
    
    this.isInitialized = true;
    console.log('🔌 About Page Controller Initialized');
  }

  // ================================================
  // ANIMATED NUMBERS (Digital Multimeter)
  // ================================================
  initAnimatedNumbers() {
    const numbers = document.querySelectorAll('.animated-number');
    
    numbers.forEach(number => {
      const target = parseInt(number.dataset.target);
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60 FPS
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        
        // Format number with leading zeros if needed
        const displayValue = Math.floor(current).toString().padStart(2, '0');
        number.textContent = displayValue;
        
        // Add glow effect when reaching target
        if (current === target) {
          number.style.textShadow = '0 0 15px #ffd700';
        }
      }, 16);
    });
  }

  // ================================================
  // STATUS LED SYSTEM
  // ================================================
  initStatusLEDs() {
    const statusLEDs = document.querySelectorAll('.status-led-big');
    
    // Activate LEDs in sequence
    statusLEDs.forEach((led, index) => {
      setTimeout(() => {
        led.classList.add('active');
        this.playLEDSound();
      }, (index + 1) * 500);
    });
    
    // Add click interaction
    statusLEDs.forEach(led => {
      led.addEventListener('click', () => {
        led.classList.toggle('active');
        this.playLEDSound();
      });
    });
  }

  // ================================================
  // METER CONTROLS INTERACTION
  // ================================================
  initMeterControls() {
    const knobs = document.querySelectorAll('.control-knob');
    const switches = document.querySelectorAll('.control-switch');
    
    // Knob rotation on click
    knobs.forEach(knob => {
      let rotation = 0;
      knob.addEventListener('click', () => {
        rotation += 45;
        knob.style.transform = `rotate(${rotation}deg)`;
        this.playKnobSound();
        
        // Update multimeter display based on knob rotation
        this.updateMeterDisplay(rotation);
      });
    });
    
    // Switch toggle
    switches.forEach(switchElement => {
      switchElement.addEventListener('click', () => {
        switchElement.classList.toggle('active');
        this.playSwitchSound();
      });
    });
  }

  updateMeterDisplay(rotation) {
    // Simulate different measurements based on knob position
    const measurements = [
      { label: 'VOLTAGE', value: '3.3', unit: 'V' },
      { label: 'CURRENT', value: '150', unit: 'mA' },
      { label: 'RESISTANCE', value: '10K', unit: 'Ω' },
      { label: 'FREQUENCY', value: '50', unit: 'Hz' }
    ];
    
    const index = Math.floor(rotation / 90) % measurements.length;
    const measurement = measurements[index];
    
    // Find and update the first metric line
    const firstMetric = document.querySelector('.display-line.metric');
    if (firstMetric) {
      firstMetric.querySelector('.label').textContent = measurement.label + ':';
      firstMetric.querySelector('.value').textContent = measurement.value;
      firstMetric.querySelector('.unit').textContent = measurement.unit;
    }
  }

  // ================================================
  // TERMINAL ANIMATION
  // ================================================
  initTerminalAnimation() {
    // Animate text lines appearing
    const textLines = document.querySelectorAll('.text-line');
    
    textLines.forEach((line, index) => {
      setTimeout(() => {
        line.style.opacity = '1';
        line.style.animation = 'type-in 0.5s ease-out forwards';
      }, index * 300);
    });
  }

  // ================================================
  // OSCILLOSCOPE WAVE ANIMATION
  // ================================================
  startWaveAnimation() {
    const waves = document.querySelectorAll('.wave');
    
    // Animate wave drawing
    waves.forEach((wave, index) => {
      setTimeout(() => {
        wave.style.strokeDashoffset = '0';
      }, index * 500);
    });
    
    // Continuous wave animation
    setInterval(() => {
      this.animateWaves();
    }, 5000);
  }

  animateWaves() {
    const waves = document.querySelectorAll('.wave');
    
    waves.forEach((wave, index) => {
      // Reset animation
      wave.style.strokeDashoffset = '1000';
      
      setTimeout(() => {
        wave.style.strokeDashoffset = '0';
      }, index * 200);
    });
  }

  // ================================================
  // AUDIO FEEDBACK
  // ================================================
  playLEDSound() {
    this.playTone(1200, 100);
  }

  playKnobSound() {
    this.playTone(800, 150);
  }

  playSwitchSound() {
    this.playTone(600, 200);
  }

  playTone(frequency, duration) {
    if (typeof AudioContext === 'undefined' && typeof webkitAudioContext === 'undefined') {
      return;
    }

    const audioContext = new (AudioContext || webkitAudioContext)();
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
  }
}

// ================================================
// ADDITIONAL INTERACTIVE FEATURES
// ================================================

// Multimeter display cycling
function cycleMeterDisplay() {
  const metrics = document.querySelectorAll('.display-line.metric');
  let currentIndex = 0;
  
  setInterval(() => {
    // Flash current metric
    if (metrics[currentIndex]) {
      metrics[currentIndex].style.backgroundColor = 'rgba(255, 215, 0, 0.2)';
      setTimeout(() => {
        metrics[currentIndex].style.backgroundColor = '';
      }, 200);
    }
    
    currentIndex = (currentIndex + 1) % metrics.length;
  }, 3000);
}

// Oscilloscope grid animation
function animateGrid() {
  const grid = document.querySelector('.grid-overlay');
  if (!grid) return;
  
  let opacity = 0.1;
  let direction = 1;
  
  setInterval(() => {
    opacity += direction * 0.02;
    if (opacity >= 0.3 || opacity <= 0.1) {
      direction *= -1;
    }
    grid.style.opacity = opacity;
  }, 100);
}

// Terminal cursor blinking
function animateTerminalCursor() {
  const cursor = document.querySelector('.cursor-blink');
  if (!cursor) return;
  
  setInterval(() => {
    cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
  }, 500);
}

// Initialize page controller
const aboutController = new AboutPageController();

// Start additional animations after page load
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    cycleMeterDisplay();
    animateGrid();
    animateTerminalCursor();
  }, 2000);
});
