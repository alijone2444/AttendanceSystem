// src/components/AdminPanel.js
import React, { useState } from 'react';
import { Layout, Button, Table, Modal, Form, Input, message, DatePicker } from 'antd';
import { EditOutlined, DeleteOutlined, FileDoneOutlined } from '@ant-design/icons';

const { Content } = Layout;

const mockStudentData = [
    { key: '1', name: 'John Doe', attendance: '25 days', leaveRequests: '2' }
];

const AdminPanel = () => {
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState(mockStudentData);

    const handleCreateReport = (values) => {
        // Logic to create report
        message.success('Report created');
    };

    const handleViewRecords = () => {
        // Logic to view student records
        setVisible(true);
    };

    return (
        <Layout>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
                <Button type="primary" onClick={handleViewRecords} style={{ marginRight: 10 }}>
                    View Records
                </Button>

                <Button type="default" icon={<FileDoneOutlined />} style={{ marginRight: 10 }}>
                    Generate Report
                </Button>

                <Modal
                    title="Generate Report"
                    visible={visible}
                    onCancel={() => setVisible(false)}
                    footer={null}
                >
                    <Form onFinish={handleCreateReport}>
                        <Form.Item
                            name="from"
                            label="From"
                            rules={[{ required: true, message: 'Please select start date' }]}
                        >
                            <DatePicker />
                        </Form.Item>
                        <Form.Item
                            name="to"
                            label="To"
                            rules={[{ required: true, message: 'Please select end date' }]}
                        >
                            <DatePicker />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Generate
                            </Button>
                        </Form.Item>
                    </Form>

                    <Table columns={[
                        { title: 'Name', dataIndex: 'name', key: 'name' },
                        { title: 'Attendance', dataIndex: 'attendance', key: 'attendance' },
                        { title: 'Leave Requests', dataIndex: 'leaveRequests', key: 'leaveRequests' }
                    ]}
                        dataSource={data}
                        pagination={false}
                    />
                </Modal>
            </Content>
        </Layout>
    );
};

export default AdminPanel;
