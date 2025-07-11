import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [genreData, setGenreData] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

  const genres = {
    Action: 'action movie',
    Comedy: 'comedy movie',
    Romance: 'romantic movie',
    Horror: 'horror movie',
  };

  const fetchGenreMovies = async () => {
    setLoading(true);
    const allData = {};

    try {
      for (let [genreName, query] of Object.entries(genres)) {
        const res = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
        if (res.data.Response === 'True') {
          allData[genreName] = res.data.Search;
        } else {
          allData[genreName] = [];
        }
      }
      setGenreData(allData);
    } catch (err) {
      console.error('Error fetching genre movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm) return;
    setLoading(true);
    try {
      const res = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`);
      if (res.data.Response === 'True') {
        setGenreData({ [`Search Results for "${searchTerm}"`]: res.data.Search });
      } else {
        setGenreData({ [`Search Results for "${searchTerm}"`]: [] });
      }
    } catch (err) {
      console.error('Error searching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenreMovies();
  }, [API_KEY]);

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for a movie..."
          className="form-control custom-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
        />
      </div>

      {loading ? (
        <h3>Loading...</h3>
      ) : (
        Object.keys(genreData).map((genre) => (
          <div key={genre} className="mb-5">
            <h4 className="mb-3 text-light">{genre}</h4>
            <div className="scroll-row d-flex overflow-auto pb-3">
              {genreData[genre].length === 0 ? (
                <p className="text-light">No movies found.</p>
              ) : (
                genreData[genre].map((movie) => (
                  <div key={movie.imdbID} className="flex-shrink-0 me-3" style={{ width: '200px' }}>
                    <div
                      className="card h-100 shadow-lg"
                      style={{ backgroundColor: 'rgb(30,30,30)', color: 'white' }}
                    >
                      <img
                        src={
                          movie.Poster !== 'N/A'
                            ? movie.Poster
                            : 'https://via.placeholder.com/300x450?text=No+Image'
                        }
                        className="card-img-top p-1"
                        alt={movie.Title}
                      />
                      <div className="card-body">
                        <h6 className="card-title">{movie.Title}</h6>
                        <p className="card-text">{movie.Year}</p>
                        <Link to={`/movie/${movie.imdbID}`} className="linkClass">
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};
