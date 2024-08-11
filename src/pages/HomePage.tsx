import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="space-y-6 py-10">
      <section className="flex">
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-4xl font-bold">Iron Clean</h1>
          <p className="text-2xl font-semibold">
            Book trusted and professional home cleaners with just a few clicks.
            Enjoy a sparkling clean home without the hassle.
          </p>
          <Link to="/cleaners">
            <Button>Book Your Cleaner Now</Button>
          </Link>
        </div>
        <div className="flex-1">Some Beautiful animation</div>
      </section>
      <section className="min-h-52 border">
        <p>Our Top Cleaners</p>
      </section>
      <section id="contact" className="w-1/2 space-y-4">
        <h2>Contact Us</h2>
        <form className="space-y-4">
          <div className="flex gap-4">
            <Input id="username" placeholder="Username" />
            <Input id="email" placeholder="Email@Example.com" />
          </div>
          <textarea
            id="userMsg"
            placeholder="What's on your mind?"
            className="h-20 w-full border rounded-md p-2"
          />
          <input type="text" />
          <Button>Submit</Button>
        </form>
      </section>
    </div>
  );
}

export default HomePage;
