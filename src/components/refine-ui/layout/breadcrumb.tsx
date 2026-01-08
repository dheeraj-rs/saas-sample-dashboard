import {
  Breadcrumb as ShadcnBreadcrumb,
  BreadcrumbItem as ShadcnBreadcrumbItem,
  BreadcrumbLink as ShadcnBreadcrumbLink,
  BreadcrumbList as ShadcnBreadcrumbList,
  BreadcrumbPage as ShadcnBreadcrumbPage,
  BreadcrumbSeparator as ShadcnBreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  matchResourceFromRoute,
  useBreadcrumb,
  useLink,
  useResourceParams,
} from "@refinedev/core";
import { Home } from "lucide-react";
import { Fragment, useMemo } from "react";

export function Breadcrumb({ homePath }: { homePath?: string }) {
  const Link = useLink();
  const { breadcrumbs } = useBreadcrumb();
  const { resources } = useResourceParams();
  const rootRouteResource = matchResourceFromRoute("/", resources);

  const breadCrumbItems = useMemo(() => {
    const list: {
      key: string;
      href: string;
      icon?: React.ReactNode;
      label: React.ReactNode;
    }[] = [];

    const homeHref = homePath ?? rootRouteResource.matchedRoute ?? "/";

    // Only add home icon (no label)
    list.push({
      key: "breadcrumb-item-home",
      href: homeHref,
      icon: rootRouteResource?.resource?.meta?.icon ?? <Home className="h-4 w-4" />,
      label: "Home",
    });

    // Only add the last breadcrumb item (current page), skip intermediate levels
    if (breadcrumbs.length > 0) {
      const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1];
      list.push({
        key: `breadcrumb-item-${lastBreadcrumb.label}`,
        href: lastBreadcrumb.href ?? "",
        label: lastBreadcrumb.label,
      });
    }

    return list;
  }, [breadcrumbs, homePath, rootRouteResource]);

  // Don't render breadcrumb if we're on the home page
  // Check if the last breadcrumb's href matches the homePath
  if (breadcrumbs.length > 0) {
    const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1];
    const homeHref = homePath ?? rootRouteResource.matchedRoute ?? "/";

    // If current page is the home page, don't show breadcrumb
    if (lastBreadcrumb.href === homeHref) {
      return null;
    }
  }

  // Also don't render if there are no breadcrumbs (shouldn't happen, but safe check)
  if (breadCrumbItems.length <= 1) {
    return null;
  }

  return (
    <ShadcnBreadcrumb>
      <ShadcnBreadcrumbList>
        {breadCrumbItems.map((item, index) => {
          const isLast = index === breadCrumbItems.length - 1;

          if (isLast) {
            return (
              <ShadcnBreadcrumbItem key={item.key}>
                <ShadcnBreadcrumbPage className="font-semibold">
                  {item.label}
                </ShadcnBreadcrumbPage>
              </ShadcnBreadcrumbItem>
            );
          }

          return (
            <Fragment key={item.key}>
              <ShadcnBreadcrumbItem>
                <ShadcnBreadcrumbLink asChild>
                  <Link to={item.href}>
                    {item.icon ? (
                      <span className="flex items-center gap-2">
                        {item.icon}
                        <span className="sr-only">Home</span>
                      </span>
                    ) : (
                      item.label
                    )}
                  </Link>
                </ShadcnBreadcrumbLink>
              </ShadcnBreadcrumbItem>
              <ShadcnBreadcrumbSeparator />
            </Fragment>
          );
        })}
      </ShadcnBreadcrumbList>
    </ShadcnBreadcrumb>
  );
}

Breadcrumb.displayName = "Breadcrumb";
