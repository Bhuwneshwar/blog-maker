// useTextState.js
// import { useState } from 'react';
//
// export function useTextState(initialValue = '') {
//   const [text, setText] = useState(initialValue);
//
//   const setTextValue = (newValue) => setText(newValue);
//
//   return { text, setText, setTextValue };
// }

// useUndoRedo.js
import { useRef } from "react";

export function useUndoRedo(maxSize = 20) {
    const history = useRef([]);
    const pointer = useRef(0);

    const pushState = newState => {
        if (history.current.length >= 20) {
            history.current.shift(); // Remove the oldest entry
        }
        history.current.push(newState);
        pointer.current = history.current.length - 1;
    };

    const undo = () => {
        if (pointer.current > 0) {
            pointer.current--;
            return history.current[pointer.current];
        }
        return null;
    };

    const redo = () => {
        if (pointer.current < history.current.length - 1) {
            pointer.current++;
            return history.current[pointer.current];
        }
        return null;
    };

    return { history, pushState, undo, redo };
}
