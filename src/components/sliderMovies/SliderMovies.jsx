import React from "react";
import { Carousel, Button } from "antd";
import { StarFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Loading from "../loading/Loading";

import './SliderMovies.scss';

export default function SliderMovies(props) {
    const { newMovies } = props;

    if (newMovies.loading || !newMovies.result) {
        return <Loading />;
    }

    const { results } = newMovies.result;
    return (
        <Carousel autoplay className="slider-movies">
            {results.map(movie => (
                <Movie key={movie.id} movie={movie} />
            ))}
        </Carousel>
    )
}

function Movie(props) {
    const { movie: { id, backdrop_path
        , title, overview, vote_average } } = props
    const backdropPath = `https://image.tmdb.org/t/p/original${backdrop_path
        }`;

    return (
        <div
            className="slider-movies__movie"
            style={{ backgroundImage: `url('${backdropPath}')` }}
        >
            <div className="slider-movies__info">
                <div className="slider-movies__info-cont">
                    <h2>{title}</h2>
                    <p>{overview}</p>
                    <p>
                        <span>{vote_average} / 10</span> {/* Calificación numérica */}
                        <span>
                            {Array.from({ length: 10 }, (_, i) => (
                                <StarFilled
                                    key={i}
                                    style={{
                                        color: i < vote_average ? "gold" : "gray",
                                        fontSize: "16px",
                                        marginLeft: "2px", // Espaciado entre estrellas
                                        marginRight: "2px"
                                    }}
                                />
                            ))}
                        </span>
                    </p>
                    <Link to={`/movies/${id}`}>
                        <Button type="primary">Ver más</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}