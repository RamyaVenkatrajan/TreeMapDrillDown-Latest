



// Bifrost files import
import { BifrostVisual } from "@visualbi/bifrost-powerbi/dist/BifrostVisual";
import { SelectionIdBuilder } from "@visualbi/bifrost-powerbi/dist/SelectionIdBuilder";
import { HighContrastColors } from "@visualbi/bifrost-powerbi/dist/types/BifrostTypeDef";
import * as Categorical from '@visualbi/bifrost-powerbi/dist/types/DataTypeDef';
import { Data } from "@visualbi/bifrost-powerbi/dist/types/DataTypeDef";
import { SettingsSchemaTypeDef } from "@visualbi/bifrost-powerbi/dist/types/SettingsSchemaTypeDef";
import { UIIndicators } from '@visualbi/bifrost-powerbi/dist/UIIndicators';
import { HighchartSelectionManager } from "@visualbi/powerbi-common/dist/HighChartUtils/selection";
import { BifrostDataUtils } from '@visualbi/powerbi-common/dist/Utils/bifrostDataUtils';
import { throws } from "assert";
import { settings } from "cluster";
import "core-js/stable";
import customEvents from "highcharts-custom-events/js/customEvents";
// HighChart files import
import * as Highcharts from "highcharts/highcharts";
import highchartsMore from "highcharts/highcharts-more";
import boost from "highcharts/modules/boost";
import exportData from "highcharts/modules/export-data";
import exporting from "highcharts/modules/exporting";
import offlineExporting from "highcharts/modules/offline-exporting";
import wordcloud from "highcharts/modules/wordcloud";
// Power BI files import
import powerbiVisualsApi from "powerbi-visuals-api";
// Common files import
import {
    COMPONENT_NAME, COMPONENT_URL, CUSTOMER_NAME, LICENSE_KEY, VISUAL_VERSION
} from "../licence";
import "./../style/visual.less";
import { EnumConfig } from "./enumConfig";
import { ValidValues, VisualSettings } from "./settings";
import { TreeMapDrilldownUtil } from "./TreeMapDrilldownUtil";
//import { Editor } from "@visualbi/powerbi-editor/dist/conditional-formatting/editor";
import { FieldsMeta } from "./types/types";

import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbiVisualsApi.extensibility.visual.VisualUpdateOptions;

boost(Highcharts);
exporting(Highcharts);
exportData(Highcharts);
highchartsMore(Highcharts);
offlineExporting(Highcharts);
wordcloud(Highcharts);
customEvents(Highcharts);

const debounce = require("lodash.debounce");
//import { TreeMapDrilldownChartSelection } from "./TreeMapDrilldownChartSelection";
const escape = require("lodash.escape");

export class TreeMapDrilldownChart extends BifrostVisual.BifrostVisual {

    private highcharts: any;
    private chartSetting: any;
    private chartSetting2: any;
    private chartSetting3: any;
    private chartSetting4: any;
    public chartRef: Highcharts.Chart;
    public chartRef2: Highcharts.Chart;
    public chartRef3: Highcharts.Chart;
    public chartRef4: Highcharts.Chart;
    private enumConfig: EnumConfig;
    public _isPBIApplication: boolean;
    public _isMSBrowser: boolean;
    public fieldsMeta: FieldsMeta;
    public _selectionIdBuilder: SelectionIdBuilder;
    public hcSelectionManager: HighchartSelectionManager;
    public seriesData: any;
    public isProPropertiesUsed: boolean;
    public isFilterRedraw: boolean;
    public isSetDataUsed: boolean;
    public _isPBIMobile: boolean;
    // public bifrostData: Data;
    private maxlength = 0;
    private chartfilter = [];
    private chartfilter1 = [];
    private chartfilter3 = [];
    private chartfilter4 = [];
    private wrappercontainer = [];
    public tabwidth: any;
    private slideIndex = 1;
    private _data: Data;
    private _settings: VisualSettings;
    private _element: HTMLElement;
    private __selectionIdBuilder: SelectionIdBuilder;

    constructor(options: VisualConstructorOptions) {
        super(options, VisualSettings, ValidValues);
        // console.log("OPTIONS", this.settings);
        this.highcharts = Highcharts;
        this.isProPropertiesUsed = false;
        // this.Editor = Editor;
        this.initComponent(this.render, {
            getSettingsUIConfiguration: this.getEnumerationConfiguration,
            isMeasureComponent: true,
            resizeHandler: {
                callBack: () => {
                    this.responsiveChart(this._data, this._element, this.__selectionIdBuilder, this._settings);

                    let optionsWidth3 = options.element.offsetWidth;
                    let optionsWidth1 = options.element.offsetWidth / 2;
                    let optionsWidth = options.element.offsetWidth * 0.75;
                    console.log("optionsWidth", optionsWidth3);

                    let clientHeight1 = document.getElementById('tabs').clientHeight;
                    this.tabwidth = document.getElementById('tabs').clientWidth;
                    let minusdiv = document.getElementById('titlediv').offsetWidth;
                    let newSetsizewidth = this.tabwidth - minusdiv;
                    // console.log("  this.tabwidth",  this.tabwidth,minusdiv,newSetsizewidth);
                    let clientHeight = clientHeight1 - 40;

                    let draglength = 600;
                    let diffcheck = draglength - optionsWidth3;
                    console.log("optionsWidth", optionsWidth3);
                    console.log("diffcheck", diffcheck);

                    //    if(optionsWidth3 == 600){
                    //     this.responsiveChart(this._data, this._element, this.__selectionIdBuilder, this._settings);
                    //    }else if(diffcheck<=50){
                    //     draglength = optionsWidth3;
                    //     this.responsiveChart(this._data, this._element, this.__selectionIdBuilder, this._settings);
                    //    }
                    //    else{
                    //     if (this.chartfilter.length > 0) {
                    //         for (let i = 0; i < this.chartfilter.length; i++) {
                    //             this.chartfilter[i][0].setSize(newSetsizewidth, clientHeight / this.chartfilter.length, false);
                    //         }
                    //     }
                    //     if (this.chartfilter1.length > 0) {
                    //         for (let i = 0; i < this.chartfilter1.length; i++) {
                    //             this.chartfilter1[i][0].setSize(newSetsizewidth, clientHeight / this.chartfilter1.length, false);
                    //         }
                    //     }
                    //     if (this.chartfilter3.length > 0) {
                    //         for (let i = 0; i < this.chartfilter3.length; i++) {
                    //             this.chartfilter3[i][0].setSize(newSetsizewidth, clientHeight / this.chartfilter3.length, false);
                    //         }
                    //     }
                    //     if (this.chartfilter4.length > 0) {
                    //         for (let i = 0; i < this.chartfilter3.length; i++) {
                    //             this.chartfilter4[i][0].setSize(newSetsizewidth, clientHeight / this.chartfilter4.length, false);
                    //         }
                    //     }
                    //    }
                },
                timeOut: 0,
            },
            mergeProps: [
                {
                    role: "category",
                    dimensionIndex: 0,
                    properties: [
                        {
                            section: "dataPoint",
                            name: "fill",
                            dimensionSection: "dataPoint",
                        },
                    ],
                },
            ],
            license: {
                VISUAL_VERSION,
                COMPONENT_NAME,
                LICENSE_KEY,
                CUSTOMER_NAME,
            },
            // propProperties: ProProperties,
            skipLicenseCheck: true,

            landingPageConfig: {
                title: COMPONENT_NAME,
                url: COMPONENT_URL,
            },
            fullScreenEditor: false,
            editor: false,
        });
    }
    private getEnumerationConfiguration = (): SettingsSchemaTypeDef.Section[] => {
        this.enumConfig = new EnumConfig(this.maxlength);
        return this.enumConfig.getEnumerationConfigurationArray(this);
    };

