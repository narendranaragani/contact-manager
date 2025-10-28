import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function ContactItem({ contact }) {
  const navigate = useNavigate();

  function onEdit(contact) {
    console.log(contact);
    navigate(`/edit/${contact._id}`, { state: { contact } });
  }
   const token = Cookies.get("jwt_token");

  function onDelete() {
    fetch(
      `https://contact-backend-1-6hdg.onrender.com/api/contacts/${contact._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        window.location.reload();
      })
      .catch((err) => console.error("Error:", err));
  }

  return (
    <div className="flex justify-between items-center border p-3 rounded">
      <div>
        <p className="font-semibold">{contact.name}</p>
        <p className="text-sm text-gray-400 mb-2">{contact.email}</p>
        <p className="text-sm text-gray-400 font-bold">
          Phn No: <span className="text-white">{contact.phone}</span>
        </p>
      </div>
      <div className="space-x-2">
        <button
          onClick={() => onEdit(contact)}
          className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(contact._id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
