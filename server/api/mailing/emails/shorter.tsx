import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
  Font,
} from "@react-email/components";
import * as React from "react";
import fs from "fs";

function simplifyUrl(originalUrl) {
  const url = new URL(originalUrl);
  let simplifiedUrl = url.host;
  return simplifiedUrl;
}

const dataJson = JSON.parse(fs.readFileSync("email_data.json", "utf8"));
interface ShorterProps {
  message: string;
  data: { title: string; text: string; link: string; date: string }[];
}

export const ShortEmail = ({
  message = dataJson.message,
  data = dataJson.data,
}: ShorterProps) => {
  const previewText = "Digest новостей за эту неделю";
  message =  `На этой неделе мы собрали для вас самые интересные новости. Читайте: \n ${message}`
  return (
    <Html>
      <Font
        fontFamily="Montserrat"
        fallbackFontFamily="Verdana"
        webFont={{
          url: "https://github.com/JulietaUla/Montserrat/blob/master/fonts/webfonts/Montserrat-Regular.woff",
          format: "woff2",
        }}
        fontWeight={400}
        fontStyle="normal"
      />
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-background my-auto mx-auto font-sans px-2 relative my-1  ">
          <Container className="border border-solid border-black rounded-xl p-[20px] ">
            <Heading style={{}}>Digest новостей за эту неделю</Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              {message}
            </Text>
            <Hr />
            <Container width={"100%"}>
              <Heading>Топ 20 новостей</Heading>
              <Container width={"100%"}>
                {data.map((item, i) => {
                  if (i > 20) return null;
                  return (
                    <Container
                      id={i.toString()}
                      className=" rounded-xl p-3 mb-3 border border-solid border-[#abb4b2] "
                      style={{ width: "100%" }}
                      key={item.title}
                    >
                      <Text className="text-xl font-bold mt-0 mb-2" id="23sdfa">
                        {item.title}
                      </Text>
                      <Text className="my-0">{item.text}</Text>
                      <Hr />
                      <Row>
                        <Column className=" ">
                          <Link
                            href={item.link}
                            className="text-[14px] text-[#0070f3]"
                          >
                            {simplifyUrl(item.link)}
                          </Link>
                        </Column>
                        <Column>
                          <Text className="text-stone-500 my-0">
                            {item.date}
                          </Text>
                        </Column>
                      </Row>
                    </Container>
                  );
                })}
              </Container>
            </Container>
            <Text>
              Сделано с ❤️ в <span className="text-blue-400">Shorter!</span>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};


export default ShortEmail;
