import { NavLink } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Menu, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b">
      <nav className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">

        <div className="text-2xl font-bold text-blue-600">
          RentalHub
        </div>
        <div className="hidden md:flex items-center gap-6">
          <SignedOut>
            <NavItem to="/" label="Home" />
            <NavItem to="/about" label="About" />
            <NavItem to="/contact" label="Contact" />

            <NavItem to="/sign-in" label="Sign In" />
            <NavItem to="/sign-up" label="Sign Up" />
          </SignedOut>
          <SignedIn>
            <NavItem to="/home" label="Home" />
            <NavItem to="/about" label="About" />
            <NavItem to="/contact" label="Contact" />
              <div className="relative">
                <button
                  className="flex items-center gap-1 px-3 py-2 hover:text-blue-600"
                  onClick={() => setOpen(!open)}
                >
                  More <ChevronDown size={16} />
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2 z-50">

                    <DropdownItem to="/dashboard" label="Dashboard" onClick={()=> setOpen(false)}/>
                    <DropdownItem to="/properties" label="Properties"onClick={()=>setOpen(false)} />
                    <DropdownItem to="/property/add" label="Add Property" onClick={()=>setOpen(false)} />

                    <DropdownItem to="/tenants" label="Tenants" onClick={()=>setOpen(false)} />
                    <DropdownItem to="/leases" label="Leases"onClick={()=>setOpen(false)} />
                    <DropdownItem to="/maintenance" label="Maintenance" onClick={()=>setOpen(false)} />

                    <DropdownItem to="/predict-rent" label="Predict Rent" onClick={()=>setOpen(false)} />
                    <DropdownItem to="/chat" label="Chat Bot" onClick={()=>setOpen(false)} />
                  </div>
                )}
              </div>
            <UserButton />
          </SignedIn>
        </div>
        {/* <div className="md:hidden">
          <Menu size={28} />
        </div> */}
      </nav>
    </header>
  );
}


function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className="text-gray-700 hover:text-blue-600 transition font-medium"
    >
      {label}
    </NavLink>
  );
}

function DropdownItem({ to, label,onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded"
    >
    
      {label}
    </NavLink>
  );
}
