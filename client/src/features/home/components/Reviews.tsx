import React from 'react';
import { Star } from 'lucide-react';

interface Review {
  id: string;
  authorName: string;
  rating: number;
  comment: string;
  initials: string;
}

interface ReviewListProps {
  reviews: Review[];
  initialDisplayCount?: number;
}

const ReviewList: React.FC<ReviewListProps> = ({ 
  reviews, 
  initialDisplayCount = 6  // Increased default to show 3 rows in 2 columns
}) => {
  const [showAll, setShowAll] = React.useState(false);

  const displayedReviews = showAll 
    ? reviews 
    : reviews.slice(0, initialDisplayCount);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedReviews.map((review) => (
          <div 
            key={review.id} 
            className="flex items-start space-x-3 bg-white rounded-lg p-4 shadow-sm"
          >
            {/* Avatar with initials */}
            <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">
                {review.initials}
              </span>
            </div>

            {/* Review content */}
            <div className="flex-1 min-w-0"> {/* Added min-w-0 to prevent overflow */}
              <div className="flex items-center space-x-2">
                <h3 className="font-medium text-gray-900 truncate">
                  {review.authorName}
                </h3>
                <div className="flex flex-shrink-0">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      className={`${
                        index < review.rating 
                          ? 'text-yellow-400 fill-yellow-400' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-600 break-words">
                {review.comment}
              </p>
            </div>
          </div>
        ))}
      </div>

      {reviews.length > initialDisplayCount && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-6 w-full text-center text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          {showAll ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
};

// Example usage with more sample data:
const sampleReviews: Review[] = [
  {
    id: '1',
    authorName: 'Abdallah Ahmed',
    rating: 5,
    comment: 'Experience was so fun, totally recommend',
    initials: 'AA'
  },
  {
    id: '2',
    authorName: 'Abdallah Ahmed',
    rating: 5,
    comment: 'Experience was so fun, totally recommend',
    initials: 'AA'
  },
  {
    id: '3',
    authorName: 'Abdallah Ahmed',
    rating: 5,
    comment: 'Experience was so fun, totally recommend',
    initials: 'AA'
  },
  {
    id: '4',
    authorName: 'Abdallah Ahmed',
    rating: 5,
    comment: 'Experience was so fun, totally recommend',
    initials: 'AA'
  },
  {
    id: '5',
    authorName: 'Abdallah Ahmed',
    rating: 5,
    comment: 'Experience was so fun, totally recommend',
    initials: 'AA'
  },
  {
    id: '6',
    authorName: 'Abdallah Ahmed',
    rating: 5,
    comment: 'Experience was so fun, totally recommend',
    initials: 'AA'
  },
  {
    id: '7',
    authorName: 'Abdallah Ahmed',
    rating: 5,
    comment: 'Experience was so fun, totally recommend',
    initials: 'AA'
  },
  {
    id: '8',
    authorName: 'Abdallah Ahmed',
    rating: 5,
    comment: 'Experience was so fun, totally recommend',
    initials: 'AA'
  }
];

export default function Reviews() {
  return <ReviewList reviews={sampleReviews} />;
}