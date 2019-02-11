let textTopInput, textBottomInput, textSizeInput, imageInput, generateBtn, memeCanvas, ctx;

const setTextFontSize = (fontSize) => {
  ctx.font = fontSize + 'px Impact';
  ctx.lineWidth = fontSize / 20;
  return ctx;
}

const setTextStyle = () => {
  ctx.textAlign = 'center';
  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'white';
  return ctx;
}

const generateMeme = (img, textTop, textBottom, textSize) => {
    let fontSize;

    memeCanvas.width = img.width;
    memeCanvas.height = img.height;

    ctx.clearRect(0, 0, memeCanvas.width, memeCanvas.height);
    ctx.drawImage(img, 0, 0);

    setTextStyle();
    
    fontSize = memeCanvas.width * textSize;
    setTextFontSize(fontSize);

    // Draw top text
    ctx.textBaseline = 'top';
    textTop.split('\n').forEach((t, i) => {
        ctx.fillText(t, memeCanvas.width / 2, i * fontSize, memeCanvas.width);
        ctx.strokeText(t, memeCanvas.width / 2, i * fontSize, memeCanvas.width);
    });

    // Draw bottom text
    ctx.textBaseline = 'bottom';
    textBottom.split('\n').reverse().forEach((t, i) => { // .reverse() because it's drawing the bottom text from the bottom up
        ctx.fillText(t, memeCanvas.width / 2, memeCanvas.height - i * fontSize, memeCanvas.width);
        ctx.strokeText(t, memeCanvas.width / 2, memeCanvas.height - i * fontSize, memeCanvas.width);
    });
}

const init = () => {
    // Initialize variables
    textTopInput = document.getElementById('text-top');
    textBottomInput = document.getElementById('text-bottom');
    textSizeInput = document.getElementById('text-size-input');
    fileInput = document.getElementById('file-input');
    generateMemeBtn = document.getElementById('generate-meme-btn');
    memeCanvas = document.getElementById('meme-canvas');
    
    ctx = memeCanvas.getContext('2d');

    memeCanvas.width = memeCanvas.height = 0;

    generateMemeBtn.addEventListener('click', function () {
        const reader = new FileReader();
        reader.onload = () => {
          const img = new Image;
          img.src = reader.result;
          generateMeme(img, textTopInput.value, textBottomInput.value, textSizeInput.value);
        };
        reader.readAsDataURL(fileInput.files[0]);
    });
}

init();