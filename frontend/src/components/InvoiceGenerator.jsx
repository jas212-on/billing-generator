import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Printer } from "lucide-react";

export const downloadInvoice = (bill) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: [80, 200], // 80mm receipt
  });

  let y = 8;

  // ===== COMPANY HEADER =====
  doc.setFontSize(12);
  doc.setFont(undefined, "bold");
  doc.text("MY COMPANY PVT LTD", 40, y, { align: "center" });

  y += 4;
  doc.setFontSize(8);
  doc.setFont(undefined, "normal");
  doc.text("123, Street ABC", 40, y, { align: "center" });

  y += 4;
  doc.text("Tel: +91 98765 43210", 40, y, { align: "center" });

  y += 5;
  doc.text("********************************", 40, y, { align: "center" });

  // ===== CUSTOMER INFO =====
  y += 5;
  doc.text(`Customer: ${bill.customerName}`, 5, y);
  doc.text(bill.date, 75, y, { align: "right" });

  y += 4;
  doc.text(`Phone: +91 ${bill.phone}`, 5, y);

  y += 5;
  doc.text("----------------------------------------", 40, y, { align: "center" });

  // ===== ITEMS TABLE =====
  y += 2;

  autoTable(doc, {
    startY: y,
    margin: { left: 5, right: 5 },
    theme: "plain",
    head: [["ITEM", "QTY","PRICE","AMT"]],
    body: bill.items_detail.map((item) => [
      item.name,
      item.quantity,
      `Rs. ${item.rate.toFixed(2)}`,
      `Rs. ${(item.quantity * item.rate).toFixed(2)}`,
    ]),
    styles: {
      fontSize: 8,
      cellPadding: 1,
      lineWidth: 0.1,
      lineColor: [0, 0, 0],
    },
    headStyles: {
      fontStyle: "bold",
      halign: "center",
    },
    columnStyles: {
      0: { cellWidth: 25, halign: "center" },
      1: { cellWidth: 10, halign: "center" },
      2: { cellWidth: 18, halign: "center" },
      3: { cellWidth: 18, halign: "center" },
    },
  });

  y = doc.lastAutoTable.finalY + 7;

  // ===== TOTAL SECTION =====
  doc.setFont(undefined, "bold");
  doc.text("TOTAL AMOUNT", 5, y);
  doc.text(`Rs. ${bill.amount.toFixed(2)}`, 75, y, { align: "right" });

  y += 5;
  doc.setFont(undefined, "normal");
  doc.text("Amount Paid", 5, y);
  doc.text(`Rs. ${bill.paidAmount.toFixed(2)}`, 75, y, { align: "right" });

  if (bill.balance > 0) {
    y += 5;
    doc.text("Balance", 5, y);
    doc.text(`Rs. ${bill.balance.toFixed(2)}`, 75, y, { align: "right" });
  }

  // ===== PAYMENT INFO =====
  y += 7;
  doc.setFontSize(8);
  doc.text(`Payment Mode: ${bill.paymentMode.toUpperCase()}`, 5, y);

  y+=4
  doc.text(`Billed by: ${bill.billedBy}`, 5, y);

  y += 8;
  doc.text("********************************", 40, y, { align: "center" });

  // ===== FOOTER =====
  y += 3;
  doc.setFont(undefined, "bold");
  doc.text("THANK YOU!", 40, y, { align: "center" });

  // ===== SAVE =====
  doc.save(`receipt-${Date.now()}.pdf`);
};



export default function InvoiceButton({bill}) {
  return (
    <button
      onClick={()=>downloadInvoice(bill)}
      className="px-6 py-2 w-full justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
    >
      <Printer className="w-4 h-4" />
      Print invoice
    </button>
  );
}
