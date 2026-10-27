import static com.kms.katalon.core.checkpoint.CheckpointFactory.findCheckpoint
import static com.kms.katalon.core.testcase.TestCaseFactory.findTestCase
import static com.kms.katalon.core.testdata.TestDataFactory.findTestData
import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject
import static com.kms.katalon.core.testobject.ObjectRepository.findWindowsObject
import com.kms.katalon.core.checkpoint.Checkpoint as Checkpoint
import com.kms.katalon.core.cucumber.keyword.CucumberBuiltinKeywords as CucumberKW
import com.kms.katalon.core.llm.keyword.LlmKeywords as LLM
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as Mobile
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.testcase.TestCase as TestCase
import com.kms.katalon.core.testdata.TestData as TestData
import com.kms.katalon.core.testng.keyword.TestNGBuiltinKeywords as TestNGKW
import com.kms.katalon.core.testobject.TestObject as TestObject
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WS
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import com.kms.katalon.core.windows.keyword.WindowsBuiltinKeywords as Windows
import internal.GlobalVariable as GlobalVariable
import org.openqa.selenium.Keys as Keys

/*
 Genera un caso de prueba Katalon WebUI en Groovy:
 1. Abre el navegador en http://localhost:5173 y maximiza la ventana.
 2. Escribe "laura.est@soyudemedellin.edu.co" en el elemento con CSS [data-cy="login-email"].
 3. Escribe "1000000003" en [data-cy="login-documento"].
 4. Haz clic en [data-cy="login-submit"].
 5. Espera a que se vea [data-cy="dashboard-contenedor"].
 6. Haz clic en [data-cy="nav-historial"].
 7. Verifica que se vea [data-cy="historial-contenedor"].
 8. Verifica que [data-cy="historial-titulo"] tenga el texto "Mi historial".
 9. Verifica que se vea [data-cy="historial-lista"].
 10. Verifica que el texto de [data-cy^="historial-fila-"][data-cy$="-estado"] contenga "Cancelada".
 11. Toma una captura y cierra el navegador.
 Crea los objetos con new TestObject() y addProperty('css', ConditionType.EQUALS, selector), sin usar el Object Repository.
 */
import com.kms.katalon.core.testobject.ConditionType as ConditionType

// Open browser and navigate to URL
WebUI.openBrowser('http://localhost:5173')

// Maximize current browser window
WebUI.maximizeWindow()

// Enter email into login email field
WebUI.setText(new TestObject().addProperty('css', ConditionType.EQUALS, '[data-cy="login-email"]'), 'laura.est@soyudemedellin.edu.co')

// Enter document number into login document field
WebUI.setText(new TestObject().addProperty('css', ConditionType.EQUALS, '[data-cy="login-documento"]'), '1000000003')

// Click submit button on login form
WebUI.click(new TestObject().addProperty('css', ConditionType.EQUALS, '[data-cy="login-submit"]'))

// Wait for dashboard container to become visible
WebUI.waitForElementVisible(new TestObject().addProperty('css', ConditionType.EQUALS, '[data-cy="dashboard-contenedor"]'), 10)

// Click navigation button for history
WebUI.click(new TestObject().addProperty('css', ConditionType.EQUALS, '[data-cy="nav-historial"]'))

// Verify history container is visible
WebUI.verifyElementVisible(new TestObject().addProperty('css', ConditionType.EQUALS, '[data-cy="historial-contenedor"]'))

// Verify history title element text matches 'Mi historial'
WebUI.verifyElementText(new TestObject().addProperty('css', ConditionType.EQUALS, '[data-cy="historial-titulo"]'), 'Mi historial')

// Verify history list element is visible
WebUI.verifyElementVisible(new TestObject().addProperty('css', ConditionType.EQUALS, '[data-cy="historial-lista"]'))

// Get text from the history status element
String estadoText = WebUI.getText(new TestObject().addProperty('css', ConditionType.EQUALS, '[data-cy^="historial-fila-"][data-cy$="-estado"]'))

// Verify status text contains 'Cancelada'
WebUI.verifyMatch(estadoText, '.*Cancelada.*', true)

// Take screenshot of the application page
WebUI.takeScreenshot()

// Close the active browser
WebUI.closeBrowser()