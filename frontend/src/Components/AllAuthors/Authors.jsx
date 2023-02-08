import React from 'react';
import axios from "axios";
import {NavLink} from "react-router-dom";
import s from "./Authors.module.css";
import ReactPaginate from "react-paginate";
import Paginator from './Paginator.css';
import {useDispatch, useSelector} from "react-redux";
import {setPopupValue} from "../../store/slices/sortSlice";
import {setData} from "../../store/slices/AuthorsSlice";
import Search from "../Search/Search";


const Authors = () => {

    const {authors, currentPage, pageSize, total_authors} = useSelector(state => state.allAuthors);
    const dispatch = useDispatch();


    let pageCount = Math.ceil(total_authors / pageSize);

    const handlePageClick = (e) => {
        const fetchAuthors = async () => {
            const res = await axios.get(`/api/authors?page=${e.selected}&limit=30`);
            dispatch(setData(res.data));
        }
        fetchAuthors();
    }

    React.useEffect(() => {
        const fetchAuthors = async () => {
            const res = await axios.get(`/api/authors?page=0&limit=30`);
            dispatch(setData(res.data));
        }
        fetchAuthors();
    }, []);

    return (
        <div>
            <div className={s.block}>
                <Search/>
                <div className={s.block__item}>
                    <ul className={s.item}>
                        {authors === undefined ? 'Подожди пж' : authors.map(a => <>
                                <li key={a.id} className={s.list__item}>
                                    <NavLink to={'/author/' + a.id}> {a.surname} {a.name} {a.patronymic}</NavLink>
                                </li>
                            </>
                        )}
                    </ul>

                </div>

            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel="->"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<-"
                renderOnZeroPageCount={null}

                containerClassName='pagination'
                activeLinkClassName='active'
            />

        </div>
    );
};

export default Authors;
