import React, {ReactElement, ReactNode, useMemo} from "react";

export function useChild(
  children: ReactNode,
  component: any | any[],
): ReactElement | undefined {
  if (!Array.isArray(component)) {
    component = [component];
  }

  return useMemo(() => {
    return React.Children.toArray(children).find((child: ReactElement) => {
      console.log("Searching", child.type, component);

      return component.includes(child.type);
    });
  }, [children]) as ReactElement | undefined;
}
