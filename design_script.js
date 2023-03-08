const sec1 = document.getElementById('section1')
const sec2 = document.getElementById('section2')

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

function scrollToSection1() {
    sec1.scrollIntoView({ behavior: "smooth" });
}

function scrollToSection2() {
    sec2.scrollIntoView({ behavior: "smooth" });
}