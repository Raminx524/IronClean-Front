import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaStar } from "react-icons/fa";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import api from "@/services/api.service";

const CLEANER_URL = "/cleaners/";

export interface IReview {
  ID: number;
  Poster_ID: number;
  Posted_ID: number;
  Rating: number;
  Text: string;
  Username: string;
  avatar_img: string;
}

const StarRating = ({ rating }: { rating: number }) => {
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

function CleanerDetailsPage() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [rating, setRating] = useState<number>(0);
  const [text, setText] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const token = localStorage.getItem("token");
  const { loggedInUser } = useAuth();
  const fetchCleaner = async () => {
    try {
      const { data } = await api.get(`${CLEANER_URL}${id}`);
      return data;
    } catch (error) {
      throw new Error("Failed to fetch cleaner details");
    }
  };

  const fetchReviews = async () => {
    try {
      const { data } = await api.get(`${CLEANER_URL}${id}/reviews`);
      return data;
    } catch (error) {
      throw new Error("Failed to fetch reviews");
    }
  };

  const {
    data: cleaner,
    error: cleanerError,
    isLoading: isCleanerLoading,
  } = useQuery({
    queryKey: [`cleaner-${id}`],
    queryFn: fetchCleaner,
  });

  const {
    data: reviews,
    error: reviewsError,
    isLoading: isReviewsLoading,
  } = useQuery({
    queryKey: [`cleaner-${id}-reviews`],
    queryFn: fetchReviews,
  });

  const mutation = useMutation({
    mutationFn: async () => {
      try {
        await api.post(`${CLEANER_URL}${id}/review`, {
          Poster_ID: loggedInUser?.ID,
          Posted_ID: id,
          Rating: rating,
          Text: text,
        });
      } catch (error) {
        throw new Error("Failed to post review");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`cleaner-${id}-reviews`]);
      setIsOpen(false); // Close the dialog after successful submission
      setRating(0); // Reset rating
      setText(""); // Reset text
    },
  });

  const handleSubmit = () => {
    console.log("Submit button clicked");
    mutation.mutate();
  };
  const handleDelete = (reviewId: number) => {
    // Confirm deletion with the user
    if (confirm("Are you sure you want to delete this review?")) {
      // Perform the delete request
      api
        .delete(`${CLEANER_URL}${id}/review/${reviewId}`)
        .then(() => {
          // On successful deletion, invalidate queries to refresh the list of reviews
          queryClient.invalidateQueries([`cleaner-${id}-reviews`]);
          console.log("Review deleted successfully");
        })
        .catch((error) => {
          // Handle errors
          console.error("Failed to delete review:", error);
        });
    }
  };

  if (cleanerError) return <p>Something went wrong, please try again later!</p>;
  if (!cleaner) return <p>...Load</p>;

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
        <StarRating rating={cleaner.avg_rating} />
      </div>
      <div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsOpen(true)}>Add Review</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a Review</DialogTitle>
            </DialogHeader>
            <div>
              <Input
                type="number"
                placeholder="Rating (1-5)"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                max={5}
                min={1}
              />
              <Textarea
                placeholder="Your review"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button onClick={handleSubmit} disabled={mutation.isLoading}>
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        <h2>Reviews</h2>
        {isReviewsLoading ? (
          <p>Loading reviews...</p>
        ) : reviewsError ? (
          <p>Failed to load reviews</p>
        ) : (
          <ul>
            {reviews.map((review: IReview) => (
              <li key={review.ID} className="flex gap-6">
                <Avatar>
                  <AvatarImage src={review.avatar_img} alt={review.Username} />
                  <AvatarFallback>{review.Username[0]}</AvatarFallback>
                </Avatar>
                <p>{review.Username}</p>
                <StarRating rating={review.Rating} />
                <p>{review.Text}</p>
                {loggedInUser?.ID === review.Poster_ID ? (
                  <Button
                    onClick={() => {
                      handleDelete(review.ID);
                    }}
                  >
                    Delete
                  </Button>
                ) : (
                  ""
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CleanerDetailsPage;
