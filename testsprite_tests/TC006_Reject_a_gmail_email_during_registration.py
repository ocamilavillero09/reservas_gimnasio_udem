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
        
        # -> Open the “Registrarse” tab and inspect the registration form fields.
        # Registrarse button
        elem = page.get_by_role("button", name="Registrarse")
        await elem.click(timeout=10000)
        
        # -> Enter “Prueba Gmail” and “prueba.gmail@gmail.com” in the registration form and inspect the live domain hint.
        # Ej: María García text field
        elem = page.get_by_role("textbox", name="Nombre completo")
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Prueba Gmail")
        
        # -> Enter “Prueba Gmail” and “prueba.gmail@gmail.com” in the registration form and inspect the live domain hint.
        # nombre@soyudemedellin.edu.co text field
        elem = page.get_by_role("textbox", name="Correo institucional")
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("prueba.gmail@gmail.com")
        
        # -> Enter “9000000002” in the identity document field before submitting the registration form.
        # Ej: 1001234567 password field
        elem = page.get_by_role("textbox", name="Documento de identidad")
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("9000000002")
        
        # -> Submit the registration form with “Crear cuenta” once and verify the exact rejection feedback and that “¡Registro exitoso!” is absent.
        # Crear cuenta → button
        elem = page.get_by_role("button", name="Crear cuenta →")
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> The Gmail address displays the non-institutional-domain hint.
        # Assert-outcome: not verified — the export-time check could not be evaluated
        # Assert: The non-institutional-domain hint is visible.
        await expect(page.locator("#root").nth(0)).to_contain_text("Ese dominio no es institucional", timeout=15000), "The non-institutional-domain hint is visible."
        
        # --> Submitting the Gmail address is rejected for requiring an institutional email.
        # Assert-outcome: not verified — the export-time check could not be evaluated
        # Assert: The rejection indicates that an institutional email is required.
        await expect(page.locator("#root").nth(0)).to_contain_text("correo institucional", timeout=15000), "The rejection indicates that an institutional email is required."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    