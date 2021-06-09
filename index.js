
const container = document.getElementById('container');
const starCountInput = document.getElementById('star-count-input')
const applyStarCount = document.getElementById('submit')
const colors = ['#97e1ff', '#ffae80', '#6171ff'];
const shadows = ['#c0edff', '#ffd4bb', '#c0c1ff'];
// Array containing all the stars and its related animation object so that we can check when a star is off screen and restart their animation
const stars = [];

const makeAndMoveStars = (i) => {
    // Generate random top position, select correct colors and randomize size for star
    const randSelectedColor = Math.floor(Math.random() * colors.length);
    const randVerticalPos = Math.random() * container.offsetHeight + container.offsetTop;
    const randSize = Math.floor(Math.random() * (7 - 1) + 1)

    let horizontalPos = Math.random() * container.offsetWidth + container.offsetLeft;

    // Make star
    const star = document.createElement('span');
    star.style.width = `${randSize}px`;
    star.style.height = `${randSize}px`;
    star.style.backgroundColor = `${colors[randSelectedColor]}`;
    star.style.boxShadow = `0 0 10px ${shadows[randSelectedColor]}`;
    star.style.top = `${randVerticalPos}px`;
    star.style.left = `${horizontalPos}px`;
    star.classList.add('star');
    star.id = `${i}`
    container.append(star)

    // Put corresponding animation duration/speed depending on size
    let duration = 0;
    switch (randSize) {
        case 1:
            duration = 90000;
            break;
        case 2:
            duration = 80000;
            break;
        case 3:
            duration = 70000;
            break;
        case 4:
            duration = 60000;
            break;
        case 5:
            duration = 50000;
            break;
        case 6:
            duration = 40000;
            break;
    }

    // Move star
    const moveStarKeyframes = {
        transform: 'translateX(0)',
        transform: 'translateX(-105vw)'
    }
    const options = {
        duration: duration,
        fill: 'forwards',
    }

    // Push star to array to check on each one later
    const specificStar = document.getElementById(`${i}`);

    // Stars is an array of objects, each object containing the star, and its related animation object
    stars.push({ specificStar, animationObj: specificStar.animate(moveStarKeyframes, options) });
}

// Making 180 initial stars
function makeStars(starCount) {
    for (i = 0; i < starCount; i++) {
        // Make stars
        makeAndMoveStars(i);
    }

    // Prefill starcount with amount currently on screen
    starCountInput.value = starCount;
}

// Periodically check when star is out of bounds of container -
// - then cancel animation, restart it, and move it back to start
let id = setInterval((function () {
    for (let star of stars) {
        if (star.specificStar.getBoundingClientRect().left <= container.offsetLeft - 6) {
            star.animationObj.cancel();
            star.specificStar.style.left = `${container.offsetLeft + container.offsetWidth}px`;
            star.specificStar.style.top = `${Math.random() * container.offsetHeight + container.offsetTop}px`
            star.animationObj.play();
        }
    }
}), 1)

makeStars(100);

applyStarCount.addEventListener('click', () => {
    // reset stars array
    stars.length = 0;

    // delete all stars on page
    let starsInDOM = document.querySelectorAll('span');
    for (let star of starsInDOM) {
        star.remove()
    }

    // Make new amount of stars
    makeStars(starCountInput.value);
})