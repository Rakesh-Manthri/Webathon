document.addEventListener('DOMContentLoaded', () => {
  // Problems Data
  const problems = [
    {
      id: "SP-01",
      title: "Night Sky Object Planner",
      category: "Space",
      desc: "A tool where stargazers enter their location and date. Lists visible planets, constellations, and objects with rise/set times and visibility ratings.",
      features: [
        "Input: Location (city/manual) + Date",
        "Display: Visible planets, constellations, and stars",
        "Rise/Set times and Visibility rating (Low/Medium/High)",
        "Optional: Simple sky map visualization"
      ],
      tech: {
        frontend: "React / Vanilla JS",
        apis: ["OpenWeather (sky conditions)", "Astronomy APIs"],
        visualization: "Chart.js / HTML5 Canvas"
      }
    },
    {
      id: "SP-02",
      title: "Space Mission Timeline",
      category: "Space",
      desc: "Interactive, scrollable timeline of past and upcoming space missions from agencies like ISRO, NASA, and SpaceX.",
      features: [
        "Scrollable timeline UI",
        "Filters: Agency (ISRO, NASA, SpaceX), Mission type, and Year",
        "Mission details popup or expansion card"
      ],
      tech: {
        frontend: "React + Tailwind / Bootstrap",
        source: "Static JSON / Spaceflight News API",
        ui: "Timeline libraries (optional)"
      }
    },
    {
      id: "SP-03",
      title: "Meteor Shower Alert",
      category: "Space",
      desc: "Dashboard showing upcoming meteor showers with a 'Visibility Rating' based on local moon phase and predicted cloud cover.",
      features: [
        "List of upcoming meteor showers",
        "Visibility rating based on Moon phase logic and Weather/cloud cover",
        "Highlighting 'Best Viewing Dates'"
      ],
      tech: {
        apis: "OpenWeatherMap API",
        logic: "Rule-based scoring system",
        ui: "Card-based dashboard with status indicators"
      }
    },
    {
      id: "SP-04",
      title: "Multi-World Clock",
      category: "Space",
      desc: "A time-syncing tool displaying current time on Earth, Mars (Sols), and the Moon simultaneously.",
      features: [
        "Real-time clocks: Earth (Local), Mars (Sol-based), Moon (Simplified cycle)",
        "Visual display of differences in day duration",
        "Optional: Animated or themed clock UI"
      ],
      tech: {
        logic: "Pure JavaScript calculations",
        libraries: "Day.js / Moment.js"
      }
    },
    {
      id: "SD-01",
      title: "Carbon Footprint Calculator",
      category: "Sustainability",
      desc: "Calculate monthly carbon footprint, benchmark against average, and suggest reduction tips.",
      features: [
        "Inputs: Travel, diet, electricity usage, shopping habits",
        "Outputs: Monthly carbon footprint, comparison with averages",
        "Personalized reduction suggestions"
      ],
      tech: {
        logic: "Static dataset for carbon coefficients",
        visualization: "Chart.js"
      }
    },
    {
      id: "SD-02",
      title: "Household Water Tracker",
      category: "Sustainability",
      desc: "Log daily water usage by activity. Compares against limits, shows trends, and suggests water-saving actions.",
      features: [
        "Input usage by category (shower, cooking, etc.)",
        "Monthly trends visualization",
        "Alerts when exceeding set daily/weekly limits"
      ],
      tech: {
        storage: "Local Storage for persistence",
        visualization: "Chart.js / Recharts"
      }
    },
    {
      id: "SD-03",
      title: "Renewable Energy Estimator",
      category: "Sustainability",
      desc: "Input roof size and sunny hours to calculate potential solar generation and the investment Payback Period.",
      features: [
        "Inputs: Roof size (sq ft), sunlight hours",
        "Outputs: Energy generated (kWh), cost savings, and payback period"
      ],
      tech: {
        logic: "Static solar efficiency formulas",
        apis: "Optional Solar estimation APIs (e.g., NREL PVWatts)"
      }
    },
    {
      id: "SD-04",
      title: "Local Eco-Event Organizer",
      category: "Sustainability",
      desc: "Platform to create and join Clean-up Drives or Planting Events featuring a participant Impact Leaderboard.",
      features: [
        "CRUD: Create/Join/List events",
        "Leaderboard based on user participation hours"
      ],
      tech: {
        backend: "Firebase (optional) or Mock JSON Server",
        frontend: "State-based React / Vanilla JS"
      }
    },
    {
      id: "ED-01",
      title: "Live Polling & Analytics",
      category: "Education",
      desc: "Instructor creates polls for live sessions. Dashboard shows live response distribution and exports reports.",
      features: [
        "Teacher: Create polls; Student: Join via code",
        "Live results visualization (Bar/Pie charts)",
        "Word cloud generation for open-ended text responses"
      ],
      tech: {
        realtime: "Firebase Realtime Database / Socket.io",
        visualization: "Chart.js + Word Cloud libraries"
      }
    },
    {
      id: "ED-02",
      title: "AI-Enhanced Quiz Builder",
      category: "Education",
      desc: "Paste text to programmatically extract keywords and automatically generate multiple-choice quizzes.",
      features: [
        "Input text paragraph",
        "Automated keyword extraction and MCQ generation",
        "Score tracking and results page"
      ],
      tech: {
        ai_integration: "Gemini / OpenAI (Optional)",
        alternative: "Rule-based parsing or JS NLP libraries"
      }
    },
    {
      id: "ED-03",
      title: "Focus Session Manager",
      category: "Education",
      desc: "Pomodoro-style timer tracking distractions (clicks away) and displaying productivity analytics.",
      features: [
        "Customizable timer cycles (Work/Break)",
        "Distraction tracking (logs clicks away)",
        "Productivity analytics dashboard"
      ],
      tech: {
        logic: "JS Timers + Page Visibility API",
        storage: "Local Storage",
        visualization: "Chart.js for analytics"
      }
    },
    {
      id: "ED-04",
      title: "Group Study Room",
      category: "Education",
      desc: "Users join a room with a shared task list, progress board, and simulated 'who is studying what' tracker.",
      features: [
        "Join room interface (mock or realtime)",
        "Shared task board with progress tracking",
        "Visual indicator of 'who is studying what'"
      ],
      tech: {
        realtime: "Firebase (optional)",
        ui: "Simple state-based React/Vue/Vanilla UI"
      }
    },
    {
      id: "MS-01",
      title: "Medicine Tracker",
      category: "Miscellaneous",
      desc: "Track medicines and health symptoms to maintain an interactive health log over time.",
      features: [
        "Add medicines with specific schedules",
        "Daily symptom logging and adherence tracking visuals"
      ],
      tech: {
        storage: "Local Storage",
        ui: "Calendar or List-based UI"
      }
    },
    {
      id: "MS-02",
      title: "Smart Yield Predictor",
      category: "Miscellaneous",
      desc: "Estimate crop yield and expected income while analyzing risk factors and sustainability aspects.",
      features: [
        "Inputs: Land size, crop type, season",
        "Outputs: Estimated yield, revenue, and risk score with suggestions"
      ],
      tech: {
        logic: "Rule-based calculation engine",
        visualization: "Chart.js for output data"
      }
    },
    {
      id: "MS-03",
      title: "JWT Interactive Debugger",
      category: "Miscellaneous",
      desc: "Decode JWT payloads, verify signatures, and highlight security flaws like the 'alg: none' vulnerability.",
      features: [
        "Real-time decoding of Header & Payload",
        "Signature verification (mock/real secret checking)",
        "Highlighting security vulnerabilities (e.g., 'alg: none')"
      ],
      tech: {
        libraries: "jwt-decode, CryptoJS",
        frontend: "Split-pane UI (Encoded vs Decoded)"
      }
    },
    {
      id: "MS-04",
      title: "Subscription Tracker",
      category: "Miscellaneous",
      desc: "Manage services, input start dates, calculate 'Next Billing Date', and sort by 'Soonest Renewal'.",
      features: [
        "Add services with start date and trial period",
        "Track trial expiry and sort by upcoming payment dates"
      ],
      tech: {
        date_handling: "Day.js / Moment.js",
        storage: "Local Storage"
      }
    }
  ];

  const problemContainer = document.getElementById('problem-cards-container');
  const modal = document.getElementById('problem-modal');
  const modalContent = document.getElementById('modal-content');
  const modalBody = document.getElementById('modal-body');
  const closeModal = document.getElementById('close-modal');
  
  function renderProblems(filter = 'All') {
    if (!problemContainer) return;
    
    let cardsHTML = '';
    const filtered = filter === 'All' ? problems : problems.filter(p => p.category === filter);
    
    filtered.forEach(p => {
      cardsHTML += `
        <div class="shad-card p-6 flex flex-col problem-card opacity-0 translate-y-8 transition-all hover:-translate-y-1 hover:border-primary/50 group">
          <div class="flex justify-between items-start mb-4">
            <span class="shad-badge shad-badge-secondary">${p.category}</span>
            <span class="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">${p.id}</span>
          </div>
          <h3 class="text-xl font-bold mb-2 group-hover:text-primary transition-colors">${p.title}</h3>
          <p class="text-muted-foreground text-sm flex-1 mb-6 line-clamp-2">${p.desc}</p>
          <button class="more-info-btn shad-btn shad-btn-outline w-full py-2.5 rounded-lg text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center gap-2" data-id="${p.id}">
            Learn More <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </button>
        </div>
      `;
    });
    
    problemContainer.innerHTML = cardsHTML;
    lucide.createIcons();

    // Trigger local GSAP animation for new cards
    gsap.fromTo(".problem-card", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "back.out(1.2)" }
    );

    // Add click events for more info
    document.querySelectorAll('.more-info-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const problem = problems.find(p => p.id === id);
        openProblemModal(problem);
      });
    });
  }

  function openProblemModal(p) {
    if (!modal || !modalBody) return;

    let techHTML = '';
    for (const [key, value] of Object.entries(p.tech)) {
      const displayKey = key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ');
      const displayValue = Array.isArray(value) ? value.join(', ') : value;
      techHTML += `
        <div class="flex flex-col gap-1">
          <span class="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">${displayKey}</span>
          <span class="text-sm font-medium">${displayValue}</span>
        </div>
      `;
    }

    modalBody.innerHTML = `
      <div class="space-y-2">
        <div class="flex items-center gap-2">
          <span class="shad-badge shad-badge-secondary">${p.category}</span>
          <span class="text-xs font-mono text-muted-foreground">${p.id}</span>
        </div>
        <h2 class="text-3xl font-extrabold tracking-tight">${p.title}</h2>
      </div>
      
      <div class="space-y-4">
        <p class="text-muted-foreground leading-relaxed">${p.desc}</p>
        
        <div class="bg-muted/50 rounded-xl p-5 border border-border/50">
          <h4 class="text-sm font-bold mb-3 flex items-center gap-2">
            <i data-lucide="check-circle" class="w-4 h-4 text-primary"></i> Expected Features
          </h4>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
            ${p.features.map(f => `
              <li class="flex items-start gap-2 text-sm text-foreground/80">
                <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                ${f}
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="bg-primary/5 rounded-xl p-5 border border-primary/10">
          <h4 class="text-sm font-bold mb-3 flex items-center gap-2">
            <i data-lucide="cpu" class="w-4 h-4 text-primary"></i> Suggested Tech Stack
          </h4>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            ${techHTML}
          </div>
        </div>
      </div>
    `;

    // Show Modal
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modalContent.classList.remove('translate-y-8');
    document.body.style.overflow = 'hidden';
    lucide.createIcons();
  }

  const closeProblemModal = () => {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modalContent.classList.add('translate-y-8');
    document.body.style.overflow = '';
  };

  closeModal?.addEventListener('click', closeProblemModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeProblemModal();
  });

  // Initial render
  if (problemContainer) {
    renderProblems('All');
  }

  // Filter Buttons Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Update Button Styles
      filterBtns.forEach(b => {
        b.classList.remove('shad-btn-primary');
        b.classList.add('shad-btn-outline', 'bg-background/50');
      });
      e.target.classList.remove('shad-btn-outline', 'bg-background/50');
      e.target.classList.add('shad-btn-primary');

      // Re-render
      const category = e.target.getAttribute('data-category');
      renderProblems(category);
    });
  });

  // Timeline Data
  const events = [
    { date: "April 6", title: "Registration Opens", status: "completed" },
    { date: "April 16", title: "Registration Closes", status: "upcoming" },
    { date: "April 16 (11:30 AM - 01:00 PM)", title: "Morning Event", status: "upcoming" },
    { date: "April 16 (3:30 PM)", title: "Prize Distribution", status: "upcoming" },
  ];

  const timelineContainer = document.getElementById('timeline-events-container');
  if (timelineContainer) {
    let timelineHTML = '';
    events.forEach((ev, i) => {
      const isEven = i % 2 === 0;
      timelineHTML += `
        <div class="relative flex flex-col md:flex-row items-start justify-between timeline-item opacity-0 translate-y-8 ${isEven ? 'md:flex-row-reverse' : ''}">
          <div class="absolute left-[20px] md:left-1/2 top-5 w-8 h-8 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-background border-4 border-muted z-10">
            <div class="w-2 h-2 rounded-full ${ev.status === 'completed' ? 'bg-primary' : 'bg-muted-foreground'}"></div>
          </div>
          <div class="w-full md:w-[45%] pl-12 md:pl-0 ${isEven ? 'md:pr-12' : 'md:pl-12'}">
            <div class="shad-card p-6 relative group border-border/50 hover:border-primary/50 transition-colors">
              <span class="text-sm font-semibold text-primary mb-1 block">${ev.date}</span>
              <h3 class="text-xl font-bold">${ev.title}</h3>
            </div>
          </div>
        </div>
      `;
    });
    timelineContainer.innerHTML = timelineHTML;
  }

  // Initialize GSAP
  gsap.registerPlugin(ScrollTrigger);

  // Hero Animations
  if (document.querySelector('.hero-content')) {
    gsap.to(".hero-content", { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 });
  }

  // Other Animations
  if (document.querySelector('.highlight-header')) {
    gsap.to(".highlight-header", { scrollTrigger: { trigger: ".highlight-header", start: "top 80%" }, opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });
    gsap.to(".highlight-card", { scrollTrigger: { trigger: ".highlight-card", start: "top 85%" }, opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power2.out" });
  }

  if (document.querySelector('#problems')) {
    gsap.to(".problems-header", { scrollTrigger: { trigger: "#problems", start: "top 80%" }, opacity: 1, duration: 0.8 });
    if (document.querySelector('#filter-buttons-container')) {
      gsap.to("#filter-buttons-container", { scrollTrigger: { trigger: "#problems", start: "top 80%" }, opacity: 1, y: 0, duration: 0.8, delay: 0.2 });
    }
  }

  if (document.querySelector('#timeline')) {
    gsap.to(".timeline-header", { scrollTrigger: { trigger: "#timeline", start: "top 80%" }, opacity: 1, duration: 0.8 });
    gsap.to(".timeline-item", { scrollTrigger: { trigger: "#timeline-events-container", start: "top 80%" }, opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power2.out" });
  }
});
