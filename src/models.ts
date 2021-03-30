export interface Resume {
  id?: string;
  objectType: string; //"pdf" | "image";
  cvUrl: string;
  owner: string;
  time: number; // Date Valueof
}

export interface Comments {
  id?: string;
  content: string;
  from: string; // id
  point: number;
  time: number; // Date Valueof
}
