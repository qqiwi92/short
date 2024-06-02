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
  const [selectedNews, setSelectedNews] = useState(-1);
  useEffect(() => {
    async function getNews() {
      try {
        // const response = await fetch('http://localhost:5000/api/mock-data')
        const response = await fetch("/api/mock-data", {
          next: {
            revalidate: 5,
          },
        });
        const news = await response.json();
        setData(news);
      } catch (error) {
        console.log(error);
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
      <div className="flex gap-5">
        <div className="border-r border-border/50 px-6 border-dashed flex flex-col items-center justify-start gap-5">
          <h2 className="">Критерии поиска</h2>
          <div className="rounded-xl border-border border p-3 w-full h-full flex items-center flex-col justify-center gap-3 ">
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
        <ul className="flex flex-col gap-5 mx-auto py-2 w-fit">
          <h2 className="">Digest за неделю</h2>
          <p className="flex gap-1 flex-wrap max-w-lg rounded-xl bg-black/5 p-4">
            {data.map((item, newsCount) => {
              return (
                <>
                  {item.title.split(" ").map((word, wordCount) => (
                    <motion.a
                      onHoverStart={() => setSelectedNews(newsCount)}
                      href={item.link	}
                      key={wordCount}
                      onHoverEnd={() => setSelectedNews(-1)}
                      className={`border-b-2 border-dashed  ${newsCount === selectedNews ? "border-accent" : "border-border/75"}`}
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
          </p>
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
      className={`border font-bold cursor-pointer rounded-xl select-none flex gap-3 justify-start items-center px-4 py-2 w-full ${selected && "bg-primary"} `}
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
        className="px-5 py-1 h-full border rounded-xl hover:bg-secondary transition"
      >
        +
      </button>
    </form>
  );
}
