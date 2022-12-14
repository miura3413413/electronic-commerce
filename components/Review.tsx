import Image from "next/image";
import React, { ReactNode } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";

interface Props {
  reviews: {
    userName: string | null | undefined;
    userImage: string | null | undefined;
    rate: number;
    title: string;
    text: string;
  }[];
}

export const startRate = (num: number): ReactNode => {
  const starRate = [];
  for (let i = 0; i < num; i++) {
    starRate.push(<AiFillStar key={i} />);
  }
  for (let i = 0; i < 5 - num; i++) {
    starRate.push(<AiOutlineStar key={i + 4} />);
  }
  return starRate;
};

const Review = ({ reviews }: Props) => {
  return (
    <div>
      {reviews.map((review, index) => (
        <div key={index}>
          <div className="flex items-center mt-10">
            {review.userImage ? (
              <div className="relative w-8 h-8 rounded-full mr-2 border-2 border-white">
                <Image
                  src={review.userImage}
                  alt=""
                  fill
                  className="-full object-cover"
                ></Image>
              </div>
            ) : (
              <BsFillPersonFill className="w-7 h-7 cursor-pointer mr-3 " />
            )}
            <h1>{review.userName}</h1>
          </div>
          <div className="flex items-center">
            {startRate(review.rate)}
            <h1 className="ml-2 font-bold">{review.title}</h1>
          </div>
          <h1>{review.text}</h1>
        </div>
      ))}
    </div>
  );
};

export default Review;
