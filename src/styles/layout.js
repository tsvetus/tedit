export default {

    button: {
        cursor: "pointer"
    },

    indicator: {
        cursor: "default"
    },

    component: {

        frame: {
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "center",
            overflowY: "none"
        },

        edit: {
            flex: "1 0",
            whiteSpace: "nowrap",
            overflow: "hidden"
        },

        list: {
            position: "absolute",
            top: "0",
            left: "0",
            display: "flex",
            flexDirection: "column"
        },

        item: {
            marginTop: "-1px"
        }

    },

    modal: {

        screen: {
            display: "block",
            position: "fixed",
            zIndex: "10",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
            overflow: "auto",
            backgroundColor: "rgba(0,0,0,0.4)",
            backdrop: "static",
            keyboard: "false",
            transitionProperty: "width",
            transitionDuration: "4s",
            transitionDelay: "2s"
        },

        container: {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "20",
            backgroundColor: "#fff",
            cursor: "default"
        },

        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "nowrap"
        },

        close: {
            cursor: "pointer"
        },

        timer: {
            width: "48px"
        },

        content: {
            display: "flex",
            flexDirection: "column"
        },

        footer: {
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "nowrap"
        }

    },

    memo: {

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

    group: {

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

    },

    check: {

        frame: {
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "nowrap"
        }

    },

    login: {

        container: {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -80%)",
            display: "flex",
            flexDirection: "column",
            zIndex: "100"
        }

    },

    panel: {
        display: "flex"
    },

    top: {

        container: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "default"
        },

        button: {
            cursor: "pointer"
        }

    },

    side: {

        container: {
            height: "100%",
            width: "0",
            position: "fixed",
            zIndex: "100",
            top: "0",
            left: "0",
            overflowX: "hidden",
            transition: "0.5s"
        },

        close: {
            display: "block",
            position: "absolute",
            top: "12px",
            right: "12px",
            transition: "0.3s"
        },

        item: {
            display: "block",
            textDecoration: "none",
            transition: "0.3s",
            cursor: "pointer"
        },

        touch: {
            position: "fixed",
            zIndex: 30,
            top: "0",
            left: "0",
            height: "100vh",
            width: "8px",
            opacity: "0"
        }

    }

}