import LoginSignupForm from "../../components/loginSignupForms.js/LoginSignupForm"
import Image from '../../assets/images/backgroundLogin.jpg'
const LoginSignupPage = () => {
    return (
        <div>
            <img src={Image} alt="." style={{ position: 'absolute', width: '100vw', height: '100vh' }} />
            <LoginSignupForm />
        </div>
    )
}
export default LoginSignupPage