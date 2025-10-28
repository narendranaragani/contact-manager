import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { ArrowLeft } from "lucide-react";

const ContactForm = () => {
  const { contact } = useLocation().state || {};
  const [name, setName] = useState(contact ? contact.name : "");
  const [email, setEmail] = useState(contact ? contact.email : "");
  const [phone, setPhone] = useState(contact ? contact.phone : "");
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const contactDetails = { name, email, phone };

    try {
      const token = Cookies.get("jwt_token");
      if (!token) {
        console.error("No JWT token found in cookies!");
        return;
      }

      const response = await fetch("http://localhost:5002/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(contactDetails),
      });

      const data = await response.json();

      if (response.ok) {
        setName("");
        setEmail("");
        setPhone("");
        console.log("Contact created successfully");
        navigate("/contacts");
      } else {
        console.error("Failed to create contact:", data.message);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const onEditHandler = async (event) => {
    event.preventDefault();
    const contactDetails = { name, email, phone };

    try {
      const token = Cookies.get("jwt_token");

      const response = await fetch(
        `http://localhost:5002/api/contacts/${contact._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(contactDetails),
        }
        
      );
      console.log(response);
      const data = await response.json();

      if (response.ok) {
        console.log("Contact updated successfully");
        navigate("/contacts");
      } else {
        console.error("Failed to update contact:", data.message);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-3xl shadow-2xl w-full max-w-md p-8">
        <ArrowLeft
          onClick={() => navigate(-1)}
          className="cursor-pointer text-white hover:text-blue-500 transition-colors mb-10"
          size={24}
        />
        <h1 className="text-3xl font-bold mb-2 text-gray-100 text-center">
          {contact ? "Edit Contact" : "Add New Contact"}
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Organize and manage your contacts efficiently
        </p>

        <form
          className="space-y-5"
          onSubmit={contact ? onEditHandler : onSubmitHandler}
        >
          <div className="flex flex-col">
            <label className="font-semibold text-gray-200 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
              required
              className="px-4 py-3 rounded-xl border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-200 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              required
              className="px-4 py-3 rounded-xl border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-200 mb-1">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              required
              maxLength={10}
              className="px-4 py-3 rounded-xl border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-semibold shadow-lg transition duration-300"
          >
            {contact ? "Update Contact" : "Create Contact"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
