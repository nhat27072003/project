import React, { useEffect, useState } from 'react';
import './updateUser.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getDetailUser, updateUser } from '../../../services/manageUsers';

const UpdateUser = () => {
  const userID = useParams().userId;
  const [user, setUser] = useState({});
  const [newUser, setNewUser] = useState({});
  const navigate = useNavigate();

  const getUser = async () => {
    const result = await getDetailUser(userID);
    setUser(result.DT);
    setNewUser(result.DT);  // Initialize newUser with the fetched user data
  }

  useEffect(() => {
    getUser();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await updateUser(newUser);
    console.log("check response: ", res);
    if (+res.EC === 0) {
      alert("update success");
      navigate('/admin/manageusers');
    }
    else {
      alert("update fail");
    }

  };

  return (
    <div className='update-user'>
      <div className="container">
        <h1>Edit User: {user.username}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="Full Name"
                value={newUser.name || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={newUser.email || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                id="phone"
                placeholder="Phone Number"
                value={newUser.phone || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                placeholder="Address"
                value={newUser.address || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                value={newUser.role || ''}
                onChange={handleInputChange}
              >
                <option value="admin">Admin</option>
                <option value="store">Store</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                value={newUser.status || ''}
                onChange={handleInputChange}
              >
                <option value="1">inactive</option>
                <option value="0">Active</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
