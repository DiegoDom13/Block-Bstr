import React from "react";
import { Col, Card } from 'antd'
import { icons } from "antd/es/image/PreviewGroup";
import { Link } from "react-router-dom";

import './MovieCatalog.scss';

export default function MovieCatalog(props) {
    const { movies: { results } } = props;

    return results.map(movie => (
        <Col
            key={movie.id}
            xs={4}
            className="movie-catalog">
            <MovieCard movies={movie} />
        </Col>
    ));

}

function MovieCard(props) {
    const { movie } = props;
    console.log(movie);
    return "pelicula";
}