import { createSlice } from "@reduxjs/toolkit";

const initialChatState = {
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState: initialChatState,
  reducers: {
    setMessages(state,action) {
        console.log(action.payload);
        state.messages = action.payload;
    }
  },
});

export const chatActions = chatSlice.actions;

export default chatSlice.reducer;
