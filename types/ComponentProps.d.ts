// https://github.com/primer/react/blob/75acf7a724a5e7db6eb7a9470b5d2c14611dfb12/packages/react/src/utils/types/ComponentProps.ts
/**
 * Extract a component's props
 *
 * Source: https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase#wrappingmirroring-a-component
 *
 * @example ComponentProps<typeof MyComponent>
 */
export type ComponentProps<T> =
  T extends React.ComponentType<React.PropsWithChildren<infer Props>>
    ? Props extends object
      ? Props
      : never
    : never;
