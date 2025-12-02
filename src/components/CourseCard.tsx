import React from 'react';
import { Course } from '../types';
import { MapPin, Image as ImageIcon } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onClick: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  return (
    <div 
      className="course-card"
      onClick={() => onClick(course)}
    >
      <div className="course-image-container">
        {course.image ? (
          <img src={course.image} alt={course.name} className="course-image" />
        ) : (
          <ImageIcon size={48} className="course-placeholder-icon" />
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
