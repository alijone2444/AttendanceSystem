import React, { useState } from 'react';
import { Form, Input, Button, Select, notification } from 'antd';
import axios from 'axios';
import UserPanel from '../panels/userPanel/userpanel';
import { constants } from '../../constants/constants';

const { Option } = Select;

const LeaveRequest = (props) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const username = JSON.parse(props.username)
    // Handler for form submission
    const onFinish = async (values) => {
        setLoading(true);
        try {
            // Send the leave request to the backend
            const response = await axios.post(`${constants.baseurl}create-leave-request`, { ...values, username });

            // Check for success
            if (response.status === 200) {
                notification.success({
                    message: 'Success',
                    description: 'Your leave request has been submitted successfully!',
                });
                form.resetFields();
            }
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'There was an error submitting your leave request.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            style={{ padding: '5%' }}
            form={form}
            name="leave_request"
            onFinish={onFinish}
            layout="vertical"
            initialValues={{
                status: 'Leave',
            }}
        >
            <Form.Item
                name="name"
                label="Name"
            >
                <Input disabled placeholder={props.username} /> {/* Disabled input field */}
            </Form.Item>

            <Form.Item
                name="status"
                label="Status"
            >
                <Select placeholder="Select a status" disabled> {/* Disabled select field */}
                    <Option value="Present">Present</Option>
                    <Option value="Leave">Leave</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="leaveReason"
                label="Leave Reason"
                rules={[{ required: true, message: 'Please provide a reason for your leave' }]}
            >
                <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item
                name="date"
                label="Leave Date"
                rules={[{ required: true, message: 'Please select the date of your leave' }]}
            >
                <Input type="date" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Submit Request
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LeaveRequest;
