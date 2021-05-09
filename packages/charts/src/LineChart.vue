<script>
import { Line, mixins } from 'vue-chartjs';

const { reactiveProp } = mixins;

/**
 * A basic line chart
 */
export default {
  name: 'LineChart',
  extends: Line,
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
    highlightedDate: Object
  },
  mixins: [reactiveProp],
  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options);
  },
  methods: {
    triggerRender() {
      this.renderChart(this.chartData, this.options);
    },
  },
};
</script>
