import React, { useState } from 'react';
import axios from 'axios';

import FormInput from '../Form-input/form-input.component';
import closeIcon from '../../assets/closeIcon.svg';

import './car-form.styles.scss';

export const CarForm = ({ show, setShow, dealer, setDealerData }) => {
  const [formValues, setFormValues] = useState({
    dealer: dealer,
    brand: '',
    model: '',
    color: '',
    price: '',
  });

  const closeDealerForm = () => {
    setShow(false);
    document.body.style.overflow = 'auto';
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        `${
          process.env.NODE_ENV !== 'production'
            ? process.env.REACT_APP_DEV_URL
            : process.env.REACT_APP_PROD_URL
        }/car/create-car`,
        formValues
      )
      .then((response) => {
        alert('Car created Successfully!');
        setShow(false);
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
    show && (
      <div className="form-container">
        <div className="form-title">
          <h3>
            Add Car
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
            value={formValues.ownerFirstName}
            label="Price"
            placeholder="$0.00"
            required
          />
          <div className="form-footer">
            <button className="btn cancel-btn" onClick={closeDealerForm}>
              Cancel
            </button>
            <button className="btn save-btn" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    )
  );
};
