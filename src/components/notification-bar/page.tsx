import Link from "next/link";

interface INotificationBarProps {
  text: string;
  link: {
    text: string;
    href: string;
  };
}

export default function NotificationBar({ text, link }: INotificationBarProps) {
  return (
    <div className="flex justify-center items-center py-2 bg-primary text-primary-foreground text-sm">
      <div className="flex items-center gap-2 blink">
        <h3>{text}</h3>
        {link && (
          <Link href={link.href} className="font-bold">
            {link.text}
          </Link>
        )}
      </div>
    </div>
  );
}
