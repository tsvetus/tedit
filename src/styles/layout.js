export default {

    TButton: {
        cursor: "pointer"
    },

    TIndicator: {
//        cursor: "default"
    },

    TComponent: {

        container: {
            outline: "none"
        },

        frame: {
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "center"
        },

        label: {
            cursor: "default"
        },

        edit: {
            flex: "1 0",
            whiteSpace: "nowrap",
            overflow: "hidden"
        },

        list: {

            container: {
                position: "relative",
                top: "0",
                left: "0",
                display: "flex",
                flexDirection: "column",
                zIndex: "2"
            },

            item: {
                marginTop: "-1px"
            }

        },

    },

    TModal: {

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
            position: "relative",
            margin: "auto",
            top: "20%",
            // left: "50%",
            // transform: "translate(-50%, -50%)",
            zIndex: "11",
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
        }

    },

    TForm: {

        footer: {
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "nowrap"
        }

    },

    TMemo: {

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

    TGroup: {

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

    TCheck: {

        frame: {
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "nowrap"
        }

    },

    TLogin: {

        screen: {
            zIndex: "30"
        },

        container: {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -80%)",
            display: "flex",
            flexDirection: "column",
            zIndex: "31"
        },

        form: {
            width: "auto"
        },

        component: {

            container: {
                width: "auto"
            }

        }

    },

    TPanel: {
//        display: "flex"
    },

    TTop: {

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

    TSide: {

        container: {
            height: "100%",
            width: "0",
            position: "fixed",
            zIndex: "20",
            top: "0",
            left: "0",
            overflowX: "hidden",
            transition: "0.5s",
            tabIndex: "-1"
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
            zIndex: 21,
            top: "0",
            left: "0",
            height: "100vh",
            width: "8px",
            opacity: "0"
        }

    },

    TScroll: {
        overflow: "auto"
    }

}