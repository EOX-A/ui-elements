<template>
  <div>
    <charts
      type="line"
      :dataObject='dataObject'
      :plotConfig='plotConfig'
      style="width: 100%; height: 100%;"
    />
  </div>
</template>
<script>
import Charts from '@eox/charts';
import example from './example.json';

export default {
  components: {
    Charts,
  },
  data: () => ({
    plotConfig: {
      yAxes: [
        {
          id: 'yAxis1',
          parameters: {
            'NDVI': {
              color: '#2c2',
              lineTension: 0.2,
              pointRadius: 2,
              borderWidth: 1,
              showMinMax: true,
            },
          },
          position: 'left',
          drawOnChartArea: true,
        },
      ],
    },
    date: null
  }),
  computed: {
    dataObject(){
      return example;
    }
  }
}
</script>