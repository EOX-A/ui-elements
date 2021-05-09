<template>
  <div style="width: 100%; height: 100%;position: relative;">
    <line-with-line-chart ref='lineChart' v-if='type=="line" && chartOptions && indexTooltips'
      id="chart"
      class="fill-height"
      :width="null"
      :height="null"
      :chart-data='dataCollection'
      :options='chartOptions'
      :highlightedDate='highlightedDate'
      @chart:render="updateChartWidth"
    >
    </line-with-line-chart>
    <line-chart ref='lineChart' v-else-if='type=="line" && chartOptions'
      id="chart"
      class="fill-height"
      :width="null"
      :height="null"
      :chart-data='dataCollection'
      :options='chartOptions'
      :highlightedDate='highlightedDate'
      @chart:render="updateChartWidth"
    >
    </line-chart>
    <div ref='tooltip' style='position:absolute;width: 100%'>
      <v-tooltip
        v-model="showTooltip"
        :attach='$refs.tooltip'
        v-if='tooltipContent'
      >
        {{ tooltipContent.title }}
        <ul>
          <li v-for="(row) in tooltipContent.rows" :key="row" >
            {{ row }}
          </li>
      </ul>
      </v-tooltip>
    </div>
  </div>
</template>

<script>

import Chart from 'chart.js';
import { DateTime } from 'luxon';
import 'chartjs-adapter-luxon'; // eslint-disable-line no-unused-vars
import { VTooltip } from 'vuetify/lib';
import * as ChartZoomPlugin from 'chartjs-plugin-zoom';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import LineChart from './LineChart.vue';
import LineWithLineChart from './LineWithLineChart.vue';

Chart.plugins.register([ChartAnnotation, ChartZoomPlugin]);

/**
 * Interactive charts based on chart.js
 */
