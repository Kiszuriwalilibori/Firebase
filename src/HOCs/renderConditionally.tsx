interface renderCondition {
  renderCondition: boolean;
}
function renderWhenIsVisible<T>(Component: React.ComponentType<T | Omit<T & renderCondition, keyof renderCondition>>) {
  return function (props: T & renderCondition) {
    const { renderCondition: isVisible, ...newProps } = props;

    return props.renderCondition ? <Component {...newProps} /> : null;
  };
}

export default renderWhenIsVisible;
