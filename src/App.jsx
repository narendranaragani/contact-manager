import ContactForm from "./components/contactForm.jsx";
import ContactList from "./components/contactList/contactList.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Routes>
          <Route path="/form" element={<ContactForm />} />
          <Route path="/" element={<ContactList />} />
          <Route path="/edit/:id" element={<ContactForm />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
