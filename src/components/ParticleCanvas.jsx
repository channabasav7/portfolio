import { useEffect, useRef, useCallback } from 'react';

const PARTICLE_COUNT = 120;
const PARTICLE_SPEED = 0.4;
const SPAWN_RATE = 3; // particles spawned per mouse move event

class Particle {
    constructor(x, y, canvasW, canvasH) {
        this.reset(x, y, canvasW, canvasH);
    }

    reset(x, y, canvasW, canvasH) {
        this.x = x + (Math.random() - 0.5) * 30;
        this.y = y + (Math.random() - 0.5) * 30;
        this.size = Math.random() * 4 + 1.5;
        this.speedX = (Math.random() - 0.5) * PARTICLE_SPEED * 2;
        this.speedY = (Math.random() - 0.5) * PARTICLE_SPEED * 2 - PARTICLE_SPEED * 0.5;
        this.life = 1; // 1 = full alpha
        this.decay = Math.random() * 0.012 + 0.006;
        // Color: blue-indigo palette like the screenshot
        const hue = Math.floor(Math.random() * 40) + 210; // 210–250 range (blue-violet)
        this.color = `hsl(${hue}, 80%, 65%)`;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.08;
        this.isRect = Math.random() > 0.5; // mix of dots and small rects
        this.canvasW = canvasW;
        this.canvasH = canvasH;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
        this.rotation += this.rotationSpeed;
        this.speedY -= 0.004; // slight float-up drift
        this.size *= 0.995;
    }

    draw(ctx) {
        if (this.life <= 0) return;
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.life);
        ctx.fillStyle = this.color;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        if (this.isRect) {
            const w = this.size * 1.8;
            const h = this.size * 0.7;
            ctx.fillRect(-w / 2, -h / 2, w, h);
        } else {
            ctx.beginPath();
            ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    }

    isDead() {
        return this.life <= 0;
    }
}

export default function ParticleCanvas() {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const animFrameRef = useRef(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const sizeRef = useRef({ w: 0, h: 0 });

    const resize = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        sizeRef.current = { w: canvas.width, h: canvas.height };
    }, []);

    const spawnParticles = useCallback((x, y) => {
        const { w, h } = sizeRef.current;
        for (let i = 0; i < SPAWN_RATE; i++) {
            if (particlesRef.current.length < PARTICLE_COUNT) {
                particlesRef.current.push(new Particle(x, y, w, h));
            } else {
                // Recycle the oldest dead particle or oldest alive one
                const dead = particlesRef.current.findIndex((p) => p.isDead());
                if (dead !== -1) {
                    particlesRef.current[dead].reset(x, y, w, h);
                } else {
                    // replace the oldest
                    particlesRef.current.shift();
                    particlesRef.current.push(new Particle(x, y, w, h));
                }
            }
        }
    }, []);

    const handleMouseMove = useCallback(
        (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
            spawnParticles(e.clientX, e.clientY);
        },
        [spawnParticles]
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);

        const loop = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particlesRef.current.forEach((p) => {
                p.update();
                p.draw(ctx);
            });
            // Clean up very dead particles
            particlesRef.current = particlesRef.current.filter((p) => !p.isDead());
            animFrameRef.current = requestAnimationFrame(loop);
        };

        animFrameRef.current = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animFrameRef.current);
        };
    }, [resize, handleMouseMove]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 9999,
            }}
        />
    );
}
