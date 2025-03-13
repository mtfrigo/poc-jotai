"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const amqplib_1 = __importDefault(require("amqplib"));
const queueName = "all_queue";
function rabbitPlugin(fastify, opts
// done: any
) {
    return __awaiter(this, void 0, void 0, function* () {
        let connection;
        let channel;
        try {
            console.log({ salve: process.env.RABBITMQ_URI });
            connection = yield amqplib_1.default.connect(process.env.RABBITMQ_URI);
            channel = yield connection.createChannel();
            yield channel.assertQueue(queueName, {});
            function publishMessage(messageObject) {
                const msg = JSON.stringify(messageObject);
                channel.publish("", queueName, Buffer.from(msg));
            }
            fastify.decorate("publishMessage", publishMessage);
            fastify.decorate("user", "salve");
            fastify.addHook("preHandler", (request, _reply, done) => {
                request.publishMessage = publishMessage;
                request.user = "asdiauhsdiu";
                done();
            });
            fastify.addHook("onClose", () => __awaiter(this, void 0, void 0, function* () {
                yield channel.close();
                yield connection.close();
            }));
        }
        catch (error) {
            console.error("RabbitMQ connection error:", error);
            throw error; // Ensures Fastify fails to start if RabbitMQ is unavailable
        }
    });
}
exports.default = (0, fastify_plugin_1.default)(rabbitPlugin, { name: "rabbitPlugin " });
