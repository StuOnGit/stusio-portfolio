document.addEventListener("DOMContentLoaded", () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        // Nasconde il contenitore del serpente su dispositivi mobili
        const snakeContainer = document.getElementById('snake-container');
        snakeContainer.style.display = 'none';
        return; // Esce dalla funzione se è un dispositivo mobile
    }

    const snakeContainer = document.getElementById('snake-container');
    const segments = [];
    const segmentCount = 10;
    const segmentSize = 20;
    let mouseX = 0, mouseY = 0;
    let lastMouseMoveTime = Date.now();

    // Crea i segmenti del serpente
    for (let i = 0; i < segmentCount; i++) {
        const segment = document.createElement('div');
        segment.classList.add('snake-segment');
        snakeContainer.appendChild(segment);
        segments.push({ element: segment, x: 0, y: 0 });
        segment.style.width = `${segmentSize - i}px`;
        segment.style.height = `${segmentSize - i}px`;
        segment.style.zIndex = segmentCount - i;
    }

    // Aggiorna la posizione del mouse
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        lastMouseMoveTime = Date.now();
    });

    // Funzione di animazione
    function animateSnake() {
        let previousX = mouseX;
        let previousY = mouseY;


        segments.forEach((segment, index) => {
            const dx = previousX - segment.x;
            const dy = previousY - segment.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance >= segmentSize) {
                const angle = Math.atan2(dy, dx);
                segment.x = previousX - Math.cos(angle) * segmentSize;
                segment.y = previousY - Math.sin(angle) * segmentSize;
            }

            segment.element.style.transform = `translate(${segment.x}px, ${segment.y}px)`;

            previousX = segment.x;
            previousY = segment.y;
        });


        requestAnimationFrame(animateSnake);
    }

    function checkMouseMove() {
        if (Date.now() - lastMouseMoveTime > 100) {
            // Raccolta del serpente
            let previousX = mouseX;
            let previousY = mouseY;

            segments.forEach((segment, index) => {
                const dx = previousX - segment.x;
                const dy = previousY - segment.y;
                const angle = Math.atan2(dy, dx);

                segment.x = previousX;
                segment.y = previousY;

                segment.element.style.transform = `translate(${segment.x}px, ${segment.y}px)`;

                previousX = segment.x;
                previousY = segment.y;
            });
        }
    }
    
    animateSnake();
    setInterval(checkMouseMove, 100);
  
});
