
import { Input, Form, Avatar, Button, Typography } from "antd"
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { constants } from "../../constants/constants";
import { useState } from "react";
const LoginSignupForm = () => {
    const navigate = useNavigate()
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const onFinish = (values) => {
        axios.post(`${constants.baseurl}login`, { username: username, password: password })
            .then((response) => {
                if (response.data.success) {
                    navigate('/Home')
                    localStorage.setItem('username', JSON.stringify(username))
                    localStorage.setItem('usertype', response.data.usertype)
                }
                else {
                    navigate('/')
                }
            })
            .catch((error) => {
                console.log(error)
            })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '50%', padding: '10%', width: '250px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '10%', justifyContent: 'center' }}>
                <Avatar size={64} icon={<UserOutlined />} />
            </div>
            <Form
                autoComplete="off"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
                <Form.Item rules={[{ required: true, message: 'Field Not filled' }]}>
                    <Input
                        placeholder="UserName"
                        variant="outlined"
                        size="large"
                        style={{ width: '100%' }}
                        onChange={(e) => { setusername(e.target.value) }}
                    />
                </Form.Item>
                <Form.Item rules={[{ required: true, message: 'Field Not filled' }]}>
                    <Input.Password
                        placeholder="password"
                        variant="outlined"
                        size="large"
                        style={{ width: '100%' }}
                        onChange={(e) => { setpassword(e.target.value) }}
                    />
                </Form.Item>
                <Form.Item style={{ textAlign: 'center' }}>
                    <Button block style={{ width: '50%' }} htmlType="submit">Login</Button>
                </Form.Item>
            </Form>

        </div>
    )
}
export default LoginSignupForm