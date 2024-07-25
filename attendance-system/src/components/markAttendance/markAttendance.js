// src/components/MarkAttendanceLeave.jsx
import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Select, message } from 'antd';
import axios from 'axios';
import { constants } from '../../constants/constants';
const { Option } = Select;
const { TextArea } = Input;

const MarkAttendanceLeave = (props) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const name = JSON.parse(props.username)
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
    const day = String(today.getDate()).padStart(2, '0');

    const date = `${year}-${month}-${day}`;

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post(`${constants.baseurl}add-attendance`, { ...values, name, date });
            message.success('Attendance marked successfully!please Refresh to see updates');
            form.resetFields();
        } catch (error) {
            message.error('Failed to mark attendance!.Attendace can only be marked once');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Form form={form} layout="vertical" onFinish={handleSubmit} style={{ width: '50%' }}>
                <Form.Item
                    name="username"
                    label="username"
                >
                    <Input value={name} disabled={true} placeholder={name} />
                </Form.Item>

                <Form.Item
                    name="status"
                    label="Status"
                    rules={[{ required: true, message: 'Please select your status' }]}
                >
                    <Select placeholder="Select a status">
                        <Option value="Present">Present</Option>
                        <Option value="Leave">Leave</Option>
                    </Select>
                </Form.Item>

                <Form.Item style={{ textAlign: 'center' }}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default MarkAttendanceLeave;
