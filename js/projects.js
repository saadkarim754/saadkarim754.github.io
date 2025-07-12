// ================================================
// PROJECTS PAGE - PCB BOARD CONTROLLER
// ================================================

class ProjectsController {
  constructor() {
    this.isInitialized = false;
    this.currentFilter = 'all';
    this.selectedProject = null;
    this.projectData = {};
    this.init();
  }

  init() {
    if (this.isInitialized) return;
    
    document.addEventListener('DOMContentLoaded', () => {
      this.loadProjectData();
      this.setupFilters();
      this.setupProjectInteractions();
      this.startBoardAnimations();
      this.initializeComponents();
    });
    
    this.isInitialized = true;
    console.log('🔌 Projects Board Controller Initialized');
  }

  // ================================================
  // PROJECT DATA
  // ================================================
  loadProjectData() {
    this.projectData = {
      'qr-attendance': {
        name: 'QR-Based Attendance System',
        description: 'A streamlined and secure web-based attendance tracking system utilizing QR codes for efficient session management. Features real-time data processing and user authentication.',
        technologies: ['Python', 'Flask', 'QR Codes', 'Web Development', 'SQLite'],
        category: 'web',
        status: 'active',
        github: 'https://github.com/saadkarim754/QR-ATTENDANCE-SYSTEM',
        live: 'https://saadkarim754.pythonanywhere.com',
        complexity: 'high'
      },
      'pieas-sportics': {
        name: 'PIEAS Sportics Web Application',
        description: 'Comprehensive web application for the PIEAS SPORTICS SOCIETY providing event management, user authentication, and admin controls with responsive design.',
        technologies: ['Flask', 'SQL', 'Bootstrap', 'CSS', 'HTML', 'JavaScript'],
        category: 'web',
        status: 'active',
        github: 'https://github.com/saadkarim754/PSS-New',
        complexity: 'high'
      },
      '6dof-robot': {
        name: '6 DOF Robotic Arm Design',
        description: 'Complete design, modeling, and simulation of a six-degree-of-freedom robotic arm for automated welding applications with kinematic analysis.',
        technologies: ['MATLAB', 'SOLIDWORKS', 'Onshape', 'CoppeliaSim', 'URDF'],
        category: 'robotics',
        status: 'completed',
        github: 'https://github.com/saadkarim754/Onshape_To_robot',
        complexity: 'high'
      },
      'news-classification': {
        name: 'Fake News Classification',
        description: 'Machine learning model using Gradient Boosting to classify news articles as fake or true. Implemented in both Python and MATLAB with comprehensive preprocessing.',
        technologies: ['Python', 'Machine Learning', 'MATLAB', 'NLP', 'Gradient Boosting'],
        category: 'ml',
        status: 'completed',
        github: 'https://github.com/saadkarim754/Fake_News_classification',
        complexity: 'medium'
      },
      'biometric-access': {
        name: 'Smart Biometric Access System',
        description: 'IoT-enabled access control system using AS608 fingerprint sensor and ESP32 microcontrollers with real-time logging on Adafruit IO.',
        technologies: ['ESP32', 'IoT', 'Adafruit IO', 'C++', 'Biometric Sensors'],
        category: 'embedded',
        status: 'completed',
        github: 'https://github.com/saadkarim754/Smart-Biometric-Access-System-with-IoT-Integration',
        complexity: 'medium'
      },
      'fpga-servo': {
        name: 'FPGA Servo Control System',
        description: 'Real-time servo control system using Verilog on Spartan-3E FPGA with Python GUI for UART communication and smooth PWM control.',
        technologies: ['Verilog', 'FPGA', 'Python', 'UART', 'PWM', 'Tkinter'],
        category: 'fpga',
        status: 'completed',
        github: 'https://github.com/saadkarim754/FPGA_servo_control',
        complexity: 'medium'
      }
    };
  }

  // ================================================
  // FILTER SYSTEM
  // ================================================
  setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter category
        const category = button.dataset.category;
        this.currentFilter = category;
        
        // Apply filter
        this.applyFilter(category);
        
        // Play filter sound
        this.playFilterSound();
        
