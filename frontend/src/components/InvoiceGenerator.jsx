import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Printer } from "lucide-react";

export const downloadInvoice = (bill) => {
  const doc = new jsPDF();
  
  // Color scheme
  const primaryColor = [41, 128, 185]; // Professional blue
  const darkGray = [44, 62, 80];
  const lightGray = [236, 240, 241];
  const accentColor = [52, 152, 219];
  
  // Header with colored background
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 35, 'F');
  
  // Company name in header
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont(undefined, 'bold');
  doc.text("INVOICE", 14, 15);
  
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text(`Invoice #: INV-${Date.now().toString().slice(-6)}`, 14, 23);
  doc.text(`Date: ${bill.date}`, 14, 29);
  
  // Reset text color
  doc.setTextColor(...darkGray);
  
  // Company information box
  doc.setFillColor(...lightGray);
  doc.roundedRect(14, 42, 85, 28, 2, 2, 'F');
  
  doc.setFontSize(11);
  doc.setFont(undefined, 'bold');
  doc.text("FROM:", 18, 49);
  
  doc.setFont(undefined, 'normal');
  doc.setFontSize(9);
  doc.text("My Company Pvt Ltd", 18, 55);
  doc.text("mycompany@email.com", 18, 60);
  doc.text("+91 123 456 789", 18, 65);
  
  // Customer information box
  doc.setFillColor(...lightGray);
  doc.roundedRect(111, 42, 85, 28, 2, 2, 'F');
  
  doc.setFontSize(11);
  doc.setFont(undefined, 'bold');
  doc.text("BILL TO:", 115, 49);
  
  doc.setFont(undefined, 'normal');
  doc.setFontSize(9);
  doc.text(bill.customerName, 115, 55);
  doc.text(bill.email, 115, 60);
  doc.text(bill.phone, 115, 65);
  
  // Items table
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(...primaryColor);
  doc.text("ITEMS", 14, 82);
  doc.setTextColor(...darkGray);
  
  autoTable(doc, {
    startY: 86,
    head: [["Item Description", "Qty", "Unit Price", "Amount"]],
    body: bill.items_detail.map((item) => [
      item.name,
      item.quantity,
      `Rs. ${item.rate.toFixed(2)}`,
      `Rs. ${(item.quantity * item.rate).toFixed(2)}`
    ]),
    theme: 'striped',
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: 'bold',
      halign: 'left'
    },
    bodyStyles: {
      fontSize: 9,
      textColor: darkGray
    },
    columnStyles: {
      0: { cellWidth: 90 },
      1: { halign: 'left', cellWidth: 20 },
      2: { halign: 'left', cellWidth: 35 },
      3: { halign: 'left', cellWidth: 35 }
    },
    alternateRowStyles: {
      fillColor: [249, 249, 249]
    }
  });

  //Total
  const totalY = doc.lastAutoTable.finalY;
  const totalStartX = 18;
  
  doc.setFontSize(14);
  doc.setFont(undefined, 'normal');
  
  doc.text("Total:", totalStartX, totalY + 15);
  doc.text(`Rs. ${bill.amount.toFixed(2)}`, totalStartX+15, totalY + 15);
  
  const paymentY = totalY + 20;
  const paymentStartX = 18;
  
  // payment box background
  doc.setFillColor(...lightGray);
  doc.roundedRect(paymentStartX - 5, paymentY + 8, 66, bill.paymentMode==="cash" ? 28: 20, 2, 2, 'F');
  
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  
  
  doc.text("Payment Mode:", paymentStartX, paymentY + 15);
  doc.text(`${bill.paymentMode.toUpperCase()}`, paymentStartX+28, paymentY + 15,);
  
  doc.text("Amount Paid:", paymentStartX, paymentY + 22);
  doc.text(`Rs. ${bill.paidAmount.toFixed(2)}`, paymentStartX+25, paymentY + 22,);

  if(bill.paymentMode==="cash"){
    doc.text("Balance:", paymentStartX, paymentY + 29);
    doc.text(`Rs. ${bill.balance.toFixed(2)}`, paymentStartX+25, paymentY + 29,);
  }

  
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  
  // Footer
  doc.setTextColor(...darkGray);
  doc.setFontSize(8);
  doc.setFont(undefined, 'italic');
  const pageHeight = doc.internal.pageSize.height;
  doc.text("Thank you for your business!", 105, pageHeight - 15, { align: 'center' });

  
  // Download
  doc.save(`invoice-${bill.customerName.replace(/\s+/g, '-')}-${Date.now()}.pdf`);
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
