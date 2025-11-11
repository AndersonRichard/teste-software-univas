import { render, screen, waitFor } from "@testing-library/react";
import { HttpResponse } from "msw";
import Categorias from "../../src/components/Categorias";
import { server, apiGet } from "../setup";

describe("Categorias integration - falhas da API", () => {
  it("mostra mensagem de erro quando a API retorna erro de rede", async () => {
    server.use(
      apiGet('/categorias', () => HttpResponse.error())
    )

    render(<Categorias />);

    await waitFor(() => {
      expect(
        screen.getByText(/Erro ao carregar categorias/i)
      ).toBeInTheDocument();
    });
  });

  it("mostra mensagem de erro quando a API retorna 500", async () => {
    server.use(
      apiGet('/categorias', () => 
        HttpResponse.json(
          { error: 'Internal Server Error' },
          { status: 500 }
        )
      )
    )

    render(<Categorias />);

    await waitFor(() => {
      expect(
        screen.getByText(/Erro ao carregar categorias/i)
      ).toBeInTheDocument();
    });
  });

  it("mostra mensagem de erro quando a API retorna 404", async () => {
    server.use(
      apiGet('/categorias', () => 
        HttpResponse.json(
          { error: 'Not Found' },
          { status: 404 }
        )
      )
    )

    render(<Categorias />);

    await waitFor(() => {
      expect(
        screen.getByText(/Erro ao carregar categorias/i)
      ).toBeInTheDocument();
    });
  });
});