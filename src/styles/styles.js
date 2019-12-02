export default function defaultStyles(template) {

    return {

        colors: template.colors,
        fonts: template.fonts,

        TIcon: {
            padding: "4px",
            width: "32px",
            height: "32px",
            color: template.colors.border
        },

        TButton: {
            padding: "8px 16px 8px 16px",
            border: "1px solid " + template.colors.frame,
            backgroundColor: template.colors.face,
            color: template.colors.text,
            borderRadius: "8px",
            textAlign: "center",
            ...template.fonts.common
        },

        TIndicator: {
            color: template.colors.indicator,
            flex: "0 0 24px",
            textAlign: "center",
            fontWeight: "bold",
            ...template.fonts.common
        },

        TComponent: {

            container: {
                width: "100%"
            },

            frame: {},

            label: {
                padding: "4px 8px 0 0",
                border: "none",
                color: template.colors.border,
                outline: "none",
                textAlign: "right",
                ...template.fonts.common
            },

            edit: {
                minHeight: "18px",
                padding: "4px 4px 2px 4px",
                border: "1px solid " + template.colors.frame,
                color: template.colors.text,
                outline: "none",
                textAlign: "left",
                ...template.fonts.common
            },

            icon: {
                width: "18px",
                height: "18px",
                textAlign: "left",
                color: template.colors.border
            },

            list: {

                container: {
                    backgroundColor: template.colors.window
                },

                item: {
                    padding: "8px",
                    border: "1px solid " + template.colors.frame,
                    color: template.colors.text,
                    outline: "none",
                    backgroundColor: template.colors.panel,
                    cursor: "pointer",
                    textAlign: "center",
                    tabindex: "0",
                    ...template.fonts.common
                },

                selected: {
                    fontWeight: "bold"
                },

                hover: {
                    backgroundColor: "#fff",
                    border: "1px solid " + template.colors.border
                }

            },

            invalid: {

                label: {
                    color: "#f43"
                },

                edit: {
                    border: "1px solid red",
                    backgroundColor: "#eea"
                }

            }

        },

        TModal: {

            container: {
                backgroundColor: template.colors.window,
                borderRadius: "16px",
                maxWidth: "600px",
                width: "55%",
                padding: "4px"
            },

            header: {
                margin: "16px 16px 0 16px",
                ...template.fonts.common
            },

            close: {
                color: template.colors.border,
                width: "24px",
                height: "24px",
                ...template.fonts.common
            },

            timer: {
                ...template.fonts.common,
                color: template.colors.signal,
                fontSize: "24px"
            },

            caption: {
                color: template.colors.border,
                textAlign: "center",
                margin: "0 8px 0 8px",
                ...template.fonts.common
            },

            content: {
                color: template.colors.text,
                margin: "16px",
                ...template.fonts.common
            }

        },

        TForm: {

            footer: {
                margin: "24px 16px 8px 16px"
            },

            message: {
                ...template.fonts.common,
                margin: "16px",
                color: "#393",
                textAlign: "center"
            },

            error: {
                ...template.fonts.common,
                margin: "16px",
                color: "#a13b3b",
                textAlign: "center"
            },

            buttons: {

                cancel: {
                    ...template.fonts.common,
                    fontWeight: "bold",
                    color: "#2a2975",
                    textAlign: "center"
                },

                ok: {
                    ...template.fonts.common,
                    color: "#3f943f",
                    textAlign: "center"
                },

                submit: {
                    ...template.fonts.common,
                    color: "#3f943f",
                    textAlign: "center"
                },

                save: {
                    ...template.fonts.common,
                    fontWeight: "bold",
                    color: "#3f943f",
                    textAlign: "center"
                },

                edit: {
                    ...template.fonts.common,
                    fontWeight: "bold",
                    color: "#3f943f",
                    textAlign: "center"
                },

                disable: {
                    ...template.fonts.common,
                    fontWeight: "bold",
                    color: "#ddd",
                    textAlign: "center",
                    border: "1px solid #ddd",
                    cursor: "default"
                },

                delete: {
                    ...template.fonts.common,
                    fontWeight: "bold",
                    color: "#a13b3b",
                    textAlign: "center"
                }

            }

        },

        TMemo: {

            edit: {
                minHeight: "18px",
                border: "1px solid " + template.colors.border
            }

        },

        TGroup: {

            content: {
                padding: "8px",
                border: "1px solid " + template.colors.border
            },

            label: {
                backgroundColor: template.colors.window
            }

        },

        TPanel: {
            backgroundImage: "linear-gradient(" + template.colors.panel + ", " + template.colors.window + ")",
            backgroundColor: template.colors.panel,
            color: template.colors.border,
            ...template.fonts.common
        },

        TTop: {

            container: {
                backgroundColor: template.colors.panel
            },

            button: {
                color: template.colors.border,
                height: "32px",
                width: "32px",
                margin: "4px"
            },

            caption: {
                ...template.fonts.common,
                color: template.colors.border,
                fontSize: "24px"
            },

            tools: {
                margin: "0 8px 0 0"
            },

            icon: {
                margin: "0 0 0 8px",
                color: template.colors.border,
                height: "32px",
                width: "32px"
            }

        },

        TSide: {

            container: {
                backgroundColor: template.colors.panel,
                paddingTop: "60px"
            },

            close: {
                color: template.colors.border,
            },

            item: {
                ...template.fonts.common,
                padding: "8px 8px 8px 32px",
                fontSize: "24px",
                color: template.colors.text
            }

        },

        TLogin: {

            container: {
                maxWidth: "420px",
                minWidth: "320px"

            },

            component: {
                label: {
                    width: "160px"
                }
            },

            form: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                height: "100px"
            }

        },

        TText: {},

        TResponse: {

            container: {
                textAlign: "center"
            },

            error: {
                ...template.fonts.common,
                margin: "16px",
                color: template.colors.error
            },

            message: {
                ...template.fonts.common,
                margin: "16px",
                color: template.colors.message
            }

        },

        TDate: {
            container: {
                width: "220px"
            }
        },

        TScroll: {
            ...template.fonts.common,
            backgroundColor: template.colors.window
        }

    }

}