import React, { useState } from 'react';
import { Button, message, Card, Input, Form, Select } from 'antd';
import axios from 'axios';
import { constants } from '../../constants/constants';

const { Item } = Form;

const DeleteAttendance = ({ username, date, status, mode, setRegetData }) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [localDate, setLocalDate] = useState(date);
    const [localStatus, setLocalStatus] = useState(status);

    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await axios.delete(`${constants.baseurl}delete-attendance`, {
                data: {
                    username,
                    date: localDate,
                    status: localStatus,
                },
            });

            if (response.status === 200) {
                message.success('Attendance deleted successfully');
                setRegetData()
            } else {
                message.error('Failed to delete attendance');
            }
        } catch (error) {
            message.error('An error occurred while deleting attendance/already deleted');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const response = await axios.put(`${constants.baseurl}update-attendance`, {
                username,
                newdate: localDate,
                newstatus: localStatus,
                date: date,
                status: status
            });

            if (response.status === 200) {
                message.success('Attendance updated successfully');
                setRegetData()
            } else {
                message.error('Failed to update attendance');
            }
        } catch (error) {
            message.error('An error occurred while updating attendance');
        } finally {
            setLoading(false);
        }
    };
    const { Option } = Select;
    return (
        <div>
            <Card title="Attendance Details" style={{ marginBottom: '20px' }}>
                <p><strong>Username:</strong> {username}</p>
                {mode === 'edit' ? (
                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={{ date: localDate, status: localStatus }}
                        onFinish={() => handleUpdate()}
                    >
                        <Item
                            label="Date"
                            name="date"
                            rules={[{ required: true, message: 'Please input the date!' }]}
                        >
                            <Input
                                type="date"
                                value={localDate}
                                onChange={(e) => setLocalDate(e.target.value)}
                            />
                        </Item>
                        <Item
                            label="Status"
                            name="status"
                            rules={[{ required: true, message: 'Please input the status!' }]}
                        >  <Select
                            placeholder="Select a status"
                            value={localStatus} // Controlled component
                            onChange={(value) => setLocalStatus(value)} // Update state on change
                        >
                                <Option value="Present">Present</Option>
                                <Option value="Leave">Leave</Option>
                            </Select>

                        </Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            style={{ marginBottom: '20px' }}
                        >
                            Update Attendance
                        </Button>
                    </Form>
                ) : (
                    <>
                        <p><strong>Date:</strong> {date}</p>
                        <p><strong>Status:</strong> {status}</p>
                        <Button
                            type="primary"
                            danger
                            onClick={handleDelete}
                            loading={loading}
                            style={{ width: '100%' }}
                        >
                            Delete Attendance
                        </Button>
                    </>
                )}
            </Card>
        </div>
    );
};

export default DeleteAttendance;
