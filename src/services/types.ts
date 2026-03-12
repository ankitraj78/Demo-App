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
  principalOutstanding?: number;
  interestCharged?: number;
  interestPaid?: number;
  interestOutstanding?: number;
  interestWaived?: number;
  feeChargesCharged?: number;
  feeChargesPaid?: number;
  feeChargesOutstanding?: number;
  feeChargesWaived?: number;
  penaltyChargesCharged?: number;
  penaltyChargesPaid?: number;
  penaltyChargesOutstanding?: number;
  penaltyChargesWaived?: number;
  totalOutstanding?: number;
  totalRepayment?: number;
  totalExpectedRepayment?: number;
  totalRepaymentExpected?: number;
  totalPaidInAdvance?: number;
  totalPaidLate?: number;
};

export type RepaymentPeriod = {
  period?: number;
  dueDate?: number[];
  obligationsMetOnDate?: number[];
  fromDate?: number[];
  complete?: boolean;
  daysInPeriod?: number;
  principalOriginalDue?: number;
  principalDue?: number;
  principalPaid?: number;
  principalOutstanding?: number;
  interestOriginalDue?: number;
  interestDue?: number;
  interestPaid?: number;
  interestOutstanding?: number;
  feeChargesDue?: number;
  feeChargesPaid?: number;
  feeChargesOutstanding?: number;
  penaltyChargesDue?: number;
  penaltyChargesPaid?: number;
  penaltyChargesOutstanding?: number;
  totalDueForPeriod?: number;
  totalPaidForPeriod?: number;
  totalPaidInAdvanceForPeriod?: number;
  totalPaidLateForPeriod?: number;
  totalOutstandingForPeriod?: number;
  totalActualCostOfLoanForPeriod?: number;
};

export type RepaymentSchedule = {
  currency?: Currency;
  loanTermInDays?: number;
  totalPrincipalDisbursed?: number;
  totalPrincipalExpected?: number;
  totalPrincipalPaid?: number;
  totalInterestCharged?: number;
  totalFeeChargesCharged?: number;
  totalPenaltyChargesCharged?: number;
  totalWaived?: number;
  totalWrittenOff?: number;
  totalRepaymentExpected?: number;
  totalRepayment?: number;
  totalPaidInAdvance?: number;
  totalPaidLate?: number;
  totalOutstanding?: number;
  periods?: RepaymentPeriod[];
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
  loanProductDescription?: string;
  status?: LoanStatus;
  currency?: Currency;
  principal?: number;
  approvedPrincipal?: number;
  numberOfRepayments?: number;
  repaymentEvery?: number;
  interestRatePerPeriod?: number;
  annualInterestRate?: number;
  summary?: LoanSummary;
  timeline?: LoanTimeline;
  transactions?: LoanTransaction[];
  repaymentSchedule?: RepaymentSchedule;
  inArrears?: boolean;
  loanPurposeName?: string;
};

// --- Loan Transaction Details (GET /loans/{loanId}/transactions/{transactionId}) ---

export type LoanTransactionDetails = {
  id?: number;
  amount?: number;
  date?: number[];
  manuallyReversed?: boolean;
  principalPortion?: number;
  outstandingLoanBalance?: number;
  interestPortion?: number;
  feeChargesPortion?: number;
  penaltyChargesPortion?: number;
  overpaymentPortion?: number;
  currency?: Currency;
  type?: {
    id?: number;
    code?: string;
    value?: string;
  };
  submittedOnDate?: number[];
};

// --- Savings Account Types ---

export type SavingsAccountStatus = {
  id?: number;
  code?: string;
  value?: string;
  submittedAndPendingApproval?: boolean;
  approved?: boolean;
  rejected?: boolean;
  withdrawnByApplicant?: boolean;
  active?: boolean;
  closed?: boolean;
  prematureClosed?: boolean;
  transferInProgress?: boolean;
  transferOnHold?: boolean;
  matured?: boolean;
};

export type SavingsAccount = {
  id: number;
  accountNo?: string;
  productId?: number;
  productName?: string;
  shortProductName?: string;
  status?: SavingsAccountStatus;
  currency?: Currency;
  accountBalance?: number;
  availableBalance?: number;
  lastActiveTransactionDate?: number[];
};

export type SavingsAccountsResponse = {
  savingsAccounts: SavingsAccount[];
};

export type SavingsTransactionType = {
  id?: number;
  code?: string;
  value?: string;
  deposit?: boolean;
  withdrawal?: boolean;
  interestPosting?: boolean;
  feeDeduction?: boolean;
  dividendPayout?: boolean;
};

export type SavingsTransactionTransfer = {
  id?: number;
  reversed?: boolean;
  currency?: Currency;
  transferAmount?: number;
  transferDate?: number[];
  transferDescription?: string;
};

export type SavingsTransaction = {
  id?: number;
  transactionType?: SavingsTransactionType;
  entryType?: string;
  accountId?: number;
  accountNo?: string;
  date?: number[];
  currency?: Currency;
  amount?: number;
  runningBalance?: number;
  reversed?: boolean;
  transfer?: SavingsTransactionTransfer;
  submittedOnDate?: number[];
  submittedByUsername?: string;
};

export type SavingsAccountSummary = {
  currency?: Currency;
  totalDeposits?: number;
  totalWithdrawals?: number;
  totalInterestEarned?: number;
  totalInterestPosted?: number;
  accountBalance?: number;
  availableBalance?: number;
};

export type SavingsAccountWithTransactions = {
  id?: number;
  accountNo?: string;
  clientId?: number;
  clientName?: string;
  savingsProductId?: number;
  savingsProductName?: string;
  status?: SavingsAccountStatus;
  currency?: Currency;
  summary?: SavingsAccountSummary;
  transactions?: SavingsTransaction[];
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

// --- Beneficiary Types (GET /beneficiaries/tpt) ---

export type Beneficiary = {
  id: number;
  name: string;
  officeName?: string;
  clientName?: string;
  accountType?: AccountType;
  accountNumber?: string;
  transferLimit?: number;
};

export type BeneficiaryTemplate = {
  accountTypeOptions: AccountType[];
};

export type CreateBeneficiaryPayload = {
  locale: string;
  name: string;
  accountNumber: string;
  accountType: number;
  transferLimit: number;
  officeName: string;
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
