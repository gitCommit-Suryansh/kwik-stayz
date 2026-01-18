import AdminSidebar from "./_components/AdminSidebar";

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar - Desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                <AdminSidebar />
            </div>

            {/* Main Content */}
            <div className="lg:pl-72 w-full flex flex-col min-h-screen">
                <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 min-h-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
