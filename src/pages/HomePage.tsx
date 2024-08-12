import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaClock,
  FaCheckCircle,
  FaUserFriends,
  FaShieldAlt,
  FaMoneyBillWave,
  FaStar,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Import shadcn components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Cleaner {
  id: number;
  First_name: string;
  Price: number;
  avg_rating: string;
  avatar_img: string;
}

const fetchTopCleaners = async (): Promise<Cleaner[]> => {
  const response = await axios.get("http://localhost:3000/api/cleaners/top");
  console.log(response.data);
  return response.data;
};

const StarRating = ({ rating }: { rating: any }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          className={
            index < Math.round(rating) ? "text-yellow-400" : "text-gray-300"
          }
          size={16}
        />
      ))}
    </div>
  );
};

function HomePage() {
  const {
    data: topCleaners,
    error,
    isLoading,
  } = useQuery<Cleaner[], Error>({
    queryKey: ["topCleaners"],
    queryFn: fetchTopCleaners,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5, // 5 minutes
  });

  const reasons = [
    { icon: FaHome, text: "Professional home cleaning" },
    { icon: FaClock, text: "Flexible scheduling" },
    { icon: FaCheckCircle, text: "Quality guaranteed" },
    { icon: FaUserFriends, text: "Trusted cleaners" },
    { icon: FaShieldAlt, text: "Insured and bonded" },
    { icon: FaMoneyBillWave, text: "Competitive pricing" },
  ];

  return (
    <div>
      <section
        className="flex flex-col md:flex-row items-center bg-primary bg-opacity-50 px-5 gap-8 text-primary-foreground"
        style={{
          backgroundImage: "url(src/images/Untitleds.gif)",
          backgroundPosition: "contain",
          backgroundSize: "cover",
          backgroundPositionX: "center",
          backgroundPositionY: "center",
          backgroundBlendMode: "multiply",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex-1 flex flex-col gap-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold">Iron Clean</h1>
            <p className="text-xl md:text-2xl">
              Book trusted and professional home cleaners with just a few
              clicks. Enjoy a sparkling clean home without the hassle.
            </p>
            <Link to="/cleaners">
              <Button size="lg" className="w-full md:w-auto">
                Book Your Cleaner Now
              </Button>
            </Link>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex-1 flex justify-end"
          >
            <div className="w-96 h-96   flex items-center justify-center bg-cover "></div>
          </motion.div>
        </div>
      </section>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Top Cleaners section */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="py-8"
        >
          <h2 className="text-3xl font-semibold mb-6">Our Top Cleaners</h2>
          {isLoading ? (
            <p>Loading top cleaners...</p>
          ) : error ? (
            <p>Error loading cleaners: {error.message}</p>
          ) : (
            <Carousel className="min-w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
              <CarouselContent>
                {[...Array(6)].map((_, index) => (
                  <CarouselItem key={index}>
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-4">
                          {topCleaners && topCleaners[index] ? (
                            <>
                              <Avatar>
                                <AvatarImage
                                  src={topCleaners[index].avatar_img}
                                  alt={topCleaners[index].First_name}
                                />
                                <AvatarFallback>
                                  {topCleaners[index].First_name[0]}
                                </AvatarFallback>
                              </Avatar>
                              {topCleaners[index].First_name}
                            </>
                          ) : (
                            "Available Slot"
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {topCleaners && topCleaners[index] ? (
                          <>
                            <p>Price: ${topCleaners[index].Price}/hour</p>
                            <div className="flex items-center gap-2">
                              <span>Rating:</span>
                              <StarRating
                                rating={parseFloat(
                                  topCleaners[index].avg_rating
                                )}
                              />
                            </div>
                          </>
                        ) : (
                          <p>Become one of our top cleaners!</p>
                        )}
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
        </motion.section>

        {/* Why Choose Us section */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="py-8 mb-8"
        >
          <h2 className="text-3xl font-semibold mb-6 text-center">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center p-4 bg-primary/30 rounded-lg"
              >
                <reason.icon className="text-4xl text-primary mb-2" />
                <p className="text-lg">{reason.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Us section */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className=" mx-auto"
          id="contact"
        >
          <h2 className="text-3xl font-semibold mb-6">Contact Us</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input id="username" placeholder="Username" />
              <Input id="email" type="email" placeholder="Email@Example.com" />
            </div>
            <Textarea
              id="userMsg"
              placeholder="What's on your mind?"
              className="h-32"
            />
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </motion.section>
      </motion.div>
    </div>
  );
}

export default HomePage;
