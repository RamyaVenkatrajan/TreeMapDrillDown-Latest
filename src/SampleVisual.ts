export class SampleVisual {

    public static RENDER_LANDING_PAGE(element: HTMLElement, highcharts: any) {
        const lpChartSetting = {
            chart: {
                type: "line",
            },
            legend: {
               enabled:false
            },
            title: {
                text: "DUMMY TEXT",
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

        highcharts.chart(element,lpChartSetting);
    }
}