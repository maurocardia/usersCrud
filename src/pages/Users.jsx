import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersThunk } from "../store/slices/users.slice";
import FormUser from "../components/FormUser";
import "antd/dist/antd.css";
import Table from "react-bootstrap/Table";
import {
  deleteUserThunk,
  getUserIdThunk,
} from "../store/slices/updateUser.slice";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import "../styles/users.css";
import { FiEdit, FiDelete } from "react-icons/fi";
import { FaStreetView } from "react-icons/fa";

const Context = React.createContext({
  name: "Default",
});

const Users = () => {
  const users = useSelector((state) => state.users);
  const updateUser = useSelector((state) => state.updateUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement) => {
    api.info({
      message: `User, ${placement}`,
      description: (
        <Context.Consumer>{({ name }) => `Has been ${name}!`}</Context.Consumer>
      ),
      placement,
    });
  };

  const deleteNotification = (placement) => {
    api.info({
      message: `User, ${placement}`,
      description: (
        <Context.Consumer>
          {({ deleted }) => `Has been ${deleted}!`}
        </Context.Consumer>
      ),
      placement,
    });
  };

  useEffect(() => {
    dispatch(getUsersThunk());
  }, []);

  const selectUser = (id) => {
    dispatch(getUserIdThunk(id));
    openNotification(updateUser.name);
    navigate(`/${id}`);
  };

  const deleteUser = (id) => {
    dispatch(deleteUserThunk(id));
    deleteNotification(updateUser.name);
    navigate(`/`);
  };

  const viewUser = (id) => {
    dispatch(getUserIdThunk(id));
    navigate(`/usersDetails/${id}`);
  };

  return (
    <div className="containerListUsers">
      <FormUser openNotification={openNotification} />
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.gender}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td className="containerActions">
                <div className="twoButtons">
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm buttonEdit "
                    onClick={() => selectUser(user.id)}
                  >
                    <FiEdit />
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm buttonDelete"
                    onClick={() => deleteUser(user.id)}
                  >
                    <FiDelete />
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-success btn-sm buttonView"
                    onClick={() => viewUser(user.id)}
                  >
                    <FaStreetView />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Context.Provider
        value={{
          name: "Selected",
          deleted: "Deleted",
        }}
      >
        {contextHolder}
      </Context.Provider>
    </div>
  );
};

export default Users;
