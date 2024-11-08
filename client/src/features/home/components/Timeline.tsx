import React from "react";


export interface EventCardProps {
  title: string;
  duration: string;
  imageUrl?: string;
}

interface TimelineProps {
  events: EventCardProps[];
}

export const EventCard: React.FC<EventCardProps> = ({ title, duration, imageUrl }) => {
  

  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 relative">
      {/* Thumbnail */}
      <div className="w-12 h-12 mr-4">
        <img
          src={imageUrl || "/api/placeholder/48/48"}
          alt="Event thumbnail"
          className="rounded-lg object-cover w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <div className="flex items-center mt-1">
          <span className="text-sm text-gray-500">{duration}</span>
        </div>
      </div>
    </div>
  );
};

export const Timeline: React.FC<TimelineProps> = ({ events }) => {
  return (
    <div className="relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300"></div>

     
      {events.map((event, index) => (
        (index + 1) % 2 === 0 ? (
          <div className="flex items-center mb-8 flex-row-reverse" key={index}>
            <div className="w-1/2 pl-4 text-left">
              <EventCard {...event} />
            </div>
            <div className="w-1/2 pr-4 flex items-center justify-end">
              <div className="bg-gray-400 w-8 h-8 rounded-full"></div>
            </div>
          </div>
        ) : (
          <div className="flex items-center mb-8" key={index}>
            <div className="w-1/2 pr-4 text-left">
              <EventCard {...event} />
            </div>
            <div className="w-1/2 pl-4 flex items-center">
              <div className="bg-gray-400 w-8 h-8 rounded-full"></div>
            </div>
          </div>
        )
      ))}
    </div>
  );
};



