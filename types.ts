
export enum UserRole {
  Parent = 'parent',
  Child = 'child',
}

export enum TaskStatus {
  Assigned = 'assigned',
  PendingApproval = 'pending_approval',
  Completed = 'completed',
}

export interface Task {
  id: string;
  name: string;
  stars: number;
  status: TaskStatus;
}

export interface Reward {
  id: string;
  name: string;
  cost: number;
}
