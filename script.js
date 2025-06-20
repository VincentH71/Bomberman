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
      cellDiv.dataset.index = i; // 👈 ajoute un identifiant unique
      if (gridArray[i] === 1) cellDiv.classList.add('destructible');
      if (gridArray[i] === 2) cellDiv.classList.add('invulnerable');
      playground.appendChild(cellDiv);
    }
      // 👉 Appelle la génération des ennemis après la grille
  genererEnnemis();
  });

  function getCellByIndex(index) {
    return playground.querySelector(`.case[data-index='${index}']`);
  }

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

  // if (gridArray[newIndex] === 0) {
  //   squareRow = newRow;
  //   squareCol = newCol;

  //   const square = document.getElementById('square');
  //   square.style.top = `${newRow * 30}px`;
  //   square.style.left = `${newCol * 30}px`;
  // }
  const isFreeCell = gridArray[newIndex] === 0;
const isNotOnEnemy = !ennemis.some(e => e.row === newRow && e.col === newCol);

if (isFreeCell && isNotOnEnemy) {
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
    
      let playerHit = false;
    
      directions.forEach(([dy, dx]) => {
        const newRow = row + dy;
        const newCol = col + dx;
    
        if (
          newRow >= 0 && newRow < size &&
          newCol >= 0 && newCol < size
        ) {
          const index = newRow * size + newCol;
          const cell = getCellByIndex(index);

          // 💥 Ajoute une animation d’explosion visuelle
const explosion = document.createElement('div');
explosion.classList.add('explosion-effect');
explosion.style.left = `${newCol * 30}px`;
explosion.style.top = `${newRow * 30}px`;
playground.appendChild(explosion);

setTimeout(() => {
  explosion.remove();
}, 500);
    
          if (gridArray[index] === 1) {
            cell.classList.add('normalcase');
            cell.classList.remove('destructible');
            gridArray[index] = 0;
          }
    
          // 💀 Supprimer les ennemis
          for (let i = ennemis.length - 1; i >= 0; i--) {
            const ennemi = ennemis[i];
            if (ennemi.row === newRow && ennemi.col === newCol) {
              ennemi.element.remove();
              ennemis.splice(i, 1);
            }
          }
    
          // ☠️ Vérifier si le joueur est touché
          if (squareRow === newRow && squareCol === newCol) {
            playerHit = true;
          }
        }
      });
    
      const messageDiv = document.getElementById('message');
    
      if (playerHit) {
        messageDiv.textContent = " Défaite !";
        messageDiv.style.display = 'block';
        setTimeout(() => {
          messageDiv.style.display = 'none';
          restartGame(); // 🔄 redémarre le jeu
        }, 1000);
        return;
      }
    
      // 🏆 Victoire ?
      if (ennemis.length === 0) {
        messageDiv.textContent = "Victoire ! ";
        messageDiv.style.display = 'block';
        setTimeout(() => {
          messageDiv.style.display = 'none';
          restartGame();
        }, 2000);
      }
    }
  
    // Ennemis //

    const ennemis = [];

    function genererEnnemis(nombre = 10) {
      let count = 0;
      while (count < nombre) {
        const index = Math.floor(Math.random() * totalCells);
        if (gridArray[index] === 0 && !forbiddenIndices.has(index)) {
          const row = Math.floor(index / size);
          const col = index % size;
    
          // Crée un ennemi
          const ennemi = {
            row,
            col,
            element: document.createElement('div')
          };
    
          ennemi.element.classList.add('ennemi');
          ennemi.element.style.position = 'absolute';
          ennemi.element.style.width = '30px';
          ennemi.element.style.height = '30px';
          ennemi.element.style.backgroundColor = 'red';
          ennemi.element.style.left = `${col * 30}px`;
          ennemi.element.style.top = `${row * 30}px`;
          ennemi.element.style.zIndex = 1;
    
          playground.appendChild(ennemi.element);
          ennemis.push(ennemi);
          count++;
        }
      }
    }


// Déplacement ennemis avec blocage sur joueur et défaite si collision quand <= 3 ennemis
function deplacerEnnemis() {
  ennemis.forEach(ennemi => {
    const directions = [
      { dx: 0, dy: -1 }, // haut
      { dx: 0, dy: 1 },  // bas
      { dx: -1, dy: 0 }, // gauche
      { dx: 1, dy: 0 }   // droite
    ];

    const dir = directions[Math.floor(Math.random() * directions.length)];
    const newRow = ennemi.row + dir.dy;
    const newCol = ennemi.col + dir.dx;
    const index = newRow * size + newCol;

    const isInBounds = newRow >= 0 && newRow < size && newCol >= 0 && newCol < size;
    const isFreeCell = gridArray[index] === 0;
    const isNotOnPlayer = !(newRow === squareRow && newCol === squareCol);
    const isNotOnOtherEnemy = !ennemis.some(e => e !== ennemi && e.row === newRow && e.col === newCol);

    if (isInBounds && isFreeCell && isNotOnOtherEnemy && isNotOnPlayer) {
      // Déplacement autorisé
      ennemi.row = newRow;
      ennemi.col = newCol;
      ennemi.element.style.top = `${newRow * 30}px`;
      ennemi.element.style.left = `${newCol * 30}px`;
    } else if (ennemis.length <= 3 && newRow === squareRow && newCol === squareCol) {
      // Défaite si ennemi touche joueur (quand <= 3 ennemis)
      const messageDiv = document.getElementById('message');
      messageDiv.textContent = "Défaite !";
      messageDiv.style.display = 'block';
      setTimeout(() => {
        messageDiv.style.display = 'none';
        restartGame();
      }, 1500);
    }
  });
}
    
    setInterval(deplacerEnnemis, 1000); // déplacement toutes les secondes




    // Restart //

    function restartGame() {
      // Réinitialise la grille
      playground.innerHTML = '<div id="square"></div>';
      gridArray.fill(0);
      ennemis.length = 0;
    
      squareRow = 0;
      squareCol = 0;
    
      const square = document.getElementById('square');
      square.style.top = `0px`;
      square.style.left = `0px`;
    
      // Regénère la grille avec les obstacles
      document.dispatchEvent(new Event('DOMContentLoaded'));
    }
    
  



