// const carre = document.getElementById('square');
// let posX = 0;
// let posY = 0;
// const deplacement = 30;


// document.addEventListener('keydown', (event) => {
//   switch(event.key) {
//     case 'ArrowUp':
//       posY -= deplacement;
//       break;
//     case 'ArrowDown':
//       posY += deplacement;
//       break;
//     case 'ArrowLeft':
//       posX -= deplacement;
//       break;
//     case 'ArrowRight':
//       posX += deplacement;
//       break;
//   }
//   carre.style.top = posY + 'px';
//   carre.style.left = posX + 'px';
// });

// Playground //
// const playground = document.getElementById('playground');

// for (let i = 0; i < 400; i++) {
//   const cell = document.createElement('div');
//   cell.classList.add('case');
//   playground.appendChild(cell);
// }



//V2
// const square = document.getElementById('square');
// const gridSize = 20;
// const cellSize = 30;

// let posX = 0; 
// let posY = 0; 

// function updatePosition() {
//   square.style.left = (posX * cellSize) + 'px';
//   square.style.top = (posY * cellSize) + 'px';
// }

// document.addEventListener('keydown', (e) => {
//   switch(e.key) {
//     case 'ArrowUp':
//       if(posY > 0) posY--;
//       break;
//     case 'ArrowDown':
//       if(posY < gridSize - 1) posY++;
//       break;
//     case 'ArrowLeft':
//       if(posX > 0) posX--;
//       break;
//     case 'ArrowRight':
//       if(posX < gridSize - 1) posX++;
//       break;
//   }
//   updatePosition();
// });

// updatePosition();

// // Obstacle //

// document.addEventListener('DOMContentLoaded', () => {
//     const playground = document.getElementById('playground');
//     const size = 20;
//     const totalCells = size * size;
  
//     const forbiddenIndices = new Set([0, 1, 20, 21]); // indices à exclure
  
//     const gridArray = new Array(totalCells).fill(0);
  
//     // Fonction qui récupère un index libre ALÉATOIRE en excluant forbiddenIndices
//     function getRandomEmptyIndex() {
//       let idx;
//       do {
//         idx = Math.floor(Math.random() * totalCells);
//       } while (gridArray[idx] !== 0 || forbiddenIndices.has(idx));
//       return idx;
//     }
  
//     // Place 100 obstacles destructibles
//     for (let i = 0; i < 100; i++) {
//       const idx = getRandomEmptyIndex();
//       gridArray[idx] = 1;
//     }
  
//     // Place 50 obstacles invulnérables
//     for (let i = 0; i < 50; i++) {
//       const idx = getRandomEmptyIndex();
//       gridArray[idx] = 2;
//     }
  
//     // Création des div cases
//     for (let i = 0; i < totalCells; i++) {
//       const cellDiv = document.createElement('div');
//       cellDiv.classList.add('case');
  
//       if (gridArray[i] === 1) {
//         cellDiv.classList.add('destructible');
//       } else if (gridArray[i] === 2) {
//         cellDiv.classList.add('invulnerable');
//       }
//       playground.appendChild(cellDiv);
//     }
//   });

//  // Collision //
 
//  // Position actuelle du square (ligne, colonne)
// let squareRow = 0;
// let squareCol = 0;

// // Gestion du clavier pour déplacer le square
// document.addEventListener('keydown', (e) => {
//   const key = e.key;
//   let newRow = squareRow;
//   let newCol = squareCol;

//   if (key === 'ArrowUp') newRow--;
//   if (key === 'ArrowDown') newRow++;
//   if (key === 'ArrowLeft') newCol--;
//   if (key === 'ArrowRight') newCol++;

//   // Vérifier que le mouvement reste dans les limites de la grille
//   if (newRow < 0 || newRow >= size || newCol < 0 || newCol >= size) return;

//   const newIndex = newRow * size + newCol;

//   // Vérifie si la case est vide (0 dans gridArray)
//   if (gridArray[newIndex] === 0) {
//     // Mise à jour de la position
//     squareRow = newRow;
//     squareCol = newCol;

//     const square = document.getElementById('square');
//     square.style.top = `${newRow * 30}px`;
//     square.style.left = `${newCol * 30}px`;
//   }
// });

 
//   // Bombe //


// document.addEventListener('keydown', (e) => {
//     if (e.code === 'Space') {
//       poserBombe(squareRow, squareCol);
//     }
//   });

//   function poserBombe(row, col) {
//     const bomb = document.createElement('div');
//     bomb.classList.add('bombe');
//     bomb.style.position = 'absolute';
//     bomb.style.width = '30px';
//     bomb.style.height = '30px';
//     bomb.style.left = `${col * 30}px`;
//     bomb.style.top = `${row * 30}px`;
//     bomb.style.backgroundColor = 'black';
//     bomb.style.borderRadius = '50%';
//     bomb.style.zIndex = 2;
//     playground.appendChild(bomb);
  
//     setTimeout(() => {
//       exploserBombe(row, col);
//       bomb.remove();
//     }, 1000); // 1 seconde avant explosion
//   }
  
//   function exploserBombe(row, col) {
//     const directions = [
//       [0, 0],        // centre
//       [-1, 0],       // haut
//       [1, 0],        // bas
//       [0, -1],       // gauche
//       [0, 1]         // droite
//     ];
  
//     directions.forEach(([dy, dx]) => {
//       const newRow = row + dy;
//       const newCol = col + dx;
  
//       if (
//         newRow >= 0 && newRow < size &&
//         newCol >= 0 && newCol < size
//       ) {
//         const index = newRow * size + newCol;
//         const cell = playground.children[index];
  
//         if (gridArray[index] === 1) {
//           // Détruire un obstacle destructible
//           cell.classList.remove('destructible');
//           gridArray[index] = 0;
//         }
  
//         // TODO : gérer les ennemis ici (à venir)
//       }
//     });
//   }
  
// V3 //

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

  
  
  
  


  