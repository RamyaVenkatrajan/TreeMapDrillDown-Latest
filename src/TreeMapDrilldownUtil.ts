import { VisualSettings, ValidValues } from "./settings";
import { Data } from "@visualbi/bifrost-powerbi/dist/types/DataTypeDef";
import { RenderOptions } from '@visualbi/bifrost-powerbi/dist/types/BifrostTypeDef';
import { HighchartsUtil } from "@visualbi/powerbi-common/dist/HighChartUtils/HighchartsUtil";
import { values } from "lodash";
import { SelectionIdBuilder } from '@visualbi/bifrost-powerbi/dist/SelectionIdBuilder';
import { TreeMapDrilldownChart } from "./visual";
import { Console } from "console";
export class TreeMapDrilldownUtil {
    public static getDefaultValues(instance: TreeMapDrilldownChart, settings: VisualSettings, data: Data, selectionIdBuilder: SelectionIdBuilder, seriesData: any, i, isbool: boolean) {
        let seriesfilterdata1 = [], seriesfilterdata2 = [];
        // debugger
        if (isbool) {
           
            var Values1 = seriesData.filter(function (item) {
                return (item.role["Values1"])
            });
           // console.log("Values1",Values1);
            if (data.categorical.dimensions[0].values.length > 1) {
                
                var firsthalfseries = Values1.slice(0, Values1.length / 2);
                var secondhalfseries = Values1.slice(-Values1.length / 2);
               // console.log(" Values1.length1", Values1.length);
                for (let i = 0; i < Values1.length / 2; i++) {

                    seriesfilterdata1[i] = [];
                    seriesfilterdata1[i].push(firsthalfseries[i].data[0]);
                    seriesfilterdata1[i].push(secondhalfseries[i].data[1]);
                }
            } else if (data.categorical.dimensions[0].values.length == 1){
              //  console.log(" Values1.length", Values1.length);
                for (let i = 0; i < Values1.length; i++) {
                    seriesfilterdata1[i] = [];
                    seriesfilterdata1[i].push("null");
                    seriesfilterdata1[i].push(Values1[i].data[0]);
                  
                  //  console.log(" seriesfilterdata1", seriesfilterdata1[i])
                }
            }
        }
        else  {
            var Values3 = seriesData.filter(function (item) {
                return (item.role["Values3"])
            });
           // console.log("Values3",Values3)
           
            if (data.categorical.dimensions[0].values.length > 1) {
                var firsthalfseries = Values3.slice(0, Values3.length / 2);
                var secondhalfseries = Values3.slice(-Values3.length / 2);
                for (let i = 0; i < Values3.length / 2; i++) {
                    seriesfilterdata2[i] = [];
                    seriesfilterdata2[i].push(firsthalfseries[i].data[0]);
                    seriesfilterdata2[i].push(secondhalfseries[i].data[1]);
                }
            } else if (data.categorical.dimensions[0].values.length == 1) {
               // console.log("data.categorical.dimensions[0].values.length",data.categorical.dimensions[0].values.length)
                for (let i = 0; i <Values3.length; i++) {
                    seriesfilterdata2[i] = [];
                   
                    //seriesfilterdata2[i].push(Values3[i].data[0]);
                     //seriesfilterdata1[i].push("null");

                   // console.log(" seriesfilterdata2", seriesfilterdata2[i])
                    
                }
            }
        }



        let tab1height = document.getElementById('tabs').offsetHeight;
        //console.log("tab1height", tab1height);
        let Chartheight = tab1height - 40;
        let tbchartHeight1, tbchartHeight2;
        if (isbool) {
            if (data.categorical.dimensions[0].values.length > 1) {
                tbchartHeight1 = Chartheight / (Values1.length / 2);
               // console.log("chartHeight1!!", tbchartHeight1);
               
            } else if(data.categorical.dimensions[0].values.length == 1 ) {
                tbchartHeight1 = Chartheight / (Values1.length);
               // console.log("chartHeight1", tbchartHeight1);
            }
        } else {

            if (data.categorical.dimensions[0].values.length > 1) {
                tbchartHeight2 = Chartheight / (Values3.length / 2);
                //console.log("chartHeight2!!", tbchartHeight2);
            } else if(data.categorical.dimensions[0].values.length ==1 ) {
                tbchartHeight2 = Chartheight / (Values3.length);
                //console.log("chartHeight2", tbchartHeight2);
            }
        }

        const defaultValue = {
            chart: {
                type: 'line',
                height: isbool ? tbchartHeight1/2 : tbchartHeight2/2,
                margin: [50, 90, 50, 90],
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
                     //   align: 'right',
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
                                console.log('PLOT DATA ', e.point.xAxis);
                                console.log("Event SELECTION BUILDER !!!!", selectionIdBuilder);
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
                rules: [{
                    condition: {
                        minWidth:401,
                        maxWidth: 500
                    },
                    chartOptions: {
                        chart: {
                            margin: [40, 120, 40, 120],
                        }
                    }
                },
                {
                    condition: {
                        minWidth: 301,
                        maxWidth: 400,
                    },
                    chartOptions: {
                        chart: {
                           margin: [50, 130, 50, 90],
                        }
                    }
                },
                {
                    condition: {
                        minWidth: 230,
                        maxWidth: 300
                    },
                    chartOptions: {
                        chart: {
                            margin: [40, 90, 40, 80],
                        }
                    }
                },
                {
                    condition: {
                        minWidth:1,
                        maxWidth: 229
                    },
                    chartOptions: {
                        chart: {
                            margin: [20, 90, 20, 90],
                        }
                    }
                },
                {
                    condition: {
                        minHeight:41,
                        maxHeight: 100
                    },
                    chartOptions: {
                        chart: {
                            margin: [20, 130, 20, 100],
                        }
                    }
                },
                {
                    condition: {
                        maxHeight: 40
                    },
                    chartOptions: {
                        chart: {
                            margin: [0, 130, 0, 90],
                        }
                    }
                },
                ]
            }
        };
        return defaultValue
    }
}

