import React, { useEffect, useState } from 'react';
import Sidebar from "../../components/sidebar/sidebar";
import UserPanel from "../../components/panels/userPanel/userpanel";
import AdminPanel from "../../components/panels/userPanel/adminpanel/adminPanel";
import axios from 'axios';
import { constants } from "../../constants/constants";
import MarkAttendanceLeave from "../../components/markAttendance/markAttendance";
import ChangeProfilePhoto from '../../components/changeprofile/changeProfile';
import { useNavigate } from 'react-router-dom';
import LeaveRequest from '../../components/leaveRequest/leaveRequest';
import RequestsList from '../../components/createRequest/createRequest';
import GradeCalculator from '../../components/gradeCalculation/gradeCalculate';
import WelcomePage from '../../components/Welcome/welcome';
const HomePage = () => {
    const [AttendanceData, setAttendanceData] = useState([]);
    const [usertype, setusertype] = useState('')
    const [username, setusername] = useState('');
    const [sendedoption, setsendedoption] = useState('Welcome');
    const [ViewStudentAttendance, setViewStudentAttendance] = useState([]);
    const navigate = useNavigate()
    const [fetchAgain, setfetchAgain] = useState(false)
    const fetchData = async (type, username) => {
        try {
            const response = await axios.get(`${constants.baseurl}attendance-data`, {
                params: { type, username }
            });
            return response.data;
        } catch (err) {
            console.error('Error fetching data:', err);
            throw err; // Optional: Re-throw the error if you want to handle it elsewhere
        }
    };

    useEffect(() => {
        // Fetch all data on component mount
        const loadData = async () => {
            const data = await fetchData('ALL');
            setAttendanceData(data);
        };
        loadData();
    }, [fetchAgain]); // Empty dependency array ensures this runs only once on mount

    useEffect(() => {
        const isAuth = () => {
            return localStorage.getItem('username') || '';
        };
        setusername(isAuth());
    }, []);

    useEffect(() => {
        const isuserType = () => {
            return localStorage.getItem('usertype') || '';
        };
        setusertype(isuserType());
        console.log('confditions;', isuserType())
    }, [usertype]);

    const handleoptions = async (Option) => {
        setsendedoption(Option);
        if (Option === 'View Attendance') {
            const data = await fetchData('username', username);
            setViewStudentAttendance(data);
        }
    };
    const handleLogout = () => {
        localStorage.removeItem('username');
        navigate('/');
    };
    const handleRegetData = () => {
        setfetchAgain(!fetchAgain)
    }
    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', }}>
            <Sidebar student={usertype === 'ADMIN'} sendoption={handleoptions} />
            <div style={{ height: '100vh', overflowY: 'auto', width: '100%' }}>
                {sendedoption === 'Welcome' && WelcomePage()}
                {sendedoption === 'Edit Attendance' && <UserPanel AttendanceData={AttendanceData} type='edit' setRegetData={handleRegetData} />}
                {sendedoption === 'Delete Attendance' && <UserPanel AttendanceData={AttendanceData} type='delete' setRegetData={handleRegetData} />}
                {sendedoption === 'Add Attendance' && <UserPanel AttendanceData={AttendanceData} type='add' setRegetData={handleRegetData} />}
                {sendedoption === 'Mark Attendance-leave' && <MarkAttendanceLeave username={username} />}
                {sendedoption === 'View Attendance' && <UserPanel AttendanceData={ViewStudentAttendance} />}
                {sendedoption === 'Change Profile photo' && <ChangeProfilePhoto />}
                {sendedoption === 'create request' && <LeaveRequest username={username} />}
                {sendedoption === 'Logout' && handleLogout()}
                {sendedoption === 'Students request of leaves' && <RequestsList />}
                {sendedoption === 'Generate Report' && <GradeCalculator AttendanceData={AttendanceData} />}

            </div>
        </div>
    );
};

export default HomePage;
