import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Data } from "@/lib/utils";
export default function Letter({data}: {data: Data[]}) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <header className="mb-8 md:mb-12">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Metallurgy News Digest
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          A weekly roundup of the top news in metallurgy and NLMK-FROM.
        </p>
      </header>
      <div className="grid gap-3">
        {data.map((item, i) => (
          <Card key={i} className="flex flex-col gap-4 md:flex-row md:gap-6 p-3 border-border/60">
            <div className=" rounded-lg bg-foreground/10 object-cover md:w-1/3"></div>
            <div className="grid flex-1 gap-2">
              <h2 className="text-lg font-semibold md:text-xl">
                {item.title}
              </h2>
              <p className="line-clamp-3 text-gray-500 dark:text-gray-400">
                Researchers at the NLMK-FROM institute have developed a new
                method for improving the efficiency of steel production, leading
                to significant cost savings and reduced environmental impact.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <CalendarIcon className="h-4 w-4" />
                <span>{item.date}</span>
                <Separator orientation="vertical" className="h-4" />
                <Link
                  href={item.link}
                  className="font-medium hover:underline"
                  prefetch={false}
                >
                  Read more
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-3 flex justify-center md:mt-12">
        <Button variant="secondary" size="lg">
          View Full News Archive
        </Button>
      </div>
    </div>
  );
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}
