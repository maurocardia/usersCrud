import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersThunk } from "../store/slices/users.slice";
import FormUser from "../components/FormUser";
import "antd/dist/antd.css";
import Table from "react-bootstrap/Table";
import getConfig from "../utils/getConfig";
import axios from "axios";

const Users = () => {
  let data = [];
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getUsersThunk())

  }, [])

 const updateUser = (id) =>{
    alert(id)
    axios.get("https://gorest.co.in/public/v2/users",  getConfig())
 }

  console.log(users);
  return (
    <div>
      <FormUser updateUser={updateUser} />
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
              <td>
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => updateUser(user.id)}
                >
                  Edit
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
