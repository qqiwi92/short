import Link from "next/link"

export default function Component() {
  return (
    <div className="flex h-[100dvh] flex-col items-center justify-center gap-6 px-4 md:px-6 -translate-y-20">
      <div className="space-y-4 text-center">
        <div className="inline-block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 border border-border/50 dark:bg-gray-800 dark:text-gray-50">
          Error 404
        </div>
        <h1 className="text-6xl font-bold tracking-tighter sm:text-8xl">Page Not Found</h1>
        <p className="max-w-[600px] mx-auto text-lg text-gray-500 dark:text-gray-400 md:text-xl">
          Страницы, которую вы ищете не существует. Давайте вернемся на главную
        </p>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row ">
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none  disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          prefetch={false}
        >
          Домой
        </Link>
        <Link
          href="https://t.me/qiwi_92"
          className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200  bg-background px-6 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
          prefetch={false}
        >
          Связаться с нами
        </Link>
      </div>
      <div className="absolute inset-0 z-[-1] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f3f4f6] to-[#e5e7eb] opacity-50 dark:from-[#1f2937] dark:to-[#374151]" />
        <img
          src="/placeholder.svg"
          alt="Background"
          width={1920}
          height={1080}
          className="h-full w-full object-cover object-center opacity-10 blur-3xl"
        />
      </div>
    </div>
  )
}