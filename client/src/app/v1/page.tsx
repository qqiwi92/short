"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { MdOutlineDelete } from "react-icons/md";
import useLocalStorageState from "use-local-storage-state";
import { Data } from "@/lib/utils";

type Filters = {
  frontend: boolean;
  backend: boolean;
  design: boolean;
  pm: boolean;
  devops: boolean;
  datascience: boolean;
  [key: string]: boolean; // shitcode
};

export default function Home() {
  const [data, setData] = useState<Data[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [selectedNews, setSelectedNews] = useState(-1);
  useEffect(() => {
    async function getNews() {
      try {
        const response = await fetch(`/api/data`, {
          next: {
            revalidate: 5,
          },
        });
        const news: { data: Data[]; error: boolean } = await response.json();
        if (news.error) {
          setError(true);
        }

        setData(news.data);
      } catch (error) {
        setError(true);
      }
    }

    getNews();
  }, []);
  const [filters, setFilters] = useLocalStorageState<Filters>("filters", {
    defaultValue: {
      frontend: false,
      backend: false,
      design: false,
      pm: false,
      devops: false,
      datascience: false,
    },
  });
  const [keyWords, setKeyWords] = useLocalStorageState("keywords", {
    defaultValue: ["НЛМК", "Металлургия"],
  });
  return (
    <div className="mx-auto">
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="top-20  flex h-fit min-w-fit flex-col items-center justify-start gap-5 border-r border-dashed border-border/50 px-6 transition md:sticky">
          <h2 className="whitespace-nowrap">Критерии поиска</h2>
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-xl border border-border bg-background p-3">
            <div className="flex w-full flex-col items-center justify-center gap-2">
              <h3 className="w-full text-xl font-bold">Фильтры</h3>
              {[
                "Frontend",
                "Backend",
                "Design",
                "PM",
                "DevOps",
                "Data Science",
              ].map((item) => {
                return (
                  <FilterOption
                    title={item}
                    key={item}
                    filters={filters}
                    setFilters={setFilters}
                  />
                );
              })}
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <h3 className="mr-auto text-xl font-bold">Ключевые слова</h3>
              {keyWords.map((item) => {
                return (
                  <KeyWord
                    title={item}
                    key={item}
                    keywords={keyWords}
                    setKeywords={setKeyWords}
                  />
                );
              })}
              <AddKeyword setKeywords={setKeyWords} />
            </div>
          </div>
        </div>
        <ul className="mx-auto flex w-fit flex-col gap-5">
          <h2 className="">Digest за неделю</h2>
          <p
            className={`flex flex-wrap gap-1 rounded-xl bg-black/5 p-4 transition duration-300 ${
              !error && data.length === 0
                ? "translate-y-2 opacity-0"
                : "translate-y-0 opacity-100"
            } `}
          >
            {error ? (
              <span>не удалось загрузить данные с сервера</span>
            ) : (
              <>
                {data.map((item, newsCount) => {
                  if (newsCount > 3) return null;
                  return (
                    <>
                      {item.title.split(" ").map((word, wordCount) => (
                        <motion.a
                          onHoverStart={() => setSelectedNews(newsCount)}
                          href={item.link}
                          key={wordCount}
                          onHoverEnd={() => setSelectedNews(-1)}
                          className={`border-b-2 border-dashed ${
                            newsCount === selectedNews
                              ? "border-accent"
                              : "border-border/75"
                          }`}
                        >
                          {word}
                        </motion.a>
                      ))}
                      .{" "}
                      <span className="flex h-4 w-4 items-center justify-center rounded-full border border-border font-mono text-sm">
                        {newsCount + 1}
                      </span>
                    </>
                  );
                })}
              </>
            )}
          </p>
          {!error && (
            <>
              <h2>Все новости</h2>
              <div className="flex flex-col gap-2">
                {data.map((item) => (
                  <News item={item} key={item.title} />
                ))}
              </div>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

type filterOptionsProps = {
  title: string;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};
function FilterOption({ title, filters, setFilters }: filterOptionsProps) {
  const filterStringStyledTitle = title.replace(" ", "").toLowerCase();
  const selected = filters[filterStringStyledTitle];
  return (
    <div
      draggable={false}
      className={`flex w-full cursor-pointer select-none items-center justify-start gap-3 rounded-xl border px-4 py-2 font-bold ${
        selected && "bg-primary"
      } `}
      onClick={() =>
        setFilters({
          ...filters,
          [filterStringStyledTitle]: !selected,
        })
      }
    >
      {selected ? (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <ImCheckboxChecked />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <ImCheckboxUnchecked />
        </motion.div>
      )}
      {title}
    </div>
  );
}

type KeywordProps = {
  title: string;
  keywords: string[];
  setKeywords: React.Dispatch<React.SetStateAction<string[]>>;
};
function KeyWord({ title, keywords, setKeywords }: KeywordProps) {
  return (
    <div
      draggable={false}
      className={`flex w-full cursor-pointer select-none items-center justify-between gap-3 rounded-xl border bg-secondary px-4 py-2 font-bold`}
    >
      {title}
      <MdOutlineDelete
        className="text-xl"
        onClick={() =>
          setKeywords([...keywords.filter((item) => item !== title)])
        }
      />
    </div>
  );
}

function AddKeyword({
  setKeywords,
}: {
  setKeywords: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [keyword, setKeyword] = useState("");
  return (
    <form
      draggable={false}
      className={`flex w-full items-center justify-between gap-1`}
    >
      <input
        className="w-full cursor-pointer select-none rounded-xl border bg-transparent px-4 py-2 font-bold outline-none"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="ключевое слово"
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          if (keyword.length !== 0 && keyword.trim().split(" ").length == 1) {
            setKeywords((previous) => {
              return [...previous, keyword];
            });
          }
        }}
        className="h-10 select-none rounded-xl border px-5 py-1 font-bold transition hover:bg-secondary"
      >
        +
      </button>
    </form>
  );
}

function News({ item }: { item: Data }) {
  const [showMore, setShowMore] = useState(false);
  return (
    <div
      className="flex cursor-pointer flex-col gap-3"
      onClick={() => setShowMore(!showMore)}
    >
      <div
        draggable={false}
        className="select-none flex-col justify-between rounded-xl bg-black/5 p-3"
      >
        <div className="">{item.title} </div>
        <div className="flex justify-between text-sm text-foreground/75">
          <a href={item.link} className="">
            habr.com
          </a>
          <div className="text-right">{item.date}</div>
        </div>
        <motion.div
          initial={{ height: 0, paddingTop: 0, opacity: 0 }}
          animate={{
            height: showMore ? "auto" : 0,
            paddingTop: showMore ? "0.5rem" : 0,
            opacity: showMore ? 1 : 0,
          }}
          transition={{ duration: 0.1 }}
          className="overflow-hidden text-sm text-foreground/75"
        >
          AMD представила новые процессоры Ryzen 9000 на базе архитектуры Zen 5,
          включая модели Ryzen 9, Ryzen 7 и Ryzen 5, а также серверные
          процессоры EPYC поколения Turin, демонстрируя значительное
          превосходство над Intel в производительности и поддержке будущих
          технологий через чипсет X870 и долгосрочную поддержку сокета AM5 до
          2027 года.
        </motion.div>
      </div>
    </div>
  );
}
