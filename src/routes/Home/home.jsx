//import React from 'react'
import 'animate.css';
import bookStore from "../../assets/book store.webp";
function Home() {
  return (
    <div className="animate__animated animate__zoomIn">
        <h1 className='title' >Book Store</h1>
        <p id="para">Welcome to our online book haven! Immerse yourself in the world of literature at our MERN-powered bookstore. Our platform is a celebration of stories, knowledge, and the boundless journeys that words can take you on. Whether you are an avid reader or just beginning your literary adventure, our collection curated with care has something for everyone.

Explore a vast array of genres, from timeless classics to contemporary bestsellers. Engage with the latest releases or rediscover hidden gems you are sure to find a book that resonates with your soul. Our user-friendly interface ensures a seamless browsing experience, allowing you to discover, read reviews, and make informed choices effortlessly. </p>


<img src={bookStore} id="zio"/>

<p>As fellow book enthusiasts, we understand the joy of holding a physical book, but our commitment to environmental sustainability led us to create a digital space where you can access your favorite titles anytime, anywhere. With our MERN stack implementation, we have optimized the user experience, making it easy for you to navigate through the virtual shelves and find literary treasures that captivate your imagination.

Whether you are into fiction or non-fiction, fantasy or romance, our book haven is designed to be your go-to destination for literary exploration. Join us on this journey where stories come alive, and the love for reading is celebrated. Happy reading!</p>
        <p id="click">Click on Books to See, Add, Update, Delete Books.......</p>
    </div>
  )
}

export default Home
