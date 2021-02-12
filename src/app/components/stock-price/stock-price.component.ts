import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { AppService } from 'src/app/app.service';
import { MonthsData, SeriesData, StockDetails } from '../model/app-model';


import { AppUtil, getDate } from '../utils/app-utils';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  ChartComponent,
  ApexStroke,
  ApexGrid,
  ApexLegend
} from "ng-apexcharts";
import { dataSeries } from '../stock-price/data-series';

// Creating custom datatype for the charts

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  tooltip: any; // ApexTooltip;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

export type TimeChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
};
export type ChartOptionsV2 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  grid: ApexGrid;
};

@Component({
  selector: 'app-stock-price',
  templateUrl: './stock-price.component.html',
  styleUrls: ['./stock-price.component.css']
})
export class StockPriceComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public seriesOptions: Partial<TimeChartOptions>;
  public chartOptionsV: Partial<ChartOptionsV2>;
counter=0;
  dateFrom: Date
  dateTo: Date
  home: MenuItem
  companyList: any[] = []
  selectedCompany: string[]= ["SPY", "GLD", 'EEM', 'EFA'] // initializing company selection
  stockList: StockDetails[] = []
  filterCategory: any[]
  selectedFilter: string
  loading: boolean = false;
  chartData: Map<string, MonthsData> = new Map<string, MonthsData>()
  seriesChartData: Map<string, SeriesData[]> = new Map<string, SeriesData[]>()
  maxDate:Date
  chartDataV: Map<string, SeriesData[]> = new Map<string, SeriesData[]>()
  mainstyle: any = {
    color: "#8e8da4"
  }
  checkinterent: boolean;
  constructor(private service: AppService, private messageService: MessageService) {
    this.dateFrom= new Date("2014-01-01")
    this.dateTo=new Date("2014-01-30")
   this.maxDate=new Date()

    this.loadCompany() // Load the list of freely available company
    this.initMainChart() // initiate Normal chart
    this.initSeriesChartData() // Initiate Filter by date range chart
    this.initMainChartV() // Initiate area chart
    this.selectedFilter = 'NM' // Preselect Normal Chart for filtering purpose
    
  }
  
  public initSeriesChartData(): void {
    let ts2 = 1484418600000;
    let dates = [];

    dataSeries.forEach(rs => {
      let main = []
      main = rs;

      var dat = new Date(rs[0]['date'])
      console.log(rs[0]['date'])
      console.log(rs[0]['value'])
      dates.push([dat.getTime(), rs[0]['value']]);
    })

    this.seriesOptions = {
      series: [
        {
          name: "Test Data",
          data: dates
        }
      ],
      chart: {
        type: "area",
        stacked: false,
        height: 550,
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: "zoom"
        }
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0
      },
      title: {
        text: "Stock Price Movement",
        align: "left"
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        }
      },
      yaxis: {
        labels: {
          formatter: function (val) {
           return (val / 1).toFixed(0);
          // return val.toString()
          }
        },
        tickAmount: 2,
        title: {
          text: "Price"
        }
      },
      xaxis: {
        type: "datetime"
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val) {
            return (val / 1).toFixed(0);
           // return val.toString();
          }
        }
      }
    }

  }
  initMainChart() {
    this.chartOptions = {
      series: [
        {
          name: "EEM",
          data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
        },
        {
          name: "JPY",
          data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
        },
        {
          name: "GLD",
          data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
        }
      ],
      chart: {
        height: 550,
        type: "line"
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        width: 5,
        curve: "straight",
        dashArray: [0, 8, 5]
      },
      title: {
        text: 'End of day stock prices trend',
        align: "left"
      },
      legend: {
        tooltipHoverFormatter: function (val, opts) {
          return (
            val +
            " - <strong>" +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            "</strong>"
          );
        }
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        labels: {
          trim: false
        },
        categories: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ]
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function (val) {
                return val;
              }
            }
          },
          {
            title: {
              formatter: function (val) {
                return val;
              }
            }
          },
          {
            title: {
              formatter: function (val) {
                return val;
              }
            }
          }
        ]
      },
      grid: {
        borderColor: "#f1f1f1"
      }
    };
  }
  initMainChartV(){
    this.chartOptionsV = {
      series: [],
      chart: {
        type: "area",
        height: 550
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },

      title: {
        text: "End of day stock report",
        align: "left",
        style: {
          fontSize: "14px"
        }
      },
      xaxis: {
        type: "datetime",
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        tickAmount: 4,
        floating: false,

        labels: {
          style: this.mainstyle,
          offsetY: -7,
          offsetX: 0
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      fill: {
        opacity: 0.5
      },
      tooltip: {
        fixed: {
          enabled: false,
          position: "topRight"
        }
      },
      grid: {
        yaxis: {
          lines: {
            offsetX: -30
          }
        },
        padding: {
          left: 20
        }
      }
    };
  }
 

  ngOnInit(): void {
    this.filterCategory = [{ label: 'Date Range', value: 'Range' },
    { label: 'Normal Line Chart', value: 'NM' },{ label: 'Normal Area Chart', value: 'Area' },]
    this.home = { icon: 'pi pi-home' };
    this.service.therichpost$().subscribe(isOnline => this.checkinterent = isOnline);
    //checking internet connection
    if(this.checkinterent == true)
    {
     if(this.counter===0){
      this.searchReport()
      this.filterChartByDateRange()
      this.counter+=1;
     }
      //show success alert if internet is working
     // $('.toastonline').toast('show')
    }
    else{
     //show danger alert if net internet not working
     this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Internet connection is down', sticky: true });
  
  }

  }
  handleDropdown(event) {
    //event.query = current value in input field
  }
  // Call functions to load the list of the company
  loadCompany() {
    let newArray: string[] = []
    this.service.getCompanyNames().subscribe(rs => {
      let results: any[][] = rs['datatable']['data']
      for (var i = 0; i < results.length; i++) {
        newArray = newArray.concat(results[i]);

      }
      let newData = new Set(newArray)
      this.logEvent(newData)
    },
      error => {
        console.log(error);
      }
    );


  }
  //Returned selected company
  getSelection() {
    return this.selectedCompany.toString();
  }
// Searching reports base on selected filters
  searchReport() {
    if(this.checkinterent){
      if (this.selectedFilter === 'NM') {
        this.filterByCompany()
      } else if(this.selectedFilter === 'Area'){
       this.filterByCompany()
      }else{
        this.filterChartByDateRange();
      }
    }else{
      this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Internet connection is down', sticky: true });
    }
  }
  //Filter report by selected company
  filterByCompany() {
    if (this.selectedCompany=== undefined || this.selectedCompany[0]==undefined) {
      this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Kindly select company', sticky: true });
    } else {
      this.chartData = new Map<string, MonthsData>()
      this.chartDataV = new Map<string, SeriesData[]>()
      this.loading = true;
      let newArray: StockDetails[] = []
      this.service.filterStockers(this.getSelection()).subscribe(rs => {
        let results: any[][] = rs['datatable']['data']
        for (var i = 0; i < results.length; i++) {
          newArray = newArray.concat(results[i]);
          // newArray.push({
          //   ticker: results[i][1],
          //   shares_outstanding: results[i][2], nav: results[i][3],
          //   flow_daily: results[i][4], as_of_date: results[i][0]
          // });
          this.loadEvent(results[i][1], results[i][4], results[i][0])

        }


        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Record successfully fetched' });
        this.loading = false;
        //console.log(this.chartData)
        this.updateDataSet();
        this.updateDataSetV();
      },
        error => {
          this.loading = false;
          console.log(error);
        }
      );
    }
  }
  updateDataSet() {
    // borderColor: '#4bc0c0'
    let datasests = []

    var count = 0;
    this.selectedCompany.forEach(rs => {
      let results: MonthsData = this.chartData.get(rs);

      datasests.push(
        {
          name: rs,
          data: [results.jan, results.feb, results.mar, results.apr, results.may, results.jun, results.jul, results.aug, results.sep, results.oct, results.nov, results.dec]
        }
      )
    })

    //this.selectedCompany = []
    this.chartOptions['series'] = datasests;

  }

updateLoadEvent2(ticker: string, flow_daily: number, trandate: string){
//console.log(ticker, flow_daily, trandate)
var date = new Date(trandate);
if (this.chartData.has(ticker)) {
  let result = this.chartData.get(ticker);
  this.updateMonths(result, flow_daily, trandate);
  this.chartData.set(ticker, result);
} else {
  let result = new MonthsData()
  result.jan = 0
  result.feb = 0
  result.mar = 0
  result.apr = 0
  result.may = 0
  result.jun = 0
  result.jul = 0
  result.aug = 0
  result.sep = 0
  result.oct = 0
  result.nov = 0
  result.dec = 0
  this.updateMonths(result, flow_daily, trandate);
  this.chartData.set(ticker, result);
}
  
}
  loadEvent(ticker: string, flow_daily: number, trandate: string) {
    this.updateLoadEvent2(ticker, flow_daily, trandate)
    this.loadEventV(ticker, flow_daily, trandate)

  }

  updateMonths(result: MonthsData, flow_daily: number, trandate: string) {
    var date = new Date(trandate);
    var month = date.getMonth() + 1;
    //console.log(month);
    if (month === 1) {
      result.jan = (result.jan === undefined || result.jan === 0) ? flow_daily : (result.jan + flow_daily);

    } else if (month === 2) {
      result.feb = (result.feb === undefined || result.jan === 0) ? flow_daily : (result.feb + flow_daily);
    } else if (month === 3) {
      result.mar = (result.mar === undefined || result.jan === 0) ? flow_daily : (result.mar + flow_daily);
    } else if (month === 4) {
      result.apr = (result.apr === undefined || result.jan === 0) ? flow_daily : (result.apr + flow_daily);
    }
    else if (month === 5) {
      result.may = (result.may === undefined || result.jan === 0) ? flow_daily : (result.may + flow_daily);
    }
    else if (month === 6) {
      result.jun = (result.jun === undefined || result.jan === 0) ? flow_daily : (result.jun + flow_daily);
    }
    else if (month === 7) {
      result.jul = (result.jul === undefined || result.jan === 0) ? flow_daily : (result.jul + flow_daily);
    }
    else if (month === 8) {
      result.aug = (result.aug === undefined || result.jan === 0) ? flow_daily : (result.aug + flow_daily);
    }
    else if (month === 9) {
      result.sep = (result.sep === undefined || result.jan === 0) ? flow_daily : (result.sep + flow_daily);
    }
    else if (month === 10) {
      result.oct = (result.oct === undefined || result.jan === 0) ? flow_daily : (result.oct + flow_daily);
    }
    else if (month === 11) {
      result.nov = (result.nov === undefined || result.jan === 0) ? flow_daily : (result.nov + flow_daily);
    }
    else if (month === 12) {
      result.dec = (result.dec === undefined || result.jan === 0) ? flow_daily : (result.dec + flow_daily);
    }
  }
  logEvent(results: Set<string>) {
    let dataload = []
    for (let rs of results) {
      dataload.push({ label: rs, value: rs });

    }
    this.companyList = dataload

  }
  dateRangeSelected($event) {
    this.dateFrom = $event[0].toJSON().split('T')[0];
    this.dateTo = $event[1].toJSON().split('T')[0];

  }
  getDateFormat(d: Date): string {
    
    return d.toISOString().split('T')[0]
  }
  //fetch list of data base on the selected date range
  filterChartByDateRange() {
    if (this.dateFrom === null || this.dateTo === null || this.dateFrom===undefined || this.dateTo===undefined) {
      this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Invalid date range selected', sticky: true });
    } else{
    
      this.dateFrom.setHours(0, 0, 0, 0)
      this.dateTo.setHours(0, 0, 0, 0)
      if (this.dateFrom > this.dateTo) {
        this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Invalid starting date, it must be less than End date', sticky: true });
      }else {
        this.seriesChartData = new Map<string, SeriesData[]>()
        this.loading = true;
        this.service.filterByDateRange(getDate(this.dateFrom), getDate(this.dateTo)).subscribe(rs => {
          let results: any[][] = rs['dataset']['data']
          for (var i = 0; i < results.length; i++) {
            this.loadSeriesData(results[i][0], results[i][1], results[i][2], results[i][3])
          }
          this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Record successfully fetched' });
          this.loading = false;
          
  
          this.updateSeriesSet();//Change the series set for the processed result
        },
          error => {
            this.loading = false;
            console.log(error);
          }
        );
      }
    } 
  }
  updateSeriesSet() {
    let datasests = []
    datasests.push(this.getDataFromStore(AppUtil.HIGH))
    datasests.push(this.getDataFromStore(AppUtil.LOW))
    datasests.push(this.getDataFromStore(AppUtil.OPEN))
    console.log(JSON.stringify(this.getDataFromStore(AppUtil.OPEN)))
    this.seriesOptions = {
      series: datasests,
      chart: {
        type: "area",
        stacked: false,
        height: 550,
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: "zoom"
        }
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0
      },
      title: {
        text: "Stock Price Movement",
        align: "left"
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        }
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return (val / 1).toFixed(0);
          }
        },
        title: {
          text: "Price"
        }
      },
      xaxis: {
        type: "datetime"
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val) {
            return (val /1).toFixed(0);
          }
        }
      }
    }

  }

  getDataFromStore(key: string) {
    let result = []
    this.seriesChartData.get(key).forEach(rs => {
      result.push([rs.dateresult, rs.rate])
    })
    //console.log(key, JSON.stringify(result))

    return {
      name: key,
      data: result
    }
  }
  //This is to group returned load into individual data open, high and low 
  loadSeriesData(reportdate: string, open: number, high: number, low: number) {
    //console.log(ticker, flow_daily, trandate)
    //console.log(reportdate,open, low, high)
    var date = new Date(reportdate);
    if (this.seriesChartData.has(AppUtil.OPEN)) {
      let result: SeriesData[] = this.seriesChartData.get(AppUtil.OPEN);
      let newdata: SeriesData = new SeriesData()
      newdata.dateresult = date.getTime()
      newdata.rate =(open===null||open===undefined)?0:open
      result.push(newdata)
      this.seriesChartData.set(AppUtil.OPEN, result);
    } else {
      let result: SeriesData[] = []
      let newdata: SeriesData = new SeriesData()
      newdata.dateresult = date.getTime()
      newdata.rate = (open===null||open===undefined)?0:open
      result.push(newdata)
      this.seriesChartData.set(AppUtil.OPEN, result);
    }

    //updating high data

    if (this.seriesChartData.has(AppUtil.HIGH)) {
      let result: SeriesData[] = this.seriesChartData.get(AppUtil.HIGH);
      let newdata: SeriesData = new SeriesData()
      newdata.dateresult = date.getTime()
      newdata.rate = (high===null || high===undefined)?0:high
      result.push(newdata)
      this.seriesChartData.set(AppUtil.HIGH, result);
    } else {
      let result: SeriesData[] = []
      let newdata: SeriesData = new SeriesData()
      newdata.dateresult = date.getTime()
      newdata.rate = (high===null || high===undefined)?0:high
      result.push(newdata)
      this.seriesChartData.set(AppUtil.HIGH, result);
    }

    //updating low data
    if (this.seriesChartData.has(AppUtil.LOW)) {
      let result: SeriesData[] = this.seriesChartData.get(AppUtil.LOW);
      let newdata: SeriesData = new SeriesData()
      newdata.dateresult = date.getTime()
      newdata.rate =(low===null||low==undefined)?0:low
      result.push(newdata)
      this.seriesChartData.set(AppUtil.LOW, result);
    } else {
      let result: SeriesData[] = []
      let newdata: SeriesData = new SeriesData()
      newdata.dateresult = date.getTime()
      newdata.rate = (low===null||low==undefined)?0:low
      result.push(newdata)
      this.seriesChartData.set(AppUtil.LOW, result);
    }
  }


  ///////working with other version of chart


  getValueFromStoreV(result: SeriesData[]) {
    let output = []
    result.forEach(rs => {
      output.push({ x: rs.dateresult, y: rs.rate })
    })
    return output
  }
  updateDataSetV() {
    // borderColor: '#4bc0c0'
    let datasests = []
    this.selectedCompany.forEach(rs => {
      let results: SeriesData[] = this.chartDataV.get(rs);
      datasests.push(
        {
          name: rs,
          data: this.getValueFromStoreV(results)
        }
      )
    })
    console.log(JSON.stringify(datasests))

    this.chartOptionsV = {
      series: datasests,
      chart: {
        type: "area",
        height: 550
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },

      title: {
        text: "End of day stock report",
        align: "left",
        style: {
          fontSize: "14px"
        }
      },
      xaxis: {
        type: "datetime",
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        tickAmount: 4,
        floating: false,

        labels: {
          style: this.mainstyle,
          offsetY: -7,
          offsetX: 0
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      fill: {
        opacity: 0.5
      },
      tooltip: {
        fixed: {
          enabled: false,
          position: "topRight"
        }
      },
      grid: {
        yaxis: {
          lines: {
            offsetX: -30
          }
        },
        padding: {
          left: 20
        }
      }
    };
  }

  loadEventV(ticker: string, flow_daily: number, trandate: string) {
    if (this.chartDataV.has(ticker)) {
      let result: SeriesData[] = this.chartDataV.get(ticker);
      this.updateDateResultV(result, flow_daily, trandate);
      this.chartDataV.set(ticker, result);
    } else {
      let result: SeriesData[] = []
      this.updateDateResultV(result, flow_daily, trandate);
      this.chartDataV.set(ticker, result);
    }

  }

  updateDateResultV(result: SeriesData[], flow_daily: number, trandate: string) {
    let data: SeriesData = new SeriesData()
    var dt = new Date(trandate)
    data.dateresult = dt.getTime()
    data.rate = flow_daily
    result.push(data)
   

  }
}
