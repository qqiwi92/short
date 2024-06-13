"use client";
import { IoSend } from "react-icons/io5";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { motion } from "framer-motion";
interface ITestingSection {}

export default function TestingSection({}: ITestingSection) {
  const [value, setValue] = useState("");
  const handleSubmit = ()=> {
    fetch(`/api/send_now`, {
        method: "POST",	
        body: JSON.stringify({mode: value}),
    })
}
  return (
    <div className="min-h-20 w-full max-w-4xl">
      <p className="py-1 text-2xl font-bold">Протестировать работу сервиса</p>
      <div className="flex items-center justify-center gap-1">
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger>
            <SelectValue placeholder="Выберите режим" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="w-fit">
              <SelectLabel>Выберите режим</SelectLabel>
              <SelectItem value="send_unranked">
                Отправка без ранжирования
              </SelectItem>
              <SelectItem value="rank_and_send">
                Ранжирование и отправка
              </SelectItem>
              <SelectItem value="rank">Ранжирование</SelectItem>
              <SelectItem value="send_old_ranked">
                Отправка ранжрованых данных
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <motion.button whileTap={{ scale: 0.9 }} onClick={handleSubmit} className="group flex h-full max-w-fit flex-1 items-center justify-center rounded-xl border p-2 overflow-hidden">
          <span  className="flex items-center gap-2 -translate-x-7 group-hover:translate-x-0 transition max-w-5 ">
            <IoSend className="text-xl min-w-5" />
            <IoSend className="text-xl min-w-5" />
          </span>
        </motion.button>
      </div>
    </div>
  );
}
