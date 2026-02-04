import React, { useState } from "react";
import { CalendarIcon } from "@heroicons/react/24/outline"; // ✅ v2 import

const AddEvent = () => {
  const [formData, setFormData] = useState({
    eventId: "",
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    capacity: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("http://localhost:8000/coordinator/create-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error creating event");

      setMessage(data.message);
      setFormData({
        eventId: "",
        title: "",
        description: "",
        date: "",
        startTime: "",
        endTime: "",
        location: "",
        capacity: ""
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-2xl p-8 border border-blue-100">
        
        {/* Header */}
        <div className="flex items-center mb-6">
          <CalendarIcon className="h-8 w-8 text-blue-600 mr-2" />
          <h2 className="text-3xl font-bold text-blue-700">Create College Event</h2>
        </div>

        {/* Feedback */}
        {message && (
          <div className="mb-4 text-center text-sm font-medium text-green-700 bg-green-100 border border-green-300 rounded p-2">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-4 text-center text-sm font-medium text-red-700 bg-red-100 border border-red-300 rounded p-2">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {[
            { label: "Event ID", name: "eventId", type: "text", placeholder: "E001" },
            { label: "Title", name: "title", type: "text", placeholder: "Freshers Party" },
            { label: "Description", name: "description", type: "textarea", placeholder: "Describe the event..." },
            { label: "Location", name: "location", type: "text", placeholder: "Auditorium / Campus Lawn" },
            { label: "Capacity", name: "capacity", type: "number", placeholder: "200", min: 1 }
          ].map((field, idx) => (
            <div key={idx}>
              <label className="block text-blue-700 font-semibold mb-1">{field.label}</label>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none shadow-sm"
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required
                  min={field.min || undefined}
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              )}
            </div>
          ))}

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Date", name: "date", type: "date" },
              { label: "Start Time", name: "startTime", type: "time" },
              { label: "End Time", name: "endTime", type: "time" }
            ].map((field, idx) => (
              <div key={idx}>
                <label className="block text-blue-700 font-semibold mb-1">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-4 text-white font-bold rounded-lg shadow-md transition duration-200 ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            }`}
          >
            {loading ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
