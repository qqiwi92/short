import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Data } from "@/lib/utils";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useState } from "react";
export default function Letter({ data }: { data: Data[] }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <header className="mb-5">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Digest новостей за эту неделю
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Shoptalk Europe 2024: Сайрус Бест преуспел в исследовании IBM,
          посвященном генеративному ИИ: Банки и финансовые рынки делают ставку
          на генеративный ИИ, чтобы оставаться конкурентоспособными, но проблемы
          с персоналом и культурой сохраняются, несмотря ни на что Group
          внедряет функциональность GenAI на платформе влияния AnyTag
        </p>
      </header>
      <div className="grid gap-3">
        {data.map((item, i) => {
          if (i > 20) return null;
          const [disabled, setDisabled] = useState(false);
          return (
            <Card
              key={i}
              className={`relative flex flex-col gap-4 border-border/30 p-3 transition md:flex-row md:gap-6 ${disabled ? "opacity-50 border-accent" : "opacity-100"}`}
            >
              <div
                onClick={() => setDisabled(!disabled)}
                className={`absolute right-3 top-3 h-6 w-6 bg-background transition ${disabled ? "opacity-100" : "opacity-75"}`}
              >
                {disabled ? <FaEyeSlash /> : <FaEye />}
              </div>
              <div className="grid flex-1 gap-2">
                <h2 className="pr-3 text-left text-lg font-semibold md:text-xl">
                  {item.title}
                </h2>
                <p className="line-clamp-3 text-gray-500 dark:text-gray-400">
                  Researchers at the NLMK-FROM institute have developed a new
                  method for improving the efficiency of steel production,
                  leading to significant cost savings and reduced environmental
                  impact.
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
          );
        })}
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
