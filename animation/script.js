document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("sequence-canvas");
    const overlay = document.getElementById("canvas-overlay");
    const spacer = document.getElementById("animation-spacer");
    const finalContent = document.getElementById("final-content");
    const context = canvas.getContext("2d");
    
    // We still have 89 frames
    const frameCount = 89;
    const currentFrame = index => `../assets/ezgif-frame-${index.toString().padStart(3, '0')}.png`;
    
    const images = [];
    let loadedCount = 0;
    
    // Initial size setup
    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    // Preload all high-quality animation frames
    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        img.onload = () => {
            loadedCount++;
            // Draw the first frame once it's loaded to prevent a black screen
            if (i === 1) {
                renderFrame(0);
            }
        };
        images.push(img);
    }
    
    // Renders the image proportional to screen
    function drawImageProportionally(img) {
        if (!img) return;

        // Calculate scale to completely cover the screen or fit it nicely
        const scale = Math.max(canvasWidth / img.width, canvasHeight / img.height);
        
        const renderWidth = img.width * scale;
        const renderHeight = img.height * scale;
        const x = (canvasWidth / 2) - (renderWidth / 2);
        const y = (canvasHeight / 2) - (renderHeight / 2);
        
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        
        context.drawImage(img, x, y, renderWidth, renderHeight);
    }
    
    function renderFrame(index) {
        if (images[index] && images[index].complete) {
            drawImageProportionally(images[index]);
        }
    }
    
    let currentIndex = 0;
    
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        
        // Calculate the maximum scroll amount for JUST the animation section
        // We use the spacer height minus the viewport.
        const maxAnimationScroll = spacer.offsetHeight - window.innerHeight;
        
        // Fraction of animation scroll (clamped between 0 and 1)
        const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxAnimationScroll));
        
        // Map fraction to a frame index (0 to 88)
        const frameIndex = Math.min(
            frameCount - 1,
            Math.max(0, Math.floor(scrollFraction * frameCount))
        );
        
        if (frameIndex !== currentIndex) {
            currentIndex = frameIndex;
            requestAnimationFrame(() => renderFrame(frameIndex));
        }

        // Add a subtle dimming to the canvas as the text scrolls over it
        if (scrollTop > maxAnimationScroll) {
            // How far into the final content we have scrolled
            const overshoot = scrollTop - maxAnimationScroll;
            const darkFraction = Math.min(0.85, overshoot / (window.innerHeight * 0.5));
            overlay.style.backgroundColor = `rgba(5, 5, 8, ${darkFraction})`;
        } else {
            overlay.style.backgroundColor = `rgba(5, 5, 8, 0)`;
        }
    });
    
    // Handle resizing
    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            canvasWidth = window.innerWidth;
            canvasHeight = window.innerHeight;
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            renderFrame(currentIndex);
        }, 100);
    });
    
    // Intersection Observer to smoothly fade in final text blocks
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15 
    });
    
    document.querySelectorAll('.text-block').forEach(el => observer.observe(el));
});
