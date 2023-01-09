export interface Ticket {
  ticketID?: number;
  userID?: number;
  assignee?: string;
  status: string;
  subject: string;
  description: string;
  tracker?: string;
  created_at?: string;
  updated_at?: string;
}
