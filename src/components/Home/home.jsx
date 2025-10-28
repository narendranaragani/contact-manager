import React from "react";
import { Link } from "react-router-dom";
import { Users, PlusCircle, Phone, Mail, LogOut } from "lucide-react";


export default function Home() {
  return (
    <div className="bg-[#1c1c1e] text-gray-100 min-h-screen w-full flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center px-6 pt-24 pb-12">
        <div className="text-center max-w-2xl">
          <h1 className="text-5xl font-extrabold mb-4 text-white">
            Contact Management System
          </h1>
          <p className="text-lg text-gray-400 mb-8">
            Organize, update, and manage your contacts effortlessly — all in one
            place.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/form"
              className="bg-blue-600 hover:bg-blue-700 font-semibold px-6 py-3 rounded-xl shadow-lg transition duration-300 flex items-center gap-2"
            >
              <PlusCircle size={20} /> Add Contact
            </Link>

            <Link
              to="/contacts"
              className="bg-gray-800 hover:bg-gray-700 font-semibold px-6 py-3 rounded-xl shadow-lg transition duration-300 flex items-center gap-2"
            >
              <Users size={20} /> View Contacts
            </Link>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 w-full max-w-5xl px-4">
          <div className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-2xl p-6 shadow-lg">
            <Phone size={40} className="text-blue-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-2 text-white">
              Quick Add
            </h3>
            <p className="text-gray-400">
              Add new contacts instantly with a simple, elegant interface.
            </p>
          </div>

          <div className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-2xl p-6 shadow-lg">
            <Mail size={40} className="text-purple-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-2 text-white">
              Smart Search
            </h3>
            <p className="text-gray-400">
              Quickly find contacts using fast, accurate search filters.
            </p>
          </div>
          <div className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-2xl p-6 shadow-lg">
            <Users size={40} className="text-green-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-2 text-white">
              Easy Management
            </h3>
            <p className="text-gray-400">
              Edit or delete contacts anytime with just one click.
            </p>
          </div>
        </div>
        <div className="mt-14">
          <button
            onClick={() => {
              localStorage.clear();
              document.cookie =
                "jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              window.location.href = "/login";
            }}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-3 rounded-xl shadow-md transition"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}
