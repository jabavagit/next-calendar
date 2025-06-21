"use client";
import { useEffect } from "react";
import { onConnectionChange } from "@/utils/syncManager";

export default function ConnectionListener() {
    useEffect(() => {
        onConnectionChange();
    }, []);
    return null;
}