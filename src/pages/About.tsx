import React from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaHandsHelping,
  FaShieldAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function AboutPage() {
  const teamMembers = [
    {
      name: "Ron Gamarnik",
      position: "Founder & CEO",
      avatar_img: "/src/images/ron.jpeg",
    },
    {
      name: "Dmitriy Istomin",
      position: "Head of Operations",
      avatar_img: "/src/images/dima.jpeg",
    },
    {
      name: "Ramin Aliev",
      position: "Customer Support Lead",
      avatar_img: "/src/images/ramin.jpeg",
    },
  ];

  const values = [
    {
      icon: FaHandsHelping,
      title: "Commitment to Quality",
      text: "We ensure top-notch services by focusing on the smallest details.",
    },
    {
      icon: FaShieldAlt,
      title: "Trust & Safety",
      text: "Your safety and trust are our top priorities.",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Local Focus",
      text: "Serving local communities with a personal touch.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* About Us Hero Section */}
      <section className="flex flex-col items-center text-center gap-8 py-12">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold"
        >
          About Iron Clean
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-3xl"
        >
          At Iron Clean, we believe in providing exceptional cleaning services
          tailored to your needs. Our mission is to make your life easier, one
          clean home at a time.
        </motion.p>
      </section>

      {/* Our Values Section */}
      <motion.section
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="py-8"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-4 py-8 bg-primary/30 rounded-lg"
            >
              <value.icon className="text-4xl text-primary mb-2" />
              <h3 className="text-xl font-semibold">{value.title}</h3>
              <p className="text-lg">{value.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Our Team Section */}
      <motion.section
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="py-8"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-4 py-8 bg-white rounded-lg shadow-lg"
            >
              <Avatar className="mb-4 w-20 h-20">
                <AvatarImage src={member.avatar_img} alt={member.name} />
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-lg text-muted-foreground">{member.position}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}

export default AboutPage;
