import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Book() {
  const serverUrl = import.meta.env.VITE_SERVER_URL
  const baseUrl = `${serverUrl}/api/books`;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl;
        if (selectedCategory) {
          url += `?category=${selectedCategory}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch the data");
        }

        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError("Error fetching data. Please try again later");
        setIsLoading(false);
      }
    };
    fetchData();
  }, [baseUrl, selectedCategory]);

  return (
    <div className="animate__animated animate__zoomIn">
      <h1 className="title">Book Store</h1>

      <h4 className="title">Find you favorite book here</h4>
      {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}

      <div className="addButton">
        <Link to="/createbook">+ Add New</Link>
      </div>
      <div>
        <div className="filters">
          <label>Categories</label>

          <select onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">All</option>
            <option value="romance">Romance</option>
            <option value="science">Science</option>
            <option value="crime">Crime</option>
            <option value="food">Food</option>
            <option value="adventure">Adventure</option>
            <option value="thriller">Thriller</option>
            <option value="fiction">Fiction</option>
            <option value="others">Others</option>
          </select>
        </div>
      </div>
      <div>
        {isLoading ? (
          <p>Loading data...</p>
        ) : error ? (
          <p>Error fetching data</p>
        ) : (
          <ul className="books">
            {data.map((item) => (
              <li key={item._id}>
                <Link to={`/books/${item.slug}`}>
                  <img
                    src={`${serverUrl}/uploads/${item.thumbnail}`}
                    alt={item.title}
                  />
                  <h3>{item.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Book;
