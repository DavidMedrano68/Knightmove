import Queue from "./queue.js";
import Node from "./node.js";

Array.prototype.isTheSame = function (arr) {
  if (this[0] == arr[0] && this[1] == arr[1]) {
    return true;
  }
  return false;
};

function knightMove(startArr, endArr) {
  const q = new Queue();
  q.enqueue(new Node(startArr, [startArr]));
  let current = q.dequeue();

  while (!current.cord.isTheSame(endArr)) {
    let moves = possibleMoves(current.cord);
    moves.forEach((move) => {
      let node = new Node(move, current.path.concat([move]));
      q.enqueue(node);
    });
    current = q.dequeue();
  }
  console.log(
    `you've made it in ${current.path.length - 1} steps ${createPath(
      current.path
    )}`
  );
}

function filterXY(arr) {
  const x = arr[0];
  const y = arr[1];
  if (x < 0 || y < 0) {
    return null;
  }
  if (x > 7 || y > 7) {
    return null;
  } else {
    return [x, y];
  }
}

function possibleMoves(startArr) {
  const x = startArr[0];
  const y = startArr[1];
  let topRight = filterXY([x + 1, y + 2]);
  let topLeft = filterXY([x - 2, y + 2]);
  let rightTop = filterXY([x + 2, y + 1]);
  let rightBottom = filterXY([x + 2, y - 1]);
  let leftTop = filterXY([x - 2, y + 1]);
  let leftBottom = filterXY([x - 2, y - 1]);
  let bottomRight = filterXY([x + 1, y - 2]);
  let bottomLeft = filterXY([x - 1, y - 2]);
  let possibleMovesArray = [
    topRight,
    topLeft,
    rightTop,
    rightBottom,
    leftTop,
    leftBottom,
    bottomRight,
    bottomLeft,
  ];
  return possibleMovesArray.filter((item) => {
    return item != null;
  });
}

function createPath(arr) {
  let newString = "";
  arr.forEach((cord) => {
    newString = newString + `[${cord}] => `;
  });
  return `Your path: ${newString.substring(0, newString.length - 3)}`;
}

knightMove([1, 1], [7, 3]);
