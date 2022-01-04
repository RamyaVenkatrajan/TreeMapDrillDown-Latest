import { bool } from "aws-sdk/clients/signer";
import powerbiVisualsApi from "powerbi-visuals-api";
import ISelectionId = powerbiVisualsApi.visuals.ISelectionId; 


export interface SeriesOptions extends Highcharts.SeriesBarOptions {
    selectionId?: ISelectionId;
    data?: Highcharts.Point[];
    key?: string;
    color: any;
    points?: any;
    actualType?: any;
}


export interface FieldsMeta {
    hasCategory: boolean;
    hasBusinessUnit:boolean;
    hasValues1: boolean;
    hasValues3: boolean;
    hasPercentageValues:boolean;
    hastooltips: boolean;
    countValues1: 0,
    countValues3: 0,

}
 

