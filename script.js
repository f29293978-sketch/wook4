const container = document.getElementById('puzzle-container');
const message = document.getElementById('message');
const winScreen = document.getElementById('win-screen');
let pieces = [];
let level = 1;
const maxLevel = 8;
let baseColor, diffColor, diffIndex;
let colors = [];

function init() {
  for (let i = 0; i < 64; i++) {
    const piece = document.createElement('div');
    piece.className = 'puzzle-piece';
    piece.addEventListener('click', () => checkClick(i));
    pieces.push(piece);
    container.appendChild(piece);
  }
  createLevel();
}

function createLevel() {
  // 生成基礎顏色
  const hue = Math.random() * 360;
  const saturation = 70;
  const lightness = 50;
  baseColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  // 不同顏色：根據關卡調整差異
  const diffAmount = 30 / level; // 關卡越高，差異越小
  const diffHue = hue + (Math.random() > 0.5 ? diffAmount : -diffAmount);
  diffColor = `hsl(${diffHue}, ${saturation}%, ${lightness}%)`;

  // 隨機不同色塊位置
  diffIndex = Math.floor(Math.random() * 64);

  for (let i = 0; i < 64; i++) {
    pieces[i].style.backgroundColor = i === diffIndex ? diffColor : baseColor;
  }

  message.style.display = 'block';
  message.textContent = `第 ${level} 題`;
}

function checkClick(clicked) {
  if (clicked === diffIndex) {
    colors.push(diffColor);
    document.body.style.background = `linear-gradient(to right, ${colors.join(', ')})`;
    level++;
    if (level > maxLevel) {
      winScreen.style.display = 'flex';
    } else {
      createLevel();
    }
  } else {
    alert('錯了，再試一次！');
  }
}

init();