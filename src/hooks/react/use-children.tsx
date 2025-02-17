import React, {ReactElement, useMemo} from "react";

export function useChildren<PropList>(
  children: ReactElement | ReactElement[] | string,
  component: any,
): ReactElement<PropList>[] {
  return useMemo(() => {
    return React.Children.toArray(children).filter((child: ReactElement) => {
      return child.type === component;
    });
  }, [children]) as ReactElement<PropList>[];
}
