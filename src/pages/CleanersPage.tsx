import  { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Star, LayoutGrid, List } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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
  avatar_img: string;
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${
            index < Math.round(rating)
              ? "text-yellow-400 fill-current"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
};

async function fetchCleaners() {
  try {
    const res = await axios.get("http://localhost:3000/api/cleaners");
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function CleanersPage() {
  const [viewMode, setViewMode] = useState<"grid" | "row">("grid");
  const {
    data: cleaners,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["cleaners"],
    queryFn: fetchCleaners,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">
            {" "}
            Something went wrong. Please try again later.
          </span>
        </div>
      </div>
    );

  const CleanerCard = ({ cleaner }: { cleaner: ICleaner }) => (
    <Card
      className={`hover:shadow-lg transition-shadow duration-300 ${
        viewMode === "row" ? "flex" : ""
      }`}
    >
      <CardHeader className={viewMode === "row" ? "flex-shrink-0 w-1/4" : ""}>
        <div
          className={`flex ${
            viewMode === "row" ? "flex-col" : ""
          } items-center space-x-4`}
        >
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={cleaner.avatar_img}
            />
            <AvatarFallback>
              {cleaner.First_name[0]}
              {cleaner.Last_name[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl">{`${cleaner.First_name} ${cleaner.Last_name}`}</CardTitle>
            <p className="text-sm text-gray-500">{cleaner.Username}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent  className={`${viewMode === "row" ? "flex-grow" : ""} pt-8`}>
        <p className="text-gray-600 mb-4">{cleaner.Summary}</p>
        <div className="flex justify-between items-center">
          <StarRating rating={parseFloat(cleaner.avg_rating)} />
          <span className="text-lg font-semibold text-green-600">
            ${cleaner.Price}/h
          </span>
        </div>
      </CardContent>
      <CardFooter className={viewMode === "row" ? "flex-shrink-0 w-1/4" : ""}>
        <Button asChild className="w-full mt-4">
          <Link to={`/cleaners/${cleaner.ID}`}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Our Professional Cleaners</h1>
        <RadioGroup
          defaultValue="grid"
          onValueChange={(value) => setViewMode(value as "grid" | "row")}
          className="flex space-x-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="grid" id="grid" className="sr-only" />
            <Label
              htmlFor="grid"
              className={`cursor-pointer p-2 rounded-md ${
                viewMode === "grid" ? "bg-blue-100" : "bg-gray-100"
              }`}
            >
              <LayoutGrid className="h-5 w-5" />
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="row" id="row" className="sr-only" />
            <Label
              htmlFor="row"
              className={`cursor-pointer p-2  rounded-md ${
                viewMode === "row" ? "bg-blue-100" : "bg-gray-100"
              }`}
            >
              <List className="h-5 w-5" />
            </Label>
          </div>
        </RadioGroup>
      </div>
      <div
        className={`${
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-6"
        }`}
      >
        {cleaners?.map((cleaner: ICleaner) => (
          <CleanerCard key={cleaner.ID}  cleaner={cleaner} />
        ))}
      </div>
    </div>
  );
}

export default CleanersPage;
