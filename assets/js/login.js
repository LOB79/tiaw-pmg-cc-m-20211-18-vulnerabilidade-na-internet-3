const LOGIN_URL = "login.html";


var db_usuarios = {};

var usuarioCorrente = {};


// Dados de usuários para serem utilizados por n ter o banco de dados do cadastro
const dadosIniciais = {
    usuarios: [
        { login: "admin", senha: "123"},
        { login: "user", senha: "123"},
    ]
};


// Inicializa o usuarioCorrente e banco de dados de usuários da aplicação de Login
function initLoginApp () {
    usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
    if (usuarioCorrenteJSON) {
        usuarioCorrente = JSON.parse (usuarioCorrenteJSON);
    }
    
    // PARTE 2 - INICIALIZA BANCO DE DADOS DE USUÁRIOS
    // Obtem a string JSON com os dados de usuários a partir do localStorage
    var usuariosJSON = localStorage.getItem('db_usuarios');

    // Verifica se existem dados já armazenados no localStorage
    if (!usuariosJSON) {  // Se NÃO há dados no localStorage
        
        // Informa sobre localStorage vazio e e que serão carregados os dados iniciais
        alert('BEM VINDO');

        // Copia os dados iniciais para o banco de dados 
        db_usuarios = dadosIniciais;

        // Salva os dados iniciais no local Storage convertendo-os para string antes
        localStorage.setItem('db_usuarios', JSON.stringify (dadosIniciais));
    }
    else  {  // Se há dados no localStorage
        
        // Converte a string JSON em objeto colocando no banco de dados baseado em JSON
        db_usuarios = JSON.parse(usuariosJSON);    
    }
};


// Verifica o LOGIN
function loginUser (login, senha) {
    // para localizar o usuário informado no formulario de login
    for (var i = 0; i < db_usuarios.usuarios.length; i++) {
        var usuario = db_usuarios.usuarios[i];
        
        // Se encontrou login, carrega usuário corrente e salva no Session Storage
        if (login == usuario.login && senha == usuario.senha) {
            window.location.href = "userPage.html"
            
            // Salva os dados do usuário corrente no Session Storage, mas antes converte para string
            sessionStorage.setItem ('usuarioCorrente', JSON.stringify (usuarioCorrente));

            // Retorna true para usuário encontrado
            return true;
        }
    }

    // Se chegou até aqui é por que não encontrou o usuário e retorna falso
    return false;
}

function setUserPass () {}



// Inicializa as estruturas utilizadas pelo LoginApp
initLoginApp ();
function processaFormLogin (event) {                
    // Cancela a submissão do formulário para tratar sem fazer refresh da tela
    event.preventDefault ();

    // Obtem os dados de login e senha a partir do formulário de login
    var username = document.getElementById('bdemail').value;
    var password = document.getElementById('bdpassword').value;

    // Valida login e se estiver ok, redireciona para tela inicial da aplicação
    resultadoLogin = loginUser (username, password);
    if (resultadoLogin) {
        window.location.href = "userPage.html" ;
    }
    else { // Se login falhou, avisa ao usuário
        alert ('Usuário ou senha invalidos / para entrar na pagina usuario:user senha:123');
    }
}
document.getElementById ('bttlogin').addEventListener ('click', processaFormLogin);