    public render({
        data,
        element,
        selectionIdBuilder,
        settings,
        sampleVisual,
        isPBIDesktop,
        isPBIMobile,
        isMSBrowser,
    }: {
        data: Data;
        element: HTMLElement;
        selectionIdBuilder: SelectionIdBuilder;
        settings: VisualSettings;
        sampleVisual: boolean;
        isPBIDesktop: boolean;
        isPBIMobile: boolean;
        isMSBrowser: boolean;
        measureValueIndex: number;
    }) {
        //  console.log("render");
        this._data = data; this._element = element; this._settings = settings;
        this.__selectionIdBuilder = selectionIdBuilder;

        if (sampleVisual) {
            this.generateSampleVisual(element);
            return;
        } else {
            this.getFieldsMeta(data);
            this._isPBIApplication = isPBIDesktop || isPBIMobile;
            this._isMSBrowser = isMSBrowser;
            this._isPBIMobile = isPBIMobile;
            this.hcSelectionManager = new HighchartSelectionManager(selectionIdBuilder);
            this.responsiveChart(data, element, selectionIdBuilder, settings);
            selectionIdBuilder.registerOnSelectCallback(() => {
            });
            if (selectionIdBuilder.getSelectionIds().length > 0 && this.chartRef) {

            }
        }
    }

    private getFieldsMeta(data: Data) {
        this.fieldsMeta = {
            hasCategory: false,
            hasValues1: false,
            hasValues3: false,
            hasPercentageValues: false,
            hastooltips: false,
            countValues1: 0,
            countValues3: 0,
        };
        data.metadata.dimensions.forEach((dimMeta) => {
            if (dimMeta.role["category"]) {
                this.fieldsMeta.hasCategory = true;
            }
        });
        data.metadata.measures.forEach((mesMeta) => {
            if (mesMeta.role["Values1"]) {
                this.fieldsMeta.hasValues1 = true;
                this.fieldsMeta.countValues1++;
            }
            if (mesMeta.role["Values3"]) {
                this.fieldsMeta.hasValues3 = true;
                this.fieldsMeta.countValues3++;
            }
            if (mesMeta.role["PercentageValues"])
                this.fieldsMeta.hasPercentageValues = true;
        });
    }

