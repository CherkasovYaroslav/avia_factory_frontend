export type Employee = {
  id?: number;
  name: string;
  surname: string;
  phone_number: string;
  email: string;
  birth_date: string;
  hire_date: string;
  salary: number;
  role_id: number | null;
  section_id: number | null;
  role_name?: string;
  section_name?: string;
};
