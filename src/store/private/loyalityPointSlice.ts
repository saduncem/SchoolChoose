import { createSlice, createAction } from "@reduxjs/toolkit";
const loyalityPointSlice = createSlice({
    name: "loyalityPointInformation",
    initialState:{
        pointData: null,
        memberholdPoint:null
    },
    reducers: {
        setpointData: (state, { payload }) => {
            state.pointData = payload;
            
        },
        setMemberholdPoint: (state, { payload }) => {
            state.memberholdPoint = payload;
            
        },
    },
});

export const loyalityPointData = (state:any) => state.loyalityPointInformation; // state üzerindeki bilgileri dışarı aktarma

export const { setpointData ,setMemberholdPoint} = loyalityPointSlice.actions; // functions dışarıya aktarılması

export default loyalityPointSlice.reducer;