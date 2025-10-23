# Routing and API Specifications
Routes for the core connector are specifed through the core connector api specifications. The api specifications are stored in the `core-connector-template/src/api-spec` folder. The api specifications 
are based on Open API Specicification. To learn more about open api specification, please read through the documentation on [Swagger](https://swagger.io/specification/). For an example api specification,
please visit [editor.swagger.io](https://editor.swagger.io). Using open api specification as our routes manager allows us to have request schema validation by default when we use an [openapi-backend](https://www.npmjs.com/package/openapi-backend) 
for node js.

## How is it used?
The core connector exposes two api servers on two distinct ports. By default, it is port 3003 and 3004. For each of these servers, there is an api specification that dictates what resources are available
on the api. For example if it is a mojaloop connector server i.e a server that receives requests from the mojaloop connector, it will have an api specification that has routes defined in the mojaloop connector 
backend api.

At run time, the api specification is loaded from it's location in the template folder and openapi-backend allows us to configure route handlers based on `operationIds` specified in the api specification. More
on this in the next section.

## Route Handling
All routes are specified through the open api specification. When specifying a path resource in the api specification, make sure set an operationId for it becuase this allows us to reference the path 
and assign it a function as a route handler in the core connector routes file.

Let us try to implement a route that handles an http request like this and returns `Hello World`. It will be a GET request at `/` that just returns a `200 OK` response.

> #### Before following this example tutorial, make sure you have created a new core connector based on the template. Follow the instructions [here](https://github.com/mojaloop/ml-reference-connectors?tab=readme-ov-file#creating-a-new-connector) to create a new one.

Consider this api specification for the route that we want to implement .

```yaml
openapi: 3.0.0
info:
  version: 1.0.0
  title: Hello World API
  description: A simple API that returns "Hello World" in plain text.
servers:
  - url: http://localhost:3000
paths:
  /:
    get:
      summary: Return "Hello World"
      description: Returns "Hello World" as a plain text response.
      operationId: hello
      responses:
        '200':
          description: A successful response containing "Hello World"
          content:
            text/plain:
              schema:
                type: string
                example: Hello World

```

Take note of the operationId in the in code block above. The value is set to `hello`. Copy this api specification and paste it in the file at this 
location of the newly created connector `core-connector-template/src/api-spec/core-connector-api-spec-dfsp.yml`

We'll use this operationId to map a function route handler to handle requests for this api resource. Copy the example api spec and replace the contents of

## Adding a route handler.
To add a route handler, open the routes file `dfspCoreConnectorRoutes.ts` in the `core-connector-template/src/core-connector-svc` folder. Add a this method to the `DFSPCoreConnectorRoutes` class

```typescript
private async hello(context: Context, request: Request, h: ResponseToolkit) {
        try {
            const result = "Hello World"
            return this.handleResponse(result, h);
        } catch (error: unknown) {
            return this.handleError(error, h);
        }
    }
```
# Registering the Route Handler
After adding this function to the class, add the following entry to the handlers attribute of the class.

```typescript
    // Register openapi spec operationIds and route handler functions here
    private readonly handlers = {
        ...
        hello: this.hello.bind(this)
    }
```

After you have registered the route handler like this, you can start the server and make a request to [localhost:3004](http://localhost:3004). 

You should get back a result `Hello World`

## Conclusion
In this section section, we have explained how to create a new route using openapi specification, creating a route handler function and how to connect them such that when a request is received by the server on port 3004 an appropriate function is called.

> #### Note that request parameters, bodies, methods and headers are all to be specified in the api specification.
