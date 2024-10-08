export interface Order {
  "Order Date": string;
  "PO": string;
  "Customer": string;
  "Vendor": string;
  "Order Acknowledged": string;
  "Supplier Proof Provided": string;
  "Proof Approval Emailed to Supplier": string;
  "Client Payment": number;
  "Vendor Payment": number;
  "Item": string;
  "Scheduled to Ship": string;
  "Expected to Arrive"?: string;
  "Shipping Days from Order Date"?: number;
  "Rep": string;
  "Received OK"?: number;
  "Commission Rate": number;
  "JobNumber": string;
  "In-Hands"?: string;
}

export interface User {
  username: string;
  password: string;
}