    private generateData(
        data: Data,
        element: HTMLElement,
        selectionIdBuilder: SelectionIdBuilder,
        settings: VisualSettings,
        carouselstate: string
    ) {
        try {

            // console.log("Data", data);
            this.chartfilter = [], this.chartfilter1 = [];
            let seriesData = this.GET_SERIES(data, settings, selectionIdBuilder, this.hcSelectionManager);

            const tabs_container = document.createElement('div');
            const tabs = document.createElement('div');
            const charttitle = document.createElement('div');
            const spantitle = document.createElement('span');
            const spanpercentvalue = document.createElement('span')
            const ul = document.createElement('ul');
            const first_li = document.createElement('li');
            const second_li = document.createElement('li');
            const tabl1div = document.createElement('div');
            const tabl2div = document.createElement('div');
            // create id
            tabs_container.id = 'tabs_container';
            tabs.className = 'tabs';
            tabs.id = 'tabs';
            if (settings.chartOptions.chartshow !== false) {
                // Chart title Options
                charttitle.id = 'charttitle';
                spantitle.id = 'spantitle';
                spanpercentvalue.id = 'spanpercentvalue';
                spantitle.innerHTML = (settings.chartOptions.chartshow == true) ? settings.chartOptions.charttitle : settings.chartOptions.charttitle = '';
                charttitle.style.fontFamily = settings.chartOptions.fontfamily;
                charttitle.style.fontSize = settings.chartOptions.fontSize + "px";
                charttitle.style.fontWeight = settings.chartOptions.fontWeight;
                spantitle.style.color = settings.chartOptions.fontColor;
                spanpercentvalue.style.color = settings.chartOptions.percentvalfontColor;
                charttitle.style.textAlign = settings.chartOptions.textAlign;
            }
            if (settings.chartOptions.chartshow && spantitle.innerHTML == '') {
                spantitle.innerHTML = 'Sample';
            }

            ul.id = 'tabs-list';
            first_li.className = 'active';
            // Tabs title Options
            first_li.innerHTML = settings.tabtitleOptions.tabtext1;
            second_li.innerHTML = settings.tabtitleOptions.tabtext2;

            if (first_li.innerHTML == '') {
                first_li.innerHTML = 'Tab 1';
            }
            if (second_li.innerHTML == '') {
                second_li.innerHTML = 'Tab 2';
            }
            tabl1div.id = 'tab1';
            tabl1div.className = 'active';
            tabl2div.id = 'tab2';

            first_li.style.color = settings.tabtitleOptions.tabfontColor;
            first_li.style.fontFamily = settings.tabtitleOptions.tabfontfamily;
            first_li.style.fontSize = settings.tabtitleOptions.tabfontSize + "px";
            first_li.style.borderBottomColor = settings.tabtitleOptions.borderbottomColor;
            second_li.style.color = settings.tabtitleOptions.tabfontColor;
            second_li.style.fontSize = settings.tabtitleOptions.tabfontSize + "px";
            second_li.style.borderBottomColor = settings.tabtitleOptions.borderbottomColor;
            second_li.style.fontFamily = settings.tabtitleOptions.tabfontfamily;
            // Append
            tabs.appendChild(charttitle);
            charttitle.appendChild(spantitle);
            charttitle.appendChild(spanpercentvalue);
            tabs.appendChild(ul);
            ul.appendChild(first_li);
            ul.appendChild(second_li);
            tabs.appendChild(tabl1div);
            tabs.appendChild(tabl2div);
            tabs_container.appendChild(tabs);

            const errorElement = document.getElementById("tabs_container");
            if (errorElement != null) {
                errorElement.parentNode.removeChild(errorElement);
                element.appendChild(tabs_container);
            } else {
                element.appendChild(tabs_container);
            }
            // ADD EVENT LISTENER
            first_li.onclick = () => {
                tabl2div.classList.remove('active');
                tabl1div.classList.add('active');
                first_li.classList.add('active');
                second_li.classList.remove('active');
            }
            second_li.onclick = () => {
                tabl1div.classList.remove('active');
                tabl2div.classList.add('active');
                first_li.classList.remove('active');
                second_li.classList.add('active');
                tabl1div.style.display = 'none';
            }

            if (settings.chartOptions.chartshow !== false && this.fieldsMeta.hasPercentageValues && this.fieldsMeta.hasCategory) {
                const percentval = data.categorical.measures.filter(function (item) {
                    return (item.role["PercentageValues"])
                });
                //console.log("percentval", percentval.length)
                if (percentval.length > 1) {
                    let percentValue = percentval[1].values[1];
                    let decpercent = '';
                    if (percentValue == 1) {
                        decpercent = Math.round(percentValue).toString() + '%';

                    } else if (percentValue > 1) {
                        decpercent = (percentValue * 100).toFixed(settings.chartOptions.percentDecimal) + '%';
                    }
                    else if (percentValue < 0) {
                        decpercent = (percentValue * 100).toFixed(settings.chartOptions.percentDecimal) + '%';
                    }
                    else if (percentValue > 0 && percentValue < 1) {
                        //console.log("percentval.values[0]", percentval.values[0]);
                        let parsevalue = (percentValue * 100).toFixed(settings.chartOptions.percentDecimal) + '%';
                        // console.log("parsevalue", parsevalue);
                        decpercent = parsevalue;

                    } else if (percentValue == 0) {
                        decpercent = percentValue.toString() + '%';
                    }
                    if (percentValue == null) {
                        UIIndicators.showErrorMessage(tabs, "Invalid percentage value data. Please add valid value");
                        var taberror = document.querySelector('.info-container');
                        taberror.classList.add('percenterror');
                        tabs.insertBefore(taberror, tabs.childNodes[0]);
                    }
                    const percent = (settings.chartOptions.chartshow == true && this.fieldsMeta.hasPercentageValues) ? decpercent : '';
                    spanpercentvalue.innerHTML = percent.toString();

                } else {
                    //  console.log("percent");
                }
            }

            var Values1 = seriesData.filter(function (item) {
                return (item.role["Values1"])
            });

            let filtermeeasure = data.categorical.measures.filter(f => f.role["Values1"]);
            let filtervalues = filtermeeasure.map(function (e, i) {
                return e.values;
            })
            let somefilter = filtervalues.some(item => (item[0] === null && item[1] === null) || (item.length == 0) || (item[0] === undefined && item[1] === undefined));

            let filtermeeasure2 = data.categorical.measures.filter(f => f.role["Values3"]);
            let filtervalues2 = filtermeeasure2.map(function (e, i) {
                return e.values;
            })
            let somefilter2 = filtervalues2.some(item => (item[0] === null && item[1] === null) || (item.length == 0) || (item[0] === undefined && item[1] === undefined));
            const parentdiv = document.getElementById('slideshowcontainer');
            console.log("parentdiv",parentdiv.offsetWidth);
            if (!this.fieldsMeta.hasCategory) {
                UIIndicators.showErrorMessage(parentdiv, "Please add Category value",);
                var taberror = document.querySelector('.info-container');
                parentdiv.insertBefore(taberror, parentdiv.childNodes[0]);
            }
            else {
                if (!this.fieldsMeta.hasValues1) {
                    UIIndicators.showErrorMessage(tabl1div, "Please add appropriate Tab 1 value data");
                } else if (somefilter) {
                    UIIndicators.showErrorMessage(tabl1div, "Invalid data.Please add valid value",);
                }
                else {
                    const wrapper = document.createElement('div');
                    const container = document.createElement('div');
                    const titlediv = document.createElement('div');
                    const chartcontainer = document.createElement('div');
                    const versioncontainer = document.createElement('div');

                    // create id
                    wrapper.className = 'wrapper';
                    container.className = 'container'
                    titlediv.id = 'titlediv';
                    chartcontainer.className = 'chartcontainer';
                    chartcontainer.id = 'chartcontainer';
                    versioncontainer.className = 'versioncontainer';

                    // create rectangle element
                    var rectwrapper = document.createElement('div');
                    rectwrapper.className = 'rectwrapper';
                    var canvas1 = document.createElement('canvas1');
                    canvas1.className = 'canvas';
                    canvas1.style.backgroundColor = 'transparent';
                    var canvas2 = document.createElement('canvas2');
                    canvas2.className = 'canvas1';
                    canvas2.style.backgroundColor = settings.chartOptions.bandBgshow ? settings.chartOptions.bandBg : 'transparent';

                    // append child
                    wrapper.appendChild(container);
                    container.appendChild(titlediv);
                    container.appendChild(chartcontainer);
                    chartcontainer.appendChild(rectwrapper);
                    chartcontainer.appendChild(versioncontainer);
                    rectwrapper.appendChild(canvas1);
                    rectwrapper.appendChild(canvas2);
                    tabl1div.appendChild(wrapper);

                    const headertext1 = document.createElement('div');
                    const headertext2 = document.createElement('div');
                    headertext1.className = 'headertext';
                    headertext2.className = 'headertext';
                    versioncontainer.appendChild(headertext1);
                    versioncontainer.appendChild(headertext2);

                    // debugger
                    // console.log("data.categorical.dimensions", data.categorical.dimensions[0]);
                    if (data.categorical.dimensions[0].values.length > 1) {
                        if (data.categorical.dimensions[0].values[0] > data.categorical.dimensions[0].values[1]) {
                            headertext1.innerHTML = data.categorical.dimensions[0].values[1];
                            headertext2.innerHTML = data.categorical.dimensions[0].values[0];
                        } else {
                            headertext1.innerHTML = data.categorical.dimensions[0].values[0];
                            headertext2.innerHTML = data.categorical.dimensions[0].values[1];
                        }
                    } else {
                        let lesslength = data.categorical.dimensions[0].values[0];
                        headertext2.innerHTML = lesslength;

                        if (isNaN(lesslength)) {
                            headertext1.innerHTML = lesslength;
                        } else {
                            headertext1.innerHTML = (parseInt(lesslength) - 1).toString();
                        }
                    }
                       
                    const Value1label = Values1.map(v =>v.name)
                    let clientHeight = document.getElementById('tab1').offsetHeight;
                    let clientwidth1 = document.getElementById('tabs_container').offsetWidth;
                    let minusdiv = document.getElementById('titlediv').offsetWidth ? document.getElementById('titlediv').offsetWidth : 0;
                    var newwidth;
                   if(parentdiv.offsetWidth <= 600){
                    newwidth = parentdiv.offsetWidth - minusdiv;
                    }else{
                        newwidth = clientwidth1 - minusdiv; 
                    }
                    console.log("newwidth",newwidth);
                    let chartHeight, vllength;
                    if(data.categorical.dimensions[0].values.length > 1){
                         chartHeight = clientHeight / (Values1.length / 2);
                         vllength = Values1.length / 2;
                    }else{
                         chartHeight = clientHeight / (Values1.length);
                         vllength = Values1.length;
                    }
              
                    for (let i = 0; i < vllength; i++) {
                        const titledivsub = document.createElement('div');
                        const subcontainerOne = document.createElement('div');
                        titledivsub.className = `titledivsub-${i}`;
                        titlediv.appendChild(titledivsub);
                        titledivsub.innerHTML = `<p>${Value1label[i]}</p>`
                        subcontainerOne.className = `subcontainerOne-${i}`;
                        subcontainerOne.style.height = chartHeight + "px";
                        subcontainerOne.style.width = newwidth + "px";
                        chartcontainer.appendChild(subcontainerOne);
                        this.chartSetting = TreeMapDrilldownUtil.getDefaultValues(this, settings, data, selectionIdBuilder, seriesData, i, true);
                        this.chartRef = this.highcharts.chart(subcontainerOne, this.chartSetting);
                        //console.log("chartRef", this.chartRef);
                        this.chartfilter[i] = [];
                        this.chartfilter[i].push(this.chartRef);

                    }

                }
            }
            const errorMessageElement2 = document.getElementById("vbi-error-message");
            if (errorMessageElement2 != null) {
                errorMessageElement2.parentNode.removeChild(errorMessageElement2);
            }
            var Values3 = seriesData.filter(function (item) {
                return (item.role["Values3"])
            });

            if (!this.fieldsMeta.hasCategory) {
                UIIndicators.showErrorMessage(parentdiv, "Please add Category value",);
                var taberror = document.querySelector('.info-container');
                parentdiv.insertBefore(taberror, parentdiv.childNodes[0]);
            }
            else {
                if (!this.fieldsMeta.hasValues3) {
                    UIIndicators.showErrorMessage(tabl2div, "Please add appropriate Tab 2 value data");
                } else if (somefilter2) {
                    UIIndicators.showErrorMessage(tabl2div, "Invalid data.Please add valid value",);
                }
                else {
                    const wrapper = document.createElement('div');
                    const container = document.createElement('div');
                    const titlediv = document.createElement('div');
                    const chartcontainer = document.createElement('div');
                    const versioncontainer = document.createElement('div');
                   
                    // create id
                    wrapper.className = 'wrapper';
                    container.className = 'container'
                    titlediv.id = 'titlediv';
                    chartcontainer.className = 'chartcontainer';
                    chartcontainer.id = 'chartcontainer';
                    versioncontainer.className = 'versioncontainer';
                    // create rectangle element
                    var rectwrapper = document.createElement('div');
                    rectwrapper.className = 'rectwrapper';
                    var canvas1 = document.createElement('canvas1');
                    canvas1.className = 'canvas';
                    canvas1.style.backgroundColor = 'transparent';
                    var canvas2 = document.createElement('canvas2');
                    canvas2.className = 'canvas1';
                    canvas2.style.backgroundColor = settings.chartOptions.bandBgshow ? settings.chartOptions.bandBg : 'transparent';
                    // append child
                    wrapper.appendChild(container);
                    container.appendChild(titlediv);
                    container.appendChild(chartcontainer);
                    chartcontainer.appendChild(rectwrapper);
                    chartcontainer.appendChild(versioncontainer);
                    rectwrapper.appendChild(canvas1);
                    rectwrapper.appendChild(canvas2);
                    tabl2div.appendChild(wrapper);

                    const headertext3 = document.createElement('div');
                    const headertext4 = document.createElement('div');
                    headertext3.className = 'headertext';
                    headertext4.className = 'headertext';
                    versioncontainer.appendChild(headertext3);
                    versioncontainer.appendChild(headertext4);

                    // console.log(data.categorical.dimensions[0].values[0]);
                    if (data.categorical.dimensions[0].values.length > 1) {
                        if (isNaN(parseInt(data.categorical.dimensions[0].values[0])) || isNaN(parseInt(data.categorical.dimensions[0].values[1]))) {
                            headertext3.innerHTML = data.categorical.dimensions[0].values[0];
                            headertext4.innerHTML = data.categorical.dimensions[0].values[1];
                        } else {
                            const tab2offsetvalue = parseInt(data.categorical.dimensions[0].values[0]) - 1;
                            const tab2offsetvalue2 = parseInt(data.categorical.dimensions[0].values[1]) - 1;

                            if (data.categorical.dimensions[0].values[0] > data.categorical.dimensions[0].values[1]) {
                                headertext3.innerHTML = tab2offsetvalue2.toString();
                                headertext4.innerHTML = tab2offsetvalue.toString();
                            } else {

                                headertext3.innerHTML = tab2offsetvalue.toString();
                                headertext4.innerHTML = tab2offsetvalue2.toString();
                            }
                        }
                    } else {
                        let lesslength = data.categorical.dimensions[0].values[0];
                        headertext4.innerHTML = lesslength;

                        if (isNaN(lesslength)) {
                            headertext3.innerHTML = lesslength;
                        } else {
                            headertext4.innerHTML = (parseInt(lesslength) - 1).toString();
                            headertext3.innerHTML = (parseInt(lesslength) - 2).toString();
                        }
                    }

                    const Value3label = Values3.map(v => v.name)
                    let clientHeight1 = document.getElementById('tabs').offsetHeight;
                    let clientwidth1 = document.getElementById('tabs').offsetWidth;
                    let minusdiv1 = document.getElementById('titlediv').offsetWidth;
                    let newwidth1;
                    if(parentdiv.offsetWidth <= 600){
                        newwidth1 = parentdiv.offsetWidth - minusdiv1;
                        }else{
                        newwidth1 = clientwidth1 - minusdiv1; 
                        }
                    let chartHeight1, vllength1;
                    if(data.categorical.dimensions[0].values.length > 1){
                        chartHeight1 = clientHeight1 / (Values3.length / 2);
                        vllength1 = Values3.length / 2;
                   }else{
                        chartHeight1 = clientHeight1 / (Values3.length);
                        vllength1 = Values3.length;
                   }
                   
                    for (let i = 0; i < vllength1; i++) {
                        const titledivsub = document.createElement('div');
                        titledivsub.className = `titledivsub-${i}`;
                        titlediv.appendChild(titledivsub);
                        titledivsub.innerHTML = `<p>${Value3label[i]}</p>`
                        const subcontainerOne = document.createElement('div');
                        subcontainerOne.className = `subcontainerOne-${i}`;
                        subcontainerOne.style.height = chartHeight1 + "px";
                        subcontainerOne.style.width = newwidth1 + "px";
                        chartcontainer.appendChild(subcontainerOne);
                        this.chartSetting2 = TreeMapDrilldownUtil.getDefaultValues(this, settings, data, selectionIdBuilder, seriesData, i, false);
                        this.chartRef2 = this.highcharts.chart(subcontainerOne, this.chartSetting2);
                        this.chartfilter1[i] = [];
                        this.chartfilter1[i].push(this.chartRef2);

                    }

                }
            }

            if (carouselstate) {
                let tbcontainer1 = document.querySelector('.slideshowcontainer');
                let mySlides = document.createElement('div');
                mySlides.className = 'mySlides';
                tbcontainer1.appendChild(mySlides);
                mySlides.appendChild(tabs_container);
            }

            var activeTab = document.querySelector('.error-indicator');
            var activeNextSibling = activeTab.nextElementSibling;
            activeNextSibling.insertBefore(errorMessageElement2, activeNextSibling.childNodes[0]);

        } catch (e) {
            console.log("error", e);
        }
    }
    