export default {
  name: 'Charts',
  model: {
    prop: 'date',
    event: 'dateSelected',
  },
  props: {
    /**
     * The type of the chart
     * @values line
     */
    type: String,
    /**
     * Data displayed on chart
     */
    dataObject: Object,
    /**
     * Chart configuration
     */
    plotConfig: Object,
    /**
     * Show tooltips only at same index
     */
    indexTooltips: Boolean,
    date: Object,
  },
  components: {
    LineChart,
    LineWithLineChart,
    VTooltip,
  },
  data: () => ({
    showTooltip: false,
    tooltipContent: null,
    chartOptions: null,
    tooltipPosition: 'left',
    chartWidth: 0,
    tooltipWidth: 0,
    highlightedDate: null,
  }),
  computed: {
    dataCollection() {
      const dataCollection = this.createDataCollection(this.dataObject);

      const highlightedDate = this.highlightedDate; // eslint-disable-line

      const color = 'purple';
      const width = 5;

      dataCollection.datasets.forEach((dataset) => {
        /* eslint-disable */
        dataset.pointBackgroundColor = function(ctx) {
          const index = ctx.dataIndex;
          const value = ctx.dataset.data[index];
          const dateTime = value.t

          if(dateTime && typeof dateTime.toISODate == 'function' && highlightedDate && typeof highlightedDate.toISODate == 'function' && dateTime.toISODate() == highlightedDate.toISODate()) return color;

          return undefined;
        }

        dataset.pointBorderColor = function(ctx) {
          const index = ctx.dataIndex;
          const value = ctx.dataset.data[index];
          const dateTime = value.t

          if(dateTime && typeof dateTime.toISODate == 'function' && highlightedDate && typeof highlightedDate.toISODate == 'function' && dateTime.toISODate() == highlightedDate.toISODate()) return color;

          return undefined;
        }

        dataset.pointBorderWidth = function(ctx) {
          const index = ctx.dataIndex;
          const value = ctx.dataset.data[index];
          const dateTime = value.t

          if(dateTime && typeof dateTime.toISODate == 'function' && highlightedDate && typeof highlightedDate.toISODate == 'function' && dateTime.toISODate() == highlightedDate.toISODate()) return width;

          return undefined;
        }
      })

      return dataCollection;
    },
    darkModeEnabled() {
      return this.$vuetify.theme.isDark;
    },
  },
  mounted() {
    this.chartOptions = this.createChartOptions();
  },
  methods: {
    /*
    renderChart() {
      this.$refs.lineChart.triggerRender();
    },
    */
    createDataCollection(dataObject) {
      const datasets = [];
      this.plotConfig.yAxes.forEach((axisDesc) => {
        Object.keys(axisDesc.parameters).forEach((parKey) => {
          const parDesc = axisDesc.parameters[parKey];
          if (!(parKey in dataObject)) {
            return;
          }
          const min = [];
          const max = [];
          const mean = [];
          const stDev = [];

          for (let j = 0; j < dataObject[parKey].length; j += 1) {
            const t = DateTime.fromISO(dataObject[parKey][j].date);
            if ('basicStats' in dataObject[parKey][j]) {
              if ('max' in dataObject[parKey][j].basicStats) {
                max.push({ t, y: dataObject[parKey][j].basicStats.max });
              }
              if ('min' in dataObject[parKey][j].basicStats) {
                min.push({ t, y: dataObject[parKey][j].basicStats.min });
              }
              if ('mean' in dataObject[parKey][j].basicStats) {
                mean.push({ t, y: dataObject[parKey][j].basicStats.mean });
              }
              if ('stDev' in dataObject[parKey][j].basicStats) {
                stDev.push({ t, y: dataObject[parKey][j].basicStats.stDev });
              }
            }
          }
          const currDataset = {
            data: mean,
            yAxisID: axisDesc.id,
            label: `${parKey} (mean)`,
            fill: false,
            borderColor: parDesc.color,
            backgroundColor: parDesc.color,
            showLine: parDesc.showLine,
            pointRadius: parDesc.pointRadius,
            pointHoverRadius: 5,
            pointHoverBorderWidth: 2,
            lineTension: parDesc.lineTension,
            borderWidth: parDesc.borderWidth,
          };
          datasets.push(currDataset);

          if (parDesc.showMinMax) {
            datasets.push({
              data: max,
              label: `${parKey} (max)`,
              fill: '+1',
              borderWidth: 1,
              backgroundColor: 'rgba(70,70,70,0.2)',
              borderColor: 'rgba(70,70,70,0.5)',
              pointRadius: 2,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 2,
            });
            datasets.push({
              data: min,
              label: `${parKey} (min)`,
              fill: '-1',
              borderWidth: 1,
              backgroundColor: 'rgba(70,70,70,0.2)',
              borderColor: 'rgba(70,70,70,0.5)',
              pointRadius: 2,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 2,
            });
          }
        });
      });

      return {
        datasets,
      };
    },
    updateChartWidth() {
      this.chartWidth = this.$refs.lineChart.$refs.canvas.getBoundingClientRect().width;
    },
    updateTooltipWidth() {
      const el = this.$refs.tooltip.querySelector('.v-tooltip__content');
      if (el) this.tooltipWidth = el.getBoundingClientRect().width;
    },
    createChartOptions() {
      const vueThis = this;

      const xAxes = [{
        type: 'time',
        id: 'x',
        time: {
          unit: 'month',
          displayFormats: {
            month: 'MMM yy',
          },
          tooltipFormat: 'dd. MMM yyyy',
        },
        gridLines: {
          color: this.darkModeEnabled ? '#ddd6' : '#2226',
          strokeOpacity: 0.3,
          drawBorder: true,
        },
      }];

      const yAxes = [];

      this.plotConfig.yAxes.forEach((axisDesc) => {
        const defaultAttrs = {
          type: 'linear',
          gridLines: {
            // color: this.darkModeEnabled ? '#ddd6' : '#2226',
            strokeOpacity: 0.3,
            drawBorder: true,
            color: axisDesc.color,
            drawOnChartArea: axisDesc.drawOnChartArea,
          },
          ticks: {
            fontColor: axisDesc.color,
          },
          display: 'auto',
        };
        yAxes.push({ ...defaultAttrs, ...axisDesc });
      });

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes,
          yAxes,
        },
        hover: {
          mode: this.indexTooltips ? 'index' : 'label',
          intersect: !this.indexTooltips,
        },
        tooltips: {
          // Disable the on-canvas tooltip
          enabled: false,
          mode: this.indexTooltips ? 'index' : 'label',
          intersect: !this.indexTooltips,
          callbacks: {
            label: (tooltipItem, data) => {
              const { datasetIndex, index } = tooltipItem;
              const currDat = data.datasets[datasetIndex];
              return `${currDat.label}: ${currDat.data[index].y.toFixed(4)}`;
            },
          },
          custom: (tooltipModel) => {
            if (tooltipModel.opacity !== 0) {
              this.showTooltip = true;
            } else {
              this.showTooltip = false;
              return;
            }

            if (tooltipModel.body) {
              const title = tooltipModel.title[0];
              const bodyLines = tooltipModel.body.map((bodyItem) => bodyItem.lines[0]);
              this.tooltipContent = {
                title,
                rows: bodyLines,
              };
            }

            if (!this.chartWidth) {
              this.updateChartWidth();
            }

            const previousTooltipWidth = this.tooltipWidth;
            this.updateTooltipWidth();
            if (!this.tooltipWidth) this.tooltipWidth = previousTooltipWidth;

            if (tooltipModel.caretX <= this.chartWidth / 2) {
              this.tooltipPosition = 'right';
            } else {
              this.tooltipPosition = 'left';
            }

            this.$refs.tooltip.style.left = `${Math.round(tooltipModel.caretX) - (this.tooltipPosition === 'left' ? this.tooltipWidth + 25 : 0)}px`;
            this.$refs.tooltip.style.top = `${Math.round(tooltipModel.caretY)}px`;
          },
        },
        plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: 'xy',
            },
            zoom: {
              enabled: true,
              mode: 'xy',
            },
          },
        },
        annotation: {
          drawTime: 'beforeDatasetsDraw',
          annotations: this.plotConfig.annotations || [],
        },
        onClick(_, element) { // eslint-disable-line
          /* eslint-disable */
          const activeElement = element[0];

          if(!activeElement) return;

          const data = activeElement._chart.data;
          const barIndex = activeElement._index;
          const datasetIndex = activeElement._datasetIndex;

          const yLabel = data.datasets[datasetIndex].data[barIndex];

          /**
           * New date has been selected
           *
           * @property {DateTime} date
           */
          vueThis.$emit('dateSelected', yLabel.t);
        },
      };
      if ('annotations' in this.plotConfig) {
        options.annotation = {
          annotations: this.plotConfig.annotations,
        };
      }
      return options;
    },
  },
  watch: {
    date: {
      immediate: true,
      deep: true,
      handler(v, vold) {
        if(v === null || v && typeof v.toISODate == 'function') {
          this.highlightedDate = v;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .v-tooltip__content {
  top: 0 !important
}
</style>
