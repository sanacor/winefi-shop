import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import winefiAPI from '../../utils/winefiAPI'

const name = "auth";

export const loginTry = createAsyncThunk(
    `${name}/signinAction`, // 액션 이름을 정의해 주도록 합니다.
    async ({username, password, fcmToken}, thunkAPI) => {
        const response = await winefiAPI.signin(username, password, fcmToken);
        return response
    }
)


const loginSlice = createSlice({
  name: "signin",
  initialState: {
    loading : 'idle',
    isSignedIn : false,
    user : null,
  },
  reducers: {
      /*
    addTodo(state, action) {
      const { id, text } = action.payload
      state.push({ id, text, completed: false })
    },
    toggleTodo(state, action) {
      const todo = state.find(todo => todo.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    }
    */
  },
  extraReducers : {
      [loginTry.pending.type] : (state, action) => {
        //호출전
        console.log("Before Login Try");
      },
      [loginTry.fulfilled.type] : (state, action) => {
        //성공
        state.isSignedIn = true;
        console.log("OONI" , action);
        state.user = JSON.stringify(action.payload);
        //localStorage.setItem("user", JSON.stringify(action.payload));
      },
      [loginTry.rejected.type] : (state, action) => {
        console.log("LOGIN FAIL");
        console.log(action.payload);
        //실패
      }
  }
})

//export const { addTodo, toggleTodo } = loginSlice.actions

export default loginSlice.reducer