import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReservationsCalendar } from "@/components/Calendar/ReservationsCalendar";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  const { loggedInUser } = useAuth();

  const {
    data: cleaner,
    error: cleanerError,
    isLoading: isCleanerLoading,
  } = useQuery({
    queryKey: [`cleaner-${id}`],
    queryFn: () => api.get(`${CLEANER_URL}${id}`).then((res) => res.data),
  });

  const {
    data: reviews,
    error: reviewsError,
    isLoading: isReviewsLoading,
  } = useQuery({
    queryKey: [`cleaner-${id}-reviews`],
    queryFn: () =>
      api.get(`${CLEANER_URL}${id}/reviews`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: () =>
      api.post(`${CLEANER_URL}${id}/review`, {
        Poster_ID: loggedInUser?.ID,
        Posted_ID: id,
        Rating: rating,
        Text: text,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries([`cleaner-${id}-reviews`]);
      setIsOpen(false);
      setRating(0);
      setText("");
    },
  });

  const handleSubmit = () => {
    mutation.mutate();
  };

  const handleDelete = (reviewId: number) => {
    if (confirm("Are you sure you want to delete this review?")) {
      api
        .delete(`${CLEANER_URL}${id}/review/${reviewId}`)
        .then(() => {
          queryClient.invalidateQueries([`cleaner-${id}-reviews`]);
        })
        .catch((error) => {
          console.error("Failed to delete review:", error);
        });
    }
  };

  if (cleanerError)
    return (
      <p className="text-center text-red-500">
        Something went wrong, please try again later!
      </p>
    );
  if (isCleanerLoading) return <p className="text-center">Loading...</p>;
  if (!cleaner) return null;

  const avgRating =
    typeof cleaner.avg_rating === "number"
      ? cleaner.avg_rating.toFixed(1)
      : "N/A";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card className="sticky top-16 ">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{`${cleaner.First_name} ${cleaner.Last_name}`}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-32 h-32">
                  <AvatarImage
                    src={cleaner.avatar_img}
                    alt={cleaner.Username}
                  />
                  <AvatarFallback>{cleaner.Username[0]}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    {cleaner.Summary}
                  </p>
                  <p className="text-sm">{cleaner.Phone_number}</p>
                  <p className="text-sm">{cleaner.Email}</p>
                  <Badge variant="secondary" className="mt-2">
                    ${cleaner.Price}/hour
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <StarRating rating={cleaner.avg_rating} />
                  <span className="text-sm text-muted-foreground">
                    ({avgRating})
                  </span>
                </div>
                <Button onClick={() => setIsOpen(true)} className="w-full">
                  Add Review
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              {isReviewsLoading ? (
                <p className="text-center">Loading reviews...</p>
              ) : reviewsError ? (
                <p className="text-center text-red-500">
                  Failed to load reviews
                </p>
              ) : (
                <ScrollArea className="h-[600px] pr-4">
                  <ul className="space-y-4">
                    {reviews.map((review: IReview) => (
                      <li
                        key={review.ID}
                        className="bg-secondary rounded-lg p-4"
                      >
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage
                              src={review.avatar_img}
                              alt={review.Username}
                            />
                            <AvatarFallback>
                              {review.Username[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{review.Username}</p>
                            <div className="flex items-center space-x-2">
                              <StarRating rating={review.Rating} />
                              <span className="text-sm text-muted-foreground">
                                ({review.Rating})
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="mt-2 text-sm">{review.Text}</p>
                        {loggedInUser?.ID === review.Poster_ID && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(review.ID)}
                            className="mt-2"
                          >
                            Delete
                          </Button>
                        )}
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator className="my-8" />

      <Card className="">
        <CardHeader>
          <CardTitle>Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <ReservationsCalendar />
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a Review</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-700"
              >
                Rating
              </label>
              <Input
                id="rating"
                type="number"
                placeholder="Rating (1-5)"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                max={5}
                min={1}
              />
            </div>
            <div>
              <label
                htmlFor="review"
                className="block text-sm font-medium text-gray-700"
              >
                Your Review
              </label>
              <Textarea
                id="review"
                placeholder="Your review"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit} disabled={mutation.isLoading}>
              {mutation.isLoading ? "Submitting..." : "Submit Review"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CleanerDetailsPage;
