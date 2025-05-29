import React, { useMemo } from "react";
import { Row, Col } from "antd";
import useFetch from "../hooks/useFetch";
import { URL_API } from "../utils/constants";
import MovieList from "../components/movieList/MovieList";
import { useOptions } from "../hooks/useOptions";
import SliderMovies from "../components/sliderMovies/SliderMovies";

export default function Home() {

    const options = useOptions();


    //--List of the most popular movies--

    const popularMovies = useFetch(`${URL_API}/movie/popular?language=es-ES&page=5`, options);

    //--Movies Slider--

    const newMovies = useFetch(`${URL_API}/movie/now_playing?language=en-US&page=3`, options);

    //--Top Rated--

    const topRated = useFetch(`${URL_API}/movie/top_rated?language=es-ES&page=1`, options);

    return (
        <>
            <SliderMovies newMovies={newMovies} />
            <Row>
                <Col span={12}>
                    <MovieList movies={popularMovies}
                        title="Peliculas populares"
                    />
                </Col>
                <Col span={12}>
                    <MovieList movies={topRated}
                        title="Peliculas mejor valoradas"
                    />
                </Col>
            </Row>
        </>
    );
} 