import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const NewsApp = () => {

  const [news, setNews] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getNews();
  }, []);

  const getNews = async () => {
    const response = await axios.get("https://muhdaffawibi.com/news");
    setNews(response.data);
  };

  const deleteNews = async (id) => {
    try {
      await axios.delete(`https://muhdaffawibi.com/news/${id}`);
      getNews();
    } catch (error) {
      console.log(error);
    }
  };

  // Pagination
  const itemsPerPage = 5;

  const lastIndex = currentPage * itemsPerPage;

  const firstIndex = lastIndex - itemsPerPage;

  const currentNews = news.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(news.length / itemsPerPage);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex justify-center mt-5">
      <div className="container bg-white rounded-t-lg shadow-lg">
        <div className="flex justify-between items-center px-4 py-2 bg-blue-500 text-white rounded-t-lg">
          <h1 className="text-2xl font-bold">
            News App
          </h1>
          <Link
            to="add"
            className="bg-green-500 hover:bg-green-600 text-white font-light py-2 px-4 rounded"
          >
            Add New
          </Link>
        </div>
        <div className="overflow-x-auto justify-center items-center">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-2 px-4 border-b font-semibold">
                  No
                </th>
                <th className="py-2 px-4 border-b font-semibold">
                  Author
                </th>
                <th className="py-2 px-4 border-b font-semibold">
                  Title
                </th>
                <th className="py-2 px-4 border-b font-semibold">
                  Caption
                </th>
                <th className="py-2 px-4 border-b font-semibold">
                  Content
                </th>
                <th className="py-2 px-4 border-b font-semibold">
                  Image
                </th>
                <th className="py-2 px-4 border-b font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentNews.map((news, index) => (
                <tr
                  key={news.id}
                  className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                >
                  <td className="py-3 px-4 border-b">
                    {index + 1 + itemsPerPage * (currentPage - 1)}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {news.author}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {news.title}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {news.caption}
                  </td>
                   <td className="py-3 px-4 border-b">
                    <div className="m-auto truncate overflow-hidden w-96 text-left">
                      {news.content}
                    </div>
                  </td>
                  <td className="py-3 px-4 border-b">
                    <img
                      src={news.image}
                      alt="News Image"
                      className="h-16 w-20 object-contain"
                    />
                  </td>
                  <td className="py-3 px-4 border-b">
                    <div className="grid sm:flex justify-center items-center space-x-2">
                      <Link
                        to={`edit/${news.id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-center font-light my-2 sm:m-0 py-1 px-4 rounded"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteNews(news.id)}
                        className="bg-red-600 hover:bg-red-600 text-white text-center font-light my-2 sm:m-0 py-1 px-4 rounded"
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

export default NewsApp;
