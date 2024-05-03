import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import Chart, { ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: ``
})
export class DonaComponent implements OnInit, AfterViewInit {
  @Input() title: string = 'Sin titulo';
  @Input() chartData: { labels: string[], data: number[], colors: string[] } = {
    labels: ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'],
    data: [350, 450, 100],
    colors: ['#6857E6', '#009EEE', '#F02059']
  };

  public chart: Chart | undefined;
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.generateChart();
  }

  generateChart(): void {
    const data = {
      labels: this.chartData.labels,
      datasets: [{
        data: this.chartData.data,
        backgroundColor: this.chartData.colors,
        hoverOffset: 4
      }]
    };

    this.chart = new Chart(this.chartCanvas.nativeElement, { // Use the canvas element reference
      type: 'pie' as ChartType,
      data
    })
  }
}
