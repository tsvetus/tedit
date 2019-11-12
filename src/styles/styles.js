const CL_BORDER = "#4a7";
const CL_TEXT = "#000";
const CL_INVALID = "#a31";
const CL_WINDOW = "#fff";
const CL_PANEL = "#eee";

const BORDER = "1px solid " + CL_BORDER;
const INVALID = "1px dashed " + CL_INVALID;

const FONT = {
    fontFamily: "Arial",
    fontSize: "18px"
};

export default {

    icon: {
        padding: "4px",
        width: "32px",
        height: "32px",
        color: CL_BORDER
    },

    button: {
        padding: "8px",
        border: BORDER,
        color: CL_TEXT,
        borderRadius: "8px",
        ...FONT
    },

    indicator: {
        color: "#aaa",
        flex: "0 0 24px",
        textAlign: "center",
        fontWeight: "bold",
        ...FONT
    },

    component: {

        container: {
            width: "100%"
        },

        label: {
            padding: "4px 4px 0 0",
            border: "none",
            color: CL_BORDER,
            outline: "none",
            ...FONT
        },

        edit: {
            minHeight: "18px",
            padding: "4px 4px 2px 4px",
            border: BORDER,
            color: CL_TEXT,
            outline: "none",
            ...FONT
        },

        icon: {
            padding: "0 0 0 4px",
            width: "18px",
            height: "18px",
            color: CL_BORDER
        },

        item: {
            padding: "4px",
            border: BORDER,
            color: CL_TEXT,
            outline: "none",
            backgroundColor: CL_WINDOW,
            cursor: "pointer",
            ...FONT
        },

        selected: {
            fontWeight: "bold",
            backgroundColor: "#eee"
        },

        invalid: {

            edit: {
                border: INVALID
            }

        }

    },

    modal: {

        container: {
            backgroundColor: CL_WINDOW,
            border: BORDER,
            borderRadius: "16px",
            maxWidth: "600px",
            width: "55%"
        },

        header: {
            margin: "16px 16px 0 16px",
            ...FONT
        },

        close: {
            color: "#aaa",
            width: "24px",
            height: "24px",
            ...FONT
        },

        timer: {
            ...FONT,
            color: "#f55",
            fontSize: "24px"
        },

        caption: {
            color: CL_BORDER,
            textAlign: "center",
            margin: "0 8px 0 8px",
            ...FONT
        },

        content: {
            color: CL_TEXT,
            margin: "16px",
            ...FONT
        },

        footer: {
            margin: "24px 16px 8px 16px"
        },

        message: {
            ...FONT,
            margin: "16px",
            color: "#393",
            textAlign: "center"
        },

        error: {
            ...FONT,
            margin: "16px",
            color: "#f55",
            textAlign: "center"
        },

        buttons: {

            cancel: {
                ...FONT,
                fontWeight: "bold",
                color: "#f55",
                width: "88px",
                textAlign: "center"
            },

            ok: {
                ...FONT,
                color: "#4a4",
                width: "88px",
                textAlign: "center"
            },

            submit: {
                ...FONT,
                color: "#4a4",
                width: "88px",
                textAlign: "center"
            },

            save: {
                ...FONT,
                fontWeight: "bold",
                color: "#4a4",
                width: "88px",
                textAlign: "center"
            },

            edit: {
                ...FONT,
                fontWeight: "bold",
                color: "#4a4",
                width: "88px",
                textAlign: "center"
            },

            disable: {
                ...FONT,
                fontWeight: "bold",
                color: "#ddd",
                width: "88px",
                textAlign: "center"
            },

            delete: {
                ...FONT,
                fontWeight: "bold",
                color: "#f33",
                width: "88px",
                textAlign: "center"
            }

        }


    },

    memo: {

        edit: {
            minHeight: "48px",
            border: BORDER
        }

    },

    group: {

        content: {
            padding: "8px",
            border: BORDER
        }

    },

    panel: {
        backgroundImage: "linear-gradient(" + CL_PANEL + ", " + CL_WINDOW + ")",
        backgroundColor: CL_PANEL,
        padding: "8px",
        ...FONT,
        justifyContent: "center",
        color: CL_BORDER,
        fontSize: "24px"
    },

    top: {

        container: {
            backgroundColor: CL_PANEL,
        },

        button: {
            color: CL_BORDER
        },

        caption: {
            ...FONT,
            color: CL_BORDER,
            fontSize: "24px"
        },

        tools: {
            margin: "0 8px 0 0"
        },

        icon: {
            margin: "0 0 0 8px",
            color: CL_BORDER,
            height: "24px",
            width: "24px"
        }

    },

    side: {

        container: {
            backgroundColor: CL_PANEL,
            paddingTop: "60px"
        },

        close: {
            color: CL_BORDER,
        },

        item: {
            ...FONT,
            padding: "8px 8px 8px 32px",
            fontSize: "24px",
            color: CL_TEXT
        }

    }

}