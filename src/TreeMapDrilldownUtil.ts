import { VisualSettings, ValidValues } from "./settings";
import { Data } from "@visualbi/bifrost-powerbi/dist/types/DataTypeDef";
import { HighchartsUtil } from "@visualbi/powerbi-common/dist/HighChartUtils/HighchartsUtil";
import { SelectionIdBuilder } from '@visualbi/bifrost-powerbi/dist/SelectionIdBuilder';
import { TreeMapDrilldownChart } from "./visual";
export class TreeMapDrilldownUtil {
    public static getDefaultValues(instance: TreeMapDrilldownChart, settings: VisualSettings, data: Data, selectionIdBuilder: SelectionIdBuilder, seriesData: any, i, isbool: boolean, businessunits) {
        let seriesfilterdata1 = [], seriesfilterdata2 = [];
        if (isbool) {
            var Values1 = seriesData.filter(function (item) {
                return (item.role["Values1"])
            });
           
            if (data.categorical['groupDimension'][0].values.length > 1) {
                var firsthalfseries = Values1.slice(0, Values1.length / 2);
                var secondhalfseries = Values1.slice(-Values1.length / 2);
               // console.log("Values1.length/2",Values1.length/2);
                for (let i = 0; i < Values1.length / 2; i++) {
                    seriesfilterdata1[i] = [];
                    if(i>2 && (i==((Values1.length/2)-1) &&  (businessunits == data.categorical.dimensions[0].values.indexOf('RASP') || businessunits == data.categorical.dimensions[0].values.indexOf('CAS')))){
                        seriesfilterdata1[i].push(null);
                        seriesfilterdata1[i].push(null);
                    }else{
                        seriesfilterdata1[i].push(firsthalfseries[i].data[businessunits]);
                        seriesfilterdata1[i].push(secondhalfseries[i].data[businessunits]);
                    }
         
                }
            }else if (data.categorical['groupDimension'][0].values.length == 1) {
               
                for (let i = 0; i < Values1.length; i++) {
                    seriesfilterdata1[i] = [];
                    seriesfilterdata1[i].push(null);
                    seriesfilterdata1[i].push(Values1[i].data[businessunits]);
                }
            }
        }
        else  {
            var Values3 = seriesData.filter(function (item) {
                return (item.role["Values3"])
            });
            //console.log("Values3",Values3);
            if (data.categorical['groupDimension'][0].values.length > 1) {
                var firsthalfseries = Values3.slice(0, Values3.length / 2);
                var secondhalfseries = Values3.slice(-Values3.length / 2);
                for (let i = 0; i < Values3.length / 2; i++) {
                    seriesfilterdata2[i] = [];
                    if(i>2 && (i==((Values3.length/2)-1) &&  (businessunits == data.categorical.dimensions[0].values.indexOf('RASP') || businessunits == data.categorical.dimensions[0].values.indexOf('CAS')))){
                        seriesfilterdata2[i].push(null);
                        seriesfilterdata2[i].push(null);
                    }else{
                        seriesfilterdata2[i].push(firsthalfseries[i].data[businessunits]);
                        seriesfilterdata2[i].push(secondhalfseries[i].data[businessunits]);
                    }
                }
            } else if (data.categorical['groupDimension'][0].values.length == 1) {
                for (let i = 0; i <Values3.length; i++) {
                    seriesfilterdata2[i] = [];
                    // seriesfilterdata2[i].push("null");
                    // seriesfilterdata2[i].push(Values3[i].data[businessunits]);
                }
            }
        }

        let tab1height = document.getElementById('tabs').offsetHeight;
        let Chartheight = tab1height - 40;
        let tbchartHeight1: number, tbchartHeight2;
        if (isbool) {
            if (data.categorical['groupDimension'][0].values.length > 1) {
                tbchartHeight1 = Chartheight / (Values1.length / 2);

            } else if (data.categorical['groupDimension'][0].values.length == 1) {
                tbchartHeight1 = Chartheight / (Values1.length);
            }
        } else {

            if (data.categorical['groupDimension'][0].values.length > 1) {
                tbchartHeight2 = Chartheight / (Values3.length / 2);
            } else if (data.categorical['groupDimension'][0].values.length == 1) {
                tbchartHeight2 = Chartheight / (Values3.length);
            }
        }
        const defaultValue = {
            chart: {
                type: 'line',
                height: isbool ? tbchartHeight1/2 : tbchartHeight2/2,
                margin: [30, 80, 30, 80],
                backgroundColor: 'transparent',
            },
            title: {
                enabled: false,
                text: '',
            },
            legend: {
                enabled: false
            },
            yAxis: {
                title: {
                    text: "",
                },
                labels: {
                    enabled: false
                },
                gridLineWidth: 0,
            },
            xAxis: {
                title: {
                    text: "",
                },
                labels: {
                    enabled: false
                },
                opposite: true,
                gridLineWidth: 0,
                lineColor: 'transparent',
                lineWidth: 0,
                tickLength: 0,
            },
            tooltip: {
                enabled: false
            },
            credits: {
                enabled: false,
            },
            navigation: {
                buttonOptions: {
                    enabled: false
                }
            },
            plotOptions: {
                series: {
                    cursor: "pointer",
                    allowPointSelect: true,
                    dataLabels: {
                        enabled: settings.dataLabels.show,
                        inside: false,
                        allowOverlap: true,
                        crop: false,
                        overflow: 'none',
                        formatter: function () {
                            return HighchartsUtil.DATALABELFORMATTER(this, settings, '', false, this.point.ispercentagepoint ? this.y * 100 : this.y);
                        }
                    },
                    point: {
                        events: {
                            contextmenu: (e) => {
                                e.preventDefault();
                                return false;
                                selectionIdBuilder.showContextMenu(e.point.selectionIds, e.clientX, e.clientY);
                            },
                            select: () => {
                                return false
                            },
                            click: (e) => {
                                instance.hcSelectionManager.select(e);
                                if (instance.hcSelectionManager.getSelectedPointCount() > 0) {
                                    instance.hcSelectionManager.selectPointsFromSelectionIds(instance.chartRef);
                                }
                                return false;
                            }
                        }
                    }
                },
            },
            series: [{
                data: (isbool) ? seriesfilterdata1[i] : seriesfilterdata2[i],
                dashStyle: "Dash",
                color: '#A9A9A9',
                align: 'center',
                marker: {
                    enabled: settings.markerOption.show,
                    symbol: settings.markerOption.markerSymbol,
                    radius: settings.markerOption.markerRadius,
                    fillColor: settings.markerOption.markerfillcolor
                }
            }],
            responsive: {
                rules: [
                {
                    condition: {
                        minHeight:41,
                        maxHeight: 95
                    },
                    chartOptions: {
                        chart: {
                            margin: [20, 70, 20, 70],
                        }
                    }
                },
                {
                    condition: {
                        maxHeight: 40
                    },
                    chartOptions: {
                        chart: {
                            margin: [5, 70, 5, 70],
                        },
                    }
                },
                ]
            }
        };
        return defaultValue
    }
}

