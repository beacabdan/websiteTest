var primaryColour = getComputedStyle(document.documentElement).getPropertyValue('--primary');

function includeHTML(_callback) {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) { elmnt.innerHTML = this.responseText; }
          if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("w3-include-html");
          includeHTML(_callback);
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }

  setTimeout(function () { _callback() }, 500);
};

// code from https://www.codegrepper.com/code-examples/javascript/convert+number+to+hexadecimal+in+javascript
function rgbToHex(rgb) {
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) hex = "0" + hex;
  return hex;
};

// https://stackoverflow.com/questions/1484506/random-color-generator
/*function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}*/

function getRandomColor(r1=0, r2=255, g1=0, g2=255, b1=0, b2=255) {
  var letters = '0123456789ABCDEF';
  var color = '#';
  r = Math.floor(Math.random()*(r2-r1)+r1);
  g = Math.floor(Math.random()*(g2-g1)+g1);
  b = Math.floor(Math.random()*(b2-b1)+b1);
  color += rgbToHex(r) + rgbToHex(g) + rgbToHex(b);
  return color;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CARD FUNCTIONS // CARD FUNCTIONS // CARD FUNCTIONS // CARD FUNCTIONS // CARD FUNCTIONS // CARD FUNCTIONS // CARD FUNCTIONS //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function resizeCards() {
  
}