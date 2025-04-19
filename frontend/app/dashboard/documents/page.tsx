import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DocumentsPage() {
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
        </div>
      </header>
      <main className="flex-1 pb-8 pt-6">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-5xl space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Documents</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Manage your documents for AI consultations
                </p>
              </div>
              <Button>Upload Document</Button>
            </div>
            <div className="rounded-lg border shadow-sm">
              <div className="p-4">
                <div className="relative w-full">
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-9"
                    placeholder="Search documents..."
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
              </div>
              <div className="overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        Name
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        Type
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        Size
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        Uploaded
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle">Project_Brief.pdf</td>
                      <td className="p-4 align-middle">PDF</td>
                      <td className="p-4 align-middle">2.4 MB</td>
                      <td className="p-4 align-middle">2023-08-15</td>
                      <td className="p-4 align-middle">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle">Requirements.docx</td>
                      <td className="p-4 align-middle">DOCX</td>
                      <td className="p-4 align-middle">1.8 MB</td>
                      <td className="p-4 align-middle">2023-08-10</td>
                      <td className="p-4 align-middle">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle">Market_Research.pdf</td>
                      <td className="p-4 align-middle">PDF</td>
                      <td className="p-4 align-middle">4.2 MB</td>
                      <td className="p-4 align-middle">2023-08-05</td>
                      <td className="p-4 align-middle">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                    <tr className="transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle">Financial_Projections.xlsx</td>
                      <td className="p-4 align-middle">XLSX</td>
                      <td className="p-4 align-middle">3.5 MB</td>
                      <td className="p-4 align-middle">2023-07-28</td>
                      <td className="p-4 align-middle">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between px-4 py-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Showing 4 of 4 documents
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Next
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