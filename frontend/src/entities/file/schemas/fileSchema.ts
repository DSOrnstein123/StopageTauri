export interface File {
  id: string;
  name: string;
  icon: IconData;
  type: string;
  contentId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IconData {
  type: string;
  value: string;
}
