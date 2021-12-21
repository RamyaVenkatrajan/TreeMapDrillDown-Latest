
            const tabs1 = document.createElement('div');
            const charttitle1 = document.createElement('div');
            const spantitle1 = document.createElement('span');
            const spanpercentvalue1 = document.createElement('span')
            const ul1 = document.createElement('ul');
            const first_li1 = document.createElement('li');
            const second_li1 = document.createElement('li');
            const tabl1div1 = document.createElement('div');
            const tabl2div1 = document.createElement('div');
            // create id
            tabs1.className = 'tabs clonedtab';
            tabs1.id = 'tabs';
            if (settings.chartOptions.chartshow !== false) {
                // Chart title Options
                charttitle1.id = 'charttitle';
                spantitle1.id = 'spantitle';
                spanpercentvalue1.id = 'spanpercentvalue';
                spantitle1.innerHTML = (settings.chartOptions.chartshow == true) ? settings.chartOptions.charttitle : settings.chartOptions.charttitle = '';
                charttitle1.style.fontFamily = settings.chartOptions.fontfamily;
                charttitle1.style.fontSize = settings.chartOptions.fontSize + "px";
                charttitle1.style.fontWeight = settings.chartOptions.fontWeight;
                spantitle1.style.color = settings.chartOptions.fontColor;
                spanpercentvalue1.style.color = settings.chartOptions.percentvalfontColor;
                charttitle1.style.textAlign = settings.chartOptions.textAlign;
            }
            if (settings.chartOptions.chartshow && spantitle1.innerHTML == '') {
                spantitle1.innerHTML = 'Sample';
            }

            ul1.id = 'tabs-list';
            first_li1.className = 'active';
            // Tabs title Options
            first_li1.innerHTML = settings.tabtitleOptions.tabtext1;
            second_li1.innerHTML = settings.tabtitleOptions.tabtext2;

            if (first_li1.innerHTML == '') {
                first_li1.innerHTML = 'Tab 1';
            }
            if (second_li1.innerHTML == '') {
                second_li1.innerHTML = 'Tab 2';
            }
            tabl1div1.id = 'tab1';
            tabl1div1.className = 'active';
            tabl2div1.id = 'tab2';

            first_li1.style.color = settings.tabtitleOptions.tabfontColor;
            first_li1.style.fontFamily = settings.tabtitleOptions.tabfontfamily;
            first_li1.style.fontSize = settings.tabtitleOptions.tabfontSize + "px";
            first_li1.style.borderBottomColor = settings.tabtitleOptions.borderbottomColor;
            second_li1.style.color = settings.tabtitleOptions.tabfontColor;
            second_li1.style.fontSize = settings.tabtitleOptions.tabfontSize + "px";
            second_li1.style.borderBottomColor = settings.tabtitleOptions.borderbottomColor;
            second_li1.style.fontFamily = settings.tabtitleOptions.tabfontfamily;
            // Append
            tabs1.appendChild(charttitle1);
            charttitle1.appendChild(spantitle1);
            charttitle1.appendChild(spanpercentvalue1);
            tabs1.appendChild(ul1);
            ul1.appendChild(first_li1);
            ul1.appendChild(second_li1);
            tabs1.appendChild(tabl1div1);
            tabs1.appendChild(tabl2div1);
            tabs_container.appendChild(tabs1);

            const errorElement = document.getElementById("tabs_container");
            if (errorElement != null) {
                errorElement.parentNode.removeChild(errorElement);
                element.appendChild(tabs_container);
            } else {
                element.appendChild(tabs_container);
            }
           
            // ADD EVENT LISTENER
            first_li1.onclick = () => {
                tabl2div1.classList.remove('active');
                tabl1div1.classList.add('active');
                first_li1.classList.add('active');
                second_li1.classList.remove('active');
            }
            second_li1.onclick = () => {
                tabl1div1.classList.remove('active');
                tabl2div1.classList.add('active');
                first_li1.classList.remove('active');
                second_li1.classList.add('active');
                tabl1div1.style.display = 'none';
            }
          

            if (settings.chartOptions.chartshow !== false && this.fieldsMeta.hasPercentageValues && this.fieldsMeta.hasCategory) {
                const percentval = data.categorical.measures.filter(function (item) {
                    return (item.role["PercentageValues"])
                });
               
                let percentValue =percentval[1].values[1];
                let decpercent = '';
                if (percentValue >= 1) {
                    decpercent = Math.round(percentValue).toString() + '%';

                } else if (percentValue > 0 && percentValue < 1) {
                    console.log("percentval.values[0]", percentval.values[0]);
                    let parsevalue = (percentValue * 100).toFixed(settings.chartOptions.percentDecimal) + '%';
                    decpercent = parsevalue;

                } else if (percentValue == 0) {
                    decpercent =percentValue.toString() + '%';
                }
                if (percentValue == null) {
                    UIIndicators.showErrorMessage(tabs1, "Invalid percentage value data. Please add valid value");
                    var taberror = document.querySelector('.info-container');
                    taberror.classList.add('percenterror');
                    tabs1.insertBefore(taberror, tabs1.childNodes[0]);
                }
                const percent = (settings.chartOptions.chartshow == true && this.fieldsMeta.hasPercentageValues) ? decpercent : '';
                spanpercentvalue1.innerHTML = percent.toString();
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
           

            if (!this.fieldsMeta.hasCategory) {
                UIIndicators.showErrorMessage(tabs1, "Please add Category value",);
                var taberror = document.querySelector('.info-container');
                tabs1.insertBefore(taberror, tabs1.childNodes[0]);
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

                    // create id
                    wrapper.className = 'wrapper';
                    container.className = 'container'
                    titlediv.id = 'titlediv';
                    chartcontainer.className = 'chartcontainer';
                    chartcontainer.id = 'chartcontainer';

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
                    rectwrapper.appendChild(canvas1);
                    rectwrapper.appendChild(canvas2);
                    tabl1div1.appendChild(wrapper);

                    const headertext1 = document.createElement('div');
                    const headertext2 = document.createElement('div');
                    headertext1.className = 'headertext';
                    headertext2.className = 'headertext';
                    canvas1.appendChild(headertext1);
                    canvas2.appendChild(headertext2);

                   // debugger
                    console.log("data.categorical.dimensions",data.categorical.dimensions[0]);

                    if(data.categorical.dimensions[0].values[0] > data.categorical.dimensions[0].values[1]){
                        headertext1.innerHTML = data.categorical.dimensions[0].values[1];
                        headertext2.innerHTML =data.categorical.dimensions[0].values[0];
                    }else{
                        headertext1.innerHTML = data.categorical.dimensions[0].values[0];
                        headertext2.innerHTML =data.categorical.dimensions[0].values[1];
                    }

                    const Value1label = Values1.map(v => v.name)
                    let clientHeight = document.getElementById('tab1').offsetHeight;
                    let chartHeight = clientHeight / (Values1.length / 2);
                    let clientwidth1 = document.getElementById('tabs').offsetWidth;
                 
                    let minusdiv = document.getElementById('titlediv').offsetWidth ? document.getElementById('titlediv').offsetWidth : 0;
                    console.log("clientwidth1", clientwidth1);
                    var newwidth = clientwidth1 - minusdiv;
                    console.log("clientwidth1",clientwidth1,minusdiv,newwidth);
                    for (let i = 0; i < Values1.length / 2; i++) {
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
                        console.log("chartRef", this.chartRef);
                        this.chartfilter[i] = [];
                        this.chartfilter[i].push(this.chartRef);

                    }

                }
            }
          
            var Values3 = seriesData.filter(function (item) {
                return (item.role["Values3"])
            });
            
            const errorMessageElement2 = document.getElementById("vbi-error-message");
            if (errorMessageElement2 != null) {
                errorMessageElement2.parentNode.removeChild(errorMessageElement2);
            }

            if (!this.fieldsMeta.hasCategory) {
                UIIndicators.showErrorMessage(tabs1, "Please add Category value",);
                var taberror = document.querySelector('.info-container');
                tabs1.insertBefore(taberror, tabs1.childNodes[0]);
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
                    // create id
                    wrapper.className = 'wrapper';
                    container.className = 'container'
                    titlediv.id = 'titlediv';
                    chartcontainer.className = 'chartcontainer';
                    chartcontainer.id = 'chartcontainer';
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
                    rectwrapper.appendChild(canvas1);
                    rectwrapper.appendChild(canvas2);
                    tabl2div1.appendChild(wrapper);

                    const headertext3 = document.createElement('div');
                    const headertext4 = document.createElement('div');
                    headertext3.className = 'headertext';
                    headertext4.className = 'headertext';
                    canvas1.appendChild(headertext3);
                    canvas2.appendChild(headertext4);

                    console.log(data.categorical.dimensions[0].values[0]);
                    if (isNaN(parseInt(data.categorical.dimensions[0].values[0])) || isNaN(parseInt(data.categorical.dimensions[0].values[1])) ) {
                        headertext3.innerHTML = data.categorical.dimensions[0].values[0];
                        headertext4.innerHTML = data.categorical.dimensions[0].values[1];
                    } else {
                        const tab2offsetvalue = parseInt(data.categorical.dimensions[0].values[0]) - 1;
                        const tab2offsetvalue2 = parseInt(data.categorical.dimensions[0].values[1]) - 1;

                       if(data.categorical.dimensions[0].values[0] >  data.categorical.dimensions[0].values[1]){
                        headertext3.innerHTML = tab2offsetvalue2.toString();
                        headertext4.innerHTML = tab2offsetvalue.toString();
                       }else{
                     
                        headertext3.innerHTML = tab2offsetvalue.toString();
                        headertext4.innerHTML = tab2offsetvalue2.toString();
                       }
                    }

                    const Value3label = Values3.map(v => v.name)
                    let clientHeight1 = document.getElementById('tabs').offsetHeight;
                    let clientwidth1 = document.getElementById('tabs').offsetWidth;
                    let minusdiv1 = document.getElementById('titlediv');
                    let chartHeight1 = clientHeight1 / (Values3.length / 2);
                    for (let i = 0; i < Values3.length / 2; i++) {
                        const titledivsub = document.createElement('div');
                        titledivsub.className = `titledivsub-${i}`;
                        titlediv.appendChild(titledivsub);
                        titledivsub.innerHTML = `<p>${Value3label[i]}</p>`
                        const subcontainerOne = document.createElement('div');
                        subcontainerOne.className = `subcontainerOne-${i}`;
                        subcontainerOne.style.height = chartHeight1 + "px";
                        subcontainerOne.style.width = newwidth + "px";
                        chartcontainer.appendChild(subcontainerOne);
                        this.chartSetting2 = TreeMapDrilldownUtil.getDefaultValues(this, settings, data, selectionIdBuilder, seriesData, i, false);
                        this.chartRef2 = this.highcharts.chart(subcontainerOne, this.chartSetting2);
                        this.chartfilter1[i] = [];
                        this.chartfilter1[i].push(this.chartRef2);
                    }
                }
            }

            var activeTab = document.querySelector('.error-indicator');
            var activeNextSibling = activeTab.nextElementSibling;
            activeNextSibling.insertBefore(errorMessageElement2, activeNextSibling.childNodes[0]);
