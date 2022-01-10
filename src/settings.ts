/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

import { dataViewObjectsParser } from "powerbi-visuals-utils-dataviewutils";
import DataViewObjectsParser = dataViewObjectsParser.DataViewObjectsParser;

export class VisualSettings extends DataViewObjectsParser {
  public bifrostSection = new BifrostSection();
  public license = new License();
  public responsiveOptions =new ResponsiveOptions();
  public chartOptions = new ChartOptions();
  public tabtitleOptions = new TabtitleOptions();
  public dataLabels = new DataLabels();
  public markerOption = new MarkerOption();
  public numberformat = new NumberFormat();
}

export class BifrostSection {
  public bifrost: string = "{}";
}
export class License {
  public key: string = "";
  public customer: string = "";
}
export class ResponsiveOptions {
  public scrollshow: boolean = true;
}
export class ChartOptions {
  public bandBgshow: boolean = true;
  public bandBg: string = "#FFF7E2";
  public chartshow: boolean = true;
  public charttitle: string = "";
  public charttitle2: string = "";
  public charttitle3: string = "";
  public fontColor: string = "#C10230";
  public percentDecimal: number = 0.0;
  public percentvalfontColor: string = "#CDCECD";
  public fontfamily: string = "Helvetica, sans-serif";
  public fontSize: number = 20.0;
  public fontWeight: string = "600";
  public textAlign: string = "center";

}
export class TabtitleOptions {
  public chart1tabtext1: string = "";
  public chart1tabtext2: string = "";
  public chart2tabtext1: string = "";
  public chart2tabtext2: string = "";
  public chart3tabtext1: string = "";
  public chart3tabtext2: string = "";
  public tabfontColor: string = "#747474";
  public tabfontfamily: string = "Helvetica, sans-serif";
  public tabfontSize: number = 14.0;
  public borderbottomColor: string = "#22A9E2";

}
export class DataLabels {
  public show: boolean = true;
  public dlfontSize: number = 12.0;
  public dlFontWeight: string = "thin";
  public dlfontColor: string = "#000000";
  public currentdlfontWeight: string = 'bold';
  public dlfontfamily: string = "Helvetica, sans-serif";
}
export class MarkerOption {
  public show: boolean = true;
  public markerSymbol: string = "circle";
  public markerRadius: number = 4;
  public markerfillcolor: string = "#000000";
}
export class NumberFormat {
  public show: boolean = false;
  public dlDecimalSeperator: string = ".";
  public dlThousandSeperator: string = ",";
  public dlNoOfDecimal: number = 2.0;
  public dlScalingFactor: string = "auto";
  public dlPrefix: string = "";
  public dlSuffix: string = "";
  public showMeasureLabel: boolean = false;
  public noOfDecimal: number = 0.0;
  public scalingFactor: string = "auto";
  public prefix: string = "";
  public suffix: string = "";
  public customizeScalingLabel: boolean = false;
  public dlThousands: string = "K";
  public dlMillions: string = "M";
  public dlBillions: string = "bn";
  public dlTrillion: string = "T";
  public enableDataLabelFormatting: boolean = false;
  public semanticFormatting: boolean = false;
  public negativeValueFormat: string = "-x";
  public negativeValueColor: string = "#db2828";
  public positiveValueFormat: string = "x";
  public positiveValueColor: string = "#21ba45";
  public numericSymbols: string = "K, M, bn, T, P, E,";
}

export class ValidValues {
  static sections = [
    
    {
      name: "numberformat",
      properties: [
        {
          name: "dlNoOfDecimal",
          configuration: {
            validValues: {
              numberRange: {
                min: 0,
                max: 10
              }
            }
          }
        },
        {
          name: "noOfDecimal",
          configuration: {
            validValues: {
              numberRange: {
                min: 0,
                max: 10
              }
            }
          }
        }
      ]
    },
    {
      name: "chartOptions",
      properties: [
        {
          name: "percentDecimal",
          configuration: {
            validValues: {
              numberRange: {
                min: 0,
                max: 10
              }
            }
          }
        },
        {

          name: "fontSize",
          configuration: {
            validValues: {
              numberRange: {
                min: 8,
                max: 60
              }
            }
          }
        }
      ]
    },
    {
      name: "tabtitleOptions",
      properties: [
        {
          name: "tabfontSize",
          configuration: {
            validValues: {
              numberRange: {
                min: 8,
                max: 60
              }
            }
          }
        }
      ]
    },
    {
      name: "dataLabels",
      properties: [
        {
          name: "dlfontSize",
          configuration: {
            validValues: {
              numberRange: {
                min: 8,
                max: 60
              }
            }
          }
        },

      ]
    },
    {
      name: "markerOption",
      properties: [
        {
          name: "markerRadius",
          configuration: {
            validValues: {
              numberRange: {
                min: 2,
                max: 20
              }
            }
          }
        },

      ]
    },
  ]
}