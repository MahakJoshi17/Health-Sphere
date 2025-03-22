
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppointmentForm() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [patientName, setPatientName] = useState("");
  const [patientNumber, setPatientNumber] = useState("");
  const [patientGender, setPatientGender] = useState("default");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [preferredMode, setPreferredMode] = useState("default");
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!patientName.trim()) {
      errors.patientName = "Patient name is required";
    } else if (patientName.trim().length < 4) {
      errors.patientName = "Name must be at least 4 characters";
    }

    if (!patientNumber.trim()) {
      errors.patientNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(patientNumber.trim())) {
      errors.patientNumber = "Phone number must be exactly 10 digits";
    }

    if (patientGender === "default") {
      errors.patientGender = "Please select a gender";
    }

    if (!appointmentTime) {
      errors.appointmentTime = "Appointment time is required";
    }

    if (preferredMode === "default") {
      errors.preferredMode = "Please select a mode of consultation";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Reset form and show ka toast hona  full 
    setPatientName("");
    setPatientNumber("");
    setPatientGender("default");
    setAppointmentTime("");
    setPreferredMode("default");
    setFormErrors({});
    toast.success("Appointment Scheduled Successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#e0f7fa] to-[#e0f2f1] py-10 px-4">
      <ToastContainer position="top-center" />
      <h1 className="text-3xl font-bold text-red-600 mb-6">
        <Link to="/">
          Health<span className="text-green-500">Sphere</span>
        </Link>
      </h1>
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Book Your Appointment
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name of it */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
            {formErrors.patientName && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.patientName}
              </p>
            )}
          </div>

          {/* contact Number */}
          <div>
            <input
              type="text"
              placeholder="Phone Number"
              value={patientNumber}
              onChange={(e) => setPatientNumber(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
            {formErrors.patientNumber && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.patientNumber}
              </p>
            )}
          </div>

          {/* Gender hoga */}
          <div>
            <select
              value={patientGender}
              onChange={(e) => setPatientGender(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 text-gray-600"
            >
              <option value="default" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="private">Prefer Not to Say</option>
            </select>
            {formErrors.patientGender && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.patientGender}
              </p>
            )}
          </div>

          {/* Appointment Time ki kitne baje */}
          <div>
            <input
              type="datetime-local"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
            {formErrors.appointmentTime && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.appointmentTime}
              </p>
            )}
          </div>

          {/* Mode of Consultation ki online ya offline */}
          <div>
            <select
              value={preferredMode}
              onChange={(e) => setPreferredMode(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 text-gray-600"
            >
              <option value="default" disabled>Select Mode of Consultation</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
            {formErrors.preferredMode && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.preferredMode}
              </p>
            )}
          </div>

          {/* Submit ka Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
}

export default AppointmentForm;
