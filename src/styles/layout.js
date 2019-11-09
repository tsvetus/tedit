export default {

    component: {

        container: {

        },

        frame: {
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "center"
        },

        label: {
        },

        edit: {
            flex: "1 0",
            whiteSpace: "nowrap",
            overflow: "hidden"
        },

        icon: {
        }

    },

    tmemo: {

        container: {
            border: "none"
        },

        frame: {
            justifyContent: "space-between"
        },

        edit: {
            whiteSpace: "wrap"
        }

    },

    tgroup: {

        container: {
            display: "flex",
            flexDirection: "column",
            border: "none"
        },

        content: {
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap"
        },

        label: {
            display: "inline",
            margin: "0 0 -8px 16px",
            padding: "0 4px 0 4px",
            backgroundColor: "#fff",
            opacity: "1",
            zIndex: "1",
            alignSelf: "flex-start"
        }

    }

}