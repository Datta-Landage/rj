import React from "react";
import { Link } from "react-router-dom";
import './Footer.css'

function Footer(){
    return (
        <div>
            <footer>
      <div className="foterhd">
            <img
              src="https://images.pexels.com/photos/1183434/pexels-photo-1183434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="logo"
            />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque
              voluptas non ratione tempore id molestias quis. Numquam animi
              possimus dolore nisi modi consequuntur natus doloribus. Totam
              cumque laudantium voluptatum nobis?
            </p>
          </div>
        <div className="row">
          
          <div className="col">
            <h3>Office</h3>
            <p>gali road</p>
            <p>West Champaran</p>
            <p>Bihar, PIN 845404</p>
            <p className="email-id">way2mayankshri@gmail.com</p>
            <h4>+91- 6234567891</h4>
          </div>
          <div className="col">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/">Services</Link>
              </li>
              <li>
                <Link to="/">About</Link>
              </li>
              <li>
                <Link to="/">Features</Link>
              </li>
              <li>
                <Link to="/contact">Contect Us</Link>
              </li>
            </ul>
          </div>
          <div className="col">
            <h3>NewsLetter</h3>
            <form className="formFooter">
              <i className="far" />
              <input type="email" placeholder="Enter Your email id" required />
              <button type="submit">Submit</button>
            </form>
            <div className="social-icons">
              <i className="fab fa-facebook"> 👍 </i>
              <i className="fab fa-facebook"> 👍 </i>
              <i className="fab fa-facebook"> 👍 </i>
              <i className="fab fa-facebook"> 👍 </i>
            </div>
          </div>
        </div>
        <hr />
        <p className="copyRight">INCUBATOR ©2023 - All Right Reserved</p>
      </footer>
        </div>
    )
}

export default Footer;