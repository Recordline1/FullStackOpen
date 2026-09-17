// 'use client';

import { useEffect, useState } from "react";

export function HeaderTimer() {
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setTime(new Date());
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const baseClasses = "inline-flex items-center gap-2 text-blue-500";
    const timeClasses = "font-bold text-gray-900 tabular-nums";

    const hour = time?.getHours().toString().padStart(2, "0") ?? "00";
    const minute = time?.getMinutes().toString().padStart(2, "0") ?? "00";
    const second = time?.getSeconds().toString().padStart(2, "0") ?? "00";

    const text = (time?.getHours() ?? 0) >= 12 ? "Good Afternoon" : "Good Morning";

    return (
        <span className={baseClasses}>
            <span>{text}</span>
          
            <span 
                className={`${timeClasses} ${!time ? 'invisible' : ''}`} 
                suppressHydrationWarning
            >
                {`${hour}:${minute}:${second}`}
            </span>
        </span>
    );
}