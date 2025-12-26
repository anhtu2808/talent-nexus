import { Construction } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage = ({ title }: PlaceholderPageProps) => {
  return (
    <div className="bg-white rounded-xl border border-border p-8 text-center shadow-sm h-full flex flex-col items-center justify-center min-h-[400px]">
      <div className="bg-muted p-4 rounded-full mb-4">
        <Construction className="h-10 w-10 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
      <p className="text-muted-foreground max-w-md">
        This feature is currently under development. Please check back later.
      </p>
    </div>
  );
};

export default PlaceholderPage;
