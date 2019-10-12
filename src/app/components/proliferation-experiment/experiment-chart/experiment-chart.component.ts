import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import Plotly from 'plotly.js-dist';
import {Condition} from '../../../models/condition';
import {ChartData} from './chart-data';

@Component({
  selector: 'app-experiment-chart',
  templateUrl: './experiment-chart.component.html',
  styleUrls: ['./experiment-chart.component.css']
})
export class ExperimentChartComponent implements OnInit {


  @Input()
  private condition: Condition;

  chartDatas: ChartData[] = [];

  @ViewChild('chart', { static: true })
  chart: ElementRef;

  constructor() { }

  ngOnInit() {
    this.condition.cellCountList.forEach(cellCount => {
      const chartFound = this.chartDatas.find(chart => chart.replicaId === cellCount.replicatId);
      if (chartFound) {
        chartFound.x.push(cellCount.date);
        chartFound.y.push(cellCount.quantity);
      } else {
        const chartData = new ChartData();
        chartData.replicaId = cellCount.replicatId;
        chartData.x.push(cellCount.date);
        chartData.y.push(cellCount.quantity);
        chartData.type = 'scatter';
        chartData.visible = true;
        this.chartDatas.push(chartData);
      }

    });
    const layout = {
      title: 'Doubling time'
    };
    Plotly.newPlot(this.chart.nativeElement, this.chartDatas, layout);
  }

}