        // Update counter
        this.updateProjectCounter();
      });
    });
  }

  applyFilter(category) {
    const allProjects = document.querySelectorAll('.project-ic, .project-smd');
    
    allProjects.forEach(project => {
      const projectCategory = project.dataset.category;
      
      if (category === 'all' || projectCategory === category) {
        project.style.display = '';
        project.style.opacity = '0';
        project.style.transform = 'scale(0.8)';
        
        // Animate in
        setTimeout(() => {
          project.style.transition = 'all 0.5s ease-out';
          project.style.opacity = '1';
          project.style.transform = 'scale(1)';
        }, Math.random() * 300);
      } else {
        project.style.transition = 'all 0.3s ease-out';
        project.style.opacity = '0';
        project.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
          project.style.display = 'none';
        }, 300);
      }
    });
  }

  updateProjectCounter() {
    const visibleProjects = document.querySelectorAll(
      this.currentFilter === 'all' 
        ? '.project-ic, .project-smd'
        : `.project-ic[data-category="${this.currentFilter}"], .project-smd[data-category="${this.currentFilter}"]`
    );
    
    const counter = document.querySelector('.counter-value');
    if (counter) {
      let count = 0;
      const target = visibleProjects.length;
      
      const timer = setInterval(() => {
        count++;
        counter.textContent = count;
        if (count >= target) {
          clearInterval(timer);
          counter.style.textShadow = '0 0 15px var(--circuit-gold)';
          setTimeout(() => {
            counter.style.textShadow = '0 0 10px var(--circuit-gold)';
          }, 500);
        }
      }, 50);
    }
  }

  // ================================================
  // PROJECT INTERACTIONS
  // ================================================
  setupProjectInteractions() {
    const projectICs = document.querySelectorAll('.project-ic');
    const projectSMDs = document.querySelectorAll('.project-smd');
    
    // Large/Medium IC interactions
    projectICs.forEach(ic => {
      ic.addEventListener('click', () => {
        this.selectProject(ic);
      });
      
      ic.addEventListener('mouseenter', () => {
        this.playHoverSound();
        this.highlightConnections(ic);
      });
      
      ic.addEventListener('mouseleave', () => {
        this.clearConnections();
      });
    });
    
    // SMD component interactions
    projectSMDs.forEach(smd => {
      smd.addEventListener('click', () => {
        this.selectSMDProject(smd);
      });
      
      smd.addEventListener('mouseenter', () => {
        this.playHoverSound(1200);
      });
    });
    
    // Animate ICs appearing
    this.animateProjectsAppearing();
  }

  selectProject(ic) {
    // Remove previous selection
    document.querySelectorAll('.project-ic').forEach(project => {
      project.classList.remove('active');
    });
    
    // Select current project
    ic.classList.add('active');
    this.selectedProject = ic.dataset.project;
    
    // Update terminal
    this.updateTerminal(this.selectedProject);
    
    // Play selection sound
    this.playSelectionSound();
    
    // Flash status LED
    this.flashStatusLED(ic);
  }

  selectSMDProject(smd) {
    // Simple flash effect for SMD
    smd.style.boxShadow = '0 0 20px var(--circuit-gold)';
    setTimeout(() => {
      smd.style.boxShadow = '';
    }, 300);
    
    this.playSelectionSound(1400);
  }

  updateTerminal(projectKey) {
    const project = this.projectData[projectKey];
    if (!project) return;
    
    const terminalContent = document.querySelector('.project-output');
    if (!terminalContent) return;
    
    // Update project information in clean format
    const projectInfo = `
      <div class="project-header">PROJECT INFORMATION</div>
      <div class="project-line">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
      <div class="project-info">
        <div class="info-item">
          <span class="info-label">NAME:</span>
          <span class="info-value">${project.name}</span>
        </div>
        <div class="info-item">
          <span class="info-label">STATUS:</span>
          <span class="info-value status-${project.status}">${project.status.toUpperCase()}</span>
        </div>
        <div class="info-item">
          <span class="info-label">TECH:</span>
          <span class="info-value">${project.technologies.join(', ')}</span>
        </div>
        <div class="info-item">
          <span class="info-label">DESC:</span>
          <span class="info-value">${project.description}</span>
        </div>
        ${project.github ? `
        <div class="info-item">
          <span class="info-label">REPO:</span>
          <span class="info-value"><a href="${project.github}" target="_blank" style="color: var(--accent-teal);">${project.github}</a></span>
        </div>` : ''}
        ${project.live ? `
        <div class="info-item">
          <span class="info-label">DEMO:</span>
          <span class="info-value"><a href="${project.live}" target="_blank" style="color: var(--accent-green);">${project.live}</a></span>
        </div>` : ''}
      </div>
    `;
    
    // Animate display
    this.animateTerminalUpdate(terminalContent, projectInfo);
  }

  animateTerminalUpdate(container, content) {
    container.style.opacity = '0.5';
    container.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
      container.innerHTML = content;
      container.style.transition = 'all 0.3s ease';
      container.style.opacity = '1';
      container.style.transform = 'translateY(0)';
    }, 150);
  }

  // ================================================
  // VISUAL EFFECTS
  // ================================================
  highlightConnections(ic) {
    const traces = document.querySelectorAll('.trace');
    traces.forEach(trace => {
      trace.style.strokeWidth = '3';
      trace.style.opacity = '0.8';
    });
    
    const nodes = document.querySelectorAll('.trace-node');
    nodes.forEach(node => {
      node.style.transform = 'scale(1.5)';
    });
  }

  clearConnections() {
    const traces = document.querySelectorAll('.trace');
    traces.forEach(trace => {
      trace.style.strokeWidth = '2';
      trace.style.opacity = '0.6';
    });
    
    const nodes = document.querySelectorAll('.trace-node');
    nodes.forEach(node => {
      node.style.transform = 'scale(1)';
    });
  }

  flashStatusLED(ic) {
    const led = ic.querySelector('.status-led');
    if (led) {
      led.style.background = '#ff6b35';
      led.style.boxShadow = '0 0 15px #ff6b35';
      
      setTimeout(() => {
        led.style.background = '#00ff88';
        led.style.boxShadow = '0 0 10px #00ff88';
      }, 200);
    }
  }

  // ================================================
  // ANIMATIONS
  // ================================================
  animateProjectsAppearing() {
    const projects = document.querySelectorAll('.project-ic, .project-smd');
    
    projects.forEach((project, index) => {
      project.style.opacity = '0';
      project.style.transform = 'translateY(20px) scale(0.8)';
      
      setTimeout(() => {
        project.style.transition = 'all 0.6s ease-out';
        project.style.opacity = '1';
        project.style.transform = 'translateY(0) scale(1)';
        
        // Play activation sound
        this.playActivationSound(800 + (index * 50));
      }, index * 150);
    });
  }

  startBoardAnimations() {
    // Animate PCB traces
    this.animatePCBTraces();
    
    // Start status LED animations
    this.startStatusLEDAnimations();
    
    // Animate connection traces
    this.animateConnectionTraces();
  }

  animatePCBTraces() {
    const boardTraces = document.querySelector('.board-traces');
    if (boardTraces) {
      let opacity = 0.1;
      let direction = 1;
      
      setInterval(() => {
        opacity += direction * 0.02;
        if (opacity >= 0.3 || opacity <= 0.1) {
          direction *= -1;
        }
        boardTraces.style.opacity = opacity;
      }, 200);
    }
  }

  startStatusLEDAnimations() {
    const statusLEDs = document.querySelectorAll('.status-led.active');
    
    statusLEDs.forEach((led, index) => {
      setTimeout(() => {
        led.style.animation = 'status-blink 2s ease-in-out infinite';
      }, index * 300);
    });
  }

  animateConnectionTraces() {
    const traces = document.querySelectorAll('.trace');
    
    traces.forEach((trace, index) => {
      setTimeout(() => {
        trace.style.animation = 'trace-flow 3s linear infinite';
      }, index * 500);
    });
  }

  initializeComponents() {
    // Initialize all pins
    const pins = document.querySelectorAll('.pin');
    pins.forEach((pin, index) => {
      setTimeout(() => {
        pin.classList.add('active');
        this.playPinActivationSound();
      }, index * 100);
    });
    
    // Initialize filter LEDs
    const filterLED = document.querySelector('.filter-btn.active .filter-led');
    if (filterLED) {
      filterLED.style.background = 'var(--accent-green)';
      filterLED.style.boxShadow = '0 0 10px var(--accent-green)';
    }
  }

  // ================================================
  // AUDIO FEEDBACK
  // ================================================
  playFilterSound() {
    this.playTone(1000, 150, 'square');
  }

  playHoverSound(frequency = 800) {
    this.playTone(frequency, 80, 'sine');
  }

  playSelectionSound(frequency = 1200) {
    this.playTone(frequency, 200, 'triangle');
  }

  playActivationSound(frequency) {
    this.playTone(frequency, 100, 'sawtooth');
  }

  playPinActivationSound() {
    this.playTone(600, 50, 'square');
  }

  playTypingSound() {
    this.playTone(400 + Math.random() * 200, 30, 'square');
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

    gainNode.gain.setValueAtTime(0.03, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration / 1000);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
  }
}

// Initialize projects controller
const projectsController = new ProjectsController();

// Add window resize handler for responsive traces
window.addEventListener('resize', () => {
  // Recreate connection traces on resize
  const traces = document.querySelector('.connection-traces');
  if (traces) {
    // Re-adjust trace paths for new screen size
    setTimeout(() => {
      projectsController.animateConnectionTraces();
    }, 100);
  }
});
