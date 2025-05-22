import React, { useState, useEffect } from "react";
import { Row, Col } from 'antd';
import { URL_API, token } from "../utils/constants";
import { useOptions } from "../hooks/useOptions";
import Loading from "../components/loading/Loading";
import MovieCatalog from "../components/MovieCatalog/MovieCatalog";

export default function NewMovies() {
    const [movieList, setMovieList] = useState([]);
    const [page, setPage] = useState(1);
    const options = useOptions();

    useEffect(() => {
        (async () => {
            const response = await fetch(`${URL_API}/movie/now_playing?language=es-ES&page=1`, options);
            const movies = await response.json()
            setMovieList(movies);
        })()
    }, [page])

    return (
        <Row>
            <Col span="24" style={{ textAlign: "center", marginTop: 25 }}>
                <h1 style={{ fontSize: 35, fontWeight: "bold" }}>
                    ¡Estrenos!
                </h1>
            </Col>
            {movieList.result ? (
                <Col span={24}>
                    <Row>
                        <MovieCatalog movie={movieList} />
                    </Row>
                </Col>
            ) : (
                <Col span={24}>
                    <Loading />
                </Col>
            )}

        </Row>
    );
}