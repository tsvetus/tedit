import {styles} from "../../src";

export default {

    container: {
        display: "flex",
        flexDirection: "column"
    },

    grid: {
        head: {
            textAlign: "left"
        },
        caption: {
            padding: '4px 4px 4px 0'
        },
        cell: {
            padding: '4px 4px 16px 0'
        }
    },

    subGrid: {
        head: {
            textAlign: "left"
        },
        caption: {
            padding: '4px 4px 4px 0'
        },
        cell: {
            padding: '4px 4px 4px 0'
        }
    },

    name: {
        margin: "0 4px 0 0",
        color: "#f00",
        fontSize: "16px"
    },

    type: {
        margin: "0 4px 0 0",
        color: "rgba(0,126,0,0.86)",
        fontSize: "16px"
    },

    def: {
        margin: "0 4px 0 0 ",
        color: "#9c3573",
        fontSize: "16px"
    },

    required: {
        margin: "0 4px 0 0",
        color: "#009f00",
        fontSize: "16px"
    },

    description: {
        margin: "0 4px 0 0 ",
        color: styles.colors.border,
        fontSize: "16px"
    },

    row: {
        display: "flex"
    }

}