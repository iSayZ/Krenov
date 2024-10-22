import React, { ReactElement } from 'react';

import { Card, CardHeader, CardContent } from '@/components/ui/card';

interface IndicatorCardProps {
  title: string;
  icon: ReactElement;
  value: number | string;
  analyze: string;
}

const IndicatorCard: React.FC<IndicatorCardProps> = ({
  title,
  icon,
  value,
  analyze,
}) => {
  return (
    <Card>
      <CardHeader className="flex w-full flex-row items-center justify-between gap-4 space-y-0">
        <p className="text-sm">{title}</p>
        {React.cloneElement(icon, {
          className: 'size-5 text-muted-foreground flex-none',
        })}
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-4xl font-bold">{value}</p>
        <p className="text-xs text-muted-foreground">{analyze}</p>
      </CardContent>
    </Card>
  );
};

export default IndicatorCard;
