import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Plans } from '../constants';
import { ArrowRightIcon, CheckIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn, formatPrice } from '@/lib/utils';

type PlanSummaryProps = {
  plan: Plans;
};

export const PlanSummaryCard = ({ plan }: PlanSummaryProps) => {
  const planIsPro = plan.name === 'Plano Avançado';

  return (
    <Card
      className={cn(
        'w-full h-full flex flex-col rounded-xl border-2 shadow-none bg-card text-card-foreground',
        planIsPro ? 'border-primary' : 'border-border',
      )}
    >
      <CardHeader>
        <CardTitle className="text-foreground">{plan.name}</CardTitle>
        <CardDescription className="text-muted-foreground">
          {plan.info}
        </CardDescription>
        <h5 className="text-3xl md:text-4xl font-semibold font-heading pt-2 text-foreground">
          {formatPrice(plan.price)}
        </h5>
      </CardHeader>

      <CardContent className="w-full">
        <ul className="flex flex-col items-start gap-4">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-foreground">
              <CheckIcon
                className={cn(
                  'w-5 h-5',
                  planIsPro ? 'text-primary' : 'text-foreground',
                )}
              />
              {feature.text}
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="mt-auto w-full">
        <Button asChild variant={planIsPro ? 'default' : 'secondary'}>
          <Link href={plan.btn.href} className="flex items-center w-full group">
            {plan.btn.text}
            <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-all" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
