import { describe, it, expect } from 'vitest';

describe('Sample Test Suite', () => {
    it('should add two numbers correctly', () => {
        const sum = (a: number, b: number) => a + b;
        expect(sum(1, 2)).toBe(3);
    });

    it('should subtract two numbers correctly', () => {
        const subtract = (a: number, b: number) => a - b;
        expect(subtract(5, 3)).toBe(2);
    });
});
