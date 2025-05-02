import {
    type ComponentType,
    createElement,
    forwardRef,
    Suspense,
    type SuspenseProps
  } from "react";
  
  export function withSuspense<Props extends object>(
    component: ComponentType<Props>,
    suspenseProps: SuspenseProps & {
      FallbackComponent?: ComponentType;
    }
  ) {
    const Wrapped = forwardRef<Props, Props>(
      (props, ref) =>
        createElement(
          Suspense,
          {
            fallback:
              suspenseProps.fallback ??
              (suspenseProps.FallbackComponent &&
                createElement(suspenseProps.FallbackComponent))
          },
          createElement(component, { ...props, ref } as Props)
        )
    );
  
    const name = component.displayName ?? component.name ?? "Unknown";
    Wrapped.displayName = `withSuspense(${name})`;
  
    return Wrapped;
  }
  