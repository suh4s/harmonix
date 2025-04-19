import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto sm:px-6">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold">ConsultantAI</h1>
          </div>
          <nav className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign up</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 mx-auto sm:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  AI-Powered Consultation Platform
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Get insights from a virtual board of AI consultants with diverse personalities, expertise, and thinking styles.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button className="px-8">Get Started</Button>
                  </Link>
                  <Link href="/about">
                    <Button variant="outline">Learn More</Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-80"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center p-4">
                      <h2 className="text-2xl font-bold mb-2">Meet Your Board of AI Consultants</h2>
                      <p className="max-w-md mx-auto">
                        Creative thinkers, analytical experts, business strategists, and more - all at your fingertips.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 mx-auto md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Features</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our platform offers a range of features to help you get the most out of your consultations.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3 md:gap-8">
              <div className="flex flex-col items-center space-y-2 p-4 border rounded-lg">
                <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900">
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
                    className="w-6 h-6 text-blue-600 dark:text-blue-400"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Diverse AI Personalities</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Access a variety of AI consultants with different expertise and thinking styles.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 border rounded-lg">
                <div className="p-2 bg-green-100 rounded-full dark:bg-green-900">
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
                    className="w-6 h-6 text-green-600 dark:text-green-400"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                    <path d="M10 9H8" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Document Analysis</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Upload documents and get insights from multiple perspectives.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 border rounded-lg">
                <div className="p-2 bg-purple-100 rounded-full dark:bg-purple-900">
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
                    className="w-6 h-6 text-purple-600 dark:text-purple-400"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    <path d="M13 8H7" />
                    <path d="M17 12H7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Interactive Feedback</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Engage in conversations with AI consultants to refine ideas and get deeper insights.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-24 md:flex-row md:py-0">
          <p className="text-sm text-center text-gray-500 md:text-left">
            &copy; {new Date().getFullYear()} ConsultantAI. All rights reserved.
          </p>
          <nav className="flex items-center gap-4 text-sm">
            <Link className="text-gray-500 hover:underline" href="/terms">
              Terms of Service
            </Link>
            <Link className="text-gray-500 hover:underline" href="/privacy">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
} 