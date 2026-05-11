import { Fragment } from "react";
import { Link, useMatches } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbLink,
} from "@/shared/components/shadcn/breadcrumb";

import capitalize from "@/shared/utils/capitalize";

const AppBreadCrumb = () => {
  const matches = useMatches();

  const crumbs = matches
    .filter(
      (match) => match.staticData?.breadcrumb || match.staticData?.breadcrumbFn,
    )
    .map((match) => {
      const label = match.staticData.breadcrumbFn
        ? match.staticData.breadcrumbFn(match)
        : match.staticData.breadcrumb!;

      return {
        label: label,
        path: match.pathname,
      };
    });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb, index) => (
          <Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-base/tight" asChild>
                <Link to={crumb.path}>
                  {crumb.label ? capitalize(crumb.label) : "Unknown"}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {index < crumbs.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export { AppBreadCrumb };
