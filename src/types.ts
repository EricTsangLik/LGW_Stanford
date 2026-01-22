export type Region = 'hk' | 'kln' | 'nt';

export type CourseType = 'regular' | 'diving';

export type CourseCategory = 'waterbabies' | 'child' | 'adult' | 'elderly';

export interface Course {
  id: string;
  name: string;
  address?: string;
  type: CourseType;
  region?: Region;
  category?: CourseCategory;
  image?: string;
}

export interface TimeSlot {
  id: string;
  date: Date;
  time: string;
  available: boolean;
}
