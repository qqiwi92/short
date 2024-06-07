export async function GET() {
  try {
    const data = await fetch("https://1082-5-18-225-126.ngrok-free.app/data", {
      method: "GET",
    });
    const json = await data.json();
    return new Response(JSON.stringify({ data: json, error: false }));
  } catch (error) {
    // return new Response(JSON.stringify({ error: true }));
    return new Response(
      JSON.stringify({
        data: [
          {
            date: "8 минут назад",
            link: "https://habr.com/ru/news/819251/",
            title: "Опубликован проект L(o*62).ong для удлинения урлов",
          },
          {
            date: "25 минут назад",
            link: "https://habr.com/ru/companies/dcmiran/news/819249/",
            title:
              "AMD представила новые Ryzen 9000 и серверные процессоры Turin",
          },
          {
            date: "1 час назад",
            link: "https://habr.com/ru/news/819245/",
            title:
              "Softline: Microsoft отключила подписки на Visio Online, Project Online, Power BI для половины корпзаказчиков из РФ",
          },
          {
            date: "1 час назад",
            link: "https://habr.com/ru/news/819239/",
            title:
              "Скетчи Arduino теперь можно запускать одновременно с MicroPython, но только на многоядерных микроконтроллерах",
          },
          {
            date: "3 часа назад",
            link: "https://habr.com/ru/news/819225/",
            title:
              "В соцсети X (экс-Twitter) официально разрешили контент NSFW (18+)",
          },
          {
            date: "3 часа назад",
            link: "https://habr.com/ru/news/819223/",
            title:
              "Метки AirTag помогли обнаружить сеть складов с 15 000 ворованных инструментов на сумму $5 млн",
          },
          {
            date: "4 часа назад",
            link: "https://habr.com/ru/news/819189/",
            title:
              "Акции Berkshire Hathaway рухнули на 99% из-за сбоя на Нью-Йоркской фондовой бирже",
          },
          {
            date: "4 часа назад",
            link: "https://habr.com/ru/news/819185/",
            title:
              "Разработчики выпустили ToonCrafter — нейросеть для генерации анимационных видео",
          },
          {
            date: "5 часов назад",
            link: "https://habr.com/ru/news/819179/",
            title:
              "В ЛЭТИ создали прототип резервуарного компьютера для аппаратных нейроморфных вычислений на принципах магноники",
          },
          {
            date: "5 часов назад",
            link: "https://habr.com/ru/news/819171/",
            title: "Репозиторий браузера Supermium на GitHub больше недоступен",
          },
          {
            date: "5 часов назад",
            link: "https://habr.com/ru/companies/jetinfosystems/news/819167/",
            title: "Топ-5 ИБ-событий недели по версии Jet CSIRT",
          },
          {
            date: "8 часов назад",
            link: "https://habr.com/ru/news/819107/",
            title:
              "VK сообщила об изменениях в управлении «Одноклассниками», «VK Музыкой» и ML‑системами",
          },
          {
            date: "8 часов назад",
            link: "https://habr.com/ru/news/819105/",
            title: "«Яндекс» разрабатывает единую нейросеть для речи и текста",
          },
          {
            date: "8 часов назад",
            link: "https://habr.com/ru/news/819103/",
            title:
              "Производитель «Рикор» запустит производство собственных корпусов для ПК к концу 2024 года",
          },
          {
            date: "8 часов назад",
            link: "https://habr.com/ru/news/819099/",
            title:
              "Обновление Telegram: сообщения с анимированными эффектами, поиск по хештегам и подписи над файлами",
          },
          {
            date: "8 часов назад",
            link: "https://habr.com/ru/news/819093/",
            title:
              "Минкульт РФ переведёт до конца 2024 года центральный аппарат на ОС Astra Linux и систему управления доменом ALD Pro",
          },
          {
            date: "8 часов назад",
            link: "https://habr.com/ru/news/819091/",
            title: "Некоторые госсайты недоступны из-за сбоя",
          },
          {
            date: "8 часов назад",
            link: "https://habr.com/ru/news/819089/",
            title:
              "Банки оценили перспективы единой биометрической площадки НСПК",
          },
          {
            date: "8 часов назад",
            link: "https://habr.com/ru/companies/mws/news/819083/",
            title:
              "Рассказывает MWS: как использовать ресурсы для работы с графикой",
          },
          {
            date: "9 часов назад",
            link: "https://habr.com/ru/news/819081/",
            title: "Docker Hub разблокировали по геоайпи в России",
          },
        ],
        error: false,
      }),
    );
  }
}
