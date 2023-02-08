import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


const fetchAuthors = createAsyncThunk(
    'authors/fetchAuthorsAll',
    async (userId, thunkAPI) => {
        const {data} = await axios.get(`/api/authors?page=0&limit=30`);
        return data;
    }
)

const initialState = {
    authors: [],
    pageSize: 30,
    total_authors: 1,
    currentPage: 1
};

const authorsSlice = createSlice({
    name: 'authors',
    initialState,
    reducers: {
        setData(state, action) {
            const {authors, total_authors} = action.payload;
            state.authors = authors;
            state.total_authors = total_authors;
        },
    }
});


export const {setData} = authorsSlice.actions;

export default authorsSlice.reducer;



