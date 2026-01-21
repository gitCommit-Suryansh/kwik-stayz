import LocalityForm from "./_components/LocalityForm";
import Link from "next/link";
import { ChevronLeftIcon, ListBulletIcon } from "@heroicons/react/24/outline";

export default function CreateLocalityPage() {
    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-8">
                <Link href="/admin" className="flex items-center text-sm text-gray-500 hover:text-primary mb-4">
                    <ChevronLeftIcon className="h-4 w-4 mr-1" />
                    Back to Dashboard
                </Link>

                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Add New Locality</h1>
                        <p className="mt-2 text-gray-500">
                            Add a new locality within a city to list properties.
                        </p>
                    </div>
                    <Link
                        href="/admin/localities"
                        className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        <ListBulletIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        View Localities
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
                <LocalityForm />
            </div>
        </div>
    );
}
