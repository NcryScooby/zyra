import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IBannerProps {
  title: string;
  description: string;
  image: string;
  action?: {
    text: string;
    href: string;
  };
  className?: string;
}

export default function Banner({ title, description, image, action, className }: IBannerProps) {
  return (
    <section className={cn('flex justify-center items-center bg-accent', className)}>
      <div className="flex items-center gap-48 max-w-7xl mx-auto">
        <div className="flex flex-col gap-12 justify-center">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="text-base text-neutral-600">{description}</p>
          </div>
          {action && (
            <Button variant="default" className="bg-primary w-fit" asChild size="lg">
              <Link href={action.href}>
                {action.text}
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </Button>
          )}
        </div>
        <Image className="pt-16 w-auto" src={image} alt="Banner Novos Produtos" width={300} height={300} priority />
      </div>
    </section>
  );
}