    private generateData1(
        data: Data,
        element: HTMLElement,
        selectionIdBuilder: SelectionIdBuilder,
        settings: VisualSettings,
        carouselstate: string
    ) {
        try {
            // console.log("Data", data);
            this.chartfilter = [], this.chartfilter1 = [];
            let seriesData = this.GET_SERIES(data, settings, selectionIdBuilder, this.hcSelectionManager);

            const tabs_container1 = document.createElement('div');
            const tabs = document.createElement('div');
            const charttitle = document.createElement('div');
            const spantitle = document.createElement('span');
            const spanpercentvalue = document.createElement('span')
            const ul = document.createElement('ul');
            const first_li = document.createElement('li');
            const second_li = document.createElement('li');
            const tabl1div1 = document.createElement('div');
            const tabl2div1 = document.createElement('div');
            // create id
            tabs_container1.id = 'tabs_container1';
            tabs.className = 'tabs';
            tabs.id = 'tabs';
            if (settings.chartOptions.chartshow !== false) {
                // Chart title Options
                charttitle.id = 'charttitle';
                spantitle.id = 'spantitle';
                spanpercentvalue.id = 'spanpercentvalue';
                spantitle.innerHTML = 'Sample 2';
                charttitle.style.fontFamily = settings.chartOptions.fontfamily;
                charttitle.style.fontSize = settings.chartOptions.fontSize + "px";
                charttitle.style.fontWeight = settings.chartOptions.fontWeight;
                spantitle.style.color = settings.chartOptions.fontColor;
                spanpercentvalue.style.color = settings.chartOptions.percentvalfontColor;
                charttitle.style.textAlign = settings.chartOptions.textAlign;
            }
            if (settings.chartOptions.chartshow && spantitle.innerHTML == '') {
                spantitle.innerHTML = 'Sample';
            }

            ul.id = 'tabs-list';
            first_li.className = 'active';
            // Tabs title Options
            first_li.innerHTML = settings.tabtitleOptions.tabtext1;
            second_li.innerHTML = settings.tabtitleOptions.tabtext2;

            if (first_li.innerHTML == '') {
                first_li.innerHTML = 'Tab 1';
            }
            if (second_li.innerHTML == '') {
                second_li.innerHTML = 'Tab 2';
            }
            tabl1div1.id = 'tab1';
            tabl1div1.className = 'active';
            tabl2div1.id = 'tab2';

            first_li.style.color = settings.tabtitleOptions.tabfontColor;
            first_li.style.fontFamily = settings.tabtitleOptions.tabfontfamily;
            first_li.style.fontSize = settings.tabtitleOptions.tabfontSize + "px";
            first_li.style.borderBottomColor = settings.tabtitleOptions.borderbottomColor;
            second_li.style.color = settings.tabtitleOptions.tabfontColor;
            second_li.style.fontSize = settings.tabtitleOptions.tabfontSize + "px";
            second_li.style.borderBottomColor = settings.tabtitleOptions.borderbottomColor;
            second_li.style.fontFamily = settings.tabtitleOptions.tabfontfamily;
            // Append
            tabs.appendChild(charttitle);
            charttitle.appendChild(spantitle);
            charttitle.appendChild(spanpercentvalue);
            tabs.appendChild(ul);
            ul.appendChild(first_li);
            ul.appendChild(second_li);
            tabs.appendChild(tabl1div1);
            tabs.appendChild(tabl2div1);
            tabs_container1.appendChild(tabs);
            
            const errorElement = document.getElementById("tabs_container1");
            if (errorElement != null) {
                errorElement.parentNode.removeChild(errorElement);
                element.appendChild(tabs_container1);
            } else {
                element.appendChild(tabs_container1);
            }
            // ADD EVENT LISTENER
            first_li.onclick = () => {
                tabl2div1.classList.remove('active');
                tabl1div1.classList.add('active');
                first_li.classList.add('active');
                second_li.classList.remove('active');
            }
            second_li.onclick = () => {
                tabl1div1.classList.remove('active');
                tabl2div1.classList.add('active');
                first_li.classList.remove('active');
                second_li.classList.add('active');
                tabl1div1.style.display = 'none';
            }

            if (settings.chartOptions.chartshow !== false && this.fieldsMeta.hasPercentageValues && this.fieldsMeta.hasCategory) {
                const percentval = data.categorical.measures.filter(function (item) {
                    return (item.role["PercentageValues"])
                });
                //console.log("percentval", percentval.length)
                if (percentval.length > 1) {
                    let percentValue = percentval[1].values[1];
                    let decpercent = '';
                    if (percentValue == 1) {
                        decpercent = Math.round(percentValue).toString() + '%';

                    } else if (percentValue > 1) {
                        decpercent = (percentValue * 100).toFixed(settings.chartOptions.percentDecimal) + '%';
                    }
                    else if (percentValue < 0) {
                        decpercent = (percentValue * 100).toFixed(settings.chartOptions.percentDecimal) + '%';
                    }
                    else if (percentValue > 0 && percentValue < 1) {
                        //console.log("percentval.values[0]", percentval.values[0]);
                        let parsevalue = (percentValue * 100).toFixed(settings.chartOptions.percentDecimal) + '%';
                        // console.log("parsevalue", parsevalue);
                        decpercent = parsevalue;

                    } else if (percentValue == 0) {
                        decpercent = percentValue.toString() + '%';
                    }
                    if (percentValue == null) {
                        UIIndicators.showErrorMessage(tabs, "Invalid percentage value data. Please add valid value");
                        var taberror = document.querySelector('.info-container');
                        taberror.classList.add('percenterror');
                        tabs.insertBefore(taberror, tabs.childNodes[0]);
                    }
                    const percent = (settings.chartOptions.chartshow == true && this.fieldsMeta.hasPercentageValues) ? decpercent : '';
                    spanpercentvalue.innerHTML = percent.toString();

                } else {
                    //  console.log("percent");
                }
            }

            var Values1 = seriesData.filter(function (item) {
                return (item.role["Values1"])
            });

            let filtermeeasure = data.categorical.measures.filter(f => f.role["Values1"]);
            let filtervalues = filtermeeasure.map(function (e, i) {
                return e.values;
            })
            let somefilter = filtervalues.some(item => (item[0] === null && item[1] === null) || (item.length == 0) || (item[0] === undefined && item[1] === undefined));

            let filtermeeasure2 = data.categorical.measures.filter(f => f.role["Values3"]);
            let filtervalues2 = filtermeeasure2.map(function (e, i) {
                return e.values;
            })
            let somefilter2 = filtervalues2.some(item => (item[0] === null && item[1] === null) || (item.length == 0) || (item[0] === undefined && item[1] === undefined));
            const parentdiv = document.getElementById('slideshowcontainer');

           
            if (!this.fieldsMeta.hasCategory) {
                UIIndicators.showErrorMessage(parentdiv, "Please add Category value",);
                var taberror = document.querySelector('.info-container');
                parentdiv.insertBefore(taberror, parentdiv.childNodes[0]);
            }
            else {
              
                if (!this.fieldsMeta.hasValues1) {
                    UIIndicators.showErrorMessage(tabl1div1, "Please add appropriate Tab 1 value data");
                } else if (somefilter) {
                    UIIndicators.showErrorMessage(tabl1div1, "Invalid data.Please add valid value",);
                }
                else {
                    const wrapper = document.createElement('div');
                    const container = document.createElement('div');
                    const titlediv = document.createElement('div');
                    const chartcontainer = document.createElement('div');
                    const versioncontainer = document.createElement('div');

                    // create id
                    wrapper.className = 'wrapper';
                    container.className = 'container'
                    titlediv.id = 'titlediv';
                    chartcontainer.className = 'chartcontainer';
                    chartcontainer.id = 'chartcontainer';
                    versioncontainer.className = 'versioncontainer';

                    // create rectangle element
                    var rectwrapper = document.createElement('div');
                    rectwrapper.className = 'rectwrapper';
                    var canvas1 = document.createElement('canvas1');
                    canvas1.className = 'canvas';
                    canvas1.style.backgroundColor = 'transparent';
                    var canvas2 = document.createElement('canvas2');
                    canvas2.className = 'canvas1';
                    canvas2.style.backgroundColor = settings.chartOptions.bandBgshow ? settings.chartOptions.bandBg : 'transparent';

                    // append child
                    wrapper.appendChild(container);
                    container.appendChild(titlediv);
                    container.appendChild(chartcontainer);
                    chartcontainer.appendChild(rectwrapper);
                    chartcontainer.appendChild(versioncontainer);
                    rectwrapper.appendChild(canvas1);
                    rectwrapper.appendChild(canvas2);
                    tabl1div1.appendChild(wrapper);

                    const headertext1 = document.createElement('div');
                    const headertext2 = document.createElement('div');
                    headertext1.className = 'headertext';
                    headertext2.className = 'headertext';
                    versioncontainer.appendChild(headertext1);
                    versioncontainer.appendChild(headertext2);

                    // debugger
                    // console.log("data.categorical.dimensions", data.categorical.dimensions[0]);
                    if (data.categorical.dimensions[0].values.length > 1) {
                        if (data.categorical.dimensions[0].values[0] > data.categorical.dimensions[0].values[1]) {
                            headertext1.innerHTML = data.categorical.dimensions[0].values[1];
                            headertext2.innerHTML = data.categorical.dimensions[0].values[0];
                        } else {
                            headertext1.innerHTML = data.categorical.dimensions[0].values[0];
                            headertext2.innerHTML = data.categorical.dimensions[0].values[1];
                        }
                    } else {
                        let lesslength = data.categorical.dimensions[0].values[0];
                        headertext2.innerHTML = lesslength;

                        if (isNaN(lesslength)) {
                            headertext1.innerHTML = lesslength;
                        } else {
                            headertext1.innerHTML = (parseInt(lesslength) - 1).toString();
                        }
                    }

                    const Value1label = Values1.map(v =>v.name)
                    let clientHeight = document.getElementById('tab1').offsetHeight;
                    let clientwidth1 = document.getElementById('tabs').offsetWidth;
                    let minusdiv = document.getElementById('titlediv').offsetWidth ? document.getElementById('titlediv').offsetWidth : 0;
                    let newwidth;
                    if(parentdiv.offsetWidth <= 600){
                        newwidth = parentdiv.offsetWidth - minusdiv;
                        }else{
                        newwidth = clientwidth1 - minusdiv; 
                        }
                    let chartHeight, vllength;
                    if(data.categorical.dimensions[0].values.length > 1){
                         chartHeight = clientHeight / (Values1.length / 2);
                         vllength = Values1.length / 2;
                    }else{
                         chartHeight = clientHeight / (Values1.length);
                         vllength = Values1.length;
                    }
                    for (let i = 0; i < vllength; i++) {
                        const titledivsub = document.createElement('div');
                        const subcontainerOne = document.createElement('div');
                        titledivsub.className = `titledivsub-${i}`;
                        titlediv.appendChild(titledivsub);
                        titledivsub.innerHTML = `<p>${Value1label[i]}</p>`
                        subcontainerOne.className = `subcontainerOne-${i}`;
                        subcontainerOne.style.height = chartHeight + "px";
                        subcontainerOne.style.width = newwidth + "px";
                        chartcontainer.appendChild(subcontainerOne);
                        this.chartSetting3 = TreeMapDrilldownUtil.getDefaultValues(this, settings, data, selectionIdBuilder, seriesData, i, true);
                        this.chartRef3 = this.highcharts.chart(subcontainerOne, this.chartSetting3);
                        //console.log("chartRef", this.chartRef);
                        this.chartfilter3[i] = [];
                        this.chartfilter3[i].push(this.chartRef3);

                    }

                }
            }
            const errorMessageElement2 = document.getElementById("vbi-error-message");
            if (errorMessageElement2 != null) {
                errorMessageElement2.parentNode.removeChild(errorMessageElement2);
            }
            var Values3 = seriesData.filter(function (item) {
                return (item.role["Values3"])
            });

            if (!this.fieldsMeta.hasCategory) {
                UIIndicators.showErrorMessage(parentdiv, "Please add Category value",);
                var taberror = document.querySelector('.info-container');
                parentdiv.insertBefore(taberror, parentdiv.childNodes[0]);
            }
            else {
                if (!this.fieldsMeta.hasValues3) {
                    UIIndicators.showErrorMessage(tabl2div1, "Please add appropriate Tab 2 value data");
                } else if (somefilter2) {
                    UIIndicators.showErrorMessage(tabl2div1, "Invalid data.Please add valid value",);
                }
                else {
                    const wrapper = document.createElement('div');
                    const container = document.createElement('div');
                    const titlediv = document.createElement('div');
                    const chartcontainer = document.createElement('div');
                    const versioncontainer = document.createElement('div');
                   
                    // create id
                    wrapper.className = 'wrapper';
                    container.className = 'container'
                    titlediv.id = 'titlediv';
                    chartcontainer.className = 'chartcontainer';
                    chartcontainer.id = 'chartcontainer';
                    versioncontainer.className = 'versioncontainer';
                    // create rectangle element
                    var rectwrapper = document.createElement('div');
                    rectwrapper.className = 'rectwrapper';
                    var canvas1 = document.createElement('canvas1');
                    canvas1.className = 'canvas';
                    canvas1.style.backgroundColor = 'transparent';
                    var canvas2 = document.createElement('canvas2');
                    canvas2.className = 'canvas1';
                    canvas2.style.backgroundColor = settings.chartOptions.bandBgshow ? settings.chartOptions.bandBg : 'transparent';
                    // append child
                    wrapper.appendChild(container);
                    container.appendChild(titlediv);
                    container.appendChild(chartcontainer);
                    chartcontainer.appendChild(rectwrapper);
                    chartcontainer.appendChild(versioncontainer);
                    rectwrapper.appendChild(canvas1);
                    rectwrapper.appendChild(canvas2);
                    tabl2div1.appendChild(wrapper);

                    const headertext3 = document.createElement('div');
                    const headertext4 = document.createElement('div');
                    headertext3.className = 'headertext';
                    headertext4.className = 'headertext';
                    versioncontainer.appendChild(headertext3);
                    versioncontainer.appendChild(headertext4);

                    // console.log(data.categorical.dimensions[0].values[0]);
                    if (data.categorical.dimensions[0].values.length > 1) {
                        if (isNaN(parseInt(data.categorical.dimensions[0].values[0])) || isNaN(parseInt(data.categorical.dimensions[0].values[1]))) {
                            headertext3.innerHTML = data.categorical.dimensions[0].values[0];
                            headertext4.innerHTML = data.categorical.dimensions[0].values[1];
                        } else {
                            const tab2offsetvalue = parseInt(data.categorical.dimensions[0].values[0]) - 1;
                            const tab2offsetvalue2 = parseInt(data.categorical.dimensions[0].values[1]) - 1;

                            if (data.categorical.dimensions[0].values[0] > data.categorical.dimensions[0].values[1]) {
                                headertext3.innerHTML = tab2offsetvalue2.toString();
                                headertext4.innerHTML = tab2offsetvalue.toString();
                            } else {

                                headertext3.innerHTML = tab2offsetvalue.toString();
                                headertext4.innerHTML = tab2offsetvalue2.toString();
                            }
                        }
                    } else {
                        let lesslength = data.categorical.dimensions[0].values[0];
                        headertext4.innerHTML = lesslength;

                        if (isNaN(lesslength)) {
                            headertext3.innerHTML = lesslength;
                        } else {
                            headertext4.innerHTML = (parseInt(lesslength) - 1).toString();
                            headertext3.innerHTML = (parseInt(lesslength) - 2).toString();
                        }
                    }
                    const Value3label = Values3.map(v => v.name)
                    let clientHeight1 = document.getElementById('tabs').offsetHeight;
                    let clientwidth1 = document.getElementById('tabs').offsetWidth;
                    let minusdiv1 = document.getElementById('titlediv').offsetWidth;
                    let chartHeight1, vllength1, newwidth1;
                    if(parentdiv.offsetWidth <= 600){
                        newwidth1 = parentdiv.offsetWidth - minusdiv1;
                        }else{
                        newwidth1 = clientwidth1 - minusdiv1; 
                        }
                    if(data.categorical.dimensions[0].values.length > 1){
                        chartHeight1 = clientHeight1 / (Values3.length / 2);
                        vllength1 = Values3.length / 2;
                   }else{
                        chartHeight1 = clientHeight1 / (Values3.length);
                        vllength1 = Values3.length;
                   }
                    for (let i = 0; i < vllength1; i++) {
                        const titledivsub = document.createElement('div');
                        titledivsub.className = `titledivsub-${i}`;
                        titlediv.appendChild(titledivsub);
                        titledivsub.innerHTML = `<p>${Value3label[i]}</p>`
                        const subcontainerOne = document.createElement('div');
                        subcontainerOne.className = `subcontainerOne-${i}`;
                        subcontainerOne.style.height = chartHeight1 + "px";
                        subcontainerOne.style.width = newwidth1 + "px";
                        chartcontainer.appendChild(subcontainerOne);
                        this.chartSetting4 = TreeMapDrilldownUtil.getDefaultValues(this, settings, data, selectionIdBuilder, seriesData, i, false);
                        this.chartRef4 = this.highcharts.chart(subcontainerOne, this.chartSetting4);
                        this.chartfilter4[i] = [];
                        this.chartfilter4[i].push(this.chartRef4);
                    }
                }
            }

            if (carouselstate) {
                let tbcontainer1 = document.querySelector('.slideshowcontainer');
                let mySlides = document.createElement('div');
                mySlides.className = 'mySlides';
                tbcontainer1.appendChild(mySlides);
                mySlides.appendChild(tabs_container1);
            }
            var activeTab = document.querySelector('.error-indicator');
            var activeNextSibling = activeTab.nextElementSibling;
            activeNextSibling.insertBefore(errorMessageElement2, activeNextSibling.childNodes[0]);

        } catch (e) {
            console.log("error", e);
        }
    }
   
