import React, {ReactElement, useMemo} from "react";

export function useChild(
  children: ReactElement | ReactElement[] | string,
  component: any | any[],
) {
  if (!Array.isArray(component)) {
    component = [component];
  }

  return useMemo(() => {
    return React.Children.toArray(children).find((child: ReactElement) => {
      return component.includes(child.type);
    });
  }, [children]);
}
