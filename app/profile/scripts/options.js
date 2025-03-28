const parser = new DOMParser();

export const errorOption = parser.parseFromString(
    '<option>Something went wrong.</option>',
    'text/html'
).body.firstChild;

export const validOption = (value, text) => {
    return parser.parseFromString(
        `<option value=${value}>${text}</option>`,
        'text/html'
    ).body.firstChild;
}
