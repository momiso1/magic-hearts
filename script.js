const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Heart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 15 + 10;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * -3 - 1;
        this.opacity = 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.02;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.beginPath();
        
        // رسم القلب باستخدام الـ Canvas
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-this.size/2, -this.size/2, -this.size, this.size/3, 0, this.size);
        ctx.bezierCurveTo(this.size, this.size/3, this.size/2, -this.size/2, 0, 0);
        
        ctx.fillStyle = '#ff69b4';
        ctx.fill();
        ctx.restore();
    }
}

window.addEventListener('mousemove', (e) => {
    hearts.push(new Heart(e.clientX, e.clientY));
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < hearts.length; i++) {
        hearts[i].update();
        hearts[i].draw();
        if (hearts[i].opacity <= 0) {
            hearts.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animate);
}

animate();
