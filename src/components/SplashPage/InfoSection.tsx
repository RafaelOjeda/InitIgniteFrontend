import React from "react";
import "./SplashPageStyling/SplashPageStyling.scss";

const InfoSection: React.FC = () => {
    return (
        <div className="row lightBlueBG" id="membership-container">
            <h1>Course is broken down into 3 main parts</h1>
            <div id="plans">
                <div className="plan basic">
                    <h2>Learn</h2>
                    <p>how to teach</p>
                </div>
                <div className="plan balanced">
                    <h2>Plan</h2>
                    <p>to teach</p>
                </div>
                <div className="plan pro">
                    <h2>Teach</h2>
                    <p>and have fun</p>
                </div>
            </div>
            {/* <div class="confirm-button-container">
                <button class="confirm-button">Confirm</button>
            </div> */}
            {/* <div class="terms">
                <p>By making this purchase, you are accepting the application's terms and agreements.</p>
            </div> */}
        </div>
    );
};

export default InfoSection;
