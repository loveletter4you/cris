import React from 'react';
import s from './Publications.module.css';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {setData} from "../../store/slices/publicationsSlice";
import ReactPaginate from "react-paginate";
import {setValue} from "../../store/slices/sortSlice";
import {NavLink, useParams} from "react-router-dom";
import Search from "../Search/Search";
import {setSize} from "../../store/slices/publicationsSlice";


const Publications = () => {

    const [seeFiltered, setSeeFiltered] = React.useState(false);
    const filteredValue = useSelector((state) => state.sort);
    const {publications, currentPage, pageSize, total_publications} = useSelector(state => state.publications);
    const dispatch = useDispatch();

    let pageCount = Math.ceil(total_publications / pageSize);

    const handlePageClick = (e) => {
        const fetchPublications = async () => {
            const res = await axios.get(`/api/publications?page=${e.selected}&limit=${pageSize}`);
            dispatch(setData(res.data));
        }
        fetchPublications();
    }

    React.useEffect(() => {
        const fetchPublications = async () => {
            const res = await axios.get(`/api/publications?page=0&limit=${pageSize}`);
            dispatch(setData(res.data));
        }
        fetchPublications();
    }, [pageSize]);


    return (<div>
            <div onClick={() => {
                if (seeFiltered === true) setSeeFiltered(false)
            }} className={s.block}>
                <Search/>
                <div className={s.size}>
                    Отображать по:
                    <ul>
                        <li onClick={() => {dispatch(setSize(20)); }}>20</li>
                        <li onClick={() => {dispatch(setSize(40)); }}>40</li>
                        <li onClick={() => {dispatch(setSize(80)); }}>80</li>
                    </ul>
                </div>
                <div className={s.sort}>
                    <div className={s.sort__label}>
                        <b onClick={() => setSeeFiltered(true)}>Сортировка по: {filteredValue.seeFiltered}</b>
                    </div>

                    {seeFiltered === false ? '' : <div className={s.sort__popup}>
                        <nav>
                        <ul>
                            <li onClick={() => dispatch(setValue('Популярности'))}>Популярности</li>
                            <li onClick={() => dispatch(setValue('Публикациям'))}>Публикациям</li>
                            <li onClick={() => dispatch(setValue('Алфавиту'))}>Алфавиту</li>
                        </ul>
                        </nav>
                    </div>
                    }
                </div>
                {publications === undefined ? 'Подождите пожалуйста' : publications.map(p => <div>
                    <div key={p.id} className={s.blocks}>
                        <div>{p.type.name}</div>
                        <NavLink to={"/publication/" + p.id}>
                            <div>{p.title}</div>
                        </NavLink>
                        <div>{p.source.Name}</div>
                        <div>{p.publication_date}</div>
                    </div>
                </div>)}
            </div>

            <ReactPaginate
                breakLabel="..."
                nextLabel="->"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<-"
                renderOnZeroPageCount={null}

                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"

            />
        </div>
    );
};

export default Publications;