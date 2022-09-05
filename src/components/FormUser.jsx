import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import getConfig from "../utils/getConfig";
import { useParams, useNavigate } from "react-router-dom";
import { getUsersThunk } from "../store/slices/users.slice";
import { notification } from "antd";
import Button from "react-bootstrap/Button";
import "../styles/formUser.css";

const Context = React.createContext({
  name: "Default",
});

const FormUser = () => {
  const updateUser = useSelector((state) => state.updateUser);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  //states for controlled inputs
  const [isGender, setIsGender] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [inputName, setInputName] = useState();
  const [inputEmail, setInputEmail] = useState("");

  // functions to select only one checkbox
  const isGenderChange = () => {
    setIsGender(!isGender);
  };

  const statusChange = () => {
    setIsActive(!isActive);
  };

  // initial load hook to set updateUser global state parameters
  useEffect(() => {
    const changeInput = () => {
      let valGender = "";
      let valActive = "";
      //conditional to convert boolean values ​​by gender
      if (updateUser.gender === "male") {
        valGender = true;
      } else {
        valGender = false;
      }

      if (updateUser.status === "active") {
        valActive = true;
      } else {
        valActive = false;
      }
      //values ​​to load when the global UpdateUser state changes
      setIsGender(valGender);
      setIsActive(valActive);
      setInputEmail(updateUser.email);
      setInputName(updateUser.name);
    };
    changeInput();
  }, [updateUser]);
  //function to reset the inputs after submitting the user
  const resetInput = () => {
    setIsGender(true);
    setIsActive(true);
    setInputEmail("");
    setInputName("");
  };

  //new user that will be sent as the body of the request
  const newUser = {
    name: inputName,
    gender: isGender ? "male" : "female",
    email: inputEmail,
    status: isActive ? "active" : "inactive",
  };

  //functions to execute the notifications component
  const createNotification = (placement) => {
    api.info({
      message: `User ${placement}`,
      description: (
        <Context.Consumer>
          {({ created }) => `It seccess, ${created}!`}
        </Context.Consumer>
      ),
      placement,
    });
  };

  const editedNotification = (placement) => {
    api.info({
      message: `User ${placement}`,
      description: (
        <Context.Consumer>
          {({ edit }) => `It seccess, ${edit}!`}
        </Context.Consumer>
      ),
      placement,
    });
  };

  const errorNotification = (placement) => {
    api.info({
      message: `${placement}`,
      description: (
        <Context.Consumer>
          {({}) => `the request could not be completed!`}
        </Context.Consumer>
      ),
      placement,
    });
  };

  //function  create user or edit user
  const handleSubmit = (e) => {
    e.preventDefault();

    //conditional that will determine if lancion creates the user or modifies it
    if (!id) {
      axios
        .post("https://gorest.co.in/public/v2/users", newUser, getConfig())
        .then(() => {
          dispatch(getUsersThunk());
          createNotification(inputName);
          resetInput();
        })
        .catch((error) => {
          console.log(error);
          errorNotification(error.message);
        });
    } else {
      axios
        .patch(
          `https://gorest.co.in/public/v2/users/${id}`,
          newUser,
          getConfig()
        )
        .then(() => {
          dispatch(getUsersThunk());
          editedNotification(inputName);
          resetInput();
        })
        .catch((error) => {
          console.log(error.response.data);
          errorNotification(error.message);
        });
      navigate("/");
    }
  };

  return (
    <div className="containerForm">
      <form onSubmit={handleSubmit}>
        <label className="labelName">
          Name User
          <input
            type="text"
            value={inputName || ""}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="Pepito perez"
          />
        </label>
        <br />
        <label>
          Email
          <input
            type="text"
            value={inputEmail || ""}
            onChange={(e) => setInputEmail(e.target.value)}
            placeholder="pepitopere@email.com"
          />
        </label>
        <br />
        <div className="containerGender">
          Gender
          <label>
            Male
            <input
              type="checkbox"
              onChange={isGenderChange}
              checked={isGender}
              className="checkMale"
            />
          </label>
          <label>
            Female
            <input
              type="checkbox"
              onChange={isGenderChange}
              checked={!isGender}
              className="checkFemale"
            />
          </label>
        </div>
        <div className="containerStatus">
          Status
          <label>
            Active
            <input
              type="checkBox"
              checked={isActive}
              onChange={statusChange}
              className="active"
            />
          </label>
          <label>
            inactive
            <input
              type="checkBox"
              checked={!isActive}
              onChange={statusChange}
              className="inactive"
            />
          </label>
          <br />
        </div>
        <br />
        <Button variant="secondary" type="submit" size="sm">
          {!id ? "Create user" : "Edit user"}
        </Button>{" "}
      </form>
      <Context.Provider
        value={{
          created: "Created",
          edit: "edited",
        }}
      >
        {contextHolder}
      </Context.Provider>
      <br />
      <br />
    </div>
  );
};

export default FormUser;
