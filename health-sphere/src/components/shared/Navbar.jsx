
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import pic from '../../assets/logo.png';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="bg-white backdrop-blur-lg shadow-md px-4 py-3 flex justify-between items-center sticky top-0 z-50 rounded-b-xl border-b border-gray-200">
      
      {/* Logo Section hai*/}
      <div className="text-xl font-bold">
        <Link to="/" onClick={closeMenu}>
          <div className='flex items-center gap-2 cursor-pointer transition-transform hover:scale-105 duration-200'>
            <img src={pic} alt="HealthSphere logo" className='h-10 w-10 rounded-full shadow-md' />
            <h2 className="text-xl font-extrabold text-red-600 tracking-wide">
              Health<span className="text-green-500">Sphere</span>
            </h2>
          </div>
        </Link>
      </div>

      {/* this Desktop Menu */}
      <ul className="hidden md:flex space-x-6 text-green-800 font-medium">
        <li><Link to="/" className="hover:text-green-600 transition duration-150">Home</Link></li>
        <li><Link to="/about" className="hover:text-green-600 transition duration-150">About</Link></li>
        <li><Link to="/services" className="hover:text-green-600 transition duration-150">Services</Link></li>
        <li><Link to="/contact" className="hover:text-green-600 transition duration-150">Contact</Link></li>
        <li><Link to="/appointments" className="hover:text-green-600 transition duration-150">Appointments</Link></li>
        <li><Link to="/records" className="hover:text-green-600 transition duration-150">Records</Link></li>
        <li><Link to="/billing" className="hover:text-green-600 transition duration-150">Billing</Link></li>
        <li><Link to="/consult" className="hover:text-green-600 transition duration-150">Consultation</Link></li>
      </ul>
      

      {/* Mobile Menu toggle hoga */}
      <div className="md:hidden flex items-center mr-[-200px] space-x-3">
        <button onClick={toggleMenu} className="text-black focus:outline-none">
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        
      </div>

      {/* Mobile  Dropdown menu hi */}
      {isMobileMenuOpen && (
        <div className="absolute top-[70px] left-0 w-full bg-white/90 backdrop-blur-md z-40 border-t border-gray-200 md:hidden shadow-lg">
          <ul className="flex flex-col p-4 space-y-3 text-green-800 font-medium">
            <li><Link to="/" onClick={closeMenu} className="hover:text-green-600">Home</Link></li>
            <li><Link to="/about" onClick={closeMenu} className="hover:text-green-600">About</Link></li>
            <li><Link to="/services" onClick={closeMenu} className="hover:text-green-600">Services</Link></li>
            <li><Link to="/contact" onClick={closeMenu} className="hover:text-green-600">Contact</Link></li>
            <li><Link to="/appointments" onClick={closeMenu} className="hover:text-green-600">Appointments</Link></li>
            <li><Link to="/records" onClick={closeMenu} className="hover:text-green-600">Records</Link></li>
            <li><Link to="/billing" onClick={closeMenu} className="hover:text-green-600">Billing</Link></li>
            <li><Link to="/consult" onClick={closeMenu} className="hover:text-green-600">Consultation</Link></li>
          </ul>
        </div>
      )}
       {/* User hai  */}
      <div className="flex items-center space-x-4">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <Link
            to="/signin"
            className="text-blue-600 font-semibold px-4 py-1 rounded-md hover:bg-blue-100 transition"
          >
            Sign In
          </Link>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;
