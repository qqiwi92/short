
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { cookies } from "next/headers";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";

export default function Component() {
  if (getCookie("auth", {cookies})==='true') {
    redirect("/");
  }

  const checkPasswordLogin = async (formData: FormData) => {
    "use server";
    const username = formData.get("username");
    const password = formData.get("password");
    if (username === "admin" && password === "admin") {
      console.log("set cookie", username, password);
      setCookie("auth", "true", { cookies });
      redirect("/");
    }   };
  return (
      <Card className="absolute left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2">
        <CardHeader>
          <CardTitle className="text-2xl">Добро пожаловать!</CardTitle>
          <CardDescription className="text-foreground">
            Введите данные для входа
          </CardDescription>
        </CardHeader>
        <form action={checkPasswordLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Логин</Label>
              <Input
                id="username"
                name="username"
                placeholder="введите логин" className="border-black"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Пароль - admin</Label>
                <Link href="https://t.me/qiwi_92" className="text-sm" prefetch={false}>
                  Забыли пароль?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="введите пароль" className="border-black"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" variant={"secondary"} className="w-full">
              Войти -admin
            </Button>
          </CardFooter>
        </form>
      </Card>
  );
}
