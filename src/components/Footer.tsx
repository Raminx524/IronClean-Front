import { Link } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function Footer() {
  return (
    <footer className="py-4 px-6 bg-slate-400 w-full h-44">
      <div className="flex justify-between">
        <div>
          <p>Company Name: IronClean</p>
          <p>Address: 1234 Clean St, Sparkle City, ST 56789</p>
          <p>Phone: (123) 456-7890</p>
          <p>Email: info@ironclean.com</p>
        </div>
        <div className="flex flex-col">
          <Link to="/">Home</Link>
          <Link to="/cleaners">Cleaners</Link>
          <Link to="/userProfile">My Profile</Link>
          <Link to="/about">About Us</Link>
          <Link to="/#contact">Contact</Link>
        </div>
        <div className="space-y-2">
          <Input placeholder="Email@Example.com" type="email" />
          <Button>Subscribe To Our Newsletter</Button>
        </div>
      </div>
      <div className="flex justify-evenly">
        <p>© 2024 IronClean. All rights reserved.</p>
        <p>Privacy Policy | Terms of Service</p>
      </div>
    </footer>
  );
}

export default Footer;
