"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import {
    ArrowLeftIcon,
    CreditCardIcon,
    CheckCircleIcon,
    XCircleIcon,
    ExclamationTriangleIcon,
    CodeBracketSquareIcon,
    BanknotesIcon,
    CalendarIcon
} from "@heroicons/react/24/outline";

const STATUS_STYLES = {
    SUCCESS: { bg: "bg-green-100", text: "text-green-800", icon: CheckCircleIcon, iconColor: "text-green-600" },
    FAILED: { bg: "bg-red-100", text: "text-red-800", icon: XCircleIcon, iconColor: "text-red-600" },
    CANCELLED: { bg: "bg-gray-100", text: "text-gray-800", icon: XCircleIcon, iconColor: "text-gray-600" },
    INITIATED: { bg: "bg-yellow-100", text: "text-yellow-800", icon: ExclamationTriangleIcon, iconColor: "text-yellow-600" },
};

export default function PaymentDetailsPage() {
    const params = useParams();
    const [payment, setPayment] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPayment = async () => {
            try {
                const res = await fetch(`/api/admin/payments/${params.id}`);
                if (!res.ok) throw new Error("Payment not found");
                const data = await res.json();
                setPayment(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPayment();
    }, [params.id]);

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-primary"></div>
            </div>
        );
    }

    if (!payment) return <div className="p-8 text-center bg-white rounded-xl shadow-sm">Payment not found</div>;

    const statusStyle = STATUS_STYLES[payment.status] || STATUS_STYLES.INITIATED;
    const StatusIcon = statusStyle.icon;

    // Helper to extract granular details from typical PhonePe/Gateway response
    const getPaymentInstrument = () => {
        if (!payment.gatewayResponse?.paymentDetails?.[0]) return null;
        const details = payment.gatewayResponse.paymentDetails[0];
        const instrument = details.splitInstruments?.[0];
        return {
            mode: details.paymentMode,
            utr: instrument?.rail?.utr || details.utr, // generic fallbacks
            vpa: instrument?.rail?.vpa,
            bank: instrument?.instrument?.bankId,
            account: instrument?.instrument?.maskedAccountNumber,
            holder: instrument?.instrument?.accountHolderName,
            upiScanId: instrument?.rail?.upiTransactionId
        };
    };

    const extraDetails = getPaymentInstrument();

    return (
        <div className="max-w-5xl mx-auto pb-12">
            <div className="mb-6">
                <Link href="/admin/payments" className="mb-2 inline-flex items-center text-sm text-gray-500 hover:text-gray-900">
                    <ArrowLeftIcon className="mr-1 h-4 w-4" />
                    Back to Payments
                </Link>
                <div className="flex items-center justify-between mt-2">
                    <h1 className="text-3xl font-bold text-gray-900">Transaction Details</h1>
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${statusStyle.bg} ${statusStyle.text} gap-2`}>
                        <StatusIcon className={`h-5 w-5 ${statusStyle.iconColor}`} />
                        {payment.status}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Details */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Summary Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                                <BanknotesIcon className="h-5 w-5 text-gray-400" />
                                Payment Summary
                            </h2>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm text-gray-500">Amount Paid</p>
                                <p className="text-2xl font-bold text-gray-900">₹{payment.amount}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Transaction ID (System)</p>
                                <p className="font-mono text-sm font-medium text-gray-700 bg-gray-50 p-2 rounded inline-block">
                                    {payment.transactionId || "N/A"}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Merchant Order ID</p>
                                <p className="font-mono text-sm text-gray-600">{payment.merchantOrderId}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Payment Date</p>
                                <p className="font-medium text-gray-900">
                                    {payment.paidAt ? format(new Date(payment.paidAt), "PPpp") : "N/A"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Gateway Technical Details */}
                    {payment.gatewayResponse && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between">
                                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                                    <CreditCardIcon className="h-5 w-5 text-gray-400" />
                                    Instrument Details
                                </h2>
                                {extraDetails?.mode && <span className="text-xs font-mono bg-blue-50 text-blue-700 px-2 py-1 rounded">{extraDetails.mode}</span>}
                            </div>
                            <div className="p-6 space-y-4">
                                {extraDetails ? (
                                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                                        {extraDetails.bank && (
                                            <div className="sm:col-span-1">
                                                <dt className="text-xs font-medium text-gray-500 uppercase">Bank</dt>
                                                <dd className="mt-1 text-sm text-gray-900 font-semibold">{extraDetails.bank}</dd>
                                            </div>
                                        )}
                                        {extraDetails.vpa && (
                                            <div className="sm:col-span-1">
                                                <dt className="text-xs font-medium text-gray-500 uppercase">UPI VPA</dt>
                                                <dd className="mt-1 text-sm text-gray-900 font-mono">{extraDetails.vpa}</dd>
                                            </div>
                                        )}
                                        {extraDetails.account && (
                                            <div className="sm:col-span-1">
                                                <dt className="text-xs font-medium text-gray-500 uppercase">Account Number</dt>
                                                <dd className="mt-1 text-sm text-gray-900 font-mono">{extraDetails.account}</dd>
                                            </div>
                                        )}
                                        {extraDetails.holder && (
                                            <div className="sm:col-span-1">
                                                <dt className="text-xs font-medium text-gray-500 uppercase">Account Holder</dt>
                                                <dd className="mt-1 text-sm text-gray-900 capitalize">{extraDetails.holder.toLowerCase()}</dd>
                                            </div>
                                        )}
                                        {extraDetails.utr && (
                                            <div className="sm:col-span-2">
                                                <dt className="text-xs font-medium text-gray-500 uppercase">UTR / Ref No.</dt>
                                                <dd className="mt-1 text-sm text-gray-900 font-mono bg-gray-50 p-2 rounded border border-dashed border-gray-300">
                                                    {extraDetails.utr}
                                                </dd>
                                            </div>
                                        )}
                                    </dl>
                                ) : (
                                    <p className="text-sm text-gray-500 italic">No detailed instrument info available in gateway response.</p>
                                )}
                            </div>
                        </div>
                    )}

                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    {/* Booking Link */}
                    {payment.bookingId && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Linked Booking</h3>
                            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                                <div>
                                    <p className="text-lg font-bold text-gray-900">#{payment.bookingId.bookingCode}</p>
                                    <p className="text-sm text-gray-500">{payment.bookingId.guestDetails?.fullName}</p>
                                </div>
                            </div>
                            <Link
                                href={`/admin/bookings/${payment.bookingId._id}`}
                                className="block w-full text-center rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
                            >
                                View Booking Details
                            </Link>
                        </div>
                    )}

                    {/* Raw Data Toggle (Optional, for debugging) */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <details className="group">
                            <summary className="flex cursor-pointer items-center justify-between p-4 bg-gray-50 text-sm font-medium text-gray-900 hover:bg-gray-100">
                                <span className="flex items-center gap-2">
                                    <CodeBracketSquareIcon className="h-5 w-5 text-gray-500" />
                                    Raw Gateway Response
                                </span>
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <div className="p-4 bg-gray-900 overflow-x-auto">
                                <pre className="text-xs text-green-400 font-mono">
                                    {JSON.stringify(payment.gatewayResponse, null, 2)}
                                </pre>
                            </div>
                        </details>
                    </div>

                </div>

            </div>
        </div>
    );
}
