/**
 * Interface for the 'Days' data
 */
export interface DaysEntity {
  id: string | null; // Primary ID
  date: Date;
  description: string;
  isHeap?: boolean;
}
