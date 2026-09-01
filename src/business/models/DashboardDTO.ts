export interface CreateDashboardRequest {
  name: string;
  description?: string;
  share?: boolean;
}

export interface DashboardResponse {
  id: number;
  message?: string;
}

export interface DashboardDetails {
  id: number;
  name: string;
  description: string;
  owner: string;
  widgets?: any[];
}
