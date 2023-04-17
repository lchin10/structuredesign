// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import ReactDOM from 'react-dom';
// import BendingMomentDiagram from './BendingMomentDiagram';

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
const rebarDiam = document.getElementById('rebarDiam');


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
    // findLoad(purposeItem,spanNumber.innerHTML,widthNumber.innerHTML,thicknessNumber.innerHTML);
});

widthSlider.addEventListener("input", function() {
    widthNumber.innerHTML = widthSlider.value;
    // findLoad(purposeItem,spanNumber.innerHTML,widthNumber.innerHTML,thicknessNumber.innerHTML);
});

thicknessSlider.addEventListener("input", function() {
    thicknessNumber.innerHTML = thicknessSlider.value;
    // findLoad(purposeItem,spanNumber.innerHTML,widthNumber.innerHTML,thicknessNumber.innerHTML);
});

locationQues.addEventListener('click', function(event) {
  const locationItem = Array.from(this.children).indexOf(event.target);
  console.log('Clicked location:', locationItem);
});

purposeQues.addEventListener('click', function(event) {
    purposeItem = Array.from(this.children).indexOf(event.target);
    console.log('Clicked purpose:', purposeItem); //residential,office,shopping area
    // findLoad(purposeItem,spanNumber.innerHTML,widthNumber.innerHTML,thicknessNumber.innerHTML);
});

rebarDiam.addEventListener('change', (event) => {
    const selectedDiam = rebarDiam.value;
    console.log(selectedDiam);
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



/*
write html, css, and js code based on the following:

the user chooses location of a beam: inland or coastal
the user can choose the span (L) of the beam: this will be a slider that defaults to 15m
for the cross-section, the depth (D) is defined as L/16, and width (W) is defined as D/1.5
for the rebar diameter, the user can choose between 16mm, 18mm, and 20mm: this will be a dropdown that defaults to 16mm

concrete properties: 
user can choose characteristic compressive strength (fc) based on the table below; however, the minimum choice will be based on the beam location chosen earlier:
    inland: fc >= 25MPa, coastal: fc >= 32MPa; this will be a dropdown defaulting to the minimum value
characteristic flexural tensile strength (fct.f) = 0.6 * sqrt(fc)
elastic modulus (Ec) will be based on fc according to this table:
fc (MPa): 20 25 32 40 50 65 80 100 120
Ec (MPa): 24000 26700 30100 32800 34800 37400 39600 42200 44400

steel properties:
Characteristic yield strength (fsy) = 500 MPa
Elastic modulus (Es) = 200 * 10^3 MPa

concrete cover (conC): this will be based on both beam location and fc:
    inland: 30mm (25MPa), 25 (32MPa), 20 (>=40MPa)
    coastal: 40mm (32MPa), 30 (40MPa), 25 (>=50MPa)
stirrup (stirrup): let the user choose between 10mm or 12mm: dropdown defaulting to 10mm
effective depth (d) = D - conC - stirrup - (diameter/2)
cross-sectional area (Ast) = (0.2 * (D/d)^2 * (fct.f/fsy)) * W * d

**note that for D and W, the dimensions should be rounded up to the nearest 10mm

these will be the variables shown; it will be shown in two columns
column 1:
    Span (L): slider for user selection (units: m)
    Cross-section: depth (D) and width (W) (units: mm)
    Rebar Diameter: dropdown for user selection (units: mm)
    Stirrup: dropdown for user selection (units: mm)
    Concrete Properties: fc and Ec, dropdown for fc for user selection
    Steel Properties: fsy and Es

column 2:
    Effective Depth (d) (units: mm)
    Concrete Cover (units: m)
    Cross-Sectional Area of Longitudinal Tensile Reinforcement (Ast) (units: mm^2)

*/