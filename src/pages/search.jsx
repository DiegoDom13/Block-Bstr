import React, {useState, useEffect, useMemo} from "react";
import {Col, Row, Input} from 'antd';
import withRouter from "../hooks/withRouter";
import queryString from "query-string";
import MovieCatalog from '../components/MovieCatalog/MovieCatalog';
import { URL_API, token } from "../utils/constants";
import { useOptions } from "../hooks/useOptions";
import PaginationMovies from "../components/pagination/Pagination";
import { debounce } from "lodash";

import './search.scss';
import './new-movies.scss';

function Search(props) {
    
    const options = useOptions(); // configuración para fetch
    const {location, history } = props.router; // 
    const [movieList, setMovieList] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [page, setPage] = useState(1);
    
    // useEffect que se activa cuando cambia la URL (location.search)
    // 🔹 useEffect para paginación
    useEffect(() => {
        (async ()=> {
            // Parsea los parámetros de la URL
            const searchValue = queryString.parseUrl(location.search);
            const { s } = searchValue.query; // Extrae el parámetro 's'
            
        if (!s) {
            setMovieList([]); // SI NO HAY NADA VACIA LOS RESULTAOS
            return; // Si no hay búsqueda, no hace nada
        }

        // Hace fetch a la API para buscar películas
        const response = await fetch(
            `${URL_API}/search/movie?query=${s}&include_adult=true&language=ES-es&page=${page}`, options
        );
        const movies = await response.json();// Convierte la respuesta en JSON

        setSearchValue(s); // Actualiza el input con el valor de la URL
        setMovieList(movies); // Guarda las películas en el estado

        })()
        // Muestra en consola los parámetros de la URL
        console.log("datos de url", queryString.parseUrl(location.search))
    }, [location.search, page]);
    

    // 🔹 Creamos la función debounced (solo se crea una vez con useMemo)
    const updateSearch = useMemo(
        () =>
            debounce((value) => {
                const urlParams = queryString.parse(location.search); // Parsea los parámetros actuales de la URL
                urlParams.s = value; // Actualiza el parámetro 's' con el nuevo valor
                history.push(`?${queryString.stringify(urlParams)}`); // Cambia la URL sin recargar la página
            }, 800 ), // espera 800ms después de la última tecla
        [history, location.search] // Se memoriza mientras no cambien estos valores
    );
    
    // Función que se ejecuta cada vez que el usuario escribe en el input
    const onChangeSearch = (e) => {
        const value = e.target.value; // Obtiene el texto escrito
        setSearchValue(value);// actualiza el input al instante
        setPage(1); // Reinicia a la primera página
        updateSearch(value);// actualiza la URL con debounce
    }
    // Función que se ejecuta cuando el usuario cambia de página
    const onChangePage = page => setPage(page);

    // Renderiza el componente
    return (
        <>
            <Row justify="center" align="middle" >
                <Col span={12}  className="search">
                    <h1>Busca tu pelicula ♠</h1>
                    <Input 
                    value={searchValue} // Muestra el texto actual
                    onChange={onChangeSearch} // Ejecuta función al escribir
                    placeholder="Que quieres ver...?" />
                </Col>
            </Row>
            {/* Si hay resultados, muestra catálogo y paginación */}
            {movieList.results?.length > 0 ? (
                <>
                    <Col span="24" >
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
                
                <Row justify="center" align="middle">
                    <Col span={24} className="no-results">
                        <h2>Busquedas relacionadas con: <span style={{ color: "#1890ff" }}>{searchValue}</span></h2>
                        <p>Cuida la ortografia y errores.</p>
                    </Col>
                </Row>
                
            )
            }
        </>
    );
}
// Exporta el componente con acceso a router
export default withRouter(Search);