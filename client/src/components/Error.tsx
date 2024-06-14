import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Error() {
  return (
    <Card className="absolute left-1/2 top-1/2 mx-auto max-w-md -translate-x-1/2 -translate-y-1/2 border border-yellow-300 bg-yellow-50 p-6 dark:border-yellow-700 dark:bg-yellow-900/20">
      <div className="flex items-start gap-4">
        <TriangleAlertIcon className="h-8 w-8 flex-shrink-0 text-yellow-500 dark:text-yellow-400" />
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-50">
            Похоже возникла пробема с получением данных
          </h3>
          <p className="text-yellow-800 dark:text-yellow-200">
            Нам очень жаль, но, похоже, возникла проблема с нашим сервером.
            Пожалуйста повторите попытку позже или сообщите о проблеме разработчикам.
          </p>
          <Button
            variant="secondary"
            size="sm"
            className="flex items-center gap-2" onClick={() => window.location.href='https://t.me/qiwi_92'}
          >
            <FlagIcon className="h-4 w-4" />
            Написать разработчикам
          </Button>
        </div>
      </div>
    </Card>
  );
}

function FlagIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}

function TriangleAlertIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}
