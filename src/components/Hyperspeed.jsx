import { useEffect, useRef } from 'react';
import './Hyperspeed.css';

class Particle {
  constructor(canvasWidth, canvasHeight, speed, speedBoost) {
    this.reset(canvasWidth, canvasHeight, speed, speedBoost);
  }

  reset(canvasWidth, canvasHeight, speed, speedBoost) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.z = Math.random() * 1000;
    this.vx = (Math.random() - 0.5) * speed * 2;
    this.vy = (Math.random() - 0.5) * speed * 2;
    this.vz = speed * 10 * speedBoost;
    this.size = Math.random() * 2 + 1;
  }

  update(canvasWidth, canvasHeight, speed, speedBoost) {
    this.x += this.vx;
    this.y += this.vy;
    this.z -= this.vz;

    // Wrap around
    if (this.x < 0) this.x = canvasWidth;
    if (this.x > canvasWidth) this.x = 0;
    if (this.y < 0) this.y = canvasHeight;
    if (this.y > canvasHeight) this.y = 0;
    if (this.z < 1) {
      this.z = 1000;
      this.x = Math.random() * canvasWidth;
      this.y = Math.random() * canvasHeight;
      this.vx = (Math.random() - 0.5) * speed * 2;
      this.vy = (Math.random() - 0.5) * speed * 2;
      this.vz = speed * 10 * speedBoost;
    }
  }

  draw(ctx, canvasWidth, canvasHeight, particleColor) {
    const scale = 1000 / this.z;
    const x2d = (this.x - canvasWidth / 2) * scale + canvasWidth / 2;
    const y2d = (this.y - canvasHeight / 2) * scale + canvasHeight / 2;
    const size = this.size * scale;

    ctx.fillStyle = particleColor;
    ctx.globalAlpha = Math.max(0, 1 - this.z / 1000);
    ctx.fillRect(x2d, y2d, size, size);
  }
}

export default function Hyperspeed({ effectOptions = {} }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const {
      speedBoost = 1,
      particleColor = '#c8ff00',
      particleCount = 100,
      lineColor = 'rgba(200, 255, 0, 0.3)',
      speed = 0.5,
      vignette = true,
      blurTrail = true,
    } = effectOptions;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    // Particle system
    const particles = [];

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height, speed, speedBoost));
    }

    let animationId;

    const animate = () => {
      // Clear or blur trail
      if (blurTrail) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.globalAlpha = 1;

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update(canvas.width, canvas.height, speed, speedBoost);
        particle.draw(ctx, canvas.width, canvas.height, particleColor);
      });

      // Draw lines between particles
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100 && particles[i].z < 500 && particles[j].z < 500) {
            ctx.globalAlpha = (1 - dist / 100) * 0.3;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Add vignette
      if (vignette) {
        const gradient = ctx.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          0,
          canvas.width / 2,
          canvas.height / 2,
          Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height) / 2
        );
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
        ctx.globalAlpha = 1;
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [effectOptions]);

  return <canvas ref={canvasRef} className="hyperspeed-canvas" />;
}
