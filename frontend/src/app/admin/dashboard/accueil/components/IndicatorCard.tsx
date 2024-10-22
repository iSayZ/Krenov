import { Card, CardHeader, CardContent } from "@/components/ui/card";
import React from "react";
import { ReactElement } from "react";

interface IndicatorCardProps {
    title: string;
    icon: ReactElement;
    value: number | string;
    analyze: string;
}

const IndicatorCard: React.FC<IndicatorCardProps> = ({ title, icon, value, analyze }) => {
    return (
        <Card>
            <CardHeader className='w-full flex flex-row justify-between items-center space-y-0 gap-4'>
                <p className='text-sm'>{title}</p>
                {React.cloneElement(icon, { className: 'size-5 text-muted-foreground flex-none' })}
            </CardHeader>
            <CardContent className='space-y-2'>
                <p className='text-4xl font-bold'>
                    {value}
                </p>
                <p className='text-muted-foreground text-xs'>
                    {analyze}
                </p>
            </CardContent>
        </Card>
    )
}

export default IndicatorCard;