export interface CreateDashboardRequest {
  name: string;
  description?: string;
  share?: boolean;
}

export interface DashboardResponse {
  id: number;
  message?: string;
}