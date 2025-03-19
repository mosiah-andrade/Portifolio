let currentIndex = 0;
const itemWidth = 250 + 15; // Largura do item + margem
const track = document.getElementById('sliderTrack');
const totalItems = document.querySelectorAll('.slider-item').length;

function moveSlider(direction) {
    currentIndex += direction;

    // Limita o índice (loop infinito)
    if (currentIndex < 0) {
        currentIndex = totalItems - 1;
    } else if (currentIndex >= totalItems) {
        currentIndex = 0;
    }

    // Move o slider
    const offset = -currentIndex * itemWidth;
    track.style.transform = `translateX(${offset}px)`;
}