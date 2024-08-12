import { FaStar } from "react-icons/fa";

interface StarSliderProps {
  rating: number;
  setRating: (rating: number) => void;
}

const StarSlider = ({ rating, setRating }: StarSliderProps) => {
  const handleClick = (index: number) => {
    setRating(index + 1); // Set the rating based on the clicked star index
  };

  return (
    <div className="flex size-20">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          onClick={() => handleClick(index)}
          className={
            index < rating
              ? "text-yellow-400 cursor-pointer"
              : "text-gray-300 cursor-pointer"
          }
          size={30} // Adjust the size of the stars if needed
        />
      ))}
    </div>
  );
};

export default StarSlider;
