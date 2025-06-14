import React from "react";
import { Compass, CloudRain, Eye } from "lucide-react";
import Weathercard from "./subcomponents/cards/Weathercard";
function Gridmatrics() {
  const weatherCards = [
    {
      subtitle: "Wind Direction",
      content: "Current wind direction",
      title: "WSW",
      icon: Compass,
    },
    {
      subtitle: "Cloud Cover",
      content: "Percentage of sky covered by clouds",
      title: "25%",
      icon: CloudRain,
    },
    {
      subtitle: "Visibility",
      content: "Distance visible to the human eye",
      title: "10 km",
      icon: Eye,
    },
  ];
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6 py-5">
      {weatherCards.map((card, index) => (
        <Weathercard
          key={index}
          subtitle={card.subtitle}
          content={card.content}
          title={card.title}
          icon={card.icon}
        />
      ))}
    </div>
  );
}

export default Gridmatrics;
