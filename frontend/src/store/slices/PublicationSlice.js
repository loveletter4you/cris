import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    id: null,
    type: [],
    source: [],
    title: null,
    publication_date: null

};

const publicationSlice = createSlice({
    name: 'onePublic',
    initialState,
    reducers: {
        setPublic(state, action) {
            const {id, type, source, title, publication_date} = action.payload.publication;
            state.id = id;
            state.type = type;
            state.source = source;
            state.title = title;
            state.publication_date = publication_date;
        }
    }
});


export const {setPublic} = publicationSlice.actions;

export default publicationSlice.reducer;
