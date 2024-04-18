import { http, HttpResponse, delay } from "msw";

export const handlers = [
  http.get("http://localhost:3030/scoops", () => {
    return HttpResponse.json([
      {
        name: "Chocolate",
        imagePath: "/images/chocolate.png",
      },
      {
        name: "Vanilla",
        imagePath: "/images/vanilla.png",
      },
    ]);
  }),
  http.get("http://localhost:3030/toppings", () => {
    return HttpResponse.json([
      {
        name: "Cherries",
        imagePath: "/images/cherries.png",
      },
      {
        name: "M&Ms",
        imagePath: "/images/m-and-ms.png",
      },
      {
        name: "Hot fudge",
        imagePath: "/images/hot-fudge.png",
      },
    ]);
  }),
  http.post("http://localhost:3030/order", async () => {
    // MSW의 속도가 너무 빨라서 응답을 순식간에 반환하기 때문에, 400ms의 딜레이를 추가한다. 로딩 스피너를 테스트하기 위함
    await delay(400);
    return HttpResponse.json({ orderNumber: 7777 }, { status: 201 });
  }),
];
