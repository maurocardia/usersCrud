import { Button, Form, Input, InputNumber } from "antd";
import React, { useState } from "react";
import { Checkbox } from "antd";
import { useSelector,  useDispatch } from "react-redux";
import axios from "axios";
import getConfig from "../utils/getConfig";
import { setUpdateUser } from "../store/slices/updateUser.slice";


const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const FormUser = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  const [isGender, setIsGender] = useState(true);
  const [isActive, setIsActive] = useState(true)
  const [inputName, setInputName] = useState("")
  const [inputEmail,setInputEmail] = useState("")
  const dispatch = useDispatch()
  const updateUser = useSelector(state => state.updateUser)

  const isGenderChange = () => {
    setIsGender(!isGender); 
  };

  const statusChange = () =>{
    setIsActive(!isActive)
  }

  const newUser = {
    name: inputName,
    gender: (isGender? "male":"female"),
    email: inputEmail,
    status: (isActive? "active":"inactive")

  }

const handleSubmit=(e)=>{
  e.preventDefault(
    axios.post("https://gorest.co.in/public/v2/users",newUser,getConfig())
  )
}


 
console.log(newUser)
  return (
    <div className="containerForm">
        <Form 
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        onSubmit={handleSubmit}
        >
        <Form.Item
            name={["user", "name"]}
            label="Name"
            rules={[
            {
                required: true,
            },
            ]}
            onChange={e=>setInputName(e.target.value)}
            value={inputName}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name={["user", "email"]}
            label="Email"
            rules={[
            {
                type: "email",
            },
            ]}
            onChange={e=>setInputEmail(e.target.value)}
            value={inputEmail}
        >
            <Input />
        </Form.Item>
        
        <div>
            <label>
            Male
            <Checkbox
                defaultChecked={false}
                checked={isGender}
                onChange={isGenderChange}
            />
            </label>
            <label>
            Female
            <Checkbox
                defaultChecked={false}
                checked={!isGender}
                onChange={isGenderChange}
            />
            </label>
            </div>
            <div>

            <label>
            Active
            <Checkbox
                defaultChecked={false}
                checked={isActive}
                onChange={statusChange}
            />
            </label>
            <label>
            inactive
            <Checkbox
                defaultChecked={false}
                checked={!isActive}
                onChange={statusChange}
            />
            </label>
        </div>
        

         <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
            Submit
            </Button>
        </Form.Item>
        </Form>
    </div>
  );
};

export default FormUser;
