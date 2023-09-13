import './Home.css'
import React, { useEffect } from "react";
import Car from "./Video.mp4";

const Home = () => {
    useEffect(() => {
        document.title = "Eden | Home";
      }, []);
    return (
        <div className="home-page">
        <video autoPlay loop muted >
            <source src={Car} type="video/mp4"></source>
        </video>
        <h1 className="home-title"> Set, Forget, and Harvest Fresh </h1>
        </div>
       
    );
}

export default Home

