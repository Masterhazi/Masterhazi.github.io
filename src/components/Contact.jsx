import React from "react";
import Footer from "./Footer";

const Contact = () => {
    return (
        <div className='relative z-0 bg-black w-screen h-screen flex flex-col'>
            <div className='flex-grow text-white contact overflow-x-hidden pt-12 mt-8' id='contact'>
                <div className='z-10 w-full sm:w-[650px] m-auto p-8 rounded-2xl'>
                    <p className='font-light'>REACH OUT TO ME</p>
                    <h2 className='text-5xl font-extrabold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-500 to-pink-500'>Contact.</h2>
                    <div className='mt-12'>
                        <p className='mb-4'>Feel free to reach out to me through any of the following methods:</p>
                        <ul className='list-none'>
                            <li className='mb-4'>
                                <strong>Email: </strong>
                                <a className='text-blue-300 hover:text-blue-500 duration-300' href='mailto:hajiafridbaba@gmail.com'>
                                    hajiafridbaba@gmail.com
                                </a>
                            </li>
                            <li className='mb-4'>
                                <strong>Phone: </strong>
                                <a className='text-blue-300 hover:text-blue-500 duration-300' href='tel:+919494478672'>
                                    +91 9494478672
                                </a>
                            </li>
                            <li className='mb-4'>
                                <strong>LinkedIn: </strong>
                                <a className='text-blue-300 hover:text-blue-500 duration-300' href='https://www.linkedin.com/in/contacthazi/' target='_blank'>
                                    linkedin.com/in/contacthazi
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;
