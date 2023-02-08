import { configureStore } from '@reduxjs/toolkit'
import allAuthorsReducer from "./slices/AuthorsSlice";
import authorReducer from "./slices/authorSlice";
import sortReducer from "./slices/sortSlice";
import publicationsSlice from "./slices/publicationsSlice";
import onePublicSlice from "./slices/PublicationSlice";


const store = configureStore({
    reducer: {
        allAuthors: allAuthorsReducer,
        author: authorReducer,
        sort: sortReducer,
        publications: publicationsSlice,
        onePublic: onePublicSlice
    }
})



export default store;

