import React from "react";
import { Col, Card } from 'antd'
import { EyeOutlined } from "@ant-design/icons";
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
    const { movies: {id, title, poster_path}} = props;
    const {Meta} = Card;
    const posterPath = `https://image.tmdb.org/t/p/original/${poster_path}`;

    return (
        <Link to={`/movies/${id}`}>
            <Card
                hoverable
                style={{width: 240}}
                cover={<img alt={title} src={posterPath} />}
                actions={[<EyeOutlined key="eye"/>]} 
            >
                <Meta title={title} />
            </Card>
        </Link>

    )
}