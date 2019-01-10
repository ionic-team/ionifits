export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  contact: {
    email: string;
    phone: string;
    cell: string;
  };
  office: string;
  birthDate: string;
  title: string;
  department: string;
  images: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}
