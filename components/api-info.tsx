import { Copy, Server } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ApiInfoProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiInfoProps["variant"], string> = {
  public: "Public API",
  admin: "Admin API",
};

const variantMap: Record<ApiInfoProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

export const ApiInfo: React.FC<ApiInfoProps> = ({
  title,
  description,
  variant,
}) => {
  const onCopy = (description: string) => {
    navigator.clipboard.writeText(description);
    toast.success("Copied Api description");
  };
  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-3">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] text-sm font-semibold font-mono">
          {description}
        </code>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onCopy(description)}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
