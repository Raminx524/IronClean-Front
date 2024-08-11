import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ICleaner } from "./CleanersPage";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReservationsCalendar } from "@/components/Calendar/ReservationsCalendar";
const CLEANER_URL = "http://localhost:3000/api/cleaners/";

export interface IReview {
  ID: number;
  Poster_ID: number;
  Posted_ID: number;
  Rating: number;
  Text: string;
  Username: string;
  avatar_img: string;
}

function CleanerDetailsPage() {
  const { id } = useParams();

  async function fetchCleaner() {
    const { data } = await axios.get(CLEANER_URL + id);
    return data;
  }

  async function fetchReviews() {
    const { data } = await axios.get(CLEANER_URL + id + "/reviews");
    return data;
  }

  const {
    data: cleaner,
    error: cleanerError,
    isLoading: isCleanerLoading,
  } = useQuery({
    queryKey: [`cleaner${id}`],
    queryFn: fetchCleaner,
  });

  const {
    data: reviews,
    error: reviewsError,
    isLoading: isReviewsLoading,
  } = useQuery({
    queryKey: [`cleaner${id}/reviews`],
    queryFn: fetchReviews,
  });

  if (isCleanerLoading) return <p>Loading...</p>;
  if (cleanerError) return <p>Something Went Wrong, please try again later!</p>;

  return (
    <div>
      <Avatar>
        <AvatarImage src={cleaner.avatar_img} alt={cleaner.Username} />
        <AvatarFallback>{cleaner.Username[0]}</AvatarFallback>
      </Avatar>
      <h1>{`${cleaner.First_name} ${cleaner.Last_name}`}</h1>
      <div>
        <p>{cleaner.Summary}</p>
        <p>{cleaner.Phone_number}</p>
        <p>{cleaner.Email}</p>
        <p>${cleaner.Price}/hour</p>
        <p>{cleaner.avg_rating}</p>
      </div>
      <div>
        <h2>Reviews</h2>
        {isReviewsLoading ? (
          <p>Loading reviews...</p>
        ) : (
          <ul>
            {reviews?.map((review: IReview) => (
              <li key={review.ID} className="flex gap-6">
                <Avatar>
                  <AvatarImage src={review.avatar_img} alt={review.Username} />
                  <AvatarFallback>{review.Username[0]}</AvatarFallback>
                </Avatar>
                <p>{review.Username}</p>
                <p>{review.Rating}</p>
                <p>{review.Text}</p>
              </li>
            ))}
          </ul>
        )}
        <ReservationsCalendar />
      </div>
    </div>
  );
}

export default CleanerDetailsPage;
