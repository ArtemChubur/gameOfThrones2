import {createSlice} from "@reduxjs/toolkit";

const initialState = {}

export const detailSlice = createSlice({
    name: 'detail',
    initialState,
    reducers : {
        setDetail: (state, action) => {
            state.detail = action.payload
        }
    }
})

export const {setDetail} = detailSlice.actions
export default detailSlice.reducer