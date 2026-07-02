export interface Manager {
  id: number;
  name: string;
  email: string;
}

export interface Employee {
  id: number;
  fullName: string;
  email?: string;
  phone?: string;
  position?: string;
  isActive: boolean;
  createdAt: string;
}

export interface ShiftType {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  color?: string;
  createdAt: string;
}

export interface Schedule {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  status: 'draft' | 'published';
  createdAt: string;
  assignments?: ShiftAssignment[];
}

export interface ShiftAssignment {
  id: number;
  scheduleId: number;
  employeeId: number;
  shiftTypeId: number;
  date: string;
  employee: Employee;
  shiftType: ShiftType;
}

export interface LoginResponse {
  accessToken: string;
  manager: Manager;
}
