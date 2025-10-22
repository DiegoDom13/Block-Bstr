// Importa React y el hook useContext para acceder a contextos dentro de componentes funcionales
import React, { useContext } from "react";

// Importa hooks de React Router para acceder a la ubicación, navegación, parámetros de URL y contexto interno de navegación
import { useLocation, useNavigate, useParams, UNSAFE_NavigationContext } from "react-router-dom";

// Define una función de orden superior (HOC) llamada withRouter que recibe un componente como argumento
export default function withRouter(Component) {

    // Define un nuevo componente funcional que envolverá al componente original
    function ComponentWithRouterProp(props) {

        // Obtiene el objeto de ubicación actual (pathname, search, hash, etc.)
        let location = useLocation();

        // Obtiene la función navigate para redireccionar programáticamente
        let navigate = useNavigate();

        // Obtiene los parámetros dinámicos de la URL (por ejemplo, /user/:id)
        let params = useParams();

        // Accede directamente al objeto history usando el contexto interno de navegación
        const { navigator: history } = useContext(UNSAFE_NavigationContext);

        // Renderiza el componente original, inyectando las props originales más una nueva prop llamada "router"
        // que contiene location, navigate, params y history
        return (
            <Component 
                {...props} 
                router={{ location, navigate, params, history }} 
            />
        );
    }

    // Asigna un nombre descriptivo al componente generado para facilitar el debugging en herramientas como React DevTools
    ComponentWithRouterProp.displayName = `withRouter(${Component.displayName || Component.name || 'Component'})`;

    // Retorna el nuevo componente que envuelve al original con acceso a las herramientas de enrutamiento
    return ComponentWithRouterProp;
}
