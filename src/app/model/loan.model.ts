export interface Loan  {
  id: string;
  user_id: string;
  group_id: string;
  loan_amount: string;
  tenure: string;
  start_date: string;
  end_date: string;
  contact_number: string;
  loan_type: string;
  interest_rate: string;
  loan_emi: string;
  total_payment: number;
  interest_payable: string;
  gurarantor: string;
  status: string;
  created_at: string;
  payment_list: any[];
  payment_list_status: boolean;
  paid_amount: number;
}
