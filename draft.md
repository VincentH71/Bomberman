Voici le code complet de mon projet de jeu Bomberman en JavaScript. J'ai un problème : je veux que lorsque la bombe explose, les cases destructibles dans la zone d'explosion prennent la classe "normalcase" et perdent la classe "destructible". Peux-tu s'il te plaît identifier dans le code où se trouve le problème ?

```html 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Welcome to BomberCity</h1>
    <div id="playground">
        <div id="square"></div>
    </div>    
<script src="script.js"></script>
</body>
</html>
```
```css 
#playground{
    width: 600px;
    height: 600px;
    border: 5px black solid;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(20, 30px);
    grid-template-rows: repeat(20, 30px);
    position: relative;
}

.case {
    background-color: #ddd;
    border: 1px solid #aaa;
    width: 30px;
    height: 30px;
    box-sizing: border-box;
}

#square{
  width: 30px;
  height: 30px;
  background-color: blue;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50px;
}

.destructible {
    background-color: #cc9435; 
  }
  
.invulnerable {
    background-color: #3a2e1aac; /* rouge foncé */
  }

  .bombe {
    transition: all 0.2s;
    box-shadow: 0 0 10px 3px red;
    background-color: #000;
  }

  h1{
    text-align: center;
  }

.normalcase{
  background-color: #ddd;
}
  
```
```js 
// Variables //
const size = 20;
const totalCells = size * size;
const gridArray = new Array(totalCells).fill(0);
const forbiddenIndices = new Set([0, 1, 20, 21]);
const playground = document.getElementById('playground');

// Génération Obstacle //
document.addEventListener('DOMContentLoaded', () => {
    function getRandomEmptyIndex() {
      let idx;
      do {
        idx = Math.floor(Math.random() * totalCells);
      } while (gridArray[idx] !== 0 || forbiddenIndices.has(idx));
      return idx;
    }
  
    for (let i = 0; i < 100; i++) {
      const idx = getRandomEmptyIndex();
      gridArray[idx] = 1;
    }
  
    for (let i = 0; i < 50; i++) {
      const idx = getRandomEmptyIndex();
      gridArray[idx] = 2;
    }
  
    for (let i = 0; i < totalCells; i++) {
      const cellDiv = document.createElement('div');
      cellDiv.classList.add('case');
      if (gridArray[i] === 1) cellDiv.classList.add('destructible');
      if (gridArray[i] === 2) cellDiv.classList.add('invulnerable');
      playground.appendChild(cellDiv);
    }
  });

  // Déplacement avec collision //
  let squareRow = 0;
let squareCol = 0;

document.addEventListener('keydown', (e) => {
  const key = e.key;
  let newRow = squareRow;
  let newCol = squareCol;

  if (key === 'ArrowUp') newRow--;
  if (key === 'ArrowDown') newRow++;
  if (key === 'ArrowLeft') newCol--;
  if (key === 'ArrowRight') newCol++;

  if (newRow < 0 || newRow >= size || newCol < 0 || newCol >= size) return;

  const newIndex = newRow * size + newCol;

  if (gridArray[newIndex] === 0) {
    squareRow = newRow;
    squareCol = newCol;

    const square = document.getElementById('square');
    square.style.top = `${newRow * 30}px`;
    square.style.left = `${newCol * 30}px`;
  }
});

// Bombes //

 document.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        poserBombe(squareRow, squareCol);
      }
    });
  
    function poserBombe(row, col) {
      const bomb = document.createElement('div');
      bomb.classList.add('bombe');
      bomb.style.position = 'absolute';
      bomb.style.width = '30px';
      bomb.style.height = '30px';
      bomb.style.left = `${col * 30}px`;
      bomb.style.top = `${row * 30}px`;
      bomb.style.backgroundColor = 'black';
      bomb.style.borderRadius = '50%';
      bomb.style.zIndex = 2;
      playground.appendChild(bomb);
    
      setTimeout(() => {
        exploserBombe(row, col);
        bomb.remove();
      }, 1000); // 1 seconde avant explosion
    }
    
    function exploserBombe(row, col) {
      const directions = [
        [0, 0],        // centre
        [-1, 0],       // haut
        [1, 0],        // bas
        [0, -1],       // gauche
        [0, 1]         // droite
      ];
    
      directions.forEach(([dy, dx]) => {
        const newRow = row + dy;
        const newCol = col + dx;
    
        if (
          newRow >= 0 && newRow < size &&
          newCol >= 0 && newCol < size
        ) {
          const index = newRow * size + newCol;
          const cell = playground.children[index];
    
          if (gridArray[index] === 1) {
            // Détruire un obstacle destructible
            cell.classList.add('normalcase');
            cell.classList.remove('destructible');
            gridArray[index] = 0;
          }
        }
      });
    }
```