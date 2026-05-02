/**
 * 鼠标拖尾 + 点击涟漪特效
 * 
 * 使用方法：将此文件放在网站任意位置，然后在 HTML 中引入即可。
 * <script src="cursor-trail.js"></script>
 * 
 * 无需任何依赖，纯原生 JS。
 */
(function () {
    const trails = [];
    const count = 12;
    const colors = ['#a855f7', '#6366f1', '#3b82f6', '#06b6d4', '#8b5cf6', '#ec4899'];
    const initX = -100, initY = -100;

    for (let i = 0; i < count; i++) {
        const dot = document.createElement('div');
        const size = 6 - i * 0.3;
        dot.style.cssText = `
            position:fixed;
            left:0;
            top:0;
            width:${size}px;
            height:${size}px;
            background:${colors[i % colors.length]};
            border-radius:50%;
            pointer-events:none;
            z-index:99999;
            opacity:${1 - i * 0.07};
            will-change:transform;
            mix-blend-mode:screen;
        `;
        dot.style.transform = `translate(${initX - size / 2}px, ${initY - size / 2}px)`;
        document.body.appendChild(dot);
        trails.push({ el: dot, x: initX, y: initY, size: size });
    }

    let mouseX = initX, mouseY = initY;

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // 点击涟漪效果
    document.addEventListener('mousedown', e => {
        const particleCount = 8;
        for (let i = 0; i < particleCount; i++) {
            const p = document.createElement('div');
            const angle = (Math.PI * 2 / particleCount) * i;
            const distance = 30 + Math.random() * 20;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;
            const size = 3 + Math.random() * 3;
            const color = colors[Math.floor(Math.random() * colors.length)];
            p.style.cssText = `
                position:fixed;
                left:${e.clientX}px;
                top:${e.clientY}px;
                width:${size}px;
                height:${size}px;
                background:${color};
                border-radius:50%;
                pointer-events:none;
                z-index:100000;
                mix-blend-mode:screen;
                transform:translate(-50%,-50%);
                transition:all 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
                opacity:1;
            `;
            document.body.appendChild(p);
            requestAnimationFrame(() => {
                p.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
                p.style.opacity = '0';
            });
            setTimeout(() => p.remove(), 500);
        }

        // 点击涟漪圈
        const ring = document.createElement('div');
        ring.style.cssText = `
            position:fixed;
            left:${e.clientX}px;
            top:${e.clientY}px;
            width:10px;
            height:10px;
            border:2px solid ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius:50%;
            pointer-events:none;
            z-index:100000;
            mix-blend-mode:screen;
            transform:translate(-50%,-50%);
            transition:all 0.4s ease-out;
            opacity:1;
        `;
        document.body.appendChild(ring);
        requestAnimationFrame(() => {
            ring.style.width = '60px';
            ring.style.height = '60px';
            ring.style.opacity = '0';
        });
        setTimeout(() => ring.remove(), 400);
    });

    function animate() {
        let prevX = mouseX, prevY = mouseY;
        for (let i = 0; i < trails.length; i++) {
            const t = trails[i];
            const speed = 0.35 - i * 0.015;
            t.x += (prevX - t.x) * speed;
            t.y += (prevY - t.y) * speed;
            t.el.style.transform = `translate(${t.x - t.size / 2}px, ${t.y - t.size / 2}px)`;
            prevX = t.x;
            prevY = t.y;
        }
        requestAnimationFrame(animate);
    }
    animate();
})();
