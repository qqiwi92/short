export default async function Home() {
  const data = await fetch('http://localhost:5000')
  const news = await data.json()
  return (
    <div className="mx-auto">
<h1 className="text-6xl font-bold text-center">News</h1>
      <ul className="flex flex-col gap-5 mx-auto py-2 w-fit">
          {news.map((item: any) => {
            return (
              <div className="flex items-center p-2  justify-center flex-col bg-stone-900 border-stone-700 border rounded-xl w-fit">
                <div className="text-left max-w-lg">{item.title}</div>
                <div>{item.link}</div>
                <div>{item.date}</div>
              </div>
            )
          })}
      </ul>
    </div>
  );
}
