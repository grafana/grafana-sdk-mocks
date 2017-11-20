///<reference path="../../headers/common.d.ts" />

import {PanelCtrl} from './panel_ctrl';

class MetricsPanelCtrl extends PanelCtrl {
  scope: any;
  datasource: any;
  datasourceName: any;
  $q: any;
  $timeout: any;
  datasourceSrv: any;
  timeSrv: any;
  templateSrv: any;
  timing: any;
  range: any;
  interval: any;
  intervalMs: any;
  resolution: any;
  timeInfo: any;
  skipDataOnInit: boolean;
  dataStream: any;
  dataSubscription: any;
  dataList: any;
  nextRefId: string;

  constructor($scope, $injector) {
    super($scope, $injector);

    // make metrics tab the default
    this.editorTabIndex = 1;
    // this.$q = $injector.get('$q');
    // this.datasourceSrv = $injector.get('datasourceSrv');
    // this.timeSrv = $injector.get('timeSrv');
    // this.templateSrv = $injector.get('templateSrv');

    if (!this.panel.targets) {
      this.panel.targets = [{}];
    }
  }

  private onPanelTearDown() {
  }

  private onInitMetricsPanelEditMode() {
  }

  private onMetricsPanelRefresh() {
  }


  setTimeQueryStart() {
  }

  setTimeQueryEnd() {
  }

  updateTimeRange(datasource?) {
  }

  calculateInterval() {
  }

  applyPanelTimeOverrides() {
  }

  issueQueries(datasource) {
  }

  handleQueryResult(result) {
  }

  handleDataStream(stream) {
  }

  setDatasource(datasource) {
  }

  addQuery(target) {
  }

  removeQuery(target) {
  }

  moveQuery(target, direction) {
  }
}

export {MetricsPanelCtrl};
