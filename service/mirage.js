import { createServer, Model, Factory } from "miragejs";
import { faker } from "@faker-js/faker" 

export function makeServer({ environment = "test" } = {}) {
    let server = createServer({
        environment,
        models: {
            task: Model,
        },
        factories: {
            task: Factory.extend({
            title() {
                return faker.lorem.words({ min: 1, max: 3 })
            },
            completed() {
                return false;
            }
            })
        },
        seeds(server) {
            server.createList("task", 3);
            server.createList("task", 3, {completed: true});
        },
        routes() {
            this.get("/api/todos", (schema) => {
            return schema.tasks.all().models;
            }
            );
            this.post("api/todos", (schema, request) => {
            let {title} = JSON.parse(request.requestBody);
            const newTask = schema.create('task', { title, completed: false});

            return newTask;
            });
            this.patch("api/todos/:id", (schema, request) => {
            let {title, completed} = JSON.parse(request.requestBody);
            return ;
            })
        }
    });

    return server;
}
