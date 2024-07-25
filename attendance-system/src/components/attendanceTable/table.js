import React, { useState } from 'react';
import { Table, Button, Modal } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import MarkAttendanceLeave from '../markAttendance/markAttendance'
import DeleteAttendance from '../deleteAttendance/deleteAttendance';
const AttendanceTable = ({ data, type, setRegetData }) => {
    // State to manage modal visibility and selected username
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUsername, setSelectedUsername] = useState('');
    const [selecteddate, setselecteddate] = useState('');
    const [selectedstatus, setselectedstatus] = useState('');
    const getIcon = () => {
        switch (type) {
            case 'add':
                return <PlusOutlined style={{ color: 'green' }} />;
            case 'edit':
                return <EditOutlined style={{ color: 'orange' }} />;
            case 'delete':
                return <DeleteOutlined style={{ color: 'red' }} />;
            default:
                return null;
        }
    };
    const getColor = () => {
        switch (type) {
            case 'add':
                return 'green';
            case 'edit':
                return 'orange';
            case 'delete':
                return 'red';
            default:
                return null;
        }
    };
    // Function to handle button click
    const handleActionClick = (username, date, status) => {
        setSelectedUsername(username);
        setIsModalVisible(true);
        setselectedstatus(status)
        setselecteddate(date)
    };

    // Define columns
    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        ...(type ? [
            {
                title: 'Action',
                key: 'action',
                render: (_, record) => (
                    <Button
                        icon={getIcon()}
                        style={{ background: 'white', border: `1px solid ${getColor()}` }}
                        type="primary"
                        onClick={() => handleActionClick(record.name, record.date, record.status)} // Pass username to handler
                    />
                ),
            }
        ] : []),
    ];

    // Function to handle modal close
    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedUsername('');
    };
    const returnComponent = () => {
        switch (type) {
            case 'add':
                return <MarkAttendanceLeave username={JSON.stringify(selectedUsername)} setRegetData={setRegetData} />
            case 'edit':
                return <DeleteAttendance mode={'edit'} setRegetData={setRegetData} username={JSON.stringify(selectedUsername)} date={selecteddate} status={selectedstatus} />

            case 'delete':
                return <DeleteAttendance setRegetData={setRegetData} mode={'delete'} username={JSON.stringify(selectedUsername)} date={selecteddate} status={selectedstatus} />

            default:
                return null;
        }
    }
    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                rowKey="key"
            />
            <Modal
                title="User Information"
                visible={isModalVisible}
                onOk={handleModalClose}
                onCancel={handleModalClose}
                footer={[
                    <Button key="back" onClick={handleModalClose}>
                        Close
                    </Button>,
                ]}
            >
                {returnComponent()}
            </Modal>
        </>
    );
};

export default AttendanceTable;
