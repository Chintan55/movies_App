import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getSimilarMovies } from '../../api/movies';

import MovieCard from '../MovieCard/MovieCard';
import styles from './MoviePage.module.css';

const imagePrefixUrl = 'https://image.tmdb.org/t/p/w500';

function MoviePage() {
  const { movieId } = useParams();

  const [movie, setMovie] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieDetails = async () => {
      const res = await getMovieDetails(movieId);

      if (res) {
        setMovie(res);
      }
    };

    const fetchSimilarMovies = async () => {
      const res = await getSimilarMovies(movieId);

      if (res) {
        setSimilarMovies(res.results || []);
      }
    };

    fetchMovieDetails();
    fetchSimilarMovies();
  }, [movieId]);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        {movie?.backdrop_path && (
          <img
            src={`${imagePrefixUrl}${movie.backdrop_path}`}
            alt={`${movie?.title || 'Movie'} backdrop`}
          />
        )}

        <div className={styles.details}>
          <label>Title</label>
          <div className={styles.title}>{movie?.title}</div>

          <div className={styles.sub}>{movie?.tagline}</div>

          <label>Story</label>
          <div className={styles.desc}>{movie?.overview}</div>

          <label>Run time</label>
          <div className={styles.desc}>
            {movie?.runtime ? `${movie.runtime} mins` : 'N/A'}
          </div>
        </div>
      </div>

      <div className={styles.similar}>
        <div className={styles.title}>Similar movies</div>

        <div className={styles.movies}>
          {similarMovies.map((item) => (
            <MovieCard movie={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
