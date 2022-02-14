import { useEffect, useState } from "react";
import ProductInput from "./ProductInput";
import { v4 as uuid } from "uuid";
import ProductList from "./ProductList";
import styles from "./Product.module.css"

function Product() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const getData = (page) => {
    fetch(
      `https://masai-react-assignment.herokuapp.com/formDetails?_limit=5&_page=${page}`
    )
      .then((res) => res.json())
      .then((res) => {
        setData([...res]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData(page);
  }, [page]);

  const handleTask = ({ title, cost, image, category }) => {
    const payload = {
      id: uuid(),
      title: title,
      cost: cost,
      image: image,
      category: category
    };
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    };
    fetch(`https://masai-react-assignment.herokuapp.com/formDetails`, config);
  };
  const handleDelete = async (id) => {
    try {
      await fetch(
        `https://masai-react-assignment.herokuapp.com/formDetails/${id}`,
        {
          method: "DELETE"
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  const [categoryData, setCategoryData] = useState({
    categoryitem: "Show All"
  });
  const handlecategoryitem = (categoryitem) => {
    setCategoryData({ categoryitem: categoryitem });
  };

  const [order, setOrder] = useState({
    sortMethod: null
  });
  const handleSort = (order) => {
    setOrder({ sortMethod: order });
  };
  const handlePage = (e) => {
    switch (e.target.name) {
      case "Prev":
        if (page <= 1) {
          setPage(1);
        } else {
          setPage((prev) => prev - 1);
        }
        break;
      case "Next":
        setPage((next) => next + 1);
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <div>
        <ProductInput onTaskCreate={handleTask} />
      </div>
      <div>
        <div className={styles.category}>
          <p className={styles.heading}>Category:</p>
          {["Show All", "VEGETABLES", "FRUITS", "PROVISION"].map(
            (categoryitem) => {
              return (
                <button
                className={styles.categoryButton}
                  key={categoryitem}
                  onClick={() => handlecategoryitem(categoryitem)}
                >
                  {categoryitem}
                </button>
              );
            }
          )}
        </div>
        <div className={styles.category}>
        <p className={styles.heading}>Sort Item</p>
          {["All", "Low To High", "High To Low"].map((cost) => {
            return (
              <button key={cost} className={styles.categoryButton} onClick={() => handleSort(cost)}>
                {cost}
              </button>
            );
          })}
        </div>
      </div>
      <div>
          <h1>Products</h1>
        <ProductList
          handleDelete={handleDelete}
          data={data
            .filter((department) => {
              if (categoryData.categoryitem === "Show All") {
                return "Show All";
              }
              return department.category === categoryData.categoryitem;
            })
            .sort((a, b) => {
              if (order.sortMethod === "Low To High") {
                return a.cost - b.cost;
              }
              if (order.sortMethod === "High To Low") {
                return b.cost - a.cost;
              }
              return 0;
            })}
        />
      </div>
      <div>
        {
          <div className={styles.page}>
            <button name="Prev" onClick={(e) => handlePage(e)}>
              Prev
            </button>
            <h5>{page}</h5>
            <button name="Next" onClick={(e) => handlePage(e)}>
              Next
            </button>
          </div>
        }
      </div>
    </div>
  );
}

export default Product;