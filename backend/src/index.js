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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("@apollo/server");
var standalone_1 = require("@apollo/server/standalone");
var mongoose_1 = require("mongoose");
var connection_js_1 = require("../models/connection.js");
var MONGODB = 'mongodb://localhost:27018';
var typeDefs = "#graphql\ntype Connection {\n    _id: String\n    source: String\n    destination: String\n    type: String\n}\n\ninput ConnectionInput {\n    source: String\n    destination: String\n    type: String\n}\n\ntype Query {\n    getConnection(ID: ID!): Connection!\n    getConnections(limit: Int): [Connection]\n}\n\ntype Mutation {\n    createConnection(connectionInput: ConnectionInput): String!\n    updateConnection(ID: ID!, connectionInput: ConnectionInput): String!\n    deleteConnection(ID: ID!): String!\n}\n";
var resolvers = {
    Query: {
        getConnection: function (_, _a, _, _) {
            var ID = _a.ID;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, connection_js_1.default.findById(ID)];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        },
        getConnections: function (_, _a) {
            var limit = _a.limit;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, connection_js_1.default.find().limit(limit)];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        }
    },
    Mutation: {
        createConnection: function (_, _a) {
            var _b = _a.connectionInput, source = _b.source, destination = _b.destination, type = _b.type;
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, new connection_js_1.default({ source: source, destination: destination, type: type }).save()];
                        case 1:
                            res = _c.sent();
                            return [2 /*return*/, res._id];
                    }
                });
            });
        },
        updateConnection: function (_, _a) {
            var ID = _a.ID, _b = _a.connectionInput, source = _b.source, destination = _b.destination, type = _b.type;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, connection_js_1.default.updateOne({ _id: ID }, { $set: { source: source, destination: destination, type: type } })];
                        case 1:
                            _c.sent();
                            return [2 /*return*/, ID];
                    }
                });
            });
        },
        deleteConnection: function (_, _a) {
            var ID = _a.ID;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, connection_js_1.default.remove({ _id: ID })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
    }
};
await (0, mongoose_1.connect)(MONGODB);
var server = new server_1.ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
});
var url = (await (0, standalone_1.startStandaloneServer)(server, {
    listen: { port: 4000 }
})).url;
console.log("Server is ready at ".concat(url));
