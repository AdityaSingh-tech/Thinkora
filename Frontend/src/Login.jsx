import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import "./Login.css";

function Login() {
    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <div className="loginPage">
            <div className="loginBox">
                <h1>Thinkora</h1>
                <p>Your AI-powered thinking partner</p>
                <button className="googleBtn" onClick={handleGoogleLogin}>
                    <img src="https://www.google.com/favicon.ico" alt="google" />
                    Continue with Google
                </button>
            </div>
        </div>
    );
}

export default Login;