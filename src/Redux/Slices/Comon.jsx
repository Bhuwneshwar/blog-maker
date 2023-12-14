import { createSlice } from "@reduxjs/toolkit";

const comonSlice = createSlice({
    name: "comon",
    initialState: {
        isModel: false,
        Ui: {
            section: [
                {
                    Htype: "section",
                    Html: [
                        {
                            Htype: "h5",
                            Html: "No Data Found",
                            route: [0, 0]
                        },
                        {
                            Htype: "h6",
                            Html: "No Data Found",
                            route: [0, 1]
                        }
                    ],
                    route: [0]
                },
                {
                    Htype: "link",
                    Html: "this is link ",
                    href: "/#",
                    route: [1]
                },
                {
                    Htype: "code",
                    Html: `const [isModel, setIsModel] = useState(false);
                   const [ind, setInd] = useState(0); `,
                    route: [2]
                },
                {
                    Htype: "h1",
                    Html: "headind 1",
                    route: [3]
                },
                {
                    Htype: "h2",
                    Html: "No Data Found",
                    route: [4]
                },
                {
                    Htype: "h3",
                    Html: "No Data Found",
                    route: [5]
                },
                {
                    Htype: "h4",
                    Html: "No Data Found",
                    route: [6]
                },
                {
                    Htype: "h5",
                    Html: "No Data Found",
                    route: [7]
                },
                {
                    Htype: "h6",
                    Html: "No Data Found",
                    route: [8]
                },
                {
                    Htype: "section",
                    Html: [],
                    route: [9]
                }
            ]
        },
        htype: "",
        links: {
            href: "",
            content: ""
        }
    },
    reducers: {
        updateComonOne: (state, action) => {
            console.log("description ");
            const [key, value] = action.payload;
            return { ...state, [key]: value };
        },
        updateComonMany: (state, action) => {
            let newState = { ...state };
            action.payload.forEach(arr => {
                const [key, value] = arr;
                newState = {
                    ...newState,
                    [key]: value
                };
            });
            return newState;
        }
    }
});

export const { updateComonOne, updateComonMany } = comonSlice.actions;
export default comonSlice;
