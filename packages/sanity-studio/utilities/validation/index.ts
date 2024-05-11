import { ValidationContext } from 'sanity';

/**
 * Custom validations for use in your sanity schema field validations.
 *
 * All validations are wrapped in a function that allows them to be passed via rule.custom().
 * They all come with a default error message which can be overridden in the function parameters.
 *
 * E.G.
 * defineField({
 *   name: 'url',
 *   type: 'string',
 *   validation: (rule) => rule.custom(validUrl('URL is not valid, try again')).warning(),
 * })
 *
 * defineField({
 *   name: 'publishedAt',
 *   type: 'datetime',
 *   validation: (rule) => rule
 *     .custom(validPostTimestamps('updatedAt', 'after', undefined, 'Published At', 'Updated At'))
 *     .error(),
 * })
 */

/**
 * Set field as required if a parent field has a specific value.
 * Useful for conditional logic: showing or hiding fields on a document based on another fields value.
 */
export function requiredIfParentIs(parentName: string, parentValue: any, message?: string) {
  return function requiredIfParentIsValidator<RuleType>(value: RuleType, context: ValidationContext) {
    return (context.parent as Record<string, any>)?.[parentName] === parentValue && !value
      ? { message: message || 'Field is required' }
      : true;
  }
}

/**
 * For two fields containing a "datetime" field, compare them and ensure this field comes before/after the other field.
 * Optionally specify an error message, or override the field titles used in the default error message via `thisName` and `thatName`.
 */
export function validPostTimestamps(otherFieldName: string, order: 'before' | 'after', message?: string, thisName?: string, thatName?: string) {
  return function validPostTimestampsValidator<RuleType>(value: RuleType, context: ValidationContext) {
    const document = context.document;

    const otherField = document?.[otherFieldName];

    if (
      !value
      || !otherField
      || typeof value !== 'string'
      || typeof otherField !== 'string'
    ) {
      return true;
    }

    const thisField = Date.parse(value);
    const thatField = Date.parse(otherField);

    const compare = order === 'before'
      ? thatField > thisField
      : thatField < thisField;

    const hint = order === 'before' ? 'later' : 'earlier';

    return compare ?
      { message: message || `${thisName}${thisName ? ' m' : 'M'}ust be ${hint} than ${thatName || otherFieldName}` }
      : true;
  }
}

/**
 * Ensure a string field is a valid URL.
 */
export function validUrl(message?: string) {
  return function validUrlValidator<RuleType>(value: RuleType) {
    if (value && typeof value === 'string') {
      try {
        new URL(value);
        return true;
      } catch (err) {
        return { message: message || 'Must be a valid URL' };
      }
    }

    return true;
  }
}

/**
 * Ensure a string field starts with a valid string, or one of an array of valid strings.
 */
export function mustStartWith(startWith: string | Array<string>, message?: string) {
  const validationMessage = Array.isArray(startWith) ? `Must start with one of "${startWith.join(', ')}"` : `Must start with ${startWith}`;

  return function mustStartWithValidator<RuleType>(value: RuleType) {
    if (typeof value !== 'string') {
      return true;
    }

    const doesStartWith = Array.isArray(startWith)
      ? startWith.some(prefix => value.startsWith(prefix))
      : value.startsWith(startWith);

    return value && doesStartWith
      ? true
      : { message: message || validationMessage };
  }
}

/**
 * A validation rule for detecting if a URL is a valid external URL, or if it is an internal url that could be a page link instead.
 * Most used as a Warning instead of an Error in case of edge cases.
 */
export function shouldBeInternalLink(message?: string) {
  return function shouldBeInternalLinkValidator<RuleType>(value: RuleType) {
    if (typeof value === 'string') {
      return value && value.startsWith('/') && /^[a-zA-Z0-9\-_/?&]+$/.test(value)
        ? { message: message || 'It is better to use the Page type as this link is internal. This will ensure it stays up-to-date automatically' }
        : true;
    }

    return true;
  }
}

/**
 * A rule for ensuring a field starts with "/" or "http(s)", and is such a relative or an absolute URL.
 */
export function linkMustBeRelativeOrAbsolute(message?: string) {
  return function linkMustBeRelativeOrAbsoluteValidator<RuleType>(value: RuleType) {
    if (typeof value === 'string') {
      return value && !value.startsWith('/') && !value.startsWith('http')
        ? { message: message || 'Link must start with "/" or "http(s)"' }
        : true;
    }

    return true;
  }
}

/**
 * A rule to ensure a value matches a given regex. Useful for video links from YouTube, among other things.
 */
export function matchesRegex(regex: RegExp, message?: string) {
  return function matchesRegexValidation<RuleType>(value: RuleType) {
    if (typeof value === 'string') {
      return regex.test(value)
        ? true
        : { message: message || 'Invalid format' };
    }

    return true;
  }
}

/**
 * A rule to test if the value is a valid slug/pathname/clean URL.
 */
export function isSlug(message?: string) {
  return matchesRegex(/^[a-z0-9]+(-[a-z0-9]+)*$/, message || 'Must contain only lowercase letters [a-z], numbers [0-9], and dashes ("-")');
}