    private getNumberFormattingSettings(numberFormatSettings: any, settings: VisualSettings) {
        let noOfDecimal, scalingFactor, prefix, suffix;
        if (numberFormatSettings && numberFormatSettings.showMeasureLabel) {
            scalingFactor = numberFormatSettings.scalingFactor != undefined ? numberFormatSettings.scalingFactor : 'none';
            noOfDecimal = numberFormatSettings.noOfDecimal != undefined ? numberFormatSettings.noOfDecimal : 2;
            suffix = numberFormatSettings.suffix != undefined ? numberFormatSettings.suffix : '';
            prefix = numberFormatSettings.prefix != undefined ? numberFormatSettings.prefix : '';
        }
        else {
            noOfDecimal = settings.numberformat.dlNoOfDecimal;
            scalingFactor = settings.numberformat.dlScalingFactor;
            prefix = settings.numberformat.dlPrefix;
            suffix = settings.numberformat.dlSuffix;
        }
        return { noOfDecimal, prefix, suffix, scalingFactor }
    }

    private GET_SERIES(data: Data, settings: VisualSettings, selectionIdBuilder: SelectionIdBuilder, hcSelectionManager: HighchartSelectionManager) {
        const dataViewCategories = data.categorical.dimensions;
        const selectionIdsLength = selectionIdBuilder.getSelectionIds().length;
        const metadata = data.metadata, objects = data.categorical.objects;
        const dataViewMeasures = data.categorical.measures;
        const valueMeasures = dataViewMeasures.filter(dataViewMeasure => dataViewMeasure.role.Values1 || dataViewMeasure.role.Values3);
        let selectiondata = [], seriesData = [];
        for (let measureIndex = 0; measureIndex < valueMeasures.length; measureIndex++) {
            const series = [];
            const measureName = valueMeasures[measureIndex].name;
            const dataViewMeasure = valueMeasures[measureIndex];
            const measureValues = valueMeasures[measureIndex].values;
            const dataViewMeasureObject: Categorical.Objects = BifrostDataUtils.GETMEASUREOBJECTS(
                objects,
                dataViewMeasure.name
            );
            const dataViewMeasureObjectSettings = dataViewMeasureObject.settings;
            const numberFormatSettings = dataViewMeasureObjectSettings && dataViewMeasureObjectSettings.numberformat;
            const { noOfDecimal, scalingFactor, prefix, suffix } = this.getNumberFormattingSettings(numberFormatSettings, settings);
            measureValues.forEach((element, index) => {
                const categoriesObject = {};
                const categoryIndex = [], catagoryMemberIndex = [];
                dataViewCategories.forEach((categories, catagoryIndex) => {
                    categoriesObject[categories.id] = categories.values[index];
                    categoryIndex.push(catagoryIndex);
                    catagoryMemberIndex.push(index);
                });
                const selectionId = selectionIdBuilder.getSelectionId({
                    'measureName': measureName,
                    'categoricalIndex': categoryIndex,
                    'categoricalMemberIndex': catagoryMemberIndex
                });
                const isPointSelected = hcSelectionManager.isSelected(dataViewMeasure, index, selectionId);
                const seriesData = {
                    key: element,
                    index,
                    id: categoriesObject,
                    selectionId, className: isPointSelected ? 'fade-out' : '',
                    manualSelect: isPointSelected ? false : (selectionIdsLength === 0 ? undefined : true),
                    isInteger: dataViewMeasure.isInteger,
                    scalingFactor, prefix, suffix, noOfDecimal, autoScalingFactor: dataViewMeasure.scalingFactor,
                    ruleKey: dataViewMeasure.ruleKeys && dataViewMeasure.ruleKeys[index] ? dataViewMeasure.ruleKeys[index] : null,
                    cfApplied: true,
                    ispercentagepoint: scalingFactor == "100" ? true : false,
                    role: dataViewMeasure.role,
                    dataLabels: {
                        enabled: settings.dataLabels.show,
                        shadow: false,
                        style: {
                            fontSize: settings.dataLabels.dlfontSize + 'px',
                            fontWeight: (dataViewMeasure.role.Values1 == true && (dataViewMeasure.values[1] || dataViewMeasure.values[1] == 0)) || (dataViewMeasure.role.Values3 == true && (dataViewMeasure.values[1] || dataViewMeasure.values[1] == 0)) ? settings.dataLabels.currentdlfontWeight : settings.dataLabels.dlFontWeight,
                            color: settings.dataLabels.dlfontColor,
                            textShadow: false,
                            textOutline: false,
                        },
                    },
                    y: measureValues[index],
                }
                series.push(seriesData);
            });
            const seriesItem = <any>{
                type: "line",
                turboThreshold: 0,
                zIndex: measureIndex === 0 ? 100 : 0,
                marker: {
                    symbol: settings.markerOption.markerSymbol
                },
                selectionId: selectionIdBuilder.getSelectionId({ 'measureName': dataViewMeasure.name }),
                name: BifrostDataUtils.GETMEASURELABELFROMNAME(data.metadata, dataViewMeasures[measureIndex].name),
                data: series,
                key: valueMeasures[measureIndex].id,
                role: valueMeasures[measureIndex].role,
            }
            seriesData.push(seriesItem);
        }
        return seriesData;
    }

