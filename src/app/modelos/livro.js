
const { check } = require('express-validator/check');

class Livro {
    static validacoes(){
        return [
            check('titulo').isLength({min: 5}).withMessage("O titulo precisa ter no mínimo 5 dígitos"),
            check('preco').isCurrency().withMessage("O preço precisa estár em um formato monetário válido!") 
        ];
    }
}

module.exports = Livro;