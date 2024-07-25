// src/components/WelcomePage.js
import React from 'react';
import { Typography, Card, Row, Col } from 'antd';
import { UserOutlined, FileTextOutlined, CalendarOutlined, TeamOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const WelcomePage = () => {
    return (
        <div style={{ padding: '24px', background: '#fff', height: '100vh' }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
                Welcome to the Attendance Management System
            </Title>

            <Row gutter={16}>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Card
                        title="Mark Attendance"
                        bordered={false}
                        cover={<UserOutlined style={{ fontSize: '40px', color: '#1890ff' }} />}
                        hoverable
                    >
                        <Text>Mark your attendance or leave requests easily.</Text>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Card
                        title="View Attendance"
                        bordered={false}
                        cover={<CalendarOutlined style={{ fontSize: '40px', color: '#52c41a' }} />}
                        hoverable
                    >
                        <Text>View your attendance records and history.</Text>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Card
                        title="Create Request"
                        bordered={false}
                        cover={<FileTextOutlined style={{ fontSize: '40px', color: '#faad14' }} />}
                        hoverable
                    >
                        <Text>Create new requests for leave or other needs.</Text>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Card
                        title="Admin Options"
                        bordered={false}
                        cover={<TeamOutlined style={{ fontSize: '40px', color: '#eb2f96' }} />}
                        hoverable
                    >
                        <Text>Manage attendance and view admin options.</Text>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default WelcomePage;
