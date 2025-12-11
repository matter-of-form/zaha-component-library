import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { HYDRATE } from "next-redux-wrapper";

const indexSlice = createSlice({
  name: "app",
  initialState: {
    pageId: null,
    isRobot: false,
  },
  reducers: {
    setPageId: (state, action) => {
      state.pageId = action.payload;
    },
    setRobot: (state, action) => {
      state.isRobot = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return (state = {
        ...state,
        ...action.payload.app,
      });
    });
  },
});

export const store = () =>
  configureStore({
    reducer: {
      app: indexSlice.reducer,
    },
  });

export const { setPageId, setRobot } = indexSlice.actions;
export const wrapper = createWrapper(store, { debug: false });

export const selectPageId = (state) => state.app.pageId;
export const selectIsRobot = (state) => state.app.isRobot;
