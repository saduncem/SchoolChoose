import { createSlice, createAction } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name: "userInformation",
    initialState:{
        userInfo: null,
        pointInfo: null,
        CampaingList:null,
        userLoader :true,
        selectCampaing:null
    },
    reducers: {
        setUserinfo: (state, { payload }) => {
            state.userInfo = payload;
            state.userLoader = false;
        },
        setPointConversion: (state, { payload }) => {
            state.pointInfo =payload;
        },
        setCampaingList: (state, { payload }) => {
            state.CampaingList =payload;
        },
        setSelectCampaing: (state, { payload }) => {
            state.selectCampaing =payload;
        },
    },
});

export const userData = (state:any) => state.userInformation; // state üzerindeki bilgileri dışarı aktarma

export const { setUserinfo, setPointConversion,setCampaingList ,setSelectCampaing} = userSlice.actions; // functions dışarıya aktarılması

export default userSlice.reducer;
