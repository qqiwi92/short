"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getNews() {
      // const response = await fetch('http://localhost:5000/api/mock-data')
      const response = await fetch("/api/mock-data", {
        next: {
          revalidate: 5,
        },
      });
      const news = await response.json();
      setData(news);
    }
    getNews();
  }, []);
  return (
    <div className="mx-auto">
      <h1 className="text-6xl font-bold text-center">News</h1>
      <ul className="flex flex-col gap-5 mx-auto py-2 w-fit">
        {data.map((item: any) => {
          return (
            <div className="flex items-center p-2  justify-center flex-col bg-stone-900 border-stone-700 border rounded-xl w-fit">
              <div className="text-left max-w-lg">{item.title}</div>
              <div>{item.link}</div>
              <div>{item.date}</div>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
