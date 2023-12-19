import { useCallback } from "react";
import debounce from "lodash/debounce";

const useDebouncedCallback = (fn: Function, args?: any): React.MouseEventHandler<HTMLElement | SVGSVGElement> => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const result = useCallback(
        debounce(() => {
            fn(args);
        }, 200),
        [fn, args]
    );
    return result;
};

export default useDebouncedCallback;
