// src/components/Sidebar.js
import React, { useState } from 'react';
import { Layout, Menu, Drawer, Button } from 'antd';
import { UserOutlined, TeamOutlined, FileOutlined, MenuOutlined, RightOutlined, FileAddOutlined, LogoutOutlined, UsergroupAddOutlined, EyeOutlined, EditOutlined, DeliveredProcedureOutlined, InboxOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = (props) => {
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const StudentsidebarContent = (
        <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }}>
            <Menu.Item key="1" icon={<UserOutlined />} onClick={() => { props.sendoption('Mark Attendance-leave'); onClose() }}>Mark Attendance/Mark Leave</Menu.Item>
            <Menu.Item key="2" icon={<EyeOutlined />} onClick={() => { props.sendoption('View Attendance'); onClose() }}>View Attendance</Menu.Item>
            <Menu.Item key="3" icon={<FileOutlined />} onClick={() => { props.sendoption('Change Profile photo'); onClose() }}>Change Profile photo</Menu.Item>
            <Menu.Item key="4" icon={<FileAddOutlined />} onClick={() => { props.sendoption('create request'); onClose() }}>Create Request</Menu.Item>
            <Menu.Item key="5" icon={<LogoutOutlined style={{ color: 'red' }} />} onClick={() => { props.sendoption('Logout'); onClose() }}>Logout</Menu.Item>
        </Menu>
    );

    const AdminsidebarContent = (
        <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }}>
            <Menu.Item key="1" icon={<UserOutlined />} onClick={() => { props.sendoption('Add Attendance'); onClose() }}>Add Attendance</Menu.Item>
            <Menu.Item key="2" icon={<TeamOutlined />} onClick={() => { props.sendoption('Delete Attendance'); onClose() }}>Delete Attendance</Menu.Item>
            <Menu.Item key="3" icon={<EditOutlined />} onClick={() => { props.sendoption('Edit Attendance'); onClose() }}>Edit Attendance</Menu.Item>
            <Menu.Item key="4" icon={<UsergroupAddOutlined />} onClick={() => { props.sendoption('Students request of leaves'); onClose() }}>Students request of leaves</Menu.Item>
            <Menu.Item key="5" icon={<DeliveredProcedureOutlined />} onClick={() => { props.sendoption('Generate Report'); onClose() }}>Generate Report</Menu.Item>
            <Menu.Item key="6" icon={<LogoutOutlined style={{ color: 'red' }} />} onClick={() => { props.sendoption('Logout'); onClose() }}>Logout</Menu.Item>
        </Menu>
    );

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button
                    style={{ background: 'transparent', height: '100%' }}
                    icon={<RightOutlined style={{ color: 'dodgerblue' }} />}
                    onClick={showDrawer}
                    className="drawer-button"
                />
            </div >
            <Sider className="sidebar">
                {props.student ? AdminsidebarContent : StudentsidebarContent}
            </Sider>
            <Drawer
                title="Menu"
                placement="left"
                closable={true}
                onClose={onClose}
                visible={visible}
                className="drawer"
            >
                {props.student ? AdminsidebarContent : StudentsidebarContent}
            </Drawer>
        </>
    );
};

export default Sidebar;
