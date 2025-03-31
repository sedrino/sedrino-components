import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/_main")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <div className="bg-sidebar-primary px-4 py-3 text-center text-sidebar-primary-foreground">
        <div className="container mx-auto">
          <p className="flex items-center justify-center gap-2 text-sm font-medium">
            <span>
              Love these components? Generate full-stack TanStack webapps in
              less than an hour with Sedrino.
            </span>
            <a
              href="https://sedrino.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 underline underline-offset-2 hover:opacity-90"
            >
              Learn more
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </p>
        </div>
      </div>
      <nav className="p-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <ul className="flex items-center space-x-6">
            <li>
              <Link
                to="/"
                className="font-medium text-primary transition-colors hover:text-primary/80"
              >
                Setup
              </Link>
            </li>
            <li>
              <Link
                to="/form-example"
                className="font-medium text-primary transition-colors hover:text-primary/80"
              >
                Form Example
              </Link>
            </li>
            <li>
              <Link
                to="/form-time-example"
                className="font-medium text-primary transition-colors hover:text-primary/80"
              >
                Time Form Example
              </Link>
            </li>
          </ul>
          <a
            href="https://github.com/sedrino/sedrino-components"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-foreground transition-colors hover:text-primary"
          >
            <img src="/github-logo.svg" alt="GitHub" className="h-5 w-5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
