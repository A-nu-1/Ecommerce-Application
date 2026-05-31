import { it, expect, describe } from "vitest";
import { formatMoney } from "./money";

describe('formatMoney', () => {
    it('formats 1999 as $19.99 correctly', () => {
        expect(formatMoney(1999)).toBe("$19.99");
    });

    it('formats 0 as $0.00 correctly', () => {
        expect(formatMoney(0)).toBe("$0.00");
        expect(formatMoney(-999)).toBe("-$9.99");
    });

    it('formats 1090 as $10.90 correctly', () => {
        expect(formatMoney(1090)).toBe("$10.90");
        expect(formatMoney(1090)).not.toBe("$10.9");
        expect(formatMoney(100)).toBe("$1.00");
        
    });

    it('negative numbers', () => {
        expect(formatMoney(-100)).toBe("-$1.00");
        expect(formatMoney(-999)).toBe("-$9.99");
    });
});