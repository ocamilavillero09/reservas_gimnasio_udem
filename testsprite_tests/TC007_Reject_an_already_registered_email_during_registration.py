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
        
        # -> Open the registration form by selecting “Registrarse.”
        # Registrarse button
        elem = page.get_by_role("button", name="Registrarse")
        await elem.click(timeout=10000)
        
        # -> Enter the specified name, institutional email, and identity document, then submit the registration form once.
        # Ej: María García text field
        elem = page.get_by_role("textbox", name="Nombre completo")
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("Duplicado Prueba")
        
        # -> Enter the specified name, institutional email, and identity document, then submit the registration form once.
        # nombre@soyudemedellin.edu.co text field
        elem = page.get_by_role("textbox", name="Correo institucional")
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("laura.est@soyudemedellin.edu.co")
        
        # -> Enter the specified name, institutional email, and identity document, then submit the registration form once.
        # Ej: 1001234567 password field
        elem = page.get_by_role("textbox", name="Documento de identidad")
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("9000000003")
        
        # -> Enter the specified name, institutional email, and identity document, then submit the registration form once.
        # Crear cuenta → button
        elem = page.get_by_role("button", name="Crear cuenta →")
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> The registration form displays the duplicate-email message.
        # Assert-outcome: not verified — the export-time check could not be evaluated
        # Assert: The duplicate-email message is visible.
        await expect(page.locator("#root").nth(0)).to_contain_text("Ya existe una cuenta con este correo.", timeout=15000), "The duplicate-email message is visible."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    