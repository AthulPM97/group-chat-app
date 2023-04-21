const { createSlice } = require("@reduxjs/toolkit");

const groupSlice = createSlice({
  name: "group",
  initialState: {
    myGroups: [],
  },
  reducers: {
    setMygroups(state, action) {
      state.myGroups = [...action.payload];
    },
  },
});

export const groupActions = groupSlice.actions;

export default groupSlice.reducer;
