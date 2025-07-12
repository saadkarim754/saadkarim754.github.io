// ================================================
// EXPERIENCE PAGE - LOGIC ANALYZER CONTROLLER
// ================================================

class ExperienceController {
  constructor() {
    this.isInitialized = false;
    this.currentYear = 2025;
    this.timelineScale = 1; // 1 year per division
    this.init();
  }

  init() {
    if (this.isInitialized) return;
    
    document.addEventListener('DOMContentLoaded', () => {
      this.setupTimeline();
      this.initSignalPulses();
      this.initExperienceCards();
      this.startAnalyzerAnimations();
      this.setupInteractivity();
    });
    
    this.isInitialized = true;
    console.log('🔌 Experience Analyzer Initialized');
  }

  // ================================================
  // TIMELINE SETUP
  // ================================================
  setupTimeline() {
    // Calculate positions for signal pulses based on years
    const baseYear = 2018;
    const totalYears = this.currentYear - baseYear;
    
    // Education timeline
    this.positionSignal('[data-start="2018"][data-end="2020"]', 2018, 2020, baseYear, totalYears);
    this.positionSignal('[data-start="2020"][data-end="2022"]', 2020, 2022, baseYear, totalYears);
    this.positionSignal('[data-start="2022"][data-end="2026"]', 2022, 2026, baseYear, totalYears);
    
    // Experience timeline
    this.positionSignal('[data-start="2024"][data-end="2024"]', 2024, 2024.5, baseYear, totalYears);
    this.positionSignal('[data-start="2024"][data-end="2025"]:not([data-info*="PAC"])', 2024, 2025, baseYear, totalYears);
    this.positionSignal('[data-start="2025"][data-end="2025"]', 2025, 2025.5, baseYear, totalYears);
    
    // Project bursts
    this.positionBurst('[data-start="2024"]:nth-of-type(1)', 2024.2, baseYear, totalYears);
    this.positionBurst('[data-start="2024"]:nth-of-type(2)', 2024.4, baseYear, totalYears);
    this.positionBurst('[data-start="2025"]:nth-of-type(1)', 2025.1, baseYear, totalYears);
    this.positionBurst('[data-start="2024"]:nth-of-type(3)', 2024.6, baseYear, totalYears);
    this.positionBurst('[data-start="2024"]:nth-of-type(4)', 2024.8, baseYear, totalYears);
  }

  positionSignal(selector, startYear, endYear, baseYear, totalYears) {
    const element = document.querySelector(selector);
    if (!element) return;
    
    const startPercent = ((startYear - baseYear) / totalYears) * 100;
    const widthPercent = ((endYear - startYear) / totalYears) * 100;
    
    element.style.left = `${startPercent}%`;
    element.style.width = `${Math.max(widthPercent, 2)}%`;
  }

  positionBurst(selector, year, baseYear, totalYears) {
    const element = document.querySelector(selector);
    if (!element) return;
    
    const leftPercent = ((year - baseYear) / totalYears) * 100;
    element.style.left = `${leftPercent}%`;
  }

  // ================================================
  // SIGNAL PULSES ANIMATION
  // ================================================
  initSignalPulses() {
    const pulses = document.querySelectorAll('.signal-pulse, .signal-burst');
    
    // Animate pulses appearing in sequence
    pulses.forEach((pulse, index) => {
      pulse.style.opacity = '0';
      pulse.style.transform = 'scaleX(0)';
      
      setTimeout(() => {
        pulse.style.transition = 'all 0.8s ease-out';
        pulse.style.opacity = '0.8';
        pulse.style.transform = 'scaleX(1)';
        
        // Play signal sound
        this.playSignalSound(800 + (index * 50));
      }, index * 200);
    });
    
    // Add hover interactions
    pulses.forEach(pulse => {
      pulse.addEventListener('mouseenter', () => {
        this.playSignalSound(1200);
        pulse.style.filter = 'brightness(1.3)';
      });
      
      pulse.addEventListener('mouseleave', () => {
        pulse.style.filter = 'brightness(1)';
      });
    });
  }

