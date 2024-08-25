import React, { useEffect } from 'react';

function perlinNoise(x, y) {
  const n = x + y * 1;
  const nn = (n << 2) ^ n;
  const t = (nn * (nn * nn * 15731 + 789221) + 1376312589) & 0x7fffffff;
  return 1.0 - t / 1073741824.0;
}

const CursorEffect = ({ isDarkMode }) => {
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);

    // Set canvas properties
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999'; // Ensure the effect is above the background

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let particles = [];
    const maxParticles = 9999;
    let time = 0;

    const neonColors = isDarkMode
    ? ['#FF4500', '#FFA500', '#39FF14', '#00FFFF'] // Dark mode: red, orange, neon green, neon blue
    : ['#FF0000', '#808080', '#00008B', '#008000']; // Light mode: red, grey, dark blue, green

    let colorIndex = 0;
    let colorTransitionFactor = 0;

    // All currency symbols and numbers
    const symbols = ['$', '€', '£', '¥', '₹', '฿', ];

    const handleMouseMove = (event) => {
      const navPane = document.querySelector('.navbar'); // Ensure the class matches your navigation pane
      const navRect = navPane.getBoundingClientRect();

      // Check if the cursor is over the navigation pane
      if (
        event.clientX >= navRect.left &&
        event.clientX <= navRect.right &&
        event.clientY >= navRect.top &&
        event.clientY <= navRect.bottom
      ) {
        return; // Skip creating particles if the cursor is over the navigation pane
      }

      const mouseX = event.clientX;
      const mouseY = event.clientY;

      for (let i = 0; i < 1; i++) {
        createParticle(mouseX, mouseY);
      }

      if (particles.length > maxParticles) {
        particles.splice(0, particles.length - maxParticles);
      }
    };

    const createParticle = (x, y) => {
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      particles.push({
        x,
        y,
        symbol,
        alpha: 1,
        fontSize: Math.random() * 14 + 9,
        offsetX: Math.random() * 100,
        offsetY: Math.random() * 100,
      });
    };

    const updateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "bold 16px Arial";

      const currentColor = neonColors[colorIndex];
      const nextColor = neonColors[(colorIndex + 1) % neonColors.length];
      const interpolatedColor = interpolateColor(currentColor, nextColor, colorTransitionFactor);

      particles.forEach(particle => {
        particle.x += perlinNoise(particle.offsetX + time, particle.offsetY) * 2;
        particle.y += perlinNoise(particle.offsetX, particle.offsetY + time) * 2;
        particle.alpha -= 0.005;

        ctx.fillStyle = `rgba(${hexToRgb(interpolatedColor).join(', ')}, ${particle.alpha})`;
        ctx.font = `${particle.fontSize}px Arial`;
        ctx.fillText(particle.symbol, particle.x, particle.y);
      });

      particles = particles.filter(p => p.alpha > 0);
      time += 0.001;

      colorTransitionFactor += 0.005;
      if (colorTransitionFactor >= 1) {
        colorTransitionFactor = 0;
        colorIndex = (colorIndex + 1) % neonColors.length;
      }

      requestAnimationFrame(updateParticles);
    };

    const interpolateColor = (color1, color2, factor) => {
      const [r1, g1, b1] = hexToRgb(color1);
      const [r2, g2, b2] = hexToRgb(color2);

      const r = Math.round(r1 + factor * (r2 - r1));
      const g = Math.round(g1 + factor * (g2 - g1));
      const b = Math.round(b1 + factor * (b2 - b1));

      return rgbToHex(r, g, b);
    };

    const hexToRgb = (hex) => {
      const bigint = parseInt(hex.slice(1), 16);
      return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
    };

    const rgbToHex = (r, g, b) => {
      return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    requestAnimationFrame(updateParticles);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      document.body.removeChild(canvas);
    };
  }, [isDarkMode]);

  return null;
};

export default CursorEffect;
