const sec1 = document.getElementById('section1')
const sec2 = document.getElementById('section2')
const sec3 = document.getElementById('section3')

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

function scrollToSection1() {
    sec1.scrollIntoView({ behavior: "smooth" });
}

function scrollToSection2() {
    sec2.scrollIntoView({ behavior: "smooth" });
}

function scrollToSection3() {
    sec3.scrollIntoView({ behavior: "smooth" });
}

const numberSlider = document.getElementById("number-slider");
const selectedNumber = document.getElementById("selected-number");

numberSlider.addEventListener("input", function() {
    selectedNumber.innerHTML = numberSlider.value;
});