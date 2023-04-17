import { createSlice, createAction } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name: "userInformation",
    initialState:{
        cityList: [],
        districtsList: [null],
        cramschoolsList:null,
        userLoader :true,
        quotasList:null
    },
    reducers: {
        setCityList: (state, { payload }) => {
            state.cityList = payload;
            state.userLoader = false;
        },
        setDistrictsList: (state, { payload }) => {
            state.districtsList =payload;
            state.userLoader = false;
        },
        setCramschoolsList: (state, { payload }) => {
            state.cramschoolsList =payload;
            state.userLoader = false;
        },
        setQuotasList: (state, { payload }) => {
            state.quotasList =payload;
            state.userLoader = false;
        },
    },
});

export const userData = (state:any) => state.userInformation; // state üzerindeki bilgileri dışarı aktarma

export const { setCityList, setDistrictsList,setCramschoolsList ,setQuotasList} = userSlice.actions; // functions dışarıya aktarılması

export default userSlice.reducer;
