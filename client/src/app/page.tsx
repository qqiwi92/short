"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoMdClose } from "react-icons/io";
import Letter from "@/components/Letter";
import { Data } from "@/lib/utils";
import { Loader } from "@/components/loader";
import { GoQuestion } from "react-icons/go";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast, useToast } from "@/components/ui/use-toast";
import Expand from "@/components/Еxpand";
import Error from "@/components/Error";
export default function Page() {
  const [tags, setTags] = useState<string[]>([]);
  const [emails, setEmails] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [data, setData] = useState<Data[]>([]);
  const [auth, setAuth] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const { toast } = useToast();

  const today = new Date();
  const nextSunday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + (7 - today.getDay()),
  );
  useEffect(() => {
    async function checkAuth() {
      const response = await fetch("/api/checkAuth", {
        method: "GET",
      });
      const { auth } = await response.json();
      console.log(auth);
      setTimeout(() => {
        if (auth !== "true") {
          window.location.href = "/auth";
        } else {
          setAuth(true);
        }
      }, 1000);
    }
    checkAuth();
    async function getNews() {
      
        const response = await fetch(`/api/data`, {
          method: "GET",
          next: {
            revalidate: 600,
          },
        });
        const news: { data: Data[]; error: boolean } = await response.json();
        if (news.error) {
          setError(true);
        }
        setData(news.data);
    
      }
    async function getUserInfo() {
      try {
        const response = await fetch(`/api/user_data`, {
          method: "GET",
          next: {
            revalidate: 600,
          },
        });
        const news: { tags: string[]; emails: string[]; error: boolean } =
          await response.json();
        if (news.error) {
          setError(true);
        }
        setTags(news.tags);
        setEmails(news.emails);
      } catch (error) {
        setError(true);
      }
    }
    getNews();
    getUserInfo();
  }, []);
  return (
    <>
        <Loader
          loading={!auth || data.length === 0}
          loadingStates={[
            { text: "Проверяем авторизацию" },
            { text: "Загружаем контент" },
            { text: "Создаем фичи" },
          ]}
          duration={2000}
        />
      {error ? (
        <Error/>
      ) : (
        <div className="flex min-h-screen flex-col items-center justify-start gap-5">
          <div className="flex w-full flex-col gap-2">
            <List
              title="Теги"
              list={tags}
              setList={setTags}
              value={newTag}
              setValue={setNewTag}
            />
          </div>
          <List
            isEmail
            title="Емайлы"
            list={emails}
            setList={setEmails}
            value={newEmail}
            setValue={setNewEmail}
          />
          <div className="flex items-center justify-center gap-2">
            <Button
              onClick={() => {
                fetch("/api/send_now", {
                  method: "POST",
                });
                toast({ title: "отправляем 👌", variant: "success" });
              }}
              className="bg-secondary font-bold transition hover:bg-secondary/75"
            >
              отправить сейчас
            </Button>
            <Button
              onClick={() => {
                fetch("/api/save_user_data", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ tags: tags, emails: emails }),
                });
                toast({ title: "Сохранено 👌", variant: "success" });
              }}
              className="bg-accent font-bold transition hover:bg-accent/75"
            >
              Сохранить
            </Button>

            <TooltipProvider>
              <div className="flex items-center gap-2">
                <Tooltip delayDuration={50}>
                  <TooltipTrigger>
                    <GoQuestion className="text-xl" />
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    <p>
                      У вас есть не сохраненные изменения. Чтобы изменить
                      параметры рассылки, отправьте изменения на наш сервер
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>
          <div className="flex w-full flex-col items-center justify-center">
            <div className="w-full max-w-4xl">
              <p className="py-1 text-2xl font-bold">Preview письма</p>
              <p className="pb-2">
                {new Date().getDay() === 0 ? (
                  <span>
                    Это письмо было сгенерировано сегодня и в 00 часов будет
                    отправлено в рассылке{" "}
                  </span>
                ) : (
                  <span>
                    Это письмо содержит неполный набор новостей. Полный digest
                    будет готов{" "}
                    <span className="rounded-xl border px-2 py-1 font-bold tracking-wide">
                      {nextSunday.getDate()}.
                      {String(nextSunday.getMonth() + 1).length === 1
                        ? "0" + String(nextSunday.getMonth() + 1)
                        : String(nextSunday.getMonth() + 1)}
                      .{nextSunday.getFullYear()}
                    </span>
                  </span>
                )}{" "}
              </p>
              <Expand maxHeight={250}>
                <Letter data={data} />
              </Expand>
              {/* </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function List({
  list,
  value,
  setList,
  setValue,
  title,
  isEmail = false,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  list: string[];
  setList: React.Dispatch<React.SetStateAction<string[]>>;
  title: string;
  isEmail?: boolean;
}) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      e.key === "Enter" &&
      !value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i) &&
      isEmail
    ) {
      e.preventDefault();
      toast({
        title: "это не похоже на email",
        variant: "destructive",
        description: (
          <span>
            обычная почта выглядит так <strong>mit.levkin@vk.com</strong>
          </span>
        ),
      });
    }
    if (
      e.key === "Enter" &&
      value.trim() !== "" &&
      !list.includes(value) &&
      value.length < 40 &&
      (isEmail ? value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i) : true)
    ) {
      e.preventDefault();
      setList([...list, value.trim()]);
      setValue("");
    }
    if (e.key === "Backspace" && value.trim() === "" && list.length > 0) {
      e.preventDefault();
      setList(list.slice(0, -1));
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleRemoveTag = (index: number) => {
    const updatedTags = [...list];
    updatedTags.splice(index, 1);
    setList(updatedTags);
  };
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="w-full max-w-4xl">
        <p className="z-[101] py-1 text-2xl font-bold">
          {title}{" "}
          <span className="text-sm text-foreground/50">
            (разделение по enter)
          </span>
        </p>
        <Expand>
          <div className="relative flex w-full flex-wrap items-center overflow-hidden rounded-xl p-1">
            {list.map((tag, index) => (
              <div
                key={index}
                className="relative m-1 w-fit select-none rounded-xl bg-secondary px-3 py-1 pr-8 text-lg font-medium transition dark:bg-gray-800"
              >
                {tag}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 hover:scale-x-110 hover:bg-transparent hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  onClick={() => handleRemoveTag(index)}
                >
                  <IoMdClose className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Input
              type="text"
              placeholder="добавить"
              value={value}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="min-w-[100px] flex-1 select-none border-0 text-lg leading-3 focus:outline-0"
            />
          </div>
        </Expand>
      </div>
    </div>
  );
}