    private responsiveChart(
        data: Data,
        element: HTMLElement,
        selectionIdBuilder: SelectionIdBuilder,
        settings: VisualSettings,
    ) {
        try {
            const varcheck = document.getElementById('slideshowcontainer');

            const slideshowcontainer = document.createElement('div');
            slideshowcontainer.className = 'slideshowcontainer';
            slideshowcontainer.id = 'slideshowcontainer';



            if (varcheck) {
                varcheck.replaceWith(slideshowcontainer);
                element.appendChild(slideshowcontainer);
            } else {
                element.appendChild(slideshowcontainer);
            }

            // element.appendChild(slideshowcontainer); 
            //  }

            var slideshowcontainerwidth = slideshowcontainer.offsetWidth;
            // console.log("slideshowcontainerwidth", slideshowcontainerwidth);

            if (slideshowcontainerwidth <= 600) {
                this.generateData(data, element, selectionIdBuilder, settings, 'mySlides');
                this.generateData1(data, element, selectionIdBuilder, settings, 'mySlides');
                const prev = document.createElement('a');
                const next = document.createElement('a');
                prev.className = 'prev';
                next.className = 'next';
                slideshowcontainer.appendChild(prev);
                slideshowcontainer.appendChild(next);
                prev.addEventListener("click", event => {
                    this.plusSlides(-1);
                })
                next.addEventListener("click", event => {
                    this.plusSlides(1);
                })
                this.showSlides(this.slideIndex);

            } else {
                this.generateData(data, element, selectionIdBuilder, settings, null);
                this.generateData1(data, element, selectionIdBuilder, settings, null);
            }
        }
        catch (e) {
            console.log("error", e);
        }
    }

