import { useEffect, useState } from "react";

const App = ()=> {
  const [list, setList] = useState([]);

  const handleFetch = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();

      console.log(data);
      setList(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return(
    <>
    <div className="container">
      <div className="row">
        <h2 className="justify text-center text-info">Nevil Product List</h2>
        <div className="col-12">
          <div>
            <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>sr.no</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {
                  list.map((products,index) => {
                    return(
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          <img src={products.thumbnail}
                          style={{ height:"50px,width:50px"}} 
                          />
                        </td>
                        <td>{products.title}</td>
                        <td>{products.price}</td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </>
  )

}
export default App;


