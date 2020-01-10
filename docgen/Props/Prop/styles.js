import {styles} from 'tedit';

export default {
    container: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        fontSize: "16px"
    },
    row: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        margin: "4px 0 0 0"
    },
    name: {
        color: "#f00",
        minWidth: "120px"
    },
    type: {
        margin: "0 0 0 4px",
        color: "#0f0",
        minWidth: "80px"
    },
    def: {
        margin: "0 0 0 4px",
        color: "#9c3573",
        minWidth: "200px"
    },
    required: {
        margin: "0 0 0 4px",
        color: "#009f00",
        minWWidth: "30px"
    },
    description: {
        margin: "0 0 0 4px",
        color: styles.colors.border,
        minWidth: "100px"
    }
}