const sec1 = document.getElementById('section1');
const sec2 = document.getElementById('section2');
const sec3 = document.getElementById('section3');
const spanSlider = document.getElementById("span-slider");
const widthSlider = document.getElementById("width-slider");
const thicknessSlider = document.getElementById("thickness-slider");
const spanNumber = document.getElementById("spanNumber");
const widthNumber = document.getElementById("widthNumber");
const thicknessNumber = document.getElementById("thicknessNumber");
const liveLoad = document.getElementById("live-load");
const deadLoad = document.getElementById("dead-load");
const locationQues = document.getElementById('locationques');
const purposeQues = document.getElementById('purposeques');
const comboStrength = document.getElementById('combo-strength');
const comboShort = document.getElementById('combo-short');
const comboLong = document.getElementById('combo-long');


let purposeItem = 0;


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

spanSlider.addEventListener("input", function() {
    spanNumber.innerHTML = spanSlider.value;
    findLoad(purposeItem,spanNumber.innerHTML,widthNumber.innerHTML,thicknessNumber.innerHTML);
});

widthSlider.addEventListener("input", function() {
    widthNumber.innerHTML = widthSlider.value;
    findLoad(purposeItem,spanNumber.innerHTML,widthNumber.innerHTML,thicknessNumber.innerHTML);
});

thicknessSlider.addEventListener("input", function() {
    thicknessNumber.innerHTML = thicknessSlider.value;
    findLoad(purposeItem,spanNumber.innerHTML,widthNumber.innerHTML,thicknessNumber.innerHTML);
});

locationQues.addEventListener('click', function(event) {
  const locationItem = Array.from(this.children).indexOf(event.target);
  console.log('Clicked location:', locationItem);
});

purposeQues.addEventListener('click', function(event) {
    purposeItem = Array.from(this.children).indexOf(event.target);
    console.log('Clicked purpose:', purposeItem); //residential,office,shopping area
    findLoad(purposeItem,0.3,0.4,spanNumber.innerHTML);
});

function findLoad(purpose, span, width, thickness){
    const conreteDensity = 25;
    let udl = 0; //uniformly distributed load (kPa)
    let cl = 0; //concentrated load (kN)
    let shortf = 0.7; //short-term factor
    let longf = 0.4; //long-term factor
    if (purpose == 0){ //residential
        udl = 1.5;
        cl = 1.8;
    } else if (purpose == 1){ //office
        udl = 3.0;
        cl = 2.7;
    } else { //shopping area
        udl = 4.0;
        cl = 3.7;
    }
    const lload = udl * span * width * thickness; // Q, live load
    const dload = conreteDensity * width * thickness; // G, dead load
    liveLoad.innerHTML = lload.toPrecision(4);
    deadLoad.innerHTML = dload.toPrecision(4);
    comboStrength.innerHTML = (1.2*dload + 1.5*lload).toPrecision(4);
    comboShort.innerHTML = (dload + shortf*lload).toPrecision(4);
    comboLong.innerHTML = (dload + longf*lload).toPrecision(4);
}