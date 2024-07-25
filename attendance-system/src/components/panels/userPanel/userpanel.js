// src/components/UserPanel.js
import React, { useState } from 'react';
import { Layout, Button, Modal, Upload, message } from 'antd';
import { UploadOutlined, EyeOutlined } from '@ant-design/icons';
import AttendanceTable from '../../attendanceTable/table'; // Import the new component

const { Content } = Layout;

const mockData = [
    { key: '1', date: '2024-07-24', status: 'Present' },
    { key: '2', date: '2024-07-23', status: 'Absent' }
];

const UserPanel = (props) => {
    const [visible, setVisible] = useState(true);
    return (
        <Layout >
            <Content >
                {visible && <AttendanceTable data={props.AttendanceData} type={props.type} setRegetData={props.setRegetData} />}
            </Content>
        </Layout>
    );
};

export default UserPanel;
