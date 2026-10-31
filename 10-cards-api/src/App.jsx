import { useEffect, useState } from "react";

function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setList(data.products))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <h2 className="justify text-center text-info">Nevil Products</h2>
        {list.map((product) => (
          <div className="col-md-4 col-lg-3 mb-4" key={product.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={product.thumbnail}
                className="card-img-top p-3"
                alt={product.title}
                style={{ height: "200px", objectFit: "contain" }}
              />

              <div className="card-body text-center">
                <h5>{product.title}</h5>
                <h6 className="text-danger">${product.price}</h6>
                <button className="btn btn-primary w-100">
                  View Product
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
