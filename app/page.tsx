// src/HomePage.jsx
import React from "react";

const HomePage = () => {
  return (
    <>
      <header className="bg-blue-600 text-white">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold">RapidAid</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#services" className="hover:text-blue-300">
                  Services
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-blue-300">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-300">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section
          className="bg-cover bg-center h-96 flex flex-col justify-center items-center text-white"
          style={{
            backgroundImage:
              "url('https://source.unsplash.com/1600x900/?healthcare')",
          }}>
          <div className="bg-black bg-opacity-50 p-6 rounded-lg text-center">
            <h2 className="text-3xl font-bold">Your Health, Our Priority</h2>
            <p className="mt-2">
              Providing fast and reliable medical assistance when you need it
              most.
            </p>
            <a
              href="#services"
              className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              Get Help Now
            </a>
          </div>
        </section>

        <section className="container mx-auto py-10" id="services">
          <h2 className="text-3xl font-bold text-center mb-6">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <img
                src="https://source.unsplash.com/300x200/?emergency"
                alt="Emergency Services"
                className="rounded-t-lg w-full"
              />
              <h3 className="text-xl font-semibold mt-4">Emergency Services</h3>
              <p>24/7 emergency medical services available to assist you.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <img
                src="https://source.unsplash.com/300x200/?telemedicine"
                alt="Telemedicine"
                className="rounded-t-lg w-full"
              />
              <h3 className="text-xl font-semibold mt-4">Telemedicine</h3>
              <p>
                Consult with our doctors remotely from the comfort of your home.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <img
                src="https://source.unsplash.com/300x200/?healthcare"
                alt="Home Healthcare"
                className="rounded-t-lg w-full"
              />
              <h3 className="text-xl font-semibold mt-4">Home Healthcare</h3>
              <p>
                Personalized healthcare services delivered right to your
                doorstep.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-200 py-10" id="testimonials">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6">
              What Our Clients Say
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <p className="italic">
                  "RapidAid provided incredible support during my emergency.
                  Highly recommend!"
                </p>
                <h4 className="mt-2 font-semibold">- Sarah J.</h4>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <p className="italic">
                  "Their telemedicine service is a lifesaver. Very professional
                  and caring staff."
                </p>
                <h4 className="mt-2 font-semibold">- Michael T.</h4>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-blue-600 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 RapidAid. All rights reserved.</p>
          <ul className="flex justify-center space-x-4 mt-2">
            <li>
              <a href="#about" className="hover:text-blue-300">
                About Us
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-blue-300">
                Contact
              </a>
            </li>
            <li>
              <a href="#privacy" className="hover:text-blue-300">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
