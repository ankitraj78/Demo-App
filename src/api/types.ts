// Matches Fineract API response DTOs from mifos-mobile

// --- Auth Types ---

export type Role = {
  id: number;
  name: string;
  description: string;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
  userId: number;
  authenticated: boolean;
  username?: string;
  officeId: number;
  officeName?: string;
  roles: Role[];
  base64EncodedAuthenticationKey?: string;
  permissions: string[];
  shouldRenewPassword: boolean;
  isTwoFactorAuthenticationRequired: boolean;
  clients: number[];
};

// --- Loan Types ---

export type LoanStatus = {
  id?: number;
  code?: string;
  value?: string;
  pendingApproval?: boolean;
  waitingForDisbursal?: boolean;
  active?: boolean;
  closedObligationsMet?: boolean;
  closedWrittenOff?: boolean;
  closedRescheduled?: boolean;
  closed?: boolean;
  overpaid?: boolean;
};

export type Currency = {
  code?: string;
  name?: string;
  decimalPlaces?: number;
  inMultiplesOf?: number;
  displaySymbol?: string;
  nameCode?: string;
  displayLabel?: string;
};

export type LoanType = {
  id?: number;
  code?: string;
  value?: string;
};

export type LoanTimeline = {
  submittedOnDate?: number[];
  approvedOnDate?: number[];
  expectedDisbursementDate?: number[];
  actualDisbursementDate?: number[];
  closedOnDate?: number[];
  expectedMaturityDate?: number[];
  withdrawnOnDate?: number[];
};

export type LoanSummary = {
  principalDisbursed?: number;
  principalPaid?: number;
  interestCharged?: number;
  interestPaid?: number;
  feeChargesCharged?: number;
  feeChargesPaid?: number;
  penaltyChargesCharged?: number;
  penaltyChargesPaid?: number;
  totalOutstanding?: number;
  totalRepayment?: number;
};

export type LoanAccount = {
  id: number;
  loanProductId: number;
  externalId?: string;
  numberOfRepayments: number;
  accountNo?: string;
  productName?: string;
  productId?: number;
  loanProductName?: string;
  clientName?: string;
  loanProductDescription?: string;
  principal: number;
  annualInterestRate: number;
  status?: LoanStatus;
  loanType?: LoanType;
  loanCycle?: number;
  loanBalance: number;
  amountPaid: number;
  currency?: Currency;
  inArrears?: boolean;
  summary?: LoanSummary;
  loanPurposeName?: string;
  timeline?: LoanTimeline;
};

export type AccountsResponse = {
  loanAccounts: LoanAccount[];
  savingsAccounts?: unknown[];
  shareAccounts?: unknown[];
};

// --- Loan With Associations Types (GET /loans/{loanId}?associations=transactions) ---

export type LoanTransaction = {
  id?: number;
  officeId?: number;
  officeName?: string;
  type?: {
    id?: number;
    code?: string;
    value?: string;
  };
  date?: number[];
  currency?: Currency;
  amount?: number;
  submittedOnDate?: number[];
  reversed?: boolean;
};

export type LoanWithAssociations = {
  id?: number;
  accountNo?: string;
  clientName?: string;
  loanProductName?: string;
  status?: LoanStatus;
  currency?: Currency;
  principal?: number;
  numberOfRepayments?: number;
  summary?: LoanSummary;
  timeline?: LoanTimeline;
  transactions?: LoanTransaction[];
  inArrears?: boolean;
  loanPurposeName?: string;
};

// --- Third Party Transfer Types (GET/POST /accounttransfers?type=tpt) ---

export type AccountType = {
  id?: number;
  code?: string;
  value?: string;
};

export type AccountOption = {
  accountId?: number;
  accountNo?: string;
  accountType?: AccountType;
  clientId?: number;
  clientName?: string;
  officeId?: number;
  officeName?: string;
};

export type AccountOptionsTemplate = {
  fromAccountOptions: AccountOption[];
  toAccountOptions: AccountOption[];
};

export type TransferPayload = {
  fromOfficeId?: number;
  fromClientId?: number;
  fromAccountType?: number;
  fromAccountId?: string;
  toOfficeId?: number;
  toClientId?: number;
  toAccountType?: number;
  toAccountId?: string;
  transferDate?: string;
  transferAmount?: number;
  transferDescription?: string;
  dateFormat?: string;
  locale?: string;
};
