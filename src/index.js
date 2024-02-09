import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StatsPage } from './pages/StatsPage';
import { ArtistsPage } from './pages/ArtistsPage';
import { TracksPage } from './pages/TracksPage';
import { Top20TracksPage } from './pages/Top20TracksPage';
import { HomePage } from './pages/HomePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <HomePage/>
    )
  },
  {
    path: "/stats",
    element: (
      <StatsPage/>
    )
  },
  {
    path: "artists",
    element: <ArtistsPage/>
  },
  {
    path: "tracks",
    element: <TracksPage/>
  },
  {
    path: "top-artist-tracks",
    element: <Top20TracksPage/>
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
