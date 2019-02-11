var textTopInput, textBottomInput, textTopSizeInput, textBottomSizeInput, imageInput, generateBtn, memeCanvas, ctx;

var setTextFontSize = function setTextFontSize(fontSize) {
  ctx.font = fontSize + 'px Impact';
  ctx.lineWidth = fontSize / 20;
  return ctx;
};

var setTextStyle = function setTextStyle() {
  ctx.textAlign = 'center';
  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'white';
  return ctx;
};

var generateMeme = function generateMeme(img, textTop, textBottom, textTopSize, textBottomSize) {
  var fontSize;
  memeCanvas.width = img.width;
  memeCanvas.height = img.height;
  ctx.clearRect(0, 0, memeCanvas.width, memeCanvas.height);
  ctx.drawImage(img, 0, 0);
  setTextStyle();
  fontSize = memeCanvas.width * textTopSize;
  setTextFontSize(fontSize);
  fontSize = memeCanvas.width * textBottomSize;
  setTextFontSize(fontSize); // Draw top text

  ctx.textBaseline = 'top';
  textTop.split('\n').forEach(function (t, i) {
    ctx.fillText(t, memeCanvas.width / 2, i * fontSize, memeCanvas.width);
    ctx.strokeText(t, memeCanvas.width / 2, i * fontSize, memeCanvas.width);
  }); // Draw bottom text

  ctx.textBaseline = 'bottom';
  textBottom.split('\n').reverse().forEach(function (t, i) {
    // .reverse() because it's drawing the bottom text from the bottom up
    ctx.fillText(t, memeCanvas.width / 2, memeCanvas.height - i * fontSize, memeCanvas.width);
    ctx.strokeText(t, memeCanvas.width / 2, memeCanvas.height - i * fontSize, memeCanvas.width);
  });
};

var init = function init() {
  // Initialize variables
  textTopInput = document.getElementById('text-top');
  textBottomInput = document.getElementById('text-bottom');
  textTopSizeInput = document.getElementById('text-top-size-input');
  textBottomSizeInput = document.getElementById('text-bottom-size-input');
  fileInput = document.getElementById('file-input');
  generateMemeBtn = document.getElementById('generate-meme-btn');
  memeCanvas = document.getElementById('meme-canvas');
  ctx = memeCanvas.getContext('2d');
  memeCanvas.width = memeCanvas.height = 0;
  generateMemeBtn.addEventListener('click', function () {
    var reader = new FileReader();

    reader.onload = function () {
      var img = new Image();
      img.src = reader.result;
      generateMeme(img, textTopInput.value, textBottomInput.value, textTopSizeInput.value, textBottomSizeInput.value);
    };

    reader.readAsDataURL(fileInput.files[0]);
  });
};

init();