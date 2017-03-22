import { Component } from '@angular/core';

import { PieChartService } from './pieChart.service';
import { AuthService } from './../../login/login.service'

import 'easy-pie-chart/dist/jquery.easypiechart.js';
import 'style-loader!./pieChart.scss';

import { BaThemeConfigProvider, colorHelper } from '../../../theme';





@Component({
  selector: 'pie-chart',
  templateUrl: './pieChart.html'
})
// TODO: move easypiechart to component
export class PieChart {

  public chartsRaw: any
  public charts: Array<Object>;
  private _init = false;

  errorMessage: string


  constructor(private _pieChartService: PieChartService, private auth: AuthService, private _baConfig: BaThemeConfigProvider) {

  }

  ngOnInit() {
    // if (!this.auth.currentUser) {
    // 	this.router.navigate(['/user/login']);
    // }
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    let date = year + '-' + month + '-' + day;

    let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;



    let t0 = performance.now();
    //this.auth.currentUser.id
    this._pieChartService.GetAffStatistics(2287, date)
      .subscribe(chartsRaw => {
        this.chartsRaw = chartsRaw;
        let t1 = performance.now();
        console.log(this.chartsRaw);
        this.charts =
          [
            //   {
            //     color: pieColor,
            //     description: 'New Visits',
            //     stats: '57,820',
            //     icon: 'person',
            //   }, {
            //     color: pieColor,
            //     description: 'Purchases',
            //     stats: '$ 89,745',
            //     icon: 'money',
            //   }, {
            //     color: pieColor,
            //     description: 'Active Users',
            //     stats: '178,391',
            //     icon: 'face',
            //   }, {
            //     color: pieColor,
            //     description: 'Returned',
            //     stats: '32,592',
            //     icon: 'refresh',
            //   }
            // ];
            {
              color: pieColor,
              description: 'Commission Percentaje',
              stats: this.chartsRaw.AffiliateStatisticsInfo.CommissionPercentaje,
              icon: 'person',
            }, {
              color: pieColor,
              description: 'Current Balance',
              stats: this.chartsRaw.AffiliateStatisticsInfo.CurrentBalance,
              icon: 'money',
            }, {
              color: pieColor,
              description: 'Earning Loses',
              stats: this.chartsRaw.AffiliateStatisticsInfo.EarningLoses,
              icon: 'face',
            }, {
              color: pieColor,
              description: 'Last 2 Week Player Win/Loss',
              stats: this.chartsRaw.AffiliateStatisticsInfo.Last2WeekPlayerWinLoss,
              icon: 'money',
            }, {
              color: pieColor,
              description: 'Last Week Player Win/Loss',
              stats: this.chartsRaw.AffiliateStatisticsInfo.LastWeekPlayerWinLoss,
              icon: 'money',
            }, {
              color: pieColor,
              description: 'Players with Wagers This Week',
              stats: this.chartsRaw.AffiliateStatisticsInfo.NumPlayerWageredThisWeek,
              icon: 'money',
            }
            , {
              color: pieColor,
              description: 'Total Number Players',
              stats: this.chartsRaw.AffiliateStatisticsInfo.NumPlayers,
              icon: 'person',
            }
            , {
              color: pieColor,
              description: 'Player Win/Loss',
              stats: this.chartsRaw.AffiliateStatisticsInfo.PlayerWinLoss,
              icon: 'money',
            }
          ];
        //	this.toastr.success('This query took ' + (t1 - t0) + ' milliseconds..', 'Success');
      },
      error => this.errorMessage = <any>error);



    // this.affiliateService.GetMyAgents(this.auth.currentUser.id)
    // 	.subscribe(response2 => {
    // 		this.response2 = response2;
    // 		let t1 = performance.now();
    // 		this.toastr.success('This query took ' + (t1 - t0) + ' milliseconds..', 'Success');
    // 	},
    // 	error => this.errorMessage = <any>error);



  }

  ngAfterViewInit() {
    if (!this._init) {
      this._loadPieCharts();
      this._updatePieCharts();
      this._init = true;
    }
  }

  private _loadPieCharts() {

    jQuery('.chart').each(function () {
      let chart = jQuery(this);
      chart.easyPieChart({
        easing: 'easeOutBounce',
        onStep: function (from, to, percent) {
          jQuery(this.el).find('.percent').text(Math.round(percent));
        },
        barColor: jQuery(this).attr('data-rel'),
        trackColor: 'rgba(0,0,0,0)',
        size: 84,
        scaleLength: 0,
        animation: 2000,
        lineWidth: 9,
        lineCap: 'round',
      });
    });


    jQuery('.pie-charts .chart').each(function (index, chart) {
      jQuery(chart).data('easyPieChart').update(55);
    });


  }

  private _updatePieCharts() {
    let getRandomArbitrary = (min, max) => { return Math.random() * (max - min) + min; };

    jQuery('.pie-charts .chart').each(function (index, chart) {
      jQuery(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
    });
  }
}
