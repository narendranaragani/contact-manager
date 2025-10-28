import { User, Loader2, Search } from "lucide-react";
import ContactItem from "../contactItem.jsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/navbar.jsx";
import Cookies from "js-cookie";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ContactList() {
  const [contactList, setContactList] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const navigate = useNavigate()

  useEffect(() => {
    async function getContacts() {
      const token = Cookies.get("jwt_token");
      if (!token) {
        console.error("No JWT token found");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://contact-backend-1-6hdg.onrender.com/api/contacts`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await response.json();
        const contacts = Array.isArray(data) ? data : [];
        setContactList(contacts);
        setFilteredContacts(contacts);
      } catch (err) {
        console.error(err);
        setContactList([]);
        setFilteredContacts([]);
      }

      setIsLoading(false);
    }

    getContacts();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    const filtered = contactList.filter(
      (contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase()) ||
        contact.email.toLowerCase().includes(value.toLowerCase()) ||
        contact.phone.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredContacts(filtered);
  };

  return (
    <div className="bg-gray-900 min-h-screen w-full text-gray-100">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <div className="pt-24 px-4 max-w-6xl mx-auto">
        <ArrowLeft
          onClick={() => navigate(-1)}
          className="cursor-pointer text-white hover:text-blue-500 transition-colors mb-10"
          size={24}
        />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-800 rounded-xl p-4 shadow-md gap-4 mb-6">
          <div className="flex items-center gap-3 text-xl font-semibold">
            <User size={24} />
            Contacts ({filteredContacts.length})
          </div>
          <div className="flex-1 flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search contacts..."
                value={search}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-300"
              />
            </div>
            <Link to="/form">
              <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl font-semibold transition">
                Add Contact
              </button>
            </Link>
          </div>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-[400px]">
            <Loader2 className="animate-spin text-blue-500" size={40} />
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="text-center text-gray-400 mt-20">
            <User size={50} className="mx-auto mb-4 text-gray-500" />
            <p className="text-xl font-medium mb-1">No contacts found</p>
            <p className="text-sm">
              Add or search for contacts using the bar above.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto">
            {filteredContacts.map((c) => (
              <div key={c._id} className="bg-gray-800 p-4 rounded-xl shadow-md">
                <ContactItem contact={c} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
