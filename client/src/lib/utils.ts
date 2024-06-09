import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { serialize } from "cookie";
import { NextResponse } from "next/server";
import { setCookie } from "cookies-next";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export type Data = {
  date: string;
  link: string;
  text: string;
  title: string;
};
