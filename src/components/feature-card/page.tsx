interface IFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: IFeatureCardProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 bg-accent rounded-full p-2 w-fit">{icon}</div>
      <div className="flex flex-col gap-3">
        <h3 className="text-base font-medium">{title}</h3>
        <p className="text-sm text-neutral-600 max-w-64">{description}</p>
      </div>
    </div>
  );
}
