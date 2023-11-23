import  { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'

function EditBooks() {
  const serverUrl = import.meta.env.VITE_SERVER_URL

    const navigate = useNavigate()

    const urlSlug = useParams()
    const baseUrl = `${serverUrl}/api/books/${urlSlug.slug}`

  const [bookId,setBookId] = useState("")  
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [stars, setStars] = useState(0);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [submitted, setSubmitted] = useState("");
  const [image, setImage] = useState("")

    console.log(baseUrl);

    const fetchData = async() =>{
        try{
            const response = await fetch(baseUrl)
            const data = await response.json()
            setBookId(data._id)
            setTitle(data.title)
            setSlug(data.slug)
            setStars(data.stars)
            setDescription(data.description)
            setCategories(data.category)
            setThumbnail(data.thumbnail)
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect (()=>{
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  const createBook = async (e) => {
    e.preventDefault();
    console.table([title, slug]);


    const formData = new FormData();
    formData.append("bookId", bookId);
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("stars", stars);
    formData.append("description", description);
    formData.append("category", categories);
    
    if(thumbnail){
        formData.append("thumbnail", thumbnail);
    }

    try {

      const response = await fetch(`${serverUrl}/api/books`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        setTitle("");
        setSlug("");
        setSubmitted(true);
      } else {
        console.log("Failed to submit data.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = (e) => {
    setCategories(e.target.value.split(",").map((category) => category.trim()));
  }


  const onImageChange = (e) => {
    if(e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setThumbnail(e.target.files[0]);
    }
  }

  const removeBook = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${serverUrl}/api/books/${bookId}`, {
        method: "DELETE",
  })
    if(response.status){
        navigate("/books")
        console.log("Book Deleted");
    }
    }
  catch(error){
    console.log(error);
  }
  }
  return (
    <div className="animate__animated animate__zoomIn">
      <h1>Edit Book</h1>
      <p>
        This is where we use NodeJs, Express & MongoDB to grab some data. The
        data below is pulled from a MongoDB database.
      </p>

      <button onClick={removeBook} className="delete">
        Delete Book
      </button>

      {submitted ? (
        <p>Data submitted successfully!</p>
      ) : (
        <form className="bookdetails" onSubmit={createBook}>
          <div className="col-1">
            <label>Upload Thumbnail</label>

            {image? (<img src={`${image}`} alt="preview image" />):(

            <img src={`${serverUrl}/uploads/${thumbnail}`} alt="preview image" />)}
            <input 
            onChange={onImageChange}
            type="file" accept="image/gif, image/jpeg, image/png" />
          </div>
          <div className="col-2">
            <div>
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label>Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
            
            <div>
              <label>Stars</label>
              <input
                type="text"
                value={stars}
                onChange={(e) => setStars(e.target.value)}
              />
            </div>

            <div>
              <label>Description</label>
              <textarea
                rows="4"
                cols="50"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label>Categories (comma-separated)</label>
              <input
                type="text"
                value={categories}
                onChange={handleCategoryChange}
              />
            </div>

            <input type="submit" />
          </div>
        </form>
      )}
    </div>
  );
}

export default EditBooks;

