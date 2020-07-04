# DateToDate
Uma forma de resumir intervalos de tempos

# dateFormatValidate
+ Parâmetros
`date` - Data do tipo `string`
`format` - Data do tipo `string`

``` javascript
let format = dateFormatValidate(this.value, 'dd/mm/yyyy H:i');
let message = 'Foi publicado há ' + format.countup();
```

# Return object
+ `countup`  Contagem depois da data estipulada. Deve ser depois de hoje
+ `countdown` Contagem antes da data estipulada. Deve ser antes de hoje
+ `count` Se nenhuma regra. Retorna `countup` ou `countdown`
+ `ascendant` Retorna se é ascendente, ou seja, Aumenta `countup`
+ `decrescent` Retorna se é decrescente, ou seja, Diminui `countdown`
+ `order` Retorna `ascendant` ou `decrescent`
































