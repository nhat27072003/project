// import React, { useEffect, useState } from 'react';
// import './manageUsers.css';
// import ReactPaginate from 'react-paginate';
// import { getUsers } from '../../../services/manageUsers';
// import { Link } from 'react-router-dom';

// const ManageUsers = () => {
//   const [items, setItems] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageCount, setPageCount] = useState(0);
//   const limit = 10;

//   const fetchUsers = async (page) => {
//     try {
//       const response = await getUsers(page, limit);
//       if (response.EC === 0) {
//         setItems(response.DT.users);
//         setPageCount(response.DT.totalPage);
//       } else {
//         alert(response.EM);
//       }
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers(currentPage);
//   }, [currentPage]);

//   const handlePageClick = (event) => {
//     setCurrentPage(event.selected + 1);
//   };

//   const Items = ({ items }) => (
//     <div >
//       {items && (
//         <div class="container">

//           <div class="main-content">
//             <div className="left">
//               <div className="title-manageuser">
//                 <h1>User Management</h1>
//                 <div class="top-bar">
//                   <input type="text" placeholder="Search Users" id="search" />
//                   <button id="searchButton" disabled>Search</button>
//                 </div>
//               </div>
//               <div class="filter-section">
//                 <h2>Filter Users</h2>
//                 <div class="filter-group">
//                   <label for="role">Role:</label>
//                   <select id="role">
//                     <option value="admin">Admin</option>
//                     <option value="user">User</option>
//                     <option value="store">Store</option>
//                   </select>
//                 </div>
//                 <div class="filter-group">
//                   <label for="status">Status:</label>
//                   <select id="status">
//                     <option value="0">Active</option>
//                     <option value="1">Inactive</option>
//                   </select>
//                 </div>
//                 <button id="filterButton" disabled>Apply Filters</button>

//               </div>
//             </div>
//             <div class="user-table">
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Username</th>
//                     <th>Email</th>
//                     <th>Address</th>
//                     <th>Phone</th>
//                     <th>Role</th>
//                     <th>Status</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {items.map((u) => (
//                     <tr key={u.username}>
//                       <td>{u.username}</td>
//                       <td>{u.email}</td>
//                       <td>{u.address}</td>
//                       <td>{u.phone}</td>
//                       <td>{u.role}</td>
//                       <td>{u.status === 0 ? "Active" : "Inactive"}</td>
//                       <td>
//                         <Link to={`/admin/updateuser/${u.userID}`}><button onClick={() => { }}><i class='bx bx-edit'></i></button></Link>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div class="manage-user">
//       <Items items={items} />
//       <ReactPaginate
//         nextLabel="next >"
//         onPageChange={handlePageClick}
//         pageRangeDisplayed={5}
//         marginPagesDisplayed={2}
//         pageCount={pageCount}
//         previousLabel="< previous"
//         pageClassName="page-item"
//         pageLinkClassName="page-link"
//         previousClassName="page-item"
//         previousLinkClassName="page-link"
//         nextClassName="page-item"
//         nextLinkClassName="page-link"
//         breakLabel="..."
//         breakClassName="page-item"
//         breakLinkClassName="page-link"
//         containerClassName="pagination"
//         activeClassName="active"
//         renderOnZeroPageCount={null}
//       />
//     </div>
//   );
// };

// export default ManageUsers;

import React, { useEffect, useState } from 'react';
import './manageUsers.css';
import ReactPaginate from 'react-paginate';
import { getUsers } from '../../../services/manageUsers';
import { Link } from 'react-router-dom';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const itemsPerPage = 10;


  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      if (response.EC === 0) {
        setUsers(response.DT);
        setFilteredUsers(response.DT); // Set initial filtered users to all users
      } else {
        alert(response.EM);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRoleFilterChange = (e) => {
    setRoleFilter(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleFilter = () => {
    const filtered = users.filter((user) => {
      return (
        (roleFilter === '' || user.role === roleFilter) &&
        (statusFilter === '' || user.status === parseInt(statusFilter))
      );
    });
    setFilteredUsers(filtered);
    setItemOffset(0); // Reset pagination to the first page
  };


  const handleSearch = () => {
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
    setItemOffset(0); // Reset pagination to the first page
  };
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredUsers.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredUsers.length;
    setItemOffset(newOffset);
  };

  const Items = ({ items }) => (
    <>
      {items && (
        <div className="user-table">
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((u) => (
                <tr key={u.username}>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.address}</td>
                  <td>{u.phone}</td>
                  <td>{u.role}</td>
                  <td>{u.status === 0 ? "Active" : "Inactive"}</td>
                  <td>
                    <Link to={`/admin/updateuser/${u.userID}`}><button><i className='bx bx-edit'></i></button></Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );

  return (

    <div className="manage-user">
      <div className="container">
        <div className="main-content">
          <div className="left">
            <div className="title-manageuser">
              <h1>User Management</h1>
              <div className="top-bar">
                <input type="text" placeholder="Search Users..." onChange={handleSearchChange} />
                <button id="searchButton" onClick={handleSearch}>Search</button>
              </div>
            </div>
            <div className="filter-section">
              <h2>Filter Users</h2>
              <div className="filter-group">
                <label htmlFor="role">Role:</label>
                <select id="role" value={roleFilter} onChange={handleRoleFilterChange}>
                  <option value="">All</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="store">Store</option>
                </select>
              </div>
              <div className="filter-group">
                <label htmlFor="status">Status:</label>
                <select id="status" value={statusFilter} onChange={handleStatusFilterChange}>
                  <option value="">All</option>
                  <option value="0">Active</option>
                  <option value="1">Inactive</option>
                </select>
              </div>
              <button id="filterButton" onClick={handleFilter}>Apply Filters</button>
            </div>
          </div>
          <Items items={currentItems} />
        </div>
      </div>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default ManageUsers;


