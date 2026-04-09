const container = document.getElementById('puzzle-container');
const message = document.getElementById('message');
let pieces = [];
let emptyIndex = 8;

function createPuzzle() {
  for (let i = 0; i < 9; i++) {
    const piece = document.createElement('div');
    piece.className = 'puzzle-piece';
    if (i < 8) {
      piece.style.backgroundPosition = `-${(i % 3) * 100}px -${Math.floor(i / 3) * 100}px`;
    } else {
      piece.style.backgroundImage = 'none';
    }
    piece.addEventListener('click', () => movePiece(i));
    pieces.push(piece);
    container.appendChild(piece);
  }
  shuffle();
}

function shuffle() {
  for (let i = 0; i < 100; i++) {
    const neighbors = getNeighbors(emptyIndex);
    if (neighbors.length > 0) {
      const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
      swap(emptyIndex, randomNeighbor);
    }
  }
}

function getNeighbors(index) {
  const row = Math.floor(index / 3);
  const col = index % 3;
  const neighbors = [];
  if (row > 0) neighbors.push(index - 3);
  if (row < 2) neighbors.push(index + 3);
  if (col > 0) neighbors.push(index - 1);
  if (col < 2) neighbors.push(index + 1);
  return neighbors;
}

function movePiece(index) {
  if (getNeighbors(emptyIndex).includes(index)) {
    swap(emptyIndex, index);
    emptyIndex = index;
    checkWin();
  }
}

function swap(i, j) {
  const tempPos = pieces[i].style.backgroundPosition;
  const tempImg = pieces[i].style.backgroundImage;
  pieces[i].style.backgroundPosition = pieces[j].style.backgroundPosition;
  pieces[i].style.backgroundImage = pieces[j].style.backgroundImage;
  pieces[j].style.backgroundPosition = tempPos;
  pieces[j].style.backgroundImage = tempImg;
}

function checkWin() {
  for (let i = 0; i < 8; i++) {
    const expected = `-${(i % 3) * 100}px -${Math.floor(i / 3) * 100}px`;
    if (pieces[i].style.backgroundPosition !== expected) return;
  }
  message.style.display = 'block';
}

createPuzzle();