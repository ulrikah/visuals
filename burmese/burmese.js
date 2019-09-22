// Measuring text width:
// https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript


/* Language resources 

https://www.unicode.org/faq/myanmar.html
http://unicode.org/charts/PDF/U1000.pdf
http://unicode.org/notes/tn11/UTN11_3.pdf

*/

// Burmese unicode chars
// 1000 - 109F (hex) = 4096 - 4255 (dec)

const container = document.querySelector('#container')

const h = window.innerHeight;
const w = window.innerWidth;

const fSize = parseInt(getComputedStyle(container).fontSize.replace('px', ''))


function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function printChars(){
  for (let i = 0; i < 1000; i ++){
    const hex = randInt(4096, 4125)
    const c = String.fromCharCode(hex)
    container.innerText += c
    // await sleep(i) // cool acceleration effect
    await sleep(randInt(10, 500))
  }
}

printChars()