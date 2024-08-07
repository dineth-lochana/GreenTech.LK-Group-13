import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./dineth.css";

const Addopinions = () => {
  const [opinion, setopinions] = useState({
    opiniontext: "",
    customername: "",
  });

  const navigate = useNavigate();

  const handlechange = (e) => {
    setopinions((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleclick = async (e) => {
    e.preventDefault();

    if (!opinion.opiniontext || !opinion.customername) {
      alert("Both fields are required.");
      return;
    }

    try {
      await axios.post("http://localhost:8800/opinions", opinion);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(opinion);

  const handleCancel = () => {
    navigate("/projects");
  };

  return (
    <div>
      <br />
      <br />
      <div className="form">
        <h1>Add New Opinion to showcase</h1>

        <input
          type="text"
          placeholder="opiniontext"
          name="opiniontext"
          onChange={handlechange}
          required
        ></input>
        <input
          type="text"
          placeholder="customername"
          name="customername"
          onChange={handlechange}
          required
        ></input>

        <button onClick={handleclick}>Add Opinion</button>

        <button onClick={handleCancel}>Cancel</button>
      </div>
      <br />
      <br />
    </div>
  );
};

export default Addopinions;