  // ================================================
  // EXPERIENCE CARDS INTERACTION
  // ================================================
  initExperienceCards() {
    const cards = document.querySelectorAll('.experience-card');
    
    cards.forEach((card, index) => {
      // Animate cards appearing
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        card.style.transition = 'all 0.6s ease-out';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, (index + 1) * 300);
      
      // Add click interaction
      card.addEventListener('click', () => {
        // Remove active class from all cards
        cards.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked card
        card.classList.add('active');
        
        // Play selection sound
        this.playSelectionSound();
        
        // Highlight corresponding timeline signal
        this.highlightTimelineSignal(card.dataset.company);
      });
    });
  }

  highlightTimelineSignal(company) {
    // Remove previous highlights
    document.querySelectorAll('.signal-pulse, .signal-burst').forEach(signal => {
      signal.style.filter = 'brightness(1)';
      signal.style.transform = signal.style.transform.replace('scale(1.2)', '');
    });
    
    // Highlight based on company
    let selector = '';
    switch(company) {
      case 'nastp':
        selector = '.timeline-channel[data-channel="experience"] .signal-pulse:last-child';
        break;
      case 'pieas':
        selector = '.timeline-channel[data-channel="experience"] .signal-pulse:nth-child(2)';
        break;
      case 'pac':
        selector = '.timeline-channel[data-channel="experience"] .signal-pulse:first-child';
        break;
    }
    
    const signal = document.querySelector(selector);
    if (signal) {
      signal.style.filter = 'brightness(1.5)';
      signal.style.transform += ' scale(1.2)';
    }
  }

  // ================================================
  // ANALYZER ANIMATIONS
  // ================================================
  startAnalyzerAnimations() {
    // Animate grid appearing
    const grid = document.querySelector('.timeline-grid');
    if (grid) {
      let opacity = 0;
      const fadeIn = setInterval(() => {
        opacity += 0.02;
        grid.style.opacity = opacity;
        if (opacity >= 0.3) {
          clearInterval(fadeIn);
        }
      }, 50);
    }
    
    // Animate trigger LED
    const triggerLed = document.querySelector('.trigger-led');
    if (triggerLed) {
      setTimeout(() => {
        triggerLed.classList.add('active');
        this.playTriggerSound();
      }, 1000);
    }
    
    // Animate scale indicator
    this.animateScaleIndicator();
    
    // Start continuous timeline scanning
    this.startTimelineScanning();
  }

  animateScaleIndicator() {
    const indicator = document.querySelector('.scale-indicator');
    if (!indicator) return;
    
    setInterval(() => {
      indicator.style.animation = 'none';
      setTimeout(() => {
        indicator.style.animation = 'scale-pulse 2s ease-in-out';
      }, 10);
    }, 3000);
  }

  startTimelineScanning() {
    // Create scanning line effect
    const analyzerScreen = document.querySelector('.analyzer-screen');
    if (!analyzerScreen) return;
    
    const scanLine = document.createElement('div');
    scanLine.style.cssText = `
      position: absolute;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(to bottom, transparent, var(--accent-green), transparent);
      box-shadow: 0 0 10px var(--accent-green);
      z-index: 10;
      pointer-events: none;
    `;
    
    analyzerScreen.appendChild(scanLine);
    
    // Animate scan line
    let position = 0;
    setInterval(() => {
      position = (position + 1) % 100;
      scanLine.style.left = `${position}%`;
      
      if (position === 0) {
        this.playScanSound();
      }
    }, 100);
  }

  // ================================================
  // INTERACTIVITY SETUP
  // ================================================
  setupInteractivity() {
    // Analyzer controls
    const scaleIndicator = document.querySelector('.scale-indicator');
    if (scaleIndicator) {
      scaleIndicator.addEventListener('click', () => {
        this.cycleTimeScale();
      });
    }
    
    // Achievement cards interaction
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach((card, index) => {
      card.addEventListener('click', () => {
        card.style.transform = 'translateY(-5px) scale(1.05)';
        setTimeout(() => {
          card.style.transform = 'translateY(0) scale(1)';
        }, 200);
        
        this.playAchievementSound();
      });
    });
    
    // Channel label interactions
    const channelLabels = document.querySelectorAll('.channel-label');
    channelLabels.forEach(label => {
      label.addEventListener('click', () => {
        this.toggleChannel(label.textContent);
      });
    });
  }

  cycleTimeScale() {
    const scales = [1, 0.5, 2, 5]; // years per division
    const currentIndex = scales.indexOf(this.timelineScale);
    this.timelineScale = scales[(currentIndex + 1) % scales.length];
    
    const scaleText = document.querySelector('.time-scale span');
    if (scaleText) {
      scaleText.textContent = `Time Scale: ${this.timelineScale} Year${this.timelineScale !== 1 ? 's' : ''}/Div`;
    }
    
    this.playControlSound();
  }

  toggleChannel(channelName) {
    const channel = document.querySelector(`[data-channel="${channelName.toLowerCase()}"]`);
    if (channel) {
      channel.style.opacity = channel.style.opacity === '0.3' ? '1' : '0.3';
      this.playChannelToggleSound();
    }
  }

  // ================================================
  // AUDIO FEEDBACK
  // ================================================
  playSignalSound(frequency = 800) {
    this.playTone(frequency, 100, 'sawtooth');
  }

  playSelectionSound() {
    this.playTone(1000, 150, 'square');
  }

  playTriggerSound() {
    this.playTone(1500, 200, 'triangle');
  }

  playScanSound() {
    this.playTone(400, 50, 'sine');
  }

  playControlSound() {
    this.playTone(1200, 120, 'square');
  }

  playChannelToggleSound() {
    this.playTone(600, 100, 'triangle');
  }

  playAchievementSound() {
    // Play a sequence of tones for achievement
    const frequencies = [800, 1000, 1200];
    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        this.playTone(freq, 100, 'sine');
      }, index * 100);
    });
  }

  playTone(frequency, duration, type = 'square') {
    if (typeof AudioContext === 'undefined' && typeof webkitAudioContext === 'undefined') {
      return;
    }

    const audioContext = new (AudioContext || webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration / 1000);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
  }
}

// ================================================
// ADDITIONAL EFFECTS
// ================================================

// Add scale pulse animation to CSS
function addScalePulseAnimation() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes scale-pulse {
      0%, 100% { 
        transform: scaleX(1); 
        box-shadow: 0 0 10px rgba(100, 255, 218, 0.5); 
      }
      50% { 
        transform: scaleX(1.2); 
        box-shadow: 0 0 20px rgba(100, 255, 218, 0.8); 
      }
    }
  `;
  document.head.appendChild(style);
}

// Initialize experience controller
const experienceController = new ExperienceController();

// Add additional animations after page load
document.addEventListener('DOMContentLoaded', () => {
  addScalePulseAnimation();
  
  // Start achievement counter animation
  setTimeout(() => {
    const counter = document.querySelector('.counter-value');
    if (counter) {
      let count = 0;
      const target = 8;
      const timer = setInterval(() => {
        count++;
        counter.textContent = count;
        if (count >= target) {
          clearInterval(timer);
          counter.style.textShadow = '0 0 15px var(--circuit-gold)';
        }
      }, 200);
    }
  }, 2000);
});
