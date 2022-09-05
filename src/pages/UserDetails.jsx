import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import "../styles/userDetails.css";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const [imageUser, setImageUser] = useState([]);
  const params = useParams();
  const { id } = params;
  const updateUser = useSelector((state) => state.updateUser);
  const navigate = useNavigate();
  const genderUser = updateUser.gender;

  useEffect(() => {
    axios.get(`https://randomuser.me/api/`).then((res) => {
      setImageUser(res.data.results[0]);
    });
  }, []);

  return (
    <div className="containerCardUser">
      <div className="containerBtn">
        <button className="buttonCard" onClick={() => navigate("/users")}>
          <BiArrowBack />
        </button>
      </div>

      <div className="cardUser">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={imageUser.picture?.large} />
          <Card.Body>
            <Card.Title>{updateUser.name}</Card.Title>
            <Card.Text>
              hello, my name is {updateUser.name}, I work at enersin and I am
              very happy with the company, I am a full stack developer, I always
              give my best in my work
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Email: {updateUser.email}</ListGroup.Item>
            <ListGroup.Item>Gender: {updateUser.gender}</ListGroup.Item>
            <ListGroup.Item>status: {updateUser.status}</ListGroup.Item>
          </ListGroup>
          <Card.Body></Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default UserDetails;
