const LivroControlador = require('./livro-controlador');

const templates = require('../views/templates');

class BaseControlador {

    static rotas(){
        return { 
             home: '/',
             login: '/login'
         }; 
     }

    home() {
        return function(req, resp) {
            resp.marko(
                templates.base.home // Dando require na página de Home
            );
        };
    }

    login(){
        return function(req, resp) {
            resp.marko(
                templates.base.login // Dando require na página de Login
            );
        };
    }

    efetuaLogin(){
        return function(req, resp, next){

            // Resgata dependencia de sessao-autenticacao(passport)
            const passport = req.passport;
            passport.authenticate('local', (erro, usuario, info) => {
                if (info) {
                    return resp.marko(templates.base.login);
                }
    
                if (erro) {
                    return next(erro);
                }
    
                req.login(usuario, (erro) => {
                    if (erro) {
                        return next(erro);
                    }
    
                    return resp.redirect(LivroControlador.rotas().lista);
                });
            }) (req, resp, next);
        }
    }
}

module.exports = BaseControlador;