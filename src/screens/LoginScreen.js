import React, { useState } from "react";
import "./LoginScreen.css"
import SignInScreen from "./SignInScreen";

function LoginScreen() {
    const [signIn, setSignIn] = useState(false);

    return (
        <div className="loginScreen">
            <div className="LoginScreenBackground">
                <img
                    className="loginScreenLogo"
                    src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
                    alt=""
                />
                <button className="LoginScreenButton" onClick={() => setSignIn(true)}>
                    Sign In
                </button>

                <div className="loginScreenGradient" />
            </div>
            <div className="loginScreenBody">
                {signIn ? (<SignInScreen/>) : (
                    <>
                        <h1>Unlimited films, TV programmes and more.</h1>
                        <h2>Watch anywhere. Cancel at any time.</h2>
                        <h3>Ready to watch? Enter your email to create or restart your membership.</h3>

                        <div className="loginScreenInput">
                            <form>
                                <input type="email" placeholder="Email Address" />
                                <button className="loginScreenGetStarted" onClick={() => setSignIn(true)}>
                                    Get Started
                                </button>
                            </form>
                        </div>
                    </>
                )}

            </div>
        </div>
    )
}

export default LoginScreen;