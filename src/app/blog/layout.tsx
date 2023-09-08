import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'KuroshibaZ | Share Blog',
}

export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (<>{children}</>)
}