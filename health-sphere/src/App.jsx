import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  ClerkProvider
} from '@clerk/clerk-react';

import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import SignInSignUp from './components/Auth/SignInSignUp';
import Appointments from './pages/Appointments';
import Records from './pages/Records';
import Billing from './pages/Billing';
import VideoCallComponent from './components/Videocall/VideoCallComponent';
import AppointmentForm from './pages/AppointmentForm';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignInSignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/appointmentForm" element={<AppointmentForm />} />

          {/*   Routes safe krna */}
          <Route
            path="/appointments"
            element={
              <SignedIn>
                <Appointments />
              </SignedIn>
            }
          />
          <Route
            path="/records"
            element={
              <SignedIn>
                <Records />
              </SignedIn>
            }
          />
          <Route
            path="/billing"
            element={
              <SignedIn>
                <Billing />
              </SignedIn>
            }
          />
          <Route
            path="/consult"
            element={
              <SignedIn>
                <VideoCallComponent />
              </SignedIn>
            }
          />
        </Routes>
      </main>
      <Footer />

      {/* sign in agar authenticate na hua tohh */}
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}

export default App;
