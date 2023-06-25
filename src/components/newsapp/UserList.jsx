import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserList = () => {

  const [users, setUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("https://muhdaffawibi.com/news");
    setUsers(response.data);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://muhdaffawibi.com/news/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  // Pagination
  const itemsPerPage = 5;

  const lastIndex = currentPage * itemsPerPage;

  const firstIndex = lastIndex - itemsPerPage;

  const currentUsers = users.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex justify-center mt-5">
      <div className="container bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center px-4 py-2 bg-blue-500 text-white rounded-t-lg">
          <h1 className="text-lg font-bold">User List</h1>
          <Link
            to="add"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
          >
            Add New
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-2 px-4 border-b">
                  No
                </th>
                <th className="py-2 px-4 border-b">
                  Author
                </th>
                <th className="py-2 px-4 border-b">
                  Title
                </th>
                <th className="py-2 px-4 border-b">
                  Caption
                </th>
                <th className="py-2 px-4 border-b">
                  Content
                </th>
                <th className="py-2 px-4 border-b">
                  Image
                </th>
                <th className="py-2 px-4 border-b">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                >
                  <td className="py-3 px-4 border-b">
                    {index + 1 + itemsPerPage * (currentPage - 1)}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {user.author}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {user.title}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {user.caption}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {user.content}
                  </td>
                  <td className="py-3 px-4 border-b">
                    <img
                      src={user.image}
                      alt="User Image"
                      className="h-14 w-16"
                    />
                  </td>
                  <td className="py-3 px-4 border-b">
                    <div className="flex space-x-2">
                      <Link
                        to={`edit/${user.id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center my-4">
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => changePage(index + 1)}
                className={`${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-white text-blue-500"
                } font-bold py-2 px-4 rounded`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
