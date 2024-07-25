import React, { useState } from 'react';
import { Table, Typography, Alert, Button } from 'antd';
import { InputNumber } from 'antd';

const { Title, Text } = Typography;

const GradeCalculator = ({ AttendanceData }) => {
    const [studentsGrades, setStudentsGrades] = useState([]);
    const [error, setError] = useState(null);
    const [totalDays, setTotalDays] = useState(0);
    const [showGrades, setShowGrades] = useState(false);

    const calculateGrades = (data) => {
        const studentAttendance = {};

        // Aggregate attendance data
        data.forEach(entry => {
            if (entry.status === 'Present') {
                if (!studentAttendance[entry.name]) {
                    studentAttendance[entry.name] = 0;
                }
                studentAttendance[entry.name]++;
            }
        });

        // Calculate grades
        const grades = Object.keys(studentAttendance).map(name => {
            const attendedDays = studentAttendance[name];
            const percentageAttendance = (attendedDays / totalDays) * 100;

            let grade;
            if (percentageAttendance >= 90) {
                grade = 'A';
            } else if (percentageAttendance >= 80) {
                grade = 'B';
            } else if (percentageAttendance >= 70) {
                grade = 'C';
            } else if (percentageAttendance >= 60) {
                grade = 'D';
            } else {
                grade = 'F';
            }

            return {
                name,
                attendedDays,
                grade
            };
        });

        setStudentsGrades(grades);
    };

    const handleChange = (value) => {
        // Simple validation (optional)
        if (value >= 1 && value <= 100) {
            setTotalDays(value);
        }
    };

    const handleGenerateReport = () => {
        if (totalDays > 0) {
            try {
                calculateGrades(AttendanceData);
                setShowGrades(true);
                setError(null);
            } catch (e) {
                setError('An error occurred while calculating grades.');
                console.error(e);
            }
        } else {
            setError('Please enter the total number of days.');
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Attended Days',
            dataIndex: 'attendedDays',
            key: 'attendedDays',
        },
        {
            title: 'Grade',
            dataIndex: 'grade',
            key: 'grade',
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', }}>
                <Title level={2}>Student Grades</Title>

            </div>
            <div style={{ marginLeft: '20px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <>
                    <InputNumber
                        placeholder="Total days"
                        size="large"
                        value={totalDays}
                        min={1}
                        max={100}
                        onChange={handleChange}
                        style={{ marginRight: '10px' }}
                    />
                    <Button
                        type="primary"
                        size="large"
                        onClick={handleGenerateReport}
                    >
                        Generate Report
                    </Button>
                </>
            </div>
            {error && <Alert message={error} type="error" showIcon />}
            {
                showGrades && studentsGrades.length > 0 ? (
                    <Table
                        dataSource={studentsGrades}
                        columns={columns}
                        rowKey="name"
                    />
                ) : (
                    <Text>No attendance data available</Text>
                )
            }
        </div >
    );
};

export default GradeCalculator;
