import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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

async function fetchCleaners() {
  try {
    const res = await axios.get("http://localhost:3000/api/cleaners");
    console.log(res);
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
            <p>{cleaner.avg_rating}</p>
            <Link to={`/cleaners/${cleaner.ID}`}>See more</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CleanersPage;
