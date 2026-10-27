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
 6. Haz clic en [data-cy="nav-mis-reservas"].
 7. Verifica que se vea [data-cy="mis-reservas-vacio"].
 8. Verifica que [data-cy="mis-reservas-vacio-titulo"] tenga el texto "Sin reservas activas".
 9. Verifica que NO exista [data-cy="mis-reservas-lista"].
 10. Toma una captura y cierra el navegador.
 Crea los objetos con new TestObject() y addProperty('css', ConditionType.EQUALS, selector), sin usar el Object Repository.
 */
import com.kms.katalon.core.testobject.ConditionType as ConditionType

// Open browser and navigate to target URL
WebUI.openBrowser('http://localhost:5173')

// Maximize current browser window
WebUI.maximizeWindow()

// Enter email into login email input field
WebUI.setText(new TestObject().addProperty('css', ConditionType.EQUALS, '[data-cy="login-email"]'), 'laura.est@soyudemedellin.edu.co')

// Enter document number into login document input field
WebUI.setText(new TestObject().addProperty('css', ConditionType.EQUALS, '[data-cy="login-documento"]'), '1000000003')

// Click on submit button to log in
WebUI.click(new TestObject().addProperty('css', ConditionType.EQUALS, '[data-cy="login-submit"]'))

// Wait until dashboard container element is visible
WebUI.waitForElementVisible(new TestObject().addProperty('css', ConditionType.EQUALS, '[data-cy="dashboard-contenedor"]'), 10)

// Click on my reservations navigation button
WebUI.click(new TestObject().addProperty('css', ConditionType.EQUALS, '[data-cy="nav-mis-reservas"]'))

// Verify that empty reservations element is visible
WebUI.verifyElementVisible(new TestObject().addProperty('css', ConditionType.EQUALS, '[data-cy="mis-reservas-vacio"]'))

// Verify text of empty reservations title element equals expected value
WebUI.verifyElementText(new TestObject().addProperty('css', ConditionType.EQUALS, '[data-cy="mis-reservas-vacio-titulo"]'), 'Sin reservas activas')

// Verify that reservations list element is not present on page
WebUI.verifyElementNotPresent(new TestObject().addProperty('css', ConditionType.EQUALS, '[data-cy="mis-reservas-lista"]'), 5)

// Take screenshot of current web page
WebUI.takeScreenshot()

// Close current browser session
WebUI.closeBrowser()