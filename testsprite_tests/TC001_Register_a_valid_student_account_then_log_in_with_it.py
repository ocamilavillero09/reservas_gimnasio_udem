import asyncio
import re
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None

    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()

        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",
                "--disable-dev-shm-usage",
                "--ipc=host",
                "--single-process"
            ],
        )

        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        # Wider default timeout to match the agent's DOM-stability budget;
        # auto-waiting Playwright APIs (expect, locator.wait_for) inherit this.
        context.set_default_timeout(15000)

        # Open a new page in the browser context
        page = await context.new_page()

        # Interact with the page elements to simulate user flow
        # -> navigate
        await page.goto("http://localhost:5173/")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Open “Registrarse” and inspect the registration form fields.
        # Registrarse button
        elem = page.get_by_role("button", name="Registrarse")
        await elem.click(timeout=10000)
        
        # -> Enter “Prueba TestSprite” and the specified institutional email, then verify the student-role hint.
        # Ej: María García text field
        elem = page.get_by_role("textbox", name="Nombre completo")
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Prueba TestSprite")
        
        # -> Enter “Prueba TestSprite” and the specified institutional email, then verify the student-role hint.
        # nombre@soyudemedellin.edu.co text field
        elem = page.get_by_role("textbox", name="Correo institucional")
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("testsprite.rf01.202610252200@soyudemedellin.edu.co")
        
        # -> Enter the specified identity document and create the account once.
        # Ej: 1001234567 password field
        elem = page.get_by_role("textbox", name="Documento de identidad")
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("9000000001")
        
        # -> Enter the specified identity document and create the account once.
        # Crear cuenta → button
        elem = page.get_by_role("button", name="Crear cuenta →")
        await elem.click(timeout=10000)
        
        # -> Click “Ir a iniciar sesión” and verify that the sign-in form appears with an empty email field.
        # Ir a iniciar sesión → button
        elem = page.get_by_role("button", name="Ir a iniciar sesión →")
        await elem.click(timeout=10000)
        
        # -> Enter the registered email and identity document, submit “Ingresar,” and verify the student name or home screen appears.
        # nombre@soyudemedellin.edu.co text field
        elem = page.get_by_role("textbox", name="Correo institucional")
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("testsprite.rf01.202610252200@soyudemedellin.edu.co")
        
        # -> Enter the registered email and identity document, submit “Ingresar,” and verify the student name or home screen appears.
        # Ej: 1001234567 password field
        elem = page.get_by_role("textbox", name="Documento de identidad")
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("9000000001")
        
        # -> Enter the registered email and identity document, submit “Ingresar,” and verify the student name or home screen appears.
        # Ingresar → button
        elem = page.get_by_role("button", name="Ingresar →")
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> The student home is displayed after sign-in.
        await page.get_by_role("button", name="Reservar", exact=True).nth(0).scroll_into_view_if_needed()
        # Assert-outcome: not verified — the export-time check could not be evaluated
        # Assert: The student home is displayed.
        await expect(page.get_by_role("button", name="Reservar", exact=True).nth(0)).to_be_visible(timeout=15000), "The student home is displayed."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    