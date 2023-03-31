import Chart, {
  ChartDataset /*, LinearScale, CategoryScale */,
  ChartOptions,
} from "chart.js/auto";
import pRetry, { AbortError } from "p-retry";
import { DateTime } from "luxon";
/*
import {
  LineWithErrorBarsController,
  LineWithErrorBarsChart,
  ScatterWithErrorBarsChart,
  ScatterWithErrorBarsController,
  PointWithErrorBar,
} from "chartjs-chart-error-bars";

Chart.register(
  LineWithErrorBarsController,
  LineWithErrorBarsChart,
  PointWithErrorBar,
  ScatterWithErrorBarsChart,
  ScatterWithErrorBarsController,
  LinearScale,
  CategoryScale
);*/

type status = "ready" | "loading" | "error";
interface DSDict {
  [key: number]: {
    [key: string]: {
      status: string;
      data?: {
        [key: string]: {
          date: string;
          basicStats: { mean: number; min: number; max: number };
        }[];
      };
      request: Promise<void>;
    };
  };
}

export interface SDMOptions {
  source: string;
  endpoint: string;
  features: string[][];
  geometry: object;
  timeInterval: object;
  startTime?: string;
  endTime?: string;
}

class SignalsDataManager {
  chart: Chart;
  startTime: DateTime;
  endTime: DateTime;
  options: SDMOptions;
  chartOptions: ChartOptions;
  dataStorage: DSDict;
  status: status;
  activeFields: string[];

  constructor(chart: Chart, options: SDMOptions) {
    this.chart = chart;
    this.options = options;
    this.startTime = DateTime.now().minus(options.timeInterval);
    this.endTime = DateTime.now();
    if (options.startTime && options.endTime) {
      // Overwrite values if provided
      this.startTime = DateTime.fromISO(options.startTime).setZone("UTC");
      this.endTime = DateTime.fromISO(options.endTime).setZone("UTC");
    }
    this.dataStorage = {};
    // Initialize data storage
    this.options.features.forEach((_, idx) => (this.dataStorage[idx] = {}));
    this.status = "ready";
    this.chartOptions = {
      scales: {
        x: {
          type: "time",
          min: this.startTime.toISODate(),
          max: this.endTime.toISODate(),
          ticks: {
            minRotation: 0,
            maxRotation: 0,
          },
        },
        /*y: {
          min: 0,
          max: 0.5,
        },*/
      },
      plugins: {
        legend: {
          position: "right",
          onClick: (_, legendItem) => {
            if (!legendItem.hidden) {
              const idx = this.activeFields.indexOf(legendItem.text);
              const keys = this.activeFields;
              keys.splice(idx, 1);
              this.setActiveFields(keys);
            } else {
              this.setActiveFields([...this.activeFields, legendItem.text]);
            }
          },
        },
      },
    };
  }

  private fetchSignals(groupIndex: number, start?: DateTime, end?: DateTime) {
    const features = this.options.features[groupIndex]
      .map((f) => `feature=${f}`)
      .join("&");
    const times = `${start ? "&start_date=" + start.toISODate() : ""}${
      end ? "&end_date=" + end.toISODate() : ""
    }`;
    const request = `${this.options.endpoint}?source=${this.options.source}&${features}${times}`;
    const geom = this.options.geometry;

    async function fetchSignals() {
      const response = await fetch(request, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          geometry: geom,
        }),
      });
      // Abort retrying if the resource doesn't exist
      if (response.status === 404) {
        throw new AbortError(response.statusText);
      }
      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      return response;
    }
    return pRetry(fetchSignals, {
      onFailedAttempt: (error) => {
        console.log(
          `Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`
        );
      },
      retries: 5,
    }).then(function (res) {
      return res.json();
    });
  }

  private updateChart() {
    this.chart.options = this.chartOptions;
    const datasets: ChartDataset[] = [];
    this.options.features.flat().forEach((key) => {
      // Find group
      let groupIndex: number = -1;
      this.options.features.forEach((group, idx) => {
        if (group.includes(key)) {
          groupIndex = idx;
        }
      });
      if (groupIndex !== -1) {
        let data: {
          date: string;
          basicStats?: { mean: number; min: number; max: number };
        }[] = [];
        Object.keys(this.dataStorage[groupIndex]).forEach((timekey) => {
          const dsEntry = this.dataStorage[groupIndex][timekey];
          if (dsEntry.status === "finished") {
            if (
              Object.keys(dsEntry.data).length !== 0 &&
              Object.keys(dsEntry.data).includes(key)
            ) {
              data.push(...dsEntry.data[key]);
            }
          } else {
            data.push({ date: "missing" });
          }
        });
        datasets.push({
          // type: "lineWithErrorBars",
          type: "line",
          label: key,
          // casting to any because an array of object should also be possible
          data: <any>data.map((datapoint) => {
            let ds = {};
            if (datapoint && datapoint.date !== "missing") {
              ds = {
                x: DateTime.fromISO(datapoint.date).setZone("UTC"),
                y: datapoint.basicStats.mean,
                yMin: [datapoint.basicStats.min],
                yMax: [datapoint.basicStats.max],
              };
            }
            return ds;
          }),
          hidden: !this.activeFields.includes(key),
        });
      }
    });

    this.chart.data = {
      datasets,
    };
    this.chart.update("none");
  }

  private retrieveMissingData() {
    // Review current time span and see if data needs to be fetched

    // First identify signal groups
    const signalGroupIndices: number[] = [];
    this.activeFields.forEach((af) => {
      this.options.features.forEach((group, index) => {
        if (group.includes(af) && !signalGroupIndices.includes(index)) {
          signalGroupIndices.push(index);
        }
      });
    });

    // Check if dataStorage has relevant data
    // We use monthly steps for data retrieval
    let currDate = DateTime.fromObject({
      year: this.endTime.year,
      month: this.endTime.month,
    })
      .plus({ month: 1 })
      .minus({ second: 1 });
    const start = DateTime.fromObject({
      year: this.startTime.year,
      month: this.startTime.month,
    })
      .plus({ month: 1 })
      .minus({ second: 1 });
    while (currDate > start) {
      const timeslot = currDate.toFormat("yyyyMM");
      signalGroupIndices.forEach((index) => {
        if (!(timeslot in this.dataStorage[index])) {
          // request data
          const request = this.fetchSignals(
            index,
            DateTime.fromObject({ year: currDate.year, month: currDate.month }),
            DateTime.fromObject({
              year: currDate.year,
              month: currDate.month,
            })
              .plus({ month: 1 })
              .minus({ second: 1 })
          ).then((data) => {
            this.dataStorage[index][timeslot].data = data;
            this.dataStorage[index][timeslot].status = "finished";
            this.updateChart();
          });
          this.dataStorage[index][timeslot] = {
            request,
            status: "fetching",
          };
        }
      });
      currDate = currDate.minus({ months: 1 });
    }
  }

  setActiveFields(activeFields: string[]) {
    this.activeFields = activeFields;
    this.retrieveMissingData();
    this.updateChart();
  }

  setTimeInterval(start: DateTime, end: DateTime) {
    this.startTime = start;
    this.endTime = end;
    this.chartOptions.scales.x.min = start.toISODate();
    this.chartOptions.scales.x.max = end.toISODate();
    this.retrieveMissingData();
    this.updateChart();
  }
  /*
  setAggregation(aggregation: string) {}
  */
}

export default SignalsDataManager;
