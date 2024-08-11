import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 flex justify-between bg-slate-400 p-4">
      <Link to="/">IronClean</Link>
      <div className="space-x-4">
        <Link to="/cleaners">Cleaners</Link>
        <Link to="/about">About Us</Link>
        <Link to="/#contact">Contact Us</Link>
      </div>
      <div className="space-x-4">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;
