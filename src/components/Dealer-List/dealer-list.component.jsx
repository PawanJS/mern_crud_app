import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { DealerForm } from '../Dealer-form/dealer-form.component';
import { DealerEditForm } from '../Dealer-edit-form/dealer-edit-form.component';

import './dealer-list.styles.scss';

export const DealerList = () => {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [dealerData, setDealerData] = useState([]);
  const [id, setId] = useState();
  const [searchText, setSearchText] = useState('');

  const openDealerForm = () => {
    setShow(true);

    document.body.style.overflow = 'hidden';
  };

  useEffect(() => {
    const url = `${
      process.env.NODE_ENV !== 'production'
        ? process.env.REACT_APP_DEV_URL
        : process.env.REACT_APP_PROD_URL
    }/dealer/`;
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setDealerData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [show, showEdit]);

  const handleEdit = (event) => {
    const dealerId = event.target.getAttribute('data-id');
    setId(dealerId);
  };

  const handleDelete = (event) => {
    const dealerId = event.target.getAttribute('data-id');

    axios
      .delete(
        `${
          process.env.NODE_ENV !== 'production'
            ? process.env.REACT_APP_DEV_URL
            : process.env.REACT_APP_PROD_URL
        }/dealer/delete-dealer/${dealerId}`
      )
      .then((response) => alert('Dealer Deleted Successfully!'))
      .catch((error) => console.log(error));

    const newDealerData = dealerData.filter(
      (dealer) => dealer._id !== dealerId
    );
    setDealerData(newDealerData);
  };

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  const newDealerData = dealerData.filter((dealer) =>
    dealer.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="dealer-list">
      <h2>Dealership</h2>
      <div className="wrapper">
        <input
          type="text"
          value={searchText}
          placeholder="Search by dealer name"
          onChange={handleChange}
          className="search_dealers"
        />
        <button className="btn add-dealer" onClick={openDealerForm}>
          + Add Dealer
        </button>
      </div>
      {newDealerData.length > 0 ? (
        <div className="table">
          <div className="table-row">
            <div className="table-head">Sr.No</div>
            <div className="table-head">Name</div>
            <div className="table-head">Amount of Cars</div>
            <div className="table-head">Total Budget</div>
            <div className="table-head">Remaining Budget</div>
            <div className="table-head">Actions</div>
          </div>
          {newDealerData.map((dealer, index) => (
            <div className="table-row" key={dealer._id}>
              <div className="table-cell">{index + 1}</div>
              <div className="table-cell">{dealer.name}</div>
              <div className="table-cell">{dealer.quantity}</div>
              <div className="table-cell">${dealer.total}</div>
              <div className="table-cell">${dealer.remaining}</div>
              <div className="table-cell action-btn-wrapper">
                <button className="view btn">
                  <Link to={`/dealer/${dealer._id}`}>View</Link>
                </button>
                <button
                  className="edit btn"
                  onClick={(event) => {
                    handleEdit(event);
                    setShowEdit(true);
                    document.body.style.overflow = 'hidden';
                  }}
                  data-id={dealer._id}
                >
                  Edit
                </button>
                <button
                  className="delete btn"
                  onClick={handleDelete}
                  data-id={dealer._id}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No Dealers to show add a dealer.</p>
      )}
      {show && (
        <>
          <div className="overlay"></div>
          <DealerForm
            show={show}
            setShow={setShow}
            setDealerData={setDealerData}
          />
        </>
      )}
      {showEdit && (
        <>
          <div className="overlay"></div>
          <DealerEditForm
            showEdit={showEdit}
            setShowEdit={setShowEdit}
            setDealerData={setDealerData}
            id={id}
          />
        </>
      )}
    </div>
  );
};
