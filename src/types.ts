export type Region = 'hk' | 'kln' | 'nt';

export type CourseType = 'regular' | 'diving';

export type DivingCategory = 'child' | 'adult' | 'elderly';

export interface Course {
  id: string;
  name: string;
  address?: string;
  type: CourseType;
  region?: Region;
  category?: DivingCategory;
  image?: string;
}

export interface TimeSlot {
  id: string;
  date: Date;
  time: string;
  available: boolean;
}

