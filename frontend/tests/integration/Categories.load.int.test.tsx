import { render, screen, waitFor } from '@testing-library/react'
import Categories from '../../src/components/Categories'
import { server, apiGet, json } from '../setup'

describe('Categories integration - carga de lista', () => {
  it('renderiza categorias retornadas pela API', async () => {
    server.use(
      apiGet('/categories', (_req) =>
        json({
          data: [
            { 
              id: '1', 
              name: 'Trabalho', 
              description: 'Tarefas relacionadas ao trabalho', 
              createdAt: new Date().toISOString(),
              tasks: []
            },
            { 
              id: '2', 
              name: 'Estudos', 
              description: 'Tarefas acadêmicas e cursos', 
              createdAt: new Date().toISOString(),
              tasks: []
            },
          ]
        })
      )
    )

    render(<Categories />)

    await waitFor(() => {
      expect(screen.getByText('Trabalho')).toBeInTheDocument()
      expect(screen.getByText('Tarefas relacionadas ao trabalho')).toBeInTheDocument()
      expect(screen.getByText('Estudos')).toBeInTheDocument()
      expect(screen.getByText('Tarefas acadêmicas e cursos')).toBeInTheDocument()
    })
  })

  it('renderiza tabela vazia quando não há categorias', async () => {
    server.use(
      apiGet('/categories', (_req) =>
        json({ data: [] })
      )
    )

    render(<Categories />)

    await waitFor(() => {

      expect(screen.getByText('Nome')).toBeInTheDocument()
      expect(screen.getByText('Descrição')).toBeInTheDocument()
   
      const tbody = screen.getByRole('table').querySelector('tbody')
      expect(tbody?.children.length).toBe(0)
    })
  })
})