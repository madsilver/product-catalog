# Catálogo de Produtos

[![Build Status][travis-badge]][travis-source]
[![Source Code][badge-source]][source]

> Serviço rest para gerenciamento de produtos.

Projetos opensource usados:
* [node.js] - evented I/O for the backend 
* [express] - fast node.js network app framework
* [chai] - BDD/TDD assertion library for node
* [mocha] - javascript test framework 
* [mongodb] - document database with the scalability and flexibility 
* [mongoose] - mongodb object modeling

## Docker
```sh
$ docker build . -t nginx-node
$ docker run -d -p8080:80 nginx-node
```
- Rodando o teste
> Execução dos testes para o filtro, wms, cms e stock.
```sh
$ npm test
```
- Rodando a aplicação webservice

```sh
$ npm start
```

## Endpoints

#### WMS

| Método | URI | Descrição |
| ------ | ------ | ----- |
| GET | /product | Retorna todos os produtos |
| POST | /product | Insere dados do(s) produto(s) |
| PUT | /product | Atualiza dados do(s) produto(s) |

#### Stock

| Método | URI | Descrição |
| ------ | ------ | ----- |
| GET | /stock | Retorna os dados de todos os itens do estoque |
| GET | /stock/:sku/:size | Retorna o item pelos paramêtros sku e size |
| PUT | /stock/:id | Atualiza o item pelo paramêtro id |

#### CMS

| Método | URI | Descrição |
| ------ | ------ | ----- |
| GET | /cms/:sku_category | Retorna o item pelo paramêtro sku ou category |
| POST | /cms | Insere dados no CMS |
| PUT | /cms/:id | Atualiza o item pelo paramêtro id |


[node.js]: <http://nodejs.org>
[express]: <http://expressjs.com>
[chai]: <http://chaijs.com/>
[mocha]: <https://mochajs.org/>
[mongodb]: <https://www.mongodb.com/>
[mongoose]: <http://mongoosejs.com/>

[travis-badge]: <https://travis-ci.org/madsilver/product-catalog.svg?branch=master>
[travis-source]: <https://travis-ci.org/madsilver/product-catalog>
[issues-badge]: <https://img.shields.io/github/issues/madsilver/product-catalog.svg>
[issues-link]:<https://github.com/madsilver/import-categories-engine/issues>
[badge-source]: <https://img.shields.io/badge/source-madsilver%2Fproduct_catalog-blue.svg>
[source]: <https://github.com/madsilver/product-catalog>