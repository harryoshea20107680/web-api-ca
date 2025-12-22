import React, { useMemo, useState, useEffect, createContext, useContext} from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import TrendingMoviesPage from './pages/trendingMoviesPage';
import PopularMoviesPage from "./pages/popularMoviesPage";
import TopRatedMoviesPage from "./pages/topRatedMoviesPage";
import NowPlayingMoviesPage from "./pages/nowPlayingMoviesPage";
import PersonDetailsPage from "./pages/personDetailsPage";
import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import { createAppTheme } from "./theme";
import "./index.css";  

export const ColorModeContext = createContext({ mode: "light", toggle: () => {} });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("color-mode");
    if (saved === "dark" || saved === "light") setMode(saved);
  }, []);


  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const colorMode = useMemo(
    () => ({
      mode,
      toggle: () => {
        setMode(prev => {
          const next = prev === "light" ? "dark" : "light";
          localStorage.setItem("color-mode", next);
          return next;
        });
      },
    }),
    [mode]
  );
  return (
    <QueryClientProvider client={queryClient}>
     <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
       <CssBaseline />  
        <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <Routes>
            <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
            <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={ <Navigate to="/" /> } />
            <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
            <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
            <Route path="/movies/trending" element={<TrendingMoviesPage />} />
            <Route path="/movies/popular" element={<PopularMoviesPage />} />
            <Route path="/movies/top_rated" element={<TopRatedMoviesPage />} />
            <Route path="/movies/now_playing" element={<NowPlayingMoviesPage />} />
            <Route path="/people/:id" element={<PersonDetailsPage />} />
          </Routes>
         </MoviesContextProvider>
        </BrowserRouter>
       <ReactQueryDevtools initialIsOpen={false} />
       </ThemeProvider>
     </ColorModeContext.Provider>
    </QueryClientProvider>
  );
};



const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);

