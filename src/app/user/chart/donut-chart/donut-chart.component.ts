import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { UserService} from '../../../service/user.service';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css']
})
export class DonutChartComponent implements OnInit {

  constructor(
    public userService: UserService
  ) { }

  public doughnutChartLabels: Label[];
  public doughnutChartData: any;
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOptions: any = {
    legend: {
        display: false
    },
    tooltips: {

    },
    responsive: true,
    maintainAspectRatio: false
}
  chartReady =  false;
  active = false;



  ngOnInit() {
    // this.userService.getCharts('1').subscribe(response => {
    //   this.doughnutChartLabels = response.chartLabels;
    //   this.doughnutChartData = response.chartData;
    //   this.chartReady = true;
    // });


    this.doughnutChartLabels = ["Summarize Written Text","Write Essay"];
    this.doughnutChartData = [845,55];
    this.chartReady = true;
  }




}
