import React, { useEffect, useState } from "react";
import "./Banner.css"
import axios from "../axios";
import requests from "../Requests";
import { addDoc, collection, getDocs } from "firebase/firestore/lite";
import db from '../firebase';
import { useSelector } from 'react-redux';
import { selectuser } from '../features/userSlice';
import { useNavigate, createSearchParams } from "react-router-dom";


function Banner() {
    const [movie, setMovie] = useState([]);
    const user = useSelector(selectuser);
    const navigate = useNavigate();

    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string;
    }

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchTrending);
            setMovie(
                request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            return request;
        }
        fetchData();
    }, []);

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

    //console.log(movie);
    return (
        <header
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundPosition: "center center",
            }}
        >
            <div className="bannerContents">
                <h1 className="bannerTitle">{movie?.title || movie?.name || movie?.original_name}</h1>
                <div className="bannerButtons">
                    <button className="bannerButton"
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
                    <button className="bannerButton"
                        onClick={() => { addToList(movie) }}
                    >Like</button>
                </div>
                <h1 className="bannerDiscription">
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>
            <div className="bannerFadeBottom" />
        </header>
    )
}

export default Banner;