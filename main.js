class Keybord {
  constructor(id, name, comment, imgUrl) {
    this.id = id;
    this.name = name;
    this.comment = comment;
    this.imgUrl = imgUrl;
  }
}

const itemBox = [
  new Keybord(1, 'keychron K2', "It's a very cool keybord!!", 'https://source.unsplash.com/KYw1eUx1J7Y'),
  new Keybord(2, 'A cool computer', "It's a very cool pc!!", 'https://source.unsplash.com/TxXuh_hAFd8'),
  new Keybord(3, 'Office PC', 'black pc is cool', 'https://source.unsplash.com/2nCeVeFWA_c'),
  new Keybord(4, 'ubuntu', 'I use ubuntu for my main OS', 'https://source.unsplash.com/xbEVM6oJ1Fs'),
  new Keybord(5, 'linux', 'I want to master how to use linux', 'https://source.unsplash.com/Tjbk79TARiE'),
  new Keybord(6, 'nature', 'Nature makes me relax', 'https://source.unsplash.com/NRQV-hBF10M'),
  new Keybord(7, 'nature', 'Nature makes me relax', 'https://source.unsplash.com/M6XC789HLe8'),
  new Keybord(8, 'forest', 'Forest makes me happy', 'https://source.unsplash.com/sp-p7uuT0tw'),
  new Keybord(9, 'sea', 'I want to go to sea and swim in', 'https://source.unsplash.com/KMn4VEeEPR8'),
  new Keybord(10, 'keychron K2', "It's a very cool keybord!!", 'https://source.unsplash.com/KYw1eUx1J7Y'),
  new Keybord(11, 'A cool computer', "It's a very cool pc!!", 'https://source.unsplash.com/TxXuh_hAFd8'),
  new Keybord(12, 'Office PC', 'black pc is cool', 'https://source.unsplash.com/2nCeVeFWA_c'),
  new Keybord(13, 'ubuntu', 'I use ubuntu for my main OS', 'https://source.unsplash.com/xbEVM6oJ1Fs'),
  new Keybord(14, 'linux', 'I want to master how to use linux', 'https://source.unsplash.com/Tjbk79TARiE'),
  new Keybord(15, 'nature', 'Nature makes me relax', 'https://source.unsplash.com/NRQV-hBF10M'),
  new Keybord(16, 'nature', 'Nature makes me relax', 'https://source.unsplash.com/M6XC789HLe8'),
  new Keybord(17, 'forest', 'Forest makes me happy', 'https://source.unsplash.com/sp-p7uuT0tw'),
  new Keybord(18, 'sea', 'I want to go to sea and swim in', 'https://source.unsplash.com/KMn4VEeEPR8'),
];

let sliderShow = document.createElement('div');
let main = document.createElement('div');
let extra = document.createElement('div');
const warning = document.createElement('div');

sliderShow.classList.add('d-flex', 'flex-nowrap', 'overflow-hiddens');
main.classList.add('main__img');
extra.classList.add('extra__img');
warning.classList.add('warning');

main.style.backgroundImage = 'url(' + itemBox[0].imgUrl + ')';
main.setAttribute('data-index', '1');
extra.style.backgroundImage = 'url(' + itemBox[1].imgUrl + ')';
sliderShow.append(main);
sliderShow.append(extra);

const number = document.getElementById('number');
const name = document.getElementById('name');
const comment = document.getElementById('comment');

number.innerHTML = 1;
name.innerHTML = itemBox[0].name;
comment.innerHTML = itemBox[0].comment;

const target = document.getElementById('target');
target.append(sliderShow);
target.append(warning);

const numberBtns = document.querySelectorAll('.btn-number');
const meter = document.getElementById('meter');
const clear = document.getElementById('clear');
const submit = document.getElementById('submit');
submit.disabled = true;
meter.innerHTML = 1;

// ???????????????????????????
numberBtns.forEach((btn) => {
  btn.addEventListener('click', function () {
    meter.innerHTML += btn.innerHTML;
  });
});

clear.addEventListener('click', function () {
  changeDisabledBtn();
  meter.innerHTML = '';
  warning.innerHTML = '';
});

submit.addEventListener('click', function () {
  changeDisabledBtn();
  const currentIndex = parseInt(main.getAttribute('data-index'));
  const nextIndex = parseInt(meter.innerHTML);

  if (nextIndex > itemBox.length) {
    warning.innerHTML = `?????????????????????${itemBox.length}??????`;
    console.log(`?????????????????????${itemBox.length}??????`);
    return;
  }

  main.setAttribute('data-index', nextIndex.toString());
  animateMain(currentIndex, nextIndex);
});

// ??????????????????
function animateMain(currentIndex, nextIndex) {
  const currentElement = itemBox[currentIndex - 1];
  const nextElement = itemBox[nextIndex - 1];

  main.innerHTML = '';
  main.style.backgroundImage = 'url(' + nextElement.imgUrl + ')';

  extra.innerHTML = '';
  extra.style.backgroundImage = 'url(' + currentElement.imgUrl + ')';

  number.innerHTML = nextElement.id;
  name.innerHTML = nextElement.name;
  comment.innerHTML = nextElement.comment;

  main.classList.add('expand-animation');
  extra.classList.add('deplete-animation');

  animationType = defineDirection(currentIndex, nextIndex);

  if (animationType === 'right') {
    sliderShow.innerHTML = '';
    sliderShow.append(extra);
    sliderShow.append(main);
  } else if (animationType === 'left') {
    sliderShow.innerHTML = '';
    sliderShow.append(main);
    sliderShow.append(extra);
  }
}

// submit, clear????????????????????????
function changeDisabledBtn() {
  if (submit.disabled == false) {
    submit.disabled = true;
    clear.disabled = false;
  } else {
    clear.disabled = true;
    submit.disabled = false;
  }
}

function defineDirection(currentIndex, nextIndex) {
  let rc;
  let lc;
  if (currentIndex > nextIndex) {
    rc = itemBox.length + nextIndex - currentIndex;
    lc = currentIndex - nextIndex;
  } else {
    rc = nextIndex - currentIndex;
    lc = currentIndex + itemBox.length - nextIndex;
  }
  return rc > lc ? 'left' : 'right';
}
