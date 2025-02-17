import React, {PropsWithChildren, ReactElement, ReactNode, useMemo} from "react";

export const useChildTraversal = (
  children: ReactNode,
  TargetComponent: React.FC,
  ReplacementComponent: React.FC,
): ReactNode => {
  const traverseChildren = (children: ReactNode): ReactNode => {
    return React.Children.map(children, (child: ReactNode) => {
      // @ts-ignore
      const {props}: PropsWithChildren = child;

      // If the child has its own children, recursively traverse them
      if (React.isValidElement(child) && props.children) {
        return React.cloneElement(child as ReactElement<any>, {
          children: traverseChildren(props.children),
        });
      }

      // Only call replacement logic for valid React elements
      if (React.isValidElement(child)) {
        if (child.type === TargetComponent) {
          return <ReplacementComponent />;
        }
      }

      return child;
    });
  };

  return useMemo(
    () => traverseChildren(children),
    [children, TargetComponent, ReplacementComponent],
  );
};
