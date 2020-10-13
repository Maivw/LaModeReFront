# LaMode Schema

## User

| attrubute name | data type  |               details |
| -------------- | :--------: | --------------------: |
| id             |  integer   | not null, primary key |
| email          |   string   |              not null |
| username       |   string   |              not null |
| password       | str.binary |              not null |
| firstName      |   string   |              not null |
| lastName       |   string   |              not null |
| phoneNum       |   string   |              not null |

## Product

| attrubute name | data type |               details |
| -------------- | :-------: | --------------------: |
| id             |  integer  | not null, primary key |
| productListId  |  integer  | forgein key, not null |
| productName    |  string   |              not null |
| productCode    |  string   |              not null |
| color          |  string   |              not null |
| price          |  integer  |              not null |
| description    |  string   |              not null |
| size           |   array   |              not null |
| photo          |  string   |              not null |
| volume         |  integer  |              not null |
| promotion      |  string   |              not null |

## Categories

| attrubute name | data type |               details |
| -------------- | :-------: | --------------------: |
| id             |  integer  | not null, primary key |
| categoryName   |  string   |              not null |

## ProductList

| attrubute name  | data type |               details |
| --------------- | :-------: | --------------------: |
| id              |  integer  | not null, primary key |
| productListName |  string   |             not  null |
| categoryId      |  integer  |  foreign key not null |

## ItemsOfOrder

| attrubute name | data type |              details |
| -------------- | :-------: | -------------------: |
| oderId         |  integer  | not null, oreign key |
| productId      |  integer  |          foreign key |
| quantity       |  integer  |             not null |


## Order

| attrubute name | data type |               details |
| -------------- | :-------: | --------------------: |
| id             |  integer  | not null, primary key |
| userId         |  integer  |  foreign key not null |
