import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, FilterRegion } from '../components/Filter';
import { CourseCard } from '../components/CourseCard';
import { regularCourses, divingCourses } from '../data/courses';
import { Search } from 'lucide-react';

export const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<FilterRegion>('all');

  const filteredCourses = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    
    if (query) {
      const isDivingSearch = query.includes('diving') || query.includes('dive') || query.includes('潛水');
      
      if (isDivingSearch) {
        return divingCourses;
      }

      const matches = regularCourses.filter(course => 
        course.name.toLowerCase().includes(query) || 
        course.address?.toLowerCase().includes(query)
      );

      const divingMatches = divingCourses.filter(course => 
        course.name.toLowerCase().includes(query)
      );

      return [...matches, ...divingMatches];
    }

    if (selectedRegion === 'all') {
      return regularCourses;
    }

    return regularCourses.filter(course => course.region === selectedRegion);
  }, [searchQuery, selectedRegion]);

  const isShowingDiving = filteredCourses.some(c => c.type === 'diving');

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="relative max-w-md mx-auto md:mx-0">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm"
            placeholder="搜尋課程 (例如：'潛水', '灣仔')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {!searchQuery && !isShowingDiving && (
        <Filter 
          selectedRegion={selectedRegion} 
          onRegionChange={setSelectedRegion} 
        />
      )}

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {searchQuery 
            ? `搜尋結果 (${filteredCourses.length})`
            : isShowingDiving 
              ? '潛水課程' 
              : '現有游泳課程'}
        </h2>
      </div>

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              onClick={(course) => navigate(`/course/${course.id}`)} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          找不到符合條件的課程。
        </div>
      )}
    </main>
  );
};
