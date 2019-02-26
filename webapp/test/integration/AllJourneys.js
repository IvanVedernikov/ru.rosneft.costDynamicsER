jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
		"sap/ui/test/Opa5",
		"ru/rosneft/costDynamicsER/test/integration/pages/Common",
		"sap/ui/test/opaQunit",
		"ru/rosneft/costDynamicsER/test/integration/pages/Worklist",
		"ru/rosneft/costDynamicsER/test/integration/pages/Object",
		"ru/rosneft/costDynamicsER/test/integration/pages/NotFound",
		"ru/rosneft/costDynamicsER/test/integration/pages/Browser",
		"ru/rosneft/costDynamicsER/test/integration/pages/App"
	], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "ru.rosneft.costDynamicsER.view."
	});

	sap.ui.require([
		"ru/rosneft/costDynamicsER/test/integration/WorklistJourney",
		"ru/rosneft/costDynamicsER/test/integration/ObjectJourney",
		"ru/rosneft/costDynamicsERleExecutionleExecution/test/integration/NavigationJourney",
		"ru/rosneft/costDynamicsER/test/integration/NotFoundJourney",
		"ru/rosneft/costDynamicsER/test/integration/FLPIntegrationJourney"
	], function () {
		QUnit.start();
	});
});