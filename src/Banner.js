import React from "react";
import "./Banner.css"

function Banner() {
    function truncate(string, n){
        return string?.length > n ? string.substr(0, n-1) + '...' : string;
    }
    return (
        <header
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url('https://thelesfilms.files.wordpress.com/2016/06/netflix-banner.jpg')`,
                backgroundPosition: "center center",
            }}
        >
            <div className="bannerContents">
                <h1 className="bannerTitle">movie Name</h1>
                <div className="bannerButtons">
                    <button className="bannerButton">play</button>
                    <button className="bannerButton">My List</button>
                </div>
                <h1 className="bannerDiscription">
                    {truncate('This is a discription!!!', 100)}
                </h1>
            </div>
            <div className="bannerFadeBottom" />
        </header>
    )
}

export default Banner;