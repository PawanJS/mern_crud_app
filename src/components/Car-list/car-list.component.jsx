import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

import { CarForm } from '../Car-form/car-form.component';
import { CarEditForm } from '../Car-edit-form/car-edit-form.component';

import './car-list.styles.scss';

export const CarList = () => {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [carData, setCarData] = useState([]);
  const [dealer, setDealer] = useState({ name: '' });
  const [carId, setCarId] = useState();
  const [searchText, setSearchText] = useState('');

  const { id } = useParams();

  const openDealerForm = () => {
    setShow(true);

    document.body.style.overflow = 'hidden';
  };

  useEffect(() => {
    const url = `${
      process.env.NODE_ENV !== 'production'
        ? process.env.REACT_APP_DEV_URL
        : process.env.REACT_APP_PROD_URL
    }/dealer/edit-dealer/${id}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setDealer(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [show, showEdit]);

  useEffect(() => {
    const url = `${
      process.env.NODE_ENV !== 'production'
        ? process.env.REACT_APP_DEV_URL
        : process.env.REACT_APP_PROD_URL
    }/car`;
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        const newData = data.filter((da) => da.dealer === id);
        setCarData(newData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [show, showEdit]);

  const handleEdit = (event) => {
    const carId = event.target.getAttribute('data-id');
    setCarId(carId);
  };

  const handleDelete = (event) => {
    const carId = event.target.getAttribute('data-id');

    axios
      .delete(
        `${
          process.env.NODE_ENV !== 'production'
            ? process.env.REACT_APP_DEV_URL
            : process.env.REACT_APP_PROD_URL
        }/car/delete-car/${carId}`
      )
      .then((response) => alert('Car Deleted Successfully!'))
      .catch((error) => console.log(error));

    const newCarData = carData.filter((car) => car._id !== carId);
    setCarData(newCarData);
  };

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  const newCarData = carData.filter((car) =>
    car.brand.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="container">
      <div className="dealer-list">
        <h2>Dealership: {dealer.name}</h2>
        <div className="wrapper">
          <input
            value={searchText}
            type="text"
            onChange={handleChange}
            placeholder="Search car"
            className="search_dealers"
          />
          <div>
            <button className="btn add-dealer" onClick={openDealerForm}>
              + Add Car
            </button>
            <button className="btn add-dealer">
              <Link to="/">Back</Link>
            </button>
          </div>
        </div>
        {newCarData.length > 0 ? (
          <div className="table">
            <div className="table-row">
              <div className="table-head">Sr.No</div>
              <div className="table-head">Brand</div>
              <div className="table-head">Model</div>
              <div className="table-head">Color</div>
              <div className="table-head">Price</div>
              <div className="table-head">Actions</div>
            </div>
            {newCarData.map((car, index) => (
              <div className="table-row" key={car._id}>
                <div className="table-cell">{index + 1}</div>
                <div className="table-cell">{car.brand}</div>
                <div className="table-cell">{car.model}</div>
                <div className="table-cell">${car.color}</div>
                <div className="table-cell">${car.price}</div>
                <div className="table-cell action-btn-wrapper">
                  <button
                    className="edit btn"
                    onClick={(event) => {
                      handleEdit(event);
                      setShowEdit(true);
                      document.body.style.overflow = 'hidden';
                    }}
                    data-id={car._id}
                  >
                    Edit
                  </button>
                  <button
                    className="delete btn"
                    onClick={handleDelete}
                    data-id={car._id}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No car to show add a car.</p>
        )}
        {show && (
          <>
            <div className="overlay"></div>
            <CarForm
              show={show}
              setShow={setShow}
              dealer={dealer}
              // setDealerData={setDealerData}
            />
          </>
        )}
        {showEdit && (
          <>
            <div className="overlay"></div>
            <CarEditForm
              showEdit={showEdit}
              setShowEdit={setShowEdit}
              // setDealerData={setDealerData}
              id={carId}
            />
          </>
        )}
      </div>
    </div>
  );
};
