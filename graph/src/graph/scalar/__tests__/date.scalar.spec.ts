import {Kind} from 'graphql';
import {DateTime} from 'luxon';
import {dateScalar} from '../date.scalar';

describe('dateScalar', () => {

    it('should serialize null/undefined value', () => {

        expect(dateScalar.serialize(null)).toEqual(null);
        expect(dateScalar.serialize(undefined)).toEqual(null);

    });

    it('should serialize Date value', () => {

        const result = '2019-02-11';
        const input = '2019-02-11';

        const date = DateTime.fromISO(input).setZone('America/New_York').toJSDate();
        const str = input;
        const mt = DateTime.fromISO(input);
        const num = 123445;

        expect(dateScalar.serialize(date)).toEqual(result);
        expect(dateScalar.serialize(str)).toEqual(result);
        expect(dateScalar.serialize(mt)).toEqual(result);
        expect(() =>
            dateScalar.serialize(num) as DateTime
        ).toThrowErrorMatchingSnapshot();

    });

    it('should parse DateTime value', () => {

        const input = '2019-01-11';
        expect(dateScalar.parseValue(input)).toMatchSnapshot();

    });

    it('should throw error when parsing DateTime value', () => {

        const input = 'Some weird string';

        expect(() =>
            dateScalar.parseValue(input) as DateTime
        ).toThrowErrorMatchingSnapshot();

    });

    it('should parse literal', () => {

        const input = '2019-01-11';
        expect(dateScalar.parseLiteral({
            kind: Kind.STRING,
            value: input
        }, {})).toMatchSnapshot();

    });

    it('should throw error when parsing non-string literal', () => {

        expect(() =>
            dateScalar.parseLiteral({
                kind: Kind.BOOLEAN,
                value: true
            }, {}) as DateTime
        ).toThrowErrorMatchingSnapshot();

    });

    it('should throw error when parsing literal with bad date', () => {

        const input = 'Some weird string';
        expect(() =>
            dateScalar.parseLiteral({
                kind: Kind.STRING,
                value: input
            }, {}) as DateTime
        ).toThrowErrorMatchingSnapshot();

    });

});
