import React, { useEffect, useState } from 'react';

type CardProps = {
  text?: number | string;
  image?: string;
  colorElements?: JSX.Element | JSX.Element[];
  isInSelectBar?: boolean;
  color?: string;
  backgroundImage?: string;
  delay?: number;
};

const Card: React.FC<CardProps> = ({
  text,
  image,
  colorElements,
  isInSelectBar = false,
  color,
  backgroundImage,
  delay = 0,
}) => {
  const [showColor, setShowColor] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowColor(true));
    return () => clearTimeout(timeout);
  }, [delay]);
  return (
    <div
      style={{
        backgroundColor: showColor ? color || '#2E2E2E' : '#2E2E2E',
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-color 0.8s ease-in-out',
      }}
      className={`flex items-center justify-center text-white ${
        isInSelectBar
          ? `lg:w-16 lg:h-16  w-[37px] h-[37px]`
          : `lg:w-20 lg:h-20  w-[52px] h-[52px]`
      } p-4 rounded-lg shadow-lg`}
    >
      {image ? (
        <img
          src={image}
          alt="Card image"
          className="card-image w-[30px] h-[30px] lg:w-full lg:h-full lg:object-contain rounded-sm"
        />
      ) : (
        <div
          className={`${
            isInSelectBar ? `lg:text-lg text-[4px]` : `lg:text-2xl text-sm`
          } font-bold`}
        >
          {text && <p>{text}</p>}
        </div>
      )}
      {colorElements && <div className="flex mt-2">{colorElements}</div>}
    </div>
  );
};

export default Card;
