'use client'


import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import React from "react";
import styles from "./page.module.scss";
import CardLogin from "@/components/CardLogin";

function LoginContent() {
    const searchParams = useSearchParams()
    const slug = searchParams.get('id')?.toString() as string;

    return (
        <div className={styles.page}>
            <CardLogin path={slug ?? ""}/>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <LoginContent />
        </Suspense>
    );
}
