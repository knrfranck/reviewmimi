import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type StatCardProps = {
  title: string;
  value: string;
  description: string;
};

export function StatCard({ title, value, description }: StatCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-3xl font-bold">{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
      </CardContent>
    </Card>
  );
}

export default StatCard;
