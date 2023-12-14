//import { useSelector, useDispatch } from "react-redux";
//import { updateComonOne, updateComonMany } from "./Redux/Slices/Comon";
//import useClipboard from "react-use-clipboard";
import React, { useEffect, useCallback } from "react";
import RenderUi from "./Components/RenderUi";
import { useGlobalContext } from "./ReduxV2";
import { useUndoRedo } from "./Utils/useUndoRedo";
const App = () => {
    const {
        multiDispatch,
        dispatch,
        store,
        Ui,
        isModel,
        htype,
        element,
        content,
        eleRef,
        title,
        copyBtnText,
        copyContent,
        Selected,
        UndoRedo,
        //  history,
        //pointer,
        url
    } = useGlobalContext();
    const { history, pushState, undo, redo } = useUndoRedo();

    // const { Ui, isModel, htype, links } = useSelector(state => state.comon);
    //     const dispatch = useDispatch();

    const parse = str => {
        try {
            return JSON.parse(str);
        } catch (error) {
            console.log({ error });
            return false;
        }
    };

    const selectOne = event => {
        const dataInfoValue = event.target.dataset.target;
        event.target.style.background = "var(--c5)";

        const item = parse(dataInfoValue);
        console.log({ item });
        if (item) {
            dispatch("isModel", true);
            dispatch("eleRef", item.route);
            dispatch("element", item.Htype);
            dispatch("Selected", item);

            if (item.Htype != "section") {
                dispatch("content", item.Html);
            }
            //multiDispatch([["isModel", true], ["element", item.Htype], []])
        }
    };

    const fixRoute = (arr, parentRoute = []) => {
        arr.forEach((item, index) => {
            item.route = [...parentRoute, index];
            if (item.Htype === "section") {
                fixRoute(item.Html, item.route);
            }
        });
    };

    const Delete = () => {
        const yes = confirm("Do you want to Delete selected Element ");
        if (!yes) return;
        dispatch("isModel", false);
        let docTargetOne = [...Ui.section];
        let route = [...eleRef];
        let indexToRemove = route.pop(); // Index of the element you want to remove
        deleteElement(docTargetOne, route, indexToRemove);
        fixRoute(docTargetOne);
        console.log(docTargetOne);
        dispatch("Ui", { section: [...docTargetOne] });
        pushState({ section: [...docTargetOne] });
    };
    const deleteElement = (obj, keys, indexToRemove) => {
        if (keys.length === 1) {
            obj[keys[0]]["Html"].splice(indexToRemove, 1);
        } else if (keys.length === 0) {
            obj.splice(indexToRemove, 1);
        } else {
            const key = keys.shift();
            deleteElement(obj[key]["Html"], keys);
        }
    };
    function addNestedValue(obj, keys, node) {
        if (keys.length === 1) {
            obj[keys[0]]["Html"] = [...obj[keys[0]]["Html"], node];
        } else {
            const key = keys.shift();
            addNestedValue(obj[key]["Html"], keys, node);
        }
    }
    const getParentArr = (obj, keys) => {
        console.log({ ...obj }, [...keys]);
        if (keys.length === 1) {
            const length = obj[keys[0]]["Html"].length; // Fix the typo here
            console.log({ length });
            return length;
        } else {
            const key = keys.shift();
            return getParentArr(obj[key]["Html"], keys); // Added a return statement here
        }
    };

    const save = () => {
        dispatch("isModel", false);

        const value = element;
        console.log({ value });
        if (eleRef.length > 0) {
            const startPath = Ui.section;

            const parentLength = getParentArr({ ...startPath }, [...eleRef]);

            let node;
            if (value === "section") {
                node = {
                    route: [...eleRef, parentLength],
                    Htype: value,
                    Html: []
                };
                dispatch("eleRef", [...eleRef, parentLength]);
            } else {
                node = {
                    route: [...eleRef, parentLength],
                    Htype: value,
                    Html: content,
                    link: value === "link" ? href : ""
                };
            }

            // Call the updateNestedValue function
            let docTargetOne = Ui.section;
            addNestedValue(docTargetOne, [...eleRef], node);

            console.log({ docTargetOne }); // The value at level5 will be updated to "newValue"

            dispatch("Ui", { section: [...docTargetOne] });
            pushState({ section: [...docTargetOne] });
        } else {
            let node;
            if (value === "section") {
                node = {
                    route: [Ui.section.length],
                    Htype: value,
                    Html: []
                };
                dispatch("eleRef", [Ui.section.length]);
            } else {
                node = {
                    route: [Ui.section.length],
                    Htype: value,
                    Html: content,
                    link: value === "link" ? href : undefined
                };
            }
            dispatch("isModel", false);

            dispatch("Ui", { section: [...prev.section, node] });
            pushState({ section: [...docTargetOne] });
        }
    };

    // On this array myRoute is
    // dispatch(updateComonOne("Bhuwneshwar "));
    function updateNestedValue(obj, keys, htype) {
        if (keys.length === 1) {
            obj[keys[0]]["Html"] = content;
            obj[keys[0]]["link"] = url;
            obj[keys[0]]["Htype"] = element;
        } else {
            const key = keys.shift();
            updateNestedValue(obj[key]["Html"], keys, links, htype);
        }
    }
    const update = () => {
        // Call the updateNestedValue function
        let docTargetOne = Ui.section;
        updateNestedValue(docTargetOne, [...eleRef], htype);

        console.log({ docTargetOne }); // The value at level5 will be updated to "newValue"
        dispatch("isModel", false);
        dispatch("Ui", { section: [...docTargetOne] });
        pushState({ section: [...docTargetOne] });
    };
    const sectionClear = (obj, keys) => {
        if (keys.length === 1) {
            obj[keys[0]]["Html"] = [];
        } else if (keys.length === 0) {
            obj = [];
        } else {
            const key = keys.shift();
            sectionClear(obj[key]["Html"], keys);
        }
    };

    const clearAll = () => {
        const yes = confirm("Do you want to Clear all selected Section ");
        if (!yes) return;
        // Call the updateNestedValue function

        let docTargetOne = Ui.section;
        sectionClear(docTargetOne, [...eleRef]);

        console.log({ docTargetOne }); // The value at level5 will be updated to "newValue"
        dispatch("isModel", false);

        dispatch("Ui", { section: [...docTargetOne] });
        pushState({ section: [...docTargetOne] });
    };

    //     const [isCopied, setCopied] = useClipboard("text to speech on ");
    const copy = () => {
        dispatch("isModel", false);

        dispatch("copyBtnText", "Copied!");
        dispatch("copyContent", Selected);
        const id = setTimeout(
            () => dispatch("copyBtnText", "Copy Element!"),
            2000
        );
    };
    const move = () => {
        dispatch("isModel", false);

        dispatch("copyContent", Selected);
        let docTargetOne = [...Ui.section];
        let route = [...eleRef];
        let indexToRemove = route.pop(); // Index of the element you want to remove
        deleteElement(docTargetOne, route, indexToRemove);
        fixRoute(docTargetOne);
        console.log(docTargetOne);
        dispatch("Ui", { section: [...docTargetOne] });
        pushState({ section: [...docTargetOne] });
    };
    const paste = () => {
        dispatch("isModel", false);
        let docTargetOne = Ui.section;
        addNestedValue(docTargetOne, [...eleRef], copyContent);
        fixRoute(docTargetOne);
        console.log({ docTargetOne }); // The value at level5 will be updated to "newValue"
        dispatch("Ui", { section: [...docTargetOne] });
        pushState({ section: [...docTargetOne] });
    };
    // const undo = minus => {
    //         const prevUi = history[minus];
    //         dispatch("Ui", prevUi);
    //     };
    //     const redo = () => {};
    const handleKeyDown = useCallback(event => {
        if (event.ctrlKey && event.key === "z") {
            // Ctrl+Z is pressed, call your undo function
            undo();
        }
        if (event.ctrlKey && event.key === "y") {
            // Ctrl+Y is pressed, call your redo function
            redo();
        }
        if (event.ctrlKey && event.key === "c") {
            // Ctrl+C is pressed, call your copy function
            copy();
        }
        if (event.ctrlKey && event.key === "x") {
            // Ctrl+X is pressed, call your copy function
            move();
        }
        if (event.ctrlKey && event.key === "v") {
            // Ctrl+V is pressed, call your paste function
            paste();
        }
    }, []);
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);
    useEffect(() => {
        console.log({ history });
        return () => {};
    }, [Ui]);
    /*
    const updateState = newState => {
        dispatch(
            "history",
            [...history.slice(0, pointer + 1), newState].slice(-20)
        );
        dispatch("pointer", Math.min(pointer + 1, 20));
    };

    const undo = () => {
        if (pointer > 0) {
            dispatch("pointer", pointer - 1);
            dispatch("Ui", history[pointer - 1]);
        }
    };

    const redo = () => {
        if (pointer < history.length - 1) {
            dispatch("pointer", pointer + 1);
            dispatch("Ui", history[pointer + 1]);
        }
    };
*/

    // const handleChange = (event) => {
    //     setTextValue(event.target.value);
    //     pushState(event.target.value);
    //   };

    const handleUndo = () => {
        dispatch("UndoRedo", true);
        const newText = undo();
        if (newText) dispatch("Ui", newText);
    };

    const handleRedo = () => {
        dispatch("UndoRedo", true);

        const newText = redo();
        if (newText) dispatch("Ui", newText);
    };

    return (
        <>
            <div className={isModel ? "outer-model " : "hideBox outer-model"}>
                <div className="inner-model">
                    <h2 className=" ">Edit Elements</h2>
                    <select
                        value={element}
                        onChange={e => dispatch("element", e.target.value)}
                        name="sections"
                        id="sections"
                    >
                        <option value="">Choose Element</option>
                        <option value="section">section</option>
                        <option value="code">code</option>
                        <option value="link">link</option>
                        <option value="h1">h1</option>
                        <option value="h2">h2</option>
                        <option value="h3">h3</option>
                        <option value="h4">h4</option>
                        <option value="h5">h5</option>
                        <option value="h6">h6</option>
                    </select>
                    {htype === "section" ? (
                        ""
                    ) : (
                        <textarea
                            onChange={e => dispatch("content", e.target.value)}
                            name="content"
                            id=""
                            placeholder="Write Content"
                            value={content}
                        ></textarea>
                    )}
                    {element === "link" ? (
                        <input
                            onChange={e => dispatch("url", e.target.value)}
                            name="href"
                            value={url}
                            placeholder="past link "
                        ></input>
                    ) : (
                        ""
                    )}
                    <br />
                    <br />
                    {element === "section" ? (
                        <div>
                            <button onClick={save}>Save</button>
                            <button onClick={clearAll}>Clear all </button>
                            <button onClick={paste}>paste </button>
                        </div>
                    ) : (
                        <button onClick={save}>Save</button>
                    )}
                    <button onClick={Delete}>Delete</button>
                    <button onClick={update}>Update</button>
                    <button onClick={copy}>{copyBtnText} </button>
                    <button onClick={move}>move </button>

                    <button onClick={e => dispatch("isModel", false)}>
                        cancel
                    </button>
                </div>
            </div>
            <button onClick={handleUndo}>Undo </button>
            <button onClick={handleRedo}>redo </button>

            <div onClick={selectOne} className="app border">
                {RenderUi(Ui.section)}
            </div>
        </>
    );
};

export default App;
