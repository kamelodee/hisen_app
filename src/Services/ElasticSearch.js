// import Elasticquery from "./Elasticquery";

// const config = {
//   Auth: {
//     identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
//     region: process.env.REACT_APP_region,
//   },
// };
// const Elasticindex = process.env.REACT_APP_ELASTIC_INDEX;
// class Elasticsearch {
//   static async HeaderSearch(searchtext, from = 0, to = 24) {
//     try {
//       const body = Elasticquery.HeaderSearchQuery(searchtext);
//       body.from = from;
//       body.size = to;
//       const Amplify = (await import("@aws-amplify/core")).default;
//       Amplify.configure(config);
//       const Auth = (await import("@aws-amplify/auth")).default;
//       const credentials = await Auth.currentCredentials();
//       const Lambda = await import("aws-sdk/clients/lambda");
//       const promise = new Promise((res, rej) => {
//         var query = {
//           Elasticindex,
//           queryType: "search",
//           ElasticType: "pgproduct",
//           ElasticBody: body,
//         };
//         var lambda = new Lambda.default({
//           credentials: Auth.essentialCredentials(credentials),
//           region: Auth._config.region,
//         });
//         var params = {
//           FunctionName: "elasticsearch",
//           InvocationType: "RequestResponse",
//           Payload: JSON.stringify(query),
//         };
//         lambda.invoke(params, function (err, data) {
//           if (err) rej(err);
//           // an error occurred
//           else res(JSON.parse(data.Payload)); // successful response
//         });
//       });
//       return promise;
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   static async ProductSearch(querys) {
//     try {
//       const Amplify = (await import("@aws-amplify/core")).default;
//       Amplify.configure(config);
//       const Auth = (await import("@aws-amplify/auth")).default;
//       const credentials = await Auth.currentCredentials();
//       const Lambda = await import("aws-sdk/clients/lambda");
//       const promise = new Promise((res, rej) => {
//         var query = {
//           Elasticindex,
//           queryType: "search",
//           ElasticType: "pgproduct",
//           ElasticBody: querys,
//         };
//         var lambda = new Lambda.default({
//           credentials: Auth.essentialCredentials(credentials),
//           region: Auth._config.region,
//         });
//         var params = {
//           FunctionName: "elasticsearch",
//           InvocationType: "RequestResponse",
//           Payload: JSON.stringify(query),
//         };
//         lambda.invoke(params, function (err, data) {
//           if (err) rej(err);
//           // an error occurred
//           else res(JSON.parse(data.Payload)); // successful response
//         });
//       });
//       return promise;
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   static async GetProductByGroupid(productGroupId, currentProductId) {
//     try {
//       const Amplify = (await import("@aws-amplify/core")).default;
//       Amplify.configure(config);
//       const Auth = (await import("@aws-amplify/auth")).default;
//       const credentials = await Auth.currentCredentials();
//       const Lambda = await import("aws-sdk/clients/lambda");
//       const promise = new Promise((res, rej) => {
//         const querys = {
//           from: 0,
//           size: 9,
//           query: {
//             bool: {
//               must: [
//                 {
//                   terms: {
//                     productGroupId,
//                   },
//                 },
//               ],
//               must_not: [
//                 {
//                   match: {
//                     productId: {
//                       query: currentProductId,
//                     },
//                   },
//                 },
//                 {
//                   match: {
//                     prodgrpIndexName: {
//                       query: "PrdGrp*",
//                     },
//                   },
//                 },
//               ],
//             },
//           },
//         };
//         var query = {
//           Elasticindex,
//           queryType: "search",
//           ElasticType: "pgproduct",
//           ElasticBody: querys,
//         };
//         var lambda = new Lambda.default({
//           credentials: Auth.essentialCredentials(credentials),
//           region: Auth._config.region,
//         });
//         var params = {
//           FunctionName: "elasticsearch",
//           InvocationType: "RequestResponse",
//           Payload: JSON.stringify(query),
//         };
//         lambda.invoke(params, function (err, data) {
//           if (err) rej(err);
//           // an error occurred
//           else res(JSON.parse(data.Payload)); // successful response
//         });
//       });
//       return promise;
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   static async GetByProductId(id) {
//     try {
//       const Amplify = (await import("@aws-amplify/core")).default;
//       Amplify.configure(config);
//       const Auth = (await import("@aws-amplify/auth")).default;
//       const credentials = await Auth.currentCredentials();
//       const Lambda = await import("aws-sdk/clients/lambda");
//       const promise = new Promise((res, rej) => {
//         var query = {
//           Elasticindex,
//           ElasticBody: id,
//           ElasticType: "pgproduct",
//           queryType: "get",
//         };
//         var lambda = new Lambda.default({
//           credentials: Auth.essentialCredentials(credentials),
//           region: Auth._config.region,
//         });
//         var params = {
//           FunctionName: "elasticsearch",
//           InvocationType: "RequestResponse",
//           Payload: JSON.stringify(query),
//         };
//         lambda.invoke(params, function (err, data) {
//           if (err) rej(err);
//           // an error occurred
//           else res(JSON.parse(data.Payload)); // successful response
//         });
//       });
//       return promise;
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   static async getProductsByProductsId(arr) {
//     try {
//       const Amplify = (await import("@aws-amplify/core")).default;
//       Amplify.configure(config);
//       const Auth = (await import("@aws-amplify/auth")).default;
//       const credentials = await Auth.currentCredentials();
//       const Lambda = await import("aws-sdk/clients/lambda");
//       const promise = new Promise((res, rej) => {
//         const querys = {
//           from: 0,
//           size: arr.length,
//           query: {
//             bool: {
//               must: [
//                 {
//                   terms: {
//                     "brandProductId.keyword": arr,
//                   },
//                 },
//               ],
//               must_not: [],
//             },
//           },
//         };
//         var query = {
//           Elasticindex,
//           queryType: "search",
//           ElasticType: "pgproduct",
//           ElasticBody: querys,
//         };
//         var lambda = new Lambda.default({
//           credentials: Auth.essentialCredentials(credentials),
//           region: Auth._config.region,
//         });
//         var params = {
//           FunctionName: "elasticsearch",
//           InvocationType: "RequestResponse",
//           Payload: JSON.stringify(query),
//         };
//         lambda.invoke(params, function (err, data) {
//           if (err) rej(err);
//           // an error occurred
//           else res(JSON.parse(data.Payload)); // successful response
//         });
//       });
//       return promise;
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   static FormatResults(documents) {
//     const formattedResults = [];
//     if (documents.data) {
//       documents.data.hits.hits.forEach(function (documnt) {
//         var documentSource = documnt._source;
//         documentSource.id = documnt._id;
//         formattedResults.push(documentSource);
//       });
//       return formattedResults;
//     }
//     if (documents.hits) {
//       documents.hits.hits.forEach(function (documnt) {
//         var documentSource = documnt._source;
//         documentSource.id = documnt._id;
//         formattedResults.push(documentSource);
//       });
//       return formattedResults;
//     }
//   }
// }
// export default Elasticsearch;
