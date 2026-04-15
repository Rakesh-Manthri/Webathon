document.addEventListener('DOMContentLoaded', () => {
  // Problems Data
  const problems = [
    // Space
    { title: "Night Sky Object Planner", category: "Space", desc: "A tool where stargazers enter their location and date. Lists visible planets, constellations, and objects with rise/set times and visibility ratings." },
    { title: "Space Mission Timeline", category: "Space", desc: "Interactive, scrollable timeline of past and upcoming space missions from agencies like ISRO, NASA, and SpaceX." },
    { title: "Meteor Shower Alert", category: "Space", desc: "Dashboard showing upcoming meteor showers with a 'Visibility Rating' based on local moon phase and predicted cloud cover." },
    { title: "Multi-World Clock", category: "Space", desc: "A time-syncing tool displaying current time on Earth, Mars (Sols), and the Moon simultaneously." },

    // Sustainable Development
    { title: "Carbon Footprint Calculator", category: "Sustainability", desc: "Calculate monthly carbon footprint, benchmark against average, and suggest reduction tips." },
    { title: "Household Water Tracker", category: "Sustainability", desc: "Log daily water usage by activity. Compares against limits, shows trends, and suggests water-saving actions." },
    { title: "Renewable Energy Estimator", category: "Sustainability", desc: "Input roof size and sunny hours to calculate potential solar generation and the investment Payback Period." },
    { title: "Local Eco-Event Organizer", category: "Sustainability", desc: "Platform to create and join Clean-up Drives or Planting Events featuring a participant Impact Leaderboard." },

    // Education
    { title: "Live Polling & Analytics", category: "Education", desc: "Instructor creates polls for live sessions. Dashboard shows live response distribution and exports reports." },
    { title: "AI-Enhanced Quiz Builder", category: "Education", desc: "Paste text to programmatically extract keywords and automatically generate multiple-choice quizzes." },
    { title: "Focus Session Manager", category: "Education", desc: "Pomodoro-style timer tracking distractions (clicks away) and displaying productivity analytics." },
    { title: "Group Study Room", category: "Education", desc: "Users join a room with a shared task list, progress board, and simulated 'who is studying what' tracker." },

    // Miscellaneous
    { title: "Medicine Tracker", category: "Miscellaneous", desc: "Track medicines and health symptoms to maintain an interactive health log over time." },
    { title: "Smart Yield Predictor", category: "Miscellaneous", desc: "Estimate crop yield and expected income while analyzing risk factors and sustainability aspects." },
    { title: "JWT Interactive Debugger", category: "Miscellaneous", desc: "Decode JWT payloads, verify signatures, and highlight security flaws like the 'alg: none' vulnerability." },
    { title: "Subscription Tracker", category: "Miscellaneous", desc: "Manage services, input start dates, calculate 'Next Billing Date', and sort by 'Soonest Renewal'." }
  ];

  const problemContainer = document.getElementById('problem-cards-container');
  
  function renderProblems(filter = 'All') {
    if (!problemContainer) return;
    
    let cardsHTML = '';
    const filtered = filter === 'All' ? problems : problems.filter(p => p.category === filter);
    
    filtered.forEach(p => {
      cardsHTML += `
        <div class="shad-card p-6 flex flex-col problem-card opacity-0 translate-y-8 transition-transform hover:-translate-y-1">
          <div class="flex justify-between items-start mb-4">
            <span class="shad-badge shad-badge-secondary">${p.category}</span>
          </div>
          <h3 class="text-xl font-bold mb-2">${p.title}</h3>
          <p class="text-muted-foreground text-sm flex-1 mb-2">${p.desc}</p>
        </div>
      `;
    });
    
    problemContainer.innerHTML = cardsHTML;

    // Trigger local GSAP animation for new cards
    gsap.fromTo(".problem-card", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "back.out(1.2)" }
    );
  }

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
    { date: "April 13", title: "Registration Opens", status: "completed" },
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
    gsap.to(".hero-content", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.2
    });
  }

  // Why Participate Animations
  if (document.querySelector('.highlight-header')) {
    gsap.to(".highlight-header", {
      scrollTrigger: {
        trigger: ".highlight-header",
        start: "top 80%",
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    });

    gsap.to(".highlight-card", {
      scrollTrigger: {
        trigger: ".highlight-card",
        start: "top 85%",
      },
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: "power2.out"
    });
  }

  // Problems Section Animations (Initial trigger for header)
  if (document.querySelector('#problems')) {
    gsap.to(".problems-header", {
      scrollTrigger: { trigger: "#problems", start: "top 80%" },
      opacity: 1,
      duration: 0.8
    });
    
    // Animate filter buttons in
    if (document.querySelector('#filter-buttons-container')) {
      gsap.to("#filter-buttons-container", {
        scrollTrigger: { trigger: "#problems", start: "top 80%" },
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2
      });
    }
    // Note: The problem cards themselves are now animated cleanly via the renderProblems() function.
  }

  // Timeline Animations
  if (document.querySelector('#timeline')) {
    gsap.to(".timeline-header", {
      scrollTrigger: { trigger: "#timeline", start: "top 80%" },
      opacity: 1,
      duration: 0.8
    });

    gsap.to(".timeline-item", {
      scrollTrigger: { trigger: "#timeline-events-container", start: "top 80%" },
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: "power2.out"
    });
  }

});
