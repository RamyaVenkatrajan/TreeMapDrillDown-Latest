module powerbi.extensibility.visual {

    export const propProperties: bifrost.ProProperty[] = [
        {
            "section": "miscellaneous",
            "name": "fontSize",
        }, {
            "section": "miscellaneous",
            "name": "subtitletext",
            "checkUsage": (value) => {
                return value === "Test";
            }
        }
    ];
}