export interface EmergencyLoan {
  id: string;
  user_id: string;
  group_id: string;
  loan_amount: string;
  pay_by: string;
  active_date: string;
  complete_date: string;
  status: string;
  created_at: string;
  payment_list: any[];
  payment_list_status: boolean;
}
