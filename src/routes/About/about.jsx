//import React from 'react'
import bookStore from "../../assets/book store.webp";

function About() {
  return (
    <div className="about-container title">
    
        <h1>About Our MERN Stack Book Management System</h1>
        <p>
            Discover a world of literature with our cutting-edge MERN stack application. 
            Manage your book collection seamlessly, add and edit books effortlessly, and 
            bring your library to life with stunning cover images.
        </p>
        <img src={bookStore} id="zio"/>
    </div>
  )
}

export default About
