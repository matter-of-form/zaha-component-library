import { FC, Fragment } from "react";
import { ModuleBase, Box, Stack, Text } from "../../components";
import {
  breadcrumbs,
  breadcrumbsItem,
  breadcrumbsWrapper,
  separator,
} from "./BreadcrumbsModule.styles";

const BreadcrumbsModule: FC<any> = ({
  data,
  textStyles,
  moduleAnims,
  ...props
}) => {
  if (!data) return null;

  const renderCrumbs = data.crumbs.map((crumb: any, index: number) =>
    crumb.href ? (
      <Fragment key={`breadcrumb-item-${index}`}>
        <Text
          link={crumb}
          {...breadcrumbsItem(textStyles?.breadcrumbItem, moduleAnims?.item)}
        />
        <Text
          text={"/"}
          {...separator(textStyles?.breadcrumbItem, moduleAnims?.item)}
        />
      </Fragment>
    ) : (
      <Text
        key={`breadcrumb-current-${index}`}
        text={crumb.text}
        {...breadcrumbsItem(
          textStyles?.breadcrumbItem,
          moduleAnims?.item,
          true,
        )}
      />
    ),
  );

  return (
    // `breadcrumbs(props)` only keeps className, so spread the remaining props
    // first — that is what lets a consumer put attributes such as
    // role="navigation" / aria-label on the module's root element.
    <ModuleBase
      data={data}
      {...props}
      {...breadcrumbs(props)}
      {...moduleAnims?.module}
    >
      <Box variant="container" {...moduleAnims?.breadcrumbs}>
        <Stack {...breadcrumbsWrapper}>{renderCrumbs}</Stack>
      </Box>
    </ModuleBase>
  );
};

export default BreadcrumbsModule;
