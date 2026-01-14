import React from "react";

const Footer = () => {
    return (
        <footer className="hidden md:block bg-[#242a3a] text-gray-300 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-white font-semibold mb-4">Destinations</h3>
                    <ul>
                        <li className="mt-2">
                            <a href="#" className="hover:text-white">
                                Mathura
                            </a>
                        </li>
                        <li className="mt-2">
                            <a href="#" className="hover:text-white">
                                Agra
                            </a>
                        </li>
                        <li className="mt-2">
                            <a href="#" className="hover:text-white">
                                Goa
                            </a>
                        </li>
                        <li className="mt-2">
                            <a href="#" className="hover:text-white">
                                Rajasthan
                            </a>
                        </li>
                        <li className="mt-2">
                            <a href="#" className="hover:text-white">
                                Karnataka
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-white font-semibold mb-4">Company</h3>
                    <ul>
                        <li className="mt-2">
                            <a href="#" className="hover:text-white">
                                About Us
                            </a>
                        </li>
                        <li className="mt-2">
                            <a href="#" className="hover:text-white">
                                Careers
                            </a>
                        </li>
                        <li className="mt-2">
                            <a href="#" className="hover:text-white">
                                Press
                            </a>
                        </li>
                        <li className="mt-2">
                            <a href="#" className="hover:text-white">
                                Blog
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-white font-semibold mb-4">Support</h3>
                    <ul>
                        <li className="mt-2">
                            <a href="#" className="hover:text-white">
                                Contact Us
                            </a>
                        </li>
                        <li className="mt-2">
                            <a href="#" className="hover:text-white">
                                FAQ
                            </a>
                        </li>
                        <li className="mt-2">
                            <a href="#" className="hover:text-white">
                                Privacy Policy
                            </a>
                        </li>
                        <li className="mt-2">
                            <a href="#" className="hover:text-white">
                                Terms of Service
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-white font-semibold mb-4">Follow Us</h3>
                    <div className="flex space-x-4 mt-2">
                        {/* Example: <a href="#" className="hover:text-white">Facebook</a> */}
                    </div>
                </div>
            </div>
            <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm">
                <p>
                    &copy; {new Date().getFullYear()} Your Hotel App. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
