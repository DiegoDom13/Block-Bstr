import React, { useState } from 'react'
import { Layout } from 'antd'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Menu from './components/menu/MenuMovie';
import '@ant-design/v5-patch-for-react-19';

// Pages import
import Home from './pages/home';
import NewMovies from './pages/new-movies';
import Popular from './pages/popular';
import Error404 from './pages/error404';
import Movie from './pages/movie';
import Search from './pages/search';
import Footer from './components/footer/Footer';

export default function App() {
  const [theme, setTheme] = useState("dark");

  const changeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark"); // 🟢 Cambia el tema al hacer clic en el switch
  };

  const { Header, Content } = Layout;

  return (
    <>
      <Layout id='layout'>
        <Router>
          <Header
            id='header'
            style={{
              background: theme === "dark" ? "#001529" : "#ffffff", color: theme === "dark" ? "white" : "black",
              zIndex: 100
            }}
          >
            <Menu
              theme={theme} changeTheme={changeTheme}
            />
          </Header>
          <Content>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/new-movies' element={<NewMovies />} />
              <Route path='/popularBuster' element={<Popular />} />
              <Route path='*' element={<Error404 />} />
              <Route path='/movies/:id' element={<Movie />} />
              <Route path='/search-Movie' element={<Search />} />
            </Routes>
          </Content>
          <Footer />
        </Router>
      </Layout>
    </>
  )
}




