import HotelForm from "./_components/HotelForm";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

export default function CreateHotelPage() {
    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-8">
                <Link href="/admin" className="flex items-center text-sm text-gray-500 hover:text-primary mb-2">
                    <ChevronLeftIcon className="h-4 w-4 mr-1" />
                    Back to Dashboard
                </Link>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Add New Hotel</h1>
                <p className="mt-2 text-gray-500">
                    Fill in the details below to list a new property on Kwik Stays.
                </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
                <HotelForm />
            </div>
        </div>
    );
}
