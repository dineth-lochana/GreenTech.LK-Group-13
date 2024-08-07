import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { saveAs } from 'file-saver';
import QuotationForm_View_A from './QuotationForm_View_A';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [isUpdatePopupOpen, setUpdatePopupOpen] = useState(false);
  const [isViewPopupOpen, setViewPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});


  //Login

         async function fetchUserTypeAndVerifiedFromLocalStorage() {
          try {
            // Retrieve the user email from localStorage
            const userEmail = localStorage.getItem('useremail');
            if (!userEmail) {
              throw new Error('User email not found in localStorage');

            }

            // Make a request to fetch the user type and verified status using the user email
            const response = await axios.get(`http://localhost:8800/profile/${encodeURIComponent(userEmail)}`);
            console.log("User type is " + response.data.type);
            console.log("User verified status is " + response.data.verified);

            return {
              userType: response.data.type,
              verified: response.data.verified
            };
          } catch (error) {
            console.error('Error fetching user type and verified status:', error);
            throw error; // Rethrow the error to be handled by the caller
          }
        }

        const [userType, setUserType] = useState(null);
        const [verified, setVerified] = useState(null);

        useEffect(() => {
          const getUserTypeAndVerified = async () => {
            try {
              const { userType, verified } = await fetchUserTypeAndVerifiedFromLocalStorage();
              setUserType(userType);
              setVerified(verified);
            } catch (error) {
              console.error('Error fetching user type and verified status:', error);
              // Handle error
            }
          };

          getUserTypeAndVerified();
        }, []);



  useEffect(() => {
    const fetchAllRequests = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/all`);
        const sorted = res.data.sort((a, b) => new Date(b.idmsg) - new Date(a.idmsg));
        setItems(sorted);
      } catch (err) {
        console.log(err);
      }
    };

    const intervalId = setInterval(fetchAllRequests, 2000); // Fetch every 2 seconds

    return () => clearInterval(intervalId);
  }, []);

const handlePrint = (item) => {
  // Construct the printed details
  const printedDetails = `Full Name: ${item.Full_Name}\nSubject: ${item.Subject}\nCompany Name: ${item.Company_Name}\nEmail Address: ${item.Email_Address}\nContact Number: ${item.Contact_Number}\nDetails: ${item.Details}`;

  // Create a new window and set its content to the PDF
  const printWindow = window.open('', '_blank');
  printWindow.document.open();
  printWindow.document.write(`
    <html>
      <head>
        <title>Request Details</title>
      </head>
      <body>
        <pre>${printedDetails}</pre>
        <script>window.print();</script>
      </body>
    </html>
  `);
  printWindow.document.close();
};


  
  const handleView = (item) => {
    
    setSelectedItem(item);
    setViewPopupOpen(true);
  };

  const handleViewClose = () => {
    setViewPopupOpen(false);
  };


  return (
    <div className="ItemList-container_A">
      <h1>Request List</h1>
      <h2 className="h22">(Requests viewed by Admin cannot be Updated or Deleted by Users.)</h2>
      <div className="item-list">
        {items.map((item) => (
          <div key={item.id} className="item-box">
            <h2>{item.Subject}</h2>     
            {(item.admin_view === 1) && ( 
              <div>
                <button type="button" onClick={() => handlePrint(item)}>Print</button>
            <button type="button" onClick={() => handleView(item)}>Already Viewed</button>
              </div>
            )}
            {(item.admin_view === 0) && ( 
              <div>
                <button type="button" onClick={() => handlePrint(item)}>Print</button>
            <button type="button" onClick={() => handleView(item)}>View</button>
              </div>
            )}
          </div>
        ))}
      </div>
      {isViewPopupOpen && (
        <QuotationForm_View_A
          item={selectedItem}
          onClose={handleViewClose}
        />
      )}
    </div>
  );
};

export default ItemList;
