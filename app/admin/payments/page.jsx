"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
    CreditCardIcon,
    ArrowTopRightOnSquareIcon
} from "@heroicons/react/24/outline";

const STATUS_COLORS = {
    SUCCESS: "bg-green-100 text-green-800",
    FAILED: "bg-red-100 text-red-800",
    CANCELLED: "bg-gray-100 text-gray-800",
    INITIATED: "bg-yellow-100 text-yellow-800",
};

export default function PaymentsPage() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const res = await fetch("/api/admin/payments");
                if (res.ok) {
                    const data = await res.json();
                    setPayments(data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPayments();
    }, []);

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Payments</h1>
                <p className="mt-2 text-gray-500">View transaction history and logs.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-primary"></div>
                        <p className="mt-2 text-gray-500">Loading payments...</p>
                    </div>
                ) : payments.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        No transactions found.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full whitespace-nowrap text-left text-sm">
                            <thead className="bg-gray-50/50 text-gray-500">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Transaction ID</th>
                                    <th className="px-6 py-4 font-medium">Booking</th>
                                    <th className="px-6 py-4 font-medium">Amount</th>
                                    <th className="px-6 py-4 font-medium">Status</th>
                                    <th className="px-6 py-4 font-medium">Method</th>
                                    <th className="px-6 py-4 font-medium">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {payments.map((payment) => (
                                    <tr key={payment._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs text-primary font-medium">
                                            <Link href={`/admin/payments/${payment._id}`} className="hover:underline">
                                                {payment.transactionId || payment.merchantOrderId}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            {payment.bookingId ? (
                                                <Link href={`/admin/bookings/${payment.bookingId._id}`} className="text-primary hover:underline flex items-center gap-1">
                                                    #{payment.bookingId.bookingCode}
                                                    <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                                                </Link>
                                            ) : (
                                                <span className="text-gray-400">Unknown</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            ₹{payment.amount}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
                                                ${STATUS_COLORS[payment.status] || 'bg-gray-100 text-gray-800'}`}>
                                                {payment.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {payment.provider}
                                        </td>
                                        <td className="px-6 py-4 text-gray-400 text-xs">
                                            {payment.createdAt && format(new Date(payment.createdAt), "MMM d, HH:mm")}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
