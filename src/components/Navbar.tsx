import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LucideDot, Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdOutlineMessage } from "react-icons/md";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { ModeToggle } from "./DarkMode";
import { Separator } from "./ui/separator";
import api from "@/services/api.service";

interface Notification {
  id: number;
  is_seen: boolean;
  content: string;
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { loggedInUser, logout } = useAuth();
  const [notifications, setNotifications] = useState<Notification[] | null>(
    null
  );

  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: "-100%" },
  };

  useEffect(() => {
    async function fetchNotification() {
      const response = await api.get("/notification");
      setNotifications(response.data);
    }
    fetchNotification();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  console.log(loggedInUser);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300  ${
        scrolled ? "bg-background/80 backdrop-blur" : "bg-background"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold">
            IronClean
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/cleaners"
              className="text-muted-foreground hover:text-foreground"
            >
              Cleaners
            </Link>
            <Link
              to="/about"
              className="text-muted-foreground hover:text-foreground"
            >
              About Us
            </Link>

            <AnchorLink href="#contact" offset={90}>
              Contact Us
            </AnchorLink>
            <ModeToggle></ModeToggle>
            {loggedInUser ? (
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarFallback className="bg-primary-foreground border-primary border-2">
                        <MdOutlineMessage />
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="max-w-72">
                    <div>
                      {notifications?.map((notification) => {
                        return (
                          <div key={notification.id} className="p-2 ">
                            <div className="flex">
                              <div>{notification.content}</div>
                              {!notification.is_seen ? (
                                <div>
                                  <LucideDot color="#f15" />
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                            <Separator />
                          </div>
                        );
                      })}

                      <Button className="w-full">
                        Clear All Notifications
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              ""
            )}
            {loggedInUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage
                      src={
                        loggedInUser.avatar_img
                          ? loggedInUser.avatar_img
                          : "https://github.com/shadcn.png"
                      }
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <Link to="/profile">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div>
                <Link to="/auth">
                  <Button variant="outline">Login</Button>
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/cleaners"
                className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
              >
                Cleaners
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
              >
                About Us
              </Link>
              <Link
                to="/#contact"
                className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
              >
                Contact Us
              </Link>
              {loggedInUser ? (
                <>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/"
                    onClick={() => {
                      logout();

                      setIsOpen(false);
                    }}
                    className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/auth"
                    className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
