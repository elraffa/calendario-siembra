const form = document.getElementById('form-select');

// Submit event
form.addEventListener('submit', (e) => {
  e.preventDefault();
  // Clear Selection
  document.querySelector('.selection').innerHTML = '';
  let valuvas = (document.querySelector('.valuvas').innerHTML = '');
  const hemisferio = document.getElementById('hemisferio').value;
  const mes = document.getElementById('mes').value;
  console.log(hemisferio);
  if (hemisferio == 0 || hemisferio == 1 || mes == 0) {
    document.querySelector(
      '.selection'
    ).innerHTML = `Tenés que elegir Hemisferio y Mes.`;
  } else {
    document.querySelector(
      '.selection'
    ).innerHTML = `<p>OK. Esto es lo que podés sembrar en el <span class='bold'>Hemisferio ${hemisferio}</span> en <span class='bold'>${mes}</span>: </br><p class='light'>Pasá por encima de cada tarjeta (o tap en celular) para más detalles</p>
    <p class='small'>(<span class='bold'>Fuente: </span><a href="http://prohuerta.inta.gob.ar/">ProHuerta - INTA</a>)</p>
    `;

    // Fetch json
    fetch('js/calendar.json')
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        let choice = myJson[hemisferio][mes];

        let verduras = myJson['valuvas'];
        choice.map((e) => {
          for (var key in verduras) {
            if (e === key) {
              document.querySelector('.valuvas').innerHTML += `
              <div class='flip-card'>
                <div class='flip-card-inner'>
                  <div class='valuva' height=350> 
                    <h3 class='name'>${e}</h3><br> 
                    <img src="images/${myJson['valuvas'][key]['img']}" width=200 /> <br>
                    ${myJson['valuvas'][key]['description']}<br>
                    ${myJson['valuvas'][key]['consejos']}<br>
                  </div>
                  <div class='flip-card-back'>
                  <h3 class='name'>${e}</h3><br>
                    <p class='back-text'><span class='bold'><i class='fas fa-seedling'></i> Familia:</span> ${myJson['valuvas'][key]['familia']}<br></p>
                    <p class='back-text'><span class='bold'><i class="fas fa-ruler-horizontal"></i> Distancia entre plantas: </span>${myJson['valuvas'][key]['distancia']} cm<br></p>
                    <p class='back-text'><span class='bold'><i class="fas fa-icicles"></i> Heladas: </span>${myJson['valuvas'][key]['heladas']}<br></p>
                    <p class='back-text'><span class='bold'><i class="fas fa-heart"></i> Asociar con: </span>${myJson['valuvas'][key]['asociacion']}<br></p>
                    <p class='back-text'><span class='bold'><i class="fas fa-eye"></i> Dificultad: </span>${myJson['valuvas'][key]['dificultad']}<br></p>
                  </div>
                </div>  
              </div> 
              `;
            }
          }
        });
      })
      .catch(function (error) {
        console.error(error, 'Hubo un error');
      });
  }
});

form.addEventListener('reset', (e) => {
  e.preventDefault();
  document.querySelector('.selection').innerHTML = '';
  document.querySelector('.valuvas').innerHTML = '';
});

// Select

var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName('custom-select');
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName('select')[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement('DIV');
  a.setAttribute('class', 'select-selected');
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement('DIV');
  b.setAttribute('class', 'select-items select-hide');
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement('DIV');
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener('click', function (e) {
      /* When an item is clicked, update the original select box,
        and the selected item: */
      var y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName('select')[0];
      sl = s.length;
      h = this.parentNode.previousSibling;
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName('same-as-selected');
          yl = y.length;
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute('class');
          }
          this.setAttribute('class', 'same-as-selected');
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener('click', function (e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle('select-hide');
    this.classList.toggle('select-arrow-active');
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x,
    y,
    i,
    xl,
    yl,
    arrNo = [];
  x = document.getElementsByClassName('select-items');
  y = document.getElementsByClassName('select-selected');
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove('select-arrow-active');
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add('select-hide');
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener('click', closeAllSelect);
