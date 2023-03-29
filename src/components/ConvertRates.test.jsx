import { describe, expect, test, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ConverRates from './ConvertRates';
import axios from 'axios';

test('renders component', () => {
	render(<ConverRates />);
	const testbutton = screen.getByTest('Click Here');
	fireEvent.click(button);
	const value = screen.getByText('Value');
	expect(value).toBeInTheDocument();
});
