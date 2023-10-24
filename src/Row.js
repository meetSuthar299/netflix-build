import React, { useEffect, useState } from "react";
import "./Row.css"
import axios from "./axios";

function Row({ title, fetchUrl, islargRow = false }) {
    const [movies, setMovies] = useState();

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
                const altText = movie?.title || movie?.name || movie?.original_name;

                return (
                    <>
                        <img
                            className={`rowPoster ${posterSize}`}
                            src={`${baseURL}${posterPath}`}
                            alt={altText}
                            title={altText}
                        />
                        <h5 className="movieTitle">{altText}</h5>
                    </>
                );
            })}
        </div>


    </div>
}

export default Row;