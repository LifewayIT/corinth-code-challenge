import {GraphQLError, GraphQLScalarType, Kind} from 'graphql';
import {isDate, isString} from 'lodash';
import {DateTime} from 'luxon';

const _formatStr = 'YYYY-MM-DD';

export const dateScalar = new GraphQLScalarType({

    name: 'Date',

    serialize: (value: Date | string) => {

        if (value === null || typeof value === 'undefined') {
            return null;
        }

        if (isDate(value)) {
            return DateTime.fromJSDate(value).toFormat(_formatStr);
        } else if (isString(value)) {
            return DateTime.fromISO(value).toFormat(_formatStr);
        } else {
            throw new TypeError('Field error: value is an invalid Date');
        }

    },

    parseValue: (value) => {

        const date = DateTime.fromISO(value);
        if (!date.isValid) {
            throw new TypeError('Field error: value is an invalid Date');
        }

        return date.toJSDate();

    },

    parseLiteral: (literal) => {

        if (literal.kind !== Kind.STRING) {
            throw new GraphQLError(`Query error: Can only parse strings to dates but got a: ${literal.kind}`,
                [literal]);
        }

        const result = DateTime.fromISO(literal.value);
        if (!result.isValid) {
            throw new GraphQLError('Query error: Invalid date', [literal]);
        }

        return result.toJSDate();

    }

});
