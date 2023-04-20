import { createSlice } from "@reduxjs/toolkit";

const initialChatState = {
  messages: JSON.parse(localStorage.getItem('messages')) || [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState: initialChatState,
  reducers: {
    setMessages(state, action) {
      state.messages = action.payload;
      localStorage.setItem('messages', JSON.stringify(action.payload));
    },
  },
});

export const chatActions = chatSlice.actions;

export default chatSlice.reducer;
