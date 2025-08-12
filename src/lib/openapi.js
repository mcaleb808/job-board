export const openapi = {
  openapi: "3.0.3",
  info: {
    title: "Job Board API",
    version: "1.0.0",
    description: "OpenAPI for the Job Board (auth, jobs, applications)",
  },
  servers: [{ url: "/" }],
  components: {
    schemas: {
      Error: {
        type: "object",
        properties: { message: { type: "string" } },
      },
      User: {
        type: "object",
        properties: {
          id: { type: "string" },
          email: { type: "string", format: "email" },
        },
        required: ["id", "email"],
      },
      Job: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          company: { type: "string" },
          type: {
            type: "string",
            enum: ["full-time", "part-time", "contract"],
          },
          location: { type: "string" },
          salaryRange: { type: "string" },
          tags: { type: "array", items: { type: "string" } },
          description: { type: "string" },
          createdAt: { type: "string", format: "date" },
        },
        required: ["id", "title", "company", "type"],
      },
      JobList: {
        type: "object",
        properties: {
          items: { type: "array", items: { $ref: "#/components/schemas/Job" } },
          total: { type: "integer" },
          page: { type: "integer" },
          pageSize: { type: "integer" },
        },
      },
      Application: {
        type: "object",
        properties: {
          id: { type: "string" },
          userId: { type: "string" },
          jobId: { type: "string" },
          fullName: { type: "string" },
          email: { type: "string", format: "email" },
          resumeUrl: { type: "string", format: "uri" },
          coverLetter: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
        },
        required: ["jobId", "fullName", "email", "resumeUrl"],
      },
    },
  },
  paths: {
    "/api/auth/login": {
      post: {
        summary: "Login",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", format: "email" },
                  password: { type: "string" },
                },
                required: ["email", "password"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Logged in",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          400: {
            description: "Invalid credentials",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/api/auth/register": {
      post: {
        summary: "Register",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", format: "email" },
                  password: { type: "string", minLength: 6 },
                },
                required: ["email", "password"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Registered",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          400: {
            description: "Invalid data",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/api/auth/logout": {
      post: {
        summary: "Logout",
        responses: { 200: { description: "OK" } },
      },
    },
    "/api/jobs": {
      get: {
        summary: "List jobs",
        parameters: [
          { name: "q", in: "query", schema: { type: "string" } },
          {
            name: "type",
            in: "query",
            schema: {
              type: "string",
              enum: ["all", "full-time", "part-time", "contract"],
            },
          },
          {
            name: "page",
            in: "query",
            schema: { type: "integer", minimum: 1 },
          },
          {
            name: "pageSize",
            in: "query",
            schema: { type: "integer", minimum: 1, maximum: 50 },
          },
        ],
        responses: {
          200: {
            description: "Job list",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/JobList" },
              },
            },
          },
        },
      },
    },
    "/api/jobs/{id}": {
      get: {
        summary: "Job details",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Job",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Job" },
              },
            },
          },
          404: { description: "Not found" },
        },
      },
    },
    "/api/applications": {
      post: {
        summary: "Create application",
        security: [{ cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  jobId: { type: "string" },
                  fullName: { type: "string" },
                  email: { type: "string", format: "email" },
                  resumeUrl: { type: "string", format: "uri" },
                  coverLetter: { type: "string" },
                },
                required: ["jobId", "fullName", "email", "resumeUrl"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Application" },
              },
            },
          },
          401: { description: "Unauthorized" },
        },
      },
    },
    "/api/applications/me": {
      get: {
        summary: "My applications",
        security: [{ cookieAuth: [] }],
        responses: {
          200: {
            description: "List",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    items: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Application" },
                    },
                  },
                },
              },
            },
          },
          401: { description: "Unauthorized" },
        },
      },
    },
  },
};
