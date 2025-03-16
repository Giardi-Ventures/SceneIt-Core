import React, {ReactElement, ReactNode, useMemo} from "react";

export function useChildren<PropList>(
  children: ReactNode,
  component: any,
): ReactElement<PropList>[] {
  return useMemo(() => {
    return React.Children.toArray(children).filter((child: ReactElement) => {
      return child.type === component;
    });
  }, [children]) as ReactElement<PropList>[];
}
