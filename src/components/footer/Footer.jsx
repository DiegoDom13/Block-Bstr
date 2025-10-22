import React from "react";
import { Layout, Row, Col } from "antd";
import useFetch from '../../hooks/useFetch';
import './Footer.scss';
import { URL_API } from "../../utils/constants";
import { useOptions } from "../../hooks/useOptions";
import { Badge, Space, Card } from 'antd';

export default function Footer() {
    const options = useOptions();
    const { Footer } = Layout;

    //--Categorias--

    const { loading, result, error } = useFetch(`${URL_API}/genre/movie/list?language=es-ES`, options)

    console.log("Resultados de generos footer", result);

    // Evita errores: Si result es null, usa un array vacío
    const genres = result?.genres || [];

    return (
        <Footer className="footer">
            <Row justify="center" align="middle">
                <Col xs={24} sm={24} md={24} lg={24}>
                    <p>Diego Issac Dominguez Morales © 2025</p>
                </Col>

                <Col xs={24} sm={24} md={24} lg={24}>
                    <h3>Categorías</h3>
                    {loading ? (
                        <p>Cargando Categorias...</p>
                    ) : error ? (
                        <p>Error al cargar categorias...</p>
                    ) : genres.length > 0 ? (
                        <Space direction="horizontal" size="small" style={{ width: "100%", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                            {genres.map((genero) => (
                                <Badge text={genero.name} color="white"></Badge>
                            ))}
                        </Space>

                    ) : (
                        <p>No hay categorias disponibles</p>
                    )}
                </Col>
            </Row>
        </Footer>
    );
}