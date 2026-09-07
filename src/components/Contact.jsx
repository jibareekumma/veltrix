


import "../css/Contact.css"



import phone from "/icons/phone-icon.png"
import gps from "/icons/gps-icon.png"

import delivery from "/icons/delivery-icon.png"
import secured from "/icons/secured-icon.png"
import support from "/icons/support-icon.png"


const Contact = function(){

    return <>

    <div className="contact-container">

       
        <div className="contact-hero">

            <div className="contact-texts">
                <h4>CONTACT</h4>

                <h2>
                    WE'RE HERE TO
                    <mark> HELP</mark>
                </h2>

                <p>
                    Have a question, feedback, or need support?
                    We'd love to hear from you.
                    Reach out to us and we would get back to you as soon
                    as possible.
                </p>
            </div>


            {/* CONTACT FORM */}
            <div className="form-container">

                <div className="texts">
                    <p>— DROP US A MESSAGE</p>

                    <h4>
                        SEND US A <mark>MESSAGE</mark>
                    </h4>
                </div>


                <form className="form">

                    <div className="details">

                        <div className="input-box">
                            <label>Full Name *</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div className="input-box">
                            <label>Email Address *</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                            />
                        </div>

                    </div>


                    <div className="input-box">
                        <label>Subject *</label>

                        <select>
                            <option value="">Select a subject</option>
                            <option value="order">Order Inquiry</option>
                            <option value="delivery">Delivery</option>
                            <option value="returns">Returns</option>
                            <option value="support">Customer Support</option>
                        </select>
                    </div>


                    <div className="input-box message-box">
                        <label>Message *</label>

                        <textarea
                            placeholder="Type your message here..."
                        ></textarea>
                    </div>


                    <button type="submit">
                        SEND MESSAGE <span>→</span>
                    </button>

                </form>

            </div>

        </div>


       
        <div className="other-contact">
{/* 
            <div className="section-title">
                <span></span>
                <h4>OTHER WAYS TO REACH US</h4>
            </div> */}


            <div className="contact-details">

                <div className="contact-detail">
                    <div className="contact-icon">✉</div>

                    <div>
                        <h5>EMAIL US</h5>
                        <p>jibareekumma@gmail.com</p>
                    </div>
                </div>


                <div className="contact-detail">
                    <div className="contact-icon">
                        <img src = {phone} 
                        className="contact-image"/>
                    </div>

                    <div>
                        <h5>CALL US</h5>
                        <p>+234 913 0330 586</p>
                        <small>Mon - Fri, 9AM - 6PM (EST)</small>
                    </div>
                </div>


                <div className="contact-detail">
                    <div className="contact-icon">
                        <img src = {gps} 
                        className="contact-image"/>
                    </div>

                    <div>
                        <h5>OUR LOCATION</h5>
                        <p>
                            123 Innovation Drive,<br />
                            New York, NY 10001, USA
                        </p>
                    </div>
                </div>

            </div>

        </div>


        {/* FEATURES */}
        <div className="contact-features">

            <div className="feature">
                <span>
                    <img src = {delivery} 
                    className="feature-image"/>
                </span>

                <div>
                    <h4>FAST & RELIABLE SHIPPING</h4>
                    <p>Get your order delivered<br />on time, every time.</p>
                </div>
            </div>


            <div className="feature">
                <span>
                    <img src = {secured} 
                        className="feature-image"
                    />
                </span>

                <div>
                    <h4>SECURE PAYMENTS</h4>
                    <p>Shop with confidence using<br />our trusted payment options.</p>
                </div>
            </div>


            <div className="feature">
                <span>
                    <img src = {support}  
                    className="feature-image"/>
                </span>

                <div>
                    <h4>DEDICATED SUPPORT</h4>
                    <p>Our team is always ready<br />to assist you.</p>
                </div>
            </div>


            <div className="feature">
                <span>☆</span>

                <div>
                    <h4>PREMIUM QUALITY</h4>
                    <p>Built for performance,<br />designed for you.</p>
                </div>
            </div>

        </div>



    </div>

    </>
}


export default Contact