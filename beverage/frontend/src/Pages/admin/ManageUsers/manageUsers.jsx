import React, { useEffect, useState } from 'react';
import './manageUsers.css';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const limit = 10;

  const fetchUsers = async (page) => {
    try {
      const response = await axios.get(`http://localhost:8081/admin/getuser/getpage?page=${page}&limit=${limit}`);
      if (response.data.EC === 0) {
        setItems(response.data.DT.users);
        setPageCount(response.data.DT.totalPage);
      } else {
        alert(response.data.EM);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handlePageClick = (event) => {
    console.log(event);
    setCurrentPage(event.selected + 1);
  };

  const Items = ({ items }) => (
    <>
      {items && (
        <div className="items">
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {items.map((u) => (
                <tr key={u.username}>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.address}</td>
                  <td>{u.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );

  return (
    <div className="container">
      <Items items={items} />
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
