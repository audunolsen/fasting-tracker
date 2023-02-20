import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  name: {
    first: "",
    middle: "",
    last: "",
    title: "",
  },
}

export default createSlice({
  name: "user",
  initialState,
  reducers: {
    // fuck: (state) => {
    //   return {
    //     ...state,
    //     value: 1,
    //   }
    // },
  },
})
