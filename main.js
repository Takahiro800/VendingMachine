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
  new Keybord(2, 'keychron K3', "It's a very cool pc!!", 'https://source.unsplash.com/TxXuh_hAFd8'),
  new Keybord(3, 'keychron K4', '3', 'https://source.unsplash.com/KYw1eUx1J7Y'),
  new Keybord(4, 'keychron K5', '4', 'https://source.unsplash.com/TxXuh_hAFd8'),
];

let sliderShow = document.createElement('div');
let main = document.createElement('div');
let extra = document.createElement('div');

sliderShow.classList.add('d-flex', 'flex-nowrap', 'overflow-hiddens');
main.classList.add('main__img');
extra.classList.add('extra__img');

// main.append(itemBox[0]);
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

function slideJump(steps, animationType) {
  let index = parseInt(main.getAttribute('data-index'));
  let currentElement = itemBox[index];

  index += steps;

  if (index < 0) {
    index = itemBox.length - 1;
  } else if (index >= itemBox.length) {
    index = 0;
  }

  let nextElement = itemBox[index];
  main.setAttribute('data-index', index.toString());
  animateMain(currentElement, nextElement, animationType);
}

function animateMain(currentElement, nextElement, animationType) {
  main.innerHTML = '';
  // main.append(nextElement);
  main.style.backgroundImage = 'url(' + nextElement.imgUrl + ')';

  extra.innerHTML = '';
  // extra.append(currentElement);
  extra.style.backgroundImage = 'url(' + currentElement.imgUrl + ')';

  number.innerHTML = nextElement.id;
  name.innerHTML = nextElement.name;
  comment.innerHTML = nextElement.comment;

  main.classList.add('expand-animation');
  extra.classList.add('deplete-animation');

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

const leftBtn = document.getElementById('1');
const rightBtn = document.getElementById('2');

// leftBtn.addEventListener('click', function () {
//   slideJump(-1, 'left');
// });
// rightBtn.addEventListener('click', function () {
//   slideJump(+1, 'right');
// });

const numberBtns = document.querySelectorAll('.btn-number');
const meter = document.getElementById('meter');
const clear = document.getElementById('clear');
const submit = document.getElementById('submit');
submit.disabled = true;
meter.innerHTML = 1;

numberBtns.forEach((btn) => {
  btn.addEventListener('click', function () {
    meter.innerHTML += btn.innerHTML;
  });
});

function changeDisabledBtn() {
  if (submit.disabled == false) {
    submit.disabled = true;
    clear.disabled = false;
  } else {
    clear.disabled = true;
    submit.disabled = false;
  }
}

function isNextElement(index) {
  if (index > itemBox.length) {
    name.innerHTML = `現在の登録数は${itemBox.length}です`;
  }
}

clear.addEventListener('click', function () {
  changeDisabledBtn();
  meter.innerHTML = '';
});

submit.addEventListener('click', function () {
  changeDisabledBtn();
  const currentIndex = parseInt(main.getAttribute('data-index'));
  const nextIndex = meter.innerHTML;

  isNextElement(nextIndex);

  const currentElement = itemBox[currentIndex - 1];
  const nextElement = itemBox[nextIndex - 1];

  main.setAttribute('data-index', nextIndex.toString());
  animateMain(currentElement, nextElement, 'right');
});
