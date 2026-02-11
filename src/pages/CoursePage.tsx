import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Course } from '../types';
import { regularCourses, divingCourses } from '../data/courses';
import { CourseCard } from '../components/CourseCard';
import { ArrowLeft, CheckCircle, Info, ChevronLeft, ChevronRight, Tag, X, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { zhHK } from 'date-fns/locale';

const TIME_SLOTS = [
  '09:30-10:30',
  '10:30-11:30',
  '11:30-12:30',
  '12:30-13:30',
  '13:30-14:30',
  '14:30-15:30',
  '15:30-16:30',
  '16:30-17:30'
];

const SLIDESHOW_IMAGES = [
  '/single%20course/slides%20show/video.mov',
  '/single%20course/slides%20show/TA_長沙灣-崇真中學.jpg',
  '/single%20course/slides%20show/TA呂灝峰.jpeg',
  '/single%20course/slides%20show/WhatsApp%20Image%202025-11-29%20at%2016.03.41.jpeg',
  '/single%20course/slides%20show/WhatsApp%20Image%202025-11-29%20at%2016.03.42%20(1).jpeg',
  '/single%20course/slides%20show/WhatsApp%20Image%202025-11-29%20at%2016.03.42%20(2).jpeg',
  '/single%20course/slides%20show/WhatsApp%20Image%202025-11-29%20at%2016.03.42.jpeg',
  '/single%20course/slides%20show/WhatsApp%20Image%202025-11-30%20at%2009.03.04.jpeg'
];

const VERTICAL_INFO_IMAGES = [
  'info1.jpeg', 'info2.jpeg', 'info3.jpeg', 'info4.jpeg',
  'info5.jpeg', 'info6.jpeg', 'info7.jpeg', 'info8.jpeg',
  'info9.jpeg', 'info10.jpeg', 'info11.jpeg'
].map(filename => `/single%20course/vertical%20info/${filename}`);

export const CoursePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [relatedCourses, setRelatedCourses] = useState<Course[]>([]);
  
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [confirmed, setConfirmed] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(true);

  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const originalPrice = 398;
  const finalPrice = discountApplied ? Math.round(originalPrice * 0.8) : originalPrice;

  const handleApplyDiscount = () => {
    if (discountCode.trim() === '2026mkt') {
      setDiscountApplied(true);
    } else {
      alert('無效的優惠碼');
      setDiscountApplied(false);
    }
  };

  const handleClearDiscount = () => {
    setDiscountCode('');
    setDiscountApplied(false);
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    const isVideo = SLIDESHOW_IMAGES[currentSlideIndex].endsWith('.mov');
    
    if (!isPaused && !isVideo) {
      interval = setInterval(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % SLIDESHOW_IMAGES.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPaused, currentSlideIndex]);

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
      
      // Generate dates in Feb 2026 based on category
      const dates: Date[] = [];
      const year = 2026;
      const month = 1; // February
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dayOfWeek = date.getDay(); // 0 is Sunday, 5 is Friday, 6 is Saturday

        if (foundCourse.category === 'adult') {
           // Adult: All dates
           dates.push(date);
        } else if (foundCourse.category === 'waterbabies' || foundCourse.category === 'child') {
           // Waterbabies & Child: Fri/Sat/Sun only
           if (dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6) {
             dates.push(date);
           }
        } else {
           // Default fallback (e.g. elderly or others): All dates
           dates.push(date);
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
      setShowLoginModal(true);
    }
  };

  if (!course) {
    return <div className="p-8 text-center">載入中...</div>;
  }

  return (
    <div className="course-detail-page !max-w-7xl">
      {/* Video Modal (Floating Bottom-Right) */}
      {showVideoModal && (
        <div className="fixed bottom-4 right-4 z-[60] w-80 sm:w-96 shadow-2xl rounded-xl overflow-hidden border border-gray-200 bg-white" onClick={e => e.stopPropagation()}>
          <div className="relative w-full aspect-video bg-black group">
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-2 right-2 text-white bg-black/50 hover:bg-black/70 rounded-full p-1.5 z-10 transition-colors opacity-0 group-hover:opacity-100 duration-200"
            >
              <X size={16} />
            </button>
            <video
              src="/single%20course/slides%20show/video.mov"
              className="w-full h-full object-cover"
              controls
              autoPlay
              muted
              loop
            />
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full overflow-hidden transform transition-all scale-100 opacity-100">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Info size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">請先登入</h3>
              <p className="text-gray-600 mb-6">
                預約課程需要會員登入，請前往官方網站登入或註冊。
              </p>
              
              <div className="flex flex-col gap-3">
                <a
                  href="https://stanfordswim.com.hk/login"
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold transition-colors flex items-center justify-center"
                >
                  前往登入
                </a>
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="w-full px-4 py-3 text-gray-500 font-medium hover:bg-gray-50 rounded-lg transition-colors"
                >
                  稍後再說
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <button onClick={() => navigate('/')} className="back-btn mb-6 ml-4 mt-4">
        <ArrowLeft size={20} className="mr-2" />
        返回課程列表
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 pb-12">
        {/* Left Column: Slideshow */}
        <div className="detail-header relative group h-[500px] lg:h-[600px] rounded-xl overflow-hidden shadow-lg sticky top-4">
          {SLIDESHOW_IMAGES[currentSlideIndex].endsWith('.mov') ? (
            <video
              src={SLIDESHOW_IMAGES[currentSlideIndex]}
              className="detail-image w-full h-full object-cover"
              controls
              autoPlay
              muted
              loop
            />
          ) : (
            <img 
              src={SLIDESHOW_IMAGES[currentSlideIndex]} 
              alt={`Slide ${currentSlideIndex + 1}`} 
              className="detail-image w-full h-full object-cover" 
            />
          )}
          
          {!SLIDESHOW_IMAGES[currentSlideIndex].endsWith('.mov') && (
            <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300" />
          )}

          <button 
            onClick={() => {
              setCurrentSlideIndex((prev) => (prev - 1 + SLIDESHOW_IMAGES.length) % SLIDESHOW_IMAGES.length);
              setIsPaused(false);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={24} />
          </button>

          <button 
            onClick={() => {
              setCurrentSlideIndex((prev) => (prev + 1) % SLIDESHOW_IMAGES.length);
              setIsPaused(false);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {SLIDESHOW_IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentSlideIndex(idx);
                  setIsPaused(true);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentSlideIndex ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Title, Info, Booking */}
        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{course.name}</h1>
            {course.address && (
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <p className="text-gray-600 text-lg flex items-center">
                  <MapPin size={20} className="mr-2 text-gray-400" />
                  {course.address}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(course.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors w-fit"
                >
                  查看地圖
                </a>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center border-b pb-4">
              <Info className="mr-2 text-blue-600" size={20} />
              選擇開班日期（2026年2月份）
            </h2>
            
            <div className="space-y-6">
              {/* Date Selection */}
              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                      選擇日期
                  </label>
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

              {/* Time Selection */}
              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                      選擇時段
                  </label>
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

            {/* Pricing */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Tag className="mr-2 text-blue-600" size={20} />
                課程費用
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-5">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-gray-500 text-sm">每堂費用:</span>
                  {discountApplied ? (
                    <>
                      <span className="text-gray-400 line-through text-lg">${originalPrice}</span>
                      <span className="text-2xl font-bold text-red-600">${finalPrice}</span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-gray-900">${originalPrice}</span>
                  )}
                </div>
                {discountApplied && (
                  <p className="text-green-600 text-sm mb-4 flex items-center">
                    <CheckCircle size={14} className="mr-1" />
                    已套用優惠 (20% OFF)
                  </p>
                )}

                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      placeholder="輸入優惠碼"
                      disabled={discountApplied || confirmed}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full pr-10"
                    />
                    {discountCode && !confirmed && (
                      <button
                        onClick={handleClearDiscount}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                  <button
                    onClick={handleApplyDiscount}
                    disabled={discountApplied || confirmed || !discountCode}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                      discountApplied
                        ? 'bg-green-100 text-green-700 cursor-default'
                        : 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed'
                    }`}
                  >
                    {discountApplied ? '已套用' : '兌換'}
                  </button>
                </div>
              </div>
            </div>

            {(selectedDate || selectedTime) && (
                <div className="bg-blue-50 p-4 rounded-lg mt-6 flex items-center text-blue-800 border border-blue-100">
                    <span className="font-medium mr-2">已選時段:</span>
                    {selectedDate && format(new Date(selectedDate), 'M月d日 (EEE)', { locale: zhHK })}
                    {selectedDate && selectedTime && <span className="mx-2">|</span>}
                    {selectedTime}
                </div>
            )}

            <div className="mt-8">
              {confirmed ? (
                <div className="flex items-center justify-center text-green-600 bg-green-50 px-6 py-4 rounded-lg border border-green-200">
                  <CheckCircle size={24} className="mr-2" />
                  <span className="font-bold text-lg">課堂已確認！</span>
                </div>
              ) : (
                <button
                  disabled={!selectedDate || !selectedTime}
                  onClick={handleConfirm}
                  className="w-full bg-[#eb8118] hover:bg-[#e0bb97] text-white font-bold py-4 px-6 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-lg shadow-sm"
                >
                  確認已選課堂
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Info Images Section - Below Grid */}
      <div className="vertical-info-section px-6 pb-12 max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-blue-600 pl-4">
          課程資訊
        </h3>
        <div className="grid grid-cols-1 gap-6">
          {VERTICAL_INFO_IMAGES.map((imgSrc, index) => (
            <div key={index} className="w-full rounded-xl overflow-hidden shadow-sm border border-gray-100">
              <img 
                src={imgSrc} 
                alt={`Course Info ${index + 1}`} 
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Related Courses Section - Below Grid */}
      {relatedCourses.length > 0 && (
          <div className="related-courses-section px-6 pb-12 max-w-7xl mx-auto border-t pt-12">
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
  );
};
