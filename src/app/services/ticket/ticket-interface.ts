export interface Ticket {
  ticketID?: number;
  userID?: number;
  assignee?: string;
  status: string;
  subject: string;
  description: string;
  tracker?: string;
  created_at?: String;
  updated_at?: String;
}
