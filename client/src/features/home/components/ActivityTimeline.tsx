import React from 'react';
import { MoreVertical } from 'lucide-react';

interface EventCardProps {
  title: string;
  date: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  price: number;
  imageUrl?: string;
}

interface TimelineProps {
  events: EventCardProps[];
}

const EventCard: React.FC<EventCardProps> = ({ title, date, status, price, imageUrl }) => {
  const getStatusColor = (status: EventCardProps['status']) => {
    switch (status) {
      case 'Upcoming':
        return 'text-green-600';
      case 'Completed':
        return 'text-blue-600';
      case 'Cancelled':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 relative">
      {/* Timeline dot and line */}
      <div className="absolute left-0 -ml-[25px] w-12 flex items-center justify-center">
        <div className="w-3 h-3 bg-blue-500 rounded-full z-10" />
      </div>
      
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
          <span className="text-sm text-gray-500">{date}</span>
          <span className={`ml-2 text-sm font-medium ${getStatusColor(status)}`}>
            {status}
          </span>
        </div>
      </div>
      
      {/* Price and menu */}
      <div className="flex items-center">
        <span className="mr-4 font-medium">EGP {price}</span>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical size={20} />
        </button>
      </div>
    </div>
  );
};

const Timeline: React.FC<TimelineProps> = ({ events }) => {
    return (
      <div className="relative pl-8">
        {events.map((event, index) => (
          <div key={index} className="relative mb-8">
            {/* Vertical line connecting cards */}
            {index < events.length - 1 && (
              <div className="absolute left-4 top-8 bottom-0 w-px bg-gray-300 z-0" />
            )}
            {/* Render the EventCard */}
            <EventCard
              title={event.title}
              date={event.date}
              status={event.status}
              price={event.price}
              imageUrl={event.imageUrl}
            />
          </div>
        ))}
      </div>
    );
  };

// Example usage with sample data
const sampleEvents: EventCardProps[] = [
  {
    title: "Abu Simbel Temple",
    date: "25 Jul 8:00 AM",
    status: "Upcoming",
    price: 500,
  },
  {
    title: "Pyramids of Giza",
    date: "26 Jul 9:00 AM",
    status: "Upcoming",
    price: 600,
  },
  {
    title: "Egyptian Museum",
    date: "27 Jul 10:00 AM",
    status: "Upcoming",
    price: 400,
  },
  {
    title: "Khan el-Khalili",
    date: "28 Jul 2:00 PM",
    status: "Upcoming",
    price: 300,
  }
];

export default () => <Timeline events={sampleEvents} />;