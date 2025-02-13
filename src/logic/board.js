
export const checkWinner = (boardToCheck,lastTurn) => {
    const ROWS = 6;
    const COLS = 7;
    let counter = 0

    //BUSCAR EN VERTICAL
    for (let column1 = 0; column1 <= 6 && counter<4; column1++){
      for (let row1 = column1; row1<=boardToCheck.length && counter<4; row1+=7) {
        if (boardToCheck[row1] === lastTurn) {
          counter++
          if (counter === 4) return true
        } else {
          counter = 0;
        }
      }
      counter = 0
    }

    //BUSCAR EN HORIZONTAL
    for (let row2 = 0; row2 < boardToCheck.length && counter<4; row2+=7){
      for (let column2 = row2; column2<=row2+6 && counter<4; column2++){
        if(boardToCheck[column2] === lastTurn) {
          counter++
          if (counter === 4) return true
        }else{
          counter = 0;
        }
      } 
      counter = 0
    }  

    //BUSCAR EN DIAGONAL HACIA LA DERECHA
    for (let row = 0; row <= ROWS - 4; row++) { //evitar filas que no tengan espacio para 4 fichas
      for (let col = 0; col <= COLS - 4; col++) { //evitar columnas sin espacio hacia la derecha
        let index = row * COLS + col; //obtener un indice del array
        counter = 0;

        for (let i = 0; i < 4; i++) { //recorrer 4 posiciones en diagonal
          if(boardToCheck[index + i * 8] === lastTurn){
            counter++;
            if (counter === 4) return true
          }else{
            counter = 0;
          }
        }
      }
    }

    //BUSCAR EN DIAGONAL HACIA LA IZQUIERDA
    for (let row = 0; row <= ROWS - 4; row++) { //evitar filas sin espacio para 4 fichas
      for (let col = 3; col < COLS; col++) { //evitar columnas sin espacio hacia la izquierda
        let index = row * COLS + col;
        counter = 0;

        for (let i = 0; i < 4; i++) { //recorrer 4 posiciones en diagonal
          if(boardToCheck[index + i * 6] === lastTurn){
            counter++;
            if (counter === 4) return true
          }else{
            counter = 0;
          }
        }
      }
    }

    return false;
}

export const checkTie = (boardToCheck) => {
    return boardToCheck.every((square) => square != null)
}
