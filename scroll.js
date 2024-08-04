document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    let currentPage = 0;

    function scrollPage(e) {
        if (e.deltaY > 0) {
            // Scorri verso il basso
            if (currentPage < pages.length - 1) {
                currentPage++;
            }
        } else {
            // Scorri verso l'alto
            if (currentPage > 0) {
                currentPage--;
            }
        }

        pages.forEach((page, index) => {
            page.style.transform = `translateY(${-currentPage * 100}vh)`;
        });
    }

    window.addEventListener('wheel', scrollPage);
});