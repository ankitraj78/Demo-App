type PdfInstallment = {
  number: number;
  date: string;
  paidDate?: string;
  principal: string;
  interest: string;
  fees: string;
  total: string;
  status: 'paid' | 'upcoming' | 'future';
};

type PdfData = {
  accountNumber: string;
  status: string;
  disbursementDate: string;
  principalPaid: string;
  totalOutstanding: string;
  paidCount: number;
  totalCount: number;
  installments: PdfInstallment[];
};

export function generateRepaymentScheduleHtml(data: PdfData): string {
  const {
    accountNumber,
    status,
    disbursementDate,
    principalPaid,
    totalOutstanding,
    paidCount,
    totalCount,
    installments,
  } = data;

  const progressPercent =
    totalCount > 0 ? Math.round((paidCount / totalCount) * 100) : 0;

  const rows = installments
    .map(item => {
      const statusLabel =
        item.status === 'paid'
          ? 'Paid'
          : item.status === 'upcoming'
            ? 'Upcoming'
            : 'Future';
      const statusClass = item.status;
      return `
      <tr class="${statusClass}">
        <td>${item.number}</td>
        <td>${item.date}</td>
        <td>${item.paidDate ?? '-'}</td>
        <td>${item.principal}</td>
        <td>${item.interest}</td>
        <td>${item.fees}</td>
        <td class="total-col">${item.total}</td>
        <td><span class="status-badge ${statusClass}">${statusLabel}</span></td>
      </tr>`;
    })
    .join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, 'Helvetica Neue', Arial, sans-serif;
      color: #0f172a;
      padding: 32px;
      font-size: 12px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 2px solid #00478a;
    }
    .header h1 {
      font-size: 20px;
      color: #00478a;
    }
    .header .date {
      color: #475569;
      font-size: 11px;
    }
    .summary {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
    }
    .summary-item {
      flex: 1;
      background: #f5f7f8;
      border-radius: 8px;
      padding: 12px 16px;
      border-left: 3px solid #00478a;
    }
    .summary-item .label {
      font-size: 10px;
      color: #475569;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .summary-item .value {
      font-size: 14px;
      font-weight: 600;
      color: #0f172a;
    }
    .progress-section {
      margin-bottom: 24px;
    }
    .progress-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 6px;
      font-size: 11px;
      color: #475569;
    }
    .progress-bar {
      height: 8px;
      background: #e2e8f0;
      border-radius: 4px;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      background: #00478a;
      border-radius: 4px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 16px;
    }
    th {
      background: #00478a;
      color: #fff;
      padding: 8px 10px;
      text-align: left;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    td {
      padding: 7px 10px;
      border-bottom: 1px solid #e2e8f0;
      font-size: 11px;
    }
    tr.upcoming {
      background: rgba(0, 71, 138, 0.06);
    }
    .total-col {
      font-weight: 600;
    }
    .status-badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 10px;
      font-size: 9px;
      font-weight: 600;
      text-transform: uppercase;
    }
    .status-badge.paid {
      background: #dcfce7;
      color: #16a34a;
    }
    .status-badge.upcoming {
      background: rgba(0, 71, 138, 0.1);
      color: #00478a;
    }
    .status-badge.future {
      background: #f1f5f9;
      color: #94a3b8;
    }
    .footer {
      display: flex;
      justify-content: flex-end;
      padding: 10px 10px;
      background: #f5f7f8;
      border-radius: 0 0 8px 8px;
    }
    .footer .label {
      font-size: 12px;
      color: #475569;
      margin-right: 12px;
    }
    .footer .value {
      font-size: 14px;
      font-weight: 700;
      color: #00478a;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Repayment Schedule</h1>
    <div class="date">Generated on ${new Date().toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric'})}</div>
  </div>

  <div class="summary">
    <div class="summary-item">
      <div class="label">Account Number</div>
      <div class="value">${accountNumber}</div>
    </div>
    <div class="summary-item">
      <div class="label">Status</div>
      <div class="value">${status}</div>
    </div>
    <div class="summary-item">
      <div class="label">Disbursement Date</div>
      <div class="value">${disbursementDate}</div>
    </div>
    <div class="summary-item">
      <div class="label">Principal Paid-off</div>
      <div class="value">${principalPaid}</div>
    </div>
  </div>

  <div class="progress-section">
    <div class="progress-header">
      <span>Repayment Progress</span>
      <span>${paidCount} of ${totalCount} Installments (${progressPercent}%)</span>
    </div>
    <div class="progress-bar">
      <div class="progress-fill" style="width: ${progressPercent}%"></div>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Due Date</th>
        <th>Paid Date</th>
        <th>Principal</th>
        <th>Interest</th>
        <th>Fees</th>
        <th>Total</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>

  <div class="footer">
    <span class="label">Total Outstanding:</span>
    <span class="value">${totalOutstanding}</span>
  </div>
</body>
</html>`;
}
