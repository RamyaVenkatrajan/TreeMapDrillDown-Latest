import { VisualSettings } from "./settings";
import * as SettingsSchemaTypeDef from '@visualbi/bifrost-powerbi/dist/types/SettingsSchemaTypeDef';
import { TreeMapDrilldownChart } from './visual';
import { settings } from "cluster";

export class EnumConfig {
    private PropertyType = SettingsSchemaTypeDef.PropertyType;
    private IteratorType = SettingsSchemaTypeDef.IteratorType;
    private isProPropertiesUsed: boolean;


    public getEnumerationConfigurationArray(instance): SettingsSchemaTypeDef.Section[] {
        const measureData = {};
        if (instance && instance.metadata) {
            if (instance.metadata.dimensions)
                instance.metadata.dimensions.forEach(dim => {
                    measureData[dim.name] = dim;
                });
            if (instance.metadata.measures)
                instance.metadata.measures.forEach(mes => {
                    measureData[mes.name] = mes;
                });
        }

        this.isProPropertiesUsed = false;

        const enumerationConfig: SettingsSchemaTypeDef.Section[] = [];
        enumerationConfig.push(this.getChartOptions(instance));
        enumerationConfig.push(this.getNumberFormat(instance, measureData));
        enumerationConfig.push(this.getTitleOptions(instance));
        enumerationConfig.push(this.getDataLabels(instance));
        enumerationConfig.push(this.getMarkerOption(instance));
        enumerationConfig.push(this.getResponsiveOptions(instance));
        


        return enumerationConfig;
    }
    private getChartOptions(instance: TreeMapDrilldownChart) {
        return {
            name: 'chartOptions',
            properties: [
                {
                    name: 'bandBg',
                    isVisible: (settings: VisualSettings) => settings.chartOptions.bandBgshow !== false
                },
                {
                    name: 'charttitle',
                    isVisible: (settings: VisualSettings) => settings.chartOptions.chartshow !== false
                },
                {
                    name: 'charttitle2',
                    isVisible: (settings: VisualSettings) => settings.chartOptions.chartshow !== false
                },
                {
                    name: 'charttitle3',
                    isVisible: (settings: VisualSettings) => settings.chartOptions.chartshow !== false
                },
                {
                    name: 'fontfamily',
                    isVisible: (settings: VisualSettings) => settings.chartOptions.chartshow !== false
                },
                {
                    name: 'fontSize',
                    isVisible: (settings: VisualSettings) => settings.chartOptions.chartshow !== false,
                    validValues: (settings: any) => {
                        return {
                            numberRange: {
                                min: 8,
                                max: 60
                            },
                        }
                    }
                },
                {
                    name: 'fontWeight',
                    isVisible: (settings: VisualSettings) => settings.chartOptions.chartshow !== false
                },
                {
                    name: 'fontColor',
                    isVisible: (settings: VisualSettings) => settings.chartOptions.chartshow !== false
                },
                {
                    name: 'textAlign',
                    isVisible: (settings: VisualSettings) => settings.chartOptions.chartshow !== false
                },
                {
                    name: 'percentDecimal',
                    isVisible: (settings: VisualSettings) => settings.chartOptions.chartshow !== false,
                    validValues: (settings: any) => {
                        return {
                            numberRange: {
                                min: 0,
                                max: 10
                            },
                        }
                    }
                },
                {
                    name: 'percentagevalue',
                    isVisible: (settings: VisualSettings) => settings.chartOptions.chartshow !== false
                },
                {
                    name: 'percentvalfontColor',
                    isVisible: (settings: VisualSettings) => settings.chartOptions.chartshow !== false
                }

            ]
        };
    }
    private getNumberFormat(instance: TreeMapDrilldownChart, metaData) {

        return {
            name: 'numberformat',
            properties: [
                {
                    name: 'dlThousands',
                    isVisible: (settings: VisualSettings) => settings.numberformat.customizeScalingLabel
                }, {
                    name: 'dlMillions',
                    isVisible: (settings: VisualSettings) => settings.numberformat.customizeScalingLabel
                }, {
                    name: 'dlBillions',
                    isVisible: (settings: VisualSettings) => settings.numberformat.customizeScalingLabel
                }, {
                    name: 'dlTrillion',
                    isVisible: (settings: VisualSettings) => settings.numberformat.customizeScalingLabel
                },
                {
                    name: 'dlPercent',
                    isVisible: (settings: VisualSettings) => settings.numberformat.customizeScalingLabel
                },
                {
                    name: 'enableDataLabelFormatting',
                    isVisible: () => false
                }, {
                    name: 'numericSymbols',
                    isVisible: () => false
                },
                {
                    name: 'negativeValueFormat',
                    isVisible: (settings: VisualSettings) => settings.numberformat.semanticFormatting
                }, {
                    name: 'negativeValueColor',
                    isVisible: (settings: VisualSettings) => settings.numberformat.semanticFormatting
                }, {
                    name: 'positiveValueFormat',
                    isVisible: (settings: VisualSettings) => settings.numberformat.semanticFormatting
                }, {
                    name: 'positiveValueColor',
                    isVisible: (settings: VisualSettings) => settings.numberformat.semanticFormatting
                },
                {
                    name: ['showMeasureLabel', 'noOfDecimal', 'scalingFactor', 'prefix', 'suffix'],
                    type: SettingsSchemaTypeDef.PropertyType.ITERATOR,
                    iteratorType: SettingsSchemaTypeDef.IteratorType.MEASURE,
                    roles: ["Values1", "Values3",],
                    getIteratorText: (techName, meaName) => {
                        if (techName === "showMeasureLabel") {
                            return meaName;
                        } else if (techName === "noOfDecimal") {
                            return "Value decimal places";
                        } else if (techName === "scalingFactor") {
                            return "Scaling Display";
                        } else if (techName === "prefix") {
                            return "Prefix";
                        } else if (techName === "suffix") {
                            return "Suffix";
                        } else {
                            return "";
                        }
                    },
                    defaultValue: [false, 2, "auto", " ", " "],
                    getValidValues: (settings, measureObject, propertyName) => {
                        if (propertyName === "noOfDecimal") {
                            return {
                                numberRange: {
                                    min: 0,
                                    max: 10
                                }
                            };
                        } else {
                            return {};
                        }
                    },
                    isIteratorVisible: (settings, measureObj, propName) => {

                        //Bug-Fix[PBX-1028] - Only measures should be iterated
                        if (metaData[measureObj.name] && metaData[measureObj.name]["type"]) {
                            if (!metaData[measureObj.name]["type"]['numeric']) //Hide if measure's type is not numeric

                                return false;
                        }
                        if (propName === "showMeasureLabel") {
                            return true;
                        } else {
                            if ((measureObj && measureObj.settings && measureObj.settings.numberformat && measureObj.settings.numberformat.showMeasureLabel)) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    },
                    isVisible: () => {
                        return true;
                    }
                }


            ]
        }
    }

    private getTitleOptions(instance: TreeMapDrilldownChart,) {
        return {
            name: 'tabtitleOptions',
            properties: [
                {
                    name: 'chart1tabtext1',
                    isVisible: true
                },
                {
                    name: 'chart1tabtext2',
                    isVisible: true
                },
                {
                    name: 'chart2tabtext1',
                    isVisible: true
                },
                {
                    name: 'chart2tabtext2',
                    isVisible: true
                },
                {
                    name: 'chart3tabtext1',
                    isVisible: true
                },
                {
                    name: 'chart3tabtext2',
                    isVisible: true
                },
                {
                    name: 'tabfontColor',
                    isVisible: true
                },
                {
                    name: 'tabfontfamily',
                    isVisible: true
                },
                {
                    name: 'tabfontSize',
                    isVisible: true,
                    validValues: (settings: any) => {
                        return {
                            numberRange: {
                                min: 8,
                                max: 60,
                            },
                        }
                    },
                },
                {
                    name: 'borderbottomColor',
                    isVisible: true
                },
            ]
        }
    }

    private getDataLabels(instance: TreeMapDrilldownChart) {
        return {
            name: 'dataLabels',
            properties: [
                {
                    name: 'dlfontSize',
                    isVisible: (settings: VisualSettings) => settings.dataLabels.show,
                    validValues: (settings: any) => {
                        return {
                            numberRange: {
                                min: 8,
                                max: 60,
                            },
                        }
                    },
                },
            ]
        }
    }

    private getMarkerOption(instance: TreeMapDrilldownChart) {
        return {
            name: 'markerOption',
            properties: [
                {
                    name: 'markerRadius',
                    isVisible: (settings: VisualSettings) => true,
                    validValues: (settings: any) => {
                        return {
                            numberRange: {
                                min: 2,
                                max: 20,
                            },
                        }
                    },
                },
            ]
        }
    }

    private getResponsiveOptions(instance: TreeMapDrilldownChart) {
        console.log("instance",instance);
        return {
            name: 'responsiveOptions',
            properties: [
                {
                    name: 'scrollshow',
                    isVisible: (settings: VisualSettings) => instance._isPBIMobile == true
                },
            ]
        }
    }

}

