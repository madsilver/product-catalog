# Catálogo de Produtos

> A solução para o projeto é um serviço rest desenvolvido em node js. 
Abaixo são apresentadas as respostas às questões e por último estão as instruções para executar o código.

O projeto utiliza alguns projetos opensource:
* [node.js] - evented I/O for the backend 
* [express] - fast node.js network app framework
* [chai] - BDD/TDD assertion library for node
* [mocha] - javascript test framework 
* [mongodb] - document database with the scalability and flexibility 
* [mongoose] - mongodb object modeling

## Respostas das questões

1.1 Sharding

Nesta solução cada fragmento do cluster cuida de uma parte dos dados. Cada solicitação tanto lê e grava e é servida pelo cluster onde os dados residem. Isso significa que o desempenho de leitura e gravação pode ser aumentado adicionando mais fragmentos a um cluster, em uma escabilidade horizontal. Qual documento reside em qual fragmento é determinado pela shard key de cada coleção. A desvantagem é que há baixa tolerância a falhas pois quando um fragmento do cluster cai os dados nele ficam indisponíveis. Para contornar esse problema cada membro do cluster também pode ser um conjunto de réplicas.
Para esta arquitetura são necessários 3 serviços:
- shards - instância que armazena porções dos dados.
- config servers - instância que armazena metadados.
- router - instância que faz o roteamento das escritas e leituras.


1.2 Replica Set

Esta solução cria uma instância do mongodb (primário) onde serão realizadas as operações de escrita e mais réplicas (secundários) onde as operações são feitas de modo assíncrono. As operações de leitura podem ser atendidas por qualquer secundário. Esta arquitetura oferece tolerância a falhas: quando o primário cai um secundário é definido como primário; quando o desempenho de um dos membros do conjunto de réplicas cai os outros assumem seu lugar. Uma desvantagem é o custo pois esta solução exige no mínimo 3 servidores.

1.3 Database Designs

```js
var ProductSchema = new Schema({
    sku: { type: String, required: true },
    price: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    size: { type: Schema.Types.Mixed, required: true },
    brand: { type: String, required: true },
    categories: { type: [String], required: true },
    product_image_url: { type: String, required: true },
    special_price: Number
},{ 
    strict: false,      // strict false habilita a criação de novos campos
    versionKey: false
});

var StockSchema = new Schema({
    sku: { type: String, required: true },
    size: { type: Schema.Types.Mixed, required: true },
    quantity: { type: Number, required: true, default: 0 },
    warehouse: { type: Schema.ObjectId, required: true, ref: "Warehouse" }
},{
    versionKey: false
});

var WarehouseSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    location: {
        lat: String,
        lng: String
    }
},{
    versionKey: false
});

var CmsSchema = new Schema({
    sku: { type: String, required: true },
    size: { type: Schema.Types.Mixed, required: true },
    content: { type: String, required: true },
    region: { type: String, required: true }
},{
    versionKey: false
});
```


2. Filter and Validation

O filtro criado será utilizado como middleware nas requisições. Ele pode ser testado como demonstrado no final deste arquivo.

```js
//src/productFilter.js
/*
exemplo:
var filter = require("productFilter");
app.post("/product", filter.wms, ctrl.postProducts);
*/
module.exports = {
    wms: function(req, res, next) {
        for(var i=0; i < req.body.length; i++) {
            var product = req.body[i];
            var urlImage = product.product_image_url;

            if(urlImage) {
                // valid image extension
                if(!(/\.(jpg|jpeg|png|gif)$/i).test(urlImage)) {
                    res.json({message: "Invalid image extension", product: product});
                    return;
                }
                // valid URL
                if(!(/[\w-]+\//i).test(urlImage)) {
                    res.json({message: "Invalid image url", product: product});
                    return;
                }
                // prepend http protocol
                if(!(/^(https?):/).test(urlImage)) {
                    req.body[i].product_image_url = "http://" + urlImage;
                }
            }
            else {
                res.json({message: "Image url required", product: product});
                return;
            }
        }
        next();
    }
};

```
3. Tratando falhas temporárias e permanentes de webservice

Implementar um cluster para que o node js crie uma instância para cada core do processador (somente válido para sistemas multi-core). Solução alternativa e mais consistente seria utilizar frameworks, como estruturas de enfileiramento de mensagens (MSMQ, WebSphere MQ, Windows Communication Foundation da Microsoft, a WS extension WS-ReliableMessaging).

```js
if(cluster.isMaster) {
    console.log("Master " + process.pid +" is running");
    for(var i=0; i< numCPUs; i++) {
        cluster.fork();
    }
    cluster.on("exit", function(worker, code, signal) {
        console.log("worker " + worker.process.pid + " died");
        // cria novo cluster se um processo é encerrado inesperadamente
        cluster.fork();
    });
}
else {
    http.createServer(app).listen(config.port);
    console.log("Worker " + process.pid + " started");
}
```

## Executando o projeto

- Instalação do node js
```sh
$ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```
- Instalação do MongoDB
 ```sh
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
$ echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
$ sudo apt-get update
$ sudo apt-get install -y mongodb-org
```
- Instalação das dependências do node
```sh
$ cd product-catalog-test
$ npm install
```
- Rodando o mongo
```sh
$ mongod
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
| PUT | /stock/:id | Atualiza o item pelo paramêtro id |


[node.js]: <http://nodejs.org>
[express]: <http://expressjs.com>
[chai]: <http://chaijs.com/>
[mocha]: <https://mochajs.org/>
[mongodb]: <https://www.mongodb.com/>
[mongoose]: <http://mongoosejs.com/>