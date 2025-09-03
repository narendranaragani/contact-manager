import { useNavigate } from "react-router-dom";

export default function ContactItem({ contact }) {
  const navigate = useNavigate();

  function onEdit(contact) {
    console.log(contact);
    navigate(`/edit/${contact._id}`, { state: { contact } });
  }

  function onDelete() {
    fetch(
      `https://contact-backend-fy18.onrender.com/api/contacts/${contact._id}`,
      {
        method: "DELETE",
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
        <p className="text-sm text-gray-600">{contact.email}</p>
        <p className="text-sm text-gray-600">{contact.phone}</p>
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
