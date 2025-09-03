import { User } from "lucide-react"; // simple user icon
import ContactItem from "../contactItem.jsx";
import { useEffect, useState} from "react";
import {Link} from "react-router-dom"

export default function ContactList() {
  const [contactList, setContactList] = useState([]);
  
  useEffect(() => {
    async function getContacts() {
      const data = await fetch(
        "https://contact-backend-fy18.onrender.com/api/contacts/"
      );
      const res = await data.json();
      setContactList(res);
      console.log(res)
    }
    getContacts();
  }, []);

  return (
   
      <div className="bg-white shadow rounded-lg w-full">
        <div className="bg-gray-100 px-4 py-2 rounded-t-lg font-semibold flex items-center justify-between gap-2">
          <div className="flex gap-5">
            <User size={18} />
            Contacts ({contactList.length})
          </div>
          <div>
            <Link to="/form">
              <button className="bg-blue-600 px-3 py-2 text-white rounded-md mt-2 ">
                Add Contact
              </button>
            </Link>
          </div>
        </div>
        <div className="p-6">
          {contactList.length === 0 ? (
            <div className="text-center text-gray-500">
              <User size={40} className="mx-auto mb-2 text-gray-400" />
              <p className="font-medium">No contacts yet</p>
              <p className="text-sm">
                Add your first contact using the form above to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-3 overflow-y-scroll h-[400px]">
              {contactList.map((c) => (
                <ContactItem key={c.id} contact={c} />
              ))}
            </div>  
          )}
        </div>
      </div>
  );
}
