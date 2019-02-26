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
						text: "Список заказов" + ' (' + oSemanticAttributes.Count + ')'
					}), new sap.m.Table({
						id: "mainViewTbl",
						items: {
							path: '/OrdersSet',
							filters: new Filter([new Filter("Bebtxt", FilterOperator.EQ, oSemanticAttributes.Bebtxt),
								new Filter("Bebtxt", FilterOperator.EQ, oSemanticAttributes.Bebtxt)
							], false),
							template: new sap.m.ColumnListItem({
								cells: [
									new sap.m.Text({
										text: "{Nun}"
									}),
									new sap.m.Text({
										text: "{Butxt}"
									}),
									new sap.m.Text({
										text: "{Bebtxt}"
									}),
									new sap.m.Text({
										text: "{Year}"
									}),
									new sap.m.Text({
										text: "{Count}"
									})
								]
							})
						},
						columns: [
							new sap.m.Column({
								header: [
									new sap.m.Label({
										text: "{i18n>NumOrder}"
									})
								]
							}), new sap.m.Column({
								header: [
									new sap.m.Label({
										text: "{i18n>plant}"
									})
								]
							}), new sap.m.Column({
								header: [
									new sap.m.Label({
										text: "{i18n>Bebtxt}"
									})
								]
							}), new sap.m.Column({
								header: [
									new sap.m.Label({
										text: "{i18n>year}"
									})
								]
							}), new sap.m.Column({
								header: [
									new sap.m.Label({
										text: "{i18n>DescOrder}"
									})
								]
							})
						]
					})
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
		onVizSetings: function () {
			//set maxHeight for categoryAxis in order to allow longer labels being fully displayed
			var oSmartChart = this.getView().byId("smartChartGeneral");
			var oVizChart = oSmartChart.getChart();
			oVizChart.setVizProperties({
				categoryAxis: {
					layout: {
						maxHeight: 0.8
					}
				},
				plotArea: {
					dataLabel: {
						visible: true
					}
				}
			});
			// oVizChart.setChartType("dual_stacked_column");
		}
	});
});