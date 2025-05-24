export const validate = (schema) => {
  // Return middleware function for Express
  return (req, res, next) => {
    try {
      // Validate both request body and query parameters
      const bodyValidation = schema.validate(req.body, { abortEarly: false });
      const queryValidation = schema.validate(req.query, { abortEarly: false });

      const errors = [];

      // Process body validation errors if any
      if (bodyValidation.error) {
        errors.push(...bodyValidation.error.details.map(err => ({
          field: err.context.key,
          message: err.message
        })));
      }

      // Process query validation errors if any
      if (queryValidation.error) {
        errors.push(...queryValidation.error.details.map(err => ({
          field: err.context.key,
          message: err.message
        })));
      }

      // If validation errors exist, return 400 with error details
      if (errors.length > 0) {
        return res.status(400).json({
          status: 'error',
          errors: errors
        });
      }

      // Validation passed, proceed to next middleware
      next();
    } catch (error) {
      // Handle unexpected validation errors
      return res.status(500).json({
        status: 'error',
        message: 'Validation failed due to internal error'
      });
    }
  };
};
