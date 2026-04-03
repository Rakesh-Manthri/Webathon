document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  lucide.createIcons();

  // --- Theme Toggle Logic ---
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  const htmlEl = document.documentElement;
  
  // Set initial theme
  const getPreferredTheme = () => {
    if (localStorage.getItem('webthon-theme')) {
      return localStorage.getItem('webthon-theme');
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const setTheme = (theme) => {
    if (theme === 'dark') {
      htmlEl.classList.add('dark');
    } else {
      htmlEl.classList.remove('dark');
    }
    localStorage.setItem('webthon-theme', theme);
  };

  setTheme(getPreferredTheme());

  const toggleTheme = () => {
    const isDark = htmlEl.classList.contains('dark');
    setTheme(isDark ? 'light' : 'dark');
  };

  themeToggle?.addEventListener('click', toggleTheme);
  themeToggleMobile?.addEventListener('click', toggleTheme);

  // --- Mobile Menu Logic ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuCloseBtn = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const openMenu = () => {
    mobileMenu.classList.remove('translate-x-full');
  };

  const closeMenu = () => {
    mobileMenu.classList.add('translate-x-full');
  };

  mobileMenuBtn?.addEventListener('click', openMenu);
  mobileMenuCloseBtn?.addEventListener('click', closeMenu);
  
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // --- Navbar Scroll Effect ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('bg-background/80', 'backdrop-blur-md', 'border-b', 'border-border', 'shadow-sm');
      navbar.classList.remove('bg-transparent');
    } else {
      navbar.classList.remove('bg-background/80', 'backdrop-blur-md', 'border-b', 'border-border', 'shadow-sm');
      navbar.classList.add('bg-transparent');
    }
  });
});
