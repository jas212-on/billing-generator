import { X, Download, User, Mail, Phone, CheckCircle } from 'lucide-react';
import axiosInstance from '../lib/axios';

// Bill Details Modal Component
const BillDetailsModal = ({ isOpen, onClose, bill }) => {
  if (!isOpen || !bill) return null;

  const subTotal = bill.items_detail.reduce(
      (sum, p) => sum + p.quantity * p.rate,
      0
    );
    const labourTotal = bill.labourCharges.reduce(
      (sum, l) => sum + parseFloat(l.cost),
      0
    );

    const handlePay = async(billId) => {
      try {
        console.log(billId)
        const response = await axiosInstance.put(`/bills/update-bill/${billId}`);
        alert("Bill paid successfully");
        onClose();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>

      {/* Modal box */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Bill Details</h2>
            <p className="text-sm text-gray-500 mt-1">{bill._id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <span className={`
              inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg
              ${bill.status === 'paid' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
              }
            `}>
              {bill.status === 'paid' && <CheckCircle className="w-4 h-4" />}
              {bill.status === 'paid' ? 'Payment Completed' : 'Payment Pending'}
            </span>
            <span className="text-sm text-gray-500">
              {new Date(bill.date).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })}
            </span>
          </div>

          {/* Customer Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
              Customer Information
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900">{bill.customerName}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{bill.email || 'customer@example.com'}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{bill.phone || '+91 98765 43210'}</span>
              </div>
            </div>
          </div>

          {/* Items Purchased */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
              Items Purchased
            </h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Item</th>
                    <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Qty</th>
                    <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Price</th>
                    <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {bill.items_detail?.map((item, index) => (
                    <tr key={index}>
                      <td className="py-3 px-4 text-sm text-gray-900">{item.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-600 text-center">{item.quantity}</td>
                      <td className="py-3 px-4 text-sm text-gray-600 text-right">₹{item.rate.toFixed(2)}</td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-900 text-right">
                        ₹{(item.quantity * item.rate).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Labour Charges */}
          {bill.labourCharges && bill.labourCharges.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                Labour Charges
              </h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Service</th>
                      <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {bill.labourCharges.map((labour, index) => (
                      <tr key={index}>
                        <td className="py-3 px-4 text-sm text-gray-900">{labour.name}</td>
                        <td className="py-3 px-4 text-sm font-medium text-gray-900 text-right">
                          ₹{labour.cost.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Total Section */}
          <div className="border-t-2 border-gray-300 pt-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">₹{subTotal.toFixed(2)}</span>
              </div>
              {bill.labourCharges && bill.labourCharges.length > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Labour Charges</span>
                  <span className="text-gray-900">
                    ₹{labourTotal.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                <span className="text-gray-900">Total Amount</span>
                <span className="text-blue-600">₹{bill.amount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Close
          </button>
          {bill.status === 'unpaid' && (
            <button
            onClick={()=>handlePay(bill._id)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Pay Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillDetailsModal;
