export default {
    tasks: {
        "module-1": { id: "module-1", content: "I am module 1" },
        "module-2": { id: "module-2", content: "I am module 2" },
        "module-3": { id: "module-3", content: "I am module 3" },
        "module-4": { id: "module-4", content: "I am module 4" }
    },
    columns: {
        "Todo": {
            id: "Todo",
            title: "Todo",
            taskIds: ["module-1", "module-2", "module-3", "module-4"]
        },
        "In Progress": {
            id: "In Progress",
            title: "In Progress",
            taskIds: []
        },
        "Done": {
            id: "Done",
            title: "Done",
            taskIds: []
        },
        "In Review": {
            id: "In Review",
            title: "In Review",
            taskIds: []
        }
    },
    columnOrder: ["Todo", "In Progress", "In Review", "Done",]
};
