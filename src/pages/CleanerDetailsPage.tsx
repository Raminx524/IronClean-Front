import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ICleaner } from "./CleanersPage";
import axios from "axios";

function CleanerDetailsPage() {
  const { id } = useParams();

  async function fetchCleaner() {
    const { data } = await axios.get(
      `http://localhost:3000/api/cleaners/${id}`
    );
    console.log(data);

    return data;
  }

  const {
    data: cleaner,
    error,
    isLoading,
  } = useQuery({
    queryKey: [`cleaner${id}`],
    queryFn: fetchCleaner,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something Went Wrong, please try again later!</p>;

  return (
    <div>
      <h1>{`${cleaner.First_name} ${cleaner.Last_name}`}</h1>
      <div>
        <p>{cleaner.Summary}</p>
        <p>{cleaner.Phone_number}</p>
        <p>{cleaner.Email}</p>
        <p>${cleaner.Price}/hour</p>
        <p>{cleaner.avg_rating}</p>
      </div>
    </div>
  );
}

export default CleanerDetailsPage;
