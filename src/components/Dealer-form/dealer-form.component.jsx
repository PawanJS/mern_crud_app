import React, { useState } from 'react';
import axios from 'axios';

import FormInput from '../Form-input/form-input.component';
import closeIcon from '../../assets/closeIcon.svg';

import './dealer-form.styles.scss';

export const DealerForm = ({ show, setShow, setDealerData }) => {
  const [formValues, setFormValues] = useState({
    name: '',
    quantity: '',
    longitude: '',
    latitude: '',
    total: '',
    remaining: '',
    ownerFirstName: '',
    ownerLastName: '',
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
        }/dealer/create-dealer`,
        formValues
      )
      .then((response) => {
        alert('Dealer created Successfully!');
        setShow(false);
        setFormValues({
          name: '',
          quantity: '',
          longitude: '',
          latitude: '',
          total: '',
          remaining: '',
          ownerFirstName: '',
          ownerLastName: '',
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
            Add Dealer
            <button className="btn close-form" onClick={closeDealerForm}>
              <img src={closeIcon} alt="form close" />
            </button>
          </h3>
          <p>All fields are mandatory.</p>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <FormInput
            name="name"
            type="text"
            id="name"
            handleChange={handleChange}
            value={formValues.name}
            label="Dealer's Name"
            placeholder="Dealer's Name"
            required
          />
          <FormInput
            name="quantity"
            type="number"
            id="quantity"
            handleChange={handleChange}
            value={formValues.quantity}
            label="Amount of Cars"
            placeholder="Amount of Cars"
            required
          />
          <FormInput
            name="longitude"
            type="number"
            id="location"
            handleChange={handleChange}
            value={formValues.longitude}
            label="Location"
            placeholder="longitude"
            required
          >
            <input
              className="form-input justify-right"
              name="latitude"
              type="number"
              onChange={handleChange}
              value={formValues.latitude}
              placeholder="latitude"
              required
            />
          </FormInput>
          <FormInput
            name="total"
            type="number"
            id="total"
            handleChange={handleChange}
            value={formValues.total}
            label="Total Budget"
            placeholder="Total Budget"
            required
          />
          <FormInput
            name="remaining"
            type="number"
            id="remaining"
            handleChange={handleChange}
            value={formValues.remaining}
            label="Remaining Budget"
            placeholder="Remaining Budget"
            required
          />
          <FormInput
            name="ownerFirstName"
            type="text"
            id="ownerFirstName"
            handleChange={handleChange}
            value={formValues.ownerFirstName}
            label="Owner's First Name"
            placeholder="First Name"
            required
          />
          <FormInput
            name="ownerLastName"
            type="text"
            id="ownerLastName"
            handleChange={handleChange}
            value={formValues.ownerLastName}
            label="Owner's Last Name"
            placeholder="Last Name"
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
