import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import winefiAPI from '../../utils/winefiAPI'

const name = "auth";

export const loginTry = createAsyncThunk(
    `${name}/signinAction`, // 액션 이름을 정의해 주도록 합니다.
    async ({username, password, fcmToken}, thunkAPI) => {
      const response = await winefiAPI.signin(username, password, fcmToken).catch(e => {
        //console.log("TEST");
        //console.log(e.response.data);
        throw {
          message: e.response.data.msg,
          name:e.name,
          stack:e.stack
        };
      });
      return response
    }
)

const initialState = {
    isSignedIn : false,
    user : null,
    fcmToken : "",
  }


const loginSlice = createSlice({
  name: "signin",
  initialState,
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
   setFcmToken(state,action) {
     state.fcmToken = action.payload;
     console.log("In setFcmToken ", action.payload);
   }
  },
  extraReducers : {
      [loginTry.pending.type] : (state, action) => {
        //호출전
        console.log("Before Login Try", current(state), action);
      },
      [loginTry.fulfilled.type] : (state, action) => {
        //성공
        console.log("LOGIN SUCCESS", action.payload);
        return {
            ...state,
            isSignedIn : true,
            user : action.payload
        }
      },
      [loginTry.rejected.type] : (state, action) => {
        //console.log("LOGIN FAIL");
        //console.log(action);
        //console.log(JSON.stringify(action));
        throw action.error.message;
      }
  }
})

export const { setUserInfo, setFcmToken } = loginSlice.actions

export default loginSlice.reducer