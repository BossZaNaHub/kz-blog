"use client"

import ProgressBar from "@/components/ProgressBar"
import { useState } from "react"
import { silkscreen } from "../font"
import { DiRuby, DiNodejs } from "react-icons/di"
import { LuFacebook, LuLinkedin, LuDog } from "react-icons/lu"

const Page = () => {
    const [skills, setSkills] = useState<{skill: string, percent: number}[]>([
        {skill: 'Golang', percent: 90}, 
        {skill:'RUBY on RAILS', percent: 50}, 
        {skill:'React / Native', percent: 60}, 
        {skill:'Javascript / Typescript', percent: 75}
    ])
    const [otherSkills, setOtherSkills] = useState<string[]>([
        'DBMS [SQL]', 'NoSQL', 'GraphQL', 'Message Queue [KAFKA, RABBITMQ]', 'CI/CD [Jenkins, TeamCity]',
        'K8S', 'Cloud Services [Digital Ocean, AWS]'
    ])

    const _renderSkill = () => {
        return (
            <div>
                <h2 className="text-2xl">Skill</h2>
                {skills.map((v, i) => {
                    return (
                        <div className={silkscreen.className} key={i}>
                            <span>{v.skill}</span>
                            <ProgressBar currentProgress={v.percent} progressBarStartToEndRGBColor={['12, 19, 79, 1', '29, 38, 125, 0.8']} animationSpeed={2.0} />
                        </div>
                    )
                })}
            </div>
        )
    }

    const _renderOtherSkill = () => {
        return (
            <div>
                <h1 className="text-2xl my-2">Other Skill</h1>
                <ul className="list-disc">
                {otherSkills.map((v, i) => {
                    return (
                        <li className="py-2" key={i}>{v}</li>
                    )
                })}
                </ul>
            </div>
        )
    }

    const _renderPosition = () => {
        return (
            <div>
                <h2 className="text-3xl">fullstack developer</h2>
                {/* <p>Some Caption</p> */}
            </div>
        )
    }

    const _renderProfile = () => {
        return (
            <div className="py-5">
                <h2 className="text-3xl text-primary">SUCHATCHAI METHWARANONT</h2>
                <span className={`text-2xl text-primary ${silkscreen.className}`}>(BOSS) <LuDog className="inline-flex"/> (KUROSHIBAZ)</span>
            </div>
        )
    }

    const _renderEducation = () => {
        return (
            <div>
                <h2 className="text-2xl">Education</h2>
                <span>
                Thai-Nichi Institute of Technology - Bachelor Degree of 
                Computer Engineering
                Lasalle School Bangkok - Math and Science 
                </span>
            </div>
        )
    }

    const _renderExperience = () => {
        return (
            <div>
                <h2 className="text-2xl">Experience</h2>
                <div className="py-2">
                    <span className="font-bold">2021 - 2023  Athena Web Developer</span> &nbsp;
                    [Software Developer]
                </div>
                <div className="py-2">
                    <span className="font-bold">2020 - 2021  Forms Syntron Thailand</span> &nbsp;
                    [Backend Developer]
                </div>
                <div className="py-2">
                    <span className="font-bold">2018 - 2020  Cotactic Media</span> &nbsp;
                    [Fullstack Developer]
                </div>
                <div className="py-2">
                    <span className="font-bold">2015 - 2016  Orisma Technology</span> &nbsp;
                    [Web Programmer]
                </div>
            </div>
        )
    }

    const _renderContact = () => {
        return (
            <div>
                <h2 className="text-2xl">Contact</h2>
                <div className="my-2">
                    <a href="https://www.facebook.com/Bosszanahub" target="_blank"><LuFacebook className="inline-flex" />&nbsp;<span className="underline">BossZaNaHub</span></a>
                </div>
                <div className="my-2">
                    <a href="https://www.linkedin.com/in/suchatchai-methwaranont" target="_blank"><LuLinkedin className="inline-flex" />&nbsp; <span className="underline">Suchatchai Methwaranont</span></a>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full p-5 relative z-0">
            {_renderProfile()}
            <div className="md:flex py-3">
                <div className="w-full md:w-1/3"></div>
                <div className="w-full md:w-2/3 md:px-10">
                    {_renderPosition()}
                </div>
            </div>
            <div className="md:flex py-3">
                <div className="w-full md:w-1/3 order-2 md:order-1">
                    {_renderSkill()}
                    {_renderOtherSkill()}
                </div>
                <div className="w-full md:w-2/3 order-1 md:order-2 md:px-10">
                    {_renderEducation()}
                    {_renderExperience()}
                    {_renderContact()}
                </div>
            </div>
        </div>
    )
}

export default Page