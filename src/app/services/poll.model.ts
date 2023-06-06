export interface Poll {
  id: string;
  creationDateTime: string;
  gender: 'male' | 'female';
  name: string;
  weight: number;
  date: string;
  length: number;
  participant: string;
  backgroundImage: string;
}
export interface PollPostDto {
  gender: 'male' | 'female';
  name: string;
  weight: number;
  date: string;
  length: number;
  participant: string;
  backgroundImage?: string;
}
