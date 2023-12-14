const Store = {
    eleRef: [],
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
    isModel: false,
    htype: "",
    element: "",
    content: "",
    url: "",
    title: "",
    copyContent: "",
    Selected: null,
    copyBtnText: "Copy Element",
    history: [],
    pointer: 0, 
    UndoRedo: false
};
export default Store;
