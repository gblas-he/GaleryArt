import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import Providers from './Providers';

const renderApp = (ruta = '/') =>
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <Providers>
        <App />
      </Providers>
    </MemoryRouter>
  );

beforeEach(() => window.localStorage.clear());

test('la portada muestra el título y la navegación principal', () => {
  renderApp();
  expect(screen.getByRole('heading', { level: 1, name: /descubra el arte/i })).toBeInTheDocument();
  const nav = screen.getByRole('navigation', { name: /principal/i });
  expect(within(nav).getByRole('link', { name: /obras de arte/i })).toHaveAttribute('href', '/obras');
  expect(within(nav).getByRole('link', { name: /descubrir/i })).toHaveAttribute('href', '/descubrir');
});

test('añadir una obra al carrito abre el carrito y actualiza el contador', async () => {
  renderApp('/obras/rio-en-calma');
  fireEvent.click(screen.getByRole('button', { name: /añadir al carrito/i }));

  const carrito = await screen.findByRole('dialog', { name: /su carrito/i });
  expect(within(carrito).getByText(/río en calma/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Carrito (1)' })).toBeInTheDocument();
});

test('guardar y quitar favoritos actualiza el contador y la página de favoritos', () => {
  renderApp('/obras/rio-en-calma');
  fireEvent.click(screen.getByRole('button', { name: /^favoritos$/i }));
  expect(screen.getByRole('link', { name: 'Favoritos (1)' })).toBeInTheDocument();

  fireEvent.click(screen.getByRole('link', { name: 'Favoritos (1)' }));
  expect(screen.getByRole('heading', { level: 1, name: /favoritos/i })).toBeInTheDocument();
  const principal = screen.getByRole('main');
  expect(within(principal).getByText('Río en calma')).toBeInTheDocument();
});

test('el catálogo filtra por categoría', () => {
  renderApp('/obras');
  expect(screen.getByText('12 obras')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('checkbox', { name: 'Marina' }));
  expect(screen.getByText('2 obras')).toBeInTheDocument();
});

test('la búsqueda del catálogo ignora tildes', () => {
  renderApp('/obras?q=rio');
  expect(screen.getByRole('heading', { level: 1, name: /resultados para «rio»/i })).toBeInTheDocument();
  expect(screen.getAllByText(/río en calma/i).length).toBeGreaterThan(0);
});

test('una obra vendida no se puede añadir al carrito', () => {
  renderApp('/obras/campo-de-umbral-2');
  expect(screen.getByRole('button', { name: 'Vendida' })).toBeDisabled();
});

test('se puede crear una cuenta y aparece la zona de cliente', async () => {
  renderApp('/cuenta');
  fireEvent.click(screen.getByRole('tab', { name: /crear cuenta/i }));
  fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Ana Prueba' } });
  fireEvent.change(screen.getByLabelText(/correo/i), { target: { value: 'ana@example.com' } });
  fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: 'clave-segura-1' } });
  fireEvent.click(screen.getAllByRole('button', { name: /crear cuenta/i }).slice(-1)[0]);

  expect(await screen.findByRole('heading', { name: /hola, ana/i })).toBeInTheDocument();
  expect(screen.getByText(/todavía no ha hecho ningún pedido/i)).toBeInTheDocument();
});

test('una ruta desconocida muestra la página 404', () => {
  renderApp('/esto-no-existe');
  expect(screen.getByRole('heading', { name: /no encontramos esta página/i })).toBeInTheDocument();
});
