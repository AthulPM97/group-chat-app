const { createSlice } = require("@reduxjs/toolkit");

const groupSlice = createSlice({
  name: "group",
  initialState: {
    myGroups: [],
    myGroupMessages: [],
  },
  reducers: {
    setMygroups(state, action) {
      state.myGroups = [...action.payload];
    },
    setMyGroupMessages(state, action) {
      state.myGroupMessages = [...action.payload];
    },
  },
});

export const groupActions = groupSlice.actions;

export default groupSlice.reducer;
