import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

export interface ICleaner {
  Email: string;
  First_name: string;
  ID: number;
  Last_name: string;
  Phone_number: string;
  Price: string;
  Summary: string;
  Username: string;
  role: string;
  user_id: number;
  avg_rating: string;
}
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

async function fetchCleaners() {
  try {
    const res = await axios.get("http://localhost:3000/api/cleaners");
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

function CleanersPage() {
  const {
    data: cleaners,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["cleaners"],
    queryFn: fetchCleaners,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something Went Wrong, please try again later!</p>;
  return (
    <div>
      <h1>Our Cleaners</h1>
      <ul>
        {cleaners?.map((cleaner: ICleaner) => (
          <li key={cleaner.ID} className="flex w-full justify-evenly">
            <p>{`${cleaner.First_name} ${cleaner.Last_name}`}</p>
            <p>{`$${cleaner.Price}/h`}</p>
            <StarRating rating={parseFloat(cleaner.avg_rating)} />
            <Link to={`/cleaners/${cleaner.ID}`}>See more</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CleanersPage;
