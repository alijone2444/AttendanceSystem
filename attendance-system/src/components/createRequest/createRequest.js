import React, { useEffect, useState } from 'react';
import { Table, Spin, notification, Tooltip } from 'antd';
import axios from 'axios';
import { constants } from '../../constants/constants';

const RequestsList = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get(`${constants.baseurl}leave-requests`);
                setRequests(response.data);
            } catch (error) {
                setError(error);
                notification.error({
                    message: 'Error',
                    description: 'There was an error fetching leave requests.',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'username',
            key: 'username',
            width: 50,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 50,
        },
        {
            title: 'Leave Date',
            dataIndex: 'date',
            key: 'date',
            width: 150,
        },
        {
            title: 'Leave Reason',
            dataIndex: 'leaveReason',
            key: 'leaveReason',
            width: 500,
            render: text => (
                <Tooltip title={text}>
                    <span style={{ display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {text}
                    </span>
                </Tooltip>
            ),
        },
    ];

    return (
        <div>
            {loading ? (
                <Spin size="large" />
            ) : error ? (
                <p>Error fetching leave requests</p>
            ) : (
                <Table
                    dataSource={requests}
                    columns={columns}
                    rowKey="name"
                />
            )}
        </div>
    );
};

export default RequestsList;
