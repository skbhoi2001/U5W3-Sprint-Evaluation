import styles from "./ProductList.module.css"
function ProductList({ data, handleDelete }) {
    return (
      <div>
        <div >
          {data.map((item) => {
            return (
              <div className={styles.products} key={item.id}>
                <p>{item.title}</p>
                <p>{item.cost}</p>
                <p>{item.category}</p>
                <img src={item.image}alt={item.title} />
                <button onClick={() => handleDelete(item.id)}>DELETE</button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  
  export default ProductList;