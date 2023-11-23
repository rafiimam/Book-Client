import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function SingleBook() {
  const serverUrl = import.meta.env.VITE_SERVER_URL

  const [data, setData] = useState([]);
  const urlSlug = useParams();
  const baseUrl = `${serverUrl}/api/books/${urlSlug.slug}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch the data");
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [baseUrl]);

  // eslint-disable-next-line react/prop-types
  function StarRating({numberOfStars}){
    const stars = []

    for(let  i=0;i<numberOfStars;i++)
    {
        stars.push(<span key={i}>⭐</span>)
    }

    return <div>Rating: {stars}</div>
  }

  return (
    <div className="animate__animated animate__zoomIn">
      
    <div className="returnDiv">
    <Link to={"/books"} className="return">🔙 Books</Link>
    </div>

    <div className="bookdetails">
        <div className="col-1">
            <img src={`${serverUrl}/uploads/${data?.thumbnail}`} alt={data?.title}/>
            <div className="editDev">
            <Link to={`/editbook/${data.slug}`} className="editBook">Edit</Link>
            </div>
        </div>
        <div className="col-2">
            <h1>{data?.title}</h1>
            <p>{data?.description}</p>
            <StarRating numberOfStars={data?.stars}/>
            <p>Category</p>
            <ul>
                {data?.category?.map((item,index)=>(
                    <li key={index}>{item}</li>
                ))}
            </ul>


        </div>
    </div>

    </div>
  );
}

export default SingleBook;
