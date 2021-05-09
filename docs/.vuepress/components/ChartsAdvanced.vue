<template>
  <div>
    <charts
      type="line"
      :dataObject='dataObject'
      :plotConfig='plotConfig'
      :indexTooltips='true'
      style="width: 100%; height: 100%;"
      @dateSelected='dateSelected'
      v-model="date"
      @click="changeDate" 
    />
    <v-btn
      @click="changeDate"
      color="primary"
      small
    >
      Change date
    </v-btn>
  </div>
</template>
<script>
import Charts from '@eox/charts';
import example from './example.json';
import { DateTime } from 'luxon';

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
              lineTension: 0.0,
              pointRadius: 2,
              borderWidth: 1,
            },
          },
          position: 'right',
          color: '#2c2',
        },
        {
          id: 'yAxis2',
          parameters: {
            'avg_vv': {
              color: '#000',
              showLine: false,
              pointRadius: 1.5,
            }
          },
          position: 'left',
          color: '#000',
        },
        {
          id: 'yAxis3',
          parameters: {
            'avg_vh': {
              color: '#c22',
              showLine: false,
              pointRadius: 1.5,
            },
          },
          position: 'left',
          color: '#c22',
        },
      ],
      annotations: [
        {
          drawTime: 'beforeDatasetsDraw',
          id: 'harvest',
          type: 'box',
          xScaleID: 'x',
          yScaleID: 'yAxis1',
          xMin: '2019-07-01',
          xMax: '2019-07-05',
          borderColor: 'lightblue',
          borderWidth: 0,
          backgroundColor: 'lightblue',
        },
        {
          drawTime: 'beforeDatasetsDraw',
          id: 'practce',
          type: 'box',
          xScaleID: 'x',
          yScaleID: 'yAxis1',
          xMin: '2019-07-15',
          xMax: '2019-09-05',
          borderColor: 'lightgrey',
          borderWidth: 0,
          backgroundColor: 'lightgrey',
        },
      ],
    },
    date: null,
  }),
  computed: {
    dataObject(){
      return example;
    }
  },
  methods: {
    dateSelected(date) {
      console.log('Date selected: ' + date);
    },
    changeDate() {
      this.date = DateTime.fromISO('2019-01-28')
    }
  }
}
</script>