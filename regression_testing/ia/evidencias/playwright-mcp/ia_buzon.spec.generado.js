import { test, expect } from '@playwright/test';

test('Laura envía un reporte al administrador desde Historial', async ({ page }) => {
  await page.goto('/');

  await page.locator('[data-cy="login-email"]').fill('laura.est@soyudemedellin.edu.co');
  await page.locator('[data-cy="login-documento"]').fill('1000000003');
  await page.locator('[data-cy="login-submit"]').click();

  await expect(page.locator('[data-cy="nav-historial"]')).toBeVisible();
  await page.locator('[data-cy="nav-historial"]').click();

  await expect(page.locator('[data-cy="historial-reporte-formulario"]')).toBeVisible();
  await page.locator('[data-cy="historial-reporte-mensaje"]').fill('Prueba con Playwright MCP');
  await page.locator('[data-cy="historial-reporte-enviar"]').click();

  await expect(page.locator('[data-cy="toast-mensaje"]')).toHaveText('Tu reporte llegó al administrador. Gracias por avisar.');
});
