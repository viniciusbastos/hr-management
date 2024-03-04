import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import foto from "../assets/profile.png";
import config from "../utils/config";
import { useQuery } from "@tanstack/react-query";
import fetchUsers from "../services/fetchUsers";

function Table() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const results = useQuery(["vacation"], fetchUsers);
  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  // useEffect(() => {
  //   api.get("/user", config).then((response) => {
  //     setUsers(response.data);
  //     console.log(users);
  //   });
  // }, []);
  const getData = () => {
    api.get(`/user`).then((getData) => {
      setUsers(getData.data);
    });
  };
  function handleDelete(id: any) {
    api.delete(`/user/${id}`, config).then(() => {
      getData();
    });
  }

  return (
    <div className="flex flex-col mt-10">
      <div className="shadow-lg overflow-scrool border-b border-gray-200 dark:border-gray-700 sm:rounded-lg mr-10 ml-10">
        <table className="rounded-xl min-w-full divide-y divide-gray-200 dark:divide-gray-700 dark:border-gray-700">
          <thead className="bg-caqui-800 dark:bg-gray-700">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider"
              >
                Nome
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider"
              >
                Posto/Grad
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-black dark:text-white uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-black  dark:text-white uppercase tracking-wider"
              >
                Matrícula
              </th>
              {/* <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
              >
                Edit
              </th> */}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {results.data.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div
                      className="flex-shrink-0 h-10 w-10"
                      onClick={() => {
                        navigate(`/details/${user.id}`);
                      }}
                    >
                      <img
                        src={foto}
                        className="h-15 w-15 rounded-full"
                        alt=""
                      />
                    </div>
                    <div
                      className="ml-4"
                      onClick={() => {
                        navigate(`/details/${user.id}`);
                      }}
                    >
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-200">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {user.posto}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className="px-2 inline-flex text-xs leading-5
                          font-semibold rounded-full bg-green-100 text-green-800"
                  >
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white">
                  {user.mat}
                </td>
                {/* <td>
                  <button
                    type="button"
                    className="px-2  bg-red-600  py-1 border hover:bg-red-400 rounded-full"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
