var parentUrl = "https://beacabdan.github.io"

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

function getRandomColor(r1=0, r2=255, g1=0, g2=255, b1=0, b2=255) {
  var letters = '0123456789ABCDEF';
  var color = '#';
  r = Math.floor(Math.random()*(r2-r1)+r1);
  g = Math.floor(Math.random()*(g2-g1)+g1);
  b = Math.floor(Math.random()*(b2-b1)+b1);
  color += rgbToHex(r) + rgbToHex(g) + rgbToHex(b);
  return color;
}

function getColorPair() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  var color2 = '#';
  var index;
  for (var i = 0; i < 6; i++) {
    index = Math.floor(Math.random() * 14);
    color += letters[Math.min(index, 15)];
    color2 += letters[Math.max(index-2, 0)];
  }
  return [color, color2];
}

// MENU FUNCTIONS // MENU FUNCTIONS // MENU FUNCTIONS // MENU FUNCTIONS //
// MENU FUNCTIONS // MENU FUNCTIONS // MENU FUNCTIONS // MENU FUNCTIONS //
// MENU FUNCTIONS // MENU FUNCTIONS // MENU FUNCTIONS // MENU FUNCTIONS //

function openNav() {
  document.getElementsByClassName("menu-small")[0].style.height = "100%";
}

function closeNav() {
  document.getElementsByClassName("menu-small")[0].style.height = "0%";
}

function openDropdown(close=null) {
  console.log("CLICK")
  document.body.addEventListener('click', openDropdown, true);
  document.body.addEventListener('scroll', openDropdown, true);
  
  if (document.getElementById("about-me-dropdown").classList.contains("open") || close) {
    document.getElementById("about-me-dropdown").classList.remove("open");
  }
  else {
    document.getElementById("about-me-dropdown").classList.add("open");
  }    
}

// DRAG DROP // DRAG DROP // DRAG DROP // DRAG DROP // DRAG DROP // DRAG DROP //
// DRAG DROP // DRAG DROP // DRAG DROP // DRAG DROP // DRAG DROP // DRAG DROP //
// DRAG DROP // DRAG DROP // DRAG DROP // DRAG DROP // DRAG DROP // DRAG DROP //

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.path[1].id);
}

function swapElements(obj1, obj2) {
  var parent2 = obj2.parentNode;
  var next2 = obj2.nextSibling;
  if (next2 === obj1) {
      parent2.insertBefore(obj1, obj2);
  } else {
      obj1.parentNode.insertBefore(obj2, obj1);
      if (next2) {
          parent2.insertBefore(obj1, next2);
      } else {
          parent2.appendChild(obj1);
      }
  }
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  var origin = document.getElementById(data).children[0];
  var name = ev.path[0].id[1] != "i" ? ev.path[1].id : ev.path[0].id
  var target = document.getElementById(name).children[0];
  swapElements(origin, target);
}

// TIMELINE // TIMELINE // TIMELINE // TIMELINE // TIMELINE // TIMELINE //
// TIMELINE // TIMELINE // TIMELINE // TIMELINE // TIMELINE // TIMELINE //
// TIMELINE // TIMELINE // TIMELINE // TIMELINE // TIMELINE // TIMELINE //

function loadTimeline(name, container) {
  var palette = document.getElementById(container);
  fetch(parentUrl + "/content/" + name).then(response => response.json()).then(function (data) {
      for (var i = 0; i < data.length; i++) {
          card = data[i];
          nextCard = i + 1 < data.length ? data[i + 1] : card;

          date = new Date(card.date);
          nextDate = new Date(nextCard.date);
          date.setYear(card.date.substring(6));
          nextDate.setYear(nextCard.date.substring(6));
          eventLenght = Math.max(Math.round((nextDate.getTime() - date.getTime()) / 800000000), 200);
          
          content = '<div class="m-1" style="display: inline-block; width: ' + eventLenght + 'px;"><div class="card" style="width: ' + eventLenght + 'px"><img src="' + card.image + '" class="card-img-top" style="width: 100%; height:100px; object-fit: cover;"><div class="card-body"><h5 class="card-title">' + card.title + '</h5><p class="card-text">' + card.description + '</p></div><div class="card-footer"><small class="text-muted">'
          if (card.hasOwnProperty("end")) {
            end = new Date(card.end);
            end.setYear(card.end.substring(6));
            content += end.getDate() + "/" + (parseInt(end.getMonth()) + 1) + "/" + end.getFullYear() + ' - '
          }
          content += date.getDate() + "/" + (parseInt(date.getMonth()) + 1) + "/" + date.getFullYear() + '</small></div></div></div>'

          palette.insertAdjacentHTML('beforeEnd', content)
      }
  });
}