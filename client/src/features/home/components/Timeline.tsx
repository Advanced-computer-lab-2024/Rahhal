
export interface ITimelineEvent {
  id: number;
  title: string;
  subtitle: string;
  icon: any;
  done: boolean;
  active: boolean;
}

interface TimelineProps {
  events: ITimelineEvent[];
}

const Timeline = ({ events }: TimelineProps) => {
  

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="flex justify-between items-start relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200" />
        
        {events.map((event, index) => (
          <div key={event.id} className="relative flex flex-col items-center flex-1">
            {/* Icon Circle */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center z-10 border-2 
                ${event.done ? 'bg-black text-white border-black' :
                  event.active ? 'bg-white text-black border-black' :
                  'bg-white text-gray-400 border-gray-200'}`}
            >
              <img src={event.icon} alt="icon" className="w-6 h-6" />
            </div>
            
            {/* Text Content */}
            <div className="mt-2 text-center">
              <h3 className={`font-medium ${event.active || event.done ? 'text-black' : 'text-gray-400'}`}>
                {event.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {event.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;