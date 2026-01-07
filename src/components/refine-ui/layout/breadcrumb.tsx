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

    list.push({
      key: "breadcrumb-item-home",
      href: homeHref,
      icon: rootRouteResource?.resource?.meta?.icon ?? <Home className="h-4 w-4" />,
      label: "Home",
    });

    for (const { label, href } of breadcrumbs) {
      list.push({
        key: `breadcrumb-item-${label}`,
        href: href ?? "",
        label: label,
      });
    }

    return list;
  }, [breadcrumbs, Link, rootRouteResource]);

  return (
    <ShadcnBreadcrumb>
      <ShadcnBreadcrumbList>
        {breadCrumbItems.map((item, index) => {
          const isLast = index === breadCrumbItems.length - 1;

          if (isLast) {
            return (
              <ShadcnBreadcrumbItem key={item.key}>
                <ShadcnBreadcrumbPage>
                  {item.icon ? (
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                  ) : (
                    item.label
                  )}
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
                        {index === 0 && <span className="sr-only">Home</span>}
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
