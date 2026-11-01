/**
 * Kishan P S - Modern Glassmorphism Developer Portfolio
 * Interactive JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Theme Toggle System (Dark / Light) ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('kishan-theme');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  if (storedTheme === 'light' || (!storedTheme && systemPrefersLight)) {
    document.body.classList.add('light-theme');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
      localStorage.setItem('kishan-theme', currentTheme);
      showToast(`Switched to ${currentTheme === 'light' ? 'Light' : 'Dark'} mode`);
    });
  }

  // --- 2. Mobile Hamburger Navigation ---
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburgerBtn.classList.toggle('active');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu on click outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- 3. Sticky Header & Active Link Observer ---
  const siteHeader = document.querySelector('.site-header');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  });

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => sectionObserver.observe(sec));

  // --- 4. Rotating Typing Text Animation ---
  const typingTarget = document.getElementById('typing-text');
  const words = [
    'Full-Stack Developer',
    'Computer Science Engineer',
    'AI & Machine Learning Explorer',
    'Python & Web Specialist',
    'Curious & Practical Builder'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    if (!typingTarget) return;

    const currentWord = words[wordIndex];
    if (isDeleting) {
      typingTarget.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingTarget.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typingSpeed = 1800; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 400; // Pause before typing next word
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  // --- 5. Interactive Code Terminal Card ---
  const tabProfile = document.getElementById('tab-profile');
  const tabSkills = document.getElementById('tab-skills');
  const terminalCode = document.getElementById('terminal-code');
  const copyCodeBtn = document.getElementById('copy-code-btn');

  const snippetProfile = `<span class="code-keyword">const</span> developer = {
  <span class="code-prop">name</span>: <span class="code-str">'Kishan P S'</span>,
  <span class="code-prop">role</span>: <span class="code-str">'Full-Stack Developer'</span>,
  <span class="code-prop">education</span>: <span class="code-str">'Navkis College of Engg, Hassan'</span>,
  <span class="code-prop">cgpa</span>: <span class="code-num">8.9</span>,
  <span class="code-prop">coreFocus</span>: [
    <span class="code-str">'Full-Stack Web Dev'</span>,
    <span class="code-str">'Python & Backend APIs'</span>,
    <span class="code-str">'AI & Machine Learning'</span>
  ],
  <span class="code-prop">available</span>: <span class="code-keyword">true</span>
};
<span class="code-comment">// Ready to turn ambitious ideas into reliable code</span>`;

  const snippetSkills = `<span class="code-keyword">class</span> <span class="code-prop">KishanSkills</span>:
    <span class="code-keyword">def</span> <span class="code-prop">__init__</span>(self):
        self.languages = [<span class="code-str">"Python"</span>, <span class="code-str">"Java"</span>, <span class="code-str">"C/C++"</span>, <span class="code-str">"JavaScript"</span>]
        self.web = [<span class="code-str">"HTML5"</span>, <span class="code-str">"CSS3"</span>, <span class="code-str">"React"</span>, <span class="code-str">"Node.js"</span>]
        self.databases = [<span class="code-str">"MySQL"</span>, <span class="code-str">"MongoDB"</span>, <span class="code-str">"DBMS"</span>]
        self.emerging = [<span class="code-str">"AI / Machine Learning"</span>, <span class="code-str">"ESP32 IoT"</span>]

    <span class="code-keyword">def</span> <span class="code-prop">get_mindset</span>(self):
        <span class="code-keyword">return</span> <span class="code-str">"Learn · Build · Optimize · Iterate"</span>`;

  if (tabProfile && tabSkills && terminalCode) {
    tabProfile.addEventListener('click', () => {
      tabProfile.classList.add('active');
      tabSkills.classList.remove('active');
      terminalCode.innerHTML = snippetProfile;
    });

    tabSkills.addEventListener('click', () => {
      tabSkills.classList.add('active');
      tabProfile.classList.remove('active');
      terminalCode.innerHTML = snippetSkills;
    });
  }

  if (copyCodeBtn && terminalCode) {
    copyCodeBtn.addEventListener('click', () => {
      const plainText = terminalCode.innerText;
      navigator.clipboard.writeText(plainText).then(() => {
        showToast('Code snippet copied to clipboard!');
      }).catch(() => {
        showToast('Failed to copy code');
      });
    });
  }

  // --- 6. Skills Categorized Filtering ---
  const skillFilterBtns = document.querySelectorAll('.skills-filter-nav .filter-btn');
  const skillCards = document.querySelectorAll('.skills-grid .skill-category-card');

  skillFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 7. Featured Projects Categorized Filtering ---
  const projectFilterBtns = document.querySelectorAll('.projects-filter-bar .project-filter-btn');
  const projectCards = document.querySelectorAll('.projects-grid .project-card');

  projectFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 8. Comprehensive Project Blueprint Modal Dialog ---
  const projectData = {
    aah: {
      tag: 'EdTech · Academic ERP · Full-Stack',
      title: 'Academic Admin Hub (AAH)',
      overview: 'Academic Admin Hub is a full-stack educational management platform engineered to unify and streamline institutional operations. It bridges communication, academic tracking, and administration between faculty, students, and departmental administrators.',
      features: [
        'Role-Based Access Control (RBAC): Dedicated portals for Department Admins, Teaching Faculty, and Students.',
        'Academic Tracking: Real-time student attendance management, marks recording, and automated grade calculations.',
        'Course & Department Workflow: Course syllabus allocation, timetable scheduling, and digital circular notifications.',
        'Secure Database Layer: Relational data integrity using MySQL/MongoDB with parameterized queries and encrypted authentication.'
      ],
      tech: ['Python', 'Node.js', 'MySQL', 'MongoDB', 'JavaScript (ES6+)', 'HTML5', 'CSS3 / Glassmorphism'],
      github: 'https://github.com/Kishangowda-06/Academic-Admin-Hub-FullStack',
      demo: 'https://github.com/Kishangowda-06'
    },
    medshield: {
      tag: 'Healthcare · Security · AI Telemetry',
      title: 'MedShield - Intelligent Healthcare Platform',
      overview: 'MedShield is an AI-powered healthcare ecosystem designed for high-security medical record management, emergency response authorization, and doctor-patient teleconsultation.',
      features: [
        'Encrypted Electronic Health Records (EHR): Zero-knowledge cryptographic storage ensuring patient health data remains private.',
        'Emergency Medical Pass: Instant, consent-verified medical data retrieval for paramedic first responders via QR or NFC token.',
        'Automated Appointment Engine: Doctor scheduling workflow with real-time slot conflict prevention and email/SMS alerts.',
        'AI Diagnosis Assist: Predictive symptom classifier aiding clinicians in rapid triage and diagnostic risk scoring.'
      ],
      tech: ['Python', 'Flask / FastAPI', 'REST APIs', 'Cryptography (AES-256)', 'Machine Learning', 'TailwindCSS'],
      github: 'https://github.com/Kishangowda-06',
      demo: 'https://github.com/Kishangowda-06'
    },
    neuraguard: {
      tag: 'Cybersecurity · Behavioral Biometrics · AI',
      title: 'NeuraGuard - Behavioral Threat Biometrics',
      overview: 'NeuraGuard investigates continuous, transparent behavioral authentication using keystroke dynamics, mouse trajectory patterns, and telemetry anomaly detection to prevent credential stuffing and automated bot attacks.',
      features: [
        'Keystroke Dynamics Classifier: Measures key flight time, dwell time, and cadence to build a unique user biometric profile.',
        'Passive Session Monitoring: Analyzes interaction telemetry in real-time without disrupting the user experience.',
        'Risk-Aware Adaptive Auth: Automatically triggers multi-factor authentication (MFA) only when behavioral confidence drops below threshold.',
        'Anti-Bot Defense: Differentiates synthetic headless browser automation from authentic human motor dynamics.'
      ],
      tech: ['React', 'FastAPI', 'Python', 'Scikit-Learn', 'WebSockets', 'NumPy / Pandas'],
      github: 'https://github.com/Kishangowda-06',
      demo: 'https://github.com/Kishangowda-06'
    },
    smartclass: {
      tag: 'IoT · Smart Campus · Energy Automation',
      title: 'SmartClass Automation & Campus Intelligence',
      overview: 'An Internet-of-Things (IoT) hardware-software solution engineered to monitor classroom occupancy and automate lighting and ventilation, significantly cutting educational institution electricity consumption.',
      features: [
        'Dual-Core ESP32 Microcontroller: Custom firmware written in C/C++ managing sensor polling and WiFi telemetry.',
        'Multi-Sensor Grid: Passive Infrared (PIR) occupancy motion sensing, LDR ambient illumination, and DHT11 temperature monitoring.',
        'Automated Power Relays: Intelligently engages lights and fans only when occupancy and ambient thresholds dictate.',
        'Live Web Dashboard: Real-time telemetry feed displaying classroom status, energy conserved, and historical efficiency analytics.'
      ],
      tech: ['ESP32', 'C/C++', 'PIR & LDR Sensors', 'MQTT / HTTP APIs', 'Web Dashboard', 'Embedded Systems'],
      github: 'https://github.com/Kishangowda-06',
      demo: 'https://github.com/Kishangowda-06'
    },
    krishimitra: {
      tag: 'AI Vision · AgriTech · Mobile Assistant',
      title: 'KrishiMitra AI - Farmer Agro-Tech Platform',
      overview: 'KrishiMitra AI is an intelligent digital advisory platform designed to assist farmers with computer vision crop disease identification, localized soil telemetry analysis, and agricultural market intelligence.',
      features: [
        'Mobile Crop Vision Diagnosis: Deep learning convolutional model identifying fungal, bacterial, and viral leaf diseases with 95%+ accuracy.',
        'Organic & Chemical Remediation: Instant localized treatment advice including precise dosage recommendations.',
        'Soil Telemetry & Weather Advisory: Actionable irrigation and fertilizer recommendations based on real-time soil metrics.',
        'Bilingual & Accessible: Built with clean mobile responsiveness and voice-guided assistance for multilingual accessibility.'
      ],
      tech: ['Python', 'TensorFlow / PyTorch', 'FastAPI', 'React', 'Computer Vision', 'Mobile-First UI'],
      github: 'https://github.com/Kishangowda-06',
      demo: 'https://github.com/Kishangowda-06'
    }
  };

  const modalBackdrop = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTag = document.getElementById('modal-tag');
  const modalTitle = document.getElementById('modal-title');
  const modalOverview = document.getElementById('modal-overview');
  const modalFeatures = document.getElementById('modal-features');
  const modalTechPills = document.getElementById('modal-tech-pills');
  const modalGithubLink = document.getElementById('modal-github-link');
  const modalDemoLink = document.getElementById('modal-demo-link');

  function openProjectModal(projectId) {
    const data = projectData[projectId];
    if (!data || !modalBackdrop) return;

    modalTag.textContent = data.tag;
    modalTitle.textContent = data.title;
    modalOverview.textContent = data.overview;

    modalFeatures.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');
    modalTechPills.innerHTML = data.tech.map(t => `<span class="project-tag">${t}</span>`).join('');

    modalGithubLink.href = data.github;
    modalDemoLink.href = data.demo;

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project');
      openProjectModal(projId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeProjectModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
        closeProjectModal();
      }
    });
  }

  // --- 9. Email Copy to Clipboard & Toast System ---
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const userEmail = 'pskishan9@gmail.com';

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(userEmail).then(() => {
        showToast('Email pskishan9@gmail.com copied to clipboard!');
      }).catch(() => {
        showToast('Could not copy email');
      });
    });
  }

  function showToast(message) {
    let toast = document.getElementById('global-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'global-toast';
      toast.className = 'toast';
      toast.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg> <span id="toast-text"></span>`;
      
      let container = document.querySelector('.toast-container');
      if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
      }
      container.appendChild(toast);
    }

    const toastText = toast.querySelector('#toast-text');
    if (toastText) toastText.textContent = message;

    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  window.showToast = showToast;

  // --- 10. Contact Form Validation & Submission ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');
      const submitBtn = document.getElementById('submit-btn');

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const subject = subjectInput.value.trim() || 'Portfolio Collaboration Inquiry';
      const message = messageInput.value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.');
        return;
      }

      // Simulate sending feedback and construct direct mailto link
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending...</span>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>Message Prepared!</span> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>`;
        showToast(`Thank you, ${name}! Opening email client to send.`);

        // Launch mailto link with encoded content
        const mailtoLink = `mailto:pskishan9@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Kishan,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        window.location.href = mailtoLink;

        contactForm.reset();
      }, 1000);
    });
  }

  // --- 11. Animated Stats Counter on Viewport Scroll ---
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let statsAnimated = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        statNumbers.forEach(stat => {
          const target = parseFloat(stat.getAttribute('data-target'));
          const isDecimal = target % 1 !== 0;
          let current = 0;
          const increment = isDecimal ? target / 40 : Math.ceil(target / 40);
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              stat.innerHTML = isDecimal ? target.toFixed(1) : target + '<span>+</span>';
              clearInterval(timer);
            } else {
              stat.innerHTML = isDecimal ? current.toFixed(1) : Math.floor(current) + '<span>+</span>';
            }
          }, 35);
        });
      }
    });
  }, { threshold: 0.4 });

  const statsSection = document.querySelector('.stats-grid');
  if (statsSection) statsObserver.observe(statsSection);

  // --- 12. Dynamic Year in Footer ---
  const yearSpan = document.getElementById('copyright-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
