// Power BI files import
import { TreeMapDrilldownChart } from "./visual";
import { VisualSettings } from "./settings";
import { HighchartsUtil } from "@visualbi/powerbi-common/dist/HighChartUtils/HighchartsUtil";
import { Metadata } from '@visualbi/bifrost-powerbi/dist/types/DataTypeDef';
import { HighContrastColors } from '@visualbi/bifrost-powerbi/dist/types/BifrostTypeDef';
import { SelectionIdBuilder } from '@visualbi/bifrost-powerbi/dist/SelectionIdBuilder';

export class ChartUtils {

    public static EMPTY_ELEMENT(element: HTMLElement) {
        while (element.hasChildNodes()) {
            element.removeChild(element.lastChild);
        }
    }

   
}