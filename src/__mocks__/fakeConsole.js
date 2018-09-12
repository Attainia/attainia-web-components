/* eslint-disable */

export default () => {
    const logError = console.error
    const logWarn = console.warn
    let errors = []
    let warnings = []
    console.error = jest.fn((error) => {
        logError(error)
        errors.push(error)
    });
    console.warn = jest.fn((warn) => {
        logWarn(warn)
        warnings.push(warn)
    });
    return {
        shouldHaveNoErrors: () => {
            if (errors.length > 0) {
                throw new Error(`Illegal Console Errors: ${errors.join(', ')}`)
            }
        },
        shouldHaveNoWarnings: () => {
            if (warnings.length > 0) {
                throw new Error(`Illegal Console Warnings: ${warnings.join(', ')}`)
            }
        },
        reset: () => {
            errors = []
        }
    }
}
