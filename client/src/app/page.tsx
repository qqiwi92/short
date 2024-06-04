"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { MdOutlineDelete } from "react-icons/md";
import useLocalStorageState from "use-local-storage-state";

type Data = {
  date: string;
  link: string;
  title: string;
};
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
      <div className="flex flex-col md:flex-row gap-5">
        <div className="border-r  min-w-fit border-border/50 h-fit block md:sticky top-20 px-6 border-dashed flex flex-col transition items-center justify-start gap-5">
          <h2 className="whitespace-nowrap">Критерии поиска</h2>
          <div className="rounded-xl border-border border p-3 w-full h-full flex items-center flex-col justify-center gap-3 bg-background">
            <div className="flex flex-col items-center justify-center gap-2 w-full">
              <h3 className="font-bold text-xl w-full">Фильтры</h3>
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
              <h3 className="font-bold text-xl mr-auto">Ключевые слова</h3>
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
        <ul className="flex flex-col gap-5 mx-auto w-fit">
          <h2 className="">Digest за неделю</h2>
          <p
            className={`flex gap-1 transition flex-wrap  duration-300 rounded-xl bg-black/5 p-4 ${
              !error && data.length === 0
                ? "opacity-0 translate-y-2"
                : "opacity-100 translate-y-0"
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
                          className={`border-b-2 border-dashed  ${
                            newsCount === selectedNews
                              ? "border-accent"
                              : "border-border/75"
                          }`}
                        >
                          {word}
                        </motion.a>
                      ))}
                      .{" "}
                      <span className="rounded-full border border-border w-4 h-4 flex items-center justify-center text-sm font-mono ">
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
      className={`border font-bold cursor-pointer rounded-xl select-none flex gap-3 justify-start items-center px-4 py-2 w-full ${
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
      className={`border font-bold bg-secondary cursor-pointer rounded-xl select-none flex gap-3 justify-between items-center px-4 py-2 w-full `}
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
      className={`w-full flex gap-1 justify-between items-center`}
    >
      <input
        className=" bg-transparent outline-none border font-bold cursor-pointer rounded-xl select-none  px-4 py-2 w-full"
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
        className="px-5 py-1 h-10 select-none font-bold border rounded-xl hover:bg-secondary transition "
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
      className="flex flex-col gap-3 cursor-pointer"
      onClick={() => setShowMore(!showMore)}
    >
      <div
        draggable={false}
        className="bg-black/5 rounded-xl p-3 flex-col  justify-between select-none"
      >
        <div className="">{item.title} </div>
        <div className="flex justify-between text-sm text-foreground/75">
          <a href={item.link} className="">
            habr.com
          </a>
          <div className=" text-right">{item.date}</div>
        </div>
        <motion.div
          initial={{ height: 0, paddingTop: 0, opacity: 0 }}
          animate={{
            height: showMore ? "auto" : 0,
            paddingTop: showMore ? "0.5rem" : 0,
            opacity: showMore ? 1 : 0,
          }}
          transition={{ duration: 0.1 }}
          className="text-sm text-foreground/75 overflow-hidden"
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
