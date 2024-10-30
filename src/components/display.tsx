import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export type DisplayElementProps = {
  id: string;
  defaults?: Record<string, unknown> | undefined;
};

export type DisplayProps = {
  id: string;
  title: string;
  description: string;
  render: (props: DisplayElementProps) => JSX.Element;
  defaults?: Record<string, unknown> | undefined;
};

export const Display = ({
  id,
  title,
  description,
  render,
  defaults,
}: DisplayProps) => {
  return (
    <Card className="h-40">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form>{render({ id, defaults })}</form>
      </CardContent>
    </Card>
  );
};
