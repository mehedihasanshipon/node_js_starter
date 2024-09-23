let customVariable = '';

const setTimezoneVariable = (value: string): void => {
    customVariable = value;
};

const getTimezoneVariable = (): string => customVariable;

export { setTimezoneVariable, getTimezoneVariable };
