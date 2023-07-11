import React from 'react';
import Navbar from "../../components/UI/Nav/Navbar";
import Navbottom from "../../components/UI/Nav/Navbottom";
import {Link} from "react-router-dom";
import './style.css';
const Home = () => {
    
    return (
        <div>

            <div className={"home-background"}>
                <Navbar/>

                <div className={'d-flex flex-column p-xl-5 my-5'}>
                    <h2 className="title">YOUR HEALTH, <br/></h2>
                    <h2 className="title" >OUR PRIORITY</h2>
                    <br/><br/><hr className="my-4"/>
                    <div className="jumbotron">
                        <h1 className="display-4">OnlineDoctor</h1>
                        <p className="lead">The online service "Online Doctor" was chosen as the subject area, which will help you find good doctors around the world and consult with them online.</p>


                        <p className="lead">
                            <Link className="btn btn-primary btn-lg" to={'/services'} role="button">Go to Services</Link>
                        </p>
                    </div>


                </div>
            </div>

            <Navbottom/>
        </div>
    );
};

export default Home;