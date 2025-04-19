import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NewConsultationPage() {
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
          <div className="mx-auto max-w-2xl space-y-8">
            <div>
              <h1 className="text-3xl font-bold">New Consultation</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Start a new consultation with our AI experts
              </p>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="topic"
                >
                  Topic or Question
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="topic"
                  placeholder="What would you like to consult about?"
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="description"
                >
                  Description (Optional)
                </label>
                <textarea
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                  id="description"
                  placeholder="Provide more details about what you're looking for..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Select AI Consultants
                </label>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  <div className="flex items-start space-x-2">
                    <input
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      id="creative-thinker"
                      name="consultants"
                      type="checkbox"
                      value="creative-thinker"
                    />
                    <div className="grid gap-1.5">
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="creative-thinker"
                      >
                        Creative Thinker
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Specializes in creative ideas and innovation
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <input
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      id="analytical-expert"
                      name="consultants"
                      type="checkbox"
                      value="analytical-expert"
                    />
                    <div className="grid gap-1.5">
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="analytical-expert"
                      >
                        Analytical Expert
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Provides data-driven insights and analysis
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <input
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      id="business-strategist"
                      name="consultants"
                      type="checkbox"
                      value="business-strategist"
                    />
                    <div className="grid gap-1.5">
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="business-strategist"
                      >
                        Business Strategist
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Expert in business models and strategy
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <input
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      id="technical-architect"
                      name="consultants"
                      type="checkbox"
                      value="technical-architect"
                    />
                    <div className="grid gap-1.5">
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="technical-architect"
                      >
                        Technical Architect
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Specializes in technical implementation
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Upload Relevant Documents (Optional)
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or
                        drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PDF, DOCX, TXT (MAX. 10MB)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      multiple
                    />
                  </label>
                </div>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <Button type="submit" className="w-full">
                  Start Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 