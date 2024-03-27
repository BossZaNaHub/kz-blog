"use client";

import ProgressBar from "@/components/ProgressBar";
import { useEffect, useState } from "react";
import { silkscreen } from "../font";
import { LuFacebook, LuLinkedin, LuDog } from "react-icons/lu";
import Loading from "@/components/Loading";
import Image from "next/legacy/image";

const Page = () => {
  const [fakeLoading, setFakeLoading] = useState<boolean>(true);
  const [skills] = useState<{ skill: string; percent: number; image: string }[]>([
    { skill: "Golang", percent: 90, image: "contact/golang_200x200.jpeg" },
    { skill: "RUBY on RAILS", percent: 50, image: "contact/typescript_200x200.jpeg" },
    { skill: "React / Native", percent: 60, image: "contact/ror_200x200.jpeg" },
    { skill: "Javascript / Typescript", percent: 75, image: "contact/react_200x200.jpeg" },
    { skill: "Kafka", percent: 75, image: "contact/kafka_200x200.jpeg" },
    { skill: "RabbitMQ", percent: 75, image: "contact/rabbitmq_200x200.jpeg" },
  ]);
  const [otherSkills] = useState<string[]>([
    "DBMS [SQL]",
    "NoSQL",
    "GraphQL",
    "Message Queue [KAFKA, RABBITMQ]",
    "CI/CD [Jenkins, TeamCity]",
    "K8S",
    "Cloud Services [Digital Ocean, AWS]",
  ]);

  useEffect(() => {
    setTimeout(() => {
      setFakeLoading(false);
    }, 1000);
  });

  const _renderSkill = () => {
    return (
      <div className="py-5">
        <h2 className="text-2xl">PROGRAMMING SKILL - 番組編成</h2>
        <div className="flex py-5">
          {skills.map((v, i) => {
            return (
              <div className="flex" key={i}>
                <Image className="flex w-16 flex-1" src={v.image} width={50} height={50} alt={v.skill} unoptimized />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // const _renderOtherSkill = () => {
  //   return (
  //     <div>
  //       <h1 className="my-2 text-2xl">Other Skill</h1>
  //       <ul className="list-disc">
  //         {otherSkills.map((v, i) => {
  //           return (
  //             <li className="py-2" key={i}>
  //               {v}
  //             </li>
  //           );
  //         })}
  //       </ul>
  //     </div>
  //   );
  // };

  const _renderPosition = () => {
    return (
      <div className="">
        <h2 className="text-3xl">FULLSTACK DEVELOPER</h2>
      </div>
    );
  };

  const _renderProfile = () => {
    return (
      <div className="py-5">
        {/* <h2 className="text-primary py-1 text-3xl">SUCHATCHAI METHWARANONT [BOSS]</h2>
        <h2 className="text-primary py-1 text-3xl">メッタワラノン スチャッチャイ [ボース]</h2> */}
        <h2 className={`text-primary py-1 text-2xl ${silkscreen.className}`}>
          KuroshibaZ <LuDog className="inline-flex" /> （黒柴）
        </h2>
      </div>
    );
  };

  const _renderEducation = () => {
    return (
      <div className="py-5">
        <h2 className="text-2xl">Education - 養成</h2>
        <p className="py1 text-xl">
          Thai-Nichi Institute of Technology 泰日工業大学 - Bachelor Degree of Computer Engineering
        </p>
        <p className="py1 text-xl">Lasalle School Bangkok - Math and Science</p>
        {_renderResource()}
      </div>
    );
  };

  const _renderExperience = () => {
    return (
      <div className="py-5">
        <h2 className="text-2xl">Experience - 経験</h2>
        <div className="py-2">
          <span className="font-bold">2021 - 2023 Athena Web Developer</span> &nbsp; [Software Developer]
        </div>
        <div className="py-2">
          <span className="font-bold">2020 - 2021 Forms Syntron Thailand</span> &nbsp; [Backend Developer]
        </div>
        <div className="py-2">
          <span className="font-bold">2018 - 2020 Cotactic Media</span> &nbsp; [Fullstack Developer]
        </div>
        <div className="py-2">
          <span className="font-bold">2015 - 2016 Orisma Technology</span> &nbsp; [Web Programmer]
        </div>
      </div>
    );
  };

  const _renderContact = () => {
    return (
      <div className="py-5">
        <h2 className="text-2xl">Contact - 接触</h2>
        <div className="my-2">
          <a href="https://www.facebook.com/Bosszanahub" target="_blank" className="text-xl hover:text-gray-300">
            <LuFacebook className="inline-flex" />
            &nbsp;<span className={`underline underline-offset-2 ${silkscreen.className}`}>LINK</span>
          </a>
        </div>
        <div className="my-2">
          <a
            href="https://www.linkedin.com/in/suchatchai-methwaranont"
            target="_blank"
            className="text-xl hover:text-gray-300"
          >
            <LuLinkedin className="inline-flex" />
            &nbsp; <span className={`underline underline-offset-2 ${silkscreen.className}`}>LINK</span>
          </a>
        </div>
      </div>
    );
  };

  const _renderResource = () => {
    return (
      <div>
        <a className={`text-xl underline underline-offset-2 hover:text-gray-300 ${silkscreen.className}`} href="/blog">
          More about me
        </a>
      </div>
    );
  };

  return (
    <Loading loading={fakeLoading}>
      <div className="relative z-0 w-full p-5">
        {_renderProfile()}
        {_renderPosition()}
        {_renderSkill()}
        {/* {_renderOtherSkill()} */}
        {_renderEducation()}
        {_renderExperience()}
        {_renderContact()}
      </div>
    </Loading>
  );
};

export default Page;
