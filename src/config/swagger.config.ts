import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
import { config } from './config';

export const API_VERSION = 'v1';

const swaggerDefinition = {
  swagger: '2.0',
  info: {
    title: 'React Academy API',
    version: API_VERSION,
    description: 'API documentation for React Academy',
  },
  host: `localhost:${config.PORT}`,
  basePath: `/api/${API_VERSION}`,
  schemes: ['http'],
  securityDefinitions: {
    authToken: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Enter your token directly.',
    },
  },
  tags: [
    { name: 'Authentication', description: 'Authentication endpoints' },
    { name: 'Categories', description: 'Course category management' },
    { name: 'Courses', description: 'Course management' },
    { name: 'Course Sections', description: 'Course section management' },
    { name: 'Overview', description: 'Platform overview and statistics' },
    { name: 'Users', description: 'User management' },
  ],
  definitions: {
    User: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        email: { type: 'string', format: 'email' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        roleId: { type: 'integer' },
      },
    },
    Category: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        description: { type: 'string' },
      },
    },
    Course: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        title: { type: 'string' },
        description: { type: 'string' },
        categoryId: { type: 'integer' },
        teacherId: { type: 'integer' },
        price: { type: 'number' },
      },
    },
    CourseSection: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        courseId: { type: 'integer' },
        title: { type: 'string' },
        description: { type: 'string' },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, '../routes/*.routes.ts')],
};

export const generateSwaggerDocs = () => {
  return swaggerJsdoc(options);
};
