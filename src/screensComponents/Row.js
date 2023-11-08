import React, { useEffect, useState } from "react";
import "./Row.css"
import axios from "../axios";
import { useNavigate, createSearchParams } from "react-router-dom";
import { collection, addDoc, getDocs } from 'firebase/firestore/lite';
import db from '../firebase';
import { useSelector } from 'react-redux';
import { selectuser } from '../features/userSlice';

function Row({ title, fetchUrl, islargRow = false }) {
    const [movies, setMovies] = useState();
    const navigate = useNavigate();
    const baseURL = "https://image.tmdb.org/t/p/original/";
    const user = useSelector(selectuser);

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await axios.get(fetchUrl);
                setMovies(request.data.results);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [fetchUrl]);

    const addToList = async (movie) => {
        const likesCol = collection(db, "customers", user.uid, "likes");
        const querySnapshot = await getDocs(likesCol);
        const movies = querySnapshot.docs?.map((doc) => doc?.data().movie_id);
        if (!movies.includes(movie.id)) {
            await addDoc(likesCol, {
                movie_id: movie.id,
                movie_name: movie?.title || movie?.name || movie?.original_name,
            });
        }
        else {
            alert("Movie is already liked");
        }
    };


    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="rowPosters">
                {movies?.map((movie) => {
                    const isPosterAvailable = islargRow ? movie.poster_path : movie.backdrop_path;
                    if (!isPosterAvailable) return null;

                    const posterPath = islargRow ? movie?.poster_path : movie?.backdrop_path;
                    const posterSize = islargRow ? "rowPosterLarge" : "";
                    const posterImg = islargRow ? "rowPosterLargeImg" : "";
                    const altText = movie?.title || movie?.name || movie?.original_name;

                    return (
                        <div className={`rowPoster ${posterSize}`} key={movie.id}>
                            <div className="rowPosterButtons">
                                <button
                                    className="rowPosteButton"
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
                                >play</button>
                                <button
                                    className="rowPosteButton"
                                    onClick={() => { addToList(movie) }}
                                >
                                    Like
                                </button>
                            </div>
                            <img
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
    )
}


export default Row;