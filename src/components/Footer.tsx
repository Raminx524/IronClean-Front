import { Link } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function Footer() {
  return (
    <footer className="bg-muted text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <nav className="flex flex-col flex-wrap justify-between text-center h-20 space-y-2">
              <Link
                to="/"
                className="hover:text-foreground transition-colors py-2"
              >
                Home
              </Link>
              <Link
                to="/cleaners"
                className="hover:text-foreground transition-colors"
              >
                Cleaners
              </Link>
              <Link
                to="/userProfile"
                className="hover:text-foreground transition-colors"
              >
                My Profile
              </Link>
              <Link
                to="/about"
                className="hover:text-foreground transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/#contact"
                className="hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Newsletter</h3>
            <p className="text-sm">
              Stay updated with our latest news and offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="Email@example.com"
                type="email"
                className=" bg-primary text-white border-gray-700 focus:border-blue-500 "
              />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                Subscribe
              </Button>
            </form>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <p className="text-sm">123 Cleaning Street, Sparkle City, 12345</p>
            <p className="text-sm">Phone: (123) 456-7890</p>
            <p className="text-sm">Email: info@ironclean.com</p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm">&copy; 2024 IronClean. All rights reserved.</p>
          <div className="mt-4 sm:mt-0">
            <Link
              to="/privacy"
              className="text-sm hover:text-white transition-colors mr-4"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-sm hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
