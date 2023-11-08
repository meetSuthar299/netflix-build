import React, { useEffect, useState } from "react";
import { collection, getDocs } from 'firebase/firestore/lite';
import db from '../firebase';
import { useSelector } from 'react-redux';
import { selectuser } from '../features/userSlice';
import { FaHeart } from 'react-icons/fa';
import "./LikesDropdown.css"

function LikesDropdown() {
    const [movies, setMovies] = useState([]);
    const user = useSelector(selectuser);
    const [showMovies, setShowMovies] = useState(false);


    useEffect(() => {
        // Check if user and user.id are defined
        if (user && user.uid) {
            getDocs(collection(db, "customers", user.uid, "likes")).then((snap) => {
                //Set movies to an array of movie objects
                setMovies(snap.docs.map((doc) => doc.data()));
            });
        }
    }, [movies, user, user.uid]);

    // Handle the user's selection
    const handleHeartClick = () => {
        setShowMovies(!showMovies);
    };


    return (
        <div className="movie-container">
            <div className="heart-icon" onClick={handleHeartClick}>
                <FaHeart />
                <p className="movie-count">{movies.length}</p>
            </div>

            {showMovies && (
                <div className="movie-list">
                    {movies.length > 0 ? (
                        movies.map((movie) => (
                            <p key={movie.movie_id} className="movie-name">{movie.movie_name}</p>
                        ))
                    ) : (
                        <p className="no-movies">No movies found</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default LikesDropdown;