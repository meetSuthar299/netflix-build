import React, { useEffect, useState } from "react";
import "./Row.css"
import axios from "../axios";
import { useNavigate, createSearchParams } from "react-router-dom";

function Row({ title, fetchUrl, islargRow = false }) {
    const [movies, setMovies] = useState();
    const navigate = useNavigate();
    const baseURL = "https://image.tmdb.org/t/p/original/";


    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    return <div className="row">
        <h2>{title}</h2>

        <div className="rowPosters">
            {movies?.map((movie) => {
                const isPosterAvailable = islargRow ? movie.poster_path : movie.backdrop_path;
                if (!isPosterAvailable) return null;

                const posterPath = islargRow ? movie.poster_path : movie.backdrop_path;
                const posterSize = islargRow ? "rowPosterLarge" : "";
                const posterImg = islargRow ? "rowPosterLargeImg" : "";
                const altText = movie?.title || movie?.name || movie?.original_name;

                return (
                    <div className={`rowPoster ${posterSize}`} key={movie.id}>
                        <img
                            onClick={
                                () => {
                                    navigate({
                                        pathname: "/movie",
                                        search: createSearchParams({
                                            movieId: movie?.id,
                                            movieName: movie?.title || movie?.name || movie?.original_name,
                                            movieOverview: movie?.overview,
                                            movieReleaseDate: movie?.release_date,
                                            movieBackground: movie?.backdrop_path,
                                        }).toString()
                                    });
                                }
                            }
                            className={`rowPosterImg ${posterImg}`}
                            src={`${baseURL}${posterPath}`}
                            alt={altText}
                            title={altText}
                        />
                        <h5 className="movieTitle">{altText}</h5>
                    </div>
                );
            })}
        </div>

    </div>
}

export default Row;