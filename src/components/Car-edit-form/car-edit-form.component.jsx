import React, { useState, useEffect } from 'react';
import axios from 'axios';

import FormInput from '../Form-input/form-input.component';
import closeIcon from '../../assets/closeIcon.svg';

import '../Car-form/car-form.styles.scss';

export const CarEditForm = ({
  showEdit,
  id,
  setShowEdit,
  setDealerData,
  setCarData,
}) => {
  const [formValues, setFormValues] = useState({
    dealer: '',
    brand: '',
    model: '',
    color: '',
    price: '',
  });

  useEffect(() => {
    const url = `${
      process.env.NODE_ENV !== 'production'
        ? process.env.REACT_APP_DEV_URL
        : process.env.REACT_APP_PROD_URL
    }/car/edit-car/${id}`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        setFormValues({
          dealer: data.dealer,
          brand: data.brand,
          model: data.model,
          color: data.color,
          price: data.price,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const closeDealerForm = () => {
    setShowEdit(false);
    document.body.style.overflow = 'auto';
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(
        `${
          process.env.NODE_ENV !== 'production'
            ? process.env.REACT_APP_DEV_URL
            : process.env.REACT_APP_PROD_URL
        }/car/update-car/${id}`,
        formValues
      )
      .then((response) => {
        alert('Car Edited Successfully!');
        setShowEdit(false);
        setFormValues({
          dealer: '',
          brand: '',
          model: '',
          color: '',
          price: '',
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    showEdit && (
      <div className="form-container">
        <div className="form-title">
          <h3>
            Edit Car
            <button className="btn close-form" onClick={closeDealerForm}>
              <img src={closeIcon} alt="form close" />
            </button>
          </h3>
          <p>All fields are mandatory.</p>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <FormInput
            name="brand"
            type="text"
            id="brand"
            handleChange={handleChange}
            value={formValues.brand}
            label="Brand"
            placeholder="Brand Name"
            required
          />
          <FormInput
            name="model"
            type="number"
            id="model"
            handleChange={handleChange}
            value={formValues.model}
            label="Model"
            placeholder="Model"
            required
          />
          <FormInput
            name="color"
            type="text"
            id="color"
            handleChange={handleChange}
            value={formValues.color}
            label="color"
            placeholder="color"
            required
          />
          <FormInput
            name="price"
            type="number"
            id="ownerFirstName"
            handleChange={handleChange}
            value={formValues.price}
            label="Price"
            placeholder="$0.00"
            required
          />
          <div className="form-footer">
            <button className="btn cancel-btn" onClick={closeDealerForm}>
              Cancel
            </button>
            <button className="btn save-btn" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    )
  );
};
