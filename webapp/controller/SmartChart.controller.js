sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/m/MessageBox',
	'sap/ui/fl/FakeLrepConnector',
	'sap/ui/core/util/MockServer',
	'sap/m/Image',
	'sap/m/Text',
	'sap/m/FlexItemData',
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator'
], function (Controller, MessageBox, FakeLrepConnector, MockServer, Image, Text, FlexItemData, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("ru.rosneft.costDynamicsER.controller.SmartChart", {

		onInit: function () {
			this._aMeasures = ["CostMaterial", "CostServices"];
		},

		onNavigationTargetsObtained: function (oEvent) {
			var oParameters = oEvent.getParameters();
			var oSemanticAttributes = oParameters.semanticAttributes;

			oParameters.show("Supplier", new sap.ui.comp.navpopover.LinkData({
				text: "Homepage",
				href: "",
				target: "_blank"
			}), [], new sap.ui.layout.form.SimpleForm({
				maxContainerCols: 1,
				content: [
					new sap.ui.core.Title({
						text: oSemanticAttributes.Year
					}), sap.ui.xmlfragment("ru.rosneft.costDynamicsER.fragment.TableCost")

				]
			}));
		},

		onNavigate: function (oEvent) {
			var oParameters = oEvent.getParameters();
			if (oParameters.text === "Homepage") {
				return;
			}
			MessageBox.show(oParameters.text + " has been pressed", {
				icon: MessageBox.Icon.INFORMATION,
				title: "SmartChart demo",
				actions: [
					MessageBox.Action.OK
				]
			});
		},

		handlePopoveronChangeMeasures: function (oEvent) {
			var oButton = oEvent.getSource();

			// create action sheet only once
			if (!this._actionSheet) {
				this._actionSheet = sap.ui.xmlfragment(
					"ru.rosneft.costDynamicsER.fragment.ActionSheet",
					this
				);
				this.getView().addDependent(this._actionSheet);
			}

			this._actionSheet.openBy(oButton);
		},

		onSelectMeasureAbsolute: function (oEvent) {
			var oSmartChart = this.getView().byId("smartChartGeneral");
			var oVizChart = oSmartChart.getChart();
			oVizChart.setVisibleMeasures(["CostMaterial", "CostServices"]);
		},

		onSelectMeasureEDC: function (oEvent) {
			var oSmartChart = this.getView().byId("smartChartGeneral");
			var oVizChart = oSmartChart.getChart();
			oVizChart.setVisibleMeasures(["CostMaterial_EDC", "CostServices_EDC"]);
		},

		onVizSetings: function () {
			//set maxHeight for categoryAxis in order to allow longer labels being fully displayed
			var oSmartChart = this.getView().byId("smartChartGeneral");
			var oVizChart = oSmartChart.getChart();
			oVizChart.setVisibleMeasures(this._aMeasures);
			oVizChart.setVizProperties({
				categoryAxis: {
					layout: {
						maxHeight: 0.8
					},
					title: {
						visible: false
					}
				},
				plotArea: {
					dataLabel: {
						visible: true,
						showTotal: true
					}
				}
			});
		}
	});
});