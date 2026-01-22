import React, { useState, useEffect } from 'react';
import { Course } from '../types';
import { MapPin, Image as ImageIcon } from 'lucide-react';

const SLIDESHOW_IMAGES = [
  '/single%20course/slides%20show/TA_長沙灣-崇真中學.jpg',
  '/single%20course/slides%20show/WhatsApp%20Image%202025-11-29%20at%2016.03.41.jpeg',
  '/single%20course/slides%20show/WhatsApp%20Image%202025-11-29%20at%2016.03.42%20(1).jpeg',
  '/single%20course/slides%20show/WhatsApp%20Image%202025-11-29%20at%2016.03.42%20(2).jpeg',
  '/single%20course/slides%20show/WhatsApp%20Image%202025-11-29%20at%2016.03.42.jpeg',
  '/single%20course/slides%20show/WhatsApp%20Image%202025-11-30%20at%2009.03.04.jpeg',
  '/single%20course/slides%20show/TA呂灝峰.jpeg'
];

interface CourseCardProps {
  course: Course;
  onClick: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isHovered) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % SLIDESHOW_IMAGES.length);
      }, 1500);
    } else {
      setCurrentImageIndex(0);
    }
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div 
      className="course-card"
      onClick={() => onClick(course)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="course-image-container">
        {isHovered ? (
          <img 
            src={SLIDESHOW_IMAGES[currentImageIndex]} 
            alt={`Slideshow ${currentImageIndex + 1}`} 
            className="course-image" 
          />
        ) : (
          course.image ? (
            <img src={course.image} alt={course.name} className="course-image" />
          ) : (
            <ImageIcon size={48} className="course-placeholder-icon" />
          )
        )}
      </div>
      
      <div className="course-content">
        {course.region && (
          <span className="course-tag">
            {course.region === 'hk' ? '香港' : course.region === 'kln' ? '九龍' : '新界'}
          </span>
        )}
        
        <h3 className="course-title">{course.name}</h3>
        
        {course.address && (
          <div className="course-address">
            <MapPin size={16} className="mr-1 mt-1 flex-shrink-0" />
            <span>{course.address}</span>
          </div>
        )}

        {course.category && (
          <div className="mt-2">
             <span className="course-tag">
              {course.category === 'child' ? '兒童' : 
               course.category === 'adult' ? '成人' : 
               course.category === 'elderly' ? '長者' : course.category}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
