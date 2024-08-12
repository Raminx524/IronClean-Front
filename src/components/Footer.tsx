import { Link } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaPinterestP,
  FaTwitter,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-primary text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4 flex flex-col justify-between">
            <Link to="/" className="text-2xl font-bold text-primary-foreground">
              IronClean
            </Link>
            <div className="f_widget social-widget pl_70 wow fadeInLeft ">
              <h3 className="text-2xl font-semibold text-primary-foreground mb-4">
                Team Solutions
              </h3>
              <div
                className="flex gap-4 text-secondary
              "
              >
                <a href="#">
                  {" "}
                  <FaFacebookF size="20" />
                </a>
                <a href="#">
                  <FaTwitter size="20" />
                </a>
                <a href="#">
                  <FaLinkedinIn size="20" />
                </a>
                <a href="#">
                  <FaPinterestP size="20" />
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-4 ">
            <h3 className="text-2xl font-semibold text-primary-foreground ">
              Contact Us
            </h3>
            <p className="text-sm text-secondary">123 Cleaning Street, Sparkle City, 12345</p>
            <p className="text-sm text-secondary">Phone: (123) 456-7890</p>
            <p className="text-sm text-secondary">Email: info@ironclean.com</p>
          </div>

          <div className="space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-primary-foreground mb-4 text-acsent-foreground">
                Newsletter
              </h3>
              <p className="text-sm text-secondary">
                Stay updated with our latest news and offers.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="Email@example.com"
                type="email"
                className=" bg-foreground text-primary-foreground placeholder:text-primary-foreground"
              />
              <Button className="bg-foreground font-semibold py-2 px-4 rounded">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-foreground text-foreground flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-secondary">&copy; 2024 IronClean. All rights reserved.</p>
          <div className="mt-4 sm:mt-0">
            <Link
              to="/privacy"
              className="text-sm text-secondary hover:text-white transition-colors mr-4"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-sm text-secondary hover:text-white transition-colors"
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
