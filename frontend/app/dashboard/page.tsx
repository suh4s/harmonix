import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link className="flex items-center gap-2 font-semibold" href="/">
              <span className="text-xl font-bold">ConsultantAI</span>
            </Link>
            <nav className="hidden lg:flex gap-6">
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="/dashboard"
              >
                Dashboard
              </Link>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="/dashboard/conversations"
              >
                Conversations
              </Link>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="/dashboard/documents"
              >
                Documents
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
              <span className="sr-only">Help</span>
            </Button>
            <Button variant="ghost" size="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span className="sr-only">Account</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 pb-8 pt-6">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Welcome to your ConsultantAI dashboard.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-lg border p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">New Consultation</h2>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-gray-500 dark:text-gray-400"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    <path d="M13 8H7" />
                    <path d="M17 12H7" />
                  </svg>
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Start a new conversation with our AI consultants.
                </p>
                <Link href="/dashboard/new-consultation">
                  <Button className="mt-4 w-full">
                    Start New Consultation
                  </Button>
                </Link>
              </div>
              <div className="rounded-lg border p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Recent Conversations</h2>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-gray-500 dark:text-gray-400"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M9 21V9" />
                  </svg>
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  View and continue your recent consultations.
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 rounded-md border p-2">
                    <div className="flex-1">
                      <h3 className="font-medium">Business Strategy Analysis</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Last updated: 2 days ago
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 rounded-md border p-2">
                    <div className="flex-1">
                      <h3 className="font-medium">Marketing Campaign Ideas</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Last updated: 1 week ago
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                </div>
                <Link
                  className="mt-4 block text-center text-sm text-primary hover:underline"
                  href="/dashboard/conversations"
                >
                  View All Conversations
                </Link>
              </div>
              <div className="rounded-lg border p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Documents</h2>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-gray-500 dark:text-gray-400"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                    <path d="M10 9H8" />
                  </svg>
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Upload and manage your documents for analysis.
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 rounded-md border p-2">
                    <div className="flex-1">
                      <h3 className="font-medium">Business Plan.pdf</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Uploaded: 3 days ago
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                </div>
                <div className="mt-4 flex justify-between">
                  <Link
                    className="text-sm text-primary hover:underline"
                    href="/dashboard/documents"
                  >
                    View All Documents
                  </Link>
                  <Button variant="ghost" size="sm">
                    Upload New
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 