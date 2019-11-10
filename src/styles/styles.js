const CL_BORDER = "#4a7";
const CL_TEXT = "#000";
const CL_INVALID = "#a31";
const CL_WINDOW = "#fff";

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

    component: {

        container: {
            width: "100%"
        },

        frame: {
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
            ...FONT
        },

        invalid: {

            edit: {
                border: INVALID
            }

        }

    },

    tmemo: {

        edit: {
            minHeight: "48px",
            border: BORDER
        }

    },

    tgroup: {

        content: {
            padding: "8px",
            border: BORDER
        }

    }

}