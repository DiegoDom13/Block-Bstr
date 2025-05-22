import React, { useState } from "react";
import { Row, Col, Button } from 'antd';
import { PlayCircleOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import moment from 'moment';
import useFetch from '../hooks/useFetch';
import { useOptions } from "../hooks/useOptions";
import { URL_API, token } from '../utils/constants';
import ModalVideo from "../components/modalVideo/ModalVideo";

import Loading from '../components/loading/Loading';
import './movie.scss';


export default function Movie() {
    const { id } = useParams();

    console.log(id);

    const movieInfo = useFetch(`${URL_API}/movie/${id}?language=es-ES`, useOptions());

    console.log(movieInfo);

    if (movieInfo.loading || !movieInfo.result) {
        return <Loading />;
    }


    return <RenderMovie movieInfo={movieInfo.result} />
}

function RenderMovie(props) {
    const { movieInfo: { backdrop_path, poster_path } } = props;

    const backDropPath = `https://image.tmdb.org/t/p/original${backdrop_path
        }`;

    return (
        <div className="movie"
            style={{ backgroundImage: `url('${backDropPath}')` }}>
            <div className="movie__dark">
                <Row>
                    <Col span={8} offset={2} className="movie__poster">
                        <PosterMovie image={poster_path} />
                    </Col>
                    <Col span={10} className="movie__info">
                        <MovieInfo movieInfo={props.movieInfo} />
                    </Col>
                </Row>
            </div>
        </div>
    );
}

function PosterMovie(props) {
    const { image } = props;
    const posterPath = `https://image.tmdb.org/t/p/original${image}`;

    return <div style={{ backgroundImage: `url('${posterPath}')` }}></div>
}

function MovieInfo(props) {
    const { movieInfo: { id, title, release_date, overview, genres } } = props;
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const options = useOptions();
    const videoMovie = useFetch(`${URL_API}/movie/${id}/videos?language=es-ES`, options);

    console.log();


    const openModal = () => setIsVisibleModal(true);
    const closeModal = () => setIsVisibleModal(false);

    console.log("Datos de videoMovie:", videoMovie.result);
    console.log("Lista de resultados:", videoMovie.result?.results);

    const renderVideo = () => {
        if (!videoMovie.result || !videoMovie.result.results) {
            return null; // Retorna vacío si no hay datos disponibles
        }

        if (videoMovie.result.results.length > 0) {
            return (
                <>
                    <Button icon={<PlayCircleOutlined />} onClick={openModal}>
                        Ver Trailer
                    </Button>
                    <ModalVideo
                        videoKey={videoMovie.result.results[0].key}
                        videoPlatform={videoMovie.result.results[0].site}
                        isOpen={isVisibleModal}
                        close={closeModal}
                    />
                </>
            );
        }
    };

    return (
        <>
            <div className="movie__info-header">
                <h1>
                    {title}
                    <span>{moment(release_date, "YYYY-MM-DD").format('YYYY')}</span>
                </h1>
                {renderVideo()}
            </div>
            <div className="movie__info-content">
                <h3>
                    General
                </h3>
                <p>
                    {overview}
                </p>
                <h3>
                    Generos
                </h3>
                <ul>
                    {genres.map(gender => (
                        <li key={gender.id}>{gender.name}</li>
                    ))}
                </ul>
            </div>
        </>
    )
}