import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ClipboardCopy } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { $getComponents } from "@/server/functions/components";

const REGISTRY_URL =
  import.meta.env.VITE_REGISTRY_URL ?? "https://registry.sedrino.com";

export const Route = createFileRoute("/_main/")({
  component: RouteComponent,
});

function RouteComponent() {
  const components = useQuery({
    queryKey: ["components"],
    queryFn: () => $getComponents(),
  });

  const [packageManager, setPackageManager] = React.useState<
    "pnpm" | "npm" | "yarn" | "bun"
  >("pnpm");

  const getInstallCommand = (name: string) => {
    const commands = {
      pnpm: `pnpm dlx shadcn@latest add ${REGISTRY_URL}/r/${name}.json`,
      npm: `npx shadcn@latest add ${REGISTRY_URL}/r/${name}.json`,
      yarn: `yarn dlx shadcn@latest add ${REGISTRY_URL}/r/${name}.json`,
      bun: `bunx --bun shadcn@latest add ${REGISTRY_URL}/r/${name}.json`,
    };
    return commands[packageManager];
  };

  const handleCopyHookCommand = () => {
    const hookCommand = getInstallCommand("hooks-use-app-form");
    navigator.clipboard.writeText(hookCommand);
    toast.success("Install command copied to clipboard");
  };

  return (
    <div className="container space-y-10 py-12">
      <div className="flex flex-col items-center space-y-4 text-center">
        <h1 className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent">
          Sedrino Components
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          A registry of high-quality components for TanStack, Tailwind CSS, and
          shadcn/ui by Sedrino Labs, Inc.
        </p>
        <div className="mt-4 rounded-lg border bg-card p-4 shadow-sm">
          <p className="mb-2 text-sm">
            <strong>Pro Tip:</strong> The{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              hooks-use-app-form
            </code>{" "}
            includes all form components as dependencies. Install it to get
            everything at once:
          </p>
          <div className="flex flex-col gap-2">
            <Tabs
              value={packageManager}
              onValueChange={(value) =>
                setPackageManager(value as typeof packageManager)
              }
              className="w-full"
            >
              <div className="flex items-center justify-between border-b border-muted bg-muted/20 px-3 py-1">
                <TabsList className="h-8 bg-transparent">
                  <TabsTrigger
                    value="pnpm"
                    className="rounded-none border-b-2 border-transparent bg-transparent px-3 py-1.5 font-mono text-sm data-[state=active]:border-b-primary data-[state=active]:bg-transparent"
                  >
                    pnpm
                  </TabsTrigger>
                  <TabsTrigger
                    value="npm"
                    className="rounded-none border-b-2 border-transparent bg-transparent px-3 py-1.5 font-mono text-sm data-[state=active]:border-b-primary data-[state=active]:bg-transparent"
                  >
                    npm
                  </TabsTrigger>
                  <TabsTrigger
                    value="yarn"
                    className="rounded-none border-b-2 border-transparent bg-transparent px-3 py-1.5 font-mono text-sm data-[state=active]:border-b-primary data-[state=active]:bg-transparent"
                  >
                    yarn
                  </TabsTrigger>
                  <TabsTrigger
                    value="bun"
                    className="rounded-none border-b-2 border-transparent bg-transparent px-3 py-1.5 font-mono text-sm data-[state=active]:border-b-primary data-[state=active]:bg-transparent"
                  >
                    bun
                  </TabsTrigger>
                </TabsList>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <code className="flex-1 overflow-x-auto rounded-lg bg-muted/50 px-4 py-3 font-mono text-sm">
                  {getInstallCommand("hooks-use-app-form")}
                </code>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex flex-shrink-0 items-center gap-2 transition-colors hover:bg-primary/5"
                  onClick={handleCopyHookCommand}
                >
                  <ClipboardCopy className="h-4 w-4" />
                  Copy
                </Button>
              </div>
            </Tabs>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-semibold">Component Overview</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Form Components</h3>
            <p className="text-muted-foreground">
              Our form components are organized in two key directories:
              <code className="mx-1 rounded bg-muted px-1 py-0.5 text-xs">
                app/components/form
              </code>
              contains enhanced wrappers around shadcn components with added
              type safety (like SelectField supporting null and number values),
              while
              <code className="mx-1 rounded bg-muted px-1 py-0.5 text-xs">
                app/components/form-fields
              </code>
              provides components specifically designed for TanStack Form
              integration through our useAppForm hook.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Usage</h3>
            <p className="text-muted-foreground">
              All components are designed to work seamlessly with the{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">
                useAppForm
              </code>{" "}
              hook, which provides a consistent API for form state management,
              validation, and submission. This two-layer approach gives you both
              standalone form components and integrated form field components
              that leverage TanStack Form's powerful features. Check out the
              examples in the navigation to see them in action.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {components.data?.map((item) => (
          <RegistryItem
            key={item.name}
            name={item.name}
            description={item.description}
            packageManager={packageManager}
            getInstallCommand={getInstallCommand}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        <ComponentCard
          title="Form Components"
          description="Type-safe form components built with TanStack Form and React Hook Form."
          className="border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5"
        />
      </div>
    </div>
  );
}

function ComponentCard({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md",
        className,
      )}
    >
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

function RegistryItem({
  name,
  description,
  packageManager,
  getInstallCommand,
}: {
  name: string;
  description: string;
  packageManager: string;
  getInstallCommand: (name: string) => string;
}) {
  const installCommand = getInstallCommand(name);

  const handleCopy = () => {
    navigator.clipboard.writeText(installCommand);
    toast.success("Install command copied to clipboard");
  };

  return (
    <Card className="group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-col p-6 md:flex-row md:items-center md:gap-6">
        <div className="flex-shrink-0 text-center md:w-72 md:text-left">
          <h3 className="mb-1 text-xl font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="mt-4 flex flex-1 items-center gap-4 md:mt-0">
          <code className="flex-1 overflow-x-auto rounded-lg bg-muted/50 px-4 py-2 font-mono text-sm">
            {installCommand}
          </code>
          <Button
            variant="outline"
            size="sm"
            className="flex flex-shrink-0 items-center gap-2 transition-colors group-hover:bg-primary/5"
            onClick={handleCopy}
          >
            <ClipboardCopy className="h-4 w-4" />
            Copy
          </Button>
        </div>
      </div>
    </Card>
  );
}
