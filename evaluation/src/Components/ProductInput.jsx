import { useRef, useState } from "react";
import styles from "./ProductInput.module.css"
const initial = {
  title: "",
  cost: "",
  category: "",
  image: ""
};

function ProductInput({ onTaskCreate }) {
  const [formData, setFormData] = useState(initial);
  const imageRef = useRef(null);

  const handleChange = (e) => {
    let { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleImageChange = (e) => {
    const file = imageRef.current.files[0];
    let src = null;
    if (file) {
      src = URL.createObjectURL(file);
    }
    setFormData({
      ...formData,
      image: src
    });
    return () => {
      URL.revokeObjectURL(src);
    };
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onTaskCreate && onTaskCreate(formData);
    setFormData("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Title</label>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">Cost</label>
          <input
            type="number"
            placeholder="Cost"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Category: </label>
          <select
            className={styles.dropdown}
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="" key="1">
              Select a Category
            </option>
            <option value="VEGETABLES" key="vEGETABLES">
              vEGETABLES
            </option>
            <option value="FRUITS" key="FRUITS">
              FRUITS
            </option>
            <option value="PROVISION" key="PROVISION">
              PROVISION
            </option>
          </select>
        </div>
        <div>
          <label> Picture: </label>
          <input onChange={handleImageChange} ref={imageRef} type="file" />
        </div>
        <input className={styles.submit} type="submit" value="SUBMIT" />
      </form>
    </div>
  );
}

export default ProductInput;