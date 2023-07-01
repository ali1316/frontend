import { Branch } from "./branch";
export interface Employee {
    id: number;
    name: string;
    age: number;
    email: string;
    phone_number: string;
    branch: Branch;
  }