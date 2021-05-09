<script>
import Chart from 'chart.js';
import { mixins, generateChart } from 'vue-chartjs';
// import annotation from 'chartjs-plugin-annotation';
// import zoom from 'chartjs-plugin-zoom';

Chart.defaults.LineWithLine = Chart.defaults.line;
Chart.controllers.LineWithLine = Chart.controllers.line.extend({
  draw: function (ease) { // eslint-disable-line
    Chart.controllers.line.prototype.draw.call(this, ease);
    if (this.chart.tooltip._active && this.chart.tooltip._active.length) { // eslint-disable-line
      const activePoint = this.chart.tooltip._active[0]; // eslint-disable-line
      const { ctx } = this.chart;
      const { x } = activePoint.tooltipPosition();
      const topY = this.chart.chartArea.top;
      const bottomY = this.chart.chartArea.bottom;
      // draw line
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, topY);
      ctx.lineTo(x, bottomY);
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#07C';
      ctx.stroke();
      ctx.restore();
    }
  },
});
const CustomLine = generateChart('custom-line', 'LineWithLine');

const { reactiveProp } = mixins;

/**
 * A line chart with an additional line at the current index
 */
export default {
  name: 'LineWithLineChart',
  extends: CustomLine,
  props: {
    /**
     * Chart data
     */
    chartData: Object,
    /**
     * Chart options
     */
    options: Object,
    /**
     * Highlighted date
     */
    highlightedDate: Object,
  },
  mixins: [reactiveProp],
  mounted() {
    // this.addPlugin(annotation);
    // this.addPlugin(zoom);
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options);
    console.log(this.$data._chart.tooltip.setActiveElements)
    // console.log(this.chartData)
  },
  methods: {
    triggerRender() {
      this.renderChart(this.chartData, this.options);
    },
  },
  watch: {
    highlightedDate(v) {
      
    }
  }
};
</script>
