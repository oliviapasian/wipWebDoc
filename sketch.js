
//this code is terrible i will fix it for the final

// references:
// https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie (for document.cookie)


let buttonContainer;
let collectedTime = '';

function setup() {
  noCanvas();

  buttonContainer = document.getElementById('buttonContainer');

  let acceptButton = createButton('I AGREE');
  acceptButton.parent(buttonContainer);
  acceptButton.mousePressed(startDoc);
  acceptButton.style('background-color', '#020d29');
  acceptButton.style('border', 'none');
  acceptButton.style('font-family', 'barlow');
  acceptButton.style('font-size', '18px');
  acceptButton.style('padding', '10px');
  acceptButton.style('color', '#f134ee');

}

function draw() {

}

function startDoc() {
  let currentTime = getFormattedTimeInEST();

  document.cookie = `buttonClick=${currentTime}; path=/; max-age=3600`; // cookie expires in 1 hour
  console.log('cookie collected:', currentTime);

  collectedTime = currentTime;

  buttonContainer.classList.add("fadeout");

  let areYouSureText = document.getElementById('areYouSureText');
  areYouSureText.classList.add('fadeInOut');

  areYouSureText.addEventListener('animationend', () => {
    let collectedTimeText = document.getElementById('collectedTimeText');
    collectedTimeText.insertAdjacentHTML('beforeend', `<p><b>You came onto the website at this time: <br> ${collectedTime}</b></p> <p>Wonder what else I collected...?</p>`);
    collectedTimeText.classList.add('fadeIn');

    collectedTimeText.addEventListener('animationend', () => {
      let introEnd = document.querySelector('.introduction');
      introEnd.classList.add('fadeout');
    }, { once: true });

  }, { once: true });
}

function getFormattedTimeInEST() {
  let timeOptions = {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };
  let formatter = new Intl.DateTimeFormat('en-US', timeOptions);
  return formatter.format(new Date());
}
