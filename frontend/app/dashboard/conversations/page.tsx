import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ConversationsPage() {
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
          <div className="mx-auto max-w-5xl space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Conversations</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  View and manage your AI consultation conversations
                </p>
              </div>
              <Link href="/dashboard/new-consultation">
                <Button>New Consultation</Button>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-9"
                  placeholder="Search conversations..."
                  type="search"
                />
                <svg
                  className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <select className="flex h-10 w-40 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest First</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
              </select>
            </div>
            <div className="space-y-4">
              <div className="rounded-lg border shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">Business Strategy Analysis</h2>
                      <p className="text-sm text-gray-500">Created on Oct 12, 2023</p>
                    </div>
                    <div className="flex space-x-2">
                      <div className="flex -space-x-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-blue-500 text-xs font-medium text-white">CT</div>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-green-500 text-xs font-medium text-white">AE</div>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-purple-500 text-xs font-medium text-white">BS</div>
                      </div>
                      <div className="text-sm text-gray-500">3 consultants</div>
                    </div>
                  </div>
                  <p className="mt-4">
                    Analysis of our company's competitive position and growth strategy for the next fiscal year.
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <Link href="/dashboard/conversations/1">
                      <Button>Continue Conversation</Button>
                    </Link>
                    <Button variant="outline">Export</Button>
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
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="19" cy="12" r="1" />
                        <circle cx="5" cy="12" r="1" />
                      </svg>
                      <span className="sr-only">More options</span>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">Marketing Campaign Ideas</h2>
                      <p className="text-sm text-gray-500">Created on Oct 8, 2023</p>
                    </div>
                    <div className="flex space-x-2">
                      <div className="flex -space-x-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-blue-500 text-xs font-medium text-white">CT</div>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-orange-500 text-xs font-medium text-white">MS</div>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-red-500 text-xs font-medium text-white">CS</div>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-yellow-500 text-xs font-medium text-white">+2</div>
                      </div>
                      <div className="text-sm text-gray-500">5 consultants</div>
                    </div>
                  </div>
                  <p className="mt-4">
                    Brainstorming innovative marketing approaches for the new product line launch in Q1.
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <Link href="/dashboard/conversations/2">
                      <Button>Continue Conversation</Button>
                    </Link>
                    <Button variant="outline">Export</Button>
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
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="19" cy="12" r="1" />
                        <circle cx="5" cy="12" r="1" />
                      </svg>
                      <span className="sr-only">More options</span>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">Product Feature Prioritization</h2>
                      <p className="text-sm text-gray-500">Created on Oct 5, 2023</p>
                    </div>
                    <div className="flex space-x-2">
                      <div className="flex -space-x-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-green-500 text-xs font-medium text-white">AE</div>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-indigo-500 text-xs font-medium text-white">TA</div>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-pink-500 text-xs font-medium text-white">HD</div>
                      </div>
                      <div className="text-sm text-gray-500">3 consultants</div>
                    </div>
                  </div>
                  <p className="mt-4">
                    Analyzing and prioritizing feature requests for the upcoming software release.
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <Link href="/dashboard/conversations/3">
                      <Button>Continue Conversation</Button>
                    </Link>
                    <Button variant="outline">Export</Button>
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
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="19" cy="12" r="1" />
                        <circle cx="5" cy="12" r="1" />
                      </svg>
                      <span className="sr-only">More options</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing 3 of 17 conversations
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 