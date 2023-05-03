
/**
 * @jest-environment jsdom
 */


import { describe, it, expect, test, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

describe('header is being rendered by useEffect', () => {
	beforeEach(()=>{
		render(<Header></Header>);

	});
	test('Header\'s components are being rendered', ()=>{
		const component=screen.getByText(/Refresh/i).closest('div');
		expect(component.innerHTML).toContain('button');
		expect(component.innerHTML).toContain('h1');
		expect(component.innerHTML).toContain('select');
		expect(component.innerHTML).toContain('option');
		expect(component.innerHTML).toContain('ul');
	});
});
