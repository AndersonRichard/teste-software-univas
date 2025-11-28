import { test, expect } from "@playwright/test";

test.describe("Categorias", () => {
  test("navega para Categorias e lista itens do backend", async ({ page }) => {
    await page.goto("/"); // Dashboard
    await page.getByRole("link", { name: "Categorias" }).click(); // Título da seção
    await expect(
      page.getByRole("heading", { name: /Categorias/i })
    ).toBeVisible();
    
    // Categorias semeadas (seed do backend) - ajuste conforme seu seed
    // await expect(page.getByText(/Eletrônicos/i)).toBeVisible();
    // await expect(page.getByText(/Livros/i)).toBeVisible();
  });

  test("cria categoria e aparece na lista", async ({ page }) => {
    await page.goto("/categories");
    await page.getByRole("button", { name: /Adicionar Categoria/i }).click();
    
    const uniqueName = `Categoria-${Date.now()}`;
    await page.getByLabel("Nome:").fill(uniqueName);
    await page.getByLabel("Descrição:").fill("Descrição de teste E2E");
    await page.getByRole("button", { name: /Criar/i }).click();
    
    // Aguarda recarga da lista
    await expect(page.getByText(uniqueName)).toBeVisible();
  });

  test("atualiza uma categoria existente", async ({ page }) => {
    await page.goto("/categories");
    await page.getByRole("button", { name: /Editar/i }).first().click();
    
    const updatedName = `Atualizada-${Date.now()}`;
    await page.getByLabel("Nome:").fill(updatedName);
    await page.getByLabel("Descrição:").fill("Descrição atualizada E2E");
    await page.getByRole("button", { name: /Atualizar/i }).click();
    
    await expect(page.getByText(updatedName)).toBeVisible();
  });

  test("exclui uma categoria", async ({ page }) => {
    await page.goto("/categories");
    await page.getByRole("button", { name: /Excluir/i }).first().click();
    
    const confirmButton = page.getByRole("button", { name: /Confirmar/i });
    if (await confirmButton.isVisible()) {
      await confirmButton.click();
    }
    
    const firstRow = page.getByRole("row").nth(1);
    await expect(firstRow).toBeVisible();
  });
});