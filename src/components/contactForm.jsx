import React, { useState } from "react";
import {Link,useNavigate} from "react-router-dom"
import {useLocation} from "react-router-dom"

const ContactForm = () => {
  const { contact } = useLocation().state || {};
  const [name, setName] = useState(contact ? contact.name : "");
  const [email, setEmail] = useState(contact ? contact.email : "");
  const [phone, setPhone] = useState(contact ? contact.phone : "");
  const navigate = useNavigate()
  

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const contactDetails = { name, email, phone };

    try {
      const response = await fetch("https://contact-backend-fy18.onrender.com/api/contacts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contactDetails),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setName("");
        setEmail("");
        setPhone("");
        console.log("Contact created successfully");
      } else {
        console.error("Failed to create contact:", data.message);
      }
    } catch (err) {
      console.error("Error:", err);

    }
    navigate("/")
  };

    const onEditHandler = async (event) => {
    event.preventDefault();
    const contactDetails = { name, email, phone };
    try {
      const response = await fetch(
        `https://contact-backend-fy18.onrender.com/api/contacts/${contact._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contactDetails),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setName("");
        setEmail("");
        setPhone("");
        console.log("Contact updated successfully");
        navigate("/")
      } else {
        console.error("Failed to update contact:", data.message);
      }
    } catch (err) {
      console.error("Error:", err);
    }
    navigate("/")
  };

  return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-2">Contact Manager</h1>
        <p className="text-gray-600 mb-6">
          Organize and manage your contacts efficiently
        </p>

        <div className="bg-white shadow rounded-lg w-full">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg font-semibold">
            {contact ? "Edit Contact" : "Add New Contact"}
          </div>
          <form
            className="p-4 flex flex-col items-center justify-center"
            onSubmit={contact ? onEditHandler : onSubmitHandler}
          >
            <div className="flex flex-col w-full mb-4">
              <label className="font-semibold text-gray-700">NAME</label>
              <input
                className="w-full bg-[#D9D9D9] px-3 py-2 rounded-md mt-2 outline-none font-semibold"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="flex flex-col w-full mb-4">
              <label className="font-semibold text-gray-700">EMAIL</label>
              <input
                className="w-full bg-[#D9D9D9] px-3 py-2 rounded-md mt-2 outline-none font-semibold"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                required
              />
            </div>

            <div className="flex flex-col w-full mb-4">
              <label className="font-semibold text-gray-700">PHONE</label>
              <input
                className="w-full bg-[#D9D9D9] px-3 py-2 rounded-md mt-2 outline-none font-semibold"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
                required
              />
            </div>
            <div>
              {contact ? (
                <button 
                  type="submit"
                  className="w-full bg-blue-600 px-3 py-2 rounded-md mt-2 font-semibold text-white cursor-pointer"
                >
                  Edit Contact
                </button> 
              ) : (
                <button
                  type="submit"
                  className="w-full bg-blue-600 px-3 py-2 rounded-md mt-2 font-semibold text-white cursor-pointer"
                >
                  Create Contact
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
  );
};

export default ContactForm;
