interface renderCondition {
    condition: boolean;
}
function renderConditionally<T>(Component: React.ComponentType<T | Omit<T & renderCondition, keyof renderCondition>>) {
    return function (props: T & renderCondition) {
        const { condition: isVisible, ...newProps } = props;

        return props.condition ? <Component {...newProps} /> : null;
    };
}

export default renderConditionally;
