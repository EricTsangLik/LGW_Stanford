import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Course } from '../types';
import { regularCourses, divingCourses } from '../data/courses';
import { CourseCard } from '../components/CourseCard';
import { ArrowLeft, Calendar, CheckCircle, Image as ImageIcon, Clock, Info } from 'lucide-react';
import { format } from 'date-fns';
import { zhHK } from 'date-fns/locale';

const TIME_SLOTS = [
  '09:30-12:30',
  '14:00-17:00',
  '18:00-21:00'
];

export const CoursePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [relatedCourses, setRelatedCourses] = useState<Course[]>([]);
  
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const foundCourse = [...regularCourses, ...divingCourses].find(c => c.id === id);
    if (foundCourse) {
      setCourse(foundCourse);
      
      // Find related courses in same region (excluding current one)
      if (foundCourse.region) {
        const related = regularCourses.filter(
          c => c.region === foundCourse.region && c.id !== foundCourse.id
        );
        // Take up to 3 related courses
        setRelatedCourses(related.slice(0, 3));
      } else {
        setRelatedCourses([]);
      }
      
      // Generate 12 random unique dates in Dec 2025
      const dates: Date[] = [];
      const usedDays = new Set<number>();
      
      while (dates.length < 12) {
        const day = Math.floor(Math.random() * 31) + 1;
        if (!usedDays.has(day)) {
            usedDays.add(day);
            dates.push(new Date(2025, 11, day));
        }
      }
      dates.sort((a, b) => a.getTime() - b.getTime());
      setAvailableDates(dates);
      
      // Reset selection when course changes
      setSelectedDate('');
      setSelectedTime('');
      setConfirmed(false);
    }
  }, [id]);

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      setConfirmed(true);
    }
  };

  if (!course) {
    return <div className="p-8 text-center">載入中...</div>;
  }

  return (
    <div className="course-detail-page">
      <div className="detail-header">
        {course.image ? (
          <img src={course.image} alt={course.name} className="detail-image" />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <ImageIcon size={64} className="text-gray-400" />
          </div>
        )}
      </div>

      <div className="detail-content">
        <button onClick={() => navigate('/')} className="back-btn">
          <ArrowLeft size={20} className="mr-2" />
          返回課程列表
        </button>

        <h1 className="detail-title">{course.name}</h1>
        {course.address && <p className="text-gray-600 text-lg mb-8">{course.address}</p>}
        
        {/* Schedule Information List */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Info className="mr-2 text-blue-600" size={20} />
                課程時間表 (2025年12月)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h4 className="font-medium text-gray-600 mb-3 flex items-center">
                        <Calendar size={16} className="mr-2" />
                        可預約日期
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {availableDates.map((date) => (
                            <span key={date.toISOString()} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                {format(date, 'M月d日', { locale: zhHK })}
                            </span>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="font-medium text-gray-600 mb-3 flex items-center">
                        <Clock size={16} className="mr-2" />
                        時段選擇
                    </h4>
                    <div className="space-y-2">
                        {TIME_SLOTS.map((slot) => (
                            <div key={slot} className="flex items-center text-gray-700">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                {slot}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        <div className="booking-section border-t pt-8">
          <h2 className="booking-title text-xl">
            預約課程
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Date Selection */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    選擇日期
                </label>
                <div className="relative">
                    <select
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        disabled={confirmed}
                        className="block w-full px-4 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border bg-white shadow-sm cursor-pointer"
                    >
                        <option value="">請選擇日期</option>
                        {availableDates.map((date) => (
                            <option key={date.toISOString()} value={date.toISOString()}>
                                {format(date, 'M月d日 (EEEE)', { locale: zhHK })}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Time Selection */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    選擇時段
                </label>
                <div className="relative">
                    <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        disabled={confirmed}
                        className="block w-full px-4 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border bg-white shadow-sm cursor-pointer"
                    >
                        <option value="">請選擇時段</option>
                        {TIME_SLOTS.map((slot) => (
                            <option key={slot} value={slot}>
                                {slot}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
          </div>

          {(selectedDate || selectedTime) && (
              <div className="bg-blue-50 p-4 rounded-lg mb-6 flex items-center text-blue-800 border border-blue-100">
                  <span className="font-medium mr-2">已選時段:</span>
                  {selectedDate && format(new Date(selectedDate), 'M月d日 (EEE)', { locale: zhHK })}
                  {selectedDate && selectedTime && <span className="mx-2">|</span>}
                  {selectedTime}
              </div>
          )}

          <div className="flex justify-end mb-12">
            {confirmed ? (
              <div className="flex items-center text-green-600 bg-green-50 px-6 py-3 rounded-lg border border-green-200">
                <CheckCircle size={24} className="mr-2" />
                <span className="font-bold text-lg">預約已確認！</span>
              </div>
            ) : (
              <button
                disabled={!selectedDate || !selectedTime}
                onClick={handleConfirm}
                className="confirm-btn"
              >
                確認預約
              </button>
            )}
          </div>
        </div>

        {/* Related Courses Section */}
        {relatedCourses.length > 0 && (
            <div className="related-courses-section border-t pt-12">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    同區其他課程
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedCourses.map(course => (
                        <CourseCard 
                            key={course.id} 
                            course={course} 
                            onClick={(c) => {
                                navigate(`/course/${c.id}`);
                                window.scrollTo(0, 0);
                            }} 
                        />
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};
