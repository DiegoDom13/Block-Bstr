import React, { useState, useEffect } from "react";
import { Row, Col } from 'antd';
import { URL_API } from "../utils/constants";
import { useOptions } from "../hooks/useOptions";
import Loading from "../components/loading/Loading";
import MovieCatalog from "../components/MovieCatalog/MovieCatalog";
import PaginationMovies from "../components/pagination/Pagination";



export default function Popular() {
    const [movieList, setMovieList] = useState([]);
    const [page, setPage] = useState(1);
    const options = useOptions();

    useEffect(() => {
            (async () => {
                const response = await fetch(`${URL_API}/movie/popular?language=es-ES&page=${page}`, options);
                const movies = await response.json()
                setMovieList(movies);
            })();
        }, [page])

        const onChangePage = page => 
        setPage(page);

    return (
            <Row>
                <Col span="24" style={{ textAlign: "center", marginTop: 25 }}>
                    <h1 style={{ fontSize: 35, fontWeight: "bold" }}>
                        ¡Más populares!
                    </h1>
                </Col>
                {movieList.results ? (
                    <>
                        <Col span="24">
                            <Row className="container-movie-catalog">
                                <MovieCatalog movies={movieList} />
                            </Row>
                        </Col>
                        <Col span="24">
                            <PaginationMovies 
                                currentPage={movieList.page}
                                totalItems={movieList.total_results}
                                onChangePage={onChangePage}
                            />
                        </Col>
                    </>
                ) : (
                    <Col span="24">
                        <Loading />
                    </Col>
                )}
    
            </Row>
        );
}