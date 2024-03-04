import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';

// This is your Swagger document. You can also load this from a JSON file
const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Express API with Swagger',
    version: '1.0.0',
    description: 'A simple Express API',
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Local server',
    },
  ],
  components: {
    schemas: {
      User: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          password: { type: 'string' },
        },
      },
    },
  },
  paths: {
    '/user/create': {
      post: {
        summary: 'Register a new user',
        tags: ['User'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'User created successfully',
          },
          '400': {
            description: 'Error in user creation',
          },
        },
      },
    },
    'user/all': {
      get: {
        summary: 'Get all users',
        tags: ['User'],
        responses: {
          '200': {
            description: 'A list of all users',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/User'
                  }
                }
              }
            }
          }
        }
      }
    },
    '/user/get/{id}': {
      get: {
        summary: 'Get a user by ID',
        tags: ['User'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID of the user to get',
            schema: {
              type: 'integer'
            }
          }
        ],
        responses: {
          '200': {
            description: 'Details of the user',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User'
                }
              }
            }
          },
          '404': {
            description: 'User not found'
          }
        }
      }
    },
    '/auth/login': {
        post: {
            summary: 'Login a user',
            tags: ['Auth'],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                      email: { type: 'string', format: 'email' },
                      password: { type: 'string' }
                    }
                  }
                }
              }
            },
            responses: {
              '200': {
                description: 'Authentication successful',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        token: {
                          type: 'string',
                          description: 'JWT token for authenticated user'
                        }
                      }
                    }
                  }
                }
              },
              '400': {
                description: 'Bad Request - Invalid request or missing fields'
              },
              '403': {
                description: 'Forbidden - Authentication failed'
              }
            }
          }
    },
  },
};

export function setupSwagger(app: Express): void {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
