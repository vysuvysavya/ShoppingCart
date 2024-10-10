import { AiFillStar, AiOutlineStar } from "react-icons/ai"; // Import star icons for rating display

const Rating = ({ rating, onClick, style }) => {
  return (
    <>
      {/* Create 5 stars for rating */}
      {[...Array(5)].map((_, i) => (
        <span key={i} onClick={() => onClick(i)} style={style}>
          {rating > i ? ( // Fill star if rating is greater than index
            <AiFillStar fontSize="15px" />
          ) : (
            <AiOutlineStar fontSize="15px" /> // Outline star if rating is less than or equal to index
          )}
        </span>
      ))}
    </>
  );
};

export default Rating;
