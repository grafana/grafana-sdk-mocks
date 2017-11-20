///<reference path="../../headers/common.d.ts" />

export class PanelCtrl {
  panel: any;
  error: any;
  row: any;
  dashboard: any;
  editorTabIndex: number;
  pluginName: string;
  pluginId: string;
  editorTabs: any;
  $scope: any;
  $injector: any;
  $timeout: any;
  fullscreen: boolean;
  inspector: any;
  editModeInitiated: boolean;
  editorHelpIndex: number;
  editMode: any;
  height: any;
  containerHeight: any;
  events: any;
  timing: any;
  loading: boolean;

  constructor($scope, $injector) {
  }

  init() {
  }

  renderingCompleted() {
  }

  refresh() {
  }

  publishAppEvent(evtName, evt) {
  }

  changeView(fullscreen, edit) {
  }

  viewPanel() {
    this.changeView(true, false);
  }

  editPanel() {
    this.changeView(true, true);
  }

  exitFullscreen() {
    this.changeView(false, false);
  }

  initEditMode() {
  }

  changeTab(newIndex) {
  }

  addEditorTab(title, directiveFn, index?) {
  }

  getMenu() {
    return [];
  }

  getExtendedMenu() {
    return [];
  }

  otherPanelInFullscreenMode() {
    return false;
  }

  calculatePanelHeight() {
  }

  render(payload?) {
  }

  toggleEditorHelp(index) {
  }

  duplicate() {
  }

  updateColumnSpan(span) {
  }

  removePanel() {
  }

  editPanelJson() {
  }

  replacePanel(newPanel, oldPanel) {
  }

  sharePanel() {
  }

  getInfoMode() {
  }

  getInfoContent(options) {
  }

  openInspector() {
  }
}
