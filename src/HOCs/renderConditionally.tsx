interface renderCondition {
  renderCondition?: boolean;
}

function renderConditionally<T>(Component: React.ComponentType<React.PropsWithChildren<T>>) {
  return function (props: Partial<renderCondition & React.PropsWithChildren<T>>) {
    const { renderCondition: isVisible, ...newProps } = props;

    return props.renderCondition ? <Component {...(newProps as unknown as React.PropsWithChildren<T>)} /> : null;
  };
}

export default renderConditionally;