    private plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    private showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
        if (n > slides.length) { this.slideIndex = 1 }
        if (n < 1) { this.slideIndex = slides.length }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
            slides[i].className = slides[i].className.replace(" active", "");
        }
        slides[this.slideIndex - 1].style.display = "block";
        slides[this.slideIndex - 1].className += " active";
    }

    public generateSampleVisual(element) {
        const lpChartSettings: any = {
            chart: {
                type: "line",
            },
            legend: {
                enabled: false
            },
            title: {
                text: "",
            },
            yAxis: {
                title: {
                    text: "",
                },
                labels: {
                    enabled: false,
                }
            },
            xAxis: {
                title: {
                    text: "",
                },
                labels: {
                    enabled: false,
                },
                categories: ["2020", "2021"],
            },
            tooltip: {
                valuePrefix: "$",
                enabled: false
            },
            credits: {
                enabled: false,
            },
            plotOptions: {
                series: {
                    cursor: "pointer",
                },
            },
            series: [
                {
                    name: "Eligible Purchase",
                    data: [814612, 1037469],
                    dashStyle: "Dash",
                },
                {
                    name: "Y/Y Growth",
                    data: [2020203, 69000],
                    dashStyle: "Dash",
                }
            ],
        };
        this.highcharts.chart(element, lpChartSettings);
    }
}
function showSlides(slideIndex: number) {
    throw new Error("Function not implemented.");
}

