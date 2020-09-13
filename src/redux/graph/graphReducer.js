import { Set_AS_WALL } from "./graphTypes";

let DataSize = 1000;
console.log("Initializing data", DataSize);
let ar = [];
let leng = DataSize;
for (let i = 0; i < leng; i++) {
  ar[i] = [];
  for (let j = 0; j < leng; j++) {
    ar[i][j] = 1;
    if (i == 0 || j == 0) {
      ar[i][j] = 0;
    }
  }
}
// ar[3][3] = 6;
console.log(DataSize);
const initialState = {
  size: DataSize,
  graph: [...ar],
};

const graphReducer = (state = initialState, action) => {
  switch (action.type) {
    case Set_AS_WALL: {
      let graph = state.graph;
      const { i, j } = action.payload;
      graph[i][j] = graph[i][j] !== 0 ? 0 : 1;
      return {
        ...state,
        graph,
      };
    }
    default:
      return state;
  }
};

export default graphReducer;
