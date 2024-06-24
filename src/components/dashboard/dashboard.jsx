import React from "react";
import "./dashboard.css";

const Dashboard = () => {
  const user = JSON.parse(sessionStorage.getItem("userData")) || {};
  console.log(user);
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h2>User Details</h2>
        </div>
        <div className="card-body">
          <img
            src="https://cdn-icons-png.flaticon.com/512/164/164641.png"
            alt="User Avatar"
            className="user-image"
          />
          <p>
            <strong>Email : </strong> {user.ConfirmEmail}
          </p>
          <p>
            <strong>Name : </strong> {user.Name}
          </p>
          <p>
            <strong>DOB : </strong> {user.DOB}
          </p>

          <p>
            <strong>Gender :</strong> {user.Gender}
          </p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
