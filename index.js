
const container = document.getElementById('container');
const colors = ['#97e1ff', '#ffae80', '#6171ff'];
const shadows = ['#c0edff', '#ffd4bb', '#c0c1ff'];
// Array for collecting stars so that we can check and remove them
// Since we dont have access to them becuase of the setInterval
const stars = [];

const makeStars = (isInitial = false, i = 0) => {
    // Generate random top position, select correct colors and randomize size
    const randSelectedColor = Math.floor(Math.random() * colors.length);
    const randVerticalPos = Math.random() * container.offsetHeight + container.offsetTop;
    const randSize = Math.floor(Math.random() * (7 - 1) + 1)

    let horizontalPos;
    if (isInitial === true) {
        horizontalPos = Math.random() * container.offsetWidth + container.offsetLeft;
    } else {
        horizontalPos = container.offsetLeft + container.offsetWidth;
    }

    const star = document.createElement('span');
    star.style.width = `${randSize}px`;
    star.style.height = `${randSize}px`;
    star.style.backgroundColor = `${colors[randSelectedColor]}`;
    star.style.boxShadow = `0 0 10px ${shadows[randSelectedColor]}`;
    star.style.top = `${randVerticalPos}px`;
    star.style.left = `${horizontalPos}px`;
    star.classList.add('star')
    // Give initial stars different ID so that they dont clash with generated stars when removing
    star.id = isInitial ? `${i}` : `${i / 100}`
    document.querySelector('#container').append(star)

    const specificStar = document.getElementById(isInitial ? `${i}` : `${i / 100}`);
    stars.push(specificStar);

    // Put corresponding animation duration/speed depending on size
    switch (randSize) {
        case 1:
            specificStar.style.animationDuration = '90s';
            break;
        case 2:
            specificStar.style.animationDuration = '70s';
            break;
        case 3:
            specificStar.style.animationDuration = '50s';
            break;
        case 4:
            specificStar.style.animationDuration = '40s';
            break;
        case 5:
            specificStar.style.animationDuration = '30s';
            break;
        case 6:
            specificStar.style.animationDuration = '20s';
            break;
    }
}

// Making 180 initial stars
for (let i = 0; i < 180; i++) {
    makeStars(true, i);
}

// Making one star every 250ms
// Averages out to around 180 stars on screen at one time
// The purpose of variable "i" is just to give stars id's
let i = 0;
setInterval(function () {
    i++;
    makeStars(false, i);
}, 250);

// Periodically check when star is out of bounds of container, then remove from DOM and array
setInterval((function () {
    for (let specificStar of stars) {
        if (specificStar.getBoundingClientRect().left <= container.offsetLeft - 6) {
            specificStar.remove();
            const starIndex = stars.indexOf(specificStar);
            stars.splice(starIndex, 1);
        }
    }
    console.log(`STARS ARRAY: ${stars.length}`);
    console.log(`STARS BROWSER: ${document.querySelectorAll('.star').length}`);
}), 50)