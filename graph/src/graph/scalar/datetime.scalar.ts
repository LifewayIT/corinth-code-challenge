import {GraphQLError, GraphQLScalarType, Kind} from 'graphql';
import {isDate, isString} from 'lodash';
import {DateTime} from 'luxon';

export const dateTimeScalar = new GraphQLScalarType({

    name: 'DateTime',

    serialize: (value: DateTime | Date | string) => {

        if (value === null || typeof value === 'undefined') {
            return null;
        }

        if (isDate(value)) {
            return DateTime.fromJSDate(value).toISO();
        } else if (isString(value)) {
            return DateTime.fromISO(value).toISO();
        } else if (value instanceof DateTime) {
            return value.toISO();
        } else {
            throw new TypeError('Field error: value is an invalid date/time');
        }

    },

    parseValue: (value) => {

        const date = DateTime.fromISO(value);
        if (!date.isValid) {
            throw new TypeError('Field error: value is an invalid date/time');
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
            throw new GraphQLError('Query error: Invalid date/time', [literal]);
        }

        return result.toJSDate();

    }

});
